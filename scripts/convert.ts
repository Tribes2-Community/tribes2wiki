/**
 * Stage 2 of the import: turn cached MediaWiki captures into Starlight Markdown.
 *
 * Seeding step only. Once the Markdown is committed it becomes the source of
 * truth -- re-running this overwrites hand edits. See README.
 */
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import { routeFor, sectionFor, slugify, titleFromHref, originalImageName } from './lib/wiki.ts';
import { resolveImage } from './lib/images.ts';

const MANIFEST = JSON.parse(readFileSync('archive/manifest.json', 'utf8'));
const OUT_DIR = path.join('src', 'content', 'docs');
const REPORT_PATH = path.join('archive', 'import-report.json');

// Image resolution (archive-recovered originals plus hand-reviewed replacements)
// lives in lib/images.ts.

/**
 * Pages dropped as duplicates of another article, mapped to the survivor.
 *
 * The original wiki carried both Mortar and Fusion mortar with byte-identical
 * text. Only the survivor is written, and links to the dropped title resolve to
 * it rather than being unwrapped into plain text. Keep in step with
 * MERGED_PAGES in generate-redirects.ts.
 */
const MERGED_INTO: Record<string, string> = {
  Mortar: 'Fusion mortar',
  // `Ski` and `Skiing` were byte-identical, same last-modified date.
  Ski: 'Skiing',
  // The turret article covers base and deployable turrets alike; these two were
  // redirects into its subsections.
  'Landspike turret': 'Base turret',
  'Spider clamp turret': 'Base turret',
  'Scout armor': 'Light armor',
  Juggernaut: 'Juggernaut armor',
  'Deployable station': 'Inventory station',
  Waypoint: 'Command circuit',
  'Targeting Laser': 'Targeting laser',
  Script: 'Scripting',
  // Mine-disc is a section of the spinfusor article.
  'Mine-disc': 'Spinfusor',
  'Tribes2Wiki:Community Portal': 'Tribes2Wiki:Community portal',
  'Tribes2Wiki:News/Tribes 2 IRC Issues': 'Tribes2Wiki:News',
  'Tribes2Wiki talk:News/Tribes 2 IRC Issues': 'Tribes2Wiki:News',
};

/**
 * Archive pages dropped outright: MediaWiki scaffolding the new site replaces.
 * The category listings are what the sidebar now does, and they linked to pages
 * that no longer exist; Help:Contents was a hand-maintained table of contents.
 */
const DROPPED = new Set([
  'Category:Armors',
  'Category:Base assets',
  'Category:Maps',
  'Category:Movies',
  'Category:Scripting',
  'Category:Tactics',
  'Category:Weapons',
  'Help:Contents',
]);

/**
 * Archive pages replaced by hand-written articles since the import. The
 * converter no longer generates them, and links to the original title resolve
 * to the replacement instead.
 *
 * `Pulse sensor` was really a general sensors article: the base-asset section
 * became /base-assets/pulse-sensor and the remainder /equipment/sensors.
 */
const REPLACED_BY_HAND: Record<string, string> = {
  'Pulse sensor': '/base-assets/pulse-sensor',
};

/**
 * Archive pages edited by hand since the import. Their routes still resolve for
 * link rewriting, but the converter neither regenerates nor deletes them, so a
 * re-run doesn't silently discard the edits.
 */
const PRESERVE_EDITED = new Set(['Main Page', 'Tribes 2', 'Help:Editing', 'Skiing']);

export interface Capture {
  timestamp: string;
  waybackUrl: string;
  lastModified: string | null;
  cacheFile: string;
}

export interface PageInfo {
  title: string;
  namespace: string;
  originalUrl: string;
  categories: string[];
  capture: Capture;
  html: string;
}

/** MediaWiki chrome that carries no article content. */
const CHROME_SELECTORS = [
  '#siteSub',
  '#contentSub',
  '#jump-to-nav',
  '#toc',
  '#catlinks',
  '.printfooter',
  '.editsection',
  '.magnify',
  '.noprint',
];

export function loadPage(page: any, capture?: Capture): PageInfo | null {
  // Defaults to the newest capture, which holds the final revision of the article.
  const chosen: Capture | undefined = capture ?? page.captures.at(-1);
  if (!chosen) return null;
  const html = readFileSync(chosen.cacheFile, 'utf8');
  const $ = cheerio.load(html);

  const categories: string[] = [];
  $('#catlinks a[href*="/wiki/Category:"]').each((_, el) => {
    const title = titleFromHref($(el).attr('href') ?? '');
    if (title && title.startsWith('Category:')) categories.push(title.slice('Category:'.length));
  });

  return {
    title: page.title,
    namespace: page.namespace,
    originalUrl: page.originalUrl,
    categories: [...new Set(categories)],
    capture: chosen,
    html,
  };
}

function makeTurndown(): TurndownService {
  const td = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '_',
  });
  td.use(gfm);
  td.remove(['script', 'style']);
  return td;
}

/** Single-quoted YAML scalar; safe for apostrophes, colons and leading symbols. */
function yamlString(value: string): string {
  return "'" + value.replace(/'/g, "''") + "'";
}

/** Where a page lands on the new site, after collisions have been resolved. */
export interface Placement {
  section: string;
  slug: string;
  route: string;
}

export interface ConvertResult {
  section: string;
  slug: string;
  markdown: string;
  stub: boolean;
  redlinks: string[];
  missingLinks: string[];
  missingImages: string[];
  referencedImages: string[];
}

export function convertPage(
  info: PageInfo,
  placement: Placement,
  knownRoutes: Map<string, string>,
  redlinkTargets: Set<string>,
): ConvertResult {
  const $ = cheerio.load(info.html);
  const body = $('#bodyContent');
  if (body.length === 0) throw new Error(`no #bodyContent in ${info.capture.cacheFile}`);

  for (const selector of CHROME_SELECTORS) body.find(selector).remove();

  const redlinks: string[] = [];
  const missingLinks: string[] = [];
  const missingImages: string[] = [];
  const referencedImages: string[] = [];

  // Links to pages that never existed: keep the words, drop the dead link.
  body.find('a[href*="redlink=1"]').each((_, el) => {
    const href = $(el).attr('href') ?? '';
    const raw = href.match(/title=([^&]+)/);
    const title = raw ? decodeURIComponent(raw[1]).replace(/_/g, ' ') : '';
    if (title) {
      redlinks.push(title);
      redlinkTargets.add(title);
    }
    $(el).replaceWith($(el).contents());
  });

  // Internal wiki links -> site routes. Links to pages the archive never captured
  // are unwrapped rather than left pointing at a 404.
  body.find('a[href^="/wiki/"]').each((_, el) => {
    const title = titleFromHref($(el).attr('href') ?? '');
    if (!title) return;
    if (title.startsWith('File:') || title.startsWith('Special:')) {
      // File: links wrap the <img>; flattening to text would delete the image.
      $(el).replaceWith($(el).contents());
      return;
    }
    const route = knownRoutes.get(title);
    if (route) {
      $(el).attr('href', route);
    } else {
      missingLinks.push(title);
      $(el).replaceWith($(el).contents());
    }
  });

  // External links back to the dead wiki are meaningless now.
  body.find('a[href*="tribes2wiki.com"]').each((_, el) => {
    $(el).replaceWith($(el).contents());
  });

  // Images: serve the ones we have (recovered or replaced); drop the rest so no
  // article shows a broken image, but record every reference either way.
  body.find('img').each((_, el) => {
    const src = $(el).attr('src') ?? '';
    if (!src.includes('/w/images/')) {
      $(el).remove();
      return;
    }
    const last = decodeURIComponent(src.split('/').pop() ?? '');
    const file = originalImageName(last);
    referencedImages.push(file);
    const served = resolveImage(file);
    if (served) {
      $(el).attr('src', served);
      $(el).removeAttr('width').removeAttr('height').removeAttr('class');
    } else {
      missingImages.push(file);
      $(el).remove();
    }
  });

  // MediaWiki's ambox banners (stub / cleanup notices) are the only tables the wiki
  // used. Lift them out of the body so they don't land in the Markdown as raw HTML;
  // they are re-emitted below as native Starlight asides.
  const notices: { kind: 'stub' | 'cleanup'; text: string }[] = [];
  body.find('table.ambox').each((_, el) => {
    const text = $(el).find('.mbox-text').text().replace(/\s+/g, ' ').trim();
    const kind = $(el).hasClass('ambox-style') ? 'cleanup' : 'stub';
    if (text) notices.push({ kind, text });
    $(el).remove();
  });

  /**
   * The wiki used tables for two unrelated jobs, and they need opposite handling:
   *
   *   - portal layout (the Main Page, category listings) -- unwrap, so the
   *     content survives as ordinary blocks rather than raw HTML;
   *   - the per-mod stat tables on weapons and packs -- keep, so turndown's GFM
   *     plugin renders them as real Markdown tables.
   *
   * Header cells separate the two cleanly: every stat table has <th>, and no
   * layout table does.
   */
  const isLayoutTable = (el: any): boolean =>
    $(el)
      .find('th')
      .filter((_i, cell) => $(cell).closest('table').is(el)).length === 0;

  // Tables nest, and replaceWith re-parses the inner markup, so repeat until
  // no unwrappable table is left.
  for (let pass = 0; pass < 5; pass++) {
    const layout = body.find('table').filter((_i, el) => isLayoutTable(el));
    if (layout.length === 0) break;
    layout.each((_, el) => {
      const cells = $(el)
        .find('td, th')
        // find() is a descendant search, so without this the cells of a nested
        // table are collected by the outer table too, and again when the inner
        // one is unwrapped -- which duplicated the Main Page's portal row.
        .filter((_i, cell) => $(cell).closest('table').is(el))
        .map((_i, cell) => $(cell).html() ?? '')
        .get()
        .filter((html) => html.trim().length > 0);
      $(el).replaceWith(cells.map((html) => `<div>${html}</div>`).join('\n'));
    });
  }

  // Thumbnail wrappers left imageless collapse to their caption text.
  body.find('.thumb').each((_, el) => {
    if ($(el).find('img').length === 0) {
      const caption = $(el).find('.thumbcaption').text().trim();
      $(el).replaceWith(caption ? `<p><em>${caption}</em></p>` : '');
    }
  });

  const articleMarkdown = makeTurndown()
    .turndown(body.html() ?? '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Re-emit the lifted ambox banners as native Starlight asides.
  const asides = notices
    .map((n) => {
      const label = n.kind === 'stub' ? 'Stub' : 'Cleanup needed';
      const type = n.kind === 'stub' ? 'note' : 'caution';
      return `:::${type}[${label}]\n${n.text}\n:::`;
    })
    .join('\n\n');

  const markdownBody = [asides, articleMarkdown].filter(Boolean).join('\n\n');

  const { section, slug } = placement;

  const displayTitle =
    info.title.replace(/^(Category|Help|Tribes2Wiki talk|Tribes2Wiki):/, '').trim() || info.title;

  // Taken from the cleaned DOM so no Markdown or HTML syntax leaks into frontmatter.
  let firstProse = '';
  body.find('p').each((_, el) => {
    if (firstProse) return;
    const text = $(el).text().replace(/\s+/g, ' ').trim();
    if (text.length > 40) firstProse = text;
  });

  const description = firstProse
    ? `${firstProse.slice(0, 157).trimEnd()}${firstProse.length > 157 ? '...' : ''}`
    : `${displayTitle} on the Community Tribes 2 Wiki.`;

  const frontmatterLines = [
    '---',
    `title: ${yamlString(displayTitle)}`,
    `description: ${yamlString(description)}`,
    info.categories.length
      ? `categories:\n${info.categories.map((c) => `  - ${yamlString(c)}`).join('\n')}`
      : 'categories: []',
    'source:',
    `  url: ${yamlString(info.originalUrl)}`,
    `  archived: ${yamlString(info.capture.waybackUrl)}`,
  ];
  if (info.capture.lastModified) {
    frontmatterLines.push(`  lastModified: ${yamlString(info.capture.lastModified)}`);
  }
  const isStub = notices.some((n) => n.kind === 'stub');
  if (isStub) frontmatterLines.push('stub: true');
  frontmatterLines.push('---', '');

  return {
    section,
    slug,
    markdown: `${frontmatterLines.join('\n')}${markdownBody}\n`,
    redlinks,
    missingLinks,
    missingImages,
    referencedImages,
  };
}

async function main(): Promise<void> {
  console.log('Converting %d archived pages ...', MANIFEST.pages.length);

  // Pass 1: load every page so link rewriting knows which titles resolve.
  const pages: PageInfo[] = [];
  for (const page of MANIFEST.pages) {
    const info = loadPage(page);
    if (info) pages.push(info);
  }

  // Pass 2: assign a unique file per page *before* converting, so that links
  // resolve to where pages actually land. Distinct wiki titles can still slug to
  // the same name (e.g. "Targeting laser" vs "Targeting Laser"); those are kept
  // as separate pages and reported for a human to merge rather than overwritten.
  const placements = new Map<string, Placement>();
  const takenSlugs = new Set<string>();
  const slugCollisions: { slug: string; titles: string[] }[] = [];

  for (const info of pages) {
    if (MERGED_INTO[info.title] || REPLACED_BY_HAND[info.title] || DROPPED.has(info.title)) continue;
    // The wiki's Main Page becomes the site root, so it lives at the content root
    // rather than inside a section directory -- otherwise it builds to /start and
    // nothing serves `/`.
    const isHome = info.title === 'Main Page';
    const section = isHome ? '' : sectionFor(info.title, info.categories);
    const baseSlug = isHome ? 'index' : slugify(info.title);

    let slug = baseSlug;
    for (let n = 2; takenSlugs.has(`${section}/${slug}`); n++) slug = `${baseSlug}-${n}`;
    if (slug !== baseSlug) {
      const existing = slugCollisions.find((c) => c.slug === `${section}/${baseSlug}`);
      const previous = [...placements].find(
        ([, p]) => p.section === section && p.slug === baseSlug,
      );
      if (existing) existing.titles.push(info.title);
      else {
        slugCollisions.push({
          slug: `${section}/${baseSlug}`,
          titles: [previous ? previous[0] : baseSlug, info.title],
        });
      }
    }

    takenSlugs.add(`${section}/${slug}`);
    placements.set(info.title, {
      section,
      slug,
      route: slug === 'index' ? '/' : `/${section}/${slug}`,
    });
  }

  const knownRoutes = new Map<string, string>();
  for (const [title, placement] of placements) knownRoutes.set(title, placement.route);
  // Links to a merged-away title point at the article that absorbed it.
  for (const [from, to] of Object.entries(MERGED_INTO)) {
    const route = knownRoutes.get(to);
    if (route) knownRoutes.set(from, route);
  }
  // Links to a hand-replaced title point at the hand-written article.
  for (const [from, route] of Object.entries(REPLACED_BY_HAND)) knownRoutes.set(from, route);

  // Pass 3: convert.
  //
  // Remove only the files a previous run generated, listed in the last import
  // report -- never the whole directory. Articles written by hand since the
  // import live here too, and wiping the tree would silently delete them.
  if (existsSync(REPORT_PATH)) {
    const previous = JSON.parse(readFileSync(REPORT_PATH, 'utf8')) as {
      pages?: { file: string }[];
    };
    const preservedFiles = new Set(
      (previous.pages ?? [])
        .filter((p) => PRESERVE_EDITED.has(p.title))
        .map((p) => p.file),
    );
    for (const page of previous.pages ?? []) {
      if (preservedFiles.has(page.file)) continue;
      await rm(page.file, { force: true });
    }
  }
  await mkdir(OUT_DIR, { recursive: true });

  const redlinkTargets = new Set<string>();
  const allMissingLinks = new Map<string, number>();
  const allMissingImages = new Map<string, number>();
  const allReferencedImages = new Map<string, number>();
  const written: { title: string; section: string; file: string }[] = [];

  for (const info of pages) {
    if (MERGED_INTO[info.title] || REPLACED_BY_HAND[info.title] || DROPPED.has(info.title)) continue;
    const result = convertPage(info, placements.get(info.title)!, knownRoutes, redlinkTargets);
    if (PRESERVE_EDITED.has(info.title)) {
      // Keep the file as it stands, but still record it so routes and the
      // redirect map stay correct.
      written.push({
        title: info.title,
        section: result.section,
        file: path
          .join(OUT_DIR, result.section, `${result.slug}.md`)
          .split(path.sep)
          .join('/'),
      });
      continue;
    }
    const dir = path.join(OUT_DIR, result.section);
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, `${result.slug}.md`);
    await writeFile(file, result.markdown, 'utf8');
    written.push({
      title: info.title,
      section: result.section,
      file: file.split(path.sep).join('/'),
    });

    for (const t of result.missingLinks) allMissingLinks.set(t, (allMissingLinks.get(t) ?? 0) + 1);
    for (const i of result.missingImages) allMissingImages.set(i, (allMissingImages.get(i) ?? 0) + 1);
    for (const i of result.referencedImages)
      allReferencedImages.set(i, (allReferencedImages.get(i) ?? 0) + 1);
  }

  const report = {
    generatedAt: new Date().toISOString(),
    convertedPages: written.length,
    /**
     * Distinct wiki titles that slugged to the same path. Both pages are kept
     * (the later one suffixed); these are candidates for a manual merge.
     */
    slugCollisions,
    /** Titles linked with redlink=1: they were linked but never written. */
    redlinks: [...redlinkTargets].sort(),
    /** Titles that existed on the wiki but the Wayback Machine never captured. */
    missingPages: [...allMissingLinks]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([title, linkCount]) => ({ title, linkCount })),
    /** Every uploaded file referenced by a surviving article. */
    referencedImages: [...allReferencedImages]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([file, useCount]) => ({ file, useCount })),
    /** Referenced files we still have no image for. */
    missingImages: [...allMissingImages]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([file, useCount]) => ({ file, useCount })),
    pages: written,
  };
  await writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  const bySection = new Map<string, number>();
  for (const w of written) bySection.set(w.section, (bySection.get(w.section) ?? 0) + 1);

  console.log('\nWrote %d Markdown pages to %s', written.length, OUT_DIR);
  for (const [s, n] of [...bySection].sort((a, b) => b[1] - a[1])) {
    console.log('  %s %d', s.padEnd(14), n);
  }
  console.log('\n  redlinks (linked, never written): %d', report.redlinks.length);
  console.log('  pages existed but not archived:   %d', report.missingPages.length);
  console.log('  images referenced but lost:       %d', report.missingImages.length);
  console.log('\nWrote %s', REPORT_PATH);
}

// Only run as a script; replay-history.ts imports convertPage from here.
if (process.argv[1] && import.meta.filename === process.argv[1]) {
  await main();
}

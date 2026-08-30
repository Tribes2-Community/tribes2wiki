/**
 * Stage 1 of the import: discover every recoverable page on tribes2wiki.com and
 * cache the raw Wayback captures locally.
 *
 * Downloads *every* 200 capture per page, not just the newest one -- successive
 * captures of the same page represent different revisions of the original wiki,
 * which is what lets `replay-history.ts` reconstruct a real commit history.
 *
 * Cache is gitignored; archive/manifest.json is committed so the import stays
 * reproducible and auditable.
 */
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { queryCdx, politeFetch, rawCaptureUrl, ORIGIN_HOST, type CdxRow } from './lib/wayback.ts';

const CACHE_DIR = path.join('archive-cache', 'pages');
const MANIFEST_PATH = path.join('archive', 'manifest.json');

/**
 * The original wiki's inline JavaScript produced a handful of malformed hrefs
 * (`/wiki/).indexOf(` and friends) that Wayback dutifully crawled. Drop those,
 * along with generated Special: pages and skin assets.
 */
function isContentPage(row: CdxRow): boolean {
  if (row.statuscode !== '200') return false;
  if (!row.original.includes('/wiki/')) return false;
  if (!/^text\/html/.test(row.mimetype)) return false;

  const title = extractTitle(row.original);
  if (!title) return false;
  if (title.startsWith('Special:')) return false;
  if (/[()[\]{}]|^&|\.(gif|png|jpe?g|css|js)$/i.test(title)) return false;
  return true;
}

/** `http://www.tribes2wiki.com:80/wiki/Fusion_mortar` -> `Fusion_mortar` */
function extractTitle(url: string): string | null {
  const match = url.match(/\/wiki\/([^?#]*)$/);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]).replace(/_/g, ' ').trim();
  } catch {
    return null;
  }
}

/** Filesystem-safe cache key for a wiki title. */
export function cacheKey(title: string): string {
  return title.replace(/[^A-Za-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'untitled';
}

/**
 * MediaWiki 1.16 stamps every page with its revision date in the footer. That
 * date identifies *which* revision a capture holds, so repeat crawls of an
 * unchanged page can be collapsed.
 */
export function extractLastModified(html: string): string | null {
  const match = html.match(/This page was last modified on ([^<.]+?)(?:,\s*at\s*([\d:]+))?\s*\./i);
  if (!match) return null;
  const date = new Date(`${match[1].trim()} ${match[2] ?? '00:00'} UTC`);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/**
 * tribes2wiki.com expired and was replaced by a domain-parking page, which the
 * Wayback Machine kept crawling under the old /wiki/ URLs. Those captures are
 * not wiki content and must never reach the import.
 */
export function isWikiCapture(html: string): boolean {
  return /MediaWiki/i.test(html) && html.includes('bodyContent');
}

export interface CaptureRecord {
  timestamp: string;
  waybackUrl: string;
  sha256: string;
  lastModified: string | null;
  cacheFile: string;
}

export interface PageRecord {
  title: string;
  namespace: string;
  originalUrl: string;
  captures: CaptureRecord[];
}

function namespaceOf(title: string): string {
  const match = title.match(/^([A-Za-z0-9]+(?: talk)?):/);
  const known = ['Category', 'Help', 'Tribes2Wiki', 'Tribes2Wiki talk', 'Talk', 'Template', 'File'];
  return match && known.includes(match[1]) ? match[1] : 'Main';
}

async function main(): Promise<void> {
  console.log('Querying Wayback CDX index for %s ...', ORIGIN_HOST);
  const rows = await queryCdx({
    url: ORIGIN_HOST,
    matchType: 'domain',
    filter: 'statuscode:200',
    limit: '200000',
  });
  console.log('  %d total 200-captures across the domain', rows.length);

  const byTitle = new Map<string, CdxRow[]>();
  for (const row of rows.filter(isContentPage)) {
    const title = extractTitle(row.original)!;
    const list = byTitle.get(title) ?? [];
    list.push(row);
    byTitle.set(title, list);
  }
  console.log('  %d distinct content pages', byTitle.size);

  await mkdir(CACHE_DIR, { recursive: true });
  await mkdir(path.dirname(MANIFEST_PATH), { recursive: true });

  const pages: PageRecord[] = [];
  let fetched = 0;
  let cached = 0;
  let skipped = 0;

  for (const [title, allCaptures] of [...byTitle].sort(([a], [b]) => a.localeCompare(b))) {
    // The wiki answered on both tribes2wiki.com and www.tribes2wiki.com, so a single
    // crawl shows up as two CDX rows with an identical timestamp. Keep one per timestamp.
    const captures = [...new Map(allCaptures.map((c) => [c.timestamp, c])).values()];
    captures.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    const key = cacheKey(title);
    const pageDir = path.join(CACHE_DIR, key);
    await mkdir(pageDir, { recursive: true });

    const records: CaptureRecord[] = [];
    for (const capture of captures) {
      const cacheFile = path.join(pageDir, `${capture.timestamp}.html`);
      let html: string;

      if (existsSync(cacheFile)) {
        html = await readFile(cacheFile, 'utf8');
        cached++;
      } else {
        const url = rawCaptureUrl(capture.timestamp, capture.original);
        const res = await politeFetch(url);
        if (!res) {
          console.warn('  ! capture vanished: %s', url);
          continue;
        }
        html = await res.text();
        await writeFile(cacheFile, html, 'utf8');
        fetched++;
        process.stdout.write(`\r  fetched ${fetched}, cached ${cached}  (${title})`.padEnd(90));
      }

      if (!isWikiCapture(html)) {
        skipped++;
        continue;
      }

      records.push({
        timestamp: capture.timestamp,
        waybackUrl: rawCaptureUrl(capture.timestamp, capture.original),
        sha256: createHash('sha256').update(html).digest('hex'),
        lastModified: extractLastModified(html),
        cacheFile: cacheFile.split(path.sep).join('/'),
      });
    }

    if (records.length === 0) continue;
    pages.push({
      title,
      namespace: namespaceOf(title),
      originalUrl: `http://www.tribes2wiki.com/wiki/${title.replace(/ /g, '_')}`,
      captures: records,
    });
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    source: {
      host: ORIGIN_HOST,
      cdx: `${'http://web.archive.org/cdx/search/cdx'}?url=${ORIGIN_HOST}&matchType=domain&filter=statuscode:200`,
      note: 'Captures fetched with the id_ modifier: original markup, no Wayback toolbar.',
    },
    pageCount: pages.length,
    captureCount: pages.reduce((n, p) => n + p.captures.length, 0),
    pages,
  };

  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log('\n\nWrote %s', MANIFEST_PATH);
  console.log('  %d pages, %d captures (%d newly fetched)', pages.length, manifest.captureCount, fetched);
  if (skipped > 0) console.log('  %d capture(s) skipped: post-expiry domain-parking pages, not wiki content', skipped);

  const byNs = new Map<string, number>();
  for (const p of pages) byNs.set(p.namespace, (byNs.get(p.namespace) ?? 0) + 1);
  for (const [ns, n] of [...byNs].sort((a, b) => b[1] - a[1])) console.log('  %s %d', ns.padEnd(18), n);
}

await main();

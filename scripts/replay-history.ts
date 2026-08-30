/**
 * Replays the recovered wiki as git history.
 *
 * Successive Wayback captures of a page hold genuinely different revisions of it,
 * identified by the "last modified" date MediaWiki stamps in the footer. Where an
 * `action=history` capture also survives, that date maps to a named contributor
 * and their edit summary -- so those revisions can be committed as the person who
 * actually wrote them, with the original edit as the commit's author date.
 *
 * Three tiers, by what the archive supports:
 *   1. authored   - revision date matches a known revision: real author + summary
 *   2. dated      - revision date known, author isn't: anonymous, original date
 *   3. undated    - no footer date at all: anonymous, capture date
 *
 * Tiers 2 and 3 are attributed to the anonymous wiki contributor, not to whoever
 * ran the import. This is recovered community writing of unknown authorship, and
 * the person performing the restoration must not appear as its author.
 *
 * Committer is always the maintainer; only the *author* is the original writer.
 * Run once, on a repository whose content has not yet been committed.
 */
import { execFileSync } from 'node:child_process';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { convertPage, loadPage, type Capture, type Placement } from './convert.ts';
import { ANONYMOUS, identityFor, MAINTAINER, type Identity } from './lib/authors.ts';
import type { Revision } from './fetch-history.ts';

const MANIFEST = JSON.parse(readFileSync('archive/manifest.json', 'utf8'));
const HISTORY = JSON.parse(readFileSync('archive/history.json', 'utf8'));
const REPORT = JSON.parse(readFileSync('archive/import-report.json', 'utf8'));
const OUT_DIR = path.join('src', 'content', 'docs');

interface Event {
  title: string;
  /** ISO date used as the commit's author date. */
  date: string;
  identity: Identity;
  summary: string;
  tier: 'authored' | 'dated' | 'undated';
  capture: Capture;
  page: any;
  placement: Placement;
}

function git(args: string[], env: NodeJS.ProcessEnv = {}): string {
  return execFileSync('git', args, {
    encoding: 'utf8',
    env: { ...process.env, ...env },
  }).trim();
}

/** Rebuild placements from the import report so routes match the converted site. */
function placementsFromReport(): Map<string, Placement> {
  const placements = new Map<string, Placement>();
  for (const p of REPORT.pages as { title: string; section: string; file: string }[]) {
    const slug = path.basename(p.file, '.md');
    placements.set(p.title, {
      section: p.section,
      slug,
      route: slug === 'index' ? '/' : `/${p.section}/${slug}`,
    });
  }
  return placements;
}

function buildEvents(placements: Map<string, Placement>): Event[] {
  const historyByTitle = new Map<string, Revision[]>(
    (HISTORY.pages as { title: string; revisions: Revision[] }[]).map((p) => [p.title, p.revisions]),
  );

  const events: Event[] = [];

  for (const page of MANIFEST.pages) {
    const placement = placements.get(page.title);
    if (!placement) continue;
    const revisions = historyByTitle.get(page.title) ?? [];

    // One event per distinct revision state; repeat crawls of an unchanged page
    // share a "last modified" date and collapse to a single commit.
    //
    // Where several captures hold the same revision, keep the newest. It has the
    // same article text, and matching convert.ts's choice keeps the `archived:`
    // provenance link identical between a fresh convert and a replayed history.
    const byRevision = new Map<string, Capture>();
    for (const capture of page.captures as Capture[]) {
      byRevision.set(capture.lastModified ?? `capture:${capture.timestamp}`, capture);
    }

    for (const capture of byRevision.values()) {

      const revision = capture.lastModified
        ? revisions.find((r) => r.timestamp === capture.lastModified)
        : undefined;

      // Never credit an edit the wiki itself rolled back.
      if (revision?.reverted) continue;

      if (revision) {
        events.push({
          title: page.title,
          date: capture.lastModified!,
          identity: identityFor(revision.user),
          summary: revision.summary,
          tier: 'authored',
          capture,
          page,
          placement,
        });
      } else if (capture.lastModified) {
        events.push({
          title: page.title,
          date: capture.lastModified,
          identity: { ...ANONYMOUS },
          summary: '',
          tier: 'dated',
          capture,
          page,
          placement,
        });
      } else {
        const ts = capture.timestamp;
        const iso = `${ts.slice(0, 4)}-${ts.slice(4, 6)}-${ts.slice(6, 8)}T${ts.slice(8, 10)}:${ts.slice(10, 12)}:${ts.slice(12, 14)}Z`;
        events.push({
          title: page.title,
          date: iso,
          identity: { ...ANONYMOUS },
          summary: '',
          tier: 'undated',
          capture,
          page,
          placement,
        });
      }
    }
  }

  events.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
  return events;
}

function commitMessage(event: Event): string {
  const subject = event.summary
    ? `${event.title}: ${event.summary}`
    : `${event.title}`;

  const body = [
    '',
    event.tier === 'authored'
      ? `Revision of "${event.title}" from the original tribes2wiki.com,`
      : `Recovered revision of "${event.title}" from the original tribes2wiki.com,`,
    `edited ${event.date.slice(0, 10)}.`,
    '',
    event.tier === 'dated'
      ? "No surviving revision history names this edit's author, so it is attributed\nto the wiki's anonymous contributors rather than to whoever ran the import."
      : event.tier === 'undated'
        ? 'No revision date survives; dated from the archive capture.'
        : '',
    '',
    `Source: ${event.capture.waybackUrl}`,
  ]
    .filter((line, i, all) => !(line === '' && all[i - 1] === ''))
    .join('\n');

  // Keep the subject line to a sane width.
  return `${subject.length > 72 ? `${subject.slice(0, 69)}...` : subject}\n${body}\n`;
}

async function main(): Promise<void> {
  const placements = placementsFromReport();
  const events = buildEvents(placements);

  const tiers = { authored: 0, dated: 0, undated: 0 };
  for (const e of events) tiers[e.tier]++;
  console.log('Replaying %d revision states as commits', events.length);
  console.log('  authored (original contributor): %d', tiers.authored);
  console.log('  dated (author unknown):          %d', tiers.dated);
  console.log('  undated:                         %d', tiers.undated);

  // Start from an empty content tree so each commit shows a real diff.
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  const knownRoutes = new Map<string, string>();
  for (const [title, placement] of placements) knownRoutes.set(title, placement.route);

  const redlinkTargets = new Set<string>();
  let committed = 0;

  for (const event of events) {
    const info = loadPage(event.page, event.capture);
    if (!info) continue;

    const result = convertPage(info, event.placement, knownRoutes, redlinkTargets);
    const dir = path.join(OUT_DIR, result.section);
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, `${result.slug}.md`);
    await writeFile(file, result.markdown, 'utf8');

    git(['add', '--', file]);
    // Nothing changed between these two captures; skip the empty commit.
    if (git(['diff', '--cached', '--name-only']) === '') continue;

    git(['commit', '--quiet', '-m', commitMessage(event)], {
      GIT_AUTHOR_NAME: event.identity.name,
      GIT_AUTHOR_EMAIL: event.identity.email,
      GIT_AUTHOR_DATE: event.date,
      GIT_COMMITTER_NAME: MAINTAINER.name,
      GIT_COMMITTER_EMAIL: MAINTAINER.email,
    });
    committed++;
  }

  console.log('\nCreated %d commits', committed);
  const authors = git(['log', '--format=%an', `-${committed}`])
    .split('\n')
    .reduce<Record<string, number>>((acc, name) => {
      acc[name] = (acc[name] ?? 0) + 1;
      return acc;
    }, {});
  for (const [name, n] of Object.entries(authors).sort((a, b) => b[1] - a[1])) {
    console.log('  %s %d', name.padEnd(36), n);
  }
}

await main();

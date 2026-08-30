/**
 * Recovers per-revision authorship from archived MediaWiki history pages.
 *
 * Only a handful of `action=history` captures survive, so this covers a small
 * subset of the wiki -- but for those pages it yields the real contributor,
 * timestamp and edit summary of every revision, which is what lets
 * `replay-history.ts` build a genuine commit history.
 *
 * Writes archive/history.json (committed).
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';
import { queryCdx, politeFetch, rawCaptureUrl, ORIGIN_HOST } from './lib/wayback.ts';

const CACHE_DIR = path.join('archive-cache', 'history');
const OUT_PATH = path.join('archive', 'history.json');

export interface Revision {
  /** ISO timestamp of the edit on the original wiki. */
  timestamp: string;
  /** Wiki username, or null for anonymous/IP edits. */
  user: string | null;
  /** Edit summary, as typed by the author. */
  summary: string;
  /** Marked as a minor edit. */
  minor: boolean;
  /** Page size in bytes after the edit. */
  bytes: number | null;
  /** True when a later revision explicitly reverted this one. */
  reverted: boolean;
}

/** `10:11, 26 May 2011` -> ISO */
function parseTimestamp(text: string): string | null {
  const match = text.match(/(\d{1,2}:\d{2}),\s*(\d{1,2}\s+\w+\s+\d{4})/);
  if (!match) return null;
  const date = new Date(`${match[2]} ${match[1]} UTC`);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function parseHistory(html: string): Revision[] {
  const $ = cheerio.load(html);
  const revisions: Revision[] = [];

  $('#pagehistory li').each((_, el) => {
    const li = $(el);
    // The row opens with "(cur | prev)" links, so the timestamp is read from the
    // row text rather than from the first anchor.
    const timestamp = parseTimestamp(li.text());
    if (!timestamp) return;

    const user = li.find('.history-user a').first().text().trim() || null;
    const summary = li.find('.comment').text().replace(/^\s*\(|\)\s*$/g, '').replace(/\s+/g, ' ').trim();
    const bytesText = li.find('.history-size').text() || li.text();
    const bytesMatch = bytesText.match(/\(([\d,]+)\s*bytes?\)/);

    revisions.push({
      timestamp,
      user,
      summary,
      minor: li.find('.minoredit').length > 0,
      bytes: bytesMatch ? Number(bytesMatch[1].replace(/,/g, '')) : null,
      reverted: false,
    });
  });

  // History pages list newest first; commits want oldest first.
  revisions.reverse();

  // A revert names the user whose edits it undid. A MediaWiki rollback only undoes
  // the *contiguous run* of edits immediately preceding it, so walk back from the
  // revert and stop at the first revision by anyone else -- marking every edit the
  // user ever made would wrongly discredit their surviving work.
  revisions.forEach((rev, index) => {
    const match = rev.summary.match(/Reverted edits by ([^(]+?)\s*\(/i);
    if (!match) return;
    const target = match[1].trim();
    for (let i = index - 1; i >= 0; i--) {
      if (revisions[i].user !== target) break;
      revisions[i].reverted = true;
    }
  });

  return revisions;
}

/** `...index.php5?title=Fusion_mortar&action=history` -> `Fusion mortar` */
function titleFromHistoryUrl(url: string): string | null {
  const match = url.match(/title=([^&]+)/);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]).replace(/_/g, ' ');
  } catch {
    return null;
  }
}

async function main(): Promise<void> {
  console.log('Looking for archived revision histories ...');
  const rows = await queryCdx({
    url: ORIGIN_HOST,
    matchType: 'domain',
    filter: 'statuscode:200',
    limit: '200000',
  });

  const historyRows = rows.filter((r) => /action=history/.test(r.original) && /title=/.test(r.original));

  // Keep the latest capture per page: it lists the most revisions.
  const latest = new Map<string, (typeof historyRows)[number]>();
  for (const row of historyRows) {
    const title = titleFromHistoryUrl(row.original);
    if (!title) continue;
    const existing = latest.get(title);
    if (!existing || row.timestamp > existing.timestamp) latest.set(title, row);
  }
  console.log('  %d page(s) with a surviving history', latest.size);

  await mkdir(CACHE_DIR, { recursive: true });
  await mkdir(path.dirname(OUT_PATH), { recursive: true });

  const pages: { title: string; source: string; revisions: Revision[] }[] = [];

  for (const [title, row] of [...latest].sort(([a], [b]) => a.localeCompare(b))) {
    const cacheFile = path.join(CACHE_DIR, `${title.replace(/[^A-Za-z0-9]+/g, '_')}.html`);
    let html: string;
    if (existsSync(cacheFile)) {
      html = await readFile(cacheFile, 'utf8');
    } else {
      const url = rawCaptureUrl(row.timestamp, row.original);
      const res = await politeFetch(url);
      if (!res) {
        console.warn('  ! capture unavailable: %s', title);
        continue;
      }
      html = await res.text();
      await writeFile(cacheFile, html, 'utf8');
    }

    const revisions = parseHistory(html);
    if (revisions.length === 0) {
      console.warn('  ! no revisions parsed: %s', title);
      continue;
    }
    pages.push({ title, source: rawCaptureUrl(row.timestamp, row.original), revisions });
    console.log(
      '  %s %d revisions, %d contributor(s)',
      title.padEnd(44),
      revisions.length,
      new Set(revisions.map((r) => r.user)).size,
    );
  }

  const contributors = new Map<string, number>();
  for (const page of pages) {
    for (const rev of page.revisions) {
      if (rev.user) contributors.set(rev.user, (contributors.get(rev.user) ?? 0) + 1);
    }
  }

  const output = {
    generatedAt: new Date().toISOString(),
    note:
      'Authorship recovered from archived MediaWiki history pages. Email addresses were ' +
      'never public on the original wiki and are not recoverable.',
    pageCount: pages.length,
    revisionCount: pages.reduce((n, p) => n + p.revisions.length, 0),
    contributors: [...contributors]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([user, edits]) => ({ user, edits })),
    pages,
  };

  await writeFile(OUT_PATH, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  console.log('\nWrote %s', OUT_PATH);
  console.log('  %d pages, %d revisions', output.pageCount, output.revisionCount);
  console.log('  contributors: %s', output.contributors.map((c) => `${c.user} (${c.edits})`).join(', '));
}

await main();

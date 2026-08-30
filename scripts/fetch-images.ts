/**
 * Downloads replacement images for the wiki uploads lost with the original site,
 * and regenerates src/assets/images/CREDITS.md.
 *
 * The mapping lives in lib/images.ts and is hand-reviewed -- see the note there
 * about matches that were deliberately declined.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import {
  ARCHIVE_RECOVERED,
  DELIBERATELY_UNMAPPED,
  PLAYT2_RAW_BASE,
  REPLACEMENTS,
} from './lib/images.ts';

const OUT_DIR = path.join('public', 'images');
const CREDITS_PATH = path.join('src', 'assets', 'images', 'CREDITS.md');

const report = JSON.parse(readFileSync('archive/import-report.json', 'utf8'));
const referenced: string[] = (report.referencedImages ?? report.missingImages).map(
  (i: { file: string }) => i.file,
);

async function main(): Promise<void> {
  await mkdir(OUT_DIR, { recursive: true });

  let downloaded = 0;
  for (const [wikiFile, replacement] of Object.entries(REPLACEMENTS)) {
    const url = `${PLAYT2_RAW_BASE}/${replacement.source}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.warn('  ! %s -> %s (%d)', wikiFile, url, res.status);
      continue;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    await writeFile(path.join(OUT_DIR, replacement.servedAs), buffer);
    downloaded++;
    console.log('  %s -> %s (%d KB)', wikiFile.padEnd(28), replacement.servedAs, Math.round(buffer.length / 1024));
  }

  // Anything referenced by an article but neither recovered nor replaced.
  const stillMissing = referenced.filter(
    (f) => !ARCHIVE_RECOVERED.has(f) && !REPLACEMENTS[f],
  );

  const rows = (entries: [string, string][]) =>
    entries.map(([file, note]) => `| \`${file}\` | ${note} |`).join('\n');

  const credits = `# Image credits

Of the original wiki's **87 uploaded files, only 2 survive** in the Internet Archive.
Where a fair equivalent exists, the rest are replaced with community guide art.

## Recovered from the Internet Archive

| File | Source |
| --- | --- |
${[...ARCHIVE_RECOVERED]
  .sort()
  .map((f) => `| \`${f}\` | Original tribes2wiki.com upload |`)
  .join('\n')}

## Replaced from PlayT2-Modern

Sourced from [ChocoTaco1/PlayT2-Modern](https://github.com/ChocoTaco1/PlayT2-Modern),
whose authors keep their copyright in them. The \`TWB_*\` files are the closest matches of
all: the original wiki's weapon art carried the same \`TWB\` prefix, so both sets descend
from the same community artwork.

| Serves as | From | Why it's a fair match |
| --- | --- | --- |
${Object.entries(REPLACEMENTS)
  .map(
    ([wikiFile, r]) =>
      `| \`${wikiFile}\` | \`images/${r.source}\` | ${r.note} |`,
  )
  .join('\n')}

## Still missing (${stillMissing.length})

Deliberately left unillustrated rather than filled with a picture of the wrong thing.
Several have superficially similar candidates that depict a different object.

| File | Why not replaced |
| --- | --- |
${rows(stillMissing.map((f) => [f, DELIBERATELY_UNMAPPED[f] ?? 'No equivalent available']))}

If you have originals or fair replacements for any of these, they're very welcome — see
[CONTRIBUTING.md](../../../CONTRIBUTING.md).

## Rights

*Tribes 2* is a trademark of its respective rights holders. These images illustrate
articles about the game in a non-commercial community project. See
[NOTICE.md](../../../NOTICE.md).
`;

  await mkdir(path.dirname(CREDITS_PATH), { recursive: true });
  await writeFile(CREDITS_PATH, credits, 'utf8');

  console.log('\nDownloaded %d replacement image(s)', downloaded);
  console.log('Still unillustrated: %d', stillMissing.length);
  console.log('Wrote %s', CREDITS_PATH);
}

await main();

# Tribes2Wiki

The Community Tribes 2 Wiki — a rebuild of **tribes2wiki.com**, recovered from the
Internet Archive and maintained in the open.

The original wiki ran on MediaWiki 1.16 from 2008 until it went offline. This project
recovers what the Internet Archive preserved, converts it to Markdown, and publishes it as
a static site so it can't quietly disappear again — the content lives in git, and anyone
can fix an article with a pull request.

## Status

| | Original wiki | Recovered |
| --- | --- | --- |
| Content pages | 121 | **75** |
| Uploaded files | 87 | **2** |

Roughly half the wiki is gone, including `Jericho mobile point base` — its second
most-read page. [`MISSING_PAGES.md`](MISSING_PAGES.md) lists every known gap, ordered by
how many surviving articles link to it. Rewriting those is the most useful thing a
contributor can do.

See [`NOTICE.md`](NOTICE.md) for provenance, [`CONTENT-LICENSING.md`](CONTENT-LICENSING.md)
for how content is licensed (there is no single site-wide licence), and
[`AUTHORS.md`](AUTHORS.md) for credit to the original contributors.

## Local development

```bash
npm install
npm run dev
```

Then open <http://localhost:4321>. `npm run build` produces the static site in `dist/`.

## Repository layout

```
src/content/docs/     the wiki itself, as Markdown  <- edit this
src/components/       Starlight component overrides
src/styles/           theme
scripts/              the archive import pipeline
archive/              committed record of what was imported, and from where
```

## The import pipeline

The import was a **one-time seeding step**. The Markdown in `src/content/docs/` is now the
source of truth — re-running `npm run convert` regenerates it from the archive and will
**overwrite any hand edits**. The scripts are kept in the repository so the import is
reproducible and auditable, not because they should be run routinely.

| Command | What it does |
| --- | --- |
| `npm run fetch-archive` | Queries the Wayback CDX index, caches every surviving capture, writes `archive/manifest.json` |
| `npm run fetch-history` | Recovers per-revision authorship from archived history pages into `archive/history.json` |
| `npm run convert` | Converts cached captures to Markdown, writes `archive/import-report.json` |
| `npm run report-missing` | Regenerates `MISSING_PAGES.md` from the import report |
| `npm run replay-history` | Replays the recovered content as git commits attributed to their original authors |

Raw captures are cached in `archive-cache/`, which is gitignored — `archive/manifest.json`
records the URL, timestamp and SHA-256 of every capture, so the cache can be rebuilt
exactly.

### Notes for anyone re-running the import

- Wayback rate-limits aggressively; the fetcher is deliberately slow and resumable.
- tribes2wiki.com lapsed and became a domain-parking page, which the Wayback Machine kept
  crawling under the old `/wiki/` URLs. Captures without MediaWiki markers are rejected.
- The wiki answered on both `tribes2wiki.com` and `www.tribes2wiki.com`, so a single crawl
  appears as two CDX rows; captures are deduplicated by timestamp.
- Distinct titles can slug to the same path (`Targeting laser` vs `Targeting Laser`). Both
  are kept and reported under "Possible duplicates" in `MISSING_PAGES.md` rather than one
  silently overwriting the other.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). The short version: edit the Markdown, open a pull
request.

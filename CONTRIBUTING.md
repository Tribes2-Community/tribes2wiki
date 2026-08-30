# Contributing

Anyone can improve this wiki. You don't need to know Astro, or run anything locally — the
wiki is Markdown files, and GitHub can edit those in the browser.

## Fixing or expanding an article

1. Find the page under `src/content/docs/`, or click **Edit page** at the bottom of any
   article on the site.
2. Edit the Markdown.
3. Open a pull request describing what you changed.

Leave the `source:` block in the frontmatter alone — it records where the article was
recovered from, and the site uses it to credit the original authors.

## Writing a missing article

About half the original wiki was never captured by the Internet Archive.
[`MISSING_PAGES.md`](MISSING_PAGES.md) lists what's gone, sorted by how many surviving
articles link to it — the pages at the top are the ones readers hit dead ends on most
often.

To adopt one, create a Markdown file in the section it belongs to:

```markdown
---
title: 'Missile launcher'
description: 'A one-line summary, shown in search results and previews.'
categories:
  - 'Weapons'
---

Article text goes here.
```

Sections map to the sidebar: `weapons`, `armors`, `equipment`, `base-assets`, `tactics`,
`maps`, `scripting`, `start`, `reference`, `project`.

Write it from your own knowledge of the game. Don't paste text from forums or other
wikis: that writing belongs to whoever wrote it. Read a source, then write what you know
in your own words — facts about how the game plays aren't anyone's property, only the
particular words used to describe them.

Where material from another author does appear on a page, credit it — they keep their
copyright in it:

```yaml
attribution:
  - source: "TribesNEXT: A newbie's guide"
    author: WiiMote
    url: https://www.tribesnext.com/forum/discussion/340/a-newbie-039-s-guide
    extent: Adapted
```

## Style

The original wiki's conventions are worth keeping:

- Bold the article's subject on first use.
- Link the first mention of another article, not every mention.
- Write about the game as it plays, not as a changelog.
- Mods differ; say which mod a claim applies to when it matters.

## Marking a page as needing work

Imported stubs carry a banner. To add one:

```markdown
:::note[Stub]
This article is a stub and requires additional information.
:::
```

Use `:::caution[Cleanup needed]` for articles that need reorganising rather than expanding.

## Images

Most of the original wiki's 87 uploaded images were lost. If you have replacements, add
them under `src/assets/images/` and record where they came from in
`src/assets/images/CREDITS.md`. Only contribute images you have the right to share.

## Licensing your contribution

There is no site-wide content licence — see
[CONTENT-LICENSING.md](CONTENT-LICENSING.md). You keep copyright in what you write. Code
contributions are [MIT](LICENSE).

If you care about how your writing may be reused, say so on your pull request.

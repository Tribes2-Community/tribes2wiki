---
title: 'Making changes'
description: 'How to suggest a correction or edit the wiki yourself, whether or not you have used GitHub before.'
categories: []
---

Anyone can improve this wiki. There are two ways in: **suggest a change** and let someone
else make it, or **make the change yourself**. Neither needs you to install anything, and
neither needs you to know git.

The old wiki required an account approved by a bureaucrat, because spam bots outnumbered
real people. That's no longer how it works — changes here are proposed openly and reviewed
before they go live.

## Suggesting a change

Use this if you've spotted something wrong, know a page is missing, or just don't fancy
editing files.

1. Go to [the issue tracker](https://github.com/Tribes2-Community/tribes2wiki/issues).
2. Click **New issue**.
3. Say what's wrong or what's missing. A page name and a sentence is plenty.

You'll need a free GitHub account, and that's the only barrier. Useful things to report:

- An article says something that isn't true, or is true only in certain mods.
- A page contradicts another page.
- Something was mangled in the recovery — a broken heading, a stray character, text in the
  wrong order.
- A missing image you have a replacement for.
- An article you'd like to exist.

Recovery mistakes are genuinely worth reporting. Every article here was reconstructed from
archived HTML, and while it converted cleanly, nobody has read all 75 pages closely.

## Editing a page yourself

Every article has an **Edit page** link at the bottom. It opens that page on GitHub, ready
to edit in your browser.

1. Click **Edit page** at the foot of the article.
2. Edit the text. It's [Markdown](https://www.markdownguide.org/basic-syntax/) — `**bold**`,
   `_italic_`, `## Heading`, `- bullet`.
3. Scroll down, describe what you changed, and click **Propose changes**.
4. Click **Create pull request**.

That's it. Your change gets reviewed and merged. If something's wrong with it, someone will
say so on the pull request rather than silently discarding it.

Leave the block at the very top of the file alone — the part between `---` lines. It holds
the page title and, on recovered articles, a record of which archived copy the text came
from.

## Writing a missing article

About a third of the original wiki was never captured by the Internet Archive and is simply
gone. [The restoration](/project/restoration) explains what happened;
[MISSING\_PAGES.md](https://github.com/Tribes2-Community/tribes2wiki/blob/main/MISSING_PAGES.md)
lists what's absent, ordered by how many surviving articles link to it — the ones at the top
are where readers currently hit dead ends.

To write one, create a file in the section it belongs to and start it like this:

```markdown
---
title: 'Missile launcher'
description: 'One line, shown in search results and link previews.'
categories:
  - 'Weapons'
---

Article text goes here.
```

Sections match the sidebar: `weapons`, `armors`, `equipment`, `base-assets`, `tactics`,
`maps`, `scripting`, `start`, `reference`, `project`.

If an article is a rough start rather than a finished piece, say so at the top — it's better
to have a stub than nothing:

```markdown
:::note[Stub]
This article is a stub and requires additional information.
:::
```

## Writing in your own words

Please don't paste text in from forums, other wikis or old guides. That writing belongs to
whoever wrote it, and it isn't ours to move here.

Reading a source and then writing what you know is always fine. Facts about how the game
plays aren't anyone's property — only the particular words used to describe them are. See
[Community resources](/project/community-resources) for places worth reading first.

## House style

Worth keeping, mostly inherited from the original wiki:

- Bold the article's subject the first time it appears.
- Link the first mention of another article, not every mention.
- Say which mod a claim applies to when it matters — behaviour varies a lot between them.
- Write about the game as it plays, not as a changelog of patches.

## Anything else

The full contributor guide, including how images and credits are handled, is in
[CONTRIBUTING.md](https://github.com/Tribes2-Community/tribes2wiki/blob/main/CONTRIBUTING.md).
If you're unsure about anything, open an issue and ask — that's a perfectly good use of the
tracker.

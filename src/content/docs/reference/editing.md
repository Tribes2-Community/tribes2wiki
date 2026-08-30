---
title: 'Editing'
description: 'How to edit this wiki: raise an issue to flag something, or open a pull request to change it yourself. Plus the guidelines this wiki is written to.'
categories: []
source:
  url: 'http://www.tribes2wiki.com/wiki/Help:Editing'
  archived: 'https://web.archive.org/web/20110828204447id_/http://www.tribes2wiki.com:80/wiki/Help:Editing'
  lastModified: '2010-01-06T23:29:00.000Z'
---

This wiki no longer runs on MediaWiki. It is a static site built from Markdown files in a
[public GitHub repository](https://github.com/Tribes2-Community/tribes2wiki), so editing
works differently to the old site — there are no accounts to have approved, no wikitext,
and no bureaucrats to ask.

The [guidelines](#guidelines) below still stand, and are worth reading whichever route you
take.

## Two ways to change something

### Raise an issue

Use this to flag something without editing it yourself — a page that's wrong, a page
that's missing, or something mangled in the recovery from the archive.

[Open an issue](https://github.com/Tribes2-Community/tribes2wiki/issues). A page name and a
sentence is enough. All it needs is a free GitHub account.

### Open a pull request

Use this to make the change yourself. Every article has an **Edit page** link at the
bottom, which opens that file on GitHub ready to edit in your browser — no git, no local
checkout, nothing to install.

Edit the text, describe what you changed, and click through to create the pull request. It
gets reviewed and merged, and if something needs adjusting someone will say so on the pull
request rather than quietly dropping it.

[Making changes](/project/making-changes) walks through both routes in more detail.

## Writing pages

Pages are [Markdown](https://www.markdownguide.org/basic-syntax/), not wikitext. The
common things:

| What | How |
| --- | --- |
| Bold | `**bold text**` |
| Italic | `_italic text_` |
| Heading | `## Heading`, `### Sub-heading` |
| Bullet | `- item` |
| Link to another article | `[spinfusor](/weapons/spinfusor)` |
| Link to an external site | `[TribalWar](https://www.tribalwar.com)` |
| Image | `![Description](/images/File.png)` |

A few differences from the old wiki worth knowing:

- **Links are paths, not page names.** `[[spinfusor]]` becomes
  `[spinfusor](/weapons/spinfusor)`. Broken internal links fail the build, so a typo is
  caught before it reaches the site rather than showing up as a red link.
- **There are no redirects or templates.** Alternate names are handled by writing the
  article once and linking to it. Old MediaWiki URLs still resolve — `/wiki/Spinfusor`
  forwards to the new address — so links from forum posts and search results keep working.
- **The table of contents builds itself** from your headings; nothing to declare.
- **Every page starts with a frontmatter block** between `---` lines, holding the title and
  description. On recovered articles it also records which archived capture the text came
  from. Leave that alone unless you're deliberately changing it.

To mark an article as unfinished rather than leaving it bare:

```markdown
:::note[Stub]
This article is a stub and requires additional information.
:::
```

### Creating a page

Add a Markdown file to the section it belongs to under `src/content/docs/`, starting with:

```markdown
---
title: 'Missile launcher'
description: 'One line, shown in search results and link previews.'
categories:
  - 'Weapons'
---

Article text goes here.
```

Sections map to the sidebar: `weapons`, `armors`, `equipment`, `base-assets`, `tactics`,
`maps`, `patches`, `scripting`, `start`, `reference`, `project`.

About a third of the original wiki was never captured by the Internet Archive.
[MISSING\_PAGES.md](https://github.com/Tribes2-Community/tribes2wiki/blob/main/MISSING_PAGES.md)
lists what's gone, ordered by how many surviving articles link to it — the entries at the
top are where readers currently hit dead ends.

### Writing in your own words

Don't paste text in from forums, other wikis or old guides without asking. That writing
belongs to whoever wrote it. Read a source, then write what you know — facts about how the
game plays aren't anyone's property, only the particular words used to describe them.

## Guidelines

### Content

#### If it exists, we want to know about it

We encourage users to create pages and discuss things regarding absolutely any aspect of Tribes 2 in the entire history of the game. No matter how insignificant it seems, we still would love to have a page for it - or at least part of a page. If this means creating a page for yourself where you talk about your history and achievements as a Tribes 2 player, then have at it. If it means creating a page about a map that no one played more than 10 times, then have at that as well. If there is a problem where one name can refer to two different things, and one of them is significantly more common/important than the other, then use parenthesis to distinguish them. The less important thing should be marked with the parenthesis. _Example_: chaingun (player) as opposed to [chaingun](/weapons/chaingun "Chaingun").

#### Stick to the facts - or close to them, at least

If you do make a page about yourself - or anything for that matter - just don't lie about things. If you try to say you're a member of Team 5150, or that you are the best player in the game with the [shocklance](/weapons/shocklance "Shocklance"), we will get on your case about that. On a side note, please don't create pages of players just to defame them. Negative _facts_ are allowed, but things like "this guy is an incredibly terrible and clueless newbie who has no idea how to play the game, let alone run a server that doesn't suck" are not a very good idea. Then again, I can think of some people where that statement is actually true. Even so, please avoid that kind of blatant libel (subtle libel may be acceptable).

#### Not everything needs its own page

Back to the point, also try to determine whether the subject you are discussing would do better as its own page, or inside another page. If your subject is only relevant to one specific thing in Tribes 2, you should probably just add it to the page for that one specific thing rather than create a new page. _Example_: chainwhore points to a paragraph inside the [chaingun](/weapons/chaingun "Chaingun") page.

### Bias and opinions

This wiki is two things:

1.  An in-depth guide to all information about everything in Tribes 2 (or at least, that's our goal).
2.  A commentary on various aspects of the game as they are viewed by highly experienced players.

The first is expected, but the second is something that is uncommon for most wikis. This wiki is operated and reviewed by several of the most experienced players in the history of the game, and through our experience, we have come to view things a certain way. We know what it takes to develop your skills, we know what makes a player good, we have been around the block a few times and tried just about everything there is to try in this game. As a result, the "commentary" referred to above will be designed to guide readers in the direction of learning to become good players. When we discuss things that we know to be detrimental to someone's playing ability, we will do so with a negative bias. When we come across a subject that is disputed between good/experienced players and bad/inexperienced players, we will criticize the viewpoint of the inexperienced players in a way that presents as much of both sides as possible, while explaining why our side is the more significant one. We will do this solely to aid readers, in the hopes that they will one day become one of Tribes 2's finest. It has everything to do with presenting information in the most helpful way possible. Think of it this way - if you want to know something about being a doctor, would you rather hear it from a medical school student, or a real doctor? This wiki is the equivalent of the real doctor's opinion.

---
title: 'The restoration'
description: 'How this wiki was recovered from the Internet Archive after tribes2wiki.com went offline, what survived, and what is still missing.'
categories: []
---

This is a rebuild of **tribes2wiki.com**, the Tribes 2 community wiki that ran from 2008
until it went offline. This page explains what happened to it, what could be saved, and
what still needs writing.

## What happened

The original wiki ran on MediaWiki 1.16. At its peak it held **121 content pages** and
**87 uploaded images**, built up over roughly 1,620 edits by 27 registered contributors.
Its own statistics page recorded more than 136,000 page views.

Then the site went offline, the domain lapsed, and for a while the address served a
domain-parking page instead. Everything that had been written there was gone.

## What survived

Not all of it was lost. The Internet Archive's crawlers had visited the wiki between 2009
and 2011, and those captures were enough to rebuild a substantial part of it.

| | Original wiki | Recovered |
| --- | --- | --- |
| Content pages | 121 | **75** |
| Uploaded images | 87 | **2** |

Around **62% of the articles** came back. The images fared far worse — only two survived
the crawls, because the Archive rarely captured the wiki's uploaded files.

## How it was rebuilt

Every surviving capture was pulled from the Internet Archive and converted from MediaWiki
HTML into Markdown. The wiki now lives in a public git repository, which means it can be
edited by pull request and can't quietly vanish again the way the original did.

A few details of the recovery are worth recording:

- **Multiple captures per page.** Where the Archive visited a page more than once, each
  visit may hold a different revision. MediaWiki stamped every page with its last-modified
  date, which made it possible to tell genuinely different revisions apart from repeat
  crawls of an unchanged page.
- **Real authorship, where it survived.** For eight pages the Archive also captured the
  revision history, naming who made each edit and when. Those edits are preserved in the
  repository's commit history under their original authors and dates, the oldest going back
  to November 2008.
- **Post-shutdown captures were discarded.** After the domain lapsed the Archive kept
  crawling the parking page under the old article URLs. Those captures are not wiki content
  and were filtered out.

## What is still missing

Roughly a third of the articles were never captured and are simply gone. Among them is
**Jericho mobile point base**, which had been the second most-read page on the entire
wiki, along with **Turret** and **Sensor jammer pack**.

The full list lives in
[MISSING\_PAGES.md](https://github.com/Tribes2-Community/tribes2wiki/blob/main/MISSING_PAGES.md)
in the repository, ordered by how many surviving articles link to each one — so the pages
at the top are the ones readers hit dead ends on most often.

Most of the lost images have been replaced with community guide art where a fair
equivalent existed. Where no honest match was available — the base turret barrels, for
instance — the articles are left unillustrated rather than showing a picture of the wrong
thing.

## Credit

The articles here were written by the community of the original wiki. The most prolific
contributor by a wide margin was **Kryand**, who also turns up on the TribesNEXT forums
pointing newcomers toward the wiki. Others recoverable from the archived histories include
**Eolk**, **Red Shifter**, **Misanthropic**, **DS**, **Maychill101**, **Redirect fixer**
and **Teratos**, along with a number of contributors who edited without an account.

That list is necessarily incomplete — revision histories survive for only eight of the
wiki's pages, so the great majority of contributions can't be attributed to anyone by
name. If you wrote for the original wiki and are missing from the credits, please
[open an issue](https://github.com/Tribes2-Community/tribes2wiki/issues).

## Helping

The most useful thing anyone can do is write one of the missing articles. You don't need
to know how the site is built — the wiki is Markdown files, and GitHub can edit them in a
browser. See
[CONTRIBUTING.md](https://github.com/Tribes2-Community/tribes2wiki/blob/main/CONTRIBUTING.md).

Write from your own knowledge of the game. Please don't paste text from forums or other
wikis without asking: that writing belongs to whoever wrote it. See
[Community resources](/project/community-resources) for places to refresh your memory
before writing something in your own words.

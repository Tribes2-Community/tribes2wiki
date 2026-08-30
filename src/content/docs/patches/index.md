---
title: 'Community patches'
description: 'Tribes 2 is kept playable by TribesNEXT, a community patch line running since 2009. An overview of the releases and which one you want.'
categories: []
sidebar:
  order: 1
---

Tribes 2 shipped in 2001 and its official multiplayer services are long gone. The game is
still played because the community rebuilt the parts that went away and has kept patching
it ever since.

Almost all of that work is **[TribesNEXT](https://www.tribesnext.com)**, which provides the
account system, the master server, and ongoing fixes for the freeware release. It has run
continuously since January 2009. Everything below is a TribesNEXT release, not a competing
project — though the newest of them is a rewrite rather than a continuation of the older
line.

The RC line, written by Thyth, ended at RC2a and is no longer developed. Current work is
Krash's [QOL patches](/patches/qol-patches), still active as of 2026.

| Release | What it is | Status |
| --- | --- | --- |
| [RC1 series](/patches/rc-releases) | The original patch line, RC1a–RC1e | Superseded |
| [RC2 series](/patches/rc-releases) | Current stable, RC2a | **Recommended** |
| [RC3, RC4, RC5](/patches/unreleased-rc) | Planned but never shipped | Cancelled |
| [QOL patches](/patches/qol-patches) | Native rewrite, modern hardware support | **Active** |

## Which one do I want?

**[RC2a](/patches/rc-releases).** It's the current stable release and what most players run.
Without a TribesNEXT patch you cannot create an account, browse servers or join a game at
all.

**A [QOL patch](/patches/qol-patches)** if the game misbehaves on a modern machine — wrong
resolutions, a HUD too small to read at high DPI, poor frame pacing, or trouble with recent
AMD drivers. These are a native rewrite of the RC patches rather than a continuation of
them, but they stay compatible with RC2, so you can still play alongside everyone else.

Both are generally regarded as equally stable. The practical difference is that the RC
releases embed a Ruby interpreter and run account code through it, which tends to produce
noticeable runtime hitching as that code executes. The QOL builds reimplement that natively,
with no interpreter to stall on, so that particular stutter goes away.

## A note on older patches

Tribes 2 has accumulated a lot of unofficial binary patches over the years, distributed
through forums and mod packs. Some are still useful, many are abandoned, and a few conflict
with current patches.

The QOL patches disable the old MemPatch loading mechanism by default for this
reason: patches written against the previously-modified executable can collide with it, and
running unreviewed binary patches carries obvious risk. There's a flag to turn it back on if
you know what you need.

Get patches from TribesNEXT directly rather than a re-upload. Official installers are
digitally signed, so you can check the publisher before running one.

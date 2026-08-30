---
title: 'Tribes 2'
description: 'How to install Tribes 2, patch it so you can play online, and find a server. The game is free, and the community still runs it.'
categories: []
---

**Tribes 2** was released in 2001 by Dynamix, the last entry in the Starsiege: Tribes
series. It is free, it still works, and people still play it — but its official multiplayer
services were switched off long ago, so a stock installation cannot see a server. Getting
online takes two things: the game, and a community patch.

There are two routes. Pick one.

## The quick route: Tribes 2 Config AIO

[PlayT2.com](https://playt2.com/#install) offers a **Tribes 2 Config AIO** — a fresh
install with map packs, scripts, interpolation settings and textures already included. It
is the fastest way in and the one to recommend to a new player, because it skips the
configuration entirely.

If you use the AIO, you're done. Skip to [finding a server](#where-people-play).

## The manual route: game, then patch

### 1. Install the game

Download the stock installer, **`tribes2gsi.exe`**, from
[TribesNEXT](https://www.tribesnext.com/downloads) — roughly 539 MB. It is the original
shareware release and installs the game itself, but nothing that lets you play online.

### 2. Apply a TribesNEXT patch

Without one you cannot create an account, browse servers, or join a game. Two are
available, and they are [both regarded as equally stable](/patches/):

**The [quality-of-life patch](/patches/qol-patches) — recommended.** A native rewrite
aimed at modern hardware: proper widescreen and ultrawide support, a FOV slider, far
better frame pacing, UI scaling that makes the HUD legible on a high-DPI display, and
fixes for the flickering seen on recent AMD drivers. It also drops the Ruby interpreter the
older patches rely on, removing the runtime hitching they are known for.

It needs a CPU with SSE4/AVX (roughly 2012 onward), a GPU supporting OpenGL 3.2 (roughly
2009 onward), and Windows Vista or newer. Get it from the
[announcement thread](https://www.tribesnext.com/forum/discussion/4430/preview-qol-fixes-update),
which always links the current build.

**[RC2a](/patches/rc-releases) — the stable fallback.** If your machine predates those
requirements, or you'd rather run the long-established build, RC2a is on the
[TribesNEXT downloads page](https://www.tribesnext.com/downloads). It's a 2 MB download.

Only take installers from TribesNEXT directly. They are digitally signed, so Windows shows
a verified publisher.

### 3. Create an account

Launch through the **Tribes 2 Online** shortcut the patch installs, choose **Create
Account** in game, and follow the prompts. Set up your appearance and voice on the
**WARRIOR** tab, then use **JOIN** for the server list.

If no servers appear, it is almost always a firewall or anti-virus blocking the game's
HTTP traffic — the server list is fetched over HTTP, and "link scanning" features tend to
eat it. See [common problems](/patches/rc-releases#common-problems).

## Where people play

Tribes 2 is small now, but not empty. Servers are community-run, most busy in the evenings,
and each has its own character:

| Server | Hosted by | |
| --- | --- | --- |
| **[Legacy CTF+](/community/legacy-ctf-plus)** | ChocoTaco | The general pub |
| **[\| The Cut \| Back to Ymir](/community/the-cut)** | YTBlake and IrvinT2 | Saturday PUGs |
| **[Fission Core](/community/fission-core)** | FlakPyro | General community servers |
| **[Dad Tribes](/community/dad-tribes)** | Jerry and Gunther | Pub, and Friday PUGs |
| **[Ski Club](/community/ski-club)** | slush | 5v5 LCTF PUGs |
| **[Wilderzone](/community/wilderzone)** | GeekOfWires | Development and testing |

More on each, and on the difference between a pub and a PUG, under
[Modern community](/community/).

If a server looks empty, it's worth asking in the community Discord linked from
[PlayT2.com](https://playt2.com) — pickup games and scrims are usually organised there
rather than by sitting in an empty server.

## Next steps

- [Introduction to Tribes 2](/start/introduction-to-tribes-2) — how the game actually plays
- [Loadout](/start/loadout) — armours, weapons and packs
- [Skiing](/tactics/skiing) — the movement technique the whole game is built around
- [Community patches](/patches/) — what each patch does, and which you want

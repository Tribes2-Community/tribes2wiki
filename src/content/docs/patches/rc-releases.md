---
title: 'TribesNEXT RC releases'
description: 'The RC1 and RC2 release candidate series that restored accounts and the master server. RC2a is the current stable patch and required to play online.'
categories: []
sidebar:
  order: 2
---

The **release candidate** series is the TribesNEXT patch line that has kept Tribes 2 online
since January 2009. It provides the account system, the master server that lists games, and
long-term support fixes for the freeware release.

If you want to play Tribes 2 online, one of these is not optional — without a TribesNEXT
patch you can't create an account, browse servers or join a game.

- **Current stable release:** RC2a
- **Download:** <https://www.tribesnext.com/downloads>

## Why they're needed

When Tribes 2's commercial life ended, the authentication and master servers it depended on
were switched off. The game shipped expecting those services to exist, so a stock
installation has no way to verify an account or discover a server, and multiplayer simply
stops working.

TribesNEXT replaces that infrastructure. Accounts are created in-game against the community
service rather than the original one, and the master server provides the list you see on
the **JOIN** tab.

## The RC1 series

The launch version, released through sub-versions **RC1a to RC1e**. It established what the
patch line does:

- A Ruby 1.8.7 interpreter integrated with the game
- In-game account creation
- In-game server listing
- In-game chat over IRC

RC1 is a **predecessor to RC2 and uses a different account registration protocol**, so the
two are not interchangeable. There is no reason to run RC1 today.

## The RC2 series

The current line, with **RC2a** as the stable release most players use. According to
TribesNEXT's [development roadmap](https://tribesnext.com/forum/discussion/508/development-roadmap),
posted by Thyth in February 2009, RC2 brought:

- Ruby upgraded to 1.9.0, with a much improved interpreter interface that handles newlines
  properly and so can run nearly any Ruby script
- A basic error handler, so Ruby errors surface instead of vanishing silently
- Support for modifying the native game code dynamically in memory
- The Ruby process now exits properly when the game closes unexpectedly, rather than leaving
  orphaned processes behind
- Server- and client-side support for DCE certificates, which carry a player's current name,
  clan and clan memberships — the foundation of the intended clan and browser system
- An early version of the anticheat framework
- Changes to the authentication server protocol preventing malformed RSA keys from being
  written into accounts

## Ruby and runtime hitching

Both the RC releases and the [QOL patches](/patches/qol-patches) are generally regarded as
**equally stable**. The practical difference is Ruby.

The RC patches embed a Ruby interpreter and run account-related code through it. That work
happens while the game is running, and it tends to produce noticeable **runtime hitching** —
brief stalls as the interpreter executes. It's inherent to the design rather than a bug.

The QOL patches are a native rewrite with no interpreter involved, which is the main reason
to prefer them if the stutter bothers you.

## Installing

1. Install Tribes 2 itself. The full game is a free download of roughly 539 MB.
2. Apply the TribesNEXT patch — a small download, around 2 MB.
3. Launch through the **Tribes 2 Online** shortcut the patch installs.
4. Choose **Create Account** in-game and follow the prompts.
5. Set up your appearance and voice on the **WARRIOR** tab, then use **JOIN** for the server
   list.

Only download installers from TribesNEXT directly. Official binaries are digitally signed,
so Windows shows a verified publisher when you run one.

## Hosting a server

The only port you need to open is the one your server listens on. The default is
**28000 (UDP)**.

## Common problems

**No servers listed, or can't reach authentication.** Almost always a firewall or
anti-virus blocking the game's HTTP traffic, since the server list is fetched over HTTP.
Features marketed as "link scanning" or HTTP filtering are the usual culprits, and some
anti-virus products need a full reinstall to properly disable them. Check the patch is
actually installed first.

**"Unhandled exception" on first launch.** Usually out-of-date or incompatible display
drivers. It can also happen when the game defaults to a 4:3 fullscreen resolution your
display won't accept — running windowed lets you pick a supported resolution.

**Flickering on recent AMD cards.** A known issue with a script fix available from the
TribesNEXT forums. The [QOL patches](/patches/qol-patches) resolve it properly.

**Jittery game or server.** Pinning the game to a single CPU core often helps.

## What came next

Several further releases were planned and never shipped — see
[unreleased RC patches](/patches/unreleased-rc). Development of the RC line stopped at RC2a,
and the work that followed took a different route: the [QOL patches](/patches/qol-patches)
reimplement the patch natively rather than continuing this codebase, while staying
compatible with RC2 servers.

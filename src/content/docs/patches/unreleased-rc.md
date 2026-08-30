---
title: 'Unreleased RC patches'
description: 'RC3, RC4 and RC5 were planned for TribesNEXT and will not be produced. What each was meant to contain, and what became of the features instead.'
categories: []
sidebar:
  order: 3
---

TribesNEXT's [development roadmap](https://tribesnext.com/forum/discussion/508/development-roadmap)
laid out releases beyond [RC2](/patches/rc-releases) that were never published. RC2a remains
the last stable release of the RC line, and it is where that line ends.

This page records what was planned, because the intentions still turn up in old forum
threads and in the wiki's own archived news — the
[2010 IRC entry](/) refers to changes expected in RC3 that never arrived.

:::caution[These will not be produced]
None of the releases described here exist, and none are coming. Thyth, who wrote the
roadmap and the RC patches, no longer works on TribesNEXT, and development of the RC line
ended with RC2a.

Treat this page as history rather than a list of things still on the way. If you want a
patch to install, you want [RC2a](/patches/rc-releases) or a
[QOL patch](/patches/qol-patches).
:::

## RC3

The most fully documented of the unreleased versions, and the one closest to happening. It
was slated to bring:

- **An overhauled IRC client**, replacing the in-game chat implementation. The wiki's 2010
  news entry about the in-game chat server becoming hostile to Tribes players points at RC3
  as the fix, since it was to repoint chat at a more stable network.
- **A Linux and macOS distribution** compatible with Wine and CrossOver Games. A pre-RC3
  testing build was circulated on the forums at the time.
- **Reactivation of the community features** — T-Mail and the player/clan browser — with the
  intention of making them usable from a web browser as well as in-game, so clans could be
  managed without launching the game.
- **A revised anticheat**, adding server-side checking of client versions and improvements
  over the framework introduced in RC2.

The groundwork was real rather than speculative: RC2 already shipped DCE certificate
handling on both client and server, and the delegated community enhancement server that
would have driven the browser and mail systems was described as due to be unveiled in RC3.

## RC4

Two features were slated for RC4, both aimed at server operators rather than players:

- **A comprehensive, customisable anticheat system.** Where RC3's anticheat was an
  incremental revision, this was to be the full version: a black-box set of server-side APIs
  plus a sample implementation of roughly Defense Turret's capabilities. Crucially it was to
  be **entirely optional**, with each server operator deciding what their own anticheat
  actually enforced.
- **An API for building and reading ZIP files**, so servers could hand players custom
  resource packages on demand. The archive format was chosen deliberately to keep the
  transfer to data only — no executable code, and nothing else unwanted reaching the client.

:::caution[Don't confuse RC4 the release with RC4 the cipher]
Searching the TribesNEXT forums for "RC4" returns a great deal about cryptography rather
than about a patch. TribesNEXT's account system encrypts a user's private key with the
**RC4 stream cipher**, so technical threads use the term constantly in that sense. The two
are unrelated.
:::

## RC5

The furthest-out release on the roadmap, with two items:

- **UPnP support**, adding an IGDP (Internet Gateway Device Protocol) client so the game
  could configure port forwarding by itself on the consumer routers that support it. The
  intent was to cut down the steady stream of players who couldn't get forwarding or
  firewall rules working by hand. It was to trigger only when the listing server actually
  reported a forwarding problem, rather than running on every launch.
- **Leaving `Tribes2.exe` untouched on disk.** The patch's code loader would have been
  reworked to run as a replacement for `IFC22.dll` — the library handling force feedback
  support that essentially nobody used — instead of modifying the game executable itself.

That second item is worth noting, because it eventually happened. The
[QOL patches](/patches/qol-patches) no longer modify `Tribes2.exe` during installation,
delivering in a native rewrite what RC5 had planned to achieve by swapping out a DLL.

## What happened instead

Development of the RC line stopped after RC2a and did not resume; Thyth has since moved on
from TribesNEXT. The work that followed, years later, came from Krash and didn't continue
either the sequence or the codebase: the [QOL patches](/patches/qol-patches) are a native
rewrite, and they target stability, performance and modern hardware compatibility rather
than the community features and server tooling RC3 to RC5 were aimed at.

A few of the old goals did land there by other means — Wine support, for instance, ships in
the QOL builds out of the box, roughly fifteen years after RC3 first promised a
Wine-compatible distribution.

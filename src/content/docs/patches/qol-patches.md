---
title: 'TribesNEXT QOL patches'
description: 'A native rewrite of the TribesNEXT patch by Krash, bringing Tribes 2 up to date with modern hardware: better frame pacing, ultrawide support, UI scaling and rewritten networking.'
categories: []
sidebar:
  order: 4
---

The **quality-of-life** patches are TribesNEXT releases by **Krash**, aimed at stability,
performance, and getting Tribes 2 running properly on hardware two decades newer than the
game.

They are a **native rewrite** of the [RC patches](/patches/rc-releases), not a continuation
of them. The RC line's account handling ran through an embedded Ruby interpreter; this is a
fresh native implementation of the same job. It remains **compatible with RC2**, so patched
and unpatched players can share servers, but it does not carry the RC codebase forward.

:::note[Actively developed]
Krash is still working on these patches as of 2026. Unlike the
[RC line](/patches/unreleased-rc), which ended at RC2a, this is where TribesNEXT
development currently happens.
:::

Several builds have been released as testing continues, so check the
[announcement thread](https://www.tribesnext.com/forum/discussion/4430/preview-qol-fixes-update)
for the current one. Feedback and bug reports belong there too, with crash logs, demos and
reproduction steps where you can manage them.

## Should I install it?

Worth trying if the game misbehaves on a modern machine: bad frame pacing, a HUD too small
to read on a high-DPI display, no sensible ultrawide support, or trouble with recent AMD
drivers. If your install already runs fine, RC2a alone is enough.

These and [RC2a](/patches/rc-releases) are generally regarded as **equally stable**. The
practical difference is Ruby: the RC patches embed a Ruby interpreter and run account code
through it, which tends to cause noticeable runtime hitching as that code executes. Being a
native rewrite, these builds have no interpreter to stall on, so that stutter goes away.

## Requirements

The preview raises the bar above stock Tribes 2:

| | Requirement |
| --- | --- |
| CPU | SSE4/AVX support — roughly 2012 onward |
| GPU | OpenGL 3.2 or later — roughly 2009 onward, plus a little more VRAM |
| OS | Windows Vista / Server 2008 or newer |

Builds without the AVX requirement may appear later, but the OpenGL and Windows versions
are hard cutoffs for the changes involved.

## What it changes

### Engine and timing

The game loop and time management were rewritten to always use high-resolution timing,
which is where most of the smoothness comes from. Servers no longer lose timing accuracy
the longer they stay up, although a hard limit remains at roughly 49 days before the
internal timer overflows. The memory manager has been replaced.

MemPatch is disabled by default: older binary patches can conflict with this one, and
running unreviewed patches is risky. The `-developer` flag re-enables it.

### Accounts

`Tribes2.exe` is no longer modified by the installer, and **Ruby is no longer bundled** —
account handling is now native, which removes the interpreter hitching the RC releases are
known for. Patched clients use a faster native authentication handshake, and servers can
require it. Script-based handshakes still work for connecting to unpatched servers.

### Rendering

Perspective projection is corrected for widescreen and ultrawide displays, with a FOV
slider, multisample anti-aliasing, render scaling and selectable texture filtering. Textures
are no longer capped at 512×512, mipmapping moved to the GPU, and dynamic shadow resolution
is doubled.

A reverse-Z floating point depth buffer greatly reduces z-fighting on thin or distant
geometry. Terrain texture blending now runs on the GPU at roughly double the previous
resolution, and baked terrain shadows use bicubic filtering with subtle ambient occlusion.
Frame rates up to 1000 are possible, and long-standing problems with recent AMD drivers are
resolved.

### Networking

Substantially rewritten, while keeping the game protocol compatible with existing servers
and demo recordings.

Servers now send updates to every client as soon as possible after each tick, instead of
leaving some players waiting — fairer and more responsive. Hosts can raise the packet rate
above 32 per second and the packet size up to 1000 bytes, both recommended for large
servers, and can set a faster burst rate for clients still loading. Clients send movement
and trigger input at the earliest opportunity.

Failed DNS lookups no longer crash the game, IPv6 transport has been added, and IPX support
is gone.

### Audio

Miles was updated with fixes for several memory leaks and for the ADPCM decoding bug behind
the jet thrust glitch. **OpenAL** is now available as an alternative sound driver, with
environmental reverb and more simultaneous sounds.

### Input

Windowing and input move to SDL3. Raw mouse input is always on, so **you may need to revisit
your sensitivity** — the game previously went through the system's pointer acceleration.
Basic gamepad support is included, every mouse button can be bound, and the stray characters
that used to appear when opening chat are fixed.

### Interface

A UI scaling slider follows your system DPI setting, finally making the HUD legible at high
resolutions. An aspect ratio limiter stops the interface sprawling to the edges of very wide
displays, and a new scalable text renderer keeps type sharp at any size.

### Other additions

Borderless and exclusive fullscreen with refresh rate selection, modern HTTPS support,
optional automatic downloading of terrains and interiors from the tribes2.net asset depot,
and WINE support out of the box.

## Known issues

The thread tracks these in detail and they change as testing continues. At the time of
writing: 256-colour textures are intentionally no longer supported, mirrored portal
rendering is disabled, dynamic interpolation between model detail levels is off, and demos
recorded before the patch use the original author's FOV so may look wrong on playback.

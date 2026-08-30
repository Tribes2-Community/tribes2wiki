---
title: 'Main Page'
description: 'Welcome to the Community Tribes 2 Wiki. Here you''ll find all the information you could ever want about Tribes 2. Feel free to create pages for absolutely an...'
categories: []
source:
  url: 'http://www.tribes2wiki.com/wiki/Main_Page'
  archived: 'https://web.archive.org/web/20111206203935id_/http://www.tribes2wiki.com:80/wiki/Main_Page'
  lastModified: '2011-10-10T16:35:00.000Z'
---
**Welcome to the Community Tribes 2 Wiki**. Here you'll find all the information you could ever want about [Tribes 2](/start/tribes-2 "Tribes 2"). Feel free to create pages for absolutely anything related to the game. That includes (but is not limited to) [scripts](/scripting/script "Script"), [maps](/scripting/map "Map"), [servers](/reference/server "Server"), strategies, teams and even individual players if you think there are important things to say about them.

**If you aren't familiar with Tribes 2, or you are interested in playing the game**, check out the [Introduction to Tribes 2](/start/introduction-to-tribes-2 "Introduction to Tribes 2") page. There, you will find instructions on how to download the game and play online. Non-Tribes players should also check out that page for some basic information about the game, and players interested in playing the game for the first time will find many useful tips to help them get started on learning the best first person shooter ever created.

**Before you start editing**, and possibly before you even start reading, check out the [guidelines section of the help page](/reference/editing "Help:Editing") to get a better idea of how the information here is presented. Also, because of the extreme ratio of spam bots to real people when it comes to new accounts, **all new account must be approved before they will be allowed to make changes**. The best way to accomplish this is to contact one of the Wiki bureaucrats on [IRC](/project/community-portal "Tribes2Wiki:Community portal").

* * *

[Introduction to Tribes 2](/start/introduction-to-tribes-2 "Introduction to Tribes 2") • [Tribes 2 Community](/project/community-portal-2 "Tribes2Wiki:Community Portal") • [Help Files](/reference/contents "Help:Contents")

We are currently maintaining **126** articles.

## Available Resources

### [Tribes 2 Mod Development Handbook](https://modding.tribes2wiki.com)

A teaching handbook for writing mods against vanilla Tribes 2, covering the V12 engine as
it actually shipped, TorqueScript, datablocks and the mod-path stack, the community
patches, and mapping with the mission, world and BONES editors. It merges the surviving
2002–2003 community modding tutorials with fresh analysis of the shipped game data.

Read it at **[modding.tribes2wiki.com](https://modding.tribes2wiki.com)**.

### [PlayT2.com](https://playt2.com)

The place to send anyone who wants to play. Installation instructions, the server list, an
arsenal reference and the community Discord, all kept current.

### [TribalOutpost.com](https://tribaloutpost.com)

Maps, scripts and textures — the community's download hub, and where the map archive that
outlived Tribes2Maps now lives.

### [Community resources](/project/community-resources)

Where the Tribes 2 community still gathers — TribesNEXT, The Construct, PlayT2 and
Tribes2Maps — and where to look before writing one of this wiki's
[missing articles](/project/restoration).

## Latest News

### 25 Year Anniversary Tournament — May 29, 2026

Tribes 2 turns 25, and it is being marked with a tournament: the **25 Year Anniversary
Tournament**, hosted by **the Cut** and powered by **TribalOutpost**. Sign-ups, rules and
the full schedule are at **[tribes2forever.com](https://tribes2forever.com)**.

#### Format

Six teams, drafted rather than pre-formed. The draft runs on **Sunday 13 September 2026**,
with the first round-robin matches on **27 September** and further matches on Sunday
evenings for five or more weeks. Playoffs follow, with dates still to be confirmed.

Each round-robin match is three maps, and every team plays the same maps in a given week so
scrims can be arranged against the right ground. Sides are decided in advance; playoffs use
mirrored or otherwise fairly sided maps. Full schedules and assigned servers are issued once
the draft is done.

#### Map pool

Ice Dance · Woodymyrk · Massive · Damnation · Rollercoaster · Magnum · Stonehenge · Abaddon ·
Rain Dance · DX · Beachblitz · Feign · Wilderzone · Harvester · Ocular

#### Linking your account

Entrants are asked to link their in-game account to [TribalOutpost](https://tribaloutpost.com):
generate a code from your account page there, then join the TribalOutpost Link server in
game and enter it in chat. If the linking doesn't work for you, say so — the organisers have
said nobody will be dropped over it, and the requirement is still under discussion.

Details may change through the summer and the sign-up period. Read the site itself for the
current rules, and report any problems to the organisers.

#### With thanks to

**blake (YTBlake)** · **IrvinT2** · **ChocoTaco** · **FlakPyro** · **Slush** · **Sfphinx**
— for the work that made it happen.

### TribesNEXT Quality-of-Life Patch — August 3, 2025

Krash has opened testing on a preview patch for [TribesNEXT](/project/community-resources),
a package of quality-of-life fixes aimed at stability, performance and getting the game
working properly on modern hardware. It is compatible with RC2, and the installer is
[available from TribesNEXT](https://www.tribesnext.com/forum/discussion/4430/preview-qol-fixes-update).

The preview raises the system requirements: it needs a CPU with SSE4/AVX support (roughly
2012 onward), a GPU supporting OpenGL 3.2 or later (roughly 2009 onward), and Windows
Vista or newer. Builds without the AVX requirement may follow, but the other two are hard
cutoffs. Feedback and bug reports go in the forum thread.

#### Engine and timing

The game loop and time management have been rewritten to always use high-resolution
timing, giving much steadier frame pacing. Servers no longer lose timing accuracy the
longer they stay up, though a hard limit remains at around 49 days before the timer
overflows. The memory manager has been replaced. MemPatch is disabled by default, since
older patches may conflict with this one; the `-developer` flag re-enables it.

#### Accounts

`Tribes2.exe` is no longer modified by the installer and Ruby is no longer bundled —
account handling is now a native implementation. Patched clients use a faster native
authentication handshake, and servers can require it. Script-based handshakes still work
for connecting to unpatched servers.

#### Rendering

Perspective projection has been corrected for widescreen and ultrawide displays, and a FOV
slider, multisample anti-aliasing, render scaling and texture filtering modes have been
added. Textures are no longer capped at 512×512, mipmapping moved to the GPU, and dynamic
shadow resolution is doubled. A reverse-Z floating point depth buffer greatly reduces
z-fighting on thin or distant geometry. Terrain texture blending now runs on the GPU at
roughly double the previous resolution, and baked terrain shadows use bicubic filtering
with subtle ambient occlusion. Frame rates up to 1000 are possible, and long-standing
problems with recent AMD drivers are resolved.

#### Networking

The low-level networking has been substantially rewritten while keeping the game protocol
compatible with existing servers and demos. Servers now send updates to every client as
soon as possible after each tick, rather than leaving some players waiting, which makes
delivery fairer and more responsive. Hosts can raise the packet rate above 32 per second
and the packet size up to 1000 bytes, both recommended for large servers, and can set a
faster burst rate for clients still loading. Clients send movement and trigger input at the
earliest opportunity. Failed DNS lookups no longer crash the game, IPv6 transport has been
added, and IPX support has been dropped.

#### Audio, input and interface

Miles has been updated with fixes for several memory leaks and for the ADPCM decoding bug
behind the jet thrust glitch, and OpenAL is now available as an alternative sound driver.
Input moves to SDL3 with raw mouse input always on — you may need to revisit your
sensitivity — along with basic gamepad support and the ability to bind every mouse button.
The interface gains a UI scaling slider that follows your system DPI, an aspect ratio
limiter for very wide displays, and a scalable text renderer, making the HUD legible at
high resolutions for the first time.

#### Other additions

The patch adds borderless and exclusive fullscreen with refresh rate selection, modern
HTTPS support, optional automatic downloading of terrains and interiors from the tribes2.net
asset depot, and WINE support out of the box.

### Another Tournament in the Works — July 27, 2011

After the success of the 10-year anniversary tournament, TeamWarfare has decided to host another Tribes 2 draft tournament - the first in what might be a seasonal series of tournaments. For the last tournament, Hi-Rez (the makers of Tribes: Ascend and owners of the Tribes franchise) offered prizes to the winners in the form of Tribes: Ascend merchandise, but it is yet unknown if they will be sponsoring this tournament in some way. While the 10-year anniversary tournament was set up and managed by two players, this one will be run by TWL from the get-go, so any organizational issues that people made have noticed with the last tournament should not carry over to this one. The draft will occur on August 8th, so sign-ups will be open until then. For more information, feel free to check out [this thread](http://www.teamwarfare.com/forums/showthread.asp?forumid=4&threadid=472825) on the TeamWarfare forums.

### Tribes 2 10 Year Anniversary Tournament — March 3, 2011

TeamWarfare and a couple of Tribes 2 players have organized a draft tournament to celebrate the 10-year anniversary of Tribes 2's release. Sign-ups opened several weeks ago, and have since concluded. The draft consisted of about 230 players and 10 teams. More information can be found [on TWL](http://www.teamwarfare.com/forums/showthread.asp?forumid=4&threadid=468216). While it is technically too late to sign up, there are a couple teams that are having roster issues, and these teams might need to recruit more players one way or another. So even if you missed the deadline, you might still have a chance to play in some matches or even get onto a team.

### Tribes 2 IRC Issues — October 7, 2010

For those of you who use the Tribes 2 in-game chat, you should be aware that the operator of that IRC server randomly decided that he is no longer going to tolerate Tribes players on his chat network. When TribesNext RC3 is released, Tribes 2 in-game chat will point to a much more stable and well-operated IRC server (irc.tribalwar.com), but until then, Tribes 2 in-game chat will be rather unpopular and may be hostile towards Tribes players. We recommend you steer clear of it unless you just want to see what happens when an idiotic spaz gets his hands on an IRC server. Instructions on how to connect to the new IRC server without using Tribes 2 in-game chat can be found [here](/project/talk-news-tribes-2-irc-issues "Tribes2Wiki talk:News/Tribes 2 IRC Issues").

  

**[More News...](/project/news "Tribes2Wiki:News")**

## Videos

An instructional video teaching some Tribes 2 basics as well as an intro to being a [capper](/tactics/capper "Capper").

Below is a shoutcasted match for #1 on the ladder that took place back in Tribes 2's prime (or perhaps shortly after its prime).

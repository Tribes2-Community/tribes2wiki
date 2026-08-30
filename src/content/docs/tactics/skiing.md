---
title: 'Skiing'
description: 'Skiing is a feature that was invented during the Starsiege: Tribes beta. In Tribes 1, skiing involved jumping immediately as you touched the ground to preven...'
categories:
  - 'Tactics'
source:
  url: 'http://www.tribes2wiki.com/wiki/Skiing'
  archived: 'https://web.archive.org/web/20111007064330id_/http://www.tribes2wiki.com:80/wiki/Skiing'
  lastModified: '2009-01-07T06:24:00.000Z'
---
**Skiing** is a feature that was invented during the Starsiege: Tribes beta. In Tribes 1, skiing involved jumping immediately as you touched the ground to prevent friction from slowing you down. There was no air resistance, so by jumping in this manner, you could retain 100% of your speed an momentum while traveling across a flat surface. Additionally, if you are jumping forward, you will continue to pick up speed with each jump, to an almost unlimited velocity. If you are traveling down a hill, you will keep all of the speed that you gain from gravity pulling you down that hill. Eventually, a script was made in Tribes 1 that automates the act of skiing.

In Tribes 2, skiing was built directly into the game. If you hold the **Jump** key (**spacebar** by default), you will automatically begin to slide across the ground without losing (much) speed. The amount that you slow down or don't slow down is dependent on what [mod](/scripting/mod "Mod") you are playing. In [Base](/reference/base "Base"), you will still be slowed by friction. In [Classic](/reference/classic "Classic"), you won't, just like in Tribes 1.

## Deadstops

One thing you will inevitably run into are **deadstops**. These are an unfortunate byproduct of the original Torque gaming engine on which Tribes 2 now runs. Basically, if you are skiing along a completely flat surface, you will sometimes come to complete stop as if you have run into an invisible wall. You will often even take damage when this happens. Deadstops usually only happen when you are moving fast, and therefore you will rarely come across one in Base. However, in Classic and Version2 it takes a lot of luck not to run into a deadstop at least once per map.

Deadstops are not random. They will always be in the same place every time on each map. If you really are bothered by them, you could memorize the location of every deadstop and simply avoid those areas or make sure you are not touching the ground if you fly over them. Sometimes this can be incredibly difficult, as it is on the map Damnation, but they are unfortunately a part of the game.

### Keep Moving

The advice above applies to the game as it originally shipped. The
[TribesNEXT quality-of-life patch](/patches/qol-patches) addresses the problem directly:
its physics work states that **deadstops on terrain, and on horizontal co-planar interior
surfaces, have been eliminated**.

That came out of a broader pass over the engine's maths and collision handling. Per-frame
math functions were replaced with SIMD variants — which is largely why the patch requires a
CPU with AVX support — and parts of the collision physics were made more efficient or
adjusted, without changing how the game plays or breaking demo playback. Vehicle handling
was tidied up in the same pass: wheeled vehicles compensate for the yaw oscillation that
made them shimmy at speed, and the mobile point base had its centre of mass rebalanced.

So on a patched client, memorising deadstop locations is no longer something you need to
do. On RC2a or an unpatched install, everything above still holds.

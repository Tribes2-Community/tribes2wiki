---
title: 'Game type'
description: 'A game type is a collection of rules and objectives that are to be followed during the course of playing the game. The easiest way to distinguish between gam...'
categories:
  - 'Scripting'
source:
  url: 'http://www.tribes2wiki.com/wiki/Game_type'
  archived: 'https://web.archive.org/web/20111007124904id_/http://www.tribes2wiki.com:80/wiki/Game_type'
  lastModified: '2008-12-10T01:33:00.000Z'
---
_A small list of game types._

A **game type** is a collection of rules and objectives that are to be followed during the course of playing the game. The easiest way to distinguish between game types is by identifying the objective you follow in order to win a [map](/scripting/map "Map") while playing that game type. In [Capture the Flag](/maps/capture-the-flag "Capture the Flag"), the goal is to capture the enemy flag more times than they capture yours. In Siege, the goal is the reach the control switch of a base defended by enemies faster than that enemy team does when the base is defended by you. Occasionally people will use the word "[mod](/mods/mod "Mod")" when referring to a game type. This is generally not considered incorrect, so you'll just have to look at the context of the sentence if you want to know which they mean. For the most part, you can play any game type while playing in any mod. One possible exception is Aerial Dogfight, which is designed specifically for BONES mod.

New game types are created by copying the [defaultGame.cs](/reference/defaultgamecs "DefaultGame.cs") file and making changes to any or all of the functions in your copy. These functions determine everything that the game is supposed to do in multiple different cases throughout the course of a game played in your game type. Save your copy as \_\_\_\_Game.cs, where \_\_\_\_ is an abbreviation of the name of your game type, and the first steps are done.

## List of game types

View list here: Category:Game types.

## Modding reference

The modding handbook documents how game types are implemented, with a chapter each:

- [Game types](https://modding.tribes2wiki.com/05-gameplay-systems/gametypes.html)
- [Capture the Flag](https://modding.tribes2wiki.com/22-capture-the-flag/)
- [Siege](https://modding.tribes2wiki.com/24-siege/)
- [Capture and Hold](https://modding.tribes2wiki.com/26-capture-and-hold/)
- [Hunters](https://modding.tribes2wiki.com/28-hunters/)

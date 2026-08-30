---
title: 'Map'
description: 'Map is a term that can be used in a few different contexts with a slightly different meaning. First and foremost, the concrete definition of a map is a colle...'
categories:
  - 'Scripting'
source:
  url: 'http://www.tribes2wiki.com/wiki/Map'
  archived: 'https://web.archive.org/web/20110829081400id_/http://www.tribes2wiki.com:80/wiki/Map'
  lastModified: '2009-09-04T07:53:00.000Z'
---
**Map** is a term that can be used in a few different contexts with a slightly different meaning. First and foremost, the concrete definition of a map is a collection of objects on a terrain. The best way to describe it would be to simply name a few different maps: [Katabatic](/maps/katabatic "Katabatic"), Dangerous Crossing, Beggar's Run, Sun Dried, etc. These names should be familiar to you if you've played the game at all. In non-technical terms, the layout of the bases and structures, the hills and color of the terrain, any water or lava or environmental effects, the fog, the sky, and the location of all stationary objects are determined by the map that is currently running on the server. These things are always the same every time that specific map is loaded - unless the map is running a script that explicitly randomizes them.

Another common use of the word map is in reference to what you might call a **round** or **game** outside of Tribes 2. Since a full game take place on each map before the server changes to a different map, most competitions use different maps as the rounds in "best 2 of 3 rounds" matches. As a result, you might hear people use the word map in ways like "team A beat team B in 2 maps". This simply means that they won two rounds of a best-of-three match without needing to play the third map.

In many places, maps are also referred to as **missions**.

## Editing

Tribes 2 comes with a map editor. In order to access the map editor, you must be hosting a non-dedicated server. Originally, you could open the editor by pressing **Ctrl+E**. For a time, some players reported that **Alt+E** was the correct key bind. However, many players have found that for some reason, neither key bind works. In this case, you can open the map editor by opening up the console with the **\`** key (same key as **~**), and typing in the console command: `toggleeditor(1);` and pressing enter. Actual use of this map editor is covered in a few tutorials online. Eventually, we will try to have a tutorial right here on this Wiki.

In addition to the map editor, you should also be aware of a few files that make up the actual data of a map.

### MIS file

In technical terms, a map is determined by a few specific files. The only one that is required is a MIS file like `Katabatic.mis`. This is a script file that contains every piece of data that is used by the map. All objects and their properties, environmental properties, and almost everything else are all defined in each map's MIS file. You can edit the MIS file directly by opening it with any text editor and configuring the lines of code, but for the average mapper, it is much easier to use Tribes 2's built-in map editor.

### TER file

One thing that is not defined inside the MIS file is the actual design of the terrain. The MIS file will contain a reference to a "terrainFile". This terrain file will be a TER file such as `Katabatic.ter`. While most common maps have their own TER file, many maps will use the TER file of another map. The reason for this is that TER files must be present on every player's computer in order for them to be able to play a map that uses that TER file. For this reason, it is common practice for mappers to use the TER file of a map that comes with the game so that players do not have to download anything special to play that map. Maps made in this way are referred to as **server-side maps**. Maps that do have custom TER files are referred to as **client-side maps**. Note that any shapes/models (DTS files) used in the map must also be present on every player's computer. Maps with custom shapes are also considered to be client-side. Terrains can be modified or generated from scratch with the built-in map editor and saved as TER files.

### SPN file

Another file required for almost all maps to work as intended is a SPN file such as `Katabatic.spn`. This file is required in order for players to spawn in the correct locations. Without a proper SPN file, players will spawn 100 meters in the sky in the center of the map's terrain instead of in a reasonable location. Sometimes the map can be used with a [game type](/maps/game-type "Game type") or [mod](/mods/mod "Mod") that removes the need for a SPN file, but this is very rare. All maps need to have their own SPN file, and the file name must be the same as the name of the MIS file, except with a different file extension. In order to generate a SPN file, you need to have all spawnspheres placed on the map (designated inside the MIS file) in their desired locations, and then run a special Tribes2.exe command line with the mission file. The syntax for this is `Tribes2.exe -spnBuild _MissionName GameType_`, where _MissionName_ and _GameType_ are the 'abbreviated' versions. Example: `Tribes2.exe -spnBuild BeggarsRun CTF`

### NAV file

The last kind of file that can be used in a map is a NAV file. These files are navigation graphs for computer-controlled bots so that the AI knows how to navigate the map. The are only needed for maps that support bots. The NAV file to be used by the map is specified by a line in the MIS file. Usually, the file will be something like `Katabatic.nav`.

## List of Maps

If you'd like to see a list of maps, please see Category:Maps.

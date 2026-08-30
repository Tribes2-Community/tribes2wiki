---
title: 'Command circuit'
description: 'The command circuit, also referred to as the commander map, command screen, CC, and other similar titles, is a menu that allows you to see various friendly a...'
categories: []
source:
  url: 'http://www.tribes2wiki.com/wiki/Command_circuit'
  archived: 'https://web.archive.org/web/20110717100159id_/http://www.tribes2wiki.com/wiki/Command_circuit'
  lastModified: '2010-11-24T01:47:00.000Z'
stub: true
---
:::note[Stub]
This article is a stub and requires additional information.
:::

![](/images/Command_circuit.jpg)

Screenshot of the command circuit.

The **command circuit**, also referred to as the **commander map**, **command screen**, **CC**, and other similar titles, is a menu that allows you to see various friendly and enemy objects from a top-down view of the current [map](/scripting/map "Map"). To activate the command circuit, you need to press the _Commander Map_ key - **C** by default.

## Abilities

### Waypoint

**Waypoints** can be created by right-clicking on an object or location on the map, or by right-clicking on an item on the commander tree list on the right side of the CC. Clicking on the various options in the popup menu will create tasks, such as "escort player", "attack player", "repair generator", etc. In order to actually have the waypoint stay on your screen, you will need to accept a task - even if it's a task you created. To accept a task, you can either do the "command acknowledged" voice bind (_VCA_ by default), or bring up the task list (_N_ by default), select the task you want with the arrow keys, and accept it (_Enter_ by default). This will give you a **task waypoint**. You can only have one task waypoint at a time. Task waypoints will mark the exact location of their designated object so long as it is within your team's sensor network. If it leaves your team's sensor network, the waypoint will continue to mark its last known location. In order to get rid of a task waypoint, you can either accept a different task, or declare the task as being completed with the "command completed" voice bind (_VCC_ by default).

You can also create another kind of waypoint on the ground with the CC. If you right-click the map and select "Create Waypoint", a waypoint will be created, but it will not be a task waypoint. There isn't really a special name for it, so for the purpose of specificity here, we'll call it a **custom waypoint**. You can have up to 20 custom waypoints at a time, and all of them will be visible on your screen. Normally, you can only create these waypoints on the ground, but with the aid of [scripts](/scripting/scripting "Script"), you can also attach them to players and other objects, and they will behave just like task waypoints, except you can have up to 20 of them at a time - though there is a margin for error when using this method. Attaching a waypoint to a player with a script requires the script to use that player's target ID, and the target IDs are only accurate on the very first map you play after joining a server. When the map changes, target IDs are reassigned, and the updated target IDs are not sent to you in any way that the script can read. It is possible to predict the target IDs, but there is a margin for error in doing that as well. Also note that if a script automatically waypoints all enemy players using this method, it is called auto-points and is considered a cheat by most players and organizations.

The term "waypoint" is also used to describe waypoints on the map that have nothing to do with the CC. These are the waypoints marked as triangles on your screen and labeled with things like "Flag Home", "Base", etc.

---
title: 'Base turret'
description: 'A turret is an automated defense weapon. There are several different types of turrets, but they all have similar functions. Turrets belong to each of the tea...'
categories:
  - 'Base assets'
  - 'Powered equipment'
source:
  url: 'http://www.tribes2wiki.com/wiki/Base_turret'
  archived: 'https://web.archive.org/web/20100417113116id_/http://www.tribes2wiki.com:80/wiki/Base_turret'
  lastModified: '2010-03-15T08:50:00.000Z'
---
A **turret** is an automated defense weapon. There are several different types of turrets, but they all have similar functions. Turrets belong to each of the teams on the [map](/scripting/map "Map"), and they will usually be found at the base of the team that owns them. Turrets have shields and infinite ammo. Both the shields and each shot fired by a turret draw from the turret's energy. Usually, turrets require that a nearby [generator](/base-assets/generator "Generator") or [solar panel](/base-assets/solar-panel "Solar panel") be powered in order to have energy, unless they are deployable turrets. When no enemies are nearby, turrets sit in a dormant state, but will usually have some sort of flashing light to indicate that they are still powered. When a turret senses an enemy, it will spend a little under a second entering a firing mode, and will then begin to attack. All turrets have automatic aim and will attempt to predict their target's movement. If a turret loses sight of its target and senses no other enemy for a duration of about one second, it will exit firing mode and return to its dormant state.

Most turrets can be manually controlled by using the [command circuit](/reference/command-circuit "Command circuit"). When under manual control, turrets can be aimed and fired at will by the player controlling them. A turret will still need to be powered by its generator in order to be controlled manually. However, there are extremely few situations when it's even remotely a good idea to manually control a turret.

The term turret can also refer to the belly turret of the bomber and the turret on a tank.

## Base turret

The term **base turret** is used to refer to any turret that is permanently present on the map. If destroyed, they can be repaired. In most [mods](/mods/mod "Mod"), you cannot have any more base turrets than those that are initially present on the map. Almost all base turrets consist of a turret base and a customizable turret barrel. The only exception is the sentry turret, which also has a drastically different appearance and target acquisition method from any of base turret. There are several different types of **turret barrels** that can be fitted onto the base of any base turret. In order to switch out the barrels, you need to access your inventory menu, make sure you have [Assault armor](/armors/assault-armor "Assault armor") or [Juggernaut armor](/armors/juggernaut-armor "Juggernaut armor") selected, then select the turret barrel of your choice from the _Pack_ list. Once you have equipped yourself with this loadout from an [inventory station](/base-assets/inventory-station "Inventory station"), find a base turret, and then press your _Use Pack_ key (_R_ by default) to replace the barrel with the one you are carrying. The barrel that the turret had beforehand will disappear.

### AA turret

One turret barrel is the **AA turret** barrel. AA stands for anti-aircraft, and as such, that is this turret barrel's main specialty. AA turrets will immediately activate and rapidly fire purple blasters at any vehicle, and it will also target player who have a high heat signature. The fast projectile speed makes these turrets some of the most effective turrets on defense. They make very quick work of any vehicle, and can do a lot of damage to an enemy who uses his jets too much.

### Plasma turret

Another very effective turret barrel is the **plasma turret** barrel. Plasma turrets will fire at any enemy player or vehicle the moment it enters sensor range. They fire medium-speed, blue balls of plasma that explode on impact and deal a significant amount of damage. The rate of fire is faster than most weapons, allowing the plasma turret to kill any enemy player very quickly, and pose a significant threat to nearby enemy vehicles. In [Classic](/mods/classic "Classic"), the projectile speed was sped up to combat the increased player speed. As a result, the plasma turret is the most commonly employed turret barrel for all base turrets.

### Missile turret

The **missile turret** barrel is another very common turret barrel. It works in much the same way as the missile launcher. If any vehicle or player with a elevated heat signature enters its range, the missile turret will fire a red-locked missile at it. These turrets are generally very affective against vehicles due to their ability to lock on, but because missiles have a simple counter-measure - flares - missile turrets are usually only used if there are multiples of them, and they aren't in a good position for a plasma turret.

### ELF turret

The **ELF turret** barrel is one that definitely poses a great annoyance to its enemies. It acts in a very similar way to the ELF projector in that it drains the targets energy. However, unlike the ELF gun, if the target runs out of energy, then the ELF turret will begin to slowly damage the target. The ELF turret also has much longer range than the ELF gun. Even despite their ability to damage players, ELF turrets don't pose much of a threat by themselves. As a result, they are only used in locations where lack of mobility will completely destroy the enemies ability to be effective. If the enemy can get away from the ELF turret easily and be on their way, it would probably work better if it was a different turret barrel.

### Mortar turret

Lastly, there is the **mortar turret** barrel. While mortar turrets are incredibly powerful, they are also incredibly dangerous to the team that owns them. Since the base turret is almost always right near its team's base, the highly explosive mortars will almost always end up killing teammates and destroying some of your own equipment when they try to shoot at nearby enemies. As a result, mortar turrets are never used except as a joke. They make it almost impossible for your team's defense to actually play defense. While they are powerful and will make quick work of any player, they are definitely not reliable enough to completely replace a remotely competent defense team. You would be much better off with another type of turret in addition to your teams defensive players.

### Sentry turret

The final type of permanent turret is the **sentry turret**. Unlike the rest of the base turrets, sentry turrets cannot be customized. They are also smaller, less durable, and have a built-in motion sensor, rather than the built-in [pulse sensor](/base-assets/pulse-sensor "Pulse sensor") that all other turrets employ. As a result, sentry turrets won't fire at a target that isn't moving, unless the target is also being detected by some other form of sensor. Sentry turrets don't do too much damage per shot, but they fire very quickly and the projectiles move very fast. If an enemy passes by a sentry turret, they are pretty much guaranteed to take a decent amount of damage in a small amount of time.

## Deployable turret

In addition to the permanent base turrets, your team can also use **deployable turrets**. In most mods, there are two types of deployable turrets - one for terrain, and one for structures. Deployable turrets have energy just like any other turret, and they can be disabled with enough damage just like any other turret. However, if a deployable turret is destroyed, it is destroyed completely and essentially disappears, and you will have to deploy another one. Deployable turrets also have an interference range, meaning that you can't place them near each other, and you can't have too many of them in a certain area.

![AA turret](/images/Landspike_turret.png)

### Landspike turret

**Landspike turrets** can only be deployed on the terrain of the map. Additionally, they cannot be deployed on steep hills. They fire slower-moving bolts of plasma that have a small damage radius on impact. The rate of fire is fairly slow, but the damage is decent - they take out about half of a [light armor](/armors/light-armor "Light armor")'s health. Landspike turrets generally take two direct disc shots to disable, and a third to destroy.

![AA turret](/images/Spider_clamp_turret.png)

### Spider clamp turret

**Spider clamp turrets** can only be deployed on the surfaces of a structure. You can deploy them on any slope of surface, including walls and ceilings, but you will need to make sure there is enough of a flat surface for the turret to fit. The fire fast moving blasters at a faster rate of fire than the landspike turret, but they do less damage and don't have a damage radius. Spider clamp turrets are also less durable than landspikes; clamp turrets take one direct disc to disable, and a second to destroy.

### Usage

See main article: farmer

Both types of deployed turrets are very useful and are a necessary asset to any good defense. Almost all teams will designate a farmer to deploy these turrets. The number of turrets that you can deploy varies between 4-8 of each type depending on the number of players in the server. When you have multiple turrets set up in good locations, they can pose a significant threat to any attacking force. One thing to note is that it's better to place turrets in areas where they will have the best view on enemies to shoot. While this may seem like common sense, many player will actually try to hide their turrets to keep the enemy from destroying them. Deploying landspike turrets is pretty straightforward, but spider clamp turrets have much more versatility in their deployment. It's possible to place a clamp turret in such a way that it has a lot of coverage on enemy players, but is still hard to destroy. Keep your eye out for tricks like this.

## Modding reference

For how turrets are built, see the modding handbook:

- [Turrets and deployables](https://modding.tribes2wiki.com/03-content-recipes/turrets-and-deployables.html)

/**
 * Cross-links from wiki articles into the modding handbook at
 * modding.tribes2wiki.com.
 *
 * These are appended during conversion rather than hand-edited into the
 * Markdown, so the pages stay regenerable: a re-import keeps the links instead
 * of dropping them, and there is a single place to maintain them.
 *
 * Only articles with a genuine counterpart in the handbook appear here. The
 * handbook is a developer reference, so the link is worth making where a reader
 * might reasonably want to know how the thing is built, not on every page.
 */

export const HANDBOOK = 'https://modding.tribes2wiki.com';

interface HandbookEntry {
  intro: string;
  links: [path: string, label: string][];
}

export const HANDBOOK_LINKS: Record<string, HandbookEntry> = {
  Classic: {
    intro: 'The modding handbook documents Classic in depth:',
    links: [
      ['/37-classic/', 'Classic'],
      ['/40-classic-ruleset-toggles/', 'Classic ruleset toggles'],
      ['/50-running-classic-today/', 'Running Classic today'],
    ],
  },
  Base: {
    intro: 'The modding handbook covers the shipped ruleset in detail:',
    links: [['/31-base-ruleset/', 'The Base ruleset']],
  },
  Mod: {
    intro: 'To write one, the modding handbook starts here:',
    links: [
      ['/01-getting-started/your-first-mod.html', 'Your first mod'],
      ['/02-engine-model/mod-paths-and-overrides.html', 'Mod paths and overrides'],
      ['/06-shipping/packaging.html', 'Packaging a mod'],
    ],
  },
  Scripting: {
    intro: 'The modding handbook goes considerably deeper:',
    links: [
      ['/02-engine-model/torquescript.html', 'TorqueScript'],
      ['/02-engine-model/datablocks.html', 'Datablocks'],
      ['/02-engine-model/packages.html', 'Packages'],
      ['/reference/console-functions.html', 'Console function reference'],
    ],
  },
  Map: {
    intro: 'For building one, the modding handbook covers the whole pipeline:',
    links: [
      ['/10-mapping/', 'Mapping'],
      ['/11-mission-editor/', 'The mission editor'],
      ['/12-world-editor/', 'The world editor'],
      ['/13-terrain/', 'Terrain'],
      ['/16-shipping-a-map/', 'Shipping a map'],
    ],
  },
  'Game type': {
    intro:
      'The modding handbook documents how game types are implemented, with a chapter each:',
    links: [
      ['/05-gameplay-systems/gametypes.html', 'Game types'],
      ['/22-capture-the-flag/', 'Capture the Flag'],
      ['/24-siege/', 'Siege'],
      ['/26-capture-and-hold/', 'Capture and Hold'],
      ['/28-hunters/', 'Hunters'],
    ],
  },
  'Capture the Flag': {
    intro: 'The modding handbook covers how CTF is put together:',
    links: [['/22-capture-the-flag/', 'Capture the Flag']],
  },
  Server: {
    intro: 'For running one, see the modding handbook:',
    links: [
      ['/06-shipping/hosting-and-testing.html', 'Hosting and testing'],
      ['/06-shipping/debugging.html', 'Debugging'],
    ],
  },
  'Base turret': {
    intro: 'For how turrets are built, see the modding handbook:',
    links: [['/03-content-recipes/turrets-and-deployables.html', 'Turrets and deployables']],
  },
  'Light armor': {
    intro: 'For how armors are defined, see the modding handbook:',
    links: [['/03-content-recipes/armors.html', 'Armors']],
  },
  Spinfusor: {
    intro: 'For how weapons and projectiles are built, see the modding handbook:',
    links: [
      ['/03-content-recipes/weapons.html', 'Weapons'],
      ['/03-content-recipes/projectiles.html', 'Projectiles'],
    ],
  },
  'DefaultGame.cs': {
    intro: 'The modding handbook covers the scripts this sits among:',
    links: [
      ['/02-engine-model/boot-sequence.html', 'Boot sequence'],
      ['/05-gameplay-systems/missions.html', 'Missions'],
    ],
  },
  'Inventory station': {
    intro: 'For how inventory and loadouts work under the hood, see the modding handbook:',
    links: [['/03-content-recipes/ammo-and-inventory.html', 'Ammo and inventory']],
  },
  'Vehicle pad': {
    intro: 'For how vehicles are defined, see the modding handbook:',
    links: [['/03-content-recipes/vehicles.html', 'Vehicles']],
  },
  'Hand grenade': {
    intro: 'For how grenades are built, see the modding handbook:',
    links: [
      ['/03-content-recipes/grenades-and-hand-inventory.html', 'Grenades and hand inventory'],
    ],
  },
};

/** Markdown for the handbook section of a page, or '' if it has no counterpart. */
export function handbookSection(title: string): string {
  const entry = HANDBOOK_LINKS[title];
  if (!entry) return '';
  const items = entry.links.map(([path, label]) => `- [${label}](${HANDBOOK}${path})`);
  return ['## Modding reference', '', entry.intro, '', ...items].join('\n');
}

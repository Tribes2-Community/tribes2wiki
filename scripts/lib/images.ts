/**
 * Resolves images referenced by the original wiki to files we can actually serve.
 *
 * Of the wiki's 87 uploads only 2 survive in the Internet Archive. The rest are
 * replaced, where an honest equivalent exists, from the community guide art in
 * ChocoTaco1/PlayT2-Modern.
 *
 * The mapping below is hand-reviewed, not fuzzy-matched. Several remaining gaps
 * have *similar-looking* candidates that depict a different object -- a fixed
 * inventory station is not a deployable one, and the base turret barrels have no
 * counterpart at all -- so they are deliberately left unmapped rather than
 * illustrated with the wrong thing.
 */

/** Original wiki uploads recovered directly from the Internet Archive. */
export const ARCHIVE_RECOVERED = new Set(['Command_circuit.jpg', 'Ambox_letter.png']);

export const PLAYT2_RAW_BASE =
  'https://raw.githubusercontent.com/ChocoTaco1/PlayT2-Modern/main/images';

export interface Replacement {
  /** Path within PlayT2-Modern's images/ tree. */
  source: string;
  /** Filename served from /images/. */
  servedAs: string;
  /** Why this is a fair substitution. */
  note: string;
}

/**
 * Original wiki filename -> replacement.
 *
 * The `TWB_*` entries are the strongest matches: the original wiki's own weapon
 * art carried the same `TWB` prefix, so both sets descend from the same
 * community artwork.
 */
export const REPLACEMENTS: Record<string, Replacement> = {
  'TWB_Spinfusor.jpg': {
    source: 'guides/weapons/twb_Spinfusor.png',
    servedAs: 'TWB_Spinfusor.png',
    note: 'Same TWB weapon art the original wiki used',
  },
  'TWB_Chaingun.jpg': {
    source: 'guides/weapons/twb_Chaingun.png',
    servedAs: 'TWB_Chaingun.png',
    note: 'Same TWB weapon art the original wiki used',
  },
  'TWB_FusionMortar.jpg': {
    source: 'guides/weapons/twb_Fusionmortar.png',
    servedAs: 'TWB_FusionMortar.png',
    note: 'Same TWB weapon art the original wiki used',
  },
  'TWB_GrenadeLauncher.jpg': {
    source: 'guides/weapons/twb_Grenadelauncher.png',
    servedAs: 'TWB_GrenadeLauncher.png',
    note: 'Same TWB weapon art the original wiki used',
  },
  'TWB_LaserRifle.jpg': {
    source: 'guides/weapons/twb_Laserrifle.png',
    servedAs: 'TWB_LaserRifle.png',
    note: 'Same TWB weapon art the original wiki used',
  },
  'TWB_Shocklance.jpg': {
    source: 'guides/weapons/twb_shocklance.png',
    servedAs: 'TWB_Shocklance.png',
    note: 'Same TWB weapon art the original wiki used',
  },
  'Cloak_pack.jpg': {
    source: 'guides/packs/packs_cloak.png',
    servedAs: 'Cloak_pack.png',
    note: 'Same item',
  },
  'Energy_pack.jpg': {
    source: 'guides/packs/packs_energy.png',
    servedAs: 'Energy_pack.png',
    note: 'Same item',
  },
  'Deployable_station.jpg': {
    source: 'guides/deployables/deployables_inv_station.png',
    servedAs: 'Deployable_station.png',
    note: 'Same item: the deployable inventory station',
  },
  'Deployable_motion_sensor.jpg': {
    source: 'guides/deployables/deployables_motion_sensor.png',
    servedAs: 'Deployable_motion_sensor.png',
    note: 'Same item',
  },
  'Deployable_pulse_sensor.jpg': {
    source: 'guides/deployables/deployabes_pulse_sensor.png',
    servedAs: 'Deployable_pulse_sensor.png',
    note: 'Same item',
  },
  'Landspike_turret.jpg': {
    source: 'guides/deployables/deployabes_outdoor_turret.png',
    servedAs: 'Landspike_turret.png',
    note: 'The landspike is the deployable outdoor turret',
  },
  'Spider_clamp_turret.jpg': {
    source: 'guides/deployables/deployables_indoor_turret.png',
    servedAs: 'Spider_clamp_turret.png',
    note: 'The spider clamp is the deployable indoor turret',
  },
};

/**
 * Left unmapped on purpose, with the reason. Kept in code so the decision is
 * reviewable rather than looking like an oversight.
 */
export const DELIBERATELY_UNMAPPED: Record<string, string> = {
  'AA_turret.jpg': 'Base turret barrel; no counterpart in the available art',
  'ELF_turret.jpg': 'Base turret barrel; no counterpart in the available art',
  'Missile_turret.jpg': 'Base turret barrel; no counterpart in the available art',
  'Mortar_turret.jpg': 'Base turret barrel; no counterpart in the available art',
  'Plasma_turret.jpg': 'Base turret barrel; no counterpart in the available art',
  'Sentry_turret.jpg': 'Base turret barrel; no counterpart in the available art',
  'Inventory_station.jpg': 'The fixed base station, not the deployable one',
  'Pulse_sensor.jpg': 'A different sensor variant from the deployable pulse sensor',
  'Medium_pulse_sensor.jpg': 'A different sensor variant from the deployable pulse sensor',
  'Deployable_camera.jpg': 'No counterpart in the available art',
  'Bowl.jpg': 'Map screenshot; no counterpart',
  'Generator.jpg': 'No counterpart in the available art',
  'Inventory_screen.jpg': 'UI screenshot; no counterpart',
  'List_game_types.jpg': 'UI screenshot; no counterpart',
  'List_server_mods.jpg': 'UI screenshot; no counterpart',
  'Load_Katabatic.png': 'Map load screen; no counterpart',
  'SmallAlarmClock.png': 'MediaWiki template icon; not needed',
  'Ambox_notice.png': 'MediaWiki banner icon; asides are rendered natively now',
  'Ambox_style.png': 'MediaWiki banner icon; asides are rendered natively now',
  'Wiki_Logo1.png': 'The original wiki logo; this project uses its own emblem',
};

/** Path to serve a referenced wiki image from, or null if we have no honest match. */
export function resolveImage(wikiFile: string): string | null {
  if (ARCHIVE_RECOVERED.has(wikiFile)) return `/images/${wikiFile}`;
  const replacement = REPLACEMENTS[wikiFile];
  return replacement ? `/images/${replacement.servedAs}` : null;
}

/** Shared vocabulary for mapping the original MediaWiki structure onto the new site. */

/** Sections mirror the sidebar groups declared in astro.config.mjs. */
export const SECTIONS = [
  'start',
  'weapons',
  'armors',
  'equipment',
  'base-assets',
  'tactics',
  'maps',
  'scripting',
  'reference',
  'project',
] as const;

export type Section = (typeof SECTIONS)[number];

/** Wiki categories map onto sections; anything uncategorised falls back to reference. */
const CATEGORY_SECTION: Record<string, Section> = {
  Weapons: 'weapons',
  Armors: 'armors',
  'Base assets': 'base-assets',
  Tactics: 'tactics',
  Maps: 'maps',
  Scripting: 'scripting',
  Movies: 'reference',
};

/** Pages whose placement shouldn't depend on how they happened to be categorised. */
const TITLE_SECTION: Record<string, Section> = {
  'Main Page': 'start',
  'Introduction to Tribes 2': 'start',
  'Tribes 2': 'start',
  Skiing: 'tactics',
  Ski: 'tactics',
  Loadout: 'start',
  'Cloak pack': 'equipment',
  'Energy pack': 'equipment',
  'Pulse sensor': 'equipment',
  'Deployable station': 'equipment',
  'Inventory station': 'equipment',
  'Vehicle pad': 'equipment',
  // Fixed base structures, not deployables.
  'Solar panel': 'base-assets',
  // Deployable turrets, despite sitting in the Base assets category on the
  // original wiki: the landspike is the deployable outdoor turret and the
  // spider clamp the deployable indoor one.
  'Landspike turret': 'equipment',
  'Spider clamp turret': 'equipment',
};

export function sectionFor(title: string, categories: string[]): Section {
  if (TITLE_SECTION[title]) return TITLE_SECTION[title];
  if (title.startsWith('Help:')) return 'reference';
  if (title.startsWith('Tribes2Wiki:') || title.startsWith('Tribes2Wiki talk:')) return 'project';
  if (title.startsWith('Category:')) {
    return CATEGORY_SECTION[title.slice('Category:'.length)] ?? 'reference';
  }
  for (const category of categories) {
    if (CATEGORY_SECTION[category]) return CATEGORY_SECTION[category];
  }
  return 'reference';
}

/** Lowercase, punctuation-free, URL-safe form of a bare page name. */
function baseSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/['’.]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * URL-safe slug. Namespaces that would otherwise collide with a main-namespace
 * article of the same name keep a prefix -- `Category:Scripting` and `Scripting`
 * are different pages and must not overwrite one another.
 */
export function slugify(title: string): string {
  const match = title.match(/^(Category|Help|Tribes2Wiki talk|Tribes2Wiki|Talk):(.*)$/s);
  if (!match) return baseSlug(title);

  const [, namespace, rest] = match;
  const name = baseSlug(rest);
  switch (namespace) {
    case 'Category':
      return `category-${name}`;
    case 'Talk':
    case 'Tribes2Wiki talk':
      return `talk-${name}`;
    default:
      // Help: and Tribes2Wiki: already live in their own section directories.
      return name;
  }
}

/** Route a wiki title to its path on the new site, e.g. `Fusion mortar` -> `/weapons/fusion-mortar`. */
export function routeFor(title: string, categories: string[] = []): string {
  if (title === 'Main Page') return '/';
  return `/${sectionFor(title, categories)}/${slugify(title)}`;
}

/** `/wiki/Fusion_mortar` or `Fusion_mortar` -> `Fusion mortar` */
export function titleFromHref(href: string): string | null {
  const match = href.match(/\/wiki\/([^?#]+)/);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]).replace(/_/g, ' ').trim() || null;
  } catch {
    return null;
  }
}

/** MediaWiki thumbnail filenames carry a size prefix; strip it to get the source file. */
export function originalImageName(file: string): string {
  return file.replace(/^\d+px-/, '');
}

/**
 * Maps original wiki usernames onto git commit identities.
 *
 * The original wiki never exposed contributor email addresses -- MediaWiki keeps
 * them private, and no `User:` page, `Special:ListUsers` or `Special:Contributions`
 * capture survives -- so there is nothing to recover. Commits therefore use
 * org-controlled proxy addresses on tribes2.dev. These are NOT the contributors'
 * real addresses; they exist so that git has a stable identity to attribute to.
 */

export const ORG_EMAIL_DOMAIN = 'tribes2.dev';
export const ORG_EMAIL_LOCAL = 'github';

/** Maintainer identity for anything the archive can't attribute. */
export const MAINTAINER = {
  name: 'GeekOfWires',
  email: 'me@geekofwires.com',
} as const;

/**
 * Anonymous edits were recorded by IP address. Those are personal data, and
 * baking them into a permanent public git history goes further than the original
 * wiki did, so every anonymous edit collapses to one identity.
 */
export const ANONYMOUS = {
  name: 'Anonymous Tribes2Wiki contributor',
  email: `${ORG_EMAIL_LOCAL}+anonymous@${ORG_EMAIL_DOMAIN}`,
} as const;

const IPV4 = /^\d{1,3}(\.\d{1,3}){3}$/;
const IPV6 = /^[0-9a-f:]+$/i;

export function isAnonymous(user: string | null): boolean {
  if (!user) return true;
  return IPV4.test(user) || (user.includes(':') && IPV6.test(user));
}

/** Stable, filesystem- and email-safe local part for a wiki username. */
function aliasFor(user: string): string {
  const alias = user
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return alias || 'contributor';
}

export interface Identity {
  name: string;
  email: string;
}

export function identityFor(user: string | null): Identity {
  if (isAnonymous(user)) return { ...ANONYMOUS };
  return {
    name: user!,
    email: `${ORG_EMAIL_LOCAL}+${aliasFor(user!)}@${ORG_EMAIL_DOMAIN}`,
  };
}

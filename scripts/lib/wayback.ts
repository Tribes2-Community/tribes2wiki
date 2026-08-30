import { setTimeout as sleep } from 'node:timers/promises';

export const CDX_ENDPOINT = 'http://web.archive.org/cdx/search/cdx';
export const ORIGIN_HOST = 'tribes2wiki.com';

/** Wayback rate-limits aggressively; keep requests polite and serialised. */
const REQUEST_DELAY_MS = 750;
const MAX_ATTEMPTS = 5;

let lastRequestAt = 0;

async function throttle(): Promise<void> {
  const wait = lastRequestAt + REQUEST_DELAY_MS - Date.now();
  if (wait > 0) await sleep(wait);
  lastRequestAt = Date.now();
}

/**
 * Fetch with retry/backoff on the transient statuses Wayback returns under load.
 * Returns null when the capture is genuinely gone (404/410) rather than throttled.
 */
export async function politeFetch(url: string): Promise<Response | null> {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    await throttle();
    let res: Response;
    try {
      res = await fetch(url, {
        headers: { 'user-agent': 'tribes2wiki-archive-import (+https://tribes2wiki.com)' },
        redirect: 'follow',
      });
    } catch (err) {
      if (attempt === MAX_ATTEMPTS) throw err;
      await sleep(2000 * attempt);
      continue;
    }

    if (res.ok) return res;
    if (res.status === 404 || res.status === 410) return null;

    // 429 / 5xx -> back off and retry.
    if (attempt === MAX_ATTEMPTS) {
      throw new Error(`${res.status} ${res.statusText} after ${MAX_ATTEMPTS} attempts: ${url}`);
    }
    await sleep(3000 * attempt);
  }
  return null;
}

/** Raw, unrewritten capture: no Wayback toolbar, original markup preserved. */
export function rawCaptureUrl(timestamp: string, originalUrl: string): string {
  return `https://web.archive.org/web/${timestamp}id_/${originalUrl}`;
}

export interface CdxRow {
  timestamp: string;
  original: string;
  statuscode: string;
  mimetype: string;
}

export async function queryCdx(params: Record<string, string>): Promise<CdxRow[]> {
  const qs = new URLSearchParams({
    output: 'text',
    fl: 'timestamp,original,statuscode,mimetype',
    ...params,
  });
  const res = await politeFetch(`${CDX_ENDPOINT}?${qs}`);
  if (!res) return [];
  const body = await res.text();
  return body
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [timestamp, original, statuscode, mimetype] = line.split(' ');
      return { timestamp, original, statuscode, mimetype };
    });
}

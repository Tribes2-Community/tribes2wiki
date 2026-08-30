/**
 * Vectorises the Tribes 2 twin-fork emblem into src/assets/emblem.svg.
 *
 * Source is the community avatar from ChocoTaco1/PlayT2-Modern, in which the
 * emblem is a *hole* punched through an opaque disc rather than a drawn shape.
 * So the extraction is:
 *
 *   1. read the alpha channel
 *   2. flood-fill transparency inward from the border -- everything it reaches
 *      is outside the disc
 *   3. transparent pixels it never reaches are the emblem cutout
 *   4. trace that mask to a path, normalised to a 0..1000 viewBox
 *
 * Re-run with `npm run trace-emblem` if the source art changes.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import potrace from 'potrace';

/**
 * Source art lives in gitignored reference/, so it is fetched on demand rather
 * than vendored -- see src/assets/CREDITS.md for attribution.
 */
const SOURCE_URL =
  'https://raw.githubusercontent.com/ChocoTaco1/PlayT2-Modern/main/images/avatar.svg';
const SOURCE = 'reference/avatar.png';
const OUT_SVG = 'src/assets/emblem.svg';
const OUT_FAVICON = 'public/favicon.svg';
const OUT_AVATAR = 'brand/org-avatar.png';
const ALPHA_CUTOFF = 8;

/** Vertical ramp on the emblem: deep brown-gold at the top, bright gold at the foot. */
const GOLD_TOP = '#7a4f14';
const GOLD_BOTTOM = '#e8bb4f';
const PLATE = '#171c23';
const GRADIENT_ID = 't2-emblem-gold';

if (!existsSync(SOURCE)) {
  console.log('Fetching source art from %s', SOURCE_URL);
  const res = await fetch(SOURCE_URL);
  if (!res.ok) throw new Error(`could not fetch source art: ${res.status}`);
  const svgText = await res.text();
  // The avatar is a raster PNG wrapped in SVG; the emblem is a hole in it.
  const base64 = svgText.match(/href="data:image\/png;base64,([A-Za-z0-9+/=]+)"/)?.[1];
  if (!base64) throw new Error('no embedded PNG found in source art');
  await mkdir(path.dirname(SOURCE), { recursive: true });
  await writeFile(SOURCE, Buffer.from(base64, 'base64'));
}

const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

const alpha = new Uint8Array(W * H);
for (let i = 0; i < W * H; i++) alpha[i] = data[i * 4 + 3];

// Flood-fill transparency inward from the border. Whatever it reaches lies
// outside the disc; transparent pixels it never reaches are the cutout.
const outside = new Uint8Array(W * H);
const stack: number[] = [];
for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);

while (stack.length) {
  const i = stack.pop()!;
  if (outside[i] || alpha[i] > ALPHA_CUTOFF) continue;
  outside[i] = 1;
  const x = i % W;
  const y = (i - x) / W;
  if (x > 0) stack.push(i - 1);
  if (x < W - 1) stack.push(i + 1);
  if (y > 0) stack.push(i - W);
  if (y < H - 1) stack.push(i + W);
}

// potrace traces black-on-white, so the emblem is drawn black.
const mask = Buffer.alloc(W * H, 255);
let count = 0;
let minX = W;
let minY = H;
let maxX = 0;
let maxY = 0;

for (let i = 0; i < W * H; i++) {
  if (alpha[i] > ALPHA_CUTOFF || outside[i]) continue;
  mask[i] = 0;
  count++;
  const x = i % W;
  const y = (i - x) / W;
  if (x < minX) minX = x;
  if (x > maxX) maxX = x;
  if (y < minY) minY = y;
  if (y > maxY) maxY = y;
}

if (count === 0) throw new Error('no cutout found: check ALPHA_CUTOFF or the source image');

const boxW = maxX - minX + 1;
const boxH = maxY - minY + 1;
console.log('emblem pixels: %d (%s%% of canvas)', count, ((count / (W * H)) * 100).toFixed(1));
console.log('bounding box: %dx%d at (%d,%d)', boxW, boxH, minX, minY);

const maskPng = await sharp(mask, { raw: { width: W, height: H, channels: 1 } }).png().toBuffer();

const traced: string = await new Promise((resolve, reject) => {
  const tracer = new potrace.Potrace({
    threshold: 128,
    turdSize: 8,
    optCurve: true,
    optTolerance: 0.2,
    alphaMax: 1,
  });
  tracer.loadImage(maskPng, (err: Error | null) => {
    if (err) return reject(err);
    resolve(tracer.getSVG());
  });
});

const pathData = traced.match(/ d="([^"]+)"/)?.[1];
if (!pathData) throw new Error('potrace returned no path');

// Normalise into a square 1000x1000 viewBox: centre the emblem and scale its
// longest side to fill CONTENT_FRACTION of the box, leaving margin so the shape
// doesn't bleed to the edges when used as a logo or avatar.
const CONTENT_FRACTION = 0.82;
const scale = (1000 * CONTENT_FRACTION) / Math.max(boxW, boxH);
const offsetX = (1000 - boxW * scale) / 2;
const offsetY = (1000 - boxH * scale) / 2;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" role="img" aria-label="Tribes 2 emblem">
  <title>Tribes 2 emblem</title>
  <g transform="translate(${offsetX.toFixed(2)} ${offsetY.toFixed(2)}) scale(${scale.toFixed(5)}) translate(${-minX} ${-minY})">
    <defs>
      <linearGradient id="${GRADIENT_ID}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${GOLD_TOP}"/>
        <stop offset="1" stop-color="${GOLD_BOTTOM}"/>
      </linearGradient>
    </defs>
    <path fill="url(#${GRADIENT_ID})" d="${pathData}"/>
  </g>
</svg>
`;

await mkdir(path.dirname(OUT_SVG), { recursive: true });
await writeFile(OUT_SVG, svg, 'utf8');
console.log('wrote %s (path %d chars)', OUT_SVG, pathData.length);

/** The emblem group, reusable inside other SVG wrappers. */
const emblemGroup = svg.slice(svg.indexOf('<g '), svg.lastIndexOf('</svg>'));

// Favicon: gold emblem, transparent ground, so it reads on any browser chrome.
await mkdir(path.dirname(OUT_FAVICON), { recursive: true });
await writeFile(
  OUT_FAVICON,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">\n  ${emblemGroup.trim()}\n</svg>\n`,
  'utf8',
);
console.log('wrote %s', OUT_FAVICON);

// Square avatar for the GitHub organisation, which needs a raster upload.
const avatarSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
  <rect width="1000" height="1000" rx="200" fill="${PLATE}"/>
  <rect x="20" y="20" width="960" height="960" rx="182" fill="none" stroke="#c9962f" stroke-width="14" opacity="0.5"/>
  ${emblemGroup.trim()}
</svg>`;
await mkdir(path.dirname(OUT_AVATAR), { recursive: true });
await sharp(Buffer.from(avatarSvg), { density: 300 }).resize(1000, 1000).png().toFile(OUT_AVATAR);
console.log('wrote %s (upload to the GitHub org avatar settings)', OUT_AVATAR);

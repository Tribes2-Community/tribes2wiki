/**
 * Generates the social preview card served at /og.png.
 *
 * Starlight already emits og:title, og:description and
 * twitter:card=summary_large_image, but declares no image, so links to the site
 * unfurl without a card. This produces the 1200x630 image those tags point at.
 *
 * The emblem is lifted from src/assets/emblem.svg rather than redrawn, so the
 * card stays in step with `npm run trace-emblem`.
 *
 * Re-run with `npm run make-og-image`.
 */
import { mkdir, stat } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const EMBLEM = 'src/assets/emblem.svg';
const OUT = path.join('public', 'og.png');

const WIDTH = 1200;
const HEIGHT = 630;

/** Matches the site theme: HUD teal ground, gold headline. */
const BG = '#0c1a20';
const PANEL = '#102730';
const RULE = '#1d5168';
const GOLD = '#e8bb4f';
const GOLD_DEEP = '#c9962f';
const TEXT = '#eaf3f5';
const MUTED = '#7e99a2';

/** Fonts available to the SVG rasteriser, not the site's webfont. */
const STACK = "'Segoe UI Semibold','Segoe UI',Arial,Helvetica,sans-serif";

const emblemSvg = readFileSync(EMBLEM, 'utf8');
const emblemGroup = emblemSvg.slice(emblemSvg.indexOf('<g '), emblemSvg.lastIndexOf('</svg>'));

const card = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="ground" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${PANEL}"/>
      <stop offset="1" stop-color="${BG}"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#ground)"/>

  <!-- Emblem, left. The source viewBox is 1000x1000. -->
  <g transform="translate(96 129) scale(0.372)">
    ${emblemGroup}
  </g>

  <!-- Wordmark and strapline, right of the emblem. -->
  <text x="500" y="250" font-family="${STACK}" font-size="96" font-weight="700"
        letter-spacing="4" fill="${GOLD}">TRIBES 2</text>
  <text x="503" y="318" font-family="${STACK}" font-size="46" font-weight="600"
        letter-spacing="7" fill="${TEXT}">COMMUNITY WIKI</text>

  <line x1="503" y1="360" x2="1104" y2="360" stroke="${RULE}" stroke-width="3"/>

  <text x="503" y="416" font-family="${STACK}" font-size="27" fill="${MUTED}">Recovered from the</text>
  <text x="503" y="452" font-family="${STACK}" font-size="27" fill="${MUTED}">Internet Archive and</text>
  <text x="503" y="488" font-family="${STACK}" font-size="27" fill="${MUTED}">maintained by the community</text>

  <text x="503" y="548" font-family="${STACK}" font-size="30" font-weight="600"
        letter-spacing="2" fill="${GOLD_DEEP}">tribes2wiki.com</text>

  <rect x="0" y="${HEIGHT - 8}" width="${WIDTH}" height="8" fill="${GOLD_DEEP}"/>
</svg>`;

await mkdir(path.dirname(OUT), { recursive: true });
await sharp(Buffer.from(card), { density: 200 }).resize(WIDTH, HEIGHT).png().toFile(OUT);

const { size } = await stat(OUT);
console.log('Wrote %s (%dx%d, %d KB)', OUT, WIDTH, HEIGHT, Math.round(size / 1024));

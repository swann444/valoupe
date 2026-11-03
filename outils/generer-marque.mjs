// Génère les fichiers de la marque Valoupe (SVG + PNG) dans marque/ et public/.
// Le logotype est dessiné à partir de la police Bricolage Grotesque (licence OFL) : chaque lettre est
// convertie en tracé vectoriel, le « o » est remplacé par la loupe. Usage : npm run marque
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import opentype from 'opentype.js';
import { chromium } from '@playwright/test';

export const C = {
  nuit: '#0B1A16', pin: '#0F5E4B', jade: '#3DD6A3', etiquette: '#FFD23F',
  papier: '#F5F2EA', lin: '#E6E9E1', ardoise: '#55635A', corail: '#E4573D',
};

const raw = readFileSync('node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff');
const font = opentype.parse(raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.byteLength));
const SIZE = 100, BASE = 100;
const k = SIZE / font.unitsPerEm;
const xh = font.tables.os2.sxHeight * k;
const lBox = font.charToGlyph('l').getBoundingBox();
const stem = (lBox.x2 - lBox.x1) * k;

/** Loupe : lentille (anneau), ✓ intérieur, manche à 45°. Coordonnées absolues. */
function loupe(cx, cy, r, ring, { ringCol, lensCol, checkCol, handleCol, checkSize = 0.5, checkWeight = 0.82 }) {
  const rc = r - ring / 2; // rayon de l'axe de l'anneau
  const a = Math.SQRT1_2;
  const h0 = [cx + r * a * 0.92, cy + r * a * 0.92];
  const h1 = [cx + r * a + r * 0.62, cy + r * a + r * 0.62];
  const s = r * checkSize; // taille du ✓
  const check = `M${f(cx - s * 0.92)} ${f(cy + s * 0.02)} L${f(cx - s * 0.22)} ${f(cy + s * 0.66)} L${f(cx + s * 0.98)} ${f(cy - s * 0.72)}`;
  return [
    lensCol ? `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(rc)}" fill="${lensCol}"/>` : '',
    `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(rc)}" fill="none" stroke="${ringCol}" stroke-width="${f(ring)}"/>`,
    `<path d="M${f(h0[0])} ${f(h0[1])} L${f(h1[0])} ${f(h1[1])}" stroke="${handleCol}" stroke-width="${f(ring * 1.3)}" stroke-linecap="round"/>`,
    `<path d="${check}" fill="none" stroke="${checkCol}" stroke-width="${f(ring * checkWeight)}" stroke-linecap="round" stroke-linejoin="round"/>`,
  ].join('');
}
const f = (n) => Math.round(n * 100) / 100;

/** Lettres placées une à une (avec crénage) : évite les substitutions OpenType non gérées par opentype.js. */
function word(text, x0, y) {
  const path = new opentype.Path();
  let x = x0, prev = null;
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    if (prev) x += font.getKerningValue(prev, g) * k;
    path.extend(g.getPath(x, y, SIZE));
    x += g.advanceWidth * k;
    prev = g;
  }
  return { path, end: x };
}

function logotype(theme) {
  const ink = theme === 'negatif' ? C.papier : theme === 'mono' ? 'currentColor' : C.nuit;
  const lens = theme === 'mono' ? null : C.etiquette;
  const check = theme === 'mono' ? 'currentColor' : C.nuit;
  const L = word('val', 0, BASE);
  const left = L.path;
  let x = L.end;
  const ow = font.charToGlyph('o').advanceWidth * k;
  const r = xh / 2 + xh * 0.05;
  const cx = x + ow / 2 + xh * 0.02, cy = BASE - xh / 2;
  const lens0 = loupe(cx, cy, r, stem * 0.58, { ringCol: ink, lensCol: lens, checkCol: check, handleCol: ink, checkSize: 0.4, checkWeight: 1.05 });
  x += ow + xh * 0.26; // place pour le manche
  const R = word('upe', x, BASE);
  const right = R.path, end = R.end;
  const b1 = left.getBoundingBox(), b2 = right.getBoundingBox();
  const minY = Math.min(b1.y1, b2.y1, cy - r) - 2, maxY = Math.max(b1.y2, b2.y2, cy + r * 1.75) + 2;
  const minX = b1.x1 - 2, maxX = Math.max(b2.x2, end) + 2;
  const vb = `${f(minX)} ${f(minY)} ${f(maxX - minX)} ${f(maxY - minY)}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="Valoupe"><title>Valoupe</title>` +
    `<path d="${left.toPathData(2)}" fill="${ink}"/>${lens0}<path d="${right.toPathData(2)}" fill="${ink}"/></svg>`;
}

/** Symbole seul, grille 64 × 64. */
function symbole(theme, { tile = false } = {}) {
  const dark = theme === 'negatif' || tile;
  const ink = theme === 'mono' ? 'currentColor' : dark ? C.papier : C.nuit;
  const bg = tile ? `<rect width="64" height="64" rx="15" fill="${C.nuit}"/>` : '';
  const g = tile ? 'transform="translate(5.5 5.5) scale(.83)"' : '';
  const body = loupe(26.5, 26.5, 19, 6, { ringCol: ink, lensCol: theme === 'mono' ? null : C.etiquette, checkCol: theme === 'mono' ? 'currentColor' : C.nuit, handleCol: ink });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Valoupe"><title>Valoupe</title>${bg}<g ${g}>${body}</g></svg>`;
}

mkdirSync('marque/png', { recursive: true });
mkdirSync('public', { recursive: true });
const files = {
  'marque/valoupe-logo.svg': logotype('couleur'),
  'marque/valoupe-logo-negatif.svg': logotype('negatif'),
  'marque/valoupe-logo-mono.svg': logotype('mono'),
  'marque/valoupe-symbole.svg': symbole('couleur'),
  'marque/valoupe-symbole-negatif.svg': symbole('negatif'),
  'marque/valoupe-symbole-mono.svg': symbole('mono'),
  'marque/valoupe-icone-app.svg': symbole('couleur', { tile: true }),
};
for (const [p, svg] of Object.entries(files)) writeFileSync(p, svg);
writeFileSync('public/favicon.svg', files['marque/valoupe-icone-app.svg']);
writeFileSync('src/marque-logo.json', JSON.stringify({ couleur: files['marque/valoupe-logo.svg'], negatif: files['marque/valoupe-logo-negatif.svg'], symbole: files['marque/valoupe-symbole.svg'] }));

// Exports PNG (rendus par Chromium, fond transparent sauf l'icône d'app)
const browser = await chromium.launch();
const page = await browser.newPage();
async function png(svg, w, h, out, bg = 'transparent') {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<html><body style="margin:0;background:${bg}"><div style="width:${w}px;height:${h}px;display:grid;place-items:center">${svg.replace('<svg ', `<svg style="max-width:${w}px;max-height:${h}px;width:100%;height:100%" `)}</div></body></html>`);
  await page.screenshot({ path: out, omitBackground: bg === 'transparent' });
}
await png(files['marque/valoupe-icone-app.svg'], 1024, 1024, 'marque/png/valoupe-icone-1024.png');
await png(files['marque/valoupe-icone-app.svg'], 512, 512, 'marque/png/valoupe-icone-512.png');
await png(files['marque/valoupe-icone-app.svg'], 180, 180, 'public/apple-touch-icon.png');
await png(files['marque/valoupe-icone-app.svg'], 192, 192, 'public/icone-192.png');
await png(files['marque/valoupe-icone-app.svg'], 512, 512, 'public/icone-512.png');
await png(files['marque/valoupe-logo.svg'], 1600, 480, 'marque/png/valoupe-logo-1600.png');
await png(files['marque/valoupe-logo-negatif.svg'], 1600, 480, 'marque/png/valoupe-logo-negatif-1600.png', C.nuit);
await png(files['marque/valoupe-symbole.svg'], 512, 512, 'marque/png/valoupe-symbole-512.png');

// Image de partage (réseaux sociaux) 1200 × 630
const fontB64 = readFileSync('node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff2').toString('base64');
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(`<html><head><style>@font-face{font-family:B;src:url(data:font/woff2;base64,${fontB64})}
body{margin:0;width:1200px;height:630px;background:${C.nuit};color:${C.papier};font-family:B;overflow:hidden;position:relative}
.g{position:absolute;inset:0;background-image:radial-gradient(${C.pin} 1.4px,transparent 1.4px);background-size:28px 28px;opacity:.55}
.c{position:absolute;right:-120px;top:-120px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,${C.pin} 0,transparent 70%)}
.w{position:absolute;left:90px;top:150px;width:560px}.t{position:absolute;left:92px;top:360px;font-size:58px;line-height:1.05;letter-spacing:-1.5px;width:900px}
.t b{color:${C.etiquette}}</style></head><body><div class="g"></div><div class="c"></div><div class="w">${files['marque/valoupe-logo-negatif.svg']}</div>
<div class="t">L’occasion, <b>à la loupe.</b></div></body></html>`);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/partage.png' });
await browser.close();
// Copie dans le site (page « Identité & presse » : fichiers téléchargeables)
mkdirSync('public/marque', { recursive: true });
for (const p of Object.keys(files)) copyFileSync(p, 'public/marque/' + p.split('/').pop());
for (const p of readdirSync('marque/png')) copyFileSync('marque/png/' + p, 'public/marque/' + p);
console.log('Marque générée : ' + Object.keys(files).length + ' SVG + 9 PNG');

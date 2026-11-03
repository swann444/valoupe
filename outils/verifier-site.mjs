// Vérifie le site compilé (dist/) comme un visiteur : chaque page, sur PC, tablette et téléphone.
// Contrôles : chargement (200), aucune erreur JavaScript, pas de défilement horizontal, liens internes valides.
// Captures dans captures/. Usage : npm run build ; npm run verifier   (option : BASE_PATH=/valoupe/)
import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const BASE = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');
const PORT = 4399;
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon', '.txt': 'text/plain' };

// Petit serveur statique qui imite GitHub Pages (sous-dossier, index.html, 404.html)
const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (!p.startsWith(BASE)) { res.writeHead(404); return res.end(); }
  p = normalize(join('dist', p.slice(BASE.length)));
  try { if ((await stat(p)).isDirectory()) p = join(p, 'index.html'); } catch { /* fichier absent */ }
  try { const b = await readFile(p); res.writeHead(200, { 'content-type': TYPES[extname(p)] || 'application/octet-stream' }); res.end(b); }
  catch { res.writeHead(404, { 'content-type': 'text/html' }); res.end(await readFile('dist/404.html').catch(() => '404')); }
});
await new Promise((r) => server.listen(PORT, r));
const root = `http://localhost:${PORT}${BASE}`;

const PAGES = ['', 'fonctionnalites/', 'professionnels/', 'feuille-de-route/', 'vision/', 'marque/', 'telecharger/', 'mentions-legales/', 'confidentialite/'];
const VUES = [{ n: 'pc', w: 1440, h: 900 }, { n: 'tablette', w: 820, h: 1180 }, { n: 'telephone', w: 390, h: 844 }];
await mkdir('captures', { recursive: true });
const browser = await chromium.launch();
let ok = 0; const fails = [];
const check = (c, m) => { if (c) ok++; else fails.push(m); };
const links = new Set();

for (const v of VUES) {
  const ctx = await browser.newContext({ viewport: { width: v.w, height: v.h }, deviceScaleFactor: 1, hasTouch: v.n === 'telephone', reducedMotion: 'no-preference' });
  for (const p of PAGES) {
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
    const r = await page.goto(root + p, { waitUntil: 'networkidle' });
    check(r.status() === 200, `${v.n} /${p} : statut ${r.status()}`);
    // tout faire apparaître (animations au défilement) avant la capture
    await page.evaluate(async () => { document.documentElement.style.scrollBehavior = 'auto'; for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 160)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(900);
    const cache = await page.evaluate(() => [...document.querySelectorAll('.reveal:not(.vu)')].length);
    check(cache === 0, `${v.n} /${p} : ${cache} bloc(s) jamais apparus`);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    check(over <= 0, `${v.n} /${p} : défilement horizontal de ${over}px`);
    check(errs.length === 0, `${v.n} /${p} : erreurs ${errs.join(' | ')}`);
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.href));
    hrefs.filter((h) => h.startsWith(`http://localhost:${PORT}`)).forEach((h) => links.add(h.split('#')[0]));
    await page.screenshot({ path: `captures/${v.n}-${(p || 'accueil').replace(/\/$/, '')}.png`, fullPage: true });
    await page.close();
  }
  await ctx.close();
}
for (const l of links) { const r = await fetch(l); check(r.ok, `lien cassé : ${l} (${r.status})`); }
// La loupe de l'accueil suit la souris
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(root);
  const box = await page.locator('[data-scope]').boundingBox();
  await page.mouse.move(box.x + 100, box.y + 100); await page.mouse.move(box.x + 200, box.y + 160, { steps: 8 });
  await page.waitForTimeout(900);
  const x = await page.locator('[data-scope]').evaluate((el) => parseFloat(el.style.getPropertyValue('--x')));
  check(Math.abs(x - 200) < 25, `la loupe ne suit pas la souris (x=${x})`);
  // Simulateur pro
  await page.goto(root + 'professionnels/');
  await page.fill('[name=n]', '10'); await page.fill('[name=e]', '5'); await page.fill('[name=j]', '20');
  check((await page.locator('[data-mois]').innerText()).replace(/\s/g, '') === '1000€', 'simulateur : 10 × 5 × 20 ≠ 1 000 €');
  await page.close();
}
// L'application web publiée sous /app/ démarre et fonctionne (recherche dans le Radar)
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; page.on('pageerror', (e) => errs.push(e.message));
  await page.goto(root + 'app/');
  await page.locator('.topbar .brand').waitFor({ timeout: 15000 });
  check((await page.locator('.topbar .brand').innerText()).includes('Valoupe'), 'app web : nom Valoupe absent');
  await page.locator('[data-go=radar]:visible').first().click();
  await page.fill('#rQ', 'ps5 slim');
  await page.locator('.pcard').first().waitFor();
  check((await page.locator('.pcard').count()) > 0, 'app web : la recherche « ps5 slim » ne trouve rien');
  check(errs.length === 0, 'app web : erreurs ' + errs.join(' | '));
  await page.close();
}
await browser.close(); server.close();
console.log(`${ok} vérifications réussies, ${fails.length} échec(s), ${links.size} liens internes testés`);
if (fails.length) { console.log(fails.join('\n')); process.exit(1); }

// Copie la version web compilée de l'application (C:\dev\marge\dist) dans public/app/ :
// le site publie ainsi l'app à l'adresse /app/. À relancer après chaque nouvelle version de l'app.
// Usage : npm run app   (après « npm run build » dans le dossier de l'application)
import { cpSync, rmSync, existsSync, readFileSync } from 'node:fs';

const src = process.env.APP_DIST || '../marge/dist';
if (!existsSync(src + '/index.html')) { console.error(`Version web introuvable : ${src}/index.html. Compiler l'app d'abord (npm run build).`); process.exit(1); }
const html = readFileSync(src + '/index.html', 'utf8');
if (!html.includes('Valoupe')) { console.error('Cette compilation ne porte pas le nom Valoupe : recompiler l’app.'); process.exit(1); }
rmSync('public/app', { recursive: true, force: true });
cpSync(src, 'public/app', { recursive: true });
console.log('App web copiée dans public/app/');

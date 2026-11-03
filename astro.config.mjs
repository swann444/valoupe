// Configuration du site Valoupe (Astro génère des pages HTML statiques dans dist/).
// SITE_URL et BASE_PATH sont fournis au moment du déploiement (ex. GitHub Pages : /valoupe/).
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});

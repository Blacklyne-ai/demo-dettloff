// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// ─────────────────────────────────────────────────────────────
// Schwimmbadtechnik Dettloff — STATIC build. Kein Adapter, kein SSR.
// Output: /dist als reine HTML-Dateien. Deploy: Cloudflare PAGES
//   Framework preset: Astro · Build: npm run build · Output: dist
// Tailwind v3.4 via @astrojs/tailwind (v4 bricht Cloudflare Pages).
// ─────────────────────────────────────────────────────────────
export default defineConfig({
  site: 'https://demo-dettloff.pages.dev',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) =>
        !/\/(impressum|datenschutz|agb|widerruf|haftungsausschluss)/.test(page),
    }),
  ],
  // /seite.html statt /seite/index.html → Cloudflare serviert ohne 308-Hop.
  build: {
    format: 'file',
    inlineStylesheets: 'always',
  },
});

import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'node:fs';
if (!existsSync('docs/qa2')) mkdirSync('docs/qa2', { recursive: true });
const BASE = 'http://localhost:4424';

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
await ctx.addInitScript(() => { try { localStorage.setItem('dettloff-cookie-ok', '1'); } catch (e) {} });
const p = await ctx.newPage();

async function settle() {
  await p.evaluate(async () => {
    await new Promise((res) => { let y = 0; const t = setInterval(() => { window.scrollBy(0, 500); y += 500; if (y >= document.body.scrollHeight) { clearInterval(t); res(); } }, 50); });
  });
  await p.evaluate(() => Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; }))));
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(300);
}

// Homepage sections
await p.goto(BASE + '/index.html', { waitUntil: 'networkidle' });
await settle();
await p.locator('header').first().screenshot({ path: 'docs/qa2/home-header.png' });
const secs = await p.locator('main > section').count();
for (let i = 0; i < secs; i++) {
  await p.locator('main > section').nth(i).screenshot({ path: `docs/qa2/home-sec${i}.png` });
}
await p.locator('footer').screenshot({ path: 'docs/qa2/home-footer.png' });
console.log(`home: header + ${secs} sections + footer`);

// Subpage heroes (PageHero) for consistency
for (const [path, name] of [['/pools.html','pools'],['/pool-abdeckungen.html','abdeckungen'],['/kontakt.html','kontakt'],['/impressum.html','impressum']]) {
  await p.goto(BASE + path, { waitUntil: 'networkidle' });
  await settle();
  await p.locator('section').first().screenshot({ path: `docs/qa2/hero-${name}.png` });
}
console.log('subpage heroes done');
await b.close();
console.log('SECTION SHOTS DONE');

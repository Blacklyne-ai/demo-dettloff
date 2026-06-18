import { chromium } from 'playwright';
const BASE = 'http://localhost:4424';
const PATH = process.argv[2] || '/index.html';
const W = +(process.argv[3] || 1440);
const tag = process.argv[4] || 'flow';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: W, height: W < 700 ? 844 : 900 }, reducedMotion: 'reduce' });
await ctx.addInitScript(() => { try { localStorage.setItem('dettloff-cookie-ok', '1'); } catch (e) {} });
const p = await ctx.newPage();
await p.goto(BASE + PATH, { waitUntil: 'load', timeout: 25000 });
const H = await p.evaluate(() => document.body.scrollHeight);
const step = Math.round((W < 700 ? 844 : 900) * 0.9);
let i = 0;
for (let y = 0; y < H && i < 12; y += step, i++) {
  await p.evaluate((yy) => window.scrollTo(0, yy), y);
  await p.waitForTimeout(450);
  await p.screenshot({ path: `docs/qa/${tag}-${String(i).padStart(2, '0')}.png` });
}
console.log(tag, 'shots', i, 'H', H);
await b.close();

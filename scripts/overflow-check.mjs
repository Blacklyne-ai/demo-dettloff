import { chromium } from 'playwright';
const BASE = 'http://localhost:4424';
const paths = ['/index.html','/pools.html','/pool-abdeckungen.html','/projekte.html','/bauphase.html','/kontakt.html','/impressum.html','/datenschutz.html'];
const widths = [360, 390, 768, 1024];
const b = await chromium.launch();
let problems = 0;
for (const w of widths) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  const p = await ctx.newPage();
  for (const path of paths) {
    await p.goto(BASE + path, { waitUntil: 'domcontentloaded' });
    const r = await p.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
    }));
    const over = r.sw - r.cw;
    if (over > 1) { console.log(`OVERFLOW  ${w}px  ${path}  (+${over}px)`); problems++; }
  }
  await ctx.close();
}
// readable mobile-header shot
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await ctx.addInitScript(() => { try { localStorage.setItem('dettloff-cookie-ok','1'); } catch(e){} });
const p = await ctx.newPage();
await p.goto(BASE + '/index.html', { waitUntil: 'networkidle' });
await p.screenshot({ path: 'docs/qa/home-m-top.png' });
// open mobile menu
await p.click('#navToggle');
await p.waitForTimeout(300);
await p.screenshot({ path: 'docs/qa/home-m-menu.png' });
await b.close();
console.log(problems === 0 ? 'NO OVERFLOW ✓' : `${problems} overflow issue(s)`);

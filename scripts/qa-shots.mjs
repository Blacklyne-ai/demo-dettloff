import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'node:fs';
if (!existsSync('docs/qa')) mkdirSync('docs/qa', { recursive: true });

const BASE = 'http://localhost:4424';
const pages = [
  ['/index.html', 'home'],
  ['/pools.html', 'pools'],
  ['/pool-abdeckungen.html', 'abdeckungen'],
  ['/projekte.html', 'projekte'],
  ['/bauphase.html', 'bauphase'],
  ['/kontakt.html', 'kontakt'],
  ['/impressum.html', 'impressum'],
  ['/datenschutz.html', 'datenschutz'],
];

const b = await chromium.launch();
async function run(label, viewport, only) {
  const ctx = await b.newContext({
    viewport,
    reducedMotion: 'reduce',
    deviceScaleFactor: 1,
  });
  await ctx.addInitScript(() => {
    try { localStorage.setItem('dettloff-cookie-ok', '1'); } catch (e) {}
  });
  const p = await ctx.newPage();
  for (const [path, name] of pages) {
    if (only && !only.includes(name)) continue;
    await p.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 });
    // lazy-Images triggern: durchscrollen, dann auf vollständiges Laden warten
    await p.evaluate(async () => {
      await new Promise((res) => {
        let y = 0; const step = 500;
        const t = setInterval(() => {
          window.scrollBy(0, step); y += step;
          if (y >= document.body.scrollHeight) { clearInterval(t); res(); }
        }, 60);
      });
    });
    await p.evaluate(() => Promise.all([...document.images]
      .filter((i) => !i.complete)
      .map((i) => new Promise((r) => { i.onload = i.onerror = r; }))));
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.waitForTimeout(350);
    await p.screenshot({ path: `docs/qa/${name}${label}.png`, fullPage: true });
    console.log(`ok  ${name}${label}`);
  }
  await ctx.close();
}

await run('', { width: 1440, height: 900 });
await run('-m', { width: 390, height: 844 }, ['home', 'pools', 'abdeckungen', 'projekte', 'bauphase', 'kontakt']);
await b.close();
console.log('QA DONE');

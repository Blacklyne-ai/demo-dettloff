import { chromium } from 'playwright';
import fs from 'node:fs';
const b = await chromium.launch();

// 1) kurzen Test-Clip aufnehmen (nur zur Mechanik-Verifikation, wird danach gelöscht)
const rec = await b.newContext({ recordVideo: { dir: '/tmp/vidrec', size: { width: 1280, height: 720 } }, viewport: { width: 1280, height: 720 } });
const rp = await rec.newPage();
await rp.setContent('<style>@keyframes m{from{filter:hue-rotate(0)}to{filter:hue-rotate(360deg)}}</style><div style="width:100vw;height:100vh;background:linear-gradient(45deg,#00b5e4,#015a7c);animation:m 4s linear"></div>');
await rp.waitForTimeout(4300);
await rec.close();
const vids = fs.readdirSync('/tmp/vidrec').filter((f) => f.endsWith('.webm'));
fs.mkdirSync('dist/videos', { recursive: true });
fs.copyFileSync('/tmp/vidrec/' + vids[0], 'dist/videos/hero-pool.webm');
console.log('test clip bytes:', fs.statSync('dist/videos/hero-pool.webm').size);

// 2) Scrub-Mechanik prüfen
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const errs = [];
p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
p.on('pageerror', (e) => errs.push('PE ' + e.message));
await p.goto('http://localhost:4424/index.html', { waitUntil: 'load' });
await p.waitForTimeout(1600);
const t0 = await p.evaluate(() => document.querySelector('[data-hero-video]')?.currentTime ?? -1);
for (let i = 0; i < 8; i++) { await p.mouse.wheel(0, 450); await p.waitForTimeout(220); }
await p.waitForTimeout(500);
const r = await p.evaluate(() => ({
  ct: +(document.querySelector('[data-hero-video]')?.currentTime ?? -1).toFixed(2),
  pinned: !!document.querySelector('.pin-spacer'),
  vidOpacity: +getComputedStyle(document.querySelector('[data-hero-video]')).opacity,
}));
console.log('t0:', t0.toFixed(2), '→ after-scroll:', JSON.stringify(r));
console.log('errors (404 erwartet/ignoriert):', errs.filter((e) => !e.includes('404')).join(' | ') || 'none');
await b.close();

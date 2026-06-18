import { chromium } from 'playwright';
const BASE = 'http://localhost:4424';
const b = await chromium.launch();

// ── MOTION ON ──
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const errs = [];
p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
p.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message));
await p.goto(BASE + '/index.html', { waitUntil: 'networkidle' });
await p.waitForTimeout(1700);
const load = await p.evaluate(() => ({
  js: document.documentElement.classList.contains('js'),
  lenis: document.documentElement.classList.contains('lenis'),
  heroOpacity: +getComputedStyle(document.querySelector('[data-hero]')).opacity,
  splitChildren: document.querySelector('[data-split]')?.querySelectorAll('div,span').length || 0,
}));
console.log('LOAD:', JSON.stringify(load));
// realer Scroll (wheel → Lenis verarbeitet es) bis ganz unten
for (let i = 0; i < 16; i++) { await p.mouse.wheel(0, 700); await p.waitForTimeout(200); }
await p.waitForTimeout(900);
const after = await p.evaluate(() => {
  const all = [...document.querySelectorAll('[data-reveal]')];
  return {
    revealsTotal: all.length,
    revealsHidden: all.filter((e) => +getComputedStyle(e).opacity < 0.05).length,
  };
});
console.log('AFTER SCROLL:', JSON.stringify(after));
console.log('console errors:', errs.length ? errs.slice(0, 5).join(' | ') : 'none ✓');
await ctx.close();

// ── REDUCED MOTION ──
const ctx2 = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const p2 = await ctx2.newPage();
await p2.goto(BASE + '/index.html', { waitUntil: 'networkidle' });
await p2.waitForTimeout(700);
const rm = await p2.evaluate(() => ({
  lenis: document.documentElement.classList.contains('lenis'),
  hidden: [...document.querySelectorAll('[data-reveal],[data-hero]')].filter((e) => +getComputedStyle(e).opacity < 0.05).length,
}));
console.log('REDUCED:', JSON.stringify(rm), '(lenis=false & hidden=0 erwartet)');
await b.close();

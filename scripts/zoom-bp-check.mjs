import { chromium } from 'playwright';
const BASE = 'http://localhost:4424';
const b = await chromium.launch();

// MOTION: hero-zoom + BuildStory pin/crossfade
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => { try { localStorage.setItem('dettloff-cookie-ok', '1'); } catch (e) {} });
const p = await ctx.newPage();
const errs = [];
p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
p.on('pageerror', (e) => errs.push('PE ' + e.message));
await p.goto(BASE + '/index.html', { waitUntil: 'load' });
await p.waitForTimeout(1400);
const zTop = await p.evaluate(() => getComputedStyle(document.querySelector('[data-hero-zoom]')).transform);
await p.mouse.wheel(0, 500); await p.waitForTimeout(300);
const zScroll = await p.evaluate(() => getComputedStyle(document.querySelector('[data-hero-zoom]')).transform);
const seen = new Set(); let pin = 0; let shot = false;
for (let i = 0; i < 80; i++) {
  await p.mouse.wheel(0, 420); await p.waitForTimeout(100);
  const r = await p.evaluate(() => ({
    a: [...document.querySelectorAll('[data-bp-img]')].findIndex((im) => +getComputedStyle(im).opacity > 0.5),
    pin: document.querySelectorAll('.pin-spacer').length,
  }));
  if (r.a >= 0) seen.add(r.a);
  pin = Math.max(pin, r.pin);
  if (!shot && r.a >= 1) { await p.screenshot({ path: 'docs/qa/bp-compact.png' }); shot = true; }
}
const rev = await p.evaluate(() => [...document.querySelectorAll('[data-reveal]')].filter((e) => +getComputedStyle(e).opacity < 0.05).length);
console.log('hero-zoom top:', zTop.slice(0, 24), '-> scrolled:', zScroll.slice(0, 24));
console.log('BuildStory Phasen:', JSON.stringify([...seen].sort()), '| pinSpacers:', pin, '| revealsHidden:', rev);
console.log('errors:', errs.filter((e) => !e.includes('404')).join(' | ') || 'none');
await ctx.close();

// reduced-motion: hero still capture
const c2 = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 2 });
await c2.addInitScript(() => { try { localStorage.setItem('dettloff-cookie-ok', '1'); } catch (e) {} });
const p2 = await c2.newPage();
await p2.goto(BASE + '/index.html', { waitUntil: 'load' }); await p2.waitForTimeout(700);
await p2.screenshot({ path: 'docs/qa/hero-zoom.png' });
await b.close();
console.log('captured hero-zoom.png + bp-compact.png');

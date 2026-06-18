import { chromium } from 'playwright';
const BASE = 'http://localhost:4424';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await ctx.addInitScript(() => { try { localStorage.setItem('dettloff-cookie-ok', '1'); } catch (e) {} });
const p = await ctx.newPage();
const errs = [];
p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
p.on('pageerror', (e) => errs.push('PE ' + e.message));
await p.goto(BASE + '/index.html', { waitUntil: 'load' });
await p.waitForTimeout(1500);

// Slow, small steps so Lenis momentum stays minimal and the 0.5s crossfade settles.
// Record, for every step: which bp-img is fully visible + whether the stage is pinned in view.
const seen = new Set();
const shots = {}; // phaseIndex -> taken
let maxPin = 0;
for (let i = 0; i < 140; i++) {
  await p.mouse.wheel(0, 220);
  await p.waitForTimeout(620); // > crossfade duration so the active phase settles
  const r = await p.evaluate(() => {
    const stage = document.querySelector('.bp-stage');
    const sr = stage ? stage.getBoundingClientRect() : null;
    const imgs = [...document.querySelectorAll('[data-bp-img]')];
    const active = imgs.findIndex((im) => +getComputedStyle(im).opacity > 0.8);
    // is the pinned stage actually filling the viewport right now?
    const pinnedInView = !!sr && sr.top <= 4 && sr.bottom >= window.innerHeight - 4;
    return { active, pinnedInView, pin: document.querySelectorAll('.pin-spacer').length };
  });
  maxPin = Math.max(maxPin, r.pin);
  if (r.pinnedInView && r.active >= 0) {
    seen.add(r.active);
    // capture each phase once, while genuinely pinned
    if (!shots[r.active]) {
      await p.screenshot({ path: `docs/qa/bp-phase-${r.active}.png` });
      shots[r.active] = true;
    }
  }
  // stop once we've left the pin well behind and captured the late phases
  if (!r.pinnedInView && seen.size >= 3 && i > 20) break;
}
const rev = await p.evaluate(() => [...document.querySelectorAll('[data-reveal]')].filter((e) => +getComputedStyle(e).opacity < 0.05).length);
console.log('phases seen while pinned:', JSON.stringify([...seen].sort()), '| captured:', Object.keys(shots).sort().join(','));
console.log('maxPinSpacers:', maxPin, '| revealsHidden:', rev);
console.log('errors:', errs.filter((e) => !e.includes('404')).join(' | ') || 'none');
await b.close();

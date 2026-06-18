import { chromium } from 'playwright';
const BASE = 'http://localhost:4424';
const b = await chromium.launch();

// ── A) MOTION: Scrollytelling-Crossfade + Reveals + Fehler ──
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const errs = [];
p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
p.on('pageerror', (e) => errs.push('PE ' + e.message));
await p.goto(BASE + '/index.html', { waitUntil: 'load' });
await p.waitForTimeout(1500);
const seen = new Set();
for (let i = 0; i < 60; i++) {
  await p.mouse.wheel(0, 500);
  await p.waitForTimeout(110);
  const act = await p.evaluate(() => {
    const imgs = [...document.querySelectorAll('[data-bs-img]')];
    return imgs.findIndex((im) => +getComputedStyle(im).opacity > 0.5);
  });
  if (act >= 0) seen.add(act);
}
const r = await p.evaluate(() => ({
  revealsHidden: [...document.querySelectorAll('[data-reveal]')].filter((e) => +getComputedStyle(e).opacity < 0.05).length,
}));
console.log('BuildStory aktive Phasen gesehen:', JSON.stringify([...seen].sort()), '(mehrere 0..3 = Crossfade läuft)');
console.log('revealsHidden:', r.revealsHidden, '| errors:', errs.filter((e) => !e.includes('404')).join(' | ') || 'none');
await ctx.close();

// ── B) Captures (reduced-motion = sauber, kein Pin-Geruckel) ──
const ctx2 = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
await ctx2.addInitScript(() => { try { localStorage.setItem('dettloff-cookie-ok', '1'); } catch (e) {} });
const p2 = await ctx2.newPage();
await p2.goto(BASE + '/index.html', { waitUntil: 'load' });
await p2.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await p2.waitForTimeout(700);
await p2.screenshot({ path: 'docs/qa/footer-new.png' });
const bsTop = await p2.evaluate(() => { const s = document.querySelector('[data-buildstory]'); window.scrollTo(0, s.offsetTop + 40); return s.offsetTop; });
await p2.waitForTimeout(600);
await p2.screenshot({ path: 'docs/qa/buildstory.png' });
console.log('captured footer-new.png + buildstory.png');
await b.close();

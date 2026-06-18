import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'node:fs';
if (!existsSync('docs')) mkdirSync('docs');

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });

async function shot(url, name, full = false) {
  try {
    await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await p.waitForTimeout(1500);
    await p.screenshot({ path: `docs/${name}.png`, fullPage: full });
    console.log(`ok  ${name}  <- ${url}`);
  } catch (e) {
    console.log(`ERR ${name}  <- ${url}  ${e.message}`);
  }
}

await shot('https://schwimmbadtechnik-dettloff.de/', 'old-site-full', true);
await shot('https://schwimmbadtechnik-dettloff.de/', 'old-site-top', false);
for (const [u, n] of [
  ['https://www.route66-hh.de/', 'ref-route66'],
  ['https://www.auto-motorrad-freigang.de/', 'ref-amf'],
  ['https://www.astonservicehamburg.de/', 'ref-aston'],
]) await shot(u, n, false);

await b.close();
console.log('DONE');

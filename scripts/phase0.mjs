import sharp from 'sharp';
import { readdirSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('docs/old-img');
const OUT = path.resolve('docs/contact');
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

// ── 1. LOGO PIXEL ANALYSIS ───────────────────────────────────
async function logoColors(file) {
  const { data, info } = await sharp(file)
    .resize(120, 120, { fit: 'inside' })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const m = new Map();
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const a = info.channels === 4 ? data[i + 3] : 255;
    if (a < 50) continue;
    // skip near-white / near-black background noise for the "brand" read
    const hex = '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('');
    m.set(hex, (m.get(hex) || 0) + 1);
  }
  console.log(`\n=== LOGO COLORS: ${path.basename(file)} ===`);
  [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12)
    .forEach(([h, n]) => console.log(h, n));
}
await logoColors(path.join(ROOT, 'brand/logo.png'));
if (existsSync(path.join(ROOT, 'brand/logo-footer.png')))
  await logoColors(path.join(ROOT, 'brand/logo-footer.png'));

// ── 2. CONTACT SHEETS ────────────────────────────────────────
const COLS = 4, TW = 380, GAP = 8;
async function sheet(dir) {
  const full = path.join(ROOT, dir);
  if (!existsSync(full)) return;
  const files = readdirSync(full).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
  if (!files.length) return;
  console.log(`\n=== CONTACT SHEET: ${dir} (${files.length}) ===`);
  const thumbs = [];
  for (let i = 0; i < files.length; i++) {
    const buf = await sharp(path.join(full, files[i]))
      .resize(TW, Math.round(TW * 0.72), { fit: 'cover', position: 'centre' })
      .toBuffer();
    // index badge
    const badge = Buffer.from(
      `<svg width="${TW}" height="${Math.round(TW * 0.72)}"><rect x="0" y="0" width="44" height="30" fill="#000" opacity="0.65"/><text x="8" y="21" font-family="sans-serif" font-size="18" fill="#fff">${i}</text></svg>`
    );
    thumbs.push(await sharp(buf).composite([{ input: badge, top: 0, left: 0 }]).toBuffer());
    console.log(`  ${i} -> ${files[i]}`);
  }
  const th = Math.round(TW * 0.72);
  const rows = Math.ceil(thumbs.length / COLS);
  const W = COLS * TW + (COLS + 1) * GAP;
  const H = rows * th + (rows + 1) * GAP;
  const comp = thumbs.map((input, i) => ({
    input,
    top: GAP + Math.floor(i / COLS) * (th + GAP),
    left: GAP + (i % COLS) * (TW + GAP),
  }));
  await sharp({ create: { width: W, height: H, channels: 3, background: '#f3f4f6' } })
    .composite(comp)
    .jpeg({ quality: 82 })
    .toFile(path.join(OUT, `sheet-${dir}.jpg`));
}
for (const d of ['hero', 'projekte', 'abdeckungen', 'bauphase']) await sheet(d);
console.log('\nDONE');

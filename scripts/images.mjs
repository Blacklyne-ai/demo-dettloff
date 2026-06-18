import sharp from 'sharp';
import { readdirSync, existsSync, mkdirSync, writeFileSync, copyFileSync } from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('docs/old-img');
const PUB = path.resolve('public');
const IMG = path.join(PUB, 'images');
const mk = (d) => { if (!existsSync(d)) mkdirSync(d, { recursive: true }); };
[IMG, path.join(IMG, 'projekte'), path.join(IMG, 'abdeckungen'), path.join(IMG, 'bauphase'), path.join(IMG, 'hero')].forEach(mk);
mk(path.resolve('src/data'));

// Files to skip entirely (cross-gallery duplicate kept only in abdeckungen)
const DROP = new Set(['WhatsApp-Image-2025-02-21-at-12.45.46.jpeg']); // dup of abdeckungen jacuzzi-enclosure shot

// ── helper: emit width-constrained webp set, return {src,w,h} of the largest ──
async function variant(file, outDir, base, widths, q = 72) {
  let meta = null;
  for (const w of widths) {
    const suffix = w === Math.max(...widths) ? '' : `-${w}`;
    const out = path.join(outDir, `${base}${suffix}.webp`);
    const info = await sharp(file).resize({ width: w, withoutEnlargement: true })
      .webp({ quality: q }).toFile(out);
    if (suffix === '') meta = info;
  }
  return meta;
}

// ── galleries → clean sequential names + gallery.json (with dims) ──
const galleryAlt = {
  projekte: 'Fertiggestellter Swimmingpool von Schwimmbadtechnik Dettloff',
  abdeckungen: 'Pool-Abdeckung und Überdachung von Schwimmbadtechnik Dettloff',
  bauphase: 'Pool-Bauphase – Schwimmbadtechnik Dettloff bei der Arbeit',
};
const slug = { projekte: 'projekt', abdeckungen: 'abdeckung', bauphase: 'bau' };
const data = {};

for (const gal of ['projekte', 'abdeckungen', 'bauphase']) {
  const dir = path.join(SRC, gal);
  const files = readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f) && !DROP.has(f)).sort();
  data[gal] = [];
  let i = 0;
  for (const f of files) {
    i++;
    const base = `${slug[gal]}-${String(i).padStart(2, '0')}`;
    const m = await variant(path.join(dir, f), path.join(IMG, gal), base, [1100, 600]);
    data[gal].push({
      src: `/images/${gal}/${base}.webp`,
      sm: `/images/${gal}/${base}-600.webp`,
      w: m.width, h: m.height,
      alt: galleryAlt[gal],
    });
  }
  console.log(`${gal}: ${data[gal].length} images`);
}
writeFileSync(path.resolve('src/data/gallery.json'), JSON.stringify(data, null, 2));

// ── hero candidates (allow upscale; CSS object-cover crops) ──
const heroes = {
  'heroA-pool':  path.join(SRC, 'projekte/WhatsApp-Iemage-2025-02-21-at-12.45.45.jpeg'), // palms, bright turquoise
  'heroB-pool':  path.join(SRC, 'projekte/WhatsApp-Image-2025j-02-21-at-12.45.44.jpeg'), // blue sky, long pool
  'heroC-wide':  path.join(SRC, 'hero/slider-002.jpg'), // clean wide banner
};
for (const [name, file] of Object.entries(heroes)) {
  for (const w of [1920, 1280, 800]) {
    const suffix = w === 1920 ? '' : `-${w}`;
    await sharp(file).resize({ width: w }).webp({ quality: 74 })
      .toFile(path.join(IMG, 'hero', `${name}${suffix}.webp`));
  }
  console.log(`hero ${name} ✓`);
}

// ── seit-1994 / über-uns: branded company truck ──
await variant(path.join(SRC, 'hero/slider-001.jpg'), IMG, 'truck', [1100, 600]);

// ── logos 1:1 (lossless re-encode), favicon, apple-touch, og ──
await sharp(path.join(SRC, 'brand/logo.png')).png({ compressionLevel: 9 }).toFile(path.join(PUB, 'logo.png'));
await sharp(path.join(SRC, 'brand/logo-footer.png')).png({ compressionLevel: 9 }).toFile(path.join(PUB, 'logo-footer.png'));

// favicon: footer logo centred on white square (brand mark visible at small size)
const favBase = await sharp(path.join(SRC, 'brand/logo-footer.png')).resize({ width: 200, height: 200, fit: 'inside' }).toBuffer();
for (const [sz, out] of [[256, 'favicon.png'], [180, 'apple-touch-icon.png']]) {
  await sharp({ create: { width: sz, height: sz, channels: 4, background: '#ffffff' } })
    .composite([{ input: await sharp(favBase).resize({ width: Math.round(sz * 0.84), height: Math.round(sz * 0.84), fit: 'inside' }).toBuffer(), gravity: 'centre' }])
    .png().toFile(path.join(PUB, out));
}

// og-image 1200x630 from bright hero
await sharp(heroes['heroA-pool']).resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 84 }).toFile(path.join(IMG, 'og-image.jpg'));

console.log('\nIMAGES DONE');

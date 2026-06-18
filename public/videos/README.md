# Hero-Video

Erwartete Datei: **`hero-pool.webm`** (dieser Ordner).

Der Hero ist **Scroll-Scrubbing** (Apple-Style): Beim Scrollen wird die Sektion gepinnt und der
Scroll-Fortschritt steuert die Videozeit vor/zurück. Dafür muss der Clip **keyframe-dicht** sein,
sonst ruckelt das Spulen.

Anforderungen:
- Inhalt: ruhiges, türkises Poolwasser mit leichter Bewegung (vollflächig, cinematisch).
- Format: **WebM** (VP9), stummgeschaltet, **~4–8 s**.
- **Keyframe-dicht encoden** (jedes Frame ein Keyframe), z. B.:
  `ffmpeg -i quelle.mov -an -c:v libvpx-vp9 -g 1 -keyint_min 1 -b:v 2M -vf scale=1920:-2 hero-pool.webm`
- Größe: möglichst **< 3 MB**.

Verhalten (implementiert in `src/pages/index.astro` + `src/layouts/Layout.astro`):
- Scrubbing **nur auf Desktop** (≥ 768 px) und **nicht** bei `prefers-reduced-motion`.
- Das WebP-Standbild (`/images/hero/heroA-pool*`) ist das LCP-Element und das Fallback auf
  Mobile/Reduced-Motion. **Fehlt die Datei, wird NICHT gepinnt** – dann normaler Hero mit Standbild.

Solange die Datei fehlt, zeigt die Seite sauber das Standbild (kein Fehler sichtbar).

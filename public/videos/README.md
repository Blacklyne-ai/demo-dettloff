# Hero-Video

Erwartete Datei: **`hero-pool.webm`** (dieser Ordner).

Anforderungen:
- Inhalt: ruhiges, türkises Poolwasser mit leichter Bewegung (vollflächig, cinematisch).
- Format: **WebM** (VP9/AV1), stummgeschaltet, nahtloser Loop ~6–10 s.
- Größe: möglichst **< 3 MB** (deutlich komprimiert), 1920×1080 reicht (object-cover).
- Optional zusätzlich `hero-pool.mp4` als breiterer Fallback (dann im `<video>` als zweite `<source>` ergänzen).

Verhalten (bereits implementiert in `src/pages/index.astro` + `src/layouts/Layout.astro`):
- Lädt **nur auf Desktop** (≥ 768 px) und **nicht** bei `prefers-reduced-motion`.
- Das WebP-Standbild (`/images/hero/heroA-pool*`) ist das LCP-Element und bleibt das Fallback
  auf Mobile sowie wenn die Videodatei fehlt – das Video blendet nur weich darüber, sobald bereit.

Solange die Datei fehlt, zeigt die Seite sauber das Standbild (kein Fehler sichtbar).

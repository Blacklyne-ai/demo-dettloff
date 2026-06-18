# Hero-Video

`hero-pool.mp4` — cinematischer Loop im Hero (aktuell lizenzfreier Mixkit-Clip „Luxury swimming pool",
auf ~2,2 MB komprimiert). **Autoplay, stumm, Loop**, läuft **nur auf Desktop** und **nicht** bei
`prefers-reduced-motion`. Auf Mobile/Reduced-Motion zeigt die Seite das Standbild
`/images/hero/hero-still*.webp` (= LCP-Element, ein Frame aus dem Clip).

## Durch echtes Kundenmaterial ersetzen (empfohlen fürs Live-Going)
Stock zeigt einen fremden Pool. Sobald ein eigener Dettloff-Clip vorliegt:
1. Auf ~8 s trimmen, stumm, web-optimieren (Beispiel mit ffmpeg):
   `ffmpeg -i quelle.mov -t 8 -an -vf "scale=1600:-2,fps=25" -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart public/videos/hero-pool.mp4`
2. Neues Standbild als Poster ziehen und als `hero-still.webp` (+ `-1280`, `-800`) ablegen:
   `ffmpeg -ss 2 -i quelle.mov -frames:v 1 hero-still.jpg` → zu WebP konvertieren.
Ziel: mp4 < ~3 MB.

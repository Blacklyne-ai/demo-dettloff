# Style Guide: Schwimmbadtechnik Dettloff

2026-Redesign der WordPress-Bestandsseite (schwimmbadtechnik-dettloff.de).
Die alte Seite ist **Content-Quelle, nicht Stilvorlage**. Ruhig, bild-getrieben,
hochwertig, wasser-nah.

## Logo-Farben (pixel-extrahiert via sharp, `scripts/phase0.mjs`)

Das Original-Logo ist **zweifarbig**:

| Farbe | Hex (dominant) | Vorkommen im Logo |
|---|---|---|
| Türkis / Wasser | `#00b5e4` | „Schwimmbadtechnik"-Schriftzug, Taucher-Figur, Welle |
| Rot | `#c10012` | „Dettloff"-Schriftzug, Tagline „Qualität nur vom Fachmann" |

Das Türkis bestätigt exakt die `theme-color` der alten Seite (`#00b5e4`).
Logo-Pixel-Analyse hat Vorrang - beide Farben sind echt und belegt.

## Farbpalette

| Element | Hex | Quelle / Rolle |
|---|---|---|
| Brand Türkis | `#00b5e4` | Logo - **dominanter Marken-Akzent** (Wasser, Highlights, Icons, Borders) |
| Türkis interaktiv | `#007199` | abgedunkelt für Buttons mit weißer Schrift (AA ≥ 4.5:1) |
| Türkis Text | `#015a7c` | Links / Akzent-Text auf Hell (kontraststark) |
| Türkis Fläche | `#e4f3fb` | sehr helle Wasser-Tönung für Section-Flächen |
| Brand Rot | `#c10012` | Logo - **sparsamer, scharfer Akzent** (siehe Regel unten) |
| Ink (Text) | `#0f2a36` | tiefes Teal-Navy statt Schwarz (Wasser bei Nacht) |
| Ink soft | `#38525f` | Sekundärtext |
| Muted | `#6b818c` | Labels, Captions |
| Paper (Seite) | `#f5fafc` | kühles, frisches Off-White (~80 % Fläche) |
| Surface | `#ffffff` | Karten |
| Mist | `#e9f4fa` | sanfte Wasser-Abstufung für Sections |
| Shell | `#f4efe8` | warmer Off-White (Stein/Beton-Beckenrand) für Wärme-Kontrast |
| Line | `#d7e5ec` | Rahmen / Trenner |
| Dark | `#082530` | **nur** CtaBand + Footer (tiefes Ozean-Teal) |

**Rot-Regel:** Rot ist echte Markenfarbe (Logo-Schriftzug „Dettloff"), aber es würde
den ruhigen, frischen Wasser-Look erschlagen, wenn es flächig eingesetzt wird.
Darum: Türkis ist der Arbeits-Akzent (Buttons, Links, Icons, Highlights), Rot lebt
v. a. **im Logo selbst** und als seltener, bewusster Mikro-Akzent (z. B. „seit 1994"-
Marke, ausgewählte Hover/Detail). Niemals Rot als CTA-Flächenfarbe.

Fundament: ~80 % Hell (Paper/Surface/Mist), dunkle Sektion nur CtaBand + Footer.

## Schrift

Die alte Seite nutzt das WP-Theme „dt-the7" mit **Theme-Default Roboto** (+ Roboto
Condensed, Belanosima, ein verirrtes Lobster) - keine bewusste Markenschrift, nur
Theme-Vorgabe. Darum bewusste, moderne Wahl (vom Briefing ausdrücklich erlaubt):

- **Display / große Headlines:** `Fraunces` (variable Serif) - weich, premium, ruhig.
  Gibt der aspirativen Pool-Welt („Wohlfühloase", „Pool-Paradies") wärmenden, edlen
  Klang, ohne marktschreierisch zu sein. Nur für große Überschriften.
- **Body / UI:** `Manrope` (variable Sans) - klare, humanistische Sans, exzellente
  Lesbarkeit für deutschen Fließtext, sehr 2026.
- Beide via `@fontsource-variable`, **nur latin-Subset**.
- CLS-Schutz: `font-display: optional` für die Display-Schrift (Headline = LCP),
  damit kein Reflow (vgl. frühere CLS-Erfahrung Fontsource `swap`).

## VOICE (verbindlich)

Bodenständig, handwerklich, einladend. **Sie-Form.** „Seit 1994" trägt ruhiges
Selbstbewusstsein - kein Marktschreier. Echte, belegte Töne dürfen verbatim rein:
„Ihr Partner für maßgeschneiderte Swimmingpools", „Traum vom eigenen Swimmingpool",
„von der Planung über den Bau bis hin zur Wartung", „verwandeln Gärten in traumhafte
Wohlfühloasen".

Verboten: Broschüren-Deutsch („Ihr kompetenter Partner rund um…", „Premium
Excellence"), Schablonen-Headlines („Drei Bereiche - ein…", „Vier Gründe…", „So
einfach geht's"), erfundene Zahlen/Reviews/Leistungen.

Test: „Würde Marcel Diebert das einem Kunden im Garten so sagen?"

## Brand-Charakter

seit 1994 · maßgeschneiderter Poolbau · Bestensee OT Pätz, Brandenburg / Berlin ·
inhabergeführt (Marcel Diebert) · bild-getrieben · echte Projektfotos sind das Herz.

## Bild-Strategie

29 echte Projektfotos (WhatsApp-Export, beim alten WP-Import waren die Dateinamen
verstümmelt - per Content-Hash dedupliziert, sauber umbenannt, als WebP optimiert).
3 Galerien: **Projekte** (12, fertige Pools - das Herz), **Abdeckungen** (9, Roll-/
Lamellen-/Thermo-Abdeckungen + Überdachungen, inkl. grün beleuchteter Nacht-Aufnahme),
**Bauphase** (8, echte Aushub-/Bau-Dokumentation - Vertrauen durch echte Arbeit).
Hero: hellstes „Traum-Pool"-Foto. Layout der Galerien: ruhiges Masonry, großzügig.

## Bewegung

Dezent: sanftes Einblenden beim Scrollen (prefers-reduced-motion respektiert),
sanfte Hover. Keine Counter, kein Auto-Slider, keine lauten Effekte.

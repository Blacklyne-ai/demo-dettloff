# Judgement Calls & Operator-TODOs — Schwimmbadtechnik Dettloff

Entscheidungen, die beim Bau getroffen wurden, und offene Punkte, die **mit dem
Kunden** zu klären sind. Es wurde **nichts erfunden** (keine Projektzahlen, Reviews,
Leistungen ohne Beleg).

## Offene Punkte für den Kunden (Operator-TODOs)

1. **Vollständige Leistungsliste.** Belegt sind: maßgeschneiderter Poolbau (Planung,
   Bau, Wartung) und Pool-Abdeckungen (Rolladen, Thermoplane, Lamellen). Die Fotos
   zeigen zusätzlich **Pool-Überdachungen/Enclosures** (Teleskop-Überdachungen) - als
   sichtbare Leistung aufgenommen, weil bildlich klar belegt. Offen: Sanierung,
   Technik/Filteranlagen, Zubehör? (Die alte Firmen-Lkw-Beschriftung nennt
   „Schwimmbecken · Überdachungen · Filteranlagen · Zubehör" - mit Kunde bestätigen,
   bevor als Leistung ausformuliert.)
2. **Öffnungs-/Erreichbarkeitszeiten** fehlen auf der alten Seite. Platzhalter:
   **„Beratung nach Vereinbarung"**. Echte Zeiten nachreichen → dann ggf. Live-
   Geöffnet-Status aktivierbar.
3. **Rechtsform / vollständiges Impressum.** Aktuell nur „Marcel Diebert,
   Fernstraße 16, 15741 Bestensee OT Pätz". Offen: Rechtsform (e. K.? GbR?),
   USt-IdNr., ggf. Handelsregister, Verantwortlicher i. S. d. § 18 MStV.
   Impressum-Seite enthält genau die belegten Daten + markierte Lücken.
4. **Echte Social-Media-URLs.** Die alte Seite verlinkt Facebook/Instagram **auf die
   eigene Domain** (kaputt). Darum **bewusst weggelassen**, statt auf Dummy zu linken.
   Echte Profil-URLs vom Kunden holen → dann in Footer/Kontakt ergänzen.
5. **Google-Bewertungen.** Keine verifizierte Google-Place-ID / kein öffentliches
   Review-Profil auffindbar (siehe unten). Darum **keine** Reviews/Sterne dargestellt
   (nichts erfunden). Wenn Profil existiert: Place-ID nachreichen → echte Reviews +
   Maps-Embed mit Pin.
6. **Verhältnis „Schwimmbadtechnik Dettloff" ↔ „Marcel Diebert".** Inhaber/Nachfolge?
   Aktuell als inhabergeführt mit Ansprechpartner Marcel Diebert dargestellt
   (so von der alten Seite belegt). Genaue Beziehung mit Kunde klären.
7. **Telefonnummer-Format.** Briefing/Impressum: `03376 362075`. Verwendet:
   Anzeige „03376 362075", Link `tel:+493376362075`. Bei Abweichung korrigieren.

## Bewusste Bau-Entscheidungen

- **Kein Kontaktformular.** Statische Seite ohne Backend (Tech-Vorgabe: NO SSR) →
  ein Formular hätte kein Ziel. Stattdessen Kontakt-Tiles **Telefon · E-Mail ·
  WhatsApp** + Maps (etablierte, funktionierende Lösung). „Beratung anfragen" führt
  zu diesen direkten Kanälen.
- **WhatsApp-Nummer = Festnetz-/Briefing-Nummer.** `wa.me/493376362075` als
  Annahme verlinkt. **TODO:** echte WhatsApp-Business-Nummer bestätigen (oft mobil);
  falls keine WhatsApp existiert, Tile entfernen.
- **Hero-Foto.** Hellstes echtes „Traum-Pool"-Foto (Türkis, Garten) statt der
  generischen Wasser-Kachel-Textur der alten Seite. Max. echte Bildauflösung der
  Originale ~1170 px → bild-schonende, ruhige Komposition statt hartes Full-Bleed-
  Upscaling.
- **Rote Markenfarbe bewusst sparsam** (siehe STYLE-GUIDE.md „Rot-Regel").
- **Logo auf dunklem Footer** auf weißem Chip platziert (Logo hat helle Bildteile/
  Transparenz) - Logo wird **nie** umgefärbt/redesignt.
- **Doppelte/verstümmelte Bilddateien** (kaputter WP-Import) per md5 dedupliziert;
  ein Foto war in zwei Galerien - einmalig verwendet.

## Google Place-ID Recherche

Kein verifiziertes öffentliches **Google**-Business-Profil mit Reviews auffindbar.
Maps-Embed zeigt die **Adresse** (Fernstraße 16, 15741 Bestensee OT Pätz), nicht
zwingend einen verifizierten Business-Pin. Place-ID = Operator-TODO.

## Phase-0 Recherche-Funde (Das Örtliche / Branchenbücher) — zu bestätigen

Aus Drittquellen (Das Örtliche, branchen-info, unternehmensauskunft) - **nicht** auf
der offiziellen Seite belegt, daher **nicht** ungeprüft live gestellt, sondern hier
zur Bestätigung notiert:

- **Öffnungszeiten:** Das Örtliche listet **Mo–Fr 14:00–18:00 Uhr**. Auf der Seite
  steht weiterhin das sichere „Beratung nach Vereinbarung". → Mit Kunde bestätigen,
  dann echte Zeiten einsetzen (ermöglicht Live-Geöffnet-Status).
- **Gründer/Nachfolge:** An gleicher Adresse existiert „**Jürgen Dettloff**
  Schwimmbadtechnik". Plausibel: Jürgen Dettloff = Gründer/Namensgeber (seit 1994),
  **Marcel Diebert** = heutiger Inhaber/Nachfolger. → bestätigen (klärt TODO #6).
  Nicht auf der Seite behauptet.
- **Erweiterte Leistungen** (Firmen-Lkw-Beschriftung + Branchenbücher):
  Schwimmbecken, **Überdachungen**, Filteranlagen, Wärmepumpen, Solar, Zubehör,
  Pool-Service/Wartung. „Überdachungen" ist zusätzlich durch die Enclosure-Fotos
  bildlich belegt und daher als Leistung aufgenommen; der Rest bleibt TODO #1.
- **Bewertungen:** Das Örtliche zeigt 3,5/5 aus nur **3** Bewertungen - kein Google,
  zu wenig/zu schwach → **bewusst nicht dargestellt** (nichts beschönigt/erfunden).

Quellen: dasoertliche.de, branchen-info.net, unternehmensauskunft.com.

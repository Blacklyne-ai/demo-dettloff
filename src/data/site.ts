// ─────────────────────────────────────────────────────────────
// Single Source of Truth — Geschäftsdaten Schwimmbadtechnik Dettloff.
// Alle Daten VERBATIM aus dem Briefing / der alten Seite. Nichts erfunden.
// Offene Punkte siehe docs/JUDGEMENT_CALLS.md.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Schwimmbadtechnik Dettloff',
  claim: 'Qualität seit 1994',
  founded: 1994,
  owner: 'Marcel Diebert',
  // Inhaber/Nachfolge: Marcel Diebert (siehe JUDGEMENT_CALLS.md)

  phone: { display: '03376 362075', tel: '+493376362075' },
  fax: { display: '03376 362058' },
  // TODO (JUDGEMENT_CALLS): echte WhatsApp-Business-Nummer bestätigen
  whatsapp: '493376362075',
  email: 'info@schwimmbadtechnik-dettloff.de',

  address: {
    line: 'Fernstraße 16',
    zip: '15741',
    city: 'Bestensee',
    district: 'OT Pätz',
    region: 'Brandenburg',
    country: 'DE',
  },
  // Öffnungszeiten auf alter Seite nicht offiziell → sicheres Statement.
  // (Das Örtliche nennt Mo–Fr 14–18 Uhr → mit Kunde bestätigen, JUDGEMENT_CALLS.)
  availability: 'Beratung nach Vereinbarung',

  region: 'Berlin · Brandenburg',
  seatShort: 'Bestensee OT Pätz, am Pätzer See',

  url: 'https://demo-dettloff.pages.dev',
} as const;

export const mapsQuery = encodeURIComponent(
  `${site.name}, ${site.address.line}, ${site.address.zip} ${site.address.city}`
);

export const nav = [
  { label: 'Start', href: '/' },
  { label: 'Pools', href: '/pools' },
  { label: 'Pool-Abdeckungen', href: '/pool-abdeckungen' },
  { label: 'Projekte', href: '/projekte' },
  { label: 'Bauphase', href: '/bauphase' },
  { label: 'Kontakt', href: '/kontakt' },
] as const;

export const legalNav = [
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
] as const;

// Belegte Kern-Leistungen (2 Pfeiler, symmetrisch). Sätze aus dem Scrape.
export const services = [
  {
    slug: 'pools',
    icon: 'WavesLadder',
    title: 'Poolbau',
    tagline: 'Planung · Bau · Wartung',
    blurb:
      'Von der Planung über den Bau bis hin zur Wartung – maßgeschneiderte Swimmingpools, abgestimmt auf Ihren Garten und Ihre Wünsche.',
    href: '/pools',
  },
  {
    slug: 'pool-abdeckungen',
    icon: 'ShieldCheck',
    title: 'Pool-Abdeckungen & Überdachungen',
    tagline: 'Rolladen · Thermoplane · Lamellen',
    blurb:
      'Schutz vor Schmutz, Wärmeverlust und Verdunstung – mehr Sicherheit, weniger Pflege, geringere Energiekosten.',
    href: '/pool-abdeckungen',
  },
] as const;

// VERBATIM-Texte der alten Seite (zentral, damit Seiten konsistent zitieren).
export const copy = {
  welcomeTitle: 'Willkommen bei Schwimmbadtechnik Dettloff',
  welcomeLead: 'Ihr Partner für maßgeschneiderte Swimmingpools seit 1994',
  welcomeBody:
    'Bei Schwimmbadtechnik Dettloff verwirklichen wir seit 1994 den Traum vom eigenen Swimmingpool. Mit langjähriger Erfahrung und einem Team aus Experten bieten wir Ihnen alles, was Sie für Ihren perfekten Pool benötigen – von der Planung über den Bau bis hin zur Wartung.',
  abdeckungen:
    'Eine hochwertige Pool-Abdeckung ist essenziell für den Schutz Ihres Pools vor Schmutz, Wärmeverlust und Verdunstung. Sie erhöht die Sicherheit, reduziert den Pflegeaufwand und senkt Energiekosten. Ob robuste Rolladenabdeckungen, isolierende Thermoplane oder stilvolle Lamellenabdeckungen.',
  projekte:
    'Lassen Sie sich von unseren realisierten Pool-Projekten begeistern! Hochwertige Materialien, durchdachte Designs und maßgeschneiderte Lösungen – jedes Projekt ist einzigartig und perfekt auf die Wünsche unserer Kunden abgestimmt. Ob stilvolle Überdachungen, energieeffiziente Pool-Abdeckungen oder luxuriöse Pool-Landschaften – entdecken Sie unsere Referenzen und holen Sie sich Inspiration für Ihr eigenes Pool-Paradies!',
  bauphase:
    'Erleben Sie, wie aus einer Idee ein echtes Pool-Paradies entsteht! In unserer Fotogalerie zeigen wir Ihnen exklusive Einblicke in laufende Bauprojekte – von der ersten Planung bis zur finalen Umsetzung. Schritt für Schritt begleiten wir den Bauprozess, setzen höchste Qualitätsstandards um und verwandeln Gärten in traumhafte Wohlfühloasen.',
} as const;

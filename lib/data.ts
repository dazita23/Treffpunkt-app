// ─────────────────────────────────────────────────────────────
// DATEN für den Prototyp (Stufe 1)
// EVENTS: echte Events in Köln/Bonn (recherchiert am 10.10.2026 auf den
// Seiten der Veranstalter – vor dem Test bitte kurz prüfen, ob sich etwas geändert hat).
// Ein neues Event = einen Block in EVENTS kopieren und anpassen.
// Vergangene Events blendet die App automatisch aus.
// Profile, Teilnahmen und Gruppen sind SIMULIERT (keine echten Personen).
// In Stufe 2 kommen diese Daten aus der Datenbank (Supabase).
// ─────────────────────────────────────────────────────────────

export const INTERESTS = [
  "Konzerte",
  "Party",
  "Techno",
  "Indie",
  "Hip-Hop",
  "Kunst",
  "Theater",
  "Comedy",
  "Film",
  "Sport",
  "Laufen",
  "Outdoor",
  "Food",
  "Gaming",
  "Festivals",
  "Networking",
] as const;

export const CATEGORIES = [
  "Konzert",
  "Party",
  "Kultur",
  "Comedy",
  "Sport",
  "Food",
  "Outdoor",
] as const;

export type Category = (typeof CATEGORIES)[number];

type EventInput = {
  id: string;
  title: string;
  category: Category;
  date: string; // Format JJJJ-MM-TT, z. B. "2026-10-18"
  time: string; // "20:00" oder ein Text wie "ganztags"
  venue: string;
  city: "Köln" | "Bonn";
  address: string;
  price: string;
  description: string;
  ticketUrl: string;
  tags: string[]; // passende Interessen (siehe INTERESTS)
};

export type EventItem = EventInput & { dayOffset: number }; // dayOffset = Tage ab heute (0 = heute)

const EVENT_LIST: EventInput[] = [
  // ───── Konzerte ─────
  {
    id: "james-blake",
    title: "James Blake – Trying Times Tour",
    category: "Konzert",
    date: "2026-10-18",
    time: "20:00",
    venue: "E-Werk",
    city: "Köln",
    address: "Schanzenstraße 37, Köln-Mülheim",
    price: "siehe Ticketseite",
    description: "Der britische Sänger und Produzent live im E-Werk – elektronischer Soul zwischen Club und Ballade.",
    ticketUrl: "https://www.ticketmaster.de/event/james-blake-trying-times-tour-tickets/1448464285",
    tags: ["Konzerte", "Indie", "Techno"],
  },
  {
    id: "bausa",
    title: "Bausa – Tournado 2026",
    category: "Konzert",
    date: "2026-10-17",
    time: "19:50",
    venue: "Palladium",
    city: "Köln",
    address: "Schanzenstraße 40, Köln-Mülheim",
    price: "siehe Ticketseite",
    description: "Der Rapper und Sänger mit seiner Tour 2026 im Palladium.",
    ticketUrl: "https://www.koelnticket.de/event/bausa-tournado-2026-palladium-koeln-20964292/",
    tags: ["Konzerte", "Hip-Hop"],
  },
  {
    id: "the-hu",
    title: "The HU",
    category: "Konzert",
    date: "2026-10-22",
    time: "20:00",
    venue: "Palladium",
    city: "Köln",
    address: "Schanzenstraße 40, Köln-Mülheim",
    price: "siehe Ticketseite",
    description: "Mongolischer Folk-Metal mit Kehlgesang und traditionellen Instrumenten. Support: Skald.",
    ticketUrl: "https://www.koelnticket.de/artist/the-hu/",
    tags: ["Konzerte"],
  },
  {
    id: "four-imaginary-boys",
    title: "Four Imaginary Boys – A Tribute to The Cure",
    category: "Konzert",
    date: "2026-10-17",
    time: "20:00",
    venue: "Harmonie",
    city: "Bonn",
    address: "Frongasse 28–30, Bonn-Endenich",
    price: "28 €",
    description: "Tribute-Konzert mit den Wave-Klassikern von The Cure.",
    ticketUrl: "https://www.harmonie-bonn.de/veranstaltung/four-imaginary-boys-a-tribute-to-the-cure/",
    tags: ["Konzerte", "Indie"],
  },
  {
    id: "emil-brandqvist-trio",
    title: "Emil Brandqvist Trio – Poems for Travellers",
    category: "Konzert",
    date: "2026-11-11",
    time: "20:00",
    venue: "Harmonie",
    city: "Bonn",
    address: "Frongasse 28–30, Bonn-Endenich",
    price: "36 €",
    description: "Skandinavischer Piano-Jazz – ruhig, melodisch und atmosphärisch.",
    ticketUrl: "https://www.harmonie-bonn.de/veranstaltung/emil-brandqvist-trio-poems-for-travellers/",
    tags: ["Konzerte"],
  },
  {
    id: "kunstrasenverein-indie",
    title: "Easy Easy + Soda Frizzante + Nilsonsoma",
    category: "Konzert",
    date: "2026-11-12",
    time: "18:45",
    venue: "Harmonie",
    city: "Bonn",
    address: "Frongasse 28–30, Bonn-Endenich",
    price: "22 €",
    description: "Kunst!Rasenverein präsentiert drei Bands aus Indie und DIY-Punk an einem Abend.",
    ticketUrl: "https://www.harmonie-bonn.de/veranstaltung/kunstrasenverein-praesentiert-easy-easy-soda-frizzante-nilsonsoma/",
    tags: ["Konzerte", "Indie"],
  },
  {
    id: "hermanos-gutierrez",
    title: "Hermanos Gutiérrez – Los Ojos del Condor Tour",
    category: "Konzert",
    date: "2026-11-20",
    time: "20:00",
    venue: "Palladium",
    city: "Köln",
    address: "Schanzenstraße 40, Köln-Mülheim",
    price: "siehe Ticketseite",
    description: "Das Brüder-Duo spielt instrumentale Gitarrenmusik zwischen Wüsten-Western und Latin.",
    ticketUrl: "https://www.koelnticket.de/event/hermanos-gutierrez-los-ojos-del-condor-tour-palladium-koeln-21217139/",
    tags: ["Konzerte", "Indie"],
  },

  // ───── Party ─────
  {
    id: "halloween-harmonie",
    title: "Halloween in der Harmonie mit DJ H2O-Lee",
    category: "Party",
    date: "2026-10-31",
    time: "20:00",
    venue: "Harmonie",
    city: "Bonn",
    address: "Frongasse 28–30, Bonn-Endenich",
    price: "15 €",
    description: "Halloween-Party mit DJ. Kostüm ist kein Muss, macht aber mehr Spaß – vor allem in der Gruppe.",
    ticketUrl: "https://www.harmonie-bonn.de/veranstaltung/halloween-in-der-harmonie-mit-dj-h2o-lee-3/",
    tags: ["Party"],
  },
  {
    id: "bingo-comedia",
    title: "Bingo & Music Bingo",
    category: "Party",
    date: "2026-11-19",
    time: "19:00",
    venue: "COMEDIA Theater (Halle)",
    city: "Köln",
    address: "Vondelstraße 4–8, Köln-Südstadt",
    price: "Eintritt frei",
    description: "Bingo-Abend mit Musik-Runde. Eintritt frei – ideal, um mit neuen Leuten an einem Tisch zu sitzen.",
    ticketUrl: "https://comedia-koeln.de/buehne/termine/",
    tags: ["Party", "Gaming"],
  },

  // ───── Comedy ─────
  {
    id: "510-night-slam",
    title: "510 Night Slam",
    category: "Comedy",
    date: "2026-10-16",
    time: "21:00",
    venue: "COMEDIA Theater (Halle/Garten)",
    city: "Köln",
    address: "Vondelstraße 4–8, Köln-Südstadt",
    price: "Eintritt frei",
    description: "Poetry Slam am späten Freitagabend – kostenlos und locker.",
    ticketUrl: "https://comedia-koeln.de/buehne/termine/",
    tags: ["Comedy", "Theater"],
  },
  {
    id: "eva-karl-faltermeier",
    title: "Eva Karl Faltermeier: Ding Dong",
    category: "Comedy",
    date: "2026-11-05",
    time: "20:00",
    venue: "COMEDIA Theater (Roter Saal)",
    city: "Köln",
    address: "Vondelstraße 4–8, Köln-Südstadt",
    price: "siehe Ticketseite",
    description: "Stand-up während des Cologne Comedy Festivals (20.10.–08.11.2026).",
    ticketUrl: "https://comedia-koeln.de/buehne/termine/",
    tags: ["Comedy"],
  },
  {
    id: "nightwash-live",
    title: "NightWash Live – Tour 2026",
    category: "Comedy",
    date: "2026-11-06",
    time: "20:00",
    venue: "E-Werk",
    city: "Köln",
    address: "Schanzenstraße 37, Köln-Mülheim",
    price: "siehe Ticketseite",
    description: "Die bekannte Stand-up-Show mit mehreren Comedians an einem Abend.",
    ticketUrl: "https://www.koelnticket.de/event/nightwash-live-tour-2026-e-werk-koeln-21036910/",
    tags: ["Comedy"],
  },
  {
    id: "impro-werwoelfe",
    title: "Impro Köln: Werwölfe",
    category: "Comedy",
    date: "2026-11-14",
    time: "19:30",
    venue: "COMEDIA Theater (Roter Saal)",
    city: "Köln",
    address: "Vondelstraße 4–8, Köln-Südstadt",
    price: "siehe Ticketseite",
    description: "Improtheater rund um das Spiel „Werwölfe“ – jede Vorstellung ist anders.",
    ticketUrl: "https://comedia-koeln.de/buehne/termine/",
    tags: ["Comedy", "Theater", "Gaming"],
  },

  // ───── Kultur ─────
  {
    id: "live-podcast-dabei",
    title: "Da muss man dabei gewesen sein – Live-Podcast",
    category: "Kultur",
    date: "2026-10-25",
    time: "19:00",
    venue: "COMEDIA Theater (Roter Saal)",
    city: "Köln",
    address: "Vondelstraße 4–8, Köln-Südstadt",
    price: "siehe Ticketseite",
    description: "Ein Podcast live auf der Bühne (Tour 2026).",
    ticketUrl: "https://comedia-koeln.de/buehne/termine/",
    tags: ["Comedy", "Networking"],
  },
  {
    id: "videodays-2026",
    title: "VideoDays Festival 2026",
    category: "Kultur",
    date: "2026-10-29",
    time: "10:00",
    venue: "Palladium",
    city: "Köln",
    address: "Schanzenstraße 40, Köln-Mülheim",
    price: "siehe Ticketseite",
    description: "Festival rund um Creator und Social Media, 10–18 Uhr. Abends folgt die Award-Gala im E-Werk.",
    ticketUrl: "https://videodays-festival.com/#tickets",
    tags: ["Networking", "Film", "Festivals"],
  },
  {
    id: "koelner-museumsnacht",
    title: "Kölner Museumsnacht 2026",
    category: "Kultur",
    date: "2026-11-07",
    time: "18:00",
    venue: "Museen in ganz Köln",
    city: "Köln",
    address: "Köln",
    price: "siehe Ticketseite",
    description: "Von 18 bis 1 Uhr haben zahlreiche Kölner Museen geöffnet. Das Ticket gilt auch für Bus und Bahn im VRS.",
    ticketUrl: "https://koelner-museumsnacht.de/",
    tags: ["Kunst"],
  },

  // ───── Sport ─────
  {
    id: "haie-bremerhaven",
    title: "Kölner Haie – Pinguins Bremerhaven",
    category: "Sport",
    date: "2026-10-18",
    time: "16:30",
    venue: "LANXESS arena",
    city: "Köln",
    address: "Willy-Brandt-Platz 3, Köln-Deutz",
    price: "siehe Ticketseite",
    description: "Eishockey in der DEL – Heimspiel der Kölner Haie.",
    ticketUrl: "https://www.haie.de/saison/spielplan/",
    tags: ["Sport"],
  },
  {
    id: "haie-mannheim",
    title: "Kölner Haie – Adler Mannheim",
    category: "Sport",
    date: "2026-10-27",
    time: "19:30",
    venue: "LANXESS arena",
    city: "Köln",
    address: "Willy-Brandt-Platz 3, Köln-Deutz",
    price: "siehe Ticketseite",
    description: "Eishockey-Klassiker in der DEL – Heimspiel der Kölner Haie gegen Mannheim.",
    ticketUrl: "https://www.haie.de/saison/spielplan/",
    tags: ["Sport"],
  },

  // ───── Food ─────
  {
    id: "koefte-karaoke",
    title: "Köfte & Karaoke (Premiere)",
    category: "Food",
    date: "2026-11-14",
    time: "20:00",
    venue: "COMEDIA Theater (Halle)",
    city: "Köln",
    address: "Vondelstraße 4–8, Köln-Südstadt",
    price: "siehe Ticketseite",
    description: "Late-Night-Koch- und Unterhaltungsshow mit Karaoke.",
    ticketUrl: "https://comedia-koeln.de/buehne/termine/",
    tags: ["Food", "Party"],
  },
  {
    id: "hafen-weihnachtsmarkt",
    title: "Hafen-Weihnachtsmarkt: Eröffnung",
    category: "Food",
    date: "2026-11-13",
    time: "ganztags",
    venue: "Rheinauhafen",
    city: "Köln",
    address: "Köln-Altstadt-Süd",
    price: "Eintritt frei",
    description: "Weihnachtsmarkt am Rhein, geöffnet bis 03.01.2027. Öffnungszeiten auf der Website.",
    ticketUrl: "https://www.koeln.de/weihnachten/weihnachtsmaerkte-koeln/",
    tags: ["Food", "Outdoor"],
  },

  // ───── Outdoor ─────
  {
    id: "weihnachtsmarkt-dom",
    title: "Weihnachtsmarkt am Kölner Dom: Eröffnung",
    category: "Outdoor",
    date: "2026-11-16",
    time: "ganztags",
    venue: "Roncalliplatz",
    city: "Köln",
    address: "Köln-Innenstadt, direkt am Dom",
    price: "Eintritt frei",
    description: "Der bekannteste Weihnachtsmarkt Kölns direkt am Dom, geöffnet bis 23.12.2026.",
    ticketUrl: "https://www.koelnerweihnachtsmarkt.com/de/",
    tags: ["Outdoor", "Food"],
  },
  {
    id: "bonner-weihnachtsmarkt",
    title: "Bonner Weihnachtsmarkt: Eröffnung",
    category: "Outdoor",
    date: "2026-11-18",
    time: "ganztags",
    venue: "Münsterplatz",
    city: "Bonn",
    address: "Bonn-Zentrum",
    price: "Eintritt frei",
    description: "Weihnachtsmarkt in der Bonner Innenstadt, geöffnet bis 23.12.2026.",
    ticketUrl: "https://bonnerweihnachtsmarkt.de/",
    tags: ["Outdoor", "Food"],
  },
];

function daysFromToday(date: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(date + "T00:00:00");
  return Math.round((d.getTime() - today.getTime()) / 86_400_000);
}

// Nur Events ab heute anzeigen
export const EVENTS: EventItem[] = EVENT_LIST.map((e) => ({ ...e, dayOffset: daysFromToday(e.date) })).filter(
  (e) => e.dayOffset >= 0,
);

// Simulierte Beispielprofile – keine echten Personen.
export type Person = {
  id: string;
  name: string;
  age: number;
  city: "Köln" | "Bonn";
  interests: string[];
  bio: string;
};

export const PEOPLE: Person[] = [
  { id: "p1", name: "Lena", age: 23, city: "Köln", interests: ["Konzerte", "Indie", "Festivals", "Food"], bio: "Studiere Medien, immer auf der Suche nach neuen Bands." },
  { id: "p2", name: "Jonas", age: 26, city: "Köln", interests: ["Techno", "Party", "Festivals"], bio: "Neu in Köln und suche Leute für die Clubszene." },
  { id: "p3", name: "Aylin", age: 21, city: "Bonn", interests: ["Kunst", "Theater", "Film"], bio: "Kunstgeschichte im 3. Semester." },
  { id: "p4", name: "Mats", age: 24, city: "Bonn", interests: ["Sport", "Laufen", "Outdoor"], bio: "Laufe jeden Sonntag – gerne in Gesellschaft." },
  { id: "p5", name: "Sofia", age: 22, city: "Köln", interests: ["Comedy", "Food", "Film"], bio: "Lache gern laut und esse gern gut." },
  { id: "p6", name: "Emre", age: 27, city: "Köln", interests: ["Hip-Hop", "Party", "Gaming"], bio: "Tagsüber Entwickler, abends auf Konzerten." },
  { id: "p7", name: "Clara", age: 25, city: "Bonn", interests: ["Konzerte", "Kunst", "Food"], bio: "Gerade nach Bonn gezogen und offen für alles." },
  { id: "p8", name: "Noah", age: 20, city: "Köln", interests: ["Gaming", "Film", "Comedy"], bio: "Erstsemester Informatik." },
  { id: "p9", name: "Mira", age: 28, city: "Köln", interests: ["Networking", "Kunst", "Konzerte"], bio: "Arbeite im Marketing, liebe kleine Konzerte." },
  { id: "p10", name: "Luca", age: 23, city: "Bonn", interests: ["Outdoor", "Sport", "Food"], bio: "Wandern, Kochen, wiederholen." },
  { id: "p11", name: "Hannah", age: 24, city: "Köln", interests: ["Indie", "Konzerte", "Theater"], bio: "Meine Freunde mögen kein Indie – du vielleicht?" },
  { id: "p12", name: "Yusuf", age: 26, city: "Bonn", interests: ["Comedy", "Theater", "Networking"], bio: "Impro-Fan und Hobby-Slammer." },
  { id: "p13", name: "Marie", age: 22, city: "Köln", interests: ["Techno", "Party", "Kunst"], bio: "Am liebsten auf Warehouse-Partys." },
  { id: "p14", name: "Tim", age: 29, city: "Köln", interests: ["Sport", "Food", "Festivals"], bio: "Fußball, Streetfood und Sommerfestivals." },
  { id: "p15", name: "Nele", age: 21, city: "Bonn", interests: ["Laufen", "Outdoor", "Kunst"], bio: "Joggen am Rhein und Museen am Wochenende." },
  { id: "p16", name: "David", age: 25, city: "Köln", interests: ["Hip-Hop", "Konzerte", "Gaming"], bio: "Sammle Vinyl und Konzerttickets." },
];

// Wer geht (simuliert) zu welchem Event?
export const ATTENDANCE: Record<string, string[]> = {
  "james-blake": ["p1", "p2", "p11", "p16"],
  bausa: ["p6", "p16", "p8"],
  "the-hu": ["p14", "p6"],
  "four-imaginary-boys": ["p11", "p7", "p3"],
  "emil-brandqvist-trio": ["p7", "p9"],
  "kunstrasenverein-indie": ["p1", "p11", "p15"],
  "hermanos-gutierrez": ["p1", "p9", "p14", "p7", "p16"],
  "halloween-harmonie": ["p13", "p2", "p15", "p10"],
  "bingo-comedia": ["p8", "p5", "p12"],
  "510-night-slam": ["p12", "p11", "p5", "p3"],
  "eva-karl-faltermeier": ["p5", "p12"],
  "nightwash-live": ["p5", "p8", "p14"],
  "impro-werwoelfe": ["p12", "p8", "p3"],
  "live-podcast-dabei": ["p5", "p9"],
  "videodays-2026": ["p9", "p8", "p6"],
  "koelner-museumsnacht": ["p3", "p7", "p15", "p9", "p13"],
  "haie-bremerhaven": ["p14", "p4"],
  "haie-mannheim": ["p14", "p4", "p10"],
  "koefte-karaoke": ["p5", "p10", "p6"],
  "hafen-weihnachtsmarkt": ["p10", "p7", "p1"],
  "weihnachtsmarkt-dom": ["p14", "p5", "p1", "p13"],
  "bonner-weihnachtsmarkt": ["p15", "p4", "p7"],
};

export type Message = { id: string; authorId: string; text: string; at: number };
export type Group = { id: string; eventId: string; name: string; memberIds: string[]; messages: Message[] };

const m = (id: string, authorId: string, text: string, minutesAgo: number): Message => ({
  id,
  authorId,
  text,
  at: Date.now() - minutesAgo * 60_000,
});

// Bereits bestehende Event-Gruppen (simuliert)
export const SEED_GROUPS: Group[] = [
  {
    id: "g-blake",
    eventId: "james-blake",
    name: "Vorher Pizza in Mülheim? 🍕",
    memberIds: ["p1", "p11", "p16"],
    messages: [
      m("m1", "p1", "Hey! Wer hat Lust, vorher noch was essen zu gehen?", 180),
      m("m2", "p11", "Ich! 18:30 in der Nähe vom E-Werk?", 170),
      m("m3", "p16", "Bin dabei, komme direkt von der Arbeit 🙌", 120),
    ],
  },
  {
    id: "g-slam",
    eventId: "510-night-slam",
    name: "Slam & danach ein Kölsch",
    memberIds: ["p5", "p12", "p3"],
    messages: [
      m("m4", "p12", "Treffen wir uns um 20:45 am Eingang?", 300),
      m("m5", "p5", "Passt mir! Eintritt ist ja frei 🎤", 280),
    ],
  },
  {
    id: "g-museum",
    eventId: "koelner-museumsnacht",
    name: "Museumsnacht-Tour 🖼️",
    memberIds: ["p15", "p7"],
    messages: [m("m6", "p15", "Wir wollen mit dem Museum Ludwig starten – wer kommt mit?", 600)],
  },
  {
    id: "g-halloween",
    eventId: "halloween-harmonie",
    name: "Halloween-Crew 🎃",
    memberIds: ["p2", "p13"],
    messages: [m("m7", "p13", "Kostüm-Idee: alle als Geister? 👻", 90)],
  },
];

export const CANNED_REPLIES = [
  "Klingt gut! 😊",
  "Bin dabei!",
  "Super, freu mich drauf!",
  "Wo genau treffen wir uns?",
  "Perfekt, bis dann!",
];

export const REPORT_REASONS = [
  "Unangemessene Inhalte",
  "Belästigung oder Beleidigung",
  "Fake-Profil oder Spam",
  "Person ist minderjährig",
  "Sonstiges",
];

// ─────────────────────────────────────────────────────────────
// BEISPIELDATEN für den Prototyp (Stufe 1)
// Hier tragt ihr später die ~20 echten Events aus Köln/Bonn ein.
// Ein Event = ein Block in der Liste EVENTS. Einfach kopieren und anpassen.
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

export type EventItem = {
  id: string;
  title: string;
  category: Category;
  dayOffset: number; // Tage ab heute (0 = heute) – so bleiben die Beispiel-Events immer aktuell
  time: string;
  venue: string;
  city: "Köln" | "Bonn";
  address: string;
  price: string;
  description: string;
  ticketUrl: string;
  tags: string[]; // passende Interessen
};

export const EVENTS: EventItem[] = [
  {
    id: "indie-nacht",
    title: "Indie-Nacht: Newcomer Live",
    category: "Konzert",
    dayOffset: 1,
    time: "20:00",
    venue: "Club Ehrenfeld",
    city: "Köln",
    address: "Venloer Straße, Köln-Ehrenfeld",
    price: "ab 14 €",
    description:
      "Drei Newcomer-Bands aus NRW an einem Abend. Ideal, um neue Musik und neue Leute zu entdecken.",
    ticketUrl: "https://www.eventim.de/",
    tags: ["Konzerte", "Indie"],
  },
  {
    id: "techno-rooftop",
    title: "Rooftop Techno Session",
    category: "Party",
    dayOffset: 2,
    time: "22:00",
    venue: "Dachterrasse am Rhein",
    city: "Köln",
    address: "Rheinauhafen, Köln",
    price: "ab 18 €",
    description: "Elektronische Musik mit Blick auf den Rhein. Einlass ab 18 Jahren.",
    ticketUrl: "https://www.eventim.de/",
    tags: ["Party", "Techno"],
  },
  {
    id: "comedy-open-mic",
    title: "Comedy Open Mic",
    category: "Comedy",
    dayOffset: 3,
    time: "19:30",
    venue: "Kleinkunstbühne Südstadt",
    city: "Köln",
    address: "Severinsviertel, Köln",
    price: "8 €",
    description: "Neue Stand-up-Talente testen ihr Material. Kurz, lustig und günstig.",
    ticketUrl: "https://www.koelnticket.de/",
    tags: ["Comedy"],
  },
  {
    id: "rheinaue-lauf",
    title: "Sonntagslauf in der Rheinaue",
    category: "Sport",
    dayOffset: 4,
    time: "10:00",
    venue: "Rheinauenpark",
    city: "Bonn",
    address: "Rheinaue, Bonn",
    price: "kostenlos",
    description: "Lockere 5 km in der Gruppe, danach Kaffee. Jedes Tempo ist willkommen.",
    ticketUrl: "https://www.bonn.de/",
    tags: ["Sport", "Laufen", "Outdoor"],
  },
  {
    id: "streetfood-markt",
    title: "Street-Food-Markt",
    category: "Food",
    dayOffset: 2,
    time: "12:00",
    venue: "Marktplatz Ehrenfeld",
    city: "Köln",
    address: "Neptunplatz, Köln-Ehrenfeld",
    price: "Eintritt frei",
    description: "Über 20 Food-Trucks aus aller Welt, Musik und lange Tische zum Zusammensitzen.",
    ticketUrl: "https://www.koeln.de/",
    tags: ["Food"],
  },
  {
    id: "kunstnacht",
    title: "Lange Nacht der Ateliers",
    category: "Kultur",
    dayOffset: 5,
    time: "18:00",
    venue: "Atelierhaus Altstadt",
    city: "Bonn",
    address: "Altstadt, Bonn",
    price: "6 €",
    description: "Offene Ateliers, Live-Painting und Gespräche mit jungen Künstler:innen.",
    ticketUrl: "https://www.bonnticket.de/",
    tags: ["Kunst"],
  },
  {
    id: "hiphop-jam",
    title: "Hip-Hop Jam & Cypher",
    category: "Party",
    dayOffset: 6,
    time: "21:00",
    venue: "Kulturbunker Mülheim",
    city: "Köln",
    address: "Köln-Mülheim",
    price: "ab 10 €",
    description: "DJs, Freestyle-Cypher und Breakdance-Battle. Bring deine Crew – oder finde eine.",
    ticketUrl: "https://www.eventim.de/",
    tags: ["Party", "Hip-Hop"],
  },
  {
    id: "kino-open-air",
    title: "Kultfilm-Abend im Programmkino",
    category: "Kultur",
    dayOffset: 1,
    time: "20:30",
    venue: "Programmkino Südstadt",
    city: "Köln",
    address: "Südstadt, Köln",
    price: "9 €",
    description: "Ein Klassiker auf großer Leinwand, danach Austausch an der Bar.",
    ticketUrl: "https://www.koelnticket.de/",
    tags: ["Film"],
  },
  {
    id: "theater-impro",
    title: "Impro-Theater: Ihr bestimmt die Story",
    category: "Kultur",
    dayOffset: 8,
    time: "20:00",
    venue: "Studiobühne",
    city: "Bonn",
    address: "Bonn-Beuel",
    price: "12 €",
    description: "Das Publikum ruft Stichworte, das Ensemble spielt spontan. Jeder Abend ist anders.",
    ticketUrl: "https://www.bonnticket.de/",
    tags: ["Theater", "Comedy"],
  },
  {
    id: "gaming-turnier",
    title: "Mario-Kart-Turnier",
    category: "Party",
    dayOffset: 9,
    time: "19:00",
    venue: "Gaming-Bar am Ring",
    city: "Köln",
    address: "Ringe, Köln",
    price: "5 €",
    description: "Teams werden vor Ort gelost – perfekt zum Kennenlernen. Preise für die Top 3.",
    ticketUrl: "https://www.eventim.de/",
    tags: ["Gaming"],
  },
  {
    id: "wanderung-siebengebirge",
    title: "Gemeinsame Wanderung im Siebengebirge",
    category: "Outdoor",
    dayOffset: 11,
    time: "09:30",
    venue: "Treffpunkt Königswinter Bahnhof",
    city: "Bonn",
    address: "Königswinter bei Bonn",
    price: "kostenlos",
    description: "Ca. 12 km mit Aussicht auf den Drachenfels. Mittagspause mit Picknick.",
    ticketUrl: "https://www.bonn.de/",
    tags: ["Outdoor", "Sport"],
  },
  {
    id: "jazz-session",
    title: "Jazz-Session für Einsteiger",
    category: "Konzert",
    dayOffset: 7,
    time: "20:00",
    venue: "Jazzkeller Altstadt",
    city: "Bonn",
    address: "Altstadt, Bonn",
    price: "ab 10 €",
    description: "Entspannte Live-Session mit offener Bühne in der zweiten Hälfte.",
    ticketUrl: "https://www.bonnticket.de/",
    tags: ["Konzerte"],
  },
  {
    id: "networking-startups",
    title: "Start-up-Meetup für Studierende",
    category: "Kultur",
    dayOffset: 10,
    time: "18:30",
    venue: "Co-Working-Space Innenstadt",
    city: "Köln",
    address: "Innenstadt, Köln",
    price: "kostenlos",
    description: "Kurze Pitches, Snacks und Gespräche mit Gründer:innen aus der Region.",
    ticketUrl: "https://www.koeln.de/",
    tags: ["Networking"],
  },
  {
    id: "techno-warehouse",
    title: "Warehouse Rave",
    category: "Party",
    dayOffset: 13,
    time: "23:00",
    venue: "Halle im Industriegebiet",
    city: "Köln",
    address: "Köln-Kalk",
    price: "ab 20 €",
    description: "Lange Nacht mit drei Floors. Gemeinsam hin und gemeinsam zurück ist entspannter.",
    ticketUrl: "https://www.eventim.de/",
    tags: ["Party", "Techno", "Festivals"],
  },
  {
    id: "food-kochkurs",
    title: "Kochkurs: Streetfood aus Asien",
    category: "Food",
    dayOffset: 12,
    time: "18:00",
    venue: "Kochschule Südstadt",
    city: "Bonn",
    address: "Bonn-Südstadt",
    price: "35 €",
    description: "In Kleingruppen kochen und danach zusammen essen. Max. 16 Personen.",
    ticketUrl: "https://www.bonnticket.de/",
    tags: ["Food"],
  },
  {
    id: "fussball-public",
    title: "Fußball Public Viewing",
    category: "Sport",
    dayOffset: 3,
    time: "20:45",
    venue: "Sportsbar Zülpicher",
    city: "Köln",
    address: "Zülpicher Straße, Köln",
    price: "Eintritt frei",
    description: "Großleinwand, gute Stimmung und Platz für alle Fans.",
    ticketUrl: "https://www.koeln.de/",
    tags: ["Sport"],
  },
  {
    id: "poetry-slam",
    title: "Poetry Slam",
    category: "Comedy",
    dayOffset: 15,
    time: "19:30",
    venue: "Kulturzentrum Endenich",
    city: "Bonn",
    address: "Bonn-Endenich",
    price: "7 €",
    description: "Sechs Slammer:innen, ein Mikro, das Publikum entscheidet.",
    ticketUrl: "https://www.bonnticket.de/",
    tags: ["Comedy", "Theater"],
  },
  {
    id: "indie-festival",
    title: "Indoor-Festival: Herbstklang",
    category: "Konzert",
    dayOffset: 18,
    time: "16:00",
    venue: "Konzerthalle Deutz",
    city: "Köln",
    address: "Köln-Deutz",
    price: "ab 39 €",
    description: "Acht Acts auf zwei Bühnen. Tagesfestival für Indie- und Popfans.",
    ticketUrl: "https://www.eventim.de/",
    tags: ["Konzerte", "Indie", "Festivals"],
  },
  {
    id: "museum-abend",
    title: "Afterwork im Museum",
    category: "Kultur",
    dayOffset: 4,
    time: "18:00",
    venue: "Kunstmuseum",
    city: "Bonn",
    address: "Museumsmeile, Bonn",
    price: "8 €",
    description: "Ausstellung bei Musik und Drinks, Kurzführungen jede halbe Stunde.",
    ticketUrl: "https://www.bonnticket.de/",
    tags: ["Kunst"],
  },
  {
    id: "beachvolleyball",
    title: "Beachvolleyball-Abend (Halle)",
    category: "Sport",
    dayOffset: 6,
    time: "19:00",
    venue: "Beachhalle Köln-Süd",
    city: "Köln",
    address: "Köln-Rodenkirchen",
    price: "6 €",
    description: "Teams werden gemischt. Anfänger:innen sind ausdrücklich willkommen.",
    ticketUrl: "https://www.koeln.de/",
    tags: ["Sport", "Outdoor"],
  },
];

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
  "indie-nacht": ["p1", "p11", "p9", "p16", "p7"],
  "techno-rooftop": ["p2", "p13", "p14"],
  "comedy-open-mic": ["p5", "p12", "p8"],
  "rheinaue-lauf": ["p4", "p15", "p10"],
  "streetfood-markt": ["p5", "p7", "p10", "p14", "p1"],
  kunstnacht: ["p3", "p7", "p15", "p9"],
  "hiphop-jam": ["p6", "p16"],
  "kino-open-air": ["p3", "p8", "p5"],
  "theater-impro": ["p12", "p3", "p11"],
  "gaming-turnier": ["p8", "p6", "p16"],
  "wanderung-siebengebirge": ["p10", "p4", "p15"],
  "jazz-session": ["p7", "p9"],
  "networking-startups": ["p9", "p12"],
  "techno-warehouse": ["p2", "p13"],
  "food-kochkurs": ["p10", "p7", "p5"],
  "fussball-public": ["p14", "p4"],
  "poetry-slam": ["p12", "p11", "p5"],
  "indie-festival": ["p1", "p11", "p14", "p16", "p9", "p2"],
  "museum-abend": ["p3", "p15"],
  beachvolleyball: ["p4", "p14", "p10"],
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
    id: "g-indie",
    eventId: "indie-nacht",
    name: "Indie-Crew vorne an der Bühne",
    memberIds: ["p1", "p11", "p16"],
    messages: [
      m("m1", "p1", "Hey! Wer hat Lust, vorher noch was essen zu gehen?", 180),
      m("m2", "p11", "Ich! 19 Uhr in Ehrenfeld?", 170),
      m("m3", "p16", "Bin dabei, komme direkt von der Arbeit 🙌", 120),
    ],
  },
  {
    id: "g-food",
    eventId: "streetfood-markt",
    name: "Hungrig durch Ehrenfeld",
    memberIds: ["p5", "p7", "p10"],
    messages: [
      m("m4", "p7", "Treffen wir uns am Eingang?", 300),
      m("m5", "p10", "Ja, 12:30 passt mir!", 280),
    ],
  },
  {
    id: "g-lauf",
    eventId: "rheinaue-lauf",
    name: "Gemütliches Tempo 🐢",
    memberIds: ["p4", "p15"],
    messages: [m("m6", "p4", "Wir laufen eher entspannt, alle willkommen!", 600)],
  },
  {
    id: "g-techno",
    eventId: "techno-rooftop",
    name: "Rooftop-Gang",
    memberIds: ["p2", "p13"],
    messages: [m("m7", "p13", "Vorglühen bei mir? Wohne in der Nähe 😄", 90)],
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

"use client";

import { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import { CATEGORIES, EVENTS } from "@/lib/data";
import { useApp } from "@/lib/store";
import { CategoryDot, Chip, EmptyState, EventCard, LogoHeader, input } from "@/components/ui";

// Entdecken: Eventübersicht mit Filter nach Kategorie und Datum

const DATE_FILTERS = ["Alle", "Heute", "Morgen", "Wochenende", "Nächste 7 Tage", "Nächste 30 Tage"] as const;
type DateFilter = (typeof DATE_FILTERS)[number];

function matchesDate(dayOffset: number, f: DateFilter) {
  if (f === "Alle") return true;
  if (f === "Heute") return dayOffset === 0;
  if (f === "Morgen") return dayOffset === 1;
  if (f === "Nächste 7 Tage") return dayOffset <= 7;
  if (f === "Nächste 30 Tage") return dayOffset <= 30;
  // Wochenende: dieses bzw. kommendes Freitag–Sonntag
  const dow = new Date().getDay(); // 0 = Sonntag
  const start = dow >= 5 || dow === 0 ? 0 : 5 - dow;
  const end = (7 - dow) % 7;
  return dayOffset >= start && dayOffset <= end;
}

export default function Entdecken() {
  const { me } = useApp();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("Alle");
  const [date, setDate] = useState<DateFilter>("Alle");
  const [city, setCity] = useState<string>("Alle");

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return EVENTS.filter((e) => (cat === "Alle" || e.category === cat) && matchesDate(e.dayOffset, date))
      .filter((e) => city === "Alle" || e.city === city)
      .filter((e) => !query || `${e.title} ${e.venue} ${e.city} ${e.category}`.toLowerCase().includes(query))
      .sort((a, b) => a.dayOffset - b.dayOffset || a.time.localeCompare(b.time));
  }, [q, cat, date, city]);

  return (
    <div>
      <LogoHeader
        right={
          <div className="flex rounded-full bg-surface-2 p-1 text-xs font-bold">
            {["Alle", "Köln", "Bonn"].map((c) => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={`rounded-full px-3 py-1.5 ${city === c ? "bg-white text-ink shadow-sm" : "text-muted"}`}
                aria-pressed={city === c}
              >
                {c}
              </button>
            ))}
          </div>
        }
      />
      <div className="px-5 pt-1">
        <h1 className="text-2xl font-extrabold text-ink">Hey {me?.name} 👋</h1>
        <p className="text-sm text-muted">Worauf hast du Lust?</p>
        <div className="relative mt-4">
          <Search className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" size={18} />
          <input className={`${input} pl-11`} placeholder="Event, Ort oder Kategorie suchen" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Suchen" />
        </div>
      </div>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto px-5" role="group" aria-label="Kategorie">
        <Chip active={cat === "Alle"} onClick={() => setCat("Alle")}>
          Alle
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
            <CategoryDot category={c} />
            {c}
          </Chip>
        ))}
      </div>
      <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto px-5" role="group" aria-label="Datum">
        {DATE_FILTERS.map((d) => (
          <Chip key={d} small active={date === d} onClick={() => setDate(d)}>
            {d}
          </Chip>
        ))}
      </div>

      <p className="px-5 pt-5 pb-2 text-sm font-semibold text-muted">{list.length} Events</p>
      {list.length === 0 ? (
        <EmptyState icon={SearchX} title="Keine Events gefunden" text="Probier einen anderen Filter oder Zeitraum." />
      ) : (
        <ul className="flex flex-col gap-4 px-5">
          {list.map((e) => (
            <li key={e.id}>
              <EventCard ev={e} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

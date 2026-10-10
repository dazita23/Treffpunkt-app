"use client";

import Link from "next/link";
import { CalendarHeart, MessageCircle, Users } from "lucide-react";
import { EventVisual, btnPrimary, btnSecondary } from "@/components/ui";
import type { Category } from "@/lib/data";
import { useApp } from "@/lib/store";

// Plakatwand aus den Event-Kategorien
const MOSAIC: { c: Category; span?: boolean }[] = [
  { c: "Konzert", span: true },
  { c: "Food" },
  { c: "Comedy" },
  { c: "Kultur" },
  { c: "Party" },
];

export default function Willkommen() {
  const { demoLogin } = useApp();
  const points = [
    { icon: CalendarHeart, text: "Events in Köln/Bonn entdecken", color: "#5229A5" },
    { icon: Users, text: "Sehen, wer hingeht", color: "#E8336F" },
    { icon: MessageCircle, text: "Gruppe finden und gemeinsam hingehen", color: "#0E8A7E" },
  ];
  return (
    <div className="flex min-h-dvh flex-col px-6 pt-8 pb-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Treffpunkt" className="h-11 w-auto self-start" />

      <div className="mt-6 grid grid-cols-3 gap-2" aria-hidden>
        {MOSAIC.map(({ c, span }, i) => (
          <EventVisual key={i} category={c} iconSize={26} className={`rounded-2xl ${span ? "col-span-2 h-24" : "h-24"}`} />
        ))}
      </div>

      <h1 className="mt-7 text-[32px] leading-[1.1] font-extrabold text-ink">Gemeinsam statt allein zum Event.</h1>
      <p className="mt-3 text-ink/75">Entdecke Events und verbinde dich mit Menschen, bevor du hingehst.</p>

      <ul className="mt-6 space-y-3">
        {points.map(({ icon: Icon, text, color }) => (
          <li key={text} className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full text-white" style={{ background: color }}>
              <Icon size={18} />
            </span>
            <span className="font-semibold text-ink">{text}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-3 pt-8">
        <Link href="/registrieren" className={btnPrimary}>
          Konto erstellen
        </Link>
        <Link href="/anmelden" className={btnSecondary}>
          Anmelden
        </Link>
        <button onClick={demoLogin} className="py-2 text-sm font-semibold text-muted underline underline-offset-4">
          Ohne Anmeldung ausprobieren (Demo)
        </button>
        <p className="text-center text-[11px] text-muted">Prototyp für Usability-Tests · Beispieldaten, keine echten Personen</p>
      </div>
    </div>
  );
}

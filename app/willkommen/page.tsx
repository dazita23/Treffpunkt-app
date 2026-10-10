"use client";

import Link from "next/link";
import { CalendarHeart, MessageCircle, Users } from "lucide-react";
import { btnPrimary, btnSecondary } from "@/components/ui";
import { useApp } from "@/lib/store";

export default function Willkommen() {
  const { demoLogin } = useApp();
  const points = [
    { icon: CalendarHeart, text: "Events in Köln/Bonn entdecken" },
    { icon: Users, text: "Sehen, wer hingeht" },
    { icon: MessageCircle, text: "Gruppe finden und gemeinsam hingehen" },
  ];
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden px-6 pt-14 pb-8">
      <span className="absolute -top-24 -right-24 size-72 rounded-full bg-lav-100" aria-hidden />
      <span className="absolute -top-8 -right-8 size-40 rounded-full bg-lav-200/60" aria-hidden />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Treffpunkt" className="relative h-14 w-auto self-start" />
      <h1 className="relative mt-10 text-[34px] leading-tight font-extrabold text-brand-dark">
        Gemeinsam statt allein zum Event.
      </h1>
      <p className="relative mt-3 text-ink/80">Entdecke Events und verbinde dich mit Menschen, bevor du hingehst.</p>

      <ul className="relative mt-8 space-y-3">
        {points.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 rounded-2xl bg-lav-50 p-3">
            <span className="grid size-10 place-items-center rounded-full bg-lav-100 text-brand">
              <Icon size={20} />
            </span>
            <span className="font-semibold text-brand-dark">{text}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-3 pt-10">
        <Link href="/registrieren" className={btnPrimary}>
          Konto erstellen
        </Link>
        <Link href="/anmelden" className={btnSecondary}>
          Anmelden
        </Link>
        <button onClick={demoLogin} className="py-2 text-sm font-semibold text-muted underline underline-offset-4">
          Ohne Anmeldung ausprobieren (Demo)
        </button>
        <p className="text-center text-[11px] text-muted">
          Prototyp für Usability-Tests · Beispieldaten, keine echten Personen
        </p>
      </div>
    </div>
  );
}

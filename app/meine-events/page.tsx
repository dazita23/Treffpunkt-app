"use client";

import Link from "next/link";
import { CalendarHeart } from "lucide-react";
import { EVENTS } from "@/lib/data";
import { useApp } from "@/lib/store";
import { EmptyState, EventCard, PageTitle, btnPrimary } from "@/components/ui";

export default function MeineEvents() {
  const { going } = useApp();
  const mine = EVENTS.filter((e) => going.includes(e.id)).sort((a, b) => a.dayOffset - b.dayOffset);
  return (
    <div className="pt-4">
      <PageTitle title="Meine Events" sub="Hier landen alle Events, bei denen du „Ich gehe hin“ markiert hast." />
      {mine.length === 0 ? (
        <EmptyState
          icon={CalendarHeart}
          title="Noch keine Events"
          text="Entdecke Events und markiere, dass du hingehst – dann sehen andere, dass du dabei bist."
          action={
            <Link href="/" className={btnPrimary}>
              Events entdecken
            </Link>
          }
        />
      ) : (
        <ul className="flex flex-col gap-4 px-5">
          {mine.map((e) => (
            <li key={e.id}>
              <EventCard ev={e} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

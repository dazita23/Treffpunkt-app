"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { ME, eventById, formatDay, personById, useApp } from "@/lib/store";
import { EmptyState, EventVisual, PageTitle, btnPrimary } from "@/components/ui";

export default function Chats() {
  const { groups, me } = useApp();
  const mine = groups
    .filter((g) => g.memberIds.includes(ME) && eventById(g.eventId))
    .sort((a, b) => (b.messages.at(-1)?.at ?? 0) - (a.messages.at(-1)?.at ?? 0));

  return (
    <div className="pt-4">
      <PageTitle title="Chats" sub="Deine Event-Gruppen" />
      {mine.length === 0 ? (
        <EmptyState
          icon={MessageCircle}
          title="Noch keine Gruppen"
          text="Öffne ein Event und tritt einer Gruppe bei – oder gründe selbst eine."
          action={
            <Link href="/" className={btnPrimary}>
              Events entdecken
            </Link>
          }
        />
      ) : (
        <ul className="flex flex-col gap-2 px-5">
          {mine.map((g) => {
            const ev = eventById(g.eventId)!;
            const last = g.messages.at(-1);
            const author = last ? personById(last.authorId, me) : undefined;
            return (
              <li key={g.id}>
                <Link href={`/chats/${g.id}`} className="flex items-center gap-3 rounded-2xl p-3 hover:bg-surface">
                  <EventVisual category={ev.category} className="size-14 shrink-0 rounded-2xl" iconSize={22} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-ink">{g.name}</p>
                    <p className="truncate text-xs font-semibold text-muted">
                      {ev.title} · {formatDay(ev.dayOffset)}
                    </p>
                    <p className="truncate text-sm text-muted">
                      {last ? `${last.authorId === ME ? "Du" : author?.name}: ${last.text}` : "Noch keine Nachrichten – sag Hallo!"}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

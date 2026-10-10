"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Check, ExternalLink, MapPin, MessageCircle, Plus, Ticket, Users } from "lucide-react";
import { Avatar, AvatarStack, BackHeader, Chip, DateStub, EmptyState, EventVisual, btnPrimary, input } from "@/components/ui";
import { ME, attendeesOf, eventById, formatDay, formatTime, personById, shared, useApp } from "@/lib/store";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { me, going, groups, toggleGoing, joinGroup, createGroup } = useApp();
  const [creating, setCreating] = useState(false);
  const [groupName, setGroupName] = useState("");
  const ev = eventById(id);

  if (!ev || !me)
    return (
      <div>
        <BackHeader />
        <EmptyState icon={Ticket} title="Event nicht gefunden" text="Dieses Event gibt es leider nicht (mehr)." />
      </div>
    );

  const amGoing = going.includes(ev.id);
  const people = attendeesOf(ev.id, going, me)
    .map((p) => ({ p, common: shared(p.interests, me.interests) }))
    .sort((a, b) => (a.p.id === ME ? -1 : b.p.id === ME ? 1 : b.common.length - a.common.length));
  const eventGroups = groups.filter((g) => g.eventId === ev.id);

  function submitGroup(e: React.FormEvent) {
    e.preventDefault();
    if (!groupName.trim() || !ev) return;
    const gid = createGroup(ev.id, groupName.trim());
    router.push(`/chats/${gid}`);
  }

  return (
    <div className="pb-10">
      <BackHeader title={ev.category} />
      <div className="px-5">
        <div className="relative">
          <EventVisual category={ev.category} className="h-48 rounded-3xl" iconSize={48} image={ev.image} />
          <span className="absolute top-4 left-4">
            <DateStub dayOffset={ev.dayOffset} />
          </span>
          {ev.imageCredit && (
            <span className="absolute right-3 bottom-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/90">{ev.imageCredit}</span>
          )}
        </div>
        <p className="mt-4 text-sm font-semibold text-muted">
          {formatDay(ev.dayOffset)} · {formatTime(ev.time)}
        </p>
        <h1 className="mt-1 text-2xl leading-tight font-extrabold text-ink">{ev.title}</h1>
        <div className="mt-3 space-y-1.5 text-sm text-ink/80">
          <p className="flex items-center gap-2">
            <MapPin size={16} className="text-brand" /> {ev.venue}, {ev.address}
          </p>
          <p className="flex items-center gap-2">
            <Ticket size={16} className="text-brand" /> {ev.price}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={() => toggleGoing(ev.id)}
            className={amGoing ? "inline-flex items-center justify-center gap-2 rounded-full bg-social-soft px-4 py-3.5 font-bold text-social" : `${btnPrimary} px-4`}
            aria-pressed={amGoing}
          >
            {amGoing ? <Check size={18} /> : <Plus size={18} />}
            {amGoing ? "Du gehst hin" : "Ich gehe hin"}
          </button>
          <a
            href={ev.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand px-4 py-3 font-bold text-brand hover:bg-surface"
          >
            Tickets <ExternalLink size={16} />
          </a>
        </div>
        <p className="mt-2 text-center text-[11px] text-muted">Der Ticketkauf läuft direkt beim Anbieter.</p>

        <p className="mt-5 leading-relaxed text-ink/85">{ev.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {ev.tags.map((t) => (
            <Chip key={t} small active={me.interests.includes(t)} tone="social">
              {t}
            </Chip>
          ))}
        </div>
      </div>

      {/* Wer geht hin? */}
      <section className="mt-8 px-5">
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-ink">
          <Users size={20} className="text-brand" /> Wer geht hin? <span className="text-muted">({people.length})</span>
        </h2>
        <ul className="mt-3 divide-y divide-surface-2 rounded-2xl bg-surface">
          {people.map(({ p, common }) => {
            const row = (
              <>
                <Avatar id={p.id} name={p.name} size={44} />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-ink">
                    {p.id === ME ? "Du" : p.name}
                    <span className="font-normal text-muted">
                      {" "}
                      · {p.age} · {p.city}
                    </span>
                  </p>
                  {p.id !== ME && (
                    <p className="truncate text-xs text-muted">
                      {common.length > 0 ? (
                        <>
                          <span className="font-bold text-social">Gemeinsam:</span> {common.join(", ")}
                        </>
                      ) : (
                        p.interests.slice(0, 3).join(", ")
                      )}
                    </p>
                  )}
                </div>
              </>
            );
            return (
              <li key={p.id}>
                {p.id === ME ? (
                  <div className="flex items-center gap-3 p-3">{row}</div>
                ) : (
                  <Link href={`/person/${p.id}`} className="flex items-center gap-3 p-3 hover:bg-surface-2">
                    {row}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Gruppen */}
      <section className="mt-8 px-5">
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-ink">
          <MessageCircle size={20} className="text-brand" /> Gruppen für dieses Event
        </h2>
        <p className="text-sm text-muted">Tritt einer Gruppe bei oder gründe eine eigene.</p>
        <ul className="mt-3 flex flex-col gap-3">
          {eventGroups.map((g) => {
            const member = g.memberIds.includes(ME);
            const members = g.memberIds.map((mid) => personById(mid, me)).filter(Boolean) as { id: string; name: string }[];
            return (
              <li key={g.id} className="flex items-center gap-3 rounded-2xl border border-line p-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-ink">{g.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <AvatarStack people={members} max={4} />
                    <span className="text-xs text-muted">{members.length} Mitglieder</span>
                  </div>
                </div>
                {member ? (
                  <Link href={`/chats/${g.id}`} className="rounded-full bg-surface-2 px-4 py-2 text-sm font-bold text-brand">
                    Zum Chat
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      joinGroup(g.id);
                      router.push(`/chats/${g.id}`);
                    }}
                    className="rounded-full bg-brand px-4 py-2 text-sm font-bold text-white"
                  >
                    Beitreten
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        {creating ? (
          <form onSubmit={submitGroup} className="mt-3 flex flex-col gap-2 rounded-2xl bg-surface p-3">
            <label className="text-sm font-bold text-ink" htmlFor="gname">
              Name der Gruppe
            </label>
            <input
              id="gname"
              className={input}
              placeholder="z. B. Vorher was trinken 🍹"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              maxLength={40}
              autoFocus
            />
            <div className="flex gap-2">
              <button type="button" onClick={() => setCreating(false)} className="flex-1 rounded-full py-2.5 font-bold text-muted">
                Abbrechen
              </button>
              <button disabled={!groupName.trim()} className={`${btnPrimary} flex-1 py-2.5`}>
                Gruppe erstellen
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setCreating(true)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line-strong py-3.5 font-bold text-brand hover:bg-surface"
          >
            <Plus size={18} /> Neue Gruppe erstellen
          </button>
        )}
      </section>
    </div>
  );
}

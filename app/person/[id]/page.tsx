"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, Flag, UserX, X } from "lucide-react";
import { ATTENDANCE, EVENTS, PEOPLE, REPORT_REASONS } from "@/lib/data";
import { Avatar, BackHeader, Chip, EmptyState, EventCard, btnPrimary } from "@/components/ui";
import { shared, useApp } from "@/lib/store";

export default function PersonProfil() {
  const { id } = useParams<{ id: string }>();
  const { me, reports, report } = useApp();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const p = PEOPLE.find((x) => x.id === id);

  if (!p || !me)
    return (
      <div>
        <BackHeader />
        <EmptyState icon={UserX} title="Profil nicht gefunden" text="Dieses Profil gibt es nicht." />
      </div>
    );

  const common = shared(p.interests, me.interests);
  const theirEvents = EVENTS.filter((e) => ATTENDANCE[e.id]?.includes(p.id)).sort((a, b) => a.dayOffset - b.dayOffset);
  const reported = reports.some((r) => r.personId === p.id);

  return (
    <div className="pb-10">
      <BackHeader
        right={
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-muted hover:bg-lav-50"
            aria-label="Profil melden"
          >
            <Flag size={16} /> Melden
          </button>
        }
      />
      <div className="flex flex-col items-center px-5 text-center">
        <Avatar id={p.id} name={p.name} size={96} />
        <h1 className="mt-3 text-2xl font-extrabold text-brand-dark">
          {p.name}, {p.age}
        </h1>
        <p className="text-sm text-muted">{p.city}</p>
        <p className="mt-3 text-ink/85">{p.bio}</p>
        {reported && (
          <p className="mt-3 flex items-center gap-1.5 rounded-full bg-lav-50 px-3 py-1.5 text-xs font-semibold text-brand">
            <CheckCircle2 size={14} /> Du hast dieses Profil gemeldet
          </p>
        )}
      </div>

      <section className="mt-6 px-5">
        <h2 className="text-sm font-bold tracking-wide text-muted uppercase">Interessen</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {p.interests.map((i) => (
            <Chip key={i} active={common.includes(i)}>
              {i}
            </Chip>
          ))}
        </div>
        {common.length > 0 && <p className="mt-2 text-xs text-muted">Hervorgehoben: Interessen, die ihr gemeinsam habt.</p>}
      </section>

      <section className="mt-6 px-5">
        <h2 className="text-sm font-bold tracking-wide text-muted uppercase">Geht zu</h2>
        <ul className="mt-2 flex flex-col gap-3">
          {theirEvents.map((e) => (
            <li key={e.id}>
              <EventCard ev={e} />
            </li>
          ))}
        </ul>
      </section>

      {open && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-brand-deep/40" role="dialog" aria-modal="true" aria-labelledby="melden-titel">
          <div className="w-full max-w-[440px] rounded-t-3xl bg-white p-5 pb-8">
            {reported ? (
              <div className="flex flex-col items-center py-4 text-center">
                <CheckCircle2 size={44} className="text-brand" />
                <h2 id="melden-titel" className="mt-3 text-lg font-extrabold text-brand-dark">
                  Danke für deine Meldung
                </h2>
                <p className="mt-1 text-sm text-muted">Unser Team prüft das Profil. {p.name} erfährt nicht, wer gemeldet hat.</p>
                <button onClick={() => setOpen(false)} className={`${btnPrimary} mt-5 w-full`}>
                  Schließen
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 id="melden-titel" className="text-lg font-extrabold text-brand-dark">
                    {p.name} melden
                  </h2>
                  <button onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-full hover:bg-lav-50" aria-label="Schließen">
                    <X size={20} />
                  </button>
                </div>
                <p className="mt-1 text-sm text-muted">Warum möchtest du dieses Profil melden?</p>
                <div className="mt-4 flex flex-col gap-2">
                  {REPORT_REASONS.map((r) => (
                    <label key={r} className={`flex items-center gap-3 rounded-xl border p-3 ${reason === r ? "border-brand bg-lav-50" : "border-lav-200"}`}>
                      <input type="radio" name="grund" value={r} checked={reason === r} onChange={() => setReason(r)} className="size-4 accent-brand" />
                      <span className="text-sm font-medium">{r}</span>
                    </label>
                  ))}
                </div>
                <button disabled={!reason} onClick={() => report(p.id, reason)} className={`${btnPrimary} mt-5 w-full`}>
                  Meldung absenden
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

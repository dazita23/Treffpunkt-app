"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogOut, MessageCircle, Send } from "lucide-react";
import { Avatar, AvatarStack, BackHeader, EmptyState } from "@/components/ui";
import { ME, eventById, formatDay, personById, useApp } from "@/lib/store";

export default function ChatDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { groups, me, sendMessage, joinGroup, leaveGroup } = useApp();
  const [text, setText] = useState("");
  const bottom = useRef<HTMLDivElement>(null);
  const g = groups.find((x) => x.id === id);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [g?.messages.length]);

  if (!g || !me)
    return (
      <div>
        <BackHeader />
        <EmptyState icon={MessageCircle} title="Gruppe nicht gefunden" text="Diese Gruppe gibt es nicht mehr." />
      </div>
    );

  const ev = eventById(g.eventId)!;
  const member = g.memberIds.includes(ME);
  const members = g.memberIds.map((mid) => personById(mid, me)).filter(Boolean) as { id: string; name: string }[];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || !g) return;
    sendMessage(g.id, text.trim());
    setText("");
  }

  return (
    <div className="flex h-dvh flex-col">
      <BackHeader
        title={g.name}
        right={
          member ? (
            <button
              onClick={() => {
                leaveGroup(g.id);
                router.push("/chats");
              }}
              className="grid size-10 place-items-center rounded-full text-muted hover:bg-lav-50"
              aria-label="Gruppe verlassen"
              title="Gruppe verlassen"
            >
              <LogOut size={18} />
            </button>
          ) : null
        }
      />
      <Link href={`/event/${ev.id}`} className="mx-4 flex items-center gap-3 rounded-2xl bg-lav-50 px-4 py-2.5">
        <AvatarStack people={members} max={5} />
        <div className="min-w-0 flex-1 text-right">
          <p className="truncate text-xs font-bold text-brand">{ev.title}</p>
          <p className="text-xs text-muted">
            {formatDay(ev.dayOffset)} · {ev.time} Uhr
          </p>
        </div>
      </Link>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {g.messages.length === 0 && (
          <p className="mx-auto mt-6 max-w-[260px] text-center text-sm text-muted">
            Die Gruppe ist startklar. Schreib die erste Nachricht und plant, wann und wo ihr euch trefft!
          </p>
        )}
        <ul className="flex flex-col gap-3">
          {g.messages.map((msg) => {
            const mine = msg.authorId === ME;
            const author = personById(msg.authorId, me);
            return (
              <li key={msg.id} className={`flex items-end gap-2 ${mine ? "flex-row-reverse" : ""}`}>
                {!mine && <Avatar id={msg.authorId} name={author?.name ?? "?"} size={30} />}
                <div className={`max-w-[75%] rounded-2xl px-3.5 py-2 ${mine ? "rounded-br-md bg-brand text-white" : "rounded-bl-md bg-lav-50 text-ink"}`}>
                  {!mine && <p className="text-[11px] font-bold text-brand">{author?.name}</p>}
                  <p className="text-[15px] leading-snug">{msg.text}</p>
                  <p className={`mt-0.5 text-right text-[10px] ${mine ? "text-white/70" : "text-muted"}`}>
                    {new Date(msg.at).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <div ref={bottom} />
      </div>

      {member ? (
        <form onSubmit={submit} className="flex items-center gap-2 border-t border-lav-100 bg-white px-3 py-3 pb-[max(12px,env(safe-area-inset-bottom))]">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nachricht schreiben …"
            className="flex-1 rounded-full bg-lav-50 px-4 py-3 outline-none focus:ring-2 focus:ring-lav-200"
            aria-label="Nachricht"
          />
          <button disabled={!text.trim()} className="grid size-12 place-items-center rounded-full bg-brand text-white disabled:opacity-40" aria-label="Senden">
            <Send size={20} />
          </button>
        </form>
      ) : (
        <div className="border-t border-lav-100 p-3">
          <button onClick={() => joinGroup(g.id)} className="w-full rounded-full bg-brand py-3.5 font-bold text-white">
            Gruppe beitreten, um zu schreiben
          </button>
        </div>
      )}
    </div>
  );
}

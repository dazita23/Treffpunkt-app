"use client";

import { useState } from "react";
import { Info, LogOut, Trash2 } from "lucide-react";
import { INTERESTS } from "@/lib/data";
import { Avatar, Chip, PageTitle } from "@/components/ui";
import { ME, useApp } from "@/lib/store";

export default function Profil() {
  const { account, going, groups, updateProfile, logout, deleteAccount } = useApp();
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  if (!account) return null;

  const groupCount = groups.filter((g) => g.memberIds.includes(ME)).length;

  function toggle(i: string) {
    if (!account) return;
    const list = account.interests.includes(i) ? account.interests.filter((x) => x !== i) : [...account.interests, i];
    updateProfile({ interests: list });
  }

  return (
    <div className="pt-4">
      <PageTitle title="Profil" />
      <div className="mx-5 flex items-center gap-4 rounded-3xl bg-lav-50 p-4">
        <Avatar id={ME} name={account.name} size={68} />
        <div>
          <p className="text-xl font-extrabold text-brand-dark">
            {account.name}, {account.age}
          </p>
          <p className="text-sm text-muted">
            {account.city} · {account.email}
          </p>
        </div>
      </div>

      <div className="mx-5 mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-lav-200 p-3 text-center">
          <p className="text-2xl font-extrabold text-brand">{going.length}</p>
          <p className="text-xs font-semibold text-muted">Events</p>
        </div>
        <div className="rounded-2xl border border-lav-200 p-3 text-center">
          <p className="text-2xl font-extrabold text-brand">{groupCount}</p>
          <p className="text-xs font-semibold text-muted">Gruppen</p>
        </div>
      </div>

      <section className="mt-6 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-wide text-muted uppercase">Meine Interessen</h2>
          <button onClick={() => setEditing((v) => !v)} className="text-sm font-bold text-brand">
            {editing ? "Fertig" : "Bearbeiten"}
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {(editing ? [...INTERESTS] : account.interests).map((i) => (
            <Chip key={i} active={account.interests.includes(i)} onClick={editing ? () => toggle(i) : undefined}>
              {i}
            </Chip>
          ))}
        </div>
      </section>

      <section className="mt-8 flex flex-col gap-2 px-5">
        <button onClick={logout} className="flex items-center gap-3 rounded-2xl p-3 font-semibold text-brand-dark hover:bg-lav-50">
          <LogOut size={20} className="text-brand" /> Abmelden
        </button>
        {confirmDelete ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-800">Konto wirklich löschen? Alle deine Daten werden entfernt.</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => setConfirmDelete(false)} className="flex-1 rounded-full bg-white py-2.5 text-sm font-bold text-brand-dark">
                Abbrechen
              </button>
              <button onClick={deleteAccount} className="flex-1 rounded-full bg-red-600 py-2.5 text-sm font-bold text-white">
                Endgültig löschen
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setConfirmDelete(true)} className="flex items-center gap-3 rounded-2xl p-3 font-semibold text-red-700 hover:bg-red-50">
            <Trash2 size={20} /> Konto löschen
          </button>
        )}
      </section>

      <p className="mx-5 mt-6 mb-4 flex gap-2 rounded-2xl bg-lav-50 p-3 text-xs text-muted">
        <Info size={16} className="shrink-0 text-brand" />
        Prototyp (Stufe 1): Daten werden nur auf diesem Gerät gespeichert. Alle anderen Profile sind simulierte Beispielprofile.
      </p>
    </div>
  );
}

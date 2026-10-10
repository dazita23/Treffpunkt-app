"use client";

import Link from "next/link";
import { useState } from "react";
import { BackHeader, btnPrimary, input } from "@/components/ui";
import { useApp } from "@/lib/store";

export default function Anmelden() {
  const { login, demoLogin } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!login(email, password)) setError("E-Mail oder Passwort stimmt nicht.");
  }

  return (
    <div>
      <BackHeader />
      <form onSubmit={submit} className="flex flex-col gap-4 px-6 pt-2">
        <h1 className="text-2xl font-extrabold text-brand-dark">Willkommen zurück</h1>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-brand-dark">
          E-Mail
          <input className={input} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-brand-dark">
          Passwort
          <input className={input} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">{error}</p>}
        <button className={`${btnPrimary} mt-2`}>Anmelden</button>
        <p className="text-center text-sm text-muted">
          Noch kein Konto?{" "}
          <Link href="/registrieren" className="font-bold text-brand">
            Registrieren
          </Link>
        </p>
        <button type="button" onClick={demoLogin} className="text-sm font-semibold text-muted underline underline-offset-4">
          Demo-Zugang nutzen
        </button>
      </form>
    </div>
  );
}

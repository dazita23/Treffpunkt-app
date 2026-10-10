"use client";

import { useState } from "react";
import { BackHeader, Chip, btnPrimary, input } from "@/components/ui";
import { INTERESTS } from "@/lib/data";
import { useApp } from "@/lib/store";

export default function Registrieren() {
  const { register } = useApp();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState<"Köln" | "Bonn">("Köln");
  const [interests, setInterests] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  function next(e: React.FormEvent) {
    e.preventDefault();
    const a = Number(age);
    if (!a || a < 18) return setError("Treffpunkt ist erst ab 18 Jahren nutzbar.");
    if (a > 99) return setError("Bitte gib ein gültiges Alter ein.");
    if (password.length < 6) return setError("Das Passwort braucht mindestens 6 Zeichen.");
    setError("");
    setStep(2);
  }

  function toggle(i: string) {
    setInterests((list) => (list.includes(i) ? list.filter((x) => x !== i) : [...list, i]));
  }

  function finish() {
    register({ name: name.trim(), email: email.trim(), password, age: Number(age), city, interests });
  }

  if (step === 2) {
    return (
      <div className="flex min-h-dvh flex-col">
        <BackHeader title="Schritt 2 von 2" />
        <div className="px-6">
          <h1 className="text-2xl font-extrabold text-ink">Was interessiert dich?</h1>
          <p className="mt-1 text-sm text-muted">Wähle mindestens 3. So zeigen wir dir passende Events und Leute.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {INTERESTS.map((i) => (
              <Chip key={i} active={interests.includes(i)} onClick={() => toggle(i)}>
                {i}
              </Chip>
            ))}
          </div>
          <label className="mt-6 flex items-start gap-3 rounded-xl bg-surface p-3 text-sm text-ink/80">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 size-5 accent-brand" />
            <span>
              Ich bin einverstanden, dass mein Profil (Vorname, Alter, Stadt, Interessen) anderen Nutzer:innen angezeigt wird. Ich kann mein Konto jederzeit löschen.
            </span>
          </label>
        </div>
        <div className="mt-auto px-6 pt-6 pb-8">
          <button onClick={finish} disabled={interests.length < 3 || !consent} className={`${btnPrimary} w-full`}>
            Los geht&apos;s ({interests.length}/3)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BackHeader title="Schritt 1 von 2" />
      <form onSubmit={next} className="flex flex-col gap-4 px-6">
        <h1 className="text-2xl font-extrabold text-ink">Konto erstellen</h1>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
          Vorname
          <input className={input} value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" required />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
          E-Mail
          <input className={input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
          Passwort
          <input className={input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required />
        </label>
        <div className="flex gap-3">
          <label className="flex w-28 flex-col gap-1.5 text-sm font-semibold text-ink">
            Alter
            <input className={input} inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, ""))} required />
          </label>
          <div className="flex flex-1 flex-col gap-1.5 text-sm font-semibold text-ink">
            Stadt
            <div className="flex gap-2">
              {(["Köln", "Bonn"] as const).map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCity(c)}
                  className={`flex-1 rounded-xl border py-3 font-semibold ${city === c ? "border-ink bg-ink text-white" : "border-line text-ink"}`}
                  aria-pressed={city === c}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
        {error && <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">{error}</p>}
        <button className={`${btnPrimary} mt-2`}>Weiter</button>
      </form>
    </div>
  );
}

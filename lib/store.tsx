"use client";

// Der "Speicher" des Prototyps.
// Stufe 1: alles wird nur im Browser des Geräts gespeichert (localStorage).
// Stufe 2: hier wird Supabase angebunden (echte Konten, Datenbank, Chat).

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ATTENDANCE, CANNED_REPLIES, EVENTS, PEOPLE, SEED_GROUPS, type Group, type Person } from "./data";

export const ME = "me";

export type Account = {
  name: string;
  email: string;
  password: string;
  age: number;
  city: "Köln" | "Bonn";
  interests: string[];
};

type Report = { personId: string; reason: string; at: number };

type State = {
  account: Account | null;
  loggedIn: boolean;
  going: string[];
  groups: Group[];
  reports: Report[];
};

const EMPTY: State = { account: null, loggedIn: false, going: [], groups: SEED_GROUPS, reports: [] };
const KEY = "treffpunkt-prototyp-v2"; // Version erhöhen, wenn sich die Events grundlegend ändern

export const DEMO_ACCOUNT: Account = {
  name: "Alex",
  email: "demo@treffpunkt.app",
  password: "demo",
  age: 24,
  city: "Köln",
  interests: ["Konzerte", "Indie", "Food", "Comedy"],
};

type Ctx = State & {
  ready: boolean;
  me: Person | null;
  register: (a: Account) => void;
  login: (email: string, password: string) => boolean;
  demoLogin: () => void;
  logout: () => void;
  deleteAccount: () => void;
  updateProfile: (p: Partial<Account>) => void;
  toggleGoing: (eventId: string) => void;
  createGroup: (eventId: string, name: string) => string;
  joinGroup: (groupId: string) => void;
  leaveGroup: (groupId: string) => void;
  sendMessage: (groupId: string, text: string) => void;
  report: (personId: string, reason: string) => void;
};

const AppContext = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(EMPTY);
  const [ready, setReady] = useState(false);
  const timers = useRef<number[]>([]);

  // gespeicherten Stand laden
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...EMPTY, ...JSON.parse(raw) });
    } catch {
      /* ohne gespeicherte Daten weiter */
    }
    setReady(true);
    const t = timers.current;
    return () => t.forEach((id) => clearTimeout(id));
  }, []);

  // bei jeder Änderung speichern
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* Speichern nicht möglich – App läuft trotzdem */
    }
  }, [state, ready]);

  const me: Person | null = useMemo(
    () =>
      state.account
        ? { id: ME, name: state.account.name, age: state.account.age, city: state.account.city, interests: state.account.interests, bio: "" }
        : null,
    [state.account],
  );

  const register = useCallback((a: Account) => {
    setState({ ...EMPTY, account: a, loggedIn: true });
  }, []);

  const login = useCallback(
    (email: string, password: string) => {
      const a = state.account;
      if (a && a.email.trim().toLowerCase() === email.trim().toLowerCase() && a.password === password) {
        setState((s) => ({ ...s, loggedIn: true }));
        return true;
      }
      return false;
    },
    [state.account],
  );

  const demoLogin = useCallback(() => {
    setState({ ...EMPTY, account: DEMO_ACCOUNT, loggedIn: true });
  }, []);

  const logout = useCallback(() => setState((s) => ({ ...s, loggedIn: false })), []);
  const deleteAccount = useCallback(() => setState(EMPTY), []);

  const updateProfile = useCallback(
    (p: Partial<Account>) => setState((s) => (s.account ? { ...s, account: { ...s.account, ...p } } : s)),
    [],
  );

  const toggleGoing = useCallback((eventId: string) => {
    setState((s) => ({
      ...s,
      going: s.going.includes(eventId) ? s.going.filter((id) => id !== eventId) : [...s.going, eventId],
    }));
  }, []);

  const createGroup = useCallback((eventId: string, name: string) => {
    const id = "g-" + Date.now().toString(36);
    setState((s) => ({
      ...s,
      going: s.going.includes(eventId) ? s.going : [...s.going, eventId],
      groups: [...s.groups, { id, eventId, name, memberIds: [ME], messages: [] }],
    }));
    return id;
  }, []);

  const joinGroup = useCallback((groupId: string) => {
    setState((s) => {
      const g = s.groups.find((x) => x.id === groupId);
      if (!g) return s;
      return {
        ...s,
        going: s.going.includes(g.eventId) ? s.going : [...s.going, g.eventId],
        groups: s.groups.map((x) => (x.id === groupId && !x.memberIds.includes(ME) ? { ...x, memberIds: [...x.memberIds, ME] } : x)),
      };
    });
  }, []);

  const leaveGroup = useCallback((groupId: string) => {
    setState((s) => ({
      ...s,
      groups: s.groups.map((x) => (x.id === groupId ? { ...x, memberIds: x.memberIds.filter((id) => id !== ME) } : x)),
    }));
  }, []);

  const sendMessage = useCallback((groupId: string, text: string) => {
    const msg = { id: "m-" + Date.now().toString(36), authorId: ME, text, at: Date.now() };
    let replier: string | undefined;
    setState((s) => {
      const g = s.groups.find((x) => x.id === groupId);
      replier = g?.memberIds.find((id) => id !== ME);
      return { ...s, groups: s.groups.map((x) => (x.id === groupId ? { ...x, messages: [...x.messages, msg] } : x)) };
    });
    // Prototyp: ein Gruppenmitglied antwortet automatisch (simuliert)
    const t = window.setTimeout(() => {
      if (!replier) return;
      const reply = {
        id: "m-" + Date.now().toString(36) + "r",
        authorId: replier,
        text: CANNED_REPLIES[Math.floor(Math.random() * CANNED_REPLIES.length)],
        at: Date.now(),
      };
      setState((s) => ({ ...s, groups: s.groups.map((x) => (x.id === groupId ? { ...x, messages: [...x.messages, reply] } : x)) }));
    }, 1800);
    timers.current.push(t);
  }, []);

  const report = useCallback((personId: string, reason: string) => {
    setState((s) => ({ ...s, reports: [...s.reports, { personId, reason, at: Date.now() }] }));
  }, []);

  const value: Ctx = {
    ...state,
    ready,
    me,
    register,
    login,
    demoLogin,
    logout,
    deleteAccount,
    updateProfile,
    toggleGoing,
    createGroup,
    joinGroup,
    leaveGroup,
    sendMessage,
    report,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp muss innerhalb von AppProvider verwendet werden");
  return ctx;
}

// ───────── Hilfsfunktionen ─────────

export function eventDate(dayOffset: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + dayOffset);
  return d;
}

// "20:00" -> "20:00 Uhr", Texte wie "ganztags" bleiben unverändert
export function formatTime(time: string) {
  return /^\d/.test(time) ? `${time} Uhr` : time;
}

export function formatDay(dayOffset: number) {
  if (dayOffset === 0) return "Heute";
  if (dayOffset === 1) return "Morgen";
  return eventDate(dayOffset).toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short" });
}

export function shared(a: string[], b: string[]) {
  return a.filter((x) => b.includes(x));
}

export function personById(id: string, me: Person | null): Person | undefined {
  if (id === ME) return me ?? undefined;
  return PEOPLE.find((p) => p.id === id);
}

export function attendeesOf(eventId: string, going: string[], me: Person | null): Person[] {
  const list = (ATTENDANCE[eventId] ?? []).map((id) => PEOPLE.find((p) => p.id === id)!).filter(Boolean);
  if (me && going.includes(eventId)) return [me, ...list];
  return list;
}

export function eventById(id: string) {
  return EVENTS.find((e) => e.id === id);
}

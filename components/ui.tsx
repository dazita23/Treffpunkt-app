"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  CalendarHeart,
  ChevronLeft,
  Compass,
  Heart,
  Laugh,
  MessageCircle,
  Mountain,
  Music,
  Palette,
  PartyPopper,
  Trophy,
  User,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { Category, EventItem } from "@/lib/data";
import { ME, attendeesOf, eventDate, formatDay, formatTime, shared, useApp } from "@/lib/store";

// ───────── App-Rahmen: Handy-Breite, Login-Schutz, Navigation ─────────

const PUBLIC = ["/willkommen", "/anmelden", "/registrieren"];
const WITH_NAV = ["/", "/meine-events", "/chats", "/profil"];

export function Shell({ children }: { children: React.ReactNode }) {
  const { ready, loggedIn } = useApp();
  const path = usePathname();
  const router = useRouter();
  const isPublic = PUBLIC.includes(path);

  useEffect(() => {
    if (!ready) return;
    if (!loggedIn && !isPublic) router.replace("/willkommen");
    if (loggedIn && isPublic) router.replace("/");
  }, [ready, loggedIn, isPublic, router]);

  const showNav = loggedIn && WITH_NAV.includes(path);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[440px] flex-col bg-white shadow-[0_0_60px_rgba(73,50,158,0.12)]">
      <main className={`flex-1 ${showNav ? "pb-24" : ""}`}>{ready ? children : null}</main>
      {showNav && <BottomNav path={path} />}
    </div>
  );
}

const TABS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Entdecken", icon: Compass },
  { href: "/meine-events", label: "Meine Events", icon: CalendarHeart },
  { href: "/chats", label: "Chats", icon: MessageCircle },
  { href: "/profil", label: "Profil", icon: User },
];

function BottomNav({ path }: { path: string }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-[440px] border-t border-surface-2 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <ul className="grid grid-cols-4">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = path === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold ${active ? "text-brand" : "text-muted"}`}
                aria-current={active ? "page" : undefined}
              >
                <span className={`rounded-full px-4 py-1 ${active ? "bg-brand-soft" : ""}`}>
                  <Icon size={22} strokeWidth={active ? 2.4 : 2} />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ───────── Kopfzeilen ─────────

export function LogoHeader({ right }: { right?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-white/95 px-5 py-3 backdrop-blur">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Treffpunkt" className="h-8 w-auto" />
      {right}
    </header>
  );
}

export function BackHeader({ title, right }: { title?: string; right?: React.ReactNode }) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-10 flex items-center gap-2 bg-white/95 px-3 py-3 backdrop-blur">
      <button
        onClick={() => (window.history.length > 1 ? router.back() : router.push("/"))}
        className="grid size-10 place-items-center rounded-full text-ink hover:bg-surface"
        aria-label="Zurück"
      >
        <ChevronLeft size={24} />
      </button>
      <h1 className="flex-1 truncate text-base font-bold text-ink">{title}</h1>
      {right}
    </header>
  );
}

export function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="px-5 pt-2 pb-4">
      <h1 className="text-2xl font-extrabold text-ink">{title}</h1>
      {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
    </div>
  );
}

// ───────── Bausteine ─────────

// abwechslungsreiche, aber gedeckte Avatar-Farben (alle mit weißer Schrift lesbar)
const AVATAR_COLORS = ["#5229A5", "#D9366B", "#0E8A7E", "#E2701E", "#2F6BD8", "#8A3FC9", "#C2412D", "#3F7D2E"];

export function Avatar({ id, name, size = 40, ring = false }: { id: string; name: string; size?: number; ring?: boolean }) {
  const idx = [...id].reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_COLORS.length;
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-full font-bold text-white ${ring ? "ring-2 ring-white" : ""}`}
      style={{ width: size, height: size, background: id === ME ? "#1A1530" : AVATAR_COLORS[idx], fontSize: size * 0.4 }}
      aria-hidden
    >
      {name.slice(0, 1).toUpperCase()}
    </span>
  );
}

export function Chip({
  children,
  active,
  onClick,
  small,
  tone = "ink",
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  small?: boolean;
  tone?: "ink" | "social";
}) {
  const on = tone === "social" ? "border-social-soft bg-social-soft text-social" : "border-ink bg-ink text-white";
  const cls = `inline-flex shrink-0 items-center gap-1.5 rounded-full border font-semibold transition ${
    small ? "px-2.5 py-0.5 text-xs" : "px-4 py-2 text-sm"
  } ${active ? on : "border-line bg-white text-ink hover:border-line-strong"}`;
  return onClick ? (
    <button type="button" onClick={onClick} className={cls} aria-pressed={active}>
      {children}
    </button>
  ) : (
    <span className={cls}>{children}</span>
  );
}

// Jede Kategorie hat ihre eigene Farbe – wie ein Event-Plakat
export const CATEGORY_STYLE: Record<Category, { icon: LucideIcon; from: string; to: string; fg: string; dot: string }> = {
  Konzert: { icon: Music, from: "#5229A5", to: "#C2479B", fg: "#FFFFFF", dot: "#7A3BC4" },
  Party: { icon: PartyPopper, from: "#1F1A5C", to: "#3A63E0", fg: "#FFFFFF", dot: "#3A63E0" },
  Kultur: { icon: Palette, from: "#0B6E66", to: "#3BBFA6", fg: "#FFFFFF", dot: "#169C8A" },
  Comedy: { icon: Laugh, from: "#F59E0B", to: "#FDD25C", fg: "#3B2300", dot: "#F2A20F" },
  Sport: { icon: Trophy, from: "#1E7A3C", to: "#6CC34A", fg: "#FFFFFF", dot: "#3A9B3F" },
  Food: { icon: UtensilsCrossed, from: "#D9365B", to: "#F7894A", fg: "#FFFFFF", dot: "#E9534F" },
  Outdoor: { icon: Mountain, from: "#1A5F8F", to: "#4FB3C9", fg: "#FFFFFF", dot: "#2B88B4" },
};

export function CategoryDot({ category }: { category: Category }) {
  return <span className="size-2 rounded-full" style={{ background: CATEGORY_STYLE[category].dot }} aria-hidden />;
}

export function EventVisual({
  category,
  className = "",
  iconSize = 40,
}: {
  category: Category;
  className?: string;
  iconSize?: number;
}) {
  const s = CATEGORY_STYLE[category];
  const Icon = s.icon;
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})`, color: s.fg }}
    >
      {/* großes, angeschnittenes Icon als Plakat-Motiv */}
      <Icon className="absolute -right-4 -bottom-5 opacity-25" size={iconSize * 3} strokeWidth={1.4} aria-hidden />
      <Icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-95" size={iconSize} strokeWidth={1.7} aria-hidden />
    </div>
  );
}

// Datums-Abriss wie bei einem Ticket
export function DateStub({ dayOffset }: { dayOffset: number }) {
  const d = eventDate(dayOffset);
  const wd = d.toLocaleDateString("de-DE", { weekday: "short" }).replace(".", "");
  const month = d.toLocaleDateString("de-DE", { month: "short" }).replace(".", "");
  return (
    <span className="flex w-14 flex-col items-center rounded-xl bg-white py-1.5 text-ink shadow-[0_4px_14px_rgba(26,21,48,0.18)]">
      <span className="text-[11px] font-bold text-social">{dayOffset === 0 ? "Heute" : wd}</span>
      <span className="text-2xl leading-none font-extrabold">{d.getDate()}</span>
      <span className="text-[11px] font-semibold text-muted">{month}</span>
    </span>
  );
}

export function AvatarStack({ people, max = 4 }: { people: { id: string; name: string }[]; max?: number }) {
  const shown = people.slice(0, max);
  return (
    <span className="flex -space-x-2">
      {shown.map((p) => (
        <Avatar key={p.id} id={p.id} name={p.name} size={26} ring />
      ))}
      {people.length > max && (
        <span className="grid size-[26px] place-items-center rounded-full bg-surface-2 text-[10px] font-bold text-ink ring-2 ring-white">
          +{people.length - max}
        </span>
      )}
    </span>
  );
}

export function MatchBadge({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-social-soft px-2.5 py-1 text-xs font-bold text-social">
      <Heart size={12} fill="currentColor" aria-hidden /> {count} mit gleichen Interessen
    </span>
  );
}

export function EventCard({ ev }: { ev: EventItem }) {
  const { going, me } = useApp();
  const people = attendeesOf(ev.id, going, me);
  const matches = me ? people.filter((p) => p.id !== ME && shared(p.interests, me.interests).length > 0).length : 0;
  const amGoing = going.includes(ev.id);
  return (
    <Link
      href={`/event/${ev.id}`}
      className="block overflow-hidden rounded-3xl border border-line bg-white transition hover:shadow-[0_8px_24px_rgba(26,21,48,0.10)]"
    >
      <div className="relative">
        <EventVisual category={ev.category} className="h-32" iconSize={34} />
        <span className="absolute top-3 left-3">
          <DateStub dayOffset={ev.dayOffset} />
        </span>
        <span
          className="absolute right-3 bottom-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold"
          style={{ color: CATEGORY_STYLE[ev.category].dot === "#F2A20F" ? "#8A5A00" : CATEGORY_STYLE[ev.category].dot }}
        >
          {ev.category}
        </span>
      </div>
      <div className="p-4 pt-3">
        <h3 className="text-[17px] leading-snug font-bold text-ink">{ev.title}</h3>
        <p className="mt-0.5 text-sm text-muted">
          {formatDay(ev.dayOffset)}, {formatTime(ev.time)} · {ev.venue}, {ev.city}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
          <AvatarStack people={people} max={3} />
          <span className={`text-sm font-semibold ${amGoing ? "text-social" : "text-ink"}`}>
            {amGoing ? "Du gehst hin" : `${people.length} gehen hin`}
          </span>
          {matches > 0 && (
            <span className="ml-auto">
              <MatchBadge count={matches} />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function EmptyState({ icon: Icon, title, text, action }: { icon: LucideIcon; title: string; text: string; action?: React.ReactNode }) {
  return (
    <div className="mx-5 flex flex-col items-center rounded-2xl bg-surface px-6 py-10 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-brand-soft text-brand">
        <Icon size={26} />
      </span>
      <h2 className="mt-4 font-bold text-ink">{title}</h2>
      <p className="mt-1 text-sm text-muted">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-bold text-white shadow-[0_6px_20px_rgba(82,41,165,0.3)] transition hover:bg-brand-dark disabled:opacity-40 disabled:shadow-none";
export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand px-6 py-3 font-bold text-brand transition hover:bg-surface";
export const input =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-muted/70 outline-none focus:border-brand focus:ring-2 focus:ring-line";

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  CalendarHeart,
  ChevronLeft,
  Compass,
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
import { ME, attendeesOf, formatDay, shared, useApp } from "@/lib/store";

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
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-[440px] border-t border-lav-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
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
                <span className={`rounded-full px-4 py-1 ${active ? "bg-lav-100" : ""}`}>
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
        className="grid size-10 place-items-center rounded-full text-brand-dark hover:bg-lav-50"
        aria-label="Zurück"
      >
        <ChevronLeft size={24} />
      </button>
      <h1 className="flex-1 truncate text-base font-bold text-brand-dark">{title}</h1>
      {right}
    </header>
  );
}

export function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="px-5 pt-2 pb-4">
      <h1 className="text-2xl font-extrabold text-brand-dark">{title}</h1>
      {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
    </div>
  );
}

// ───────── Bausteine ─────────

const AVATAR_COLORS = ["#5229A5", "#7C4DFF", "#49329E", "#9B6BE8", "#2E1A6E", "#B48CF2", "#6A3FD0", "#8E77C3"];

export function Avatar({ id, name, size = 40, ring = false }: { id: string; name: string; size?: number; ring?: boolean }) {
  const idx = [...id].reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_COLORS.length;
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-full font-bold text-white ${ring ? "ring-2 ring-white" : ""}`}
      style={{ width: size, height: size, background: id === ME ? "#5B21D6" : AVATAR_COLORS[idx], fontSize: size * 0.4 }}
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
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  small?: boolean;
}) {
  const cls = `shrink-0 rounded-full border font-semibold transition ${small ? "px-2.5 py-0.5 text-xs" : "px-4 py-2 text-sm"} ${
    active ? "border-brand bg-brand text-white" : "border-lav-200 bg-white text-brand-dark"
  }`;
  return onClick ? (
    <button type="button" onClick={onClick} className={cls} aria-pressed={active}>
      {children}
    </button>
  ) : (
    <span className={cls}>{children}</span>
  );
}

export const CATEGORY_STYLE: Record<Category, { icon: LucideIcon; from: string; to: string }> = {
  Konzert: { icon: Music, from: "#5229A5", to: "#8B5CF6" },
  Party: { icon: PartyPopper, from: "#2E1A6E", to: "#7C3AED" },
  Kultur: { icon: Palette, from: "#49329E", to: "#B48CF2" },
  Comedy: { icon: Laugh, from: "#6D28D9", to: "#C084FC" },
  Sport: { icon: Trophy, from: "#3B2A8C", to: "#6366F1" },
  Food: { icon: UtensilsCrossed, from: "#5B21B6", to: "#D8B4FE" },
  Outdoor: { icon: Mountain, from: "#312E81", to: "#8B5CF6" },
};

export function EventVisual({ category, className = "" }: { category: Category; className?: string }) {
  const s = CATEGORY_STYLE[category];
  const Icon = s.icon;
  return (
    <div
      className={`relative grid place-items-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}
    >
      <Icon className="text-white/90" size={40} strokeWidth={1.6} />
      <span className="absolute -right-6 -bottom-8 size-24 rounded-full bg-white/10" />
      <span className="absolute -top-6 -left-4 size-16 rounded-full bg-white/10" />
    </div>
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
        <span className="grid size-[26px] place-items-center rounded-full bg-lav-100 text-[10px] font-bold text-brand ring-2 ring-white">
          +{people.length - max}
        </span>
      )}
    </span>
  );
}

export function EventCard({ ev }: { ev: EventItem }) {
  const { going, me } = useApp();
  const people = attendeesOf(ev.id, going, me);
  const matches = me ? people.filter((p) => p.id !== ME && shared(p.interests, me.interests).length > 0).length : 0;
  const amGoing = going.includes(ev.id);
  return (
    <Link href={`/event/${ev.id}`} className="flex gap-3 rounded-2xl bg-lav-50 p-3 transition hover:bg-lav-100">
      <EventVisual category={ev.category} className="size-24 shrink-0 rounded-xl" />
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-xs font-bold text-brand">
          {formatDay(ev.dayOffset)} · {ev.time} Uhr
        </p>
        <h3 className="mt-0.5 line-clamp-2 font-bold leading-snug text-ink">{ev.title}</h3>
        <p className="truncate text-xs text-muted">
          {ev.venue}, {ev.city}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-1.5">
          <AvatarStack people={people} max={3} />
          <span className="text-xs font-semibold text-brand-dark">
            {amGoing ? "Du gehst hin" : `${people.length} gehen hin`}
          </span>
        </div>
        {matches > 0 && (
          <span className="mt-1 self-start rounded-full bg-lav-200 px-2 py-0.5 text-[11px] font-bold text-brand-deep">
            {matches} mit gleichen Interessen
          </span>
        )}
      </div>
    </Link>
  );
}

export function EmptyState({ icon: Icon, title, text, action }: { icon: LucideIcon; title: string; text: string; action?: React.ReactNode }) {
  return (
    <div className="mx-5 flex flex-col items-center rounded-2xl bg-lav-50 px-6 py-10 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-lav-100 text-brand">
        <Icon size={26} />
      </span>
      <h2 className="mt-4 font-bold text-brand-dark">{title}</h2>
      <p className="mt-1 text-sm text-muted">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-bold text-white shadow-[0_6px_20px_rgba(82,41,165,0.3)] transition hover:bg-brand-dark disabled:opacity-40 disabled:shadow-none";
export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand px-6 py-3 font-bold text-brand transition hover:bg-lav-50";
export const input =
  "w-full rounded-xl border border-lav-200 bg-white px-4 py-3 text-ink placeholder:text-muted/70 outline-none focus:border-brand focus:ring-2 focus:ring-lav-200";

# Treffpunkt – Web-App (Prototyp, Stufe 1)

Entdecke Events in Köln/Bonn und verbinde dich mit Menschen, bevor du hingehst.

## Was die App kann

1. Registrierung, Login und Profil mit Interessen (ab 18, mit Einwilligung)
2. Eventübersicht mit Filter nach Kategorie, Datum und Stadt
3. Event-Detailseite mit Link zum Ticketanbieter
4. „Ich gehe hin“ und Teilnehmerübersicht mit gemeinsamen Interessen
5. Event-Gruppe erstellen oder beitreten, mit Gruppenchat
6. Meldefunktion für unangemessene Profile

Navigation: Entdecken · Meine Events · Chats · Profil

**Wichtig:** Das ist der Prototyp aus Stufe 1. Alle anderen Profile sind simulierte Beispielprofile,
und alle Daten werden nur im Browser des jeweiligen Geräts gespeichert. Im Chat antwortet
nach dem Senden automatisch ein Gruppenmitglied (simuliert). Echte Konten und ein echter Chat
kommen in Stufe 2 mit Supabase.

## Wo was steht

| Datei | Inhalt |
|---|---|
| `lib/data.ts` | **Events, Beispielprofile, Gruppen** – hier tragt ihr Events ein |
| `public/events/` | Event-Bilder (Anleitung in LIES-MICH.txt) |
| `app/globals.css` | Farben (aus der Pitch-Präsentation) |
| `public/logo.png` | Logo |
| `app/page.tsx` | Seite „Entdecken“ |
| `app/event/[id]/page.tsx` | Event-Detailseite mit Teilnehmenden und Gruppen |
| `app/chats/` | Chat-Übersicht und Gruppenchat |
| `app/profil/page.tsx` | eigenes Profil, Abmelden, Konto löschen |
| `app/person/[id]/page.tsx` | Profil anderer Personen mit Melden-Funktion |
| `app/registrieren/`, `app/anmelden/`, `app/willkommen/` | Einstieg |
| `lib/store.tsx` | Speichern der Daten (wird in Stufe 2 durch Supabase ersetzt) |

## Ein Event ändern oder hinzufügen

In `lib/data.ts` einen Block in `EVENTS` kopieren und anpassen. `dayOffset` = in wie vielen
Tagen ab heute das Event stattfindet (für den Prototyp, damit die Events nie veralten).

## Für Entwickler:innen

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # Produktions-Build
```

Technik: Next.js, React, Tailwind CSS, lucide-react (Icons). Hosting: Vercel.

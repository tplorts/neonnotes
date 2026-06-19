import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import DebutJazzSession from "../components/events/DebutJazzSession.astro";
import FamilyFunkadelic from "../components/events/FamilyFunkadelic.astro";

export interface NeonEvent {
  /** URL-friendly identifier, also used as a stable list key. */
  slug: string;
  /** Plain-text title, used for headings and document titles. */
  title: string;
  /** Event date as YYYY-MM-DD (Las Vegas local). Drives upcoming/past sorting. */
  date: string;
  /** The event's bespoke detail component, reused on the home and events pages. */
  Component: AstroComponentFactory;
}

/**
 * Each event gets its own detail component (see src/components/events/) so it
 * can carry a unique design. Add new sessions here in any order — they're
 * sorted by date at render time.
 */
export const events: NeonEvent[] = [
  {
    slug: "debut-jazz-session",
    title: "The Debut Session: Live Jazz",
    date: "2026-05-24",
    Component: DebutJazzSession,
  },
  {
    slug: "family-funkadelic",
    title: "The Family Funkadelic: Live Disco Funk",
    // Rescheduled from July 19 to mid-September; exact date TBD.
    // Placeholder keeps it sorted as upcoming — update once confirmed.
    date: "2026-09-15",
    Component: FamilyFunkadelic,
  },
];

/** Today as YYYY-MM-DD, so comparisons stay timezone-agnostic. */
function todayISO(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** Split events into upcoming (soonest first) and past (most recent first). */
export function classifyEvents(): { upcoming: NeonEvent[]; past: NeonEvent[] } {
  const today = todayISO();
  const upcoming = events
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = events
    .filter((e) => e.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past };
}

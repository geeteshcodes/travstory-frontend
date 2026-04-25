"use client";

import { use, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { getTrip, type Trip } from "@/lib/api";
import ChatPanel, { type ChatPanelHandle } from "@/components/itinerary/ChatPanel";
import ItineraryView, {
  type ItineraryDay,
  type TimelineSegment,
} from "@/components/itinerary/ItineraryView";

/* ── Text helpers ──────────────────────────────────────────────── */

function stripMd(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function titleCase(s: string): string {
  return s
    .split(/\s+/)
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/* ── Itinerary parsing ─────────────────────────────────────────── */

const DAY_RX = /\*{0,2}\s*Day\s+(\d+)[^\n]*?[:\-–][ \t]*([^\n]*)/gi;
const TIME_SPLIT_RX =
  /(?:^|\s[-–]\s)\*{0,2}\s*(morning|afternoon|evening|night|\d{1,2}(?::\d{2})?\s*(?:am|pm))\b[^:]*:[ \t]*/gi;

function splitIntoSegments(body: string): TimelineSegment[] {
  const clean = body.replace(/\r/g, "").trim();
  if (!clean) return [];

  const markers: { index: number; matchLen: number; label: string }[] = [];
  const rx = new RegExp(TIME_SPLIT_RX.source, "gi");
  let m: RegExpExecArray | null;
  while ((m = rx.exec(clean)) !== null) {
    markers.push({
      index: m.index + (m[0].startsWith(" ") ? 1 : 0),
      matchLen: m[0].length,
      label: m[1].trim(),
    });
  }

  if (!markers.length) {
    return [{ time: "All day", title: "", description: stripMd(clean) }];
  }

  const segments: TimelineSegment[] = [];
  for (let i = 0; i < markers.length; i++) {
    const mk = markers[i];
    const end = i + 1 < markers.length ? markers[i + 1].index : clean.length;
    const raw = clean.slice(mk.index + mk.matchLen, end);
    const cleaned = stripMd(raw).replace(/^[-–]\s*/, "").trim();
    if (!cleaned) continue;

    const periodIdx = cleaned.search(/\.(\s|$)/);
    const title =
      periodIdx > 0 && periodIdx < 120
        ? cleaned.slice(0, periodIdx).trim()
        : cleaned.slice(0, 90);
    const description =
      periodIdx > 0 && cleaned.length > periodIdx + 1
        ? cleaned.slice(periodIdx + 1).trim()
        : "";

    const place = extractPlace(raw, title);

    segments.push({
      time: titleCase(mk.label) + ":",
      title,
      description,
      place,
    });
  }
  return segments;
}

/**
 * Pick the best "place" from a segment chunk.
 * Prefers the first bold-markdown term that looks like a proper place
 * (not a time, price, or generic phrase). Falls back to parsing the title.
 */
function extractPlace(rawChunk: string, title: string): string | undefined {
  const bolds = Array.from(rawChunk.matchAll(/\*\*([^*]+)\*\*/g))
    .map((m) => m[1].trim())
    .filter(Boolean);

  const bad = /^\d|am\b|pm\b|[₹$€£]|^day\b|^morning\b|^afternoon\b|^evening\b|^night\b/i;
  const isLikelyPlace = (s: string) => {
    if (bad.test(s)) return false;
    if (s.length < 3 || s.length > 60) return false;
    if (s.split(/\s+/).length > 7) return false;
    // Has at least one capitalised word
    return /[A-Z]/.test(s);
  };

  const firstBold = bolds.find(isLikelyPlace);
  if (firstBold) return firstBold;

  // Fallback: look for "Arrive at X", "at X", "Visit X", "to X"
  const m = title.match(
    /(?:arrive at|visit|explore|to|at|check[- ]?in at)\s+([A-Z][\w'\-]+(?:\s+[A-Z][\w'\-]+){0,4})/i
  );
  if (m) return m[1].trim();

  return undefined;
}

function parseItinerary(raw: string | null): ItineraryDay[] {
  if (!raw) return [];
  const text = raw.replace(/\r/g, "");

  const heads: { dayNum: number; titleRaw: string; start: number; headEnd: number }[] = [];
  const rx = new RegExp(DAY_RX.source, "gi");
  let m: RegExpExecArray | null;
  while ((m = rx.exec(text)) !== null) {
    heads.push({
      dayNum: Number(m[1]),
      titleRaw: m[2] ?? "",
      start: m.index,
      headEnd: m.index + m[0].length,
    });
  }

  if (!heads.length) return [];

  const days: ItineraryDay[] = [];
  for (let i = 0; i < heads.length; i++) {
    const h = heads[i];
    const bodyEnd = i + 1 < heads.length ? heads[i + 1].start : text.length;
    const body = text.slice(h.headEnd, bodyEnd).trim();

    let title = stripMd(h.titleRaw).replace(/\*+$/, "").trim();
    title = title.replace(/\s*\(\d{4}-\d{2}-\d{2}\)\s*/, "").trim();
    if (!title) title = `Day ${h.dayNum}`;

    const subMatch = title.match(
      /\b(?:in|at|to|around|visit)\s+([A-Z][\w'\-]+(?:\s+[A-Z][\w'\-]+)?)/
    );
    const sub = subMatch
      ? `(${subMatch[1]})`
      : title.length <= 22
      ? `(${title})`
      : undefined;

    days.push({
      id: h.dayNum,
      label: `Day ${h.dayNum}`,
      sub,
      title: title.length > 80 ? title.slice(0, 77) + "…" : title,
      segments: splitIntoSegments(body),
    });
  }

  // The LLM sometimes emits the same "Day N:" header twice (e.g. a summary line
  // plus a detailed block). Dedupe by dayNum so DaySelector keys stay unique;
  // prefer the entry with more segments since that's the richer block.
  const byId = new Map<number, ItineraryDay>();
  for (const day of days) {
    const prev = byId.get(day.id);
    if (!prev || day.segments.length > prev.segments.length) {
      byId.set(day.id, day);
    }
  }
  return Array.from(byId.values()).sort((a, b) => a.id - b.id);
}

function formatDateRange(start: string | null, end: string | null): string {
  if (!start || !end) return "";
  const s = new Date(start);
  const e = new Date(end);
  const days = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${days} Days • ${fmt(s)}-${fmt(e)}`;
}

/* Hero images */
const HERO_BY_DESTINATION: Record<string, string> = {
  delhi: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop",
  mumbai: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=2070&auto=format&fit=crop",
  goa: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2070&auto=format&fit=crop",
  japan: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
  tokyo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2070&auto=format&fit=crop",
  paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2070&auto=format&fit=crop",
  london: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2070&auto=format&fit=crop",
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
  rome: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=2070&auto=format&fit=crop",
  italy: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=2070&auto=format&fit=crop",
  newyork: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
  thailand: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2070&auto=format&fit=crop",
};
const DEFAULT_HERO = "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2070&auto=format&fit=crop";

function heroImageFor(destination: string): string {
  const key = destination.toLowerCase().replace(/[^a-z]/g, "");
  return HERO_BY_DESTINATION[key] ?? DEFAULT_HERO;
}

function attractionsFor(destination: string) {
  return [
    {
      id: 1,
      title: `Top sights in ${destination}`,
      description: `Hand-picked experiences in and around ${destination}.`,
      image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Local food scene",
      description: "Classic dishes and hidden-gem eateries worth a detour.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Nature & outdoors",
      description: "Scenic walks, viewpoints, and day-trip escapes.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    },
  ];
}

/* ── Page Component ────────────────────────────────────────────── */

export default function ItineraryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const chatRef = useRef<ChatPanelHandle>(null);
  const askAgent = (prompt: string) => {
    chatRef.current?.sendPrompt(prompt);
  };

  // Reset state synchronously when the trip id changes (adjust-state-during-render).
  const [prevId, setPrevId] = useState(id);
  if (id !== prevId) {
    setPrevId(id);
    setLoading(true);
    setTrip(null);
    setError(null);
  }

  useEffect(() => {
    let cancelled = false;
    getTrip(id)
      .then((t) => { if (!cancelled) setTrip(t); })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load trip.");
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  const days = useMemo(() => parseItinerary(trip?.itinerary ?? null), [trip]);

  if (loading) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <div className="w-10 h-10 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading your journey...</span>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="pt-[72px] min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-50 to-slate-100 text-center px-6">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500">
          <span className="material-symbols-outlined text-3xl">error</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Trip not found</h1>
        <p className="text-slate-500 max-w-md">
          {error ?? "We couldn't find this trip. Plan a new one to get started."}
        </p>
        <Link href="/preferences" className="mt-2 px-6 py-2.5 bg-brand-primary text-white rounded-xl text-sm font-medium hover:bg-brand-secondary transition shadow-lg shadow-brand-primary/20">
          Plan a new trip
        </Link>
      </div>
    );
  }

  const destinationRaw = trip.destination ?? "Your Trip";
  const destination = titleCase(destinationRaw);
  const dateRange = formatDateRange(trip.start_date, trip.end_date);
  const subtitle = dateRange ? `${dateRange} • Custom itinerary` : "Your custom itinerary";

  const fallbackDay: ItineraryDay = {
    id: 1,
    label: "Day 1",
    title: destination,
    segments: [{ time: "Overview", title: "", description: stripMd(trip.itinerary ?? "") || "Your itinerary will appear here once generated. Ask the assistant to plan your trip!" }],
  };
  const dayList = days.length ? days : [fallbackDay];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

return (
  // Single outer container with top margin and left padding
  <div style={{ marginTop: "88px", paddingLeft: "2rem", paddingRight: "1rem" }} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
    {/* Header - now fully visible below navbar */}
    <div className="mb-6">
      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">{destination}</h1>
        <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
          <span className="material-symbols-outlined text-base">event</span>
          <span>{subtitle}</span>
        </div>
      </motion.div>
    </div>

    {/* Two columns - no centering, just flex */}
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Chat Panel */}
      <div className="lg:w-1/2 xl:w-5/12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="h-[500px] md:h-[550px] rounded-2xl shadow-xl bg-white/80 backdrop-blur-sm border border-white/40 overflow-hidden flex flex-col"
        >
          <ChatPanel
            ref={chatRef}
            destination={destination}
            sessionId={trip.session_id}
            attractions={attractionsFor(destination)}
          />
        </motion.div>
      </div>

      {/* Itinerary Panel */}
      <div className="lg:w-1/2 xl:w-7/12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="h-[500px] md:h-[550px] rounded-2xl shadow-xl bg-white/80 backdrop-blur-sm border border-white/40 overflow-hidden"
        >
          <div className="h-full overflow-y-auto custom-scrollbar p-5">
            <ItineraryView
              heroImage={heroImageFor(destinationRaw)}
              destination={destination}
              subtitle={subtitle}
              days={dayList}
              onBookFlight={() => askAgent(`Find flights to ${destination}`)}
              onBookHotel={() => askAgent(`Find hotels in ${destination}`)}
            />
          </div>
        </motion.div>
      </div>
    </div>

    {/* Scrollbar styles (keep as before) */}
    <style jsx global>{`
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: #e2e8f0;
        border-radius: 10px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #94a3b8;
        border-radius: 10px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #64748b;
      }
    `}</style>
  </div>
);
}
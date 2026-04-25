"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Share2,
  Edit2,
  MapPin,
  Plane,
  Hotel,
  X as CloseIcon,
} from "lucide-react";
import DaySelector, { type DayOption } from "./DaySelector";

export interface TimelineSegment {
  time: string;
  title: string;
  description: string;
  /** Specific place name for this segment (used to focus the map). */
  place?: string;
}

export interface ItineraryDay {
  id: number;
  label: string;
  sub?: string;
  title: string;
  segments: TimelineSegment[];
}

interface ItineraryViewProps {
  heroImage: string;
  destination: string;
  subtitle: string;
  days: ItineraryDay[];
  onBookFlight?: () => void;
  onBookHotel?: () => void;
}

export default function ItineraryView({
  heroImage,
  destination,
  subtitle,
  days,
  onBookFlight,
  onBookHotel,
}: ItineraryViewProps) {
  const [activeDayId, setActiveDayId] = useState(days[0]?.id ?? 1);
  const [mapOpen, setMapOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Hover-to-focus: `pendingPlace` is what's being hovered, `activePlace` is the
  // debounced value actually shown on the map. Don't reset on mouseleave —
  // keep the last hovered place sticky until the user hovers something else or resets.
  const [pendingPlace, setPendingPlace] = useState<string | null>(null);
  const [activePlace, setActivePlace] = useState<string | null>(null);

  useEffect(() => {
    if (pendingPlace === activePlace) return;
    const t = setTimeout(() => setActivePlace(pendingPlace), 250);
    return () => clearTimeout(t);
  }, [pendingPlace, activePlace]);

  const activeDay = days.find((d) => d.id === activeDayId) ?? days[0];

  // Reset any focused place whenever the user switches day
  useEffect(() => {
    setPendingPlace(null);
    setActivePlace(null);
  }, [activeDayId]);

  const daySelectorOptions: DayOption[] = days.map((d) => ({
    id: d.id,
    label: d.label,
    sub: d.sub,
  }));

  const handleNext = () => {
    const idx = days.findIndex((d) => d.id === activeDayId);
    const next = days[(idx + 1) % days.length];
    setActiveDayId(next.id);
  };

  const mapQuery = activePlace
    ? `${activePlace}, ${destination}`
    : destination || "world";
  const mapZoom = activePlace ? 15 : 11;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    mapQuery
  )}&output=embed&z=${mapZoom}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Hero Header with fallback */}
      <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-md group bg-gradient-to-br from-slate-300 to-slate-400">
        {!imgError && heroImage ? (
          <img
            src={heroImage}
            alt={destination}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-primary/80 to-brand-secondary/60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute top-3 right-3 flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-black rounded-full text-xs font-bold shadow hover:bg-white transition">
            <Heart size={12} fill="currentColor" />
            Save
          </button>
          <button className="p-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full hover:bg-white/30">
            <Share2 size={14} />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-white text-xl md:text-2xl font-extrabold leading-tight mb-0.5 drop-shadow">
            {destination}
          </h2>
          <p className="text-white/90 text-xs md:text-sm font-medium line-clamp-2 drop-shadow">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={onBookFlight}
          className="flex items-center justify-center gap-2 py-2 px-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:border-brand-primary hover:text-brand-primary shadow-sm transition-all duration-200"
        >
          <Plane size={14} /> Book Flight
        </button>
        <button
          onClick={onBookHotel}
          className="flex items-center justify-center gap-2 py-2 px-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:border-brand-primary hover:text-brand-primary shadow-sm transition-all duration-200"
        >
          <Hotel size={14} /> Book Hotel
        </button>
        <button
          onClick={() => setMapOpen(true)}
          className="flex items-center justify-center gap-2 py-2 px-2 bg-brand-primary text-white rounded-xl text-xs font-semibold hover:bg-brand-secondary shadow-md shadow-brand-primary/20 transition-all duration-200"
        >
          <MapPin size={14} /> View Map
        </button>
      </div>

      {/* Day Selector */}
      {days.length > 0 && (
        <DaySelector
          days={daySelectorOptions}
          activeDay={activeDayId}
          onDayChange={setActiveDayId}
          onNext={handleNext}
        />
      )}

      {/* Timeline Content + inline map */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-slate-100">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
          <h3 className="text-lg md:text-xl font-bold text-slate-800 break-words">
            {activeDay?.title ?? "No itinerary yet"}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMapOpen(true)}
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 rounded-xl text-xs font-medium text-slate-600 hover:text-brand-primary transition"
            >
              <MapPin size={12} /> Full Map
            </button>
            <button className="p-1.5 bg-slate-100 rounded-full text-slate-400 hover:text-brand-primary transition">
              <Edit2 size={14} />
            </button>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 italic mb-4">
          💡 Hover a stop to zoom the map to that location.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_260px] gap-5">
          {/* Timeline */}
          <div className="relative pl-6 min-w-0">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-slate-200" />

            {activeDay?.segments.length ? (
              <div className="space-y-5">
                {activeDay.segments.map((s, i) => (
                  <TimelineItem
                    key={i}
                    time={s.time}
                    title={s.title}
                    description={s.description}
                    place={s.place}
                    isActive={s.place != null && s.place === activePlace}
                    onHover={() => {
                      if (s.place) setPendingPlace(s.place);
                    }}
                    onFocus={() => {
                      if (s.place) setPendingPlace(s.place);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="pl-4 text-slate-500 text-sm italic">No details for this day yet.</div>
            )}
          </div>

          {/* Inline sticky map pane */}
          <div className="md:sticky md:top-4 self-start">
            <div className="relative h-[320px] md:h-[380px] rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
              <div className="absolute top-2 left-2 right-2 z-10 flex items-start gap-2">
                <div className="flex-1 min-w-0 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-[11px] font-semibold text-slate-700 shadow-sm flex items-center gap-1.5">
                  <MapPin size={11} className="text-brand-primary shrink-0" />
                  <span className="truncate" title={mapQuery}>
                    {activePlace ?? destination}
                  </span>
                </div>
                {activePlace && (
                  <button
                    onClick={() => {
                      setPendingPlace(null);
                      setActivePlace(null);
                    }}
                    className="w-6 h-6 bg-white/95 backdrop-blur-sm rounded-full text-slate-500 hover:text-slate-900 shadow-sm flex items-center justify-center text-sm leading-none shrink-0"
                    aria-label="Reset map to city view"
                    title="Reset"
                  >
                    ×
                  </button>
                )}
              </div>
              <iframe
                key={mapQuery}
                title={`Map of ${mapQuery}`}
                src={mapSrc}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <button
                onClick={() => setMapOpen(true)}
                className="absolute bottom-2 right-2 z-10 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-700 shadow-sm hover:bg-white transition"
              >
                Expand
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      <AnimatePresence>
        {mapOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setMapOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl h-[80vh] shadow-xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setMapOpen(false)}
                className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:text-slate-900"
              >
                <CloseIcon size={16} />
              </button>
              <iframe
                title={`Map of ${destination}`}
                src={mapSrc}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TimelineItem({
  time,
  title,
  description,
  place,
  isActive,
  onHover,
  onFocus,
}: {
  time: string;
  title: string;
  description: string;
  place?: string;
  isActive?: boolean;
  onHover?: () => void;
  onFocus?: () => void;
}) {
  const interactive = Boolean(place);
  return (
    <div
      className={`relative -mx-2 px-2 py-1 rounded-lg transition-colors duration-200 ${
        interactive ? "cursor-pointer" : ""
      } ${isActive ? "bg-brand-primary/5" : "hover:bg-slate-50"}`}
      onMouseEnter={onHover}
      onFocus={onFocus}
      tabIndex={interactive ? 0 : -1}
      role={interactive ? "button" : undefined}
      aria-label={interactive && place ? `Show ${place} on the map` : undefined}
    >
      {/* Dot */}
      <div
        className={`absolute -left-4 top-2 w-3 h-3 rounded-full border-2 bg-white shadow-sm transition-all duration-200 ${
          isActive ? "border-brand-primary scale-125" : "border-brand-primary"
        }`}
      />
      <div className="space-y-1">
        <p className="text-xs font-bold text-brand-primary uppercase tracking-wider">{time}</p>
        {title && (
          <p className="text-slate-800 text-sm font-semibold flex items-start gap-1.5">
            {title}
            {interactive && (
              <MapPin
                size={12}
                className={`mt-0.5 shrink-0 transition-opacity ${
                  isActive ? "opacity-100 text-brand-primary" : "opacity-40"
                }`}
              />
            )}
          </p>
        )}
        {description && (
          <p className="text-slate-500 text-xs leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
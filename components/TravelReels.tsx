"use client";

import { useEffect, useRef, useState } from "react";

type Reel = {
  id: string;
  country: string;
  city: string;
  caption: string;
  videoUrl: string;
  poster: string;
};

// Pexels free-use videos (no API key, no attribution required).
// URLs use Pexels' public /download/video/{id}/ endpoint, which redirects
// to their CDN and works in <video src>. If a video fails, the poster shows.
const REELS: Reel[] = [
  {
    id: "kyoto",
    country: "Japan",
    city: "Kyoto",
    caption: "Kimono walks through centuries-old streets",
    videoUrl: "https://www.pexels.com/download/video/31385024/",
    poster:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "vietnam",
    country: "Southeast Asia",
    city: "Vietnam",
    caption: "Emerald karsts of Ha Long Bay",
    videoUrl: "https://www.pexels.com/download/video/30391321/",
    poster:
      "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "neom",
    country: "Saudi Arabia",
    city: "Neom",
    caption: "Desert horizons & the city of tomorrow",
    videoUrl: "https://www.pexels.com/download/video/19348567/",
    poster:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "basilicata",
    country: "Italy",
    city: "Basilicata",
    caption: "Cave-cut Matera at twilight",
    videoUrl: "https://www.pexels.com/download/video/27562816/",
    poster:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop",
  },
];

function ReelCard({ reel }: { reel: Reel }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  };

  return (
    <div
      ref={containerRef}
      className="group relative w-[260px] md:w-[280px] aspect-[9/16] shrink-0 rounded-3xl overflow-hidden bg-slate-900 shadow-xl snap-start cursor-pointer"
      onClick={toggleMute}
    >
      {/* Poster always rendered underneath so the card never looks empty */}
      <img
        src={reel.poster}
        alt={`${reel.city}, ${reel.country}`}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      {!failed && (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          poster={reel.poster}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Gradient + meta */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

      <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
        <span className="px-2.5 py-1 bg-white/90 text-slate-900 text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-sm">
          {reel.country}
        </span>
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
            muted
              ? "bg-black/50 text-white/90 backdrop-blur-sm"
              : "bg-white text-slate-900"
          }`}
          aria-hidden="true"
        >
          {muted ? "🔇" : "🔊"}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-2xl font-extrabold leading-tight mb-1 drop-shadow">
          {reel.city}
        </h3>
        <p className="text-xs md:text-sm font-medium text-white/90 line-clamp-2 drop-shadow">
          {reel.caption}
        </p>
      </div>
    </div>
  );
}

export default function TravelReels() {
  return (
    <section
      className="py-24 px-6 lg:px-12 max-w-[1440px] mx-auto"
      id="reels"
      aria-label="2026 Travel Reels"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            In Motion
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tightest">
            Reels From the Road
          </h2>
          <p className="text-sm md:text-base text-on-surface-variant max-w-xl mt-2">
            Short clips from our top 2026 destinations. Tap a card to unmute —
            scroll for more.
          </p>
        </div>
      </div>

      <div
        className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory
                   [&::-webkit-scrollbar]:h-[6px]
                   [&::-webkit-scrollbar-thumb]:bg-slate-300
                   [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        {REELS.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { planTrip } from "@/lib/api";

const MIN = 500;
const MAX = 10000;
const TEST_USER_ID = "8df20970-ea2d-40e1-8f5c-193dd7315b60";

function formatBudget(val: number) {
  return val >= MAX ? `$${val.toLocaleString()}+` : `$${val.toLocaleString()}`;
}

export default function PreferencesPage() {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [minBudget, setMinBudget] = useState(1500);
  const [maxBudget, setMaxBudget] = useState(5000);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const minPct = ((minBudget - MIN) / (MAX - MIN)) * 100;
  const maxPct = ((maxBudget - MIN) / (MAX - MIN)) * 100;

  function handleMin(e: React.ChangeEvent<HTMLInputElement>) {
    const v = Math.min(Number(e.target.value), maxBudget - 100);
    setMinBudget(v);
  }

  function handleMax(e: React.ChangeEvent<HTMLInputElement>) {
    const v = Math.max(Number(e.target.value), minBudget + 100);
    setMaxBudget(v);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!destination.trim()) {
      setError("Please enter a destination.");
      return;
    }
    if (!checkin || !checkout) {
      setError("Please choose check-in and check-out dates.");
      return;
    }
    if (new Date(checkout) <= new Date(checkin)) {
      setError("Check-out must be after check-in.");
      return;
    }

    setSubmitting(true);
    try {
      const trip = await planTrip({
        user_id: TEST_USER_ID,
        destination: destination.trim(),
        start_date: checkin,
        end_date: checkout,
        budget_min: minBudget,
        budget_max: maxBudget,
      });
      router.push(`/itinerary/${trip.trip_id}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
      setSubmitting(false);
    }
  }

  return (
    <div className="h-screen overflow-hidden text-[#191c1e] antialiased">
      <div className="flex h-full pt-16">

        {/* Left: Hero panel */}
        <div
          className="relative hidden md:flex w-8/12 flex-shrink-0 flex-col justify-center p-12 bg-cover bg-center"
          style={{ backgroundImage: "url('/start-journey.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#001535]/85 via-[#001535]/25 to-transparent" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-7">
              <span className="w-6 h-6 rounded-full bg-white text-[#001535] text-xs font-bold flex items-center justify-center">1</span>
              <div className="h-px w-8 bg-white/30" />
              <span className="w-6 h-6 rounded-full border border-white/30 text-white/40 text-xs font-bold flex items-center justify-center">2</span>
              <div className="h-px w-8 bg-white/30" />
              <span className="w-6 h-6 rounded-full border border-white/30 text-white/40 text-xs font-bold flex items-center justify-center">3</span>
            </div>
            <h1 className="text-6xl font-extrabold text-white leading-tight tracking-tight mb-3" style={{ textShadow: "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black" }}>
              Start Your<br />Journey
            </h1>
            <p className="font-bold text-base text-white" style={{ textShadow: "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black" }}>
              Tell us where you want to go.
            </p>
          </div>
        </div>

        {/* Right: Form panel */}
        <div className="flex-1 bg-white flex items-center justify-center overflow-y-auto">
          <div className="w-full max-w-md px-8 py-12">

            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-8 text-center md:text-left">
              Step 1 of 3 — Preferences
            </p>

            <form className="space-y-8" onSubmit={handleSubmit}>

              {/* Destination */}
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-600" htmlFor="destination">
                  Where to?
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">
                    location_on
                  </span>
                  <input
                    id="destination"
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Amalfi Coast, Tokyo, Patagonia…"
                    disabled={submitting}
                    className="w-full border border-gray-200 rounded-xl py-3.5 pl-10 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-gray-600 transition-colors bg-white/80 backdrop-blur-sm disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Date Range */}
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-600">
                  When?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none">
                      calendar_month
                    </span>
                    <input
                      type="date"
                      id="checkin"
                      value={checkin}
                      onChange={(e) => setCheckin(e.target.value)}
                      disabled={submitting}
                      className="w-full border border-gray-200 rounded-xl py-3.5 pl-10 pr-3 text-sm text-gray-800 focus:outline-none focus:border-gray-600 transition-colors bg-white/80 backdrop-blur-sm cursor-pointer disabled:opacity-60"
                    />
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none">
                      calendar_month
                    </span>
                    <input
                      type="date"
                      id="checkout"
                      value={checkout}
                      onChange={(e) => setCheckout(e.target.value)}
                      disabled={submitting}
                      className="w-full border border-gray-200 rounded-xl py-3.5 pl-10 pr-3 text-sm text-gray-800 focus:outline-none focus:border-gray-600 transition-colors bg-white/80 backdrop-blur-sm cursor-pointer disabled:opacity-60"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Check‑in → Check‑out</p>
              </div>

              {/* Budget slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-600">
                    Budget
                  </label>
                  <span className="text-sm font-semibold text-gray-800 tabular-nums">
                    {formatBudget(minBudget)} — {formatBudget(maxBudget)}
                  </span>
                </div>

                <div className="relative h-1.5 mt-3">
                  <div className="absolute inset-0 rounded-full bg-gray-200" />
                  <div
                    className="absolute h-full rounded-full bg-gray-800"
                    style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
                  />
                  <div
                    className="absolute w-4 h-4 bg-white border-2 border-gray-800 rounded-full -top-[5px] pointer-events-none shadow"
                    style={{ left: `calc(${minPct}% - 8px)` }}
                  />
                  <div
                    className="absolute w-4 h-4 bg-white border-2 border-gray-800 rounded-full -top-[5px] pointer-events-none shadow"
                    style={{ left: `calc(${maxPct}% - 8px)` }}
                  />
                  <input
                    type="range" min={MIN} max={MAX} step={100} value={minBudget}
                    onChange={handleMin}
                    disabled={submitting}
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                    style={{ zIndex: minBudget > MAX - 1000 ? 5 : 3 }}
                  />
                  <input
                    type="range" min={MIN} max={MAX} step={100} value={maxBudget}
                    onChange={handleMax}
                    disabled={submitting}
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                    style={{ zIndex: 4 }}
                  />
                </div>

                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>$500</span>
                  <span>$10,000+</span>
                </div>
              </div>

              {error && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              {submitting && (
                <div className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                  Generating your itinerary… this can take 10-30 seconds.
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <Link
                  href="/"
                  className={`flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors ${submitting ? "pointer-events-none opacity-50" : ""}`}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 17 }}>arrow_back</span>
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 bg-gray-800 text-white text-sm font-semibold px-7 py-2.5 rounded-xl hover:bg-gray-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Planning…" : "Continue"}
                  <span className="material-symbols-outlined" style={{ fontSize: 17 }}>arrow_forward</span>
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

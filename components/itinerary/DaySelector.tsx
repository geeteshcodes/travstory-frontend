"use client";

import { ChevronRight } from "lucide-react";

export interface DayOption {
  id: number;
  label: string;
  sub?: string;
}

interface DaySelectorProps {
  days: DayOption[];
  activeDay: number;
  onDayChange: (day: number) => void;
  onNext?: () => void;
}

export default function DaySelector({ days, activeDay, onDayChange, onNext }: DaySelectorProps) {
  if (days.length === 0) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 flex gap-3 overflow-x-auto custom-scrollbar min-w-0 pb-1">
        {days.map((day) => {
          const active = activeDay === day.id;
          return (
            <button
              key={day.id}
              onClick={() => onDayChange(day.id)}
              className={`shrink-0 w-[120px] py-3 px-4 rounded-2xl border transition-all text-left ${
                active
                  ? "bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/30"
                  : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"
              }`}
            >
              <div className="text-sm font-bold">{day.label}</div>
              {day.sub && (
                <div
                  className={`text-[10px] truncate ${
                    active ? "text-white/80" : "text-slate-400"
                  }`}
                >
                  {day.sub}
                </div>
              )}
            </button>
          );
        })}
      </div>
      {days.length > 1 && (
        <button
          onClick={onNext}
          className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors shrink-0"
          aria-label="Next day"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}
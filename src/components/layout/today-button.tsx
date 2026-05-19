"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDismissable } from "@/hooks/use-dismissable";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function TodayButton() {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const [viewMonth, setViewMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const ref = useDismissable<HTMLDivElement>(open, () => setOpen(false));

  const daysInMonth = new Date(viewMonth.year, viewMonth.month + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewMonth.year, viewMonth.month, 1).getDay();

  // Pad with blanks for the days before the 1st
  const cells: (number | null)[] = [
    ...Array.from({ length: firstDayOfMonth }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isToday = (day: number) =>
    day === today.getDate() &&
    viewMonth.month === today.getMonth() &&
    viewMonth.year === today.getFullYear();

  const isSelected = (day: number) =>
    day === selectedDate.getDate() &&
    viewMonth.month === selectedDate.getMonth() &&
    viewMonth.year === selectedDate.getFullYear();

  const prevMonth = () => {
    setViewMonth((v) =>
      v.month === 0
        ? { year: v.year - 1, month: 11 }
        : { ...v, month: v.month - 1 }
    );
  };

  const nextMonth = () => {
    setViewMonth((v) =>
      v.month === 11
        ? { year: v.year + 1, month: 0 }
        : { ...v, month: v.month + 1 }
    );
  };

  const pickDate = (day: number) => {
    // TODO: when Supabase is wired, also update the global date used by the dashboard
    setSelectedDate(new Date(viewMonth.year, viewMonth.month, day));
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="pill px-5 py-2 text-sm hover:bg-bg-hover transition-colors"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        Today
      </button>

      {open && (
        <div
          className="absolute left-0 top-[calc(100%+8px)] z-40 w-[280px] rounded-2xl bg-bg-elevated border border-border-subtle shadow-xl p-3 animate-fade-in"
          role="dialog"
        >
          {/* Month header with nav */}
          <div className="flex items-center justify-between px-1 mb-3">
            <button
              onClick={prevMonth}
              aria-label="Previous month"
              className="w-7 h-7 rounded-full flex items-center justify-center text-fg-subtle hover:text-fg hover:bg-bg-hover transition-colors"
            >
              <ChevronLeft size={14} strokeWidth={1.75} />
            </button>
            <span className="text-sm text-fg font-medium tabular-nums">
              {MONTH_NAMES[viewMonth.month]} {viewMonth.year}
            </span>
            <button
              onClick={nextMonth}
              aria-label="Next month"
              className="w-7 h-7 rounded-full flex items-center justify-center text-fg-subtle hover:text-fg hover:bg-bg-hover transition-colors"
            >
              <ChevronRight size={14} strokeWidth={1.75} />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAYS.map((d, i) => (
              <div
                key={`${d}-${i}`}
                className="h-7 flex items-center justify-center text-2xs text-fg-faint uppercase"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Date grid */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (day === null) return <div key={`blank-${i}`} className="h-8" />;
              return (
                <button
                  key={day}
                  onClick={() => pickDate(day)}
                  className={cn(
                    "h-8 rounded-md text-xs tabular-nums transition-colors",
                    isSelected(day)
                      ? "bg-fg text-bg-elevated font-medium"
                      : isToday(day)
                      ? "text-fg font-medium ring-1 ring-fg-faint"
                      : "text-fg-muted hover:bg-bg-hover hover:text-fg"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

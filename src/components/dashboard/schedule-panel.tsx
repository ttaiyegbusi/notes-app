"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Panel } from "./panel";
import type { ScheduleEvent } from "@/lib/types";
import { mockEvents } from "@/lib/mock-data";
import { formatTime, cn } from "@/lib/utils";

const ROW_HEIGHT = 76; // px — height of one hour slot
const RAIL_LEFT = 44; // px from container left edge
const ARM_LENGTH = 12; // px — short horizontal connector from rail to card

export function SchedulePanel() {
  const [events] = useState<ScheduleEvent[]>(mockEvents);
  const [now, setNow] = useState<Date | null>(null);

  // Tick every 30s for a live current-time indicator
  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  // Hours covered by the schedule
  const hours = Array.from(
    new Set(events.map((e) => e.startHour))
  ).sort((a, b) => a - b);

  const firstHour = hours[0];
  const lastHour = hours[hours.length - 1];

  // Position of the now-line, in pixels from top of the rail
  let nowOffset: number | null = null;
  let nowLabel = "";
  if (now) {
    const h = now.getHours();
    const m = now.getMinutes();
    if (h >= firstHour && h <= lastHour) {
      // Find the index of the closest hour at or below h
      const hourIndex = hours.findIndex((hh) => hh === h);
      if (hourIndex !== -1) {
        nowOffset = hourIndex * ROW_HEIGHT + (m / 60) * ROW_HEIGHT;
      } else {
        // Fall back to linear position if hour not in set (shouldn't happen with packed schedule)
        nowOffset = (h - firstHour) * ROW_HEIGHT + (m / 60) * ROW_HEIGHT;
      }
      const period = h >= 12 ? "pm" : "am";
      const dh = h === 0 ? 12 : h > 12 ? h - 12 : h;
      nowLabel = `${dh}:${m.toString().padStart(2, "0")} ${period}`;
    }
  }

  return (
    <Panel
      title="Schedule"
      icon={<Clock size={15} strokeWidth={1.5} className="text-fg-faint" />}
    >
      <div className="relative">
        {/* Continuous vertical rail */}
        <span
          aria-hidden
          className="absolute w-px bg-border"
          style={{
            left: RAIL_LEFT,
            top: ROW_HEIGHT / 2,
            height: (hours.length - 1) * ROW_HEIGHT,
          }}
        />

        {/* Hour rows */}
        <div>
          {hours.map((hour) => {
            const eventsAtHour = events.filter((e) => e.startHour === hour);
            return (
              <div
                key={hour}
                className="relative flex items-center"
                style={{ height: ROW_HEIGHT }}
              >
                {/* Hour label */}
                <div
                  className="text-right text-fg-subtle text-xs tabular-nums shrink-0"
                  style={{ width: RAIL_LEFT - 8 }}
                >
                  {hour}:00
                </div>

                {/* Horizontal arm — from rail to card */}
                <span
                  aria-hidden
                  className="absolute h-px bg-border"
                  style={{
                    left: RAIL_LEFT,
                    width: ARM_LENGTH,
                    top: "50%",
                  }}
                />

                {/* Event card(s) — pushed right of the arm */}
                <div
                  className="flex-1 space-y-2 min-w-0"
                  style={{ marginLeft: ARM_LENGTH + 8 }}
                >
                  {eventsAtHour.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Current-time indicator — red line + pill */}
        {nowOffset !== null && (
          <div
            className="absolute right-0 flex items-center pointer-events-none z-10"
            style={{
              left: RAIL_LEFT,
              top: nowOffset + ROW_HEIGHT / 2,
              transform: "translateY(-50%)",
            }}
          >
            <span className="h-px flex-1 bg-red-500/80" />
            <span className="ml-2 px-2 py-0.5 rounded-full bg-red-500 text-white text-2xs tabular-nums font-medium">
              {nowLabel}
            </span>
          </div>
        )}
      </div>
    </Panel>
  );
}

function EventCard({ event }: { event: ScheduleEvent }) {
  const time = `${formatTime(event.startHour, event.startMinute)} - ${formatTime(
    event.endHour,
    event.endMinute
  )}`;

  return (
    <div
      className={cn(
        "rounded-xl px-4 py-2.5 border transition-all cursor-pointer",
        event.highlighted
          ? "bg-bg-subtle border-border"
          : "bg-bg-elevated border-border-subtle hover:border-border"
      )}
    >
      <p className="text-sm font-medium text-fg leading-tight">{event.title}</p>
      <p className="text-xs text-fg-subtle mt-1 tabular-nums">{time}</p>
    </div>
  );
}

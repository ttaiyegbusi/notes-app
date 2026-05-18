"use client";

import { useEffect, useState } from "react";
import { Panel } from "./panel";
import type { ScheduleEvent } from "@/lib/types";
import { mockEvents } from "@/lib/mock-data";
import { formatTime, cn } from "@/lib/utils";

const ROW_HEIGHT = 84; // px — height of one hour slot

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
      nowOffset = (h - firstHour) * ROW_HEIGHT + (m / 60) * ROW_HEIGHT;
      const period = h >= 12 ? "pm" : "am";
      const dh = h === 0 ? 12 : h > 12 ? h - 12 : h;
      nowLabel = `${dh}:${m.toString().padStart(2, "0")} ${period}`;
    }
  }

  return (
    <Panel title="Schedule">
      <div className="relative">
        {/* Vertical rail — spans the full hour range so the now-line sits on it */}
        <span
          aria-hidden
          className="absolute left-[44px] w-px bg-border"
          style={{
            top: 8,
            height: hours.length * ROW_HEIGHT - 16,
          }}
        />

        {/* Hour rows */}
        <div>
          {hours.map((hour) => {
            const eventsAtHour = events.filter((e) => e.startHour === hour);
            return (
              <div
                key={hour}
                className="flex items-start gap-4"
                style={{ height: ROW_HEIGHT }}
              >
                <div className="w-9 pt-3 text-right text-fg-subtle text-xs tabular-nums shrink-0">
                  {hour}:00
                </div>
                <div className="flex-1 pt-1 space-y-2 min-w-0 pl-2">
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
            className="absolute left-[44px] right-0 flex items-center pointer-events-none"
            style={{ top: nowOffset, transform: "translateY(-50%)" }}
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

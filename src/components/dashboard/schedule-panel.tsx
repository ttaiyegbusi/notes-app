"use client";

import { useState } from "react";
import { Panel } from "./panel";
import type { ScheduleEvent } from "@/lib/types";
import { mockEvents } from "@/lib/mock-data";
import { formatTime, cn } from "@/lib/utils";

export function SchedulePanel() {
  const [events] = useState<ScheduleEvent[]>(mockEvents);

  // Build a set of hours that have at least one event
  const hours = Array.from(
    new Set(events.map((e) => e.startHour))
  ).sort((a, b) => a - b);

  return (
    <Panel title="Schedule" className="min-h-[440px]">
      <div className="p-5">
        <div className="relative">
          {/* Continuous vertical guideline */}
          <span
            aria-hidden
            className="absolute left-[42px] top-2 bottom-2 w-px bg-border-subtle"
          />

          <div className="space-y-3">
            {hours.map((hour) => {
              const eventsAtHour = events.filter((e) => e.startHour === hour);
              return (
                <div key={hour} className="flex items-start gap-4">
                  <div className="w-9 pt-3 text-right text-fg-subtle text-xs tabular-nums shrink-0">
                    {hour}:00
                  </div>
                  <div className="flex-1 space-y-2 min-w-0">
                    {eventsAtHour.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function EventCard({ event }: { event: ScheduleEvent }) {
  const time = `${formatTime(event.startHour, event.startMinute)} – ${formatTime(
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

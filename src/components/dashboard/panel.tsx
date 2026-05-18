"use client";

import { ChevronsUpDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PanelProps = {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Panel({ title, icon, children, className }: PanelProps) {
  return (
    <section className={cn("panel flex flex-col", className)}>
      <header className="flex items-center justify-between px-5 py-3 border-b border-border-subtle">
        <div className="flex items-center gap-2 text-fg-muted text-sm">
          {icon ?? <PanelIcon />}
          <span>{title}</span>
        </div>
        <button
          aria-label="Reorder panel"
          className="text-fg-subtle hover:text-fg-muted transition-colors p-1 rounded"
        >
          <ChevronsUpDown size={14} strokeWidth={1.5} />
        </button>
      </header>
      <div className="flex-1 min-h-0">{children}</div>
    </section>
  );
}

function PanelIcon() {
  // Subtle stacked-paper glyph that reads as "list / collection"
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-fg-faint"
    >
      <path
        d="M2 11.5L8 14L14 11.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 8.5L8 11L14 8.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 5.5L8 8L14 5.5L8 3L2 5.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

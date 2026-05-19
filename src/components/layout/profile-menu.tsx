"use client";

import { useState } from "react";
import {
  User,
  NotebookText,
  ListChecks,
  Mail,
  Settings,
  Keyboard,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useDismissable } from "@/hooks/use-dismissable";

type MenuItem = {
  icon: typeof User;
  label: string;
  hint?: string;
  onClick?: () => void;
  danger?: boolean;
};

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useDismissable<HTMLDivElement>(open, () => setOpen(false));

  // TODO: replace with real user data once Supabase auth is wired
  const user = {
    name: "Your name",
    email: "you@example.com",
  };

  const items: (MenuItem | "divider")[] = [
    {
      icon: NotebookText,
      label: "My notes",
      hint: "All notes, by date",
    },
    {
      icon: ListChecks,
      label: "My tasks",
      hint: "Across all days",
    },
    "divider",
    {
      icon: Mail,
      label: "Connect Gmail",
      hint: "Coming soon",
    },
    "divider",
    {
      icon: Settings,
      label: "Preferences",
      hint: "Theme, weather, font",
    },
    {
      icon: Keyboard,
      label: "Keyboard shortcuts",
      hint: "⌘K",
    },
    {
      icon: HelpCircle,
      label: "Help & feedback",
    },
    "divider",
    {
      icon: LogOut,
      label: "Sign out",
      danger: true,
    },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-9 h-9 rounded-full bg-bg-hover flex items-center justify-center hover:bg-fg-faint transition-colors"
        aria-label="Account"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <User size={16} strokeWidth={1.5} className="text-fg-muted" />
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+8px)] z-40 w-[280px] rounded-2xl bg-bg-elevated border border-border-subtle shadow-xl py-2 animate-fade-in"
          role="menu"
        >
          {/* User identity */}
          <div className="px-4 py-2">
            <p className="text-sm text-fg font-medium truncate">{user.name}</p>
            <p className="text-xs text-fg-subtle truncate">{user.email}</p>
          </div>

          <div className="h-px bg-border-subtle my-1" />

          {items.map((item, i) => {
            if (item === "divider") {
              return (
                <div
                  key={`div-${i}`}
                  className="h-px bg-border-subtle my-1"
                  aria-hidden
                />
              );
            }
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
                role="menuitem"
                className="w-full px-4 py-2 flex items-center gap-3 text-left hover:bg-bg-hover transition-colors group"
              >
                <Icon
                  size={15}
                  strokeWidth={1.5}
                  className={
                    item.danger
                      ? "text-red-500/80"
                      : "text-fg-subtle group-hover:text-fg-muted"
                  }
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm ${
                      item.danger ? "text-red-500/90" : "text-fg"
                    }`}
                  >
                    {item.label}
                  </p>
                  {item.hint && (
                    <p className="text-2xs text-fg-faint">{item.hint}</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import {
  Home,
  Calendar,
  Inbox,
  Folder,
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  MoonStar,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Route = "home" | "calendar" | "inbox" | "archive";

export function TopNav() {
  const { theme, toggleTheme } = useTheme();
  const [activeRoute, setActiveRoute] = useState<Route>("home");

  const routes: { id: Route; icon: typeof Home; label: string }[] = [
    { id: "home", icon: Home, label: "Home" },
    { id: "calendar", icon: Calendar, label: "Calendar" },
    { id: "inbox", icon: Inbox, label: "Inbox" },
    { id: "archive", icon: Folder, label: "Archive" },
  ];

  return (
    <header className="px-6 pt-4 pb-1 shrink-0">
      <div className="grid grid-cols-3 items-center gap-4">
        {/* Left cluster — window dots + Today pill + nav arrows + search */}
        <div className="flex items-center gap-4 justify-self-start">
          <WindowDots />

          <button className="pill px-5 py-2 text-sm hover:bg-bg-hover transition-colors">
            Today
          </button>

          <div className="flex items-center gap-1 text-fg-subtle">
            <IconButton aria-label="Previous day">
              <ChevronLeft size={16} strokeWidth={1.5} />
            </IconButton>
            <IconButton aria-label="Next day">
              <ChevronRight size={16} strokeWidth={1.5} />
            </IconButton>
            <IconButton aria-label="Search">
              <Search size={16} strokeWidth={1.5} />
            </IconButton>
          </div>
        </div>

        {/* Center cluster — route switcher */}
        <nav
          className="pill flex items-center gap-1 px-2 py-1.5 justify-self-center"
          aria-label="Main navigation"
        >
          {routes.map((route) => {
            const Icon = route.icon;
            const isActive = activeRoute === route.id;
            return (
              <button
                key={route.id}
                onClick={() => setActiveRoute(route.id)}
                aria-label={route.label}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  "transition-all duration-200",
                  isActive
                    ? "bg-bg-hover text-fg"
                    : "text-fg-subtle hover:text-fg hover:bg-bg-hover/50"
                )}
              >
                <Icon size={16} strokeWidth={1.75} />
              </button>
            );
          })}
        </nav>

        {/* Right cluster — create + theme + avatar */}
        <div className="flex items-center gap-2 justify-self-end">
          <IconButton aria-label="Create new">
            <Plus size={18} strokeWidth={1.5} />
          </IconButton>
          <IconButton aria-label="Toggle theme" onClick={toggleTheme}>
            {theme === "light" ? (
              <MoonStar size={18} strokeWidth={1.5} />
            ) : (
              <Sun size={18} strokeWidth={1.5} />
            )}
          </IconButton>
          <button
            className="w-9 h-9 rounded-full bg-bg-hover flex items-center justify-center hover:bg-fg-faint transition-colors"
            aria-label="Account"
          >
            <User size={16} strokeWidth={1.5} className="text-fg-muted" />
          </button>
        </div>
      </div>
    </header>
  );
}

function WindowDots() {
  return (
    <div className="flex items-center gap-1.5 pl-1">
      <span className="w-2.5 h-2.5 rounded-full bg-border" />
      <span className="w-2.5 h-2.5 rounded-full bg-border" />
      <span className="w-2.5 h-2.5 rounded-full bg-border" />
    </div>
  );
}

function IconButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-9 h-9 rounded-full flex items-center justify-center text-fg-muted hover:bg-bg-hover hover:text-fg transition-colors"
    >
      {children}
    </button>
  );
}

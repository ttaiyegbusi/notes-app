"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
};

export function Modal({ open, onClose, title, icon, children }: ModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    // Lock background scroll
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-default"
        tabIndex={-1}
      />

      {/* Modal panel — 50vw × 50vh, capped for very large screens */}
      <div
        className="relative w-[50vw] h-[50vh] max-w-[900px] max-h-[700px] min-w-[480px] min-h-[400px] rounded-2xl bg-bg-subtle flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — same chrome as panels */}
        <header className="flex items-center justify-between px-5 pt-3.5 pb-2.5 shrink-0">
          <div
            id="modal-title"
            className="flex items-center gap-2 text-fg-muted text-sm"
          >
            {icon}
            <span>{title}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-fg-subtle hover:text-fg transition-colors p-1 rounded"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </header>

        {/* Inner card */}
        <div className="flex-1 min-h-0 px-2">
          <div className="h-full rounded-xl bg-bg-elevated overflow-hidden flex flex-col shadow-sm">
            <div className="flex-1 min-h-0 overflow-y-auto p-5">{children}</div>
          </div>
        </div>

        {/* Footer with Cancel button */}
        <footer className="flex items-center justify-end px-4 py-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm rounded-full text-fg-muted hover:text-fg hover:bg-bg-hover transition-colors"
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}

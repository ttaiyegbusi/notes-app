"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Closes a dropdown/popover when the user clicks outside it or presses Escape.
 * Pass the close handler; returns a ref to attach to the dropdown root element.
 */
export function useDismissable<T extends HTMLElement>(
  open: boolean,
  onClose: () => void
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Defer mousedown listener by a tick so the click that opened the
    // dropdown doesn't immediately close it
    const t = setTimeout(() => {
      document.addEventListener("mousedown", onClick);
    }, 0);
    document.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return ref;
}

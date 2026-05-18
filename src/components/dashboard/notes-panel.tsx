"use client";

import { useEffect, useRef, useState } from "react";
import { Panel } from "./panel";
import { mockNote } from "@/lib/mock-data";

export function NotesPanel() {
  const [content, setContent] = useState(mockNote.content);
  const [saved, setSaved] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Simulated autosave — replace with Supabase upsert later
  useEffect(() => {
    if (content === mockNote.content) return;
    setSaved(false);
    const t = setTimeout(() => setSaved(true), 600);
    return () => clearTimeout(t);
  }, [content]);

  return (
    <Panel title="Notes" className="min-h-[280px]">
      <div className="relative h-full p-5">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write something..."
          className="w-full h-full min-h-[200px] bg-transparent resize-none text-sm leading-relaxed text-fg placeholder:text-fg-faint focus:outline-none"
          spellCheck
        />
        {content.length > 0 && (
          <span className="absolute bottom-4 right-5 text-2xs text-fg-faint tabular-nums">
            {saved ? "Saved" : "Saving…"}
          </span>
        )}
      </div>
    </Panel>
  );
}

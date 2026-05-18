"use client";

import { useState } from "react";
import { Panel } from "./panel";
import type { Todo } from "@/lib/types";
import { mockTodos } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function TodosPanel() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftDescription, setDraftDescription] = useState("");

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const commitDraft = () => {
    if (!draftTitle.trim()) return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: draftTitle.trim(),
      description: draftDescription.trim() || undefined,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTodo]);
    setDraftTitle("");
    setDraftDescription("");
  };

  return (
    <Panel title="Tasks">
      <div className="space-y-4">
        {todos.map((todo) => (
          <TodoRow key={todo.id} todo={todo} onToggle={toggleTodo} />
        ))}

        {/* Inline add — matches dashed input from screenshot */}
        <div className="rounded-xl border border-dashed border-border p-4 flex items-start gap-3 hover:border-fg-faint transition-colors group">
          <input
            type="checkbox"
            disabled
            aria-hidden
            className="custom-checkbox mt-1 opacity-40"
          />
          <div className="flex-1 space-y-1">
            <input
              type="text"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitDraft();
              }}
              placeholder="Write here"
              className="w-full bg-transparent text-sm text-fg placeholder:text-fg-faint focus:outline-none"
            />
            <input
              type="text"
              value={draftDescription}
              onChange={(e) => setDraftDescription(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitDraft();
              }}
              placeholder="Add description"
              className="w-full bg-transparent text-sm text-fg-muted placeholder:text-fg-faint focus:outline-none"
            />
          </div>
        </div>
      </div>
    </Panel>
  );
}

function TodoRow({
  todo,
  onToggle,
}: {
  todo: Todo;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex items-start gap-3 group">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="custom-checkbox mt-1"
        aria-label={todo.title}
      />
      <div className="flex-1 space-y-1">
        <p
          className={cn(
            "text-sm font-medium leading-snug transition-colors",
            todo.completed
              ? "text-fg-faint line-through"
              : "text-fg"
          )}
        >
          {todo.title}
        </p>
        {todo.description && (
          <p
            className={cn(
              "text-sm leading-relaxed transition-colors",
              todo.completed ? "text-fg-faint" : "text-fg-muted"
            )}
          >
            {todo.description}
          </p>
        )}
      </div>
    </div>
  );
}

import type { Todo, ScheduleEvent, Note } from "./types";

export const mockTodos: Todo[] = [
  {
    id: "1",
    title: "Workspace Design Draft",
    description:
      "similar to Linear or ClickUp, but with a much cleaner and more minimal experience.",
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

export const mockEvents: ScheduleEvent[] = [
  {
    id: "1",
    title: "Go for shower",
    startHour: 5,
    startMinute: 0,
    endHour: 5,
    endMinute: 15,
  },
  {
    id: "2",
    title: "Walk",
    startHour: 6,
    startMinute: 0,
    endHour: 6,
    endMinute: 45,
  },
  {
    id: "3",
    title: "Gym Session",
    startHour: 7,
    startMinute: 0,
    endHour: 8,
    endMinute: 0,
    highlighted: true,
  },
  {
    id: "4",
    title: "Breakfast",
    startHour: 8,
    startMinute: 0,
    endHour: 8,
    endMinute: 30,
  },
  {
    id: "5",
    title: "Attend Stand up",
    startHour: 9,
    startMinute: 0,
    endHour: 9,
    endMinute: 15,
  },
];

export const mockNote: Note = {
  id: "1",
  content: "",
  updatedAt: new Date().toISOString(),
};

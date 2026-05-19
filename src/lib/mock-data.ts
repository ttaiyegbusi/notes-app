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
  {
    id: "6",
    title: "Deep work — Design review",
    startHour: 10,
    startMinute: 0,
    endHour: 11,
    endMinute: 30,
  },
  {
    id: "7",
    title: "1:1 with Sarah",
    startHour: 12,
    startMinute: 0,
    endHour: 12,
    endMinute: 30,
  },
  {
    id: "8",
    title: "Lunch",
    startHour: 13,
    startMinute: 0,
    endHour: 13,
    endMinute: 45,
  },
  {
    id: "9",
    title: "Team sync",
    startHour: 14,
    startMinute: 0,
    endHour: 14,
    endMinute: 30,
  },
  {
    id: "10",
    title: "Build session — Notes app",
    startHour: 15,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
  },
  {
    id: "11",
    title: "Coffee with Daniel",
    startHour: 17,
    startMinute: 30,
    endHour: 18,
    endMinute: 15,
  },
  {
    id: "12",
    title: "Gym — evening run",
    startHour: 19,
    startMinute: 0,
    endHour: 19,
    endMinute: 45,
  },
  {
    id: "13",
    title: "Dinner",
    startHour: 20,
    startMinute: 0,
    endHour: 20,
    endMinute: 45,
  },
  {
    id: "14",
    title: "Read — Designing Design",
    startHour: 21,
    startMinute: 30,
    endHour: 22,
    endMinute: 15,
  },
];

export const mockNote: Note = {
  id: "1",
  content: "",
  updatedAt: new Date().toISOString(),
};

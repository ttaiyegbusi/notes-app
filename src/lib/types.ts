export type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
};

export type ScheduleEvent = {
  id: string;
  title: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  highlighted?: boolean;
};

export type Note = {
  id: string;
  content: string;
  updatedAt: string;
};

export type Weather = {
  tempC: number;
  city: string;
  region: string;
  condition: "clear" | "cloudy" | "rain" | "snow";
};

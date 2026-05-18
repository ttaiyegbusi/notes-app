import { TodosPanel } from "./todos-panel";
import { SchedulePanel } from "./schedule-panel";
import { NotesPanel } from "./notes-panel";

export function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto px-6 pb-16 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TodosPanel />
        <SchedulePanel />
        <div className="md:col-span-2">
          <NotesPanel />
        </div>
      </div>
    </div>
  );
}

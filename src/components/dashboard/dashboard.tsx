import { TodosPanel } from "./todos-panel";
import { SchedulePanel } from "./schedule-panel";
import { NotesPanel } from "./notes-panel";

export function Dashboard() {
  return (
    <div className="flex-1 min-h-0 w-full max-w-6xl mx-auto px-6 pb-6 animate-fade-in">
      <div className="h-full grid grid-cols-2 grid-rows-[1.4fr_1fr] gap-4 min-h-0">
        <div className="min-h-0 min-w-0">
          <TodosPanel />
        </div>
        <div className="min-h-0 min-w-0">
          <SchedulePanel />
        </div>
        <div className="col-span-2 min-h-0 min-w-0">
          <NotesPanel />
        </div>
      </div>
    </div>
  );
}

import { TopNav } from "@/components/layout/top-nav";
import { DateHeader } from "@/components/layout/date-header";
import { Dashboard } from "@/components/dashboard/dashboard";

export default function Home() {
  return (
    <main className="h-[100dvh] flex flex-col overflow-hidden">
      <TopNav />
      <DateHeader />
      <Dashboard />
    </main>
  );
}

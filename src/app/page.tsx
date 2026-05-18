import { TopNav } from "@/components/layout/top-nav";
import { DateHeader } from "@/components/layout/date-header";
import { Dashboard } from "@/components/dashboard/dashboard";

export default function Home() {
  return (
    <main className="min-h-screen">
      <TopNav />
      <DateHeader />
      <Dashboard />
    </main>
  );
}

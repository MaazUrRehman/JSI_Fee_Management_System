import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 ml-[260px]">
        <main className="p-6 bg-[#EFEFEF]">
          {children}
        </main>
      </div>
    </div>
  );
}

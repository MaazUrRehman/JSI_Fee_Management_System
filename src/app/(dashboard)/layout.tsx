// import { Sidebar } from "@/components/layout/Sidebar";
// import { Navbar } from "@/components/layout/Navbar";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="min-h-screen flex">
//       <Sidebar />
//       <div className="flex-1 ml-[260px]">
//         <main className="p-6 bg-[#EFEFEF]">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }









"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#EFEFEF]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <main className="pt-16 lg:pl-[260px] w-full min-w-0 bg-[#EFEFEF]">
        {children}
      </main>
    </div>
  );
}
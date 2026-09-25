"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sidebar } from "./layout/Sidebar";
import { Navbar } from "./layout/Navbar";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Login page ya koi bhi public page pe sidebar/navbar nahi
  const isAuthPage = pathname === "/login" || pathname?.startsWith("/login");

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#EFEFEF]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <main className="pt-16 lg:pl-[260px]">
        {children}
      </main>
    </div>
  );
}
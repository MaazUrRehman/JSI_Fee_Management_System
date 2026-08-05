"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const title = pathname.split("/").filter(Boolean).pop()?.replace("-", " ") || "Dashboard";

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/login");
  };
  
  return (
    <header className="fixed top-0 left-[260px] right-0 h-16 border-b bg-background/80 backdrop-blur-sm flex items-center justify-between px-6 z-10">
      <h2 className="text-lg font-semibold capitalize">{title}</h2>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Admin</span>
        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-xs font-semibold">A</div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}

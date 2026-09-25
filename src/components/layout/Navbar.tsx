// // "use client";
// // import { usePathname, useRouter } from "next/navigation";
// // import { Button } from "@/components/ui/button";

// // export function Navbar() {
// //   const pathname = usePathname();
// //   const router = useRouter();
// //   const title = pathname.split("/").filter(Boolean).pop()?.replace("-", " ") || "Dashboard";

// //   const handleLogout = async () => {
// //     await fetch("/api/logout", { method: "POST" });
// //     router.replace("/login");
// //   };
  
// //   return (
// //     <header className="fixed top-0 left-[260px] right-0 h-16 border-b bg-background/80 backdrop-blur-sm flex items-center justify-between px-6 z-10">
// //       <h2 className="text-lg font-semibold capitalize">{title}</h2>
// //       <div className="flex items-center gap-2">
// //         <span className="text-sm font-medium">Admin</span>
// //         <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-xs font-semibold">A</div>
// //         <Button variant="outline" size="sm" onClick={handleLogout}>
// //           Logout
// //         </Button>
// //       </div>
// //     </header>
// //   );
// // }














// "use client";
// import { usePathname, useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

// export function Navbar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const title = pathname.split("/").filter(Boolean).pop()?.replace("-", " ") || "Dashboard";

//   const handleLogout = async () => {
//     await fetch("/api/logout", { method: "POST" });
//     router.replace("/login");
//   };
  
//   return (
//     <header className="fixed top-0 left-[220px] sm:left-[260px] right-0 h-14 sm:h-16 border-b bg-background/80 backdrop-blur-sm flex items-center justify-between px-3 sm:px-6 z-10">
//       <h2 className="text-sm sm:text-lg font-semibold capitalize truncate pr-2">{title}</h2>
//       <div className="flex items-center gap-2 shrink-0">
//         <span className="text-xs sm:text-sm font-medium hidden sm:inline">Admin</span>
//         <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-accent flex items-center justify-center text-xs font-semibold">A</div>
//         <Button variant="outline" size="sm" onClick={handleLogout} className="text-xs sm:text-sm h-8 sm:h-9">
//           Logout
//         </Button>
//       </div>
//     </header>
//   );
// }











"use client";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const title = pathname.split("/").filter(Boolean).pop()?.replace("-", " ") || "Dashboard";

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/login");
  };
  
  return (
    <header className="fixed top-0 left-0 lg:left-[260px] right-0 h-16 border-b bg-background/80 backdrop-blur-sm flex items-center justify-between px-4 lg:px-6 z-30">
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger - mobile only */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden text-[#0FB3B7] hover:bg-[#0FB3B7]/10 shrink-0"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>

        <h2 className="text-lg font-semibold capitalize truncate">{title}</h2>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-sm font-medium hidden sm:inline">Admin</span>
        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-xs font-semibold">A</div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
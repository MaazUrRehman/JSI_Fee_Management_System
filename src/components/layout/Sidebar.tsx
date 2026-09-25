

// // "use client";

// // import Link from "next/link";
// // import { usePathname, useRouter } from "next/navigation";
// // import {
// //   LayoutDashboard,
// //   Users,
// //   BookOpenText,
// //   Receipt,
// //   AlertCircle,
// //   LogOut,
// //   Settings,
// // } from "lucide-react";
// // import { cn } from "@/lib/utils";
// // import { Button } from "@/components/ui/button";

// // const navItems = [
// //   { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
// //   { name: "Student Registration", href: "/students", icon: Users },
// //   { name: "Student Fee Record", href: "/fee-record", icon: BookOpenText },
// //   { name: "Receipts", href: "/receipts", icon: Receipt },
// //   { name: "Overhead Due", href: "/overhead-due", icon: AlertCircle },
// //   { name: "Other Receipts", href: "/other-receipts", icon: Receipt },
// // ];

// // export function Sidebar() {
// //   const pathname = usePathname();
// //   const router = useRouter();

// //   const handleLogout = async () => {
// //     try {
// //       await fetch("/api/logout", {
// //         method: "POST",
// //       });

// //       router.replace("/login");
// //       router.refresh();
// //     } catch (error) {
// //       console.error("Logout failed:", error);
// //     }
// //   };

// //   return (
// //     <aside className="fixed left-0 top-0 h-screen w-[260px] border-r border-[#0FB3B7]/10 bg-[#EFEFEF] p-4 flex flex-col">
// //       {/* Header */}
// //       <div className="flex h-16 items-center border-b border-[#FFD700]/30 px-2 mb-6">
// //         <div className="flex items-center gap-2">
// //           <div className="w-2 h-8 bg-[#FFD700] rounded-full"></div>
// //           <h1 className="text-xl font-bold text-[#0FB3B7] tracking-wide">
// //             JSI Fee Management
// //           </h1>
// //         </div>
// //       </div>

// //       {/* Navigation */}
// //       <nav className="flex flex-col gap-2">
// //         {navItems.map((item) => {
// //           const Icon = item.icon;
// //           const isActive = pathname === item.href;

// //           return (
// //             <Link
// //               key={item.name}
// //               href={item.href}
// //               className={cn(
// //                 "flex items-center gap-3 rounded-lg px-3 py-2.5 text-md transition-all duration-200",
// //                 isActive
// //                   ? "bg-[#0FB3B7] text-white shadow-md"
// //                   : "text-[#0FB3B7]/70 hover:bg-[#0FB3B7]/10 hover:text-[#0FB3B7] hover:shadow-sm"
// //               )}
// //             >
// //               <Icon
// //                 className={cn(
// //                   "h-4 w-4",
// //                   isActive ? "text-white" : "text-[#0FB3B7]"
// //                 )}
// //               />

// //               <span className="font-medium">{item.name}</span>

// //               {isActive && (
// //                 <span className="ml-auto w-1.5 h-6 bg-[#FFD700] rounded-full"></span>
// //               )}
// //             </Link>
// //           );
// //         })}
// //       </nav>

// //       {/* Logout Button */}
// //       {/* <div className="mt-auto pt-6 border-t border-[#FFD700]/30">
// //         <Button
// //           onClick={handleLogout}
// //           className="w-full flex items-center justify-center bg-[#0FB3B7] text-white shadow-md gap-2"
// //         >
// //           Logout
// //         </Button>
// //       </div> */}
// //       {/* Settings & Logout */}
// //       <div className="mt-auto pt-6 border-t border-[#FFD700]/30 space-y-2">

// //         {/* Settings Button */}
// //         <Button
// //           onClick={() => router.push("/settings")}
// //           variant="outline"
// //           className="w-full flex items-center justify-center gap-2 border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10"
// //         >
// //           <Settings className="h-4 w-4" />
// //           Settings
// //         </Button>

// //         {/* Logout Button */}
// //         <Button
// //           onClick={handleLogout}
// //           className="w-full flex items-center justify-center bg-[#0FB3B7] text-white shadow-md gap-2"
// //         >
// //           <LogOut className="h-4 w-4" />
// //           Logout
// //         </Button>

// //       </div>

// //     </aside>
// //   );
// // }








// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   LayoutDashboard,
//   Users,
//   BookOpenText,
//   Receipt,
//   AlertCircle,
//   LogOut,
//   Settings,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";

// const navItems = [
//   { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//   { name: "Student Registration", href: "/students", icon: Users },
//   { name: "Student Fee Record", href: "/fee-record", icon: BookOpenText },
//   { name: "Receipts", href: "/receipts", icon: Receipt },
//   { name: "Overhead Due", href: "/overhead-due", icon: AlertCircle },
//   { name: "Other Receipts", href: "/other-receipts", icon: Receipt },
// ];

// export function Sidebar() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await fetch("/api/logout", {
//         method: "POST",
//       });

//       router.replace("/login");
//       router.refresh();
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <aside className="fixed left-0 top-0 h-screen w-[220px] sm:w-[260px] border-r border-[#0FB3B7]/10 bg-[#EFEFEF] p-3 sm:p-4 flex flex-col">
//       {/* Header */}
//       <div className="flex h-14 sm:h-16 items-center border-b border-[#FFD700]/30 px-1 sm:px-2 mb-4 sm:mb-6">
//         <div className="flex items-center gap-2">
//           <div className="w-2 h-7 sm:h-8 bg-[#FFD700] rounded-full"></div>
//           <h1 className="text-base sm:text-xl font-bold text-[#0FB3B7] tracking-wide leading-tight">
//             JSI Fee Management
//           </h1>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex flex-col gap-1.5 sm:gap-2">
//         {navItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = pathname === item.href;

//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={cn(
//                 "flex items-center gap-2.5 sm:gap-3 rounded-lg px-2.5 sm:px-3 py-2 sm:py-2.5 text-sm sm:text-md transition-all duration-200",
//                 isActive
//                   ? "bg-[#0FB3B7] text-white shadow-md"
//                   : "text-[#0FB3B7]/70 hover:bg-[#0FB3B7]/10 hover:text-[#0FB3B7] hover:shadow-sm"
//               )}
//             >
//               <Icon
//                 className={cn(
//                   "h-4 w-4 shrink-0",
//                   isActive ? "text-white" : "text-[#0FB3B7]"
//                 )}
//               />

//               <span className="font-medium truncate">{item.name}</span>

//               {isActive && (
//                 <span className="ml-auto w-1.5 h-5 sm:h-6 bg-[#FFD700] rounded-full shrink-0"></span>
//               )}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Settings & Logout */}
//       <div className="mt-auto pt-4 sm:pt-6 border-t border-[#FFD700]/30 space-y-2">

//         {/* Settings Button */}
//         <Button
//           onClick={() => router.push("/settings")}
//           variant="outline"
//           className="w-full flex items-center justify-center gap-2 border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 text-xs sm:text-sm"
//         >
//           <Settings className="h-4 w-4" />
//           Settings
//         </Button>

//         {/* Logout Button */}
//         <Button
//           onClick={handleLogout}
//           className="w-full flex items-center justify-center bg-[#0FB3B7] text-white shadow-md gap-2 text-xs sm:text-sm"
//         >
//           <LogOut className="h-4 w-4" />
//           Logout
//         </Button>

//       </div>

//     </aside>
//   );
// }










"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpenText,
  Receipt,
  AlertCircle,
  LogOut,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Student Registration", href: "/students", icon: Users },
  { name: "Student Fee Record", href: "/fee-record", icon: BookOpenText },
  { name: "Receipts", href: "/receipts", icon: Receipt },
  { name: "Overhead Due", href: "/overhead-due", icon: AlertCircle },
  { name: "Other Receipts", href: "/other-receipts", icon: Receipt },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavClick = () => {
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay/Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-[260px] border-r border-[#0FB3B7]/10 bg-[#EFEFEF] p-4 flex flex-col z-50 transition-transform duration-300 ease-in-out",
          // Mobile: slide in/out
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: always visible
          "lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-[#FFD700]/30 px-2 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-8 bg-[#FFD700] rounded-full"></div>
            <h1 className="text-xl font-bold text-[#0FB3B7] tracking-wide">
              JSI Fee Management
            </h1>
          </div>

          {/* Close button - mobile only */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            className="lg:hidden text-[#0FB3B7] hover:bg-[#0FB3B7]/10"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-md transition-all duration-200",
                  isActive
                    ? "bg-[#0FB3B7] text-white shadow-md"
                    : "text-[#0FB3B7]/70 hover:bg-[#0FB3B7]/10 hover:text-[#0FB3B7] hover:shadow-sm"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive ? "text-white" : "text-[#0FB3B7]"
                  )}
                />
                <span className="font-medium truncate">{item.name}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-6 bg-[#FFD700] rounded-full shrink-0"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Settings & Logout */}
        <div className="mt-auto pt-6 border-t border-[#FFD700]/30 space-y-2">
          <Button
            onClick={() => router.push("/settings")}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>

          <Button
            onClick={handleLogout}
            className="w-full flex items-center justify-center bg-[#0FB3B7] text-white shadow-md gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
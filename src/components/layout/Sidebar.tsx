// // "use client";
// // import Link from "next/link";
// // import { usePathname } from "next/navigation";
// // import { LayoutDashboard, Users, BookOpenText, Receipt, AlertCircle } from "lucide-react";
// // import { cn } from "@/lib/utils";

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
// //   return (
// //     <aside className="fixed left-0 top-0 h-screen w-[260px] border-r bg-background p-4">
// //       <div className="flex h-16 items-center border-b px-2 mb-6">
// //         <h1 className="text-xl font-bold">JSI Fee Management System</h1>
// //       </div>
// //       <nav className="flex flex-col gap-2">
// //         {navItems.map((item) => {
// //           const Icon = item.icon;
// //           const isActive = pathname === item.href;
// //           return (
// //             <Link
// //               key={item.name}
// //               href={item.href}
// //               className={cn(
// //                 "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
// //                 isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
// //               )}
// //             >
// //               <Icon className="h-4 w-4" />
// //               {item.name}
// //             </Link>
// //           );
// //         })}
// //       </nav>
// //     </aside>
// //   );
// // }






// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { LayoutDashboard, Users, BookOpenText, Receipt, AlertCircle } from "lucide-react";
// import { cn } from "@/lib/utils";

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

//   return (
//     <aside className="fixed left-0 top-0 h-screen w-[260px] border-r border-[#0FB3B7]/10 bg-[#EFEFEF] p-4">
//       {/* Logo/Header with Yellow Accent */}
//       <div className="flex h-16 items-center border-b border-[#FFD700]/30 px-2 mb-6">
//         <div className="flex items-center gap-2">
//           <div className="w-2 h-8 bg-[#FFD700] rounded-full"></div>
//           <h1 className="text-xl font-bold text-[#0FB3B7] tracking-wide">
//             JSI Fee Management
//           </h1>
//         </div>
//       </div>

//       <nav className="flex flex-col gap-2">
//         {navItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = pathname === item.href;
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={cn(
//                 "flex items-center gap-3 rounded-lg px-3 py-2.5 text-md transition-all duration-200",
//                 isActive 
//                   ? "bg-[#0FB3B7] text-white shadow-md" 
//                   : "text-[#0FB3B7]/70 hover:bg-[#0FB3B7]/10 hover:text-[#0FB3B7] hover:shadow-sm"
//               )}
//             >
//               <Icon className={cn(
//                 "h-4 w-4",
//                 isActive ? "text-white" : "text-[#0FB3B7]"
//               )} />
//               <span className="font-medium">{item.name}</span>
//               {isActive && (
//                 <span className="ml-auto w-1.5 h-6 bg-[#FFD700] rounded-full"></span>
//               )}
//             </Link>
//           );
//         })}
//       </nav>


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

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] border-r border-[#0FB3B7]/10 bg-[#EFEFEF] p-4 flex flex-col">
      {/* Header */}
      <div className="flex h-16 items-center border-b border-[#FFD700]/30 px-2 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-8 bg-[#FFD700] rounded-full"></div>
          <h1 className="text-xl font-bold text-[#0FB3B7] tracking-wide">
            JSI Fee Management
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-md transition-all duration-200",
                isActive
                  ? "bg-[#0FB3B7] text-white shadow-md"
                  : "text-[#0FB3B7]/70 hover:bg-[#0FB3B7]/10 hover:text-[#0FB3B7] hover:shadow-sm"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4",
                  isActive ? "text-white" : "text-[#0FB3B7]"
                )}
              />

              <span className="font-medium">{item.name}</span>

              {isActive && (
                <span className="ml-auto w-1.5 h-6 bg-[#FFD700] rounded-full"></span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      {/* <div className="mt-auto pt-6 border-t border-[#FFD700]/30">
        <Button
          onClick={handleLogout}
          className="w-full flex items-center justify-center bg-[#0FB3B7] text-white shadow-md gap-2"
        >
          Logout
        </Button>
      </div> */}
      {/* Settings & Logout */}
      <div className="mt-auto pt-6 border-t border-[#FFD700]/30 space-y-2">

        {/* Settings Button */}
        <Button
          onClick={() => router.push("/settings")}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Button>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          className="w-full flex items-center justify-center bg-[#0FB3B7] text-white shadow-md gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>

      </div>

    </aside>
  );
}
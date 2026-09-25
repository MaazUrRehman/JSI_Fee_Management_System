// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { DashboardData } from "@/types/dashboard";

// interface SummaryCardProps {
//   title: string;
//   value: string | number;
// }

// function SummaryCard({ title, value }: SummaryCardProps) {
//   return (
   

//     <Card className="bg-[#0FB3B7]/5 border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-lg h-full">
//       <CardHeader className="pb-2 min-h-[48px]">
//         <CardTitle className="text-xs font-small text-[#0FB3B7] uppercase tracking-wider line-clamp-2">
//           {title}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="pt-0 flex items-end min-h-[48px]">
//         <p className="text-xl font-bold text-[#0FB3B7]">{value}</p>
//       </CardContent>
//     </Card>
//   );
// }

// const formatCurrency = (amount: number) =>
//   `PKR ${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

// interface DashboardSummaryCardsProps {
//   stats: DashboardData;
//   selectedMonth: number;
//   yearInput: string;
//   onMonthChange: (month: number) => void;
//   onYearChange: (year: string) => void;
// }

// const MONTHS = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December",
// ];

// export function DashboardSummaryCards({
//   stats,
//   selectedMonth,
//   yearInput,
//   onMonthChange,
//   onYearChange,
// }: DashboardSummaryCardsProps) {
//   const currentPeriodLabel = `${stats.currentMonth} ${stats.currentYear}`;

//   return (
//     <div className="min-h-screen bg-[#EFEFEF] p-6 space-y-8">
//       {/* Header Section with Yellow Accent */}
//       <div className="flex flex-col gap-4 bg-white/50 backdrop-blur-sm rounded-lg p-4 border-l-4 border-[#FFD700] sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-[#0FB3B7] tracking-wide">
//             Dashboard
//           </h1>
//           <p className="text-md text-[#0FB3B7]/60">{currentPeriodLabel}</p>
//         </div>
//         <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-end sm:justify-end">
//           <label className="flex w-full flex-col gap-1 text-xs font-medium text-[#0FB3B7] sm:w-auto">
//             Month
//             <select
//               value={selectedMonth}
//               onChange={(event) => onMonthChange(Number(event.target.value))}
//               className="h-9 rounded-md border border-[#0FB3B7]/20 bg-white px-2 text-sm font-normal text-[#0FB3B7] outline-none focus:border-[#0FB3B7] focus:ring-2 focus:ring-[#0FB3B7]/20"
//             >
//               {MONTHS.map((month, index) => (
//                 <option key={month} value={index + 1}>{month}</option>
//               ))}
//             </select>
//           </label>
//           <label className="flex w-full flex-col gap-1 text-xs font-medium text-[#0FB3B7] sm:w-auto">
//             Year
//             <Input
//               type="text"
//               inputMode="numeric"
//               pattern="[0-9]{4}"
//               maxLength={4}
//               list="dashboard-year-options"
//               value={yearInput}
//               onChange={(event) => onYearChange(event.target.value.replace(/\D/g, "").slice(0, 4))}
//               aria-label="Year"
//               className="w-full sm:w-20 border-[#0FB3B7]/20 bg-white text-[#0FB3B7] focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20"
//             />
//             <datalist id="dashboard-year-options">
//               {Array.from({ length: 11 }, (_, index) => new Date().getFullYear() - 5 + index).map((year) => (
//                 <option key={year} value={year} />
//               ))}
//             </datalist>
//           </label>
//         </div>
//       </div>

//       <section className="space-y-4">
//         <div className="flex items-center gap-3">
//           <div className="w-1 h-8 bg-[#FFD700] rounded-full"></div>
//           <h2 className="text-lg font-bold text-[#0FB3B7] uppercase tracking-wider">
//             Student Statistics
//           </h2>
//         </div>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
//           <SummaryCard title="Total Students" value={stats.students.totalStudents} />
//           <SummaryCard
//             title="Current Month Active Students"
//             value={stats.students.currentMonthActiveStudents}
//           />
//           <SummaryCard
//             title="Current Month Inactive Students"
//             value={stats.students.totalStudents - stats.students.currentMonthActiveStudents}
//           />
//           <SummaryCard
//             title="Current Month Paid Students"
//             value={stats.students.currentMonthPaidStudents}
//           />
//           <SummaryCard
//             title="Current Month Unpaid Students"
//             value={stats.students.currentMonthUnpaidStudents}
//           />
//         </div>
//       </section>

//       <section className="space-y-4">
//         <div className="flex items-center gap-3">
//           <div className="w-1 h-8 bg-[#FFD700] rounded-full"></div>
//           <h2 className="text-lg font-bold text-[#0FB3B7] uppercase tracking-wider">
//             Financial Statistics
//           </h2>
//         </div>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//           <SummaryCard
//             title="Expected Monthly Income"
//             value={formatCurrency(stats.financial.expectedMonthlyIncome)}
//           />
//           <SummaryCard
//             title="Collected Income"
//             value={formatCurrency(stats.financial.collectedIncome)}
//           />
//           <SummaryCard
//             title="Remaining Income"
//             value={formatCurrency(stats.financial.remainingIncome)}
//           />
//           <SummaryCard
//             title="Total Overhead Due"
//             value={formatCurrency(stats.financial.totalOverheadDue)}
//           />
//         </div>
//       </section>


//       <section className="space-y-4">
//         <div className="flex items-center gap-3">
//           <div className="w-1 h-8 bg-[#FFD700] rounded-full"></div>
//           <h2 className="text-lg font-bold text-[#0FB3B7] uppercase tracking-wider">
//             Other Statistics
//           </h2>
//         </div>

//         <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//           <SummaryCard
//             title="Registration Fees"
//             value={formatCurrency(stats.otherStats.registrationFees)}
//           />

//           <SummaryCard
//             title="Additional / Stationery Charges"
//             value={formatCurrency(stats.otherStats.additionalStationeryCharges)}
//           />

//           <SummaryCard
//             title="Late Fees"
//             value={formatCurrency(stats.otherStats.lateFees)}
//           />

//           <SummaryCard
//             title="Discount"
//             value={formatCurrency(stats.otherStats.discount)}
//           />
//         </div>
//       </section>


//       <section className="space-y-4">
//         <div className="flex items-center gap-3">
//           <div className="w-1 h-8 bg-[#FFD700] rounded-full"></div>
//           <h2 className="text-lg font-bold text-[#0FB3B7] uppercase tracking-wider">
//             Receipt Statistics
//           </h2>
//         </div>
//         <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//           <SummaryCard
//             title="Total Receipts"
//             value={stats.receipts.totalReceiptsCurrentMonth}
//           />
//           <SummaryCard
//             title="Receipt Amount"
//             value={formatCurrency(stats.receipts.totalReceiptAmountCurrentMonth)}
//           />
//           <SummaryCard
//             title="Other Receipts"
//             value={stats.receipts.totalOtherReceiptsCurrentMonth}
//           />
//           <SummaryCard
//             title="Other Receipt Amount"
//             value={formatCurrency(stats.receipts.totalOtherReceiptAmountCurrentMonth)}
//           />
//         </div>
//       </section>

//       <section className="space-y-6">
//         <div className="flex items-center gap-3">
//           <div className="w-1 h-8 bg-[#FFD700] rounded-full"></div>
//           <h2 className="text-lg font-bold text-[#0FB3B7] uppercase tracking-wider">
//             Department  Statistics
//           </h2>
//         </div>

        

//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//           {/* 1st Row: JSI TUITION CENTRE (Left) | JSI COACHING CENTRE (Right) */}
//           {stats.groupStats
//             .filter((g) => g.group === "JSI TUITION CENTRE" || g.group === "JSI COACHING CENTRE")
//             .sort((a, b) => {
//               const order = ["JSI TUITION CENTRE", "JSI COACHING CENTRE"];
//               return order.indexOf(a.group) - order.indexOf(b.group);
//             })
//             .map((group) => (
//               <Card
//                 key={group.group}
//                 className="bg-white/50 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl"
//               >
//                 <CardHeader className="border-b border-[#FFD700]/20 pb-3">
//                   <CardTitle className="text-[#0FB3B7] flex items-center gap-2 text-lg">
//                     <span className="inline-block w-1.5 h-6 bg-[#FFD700] rounded-full"></span>
//                     {group.group}
//                   </CardTitle>
//                 </CardHeader>

//                 <CardContent className="pt-4">
//                   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                     <SummaryCard title="Students" value={group.totalStudents} />
//                     <SummaryCard title="Total Fees" value={formatCurrency(group.totalFees)} />
//                     <SummaryCard title="Paid Fees" value={formatCurrency(group.paidFees)} />
//                     <SummaryCard title="Due Fees" value={formatCurrency(group.dueFees)} />
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}

//           {/* 2nd Row: JSI BASIC CLASSES (Left) | JSI PRE-SCHOOLING (Right) */}
//           {stats.groupStats
//             .filter((g) => g.group === "JSI BASIC CLASSES" || g.group === "JSI PRE-SCHOOLING")
//             .sort((a, b) => {
//               const order = ["JSI BASIC CLASSES", "JSI PRE-SCHOOLING"];
//               return order.indexOf(a.group) - order.indexOf(b.group);
//             })
//             .map((group) => (
//               <Card
//                 key={group.group}
//                 className="bg-white/50 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl"
//               >
//                 <CardHeader className="border-b border-[#FFD700]/20 pb-3">
//                   <CardTitle className="text-[#0FB3B7] flex items-center gap-2 text-lg">
//                     <span className="inline-block w-1.5 h-6 bg-[#FFD700] rounded-full"></span>
//                     {group.group}
//                   </CardTitle>
//                 </CardHeader>

//                 <CardContent className="pt-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <SummaryCard title="Students" value={group.totalStudents} />
//                     <SummaryCard title="Total Fees" value={formatCurrency(group.totalFees)} />
//                     <SummaryCard title="Paid Fees" value={formatCurrency(group.paidFees)} />
//                     <SummaryCard title="Due Fees" value={formatCurrency(group.dueFees)} />
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//         </div>

//       </section>


//     </div>
//   );
// }























// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { DashboardData } from "@/types/dashboard";

// interface SummaryCardProps {
//   title: string;
//   value: string | number;
// }

// function SummaryCard({ title, value }: SummaryCardProps) {
//   return (
//     <Card className="bg-[#0FB3B7]/5 border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-lg h-full">
//       <CardHeader className="pb-1 p-3 min-h-[40px] sm:pb-2 sm:p-6 sm:min-h-[48px]">
//         <CardTitle className="text-[10px] font-small text-[#0FB3B7] uppercase tracking-wider line-clamp-2 sm:text-xs">
//           {title}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="pt-0 px-3 pb-3 flex items-end min-h-[40px] sm:px-6 sm:pb-6 sm:min-h-[48px]">
//         <p className="text-base font-bold text-[#0FB3B7] sm:text-xl">{value}</p>
//       </CardContent>
//     </Card>
//   );
// }

// const formatCurrency = (amount: number) =>
//   `PKR ${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

// interface DashboardSummaryCardsProps {
//   stats: DashboardData;
//   selectedMonth: number;
//   yearInput: string;
//   onMonthChange: (month: number) => void;
//   onYearChange: (year: string) => void;
// }

// const MONTHS = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December",
// ];

// export function DashboardSummaryCards({
//   stats,
//   selectedMonth,
//   yearInput,
//   onMonthChange,
//   onYearChange,
// }: DashboardSummaryCardsProps) {
//   const currentPeriodLabel = `${stats.currentMonth} ${stats.currentYear}`;

//   return (
//     <div className="bg-[#EFEFEF] p-3 space-y-6 sm:p-4 sm:space-y-8 lg:p-6">
//       {/* Header Section with Yellow Accent */}
//       <div className="flex flex-col gap-3 bg-white/50 backdrop-blur-sm rounded-lg p-3 border-l-4 border-[#FFD700] sm:gap-4 sm:p-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-lg font-bold text-[#0FB3B7] tracking-wide sm:text-2xl">
//             Dashboard
//           </h1>
//           <p className="text-sm text-[#0FB3B7]/60 sm:text-md">{currentPeriodLabel}</p>
//         </div>
//         <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-end sm:justify-end">
//           <label className="flex w-full flex-col gap-1 text-xs font-medium text-[#0FB3B7] sm:w-auto">
//             Month
//             <select
//               value={selectedMonth}
//               onChange={(event) => onMonthChange(Number(event.target.value))}
//               className="h-9 rounded-md border border-[#0FB3B7]/20 bg-white px-2 text-sm font-normal text-[#0FB3B7] outline-none focus:border-[#0FB3B7] focus:ring-2 focus:ring-[#0FB3B7]/20"
//             >
//               {MONTHS.map((month, index) => (
//                 <option key={month} value={index + 1}>{month}</option>
//               ))}
//             </select>
//           </label>
//           <label className="flex w-full flex-col gap-1 text-xs font-medium text-[#0FB3B7] sm:w-auto">
//             Year
//             <Input
//               type="text"
//               inputMode="numeric"
//               pattern="[0-9]{4}"
//               maxLength={4}
//               list="dashboard-year-options"
//               value={yearInput}
//               onChange={(event) => onYearChange(event.target.value.replace(/\D/g, "").slice(0, 4))}
//               aria-label="Year"
//               className="w-full sm:w-20 border-[#0FB3B7]/20 bg-white text-[#0FB3B7] focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20"
//             />
//             <datalist id="dashboard-year-options">
//               {Array.from({ length: 11 }, (_, index) => new Date().getFullYear() - 5 + index).map((year) => (
//                 <option key={year} value={year} />
//               ))}
//             </datalist>
//           </label>
//         </div>
//       </div>

//       <section className="space-y-3 sm:space-y-4">
//         <div className="flex items-center gap-2 sm:gap-3">
//           <div className="w-1 h-6 bg-[#FFD700] rounded-full sm:h-8"></div>
//           <h2 className="text-sm font-bold text-[#0FB3B7] uppercase tracking-wider sm:text-lg">
//             Student Statistics
//           </h2>
//         </div>
//         <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-5">
//           <SummaryCard title="Total Students" value={stats.students.totalStudents} />
//           <SummaryCard
//             title="Current Month Active Students"
//             value={stats.students.currentMonthActiveStudents}
//           />
//           <SummaryCard
//             title="Current Month Inactive Students"
//             value={stats.students.totalStudents - stats.students.currentMonthActiveStudents}
//           />
//           <SummaryCard
//             title="Current Month Paid Students"
//             value={stats.students.currentMonthPaidStudents}
//           />
//           <SummaryCard
//             title="Current Month Unpaid Students"
//             value={stats.students.currentMonthUnpaidStudents}
//           />
//         </div>
//       </section>

//       <section className="space-y-3 sm:space-y-4">
//         <div className="flex items-center gap-2 sm:gap-3">
//           <div className="w-1 h-6 bg-[#FFD700] rounded-full sm:h-8"></div>
//           <h2 className="text-sm font-bold text-[#0FB3B7] uppercase tracking-wider sm:text-lg">
//             Financial Statistics
//           </h2>
//         </div>
//         <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-4">
//           <SummaryCard
//             title="Expected Monthly Income"
//             value={formatCurrency(stats.financial.expectedMonthlyIncome)}
//           />
//           <SummaryCard
//             title="Collected Income"
//             value={formatCurrency(stats.financial.collectedIncome)}
//           />
//           <SummaryCard
//             title="Remaining Income"
//             value={formatCurrency(stats.financial.remainingIncome)}
//           />
//           <SummaryCard
//             title="Total Overhead Due"
//             value={formatCurrency(stats.financial.totalOverheadDue)}
//           />
//         </div>
//       </section>


//       <section className="space-y-3 sm:space-y-4">
//         <div className="flex items-center gap-2 sm:gap-3">
//           <div className="w-1 h-6 bg-[#FFD700] rounded-full sm:h-8"></div>
//           <h2 className="text-sm font-bold text-[#0FB3B7] uppercase tracking-wider sm:text-lg">
//             Other Statistics
//           </h2>
//         </div>

//         <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-4">
//           <SummaryCard
//             title="Registration Fees"
//             value={formatCurrency(stats.otherStats.registrationFees)}
//           />

//           <SummaryCard
//             title="Additional / Stationery Charges"
//             value={formatCurrency(stats.otherStats.additionalStationeryCharges)}
//           />

//           <SummaryCard
//             title="Late Fees"
//             value={formatCurrency(stats.otherStats.lateFees)}
//           />

//           <SummaryCard
//             title="Discount"
//             value={formatCurrency(stats.otherStats.discount)}
//           />
//         </div>
//       </section>


//       <section className="space-y-3 sm:space-y-4">
//         <div className="flex items-center gap-2 sm:gap-3">
//           <div className="w-1 h-6 bg-[#FFD700] rounded-full sm:h-8"></div>
//           <h2 className="text-sm font-bold text-[#0FB3B7] uppercase tracking-wider sm:text-lg">
//             Receipt Statistics
//           </h2>
//         </div>
//         <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-4">
//           <SummaryCard
//             title="Total Receipts"
//             value={stats.receipts.totalReceiptsCurrentMonth}
//           />
//           <SummaryCard
//             title="Receipt Amount"
//             value={formatCurrency(stats.receipts.totalReceiptAmountCurrentMonth)}
//           />
//           <SummaryCard
//             title="Other Receipts"
//             value={stats.receipts.totalOtherReceiptsCurrentMonth}
//           />
//           <SummaryCard
//             title="Other Receipt Amount"
//             value={formatCurrency(stats.receipts.totalOtherReceiptAmountCurrentMonth)}
//           />
//         </div>
//       </section>

//       <section className="space-y-4 sm:space-y-6">
//         <div className="flex items-center gap-2 sm:gap-3">
//           <div className="w-1 h-6 bg-[#FFD700] rounded-full sm:h-8"></div>
//           <h2 className="text-sm font-bold text-[#0FB3B7] uppercase tracking-wider sm:text-lg">
//             Department  Statistics
//           </h2>
//         </div>

        

//         <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
//           {/* 1st Row: JSI TUITION CENTRE (Left) | JSI COACHING CENTRE (Right) */}
//           {stats.groupStats
//             .filter((g) => g.group === "JSI TUITION CENTRE" || g.group === "JSI COACHING CENTRE")
//             .sort((a, b) => {
//               const order = ["JSI TUITION CENTRE", "JSI COACHING CENTRE"];
//               return order.indexOf(a.group) - order.indexOf(b.group);
//             })
//             .map((group) => (
//               <Card
//                 key={group.group}
//                 className="bg-white/50 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl"
//               >
//                 <CardHeader className="border-b border-[#FFD700]/20 pb-2 p-3 sm:pb-3 sm:p-6">
//                   <CardTitle className="text-sm text-[#0FB3B7] flex items-center gap-2 sm:text-lg">
//                     <span className="inline-block w-1.5 h-5 bg-[#FFD700] rounded-full sm:h-6"></span>
//                     {group.group}
//                   </CardTitle>
//                 </CardHeader>

//                 <CardContent className="pt-3 p-3 sm:pt-4 sm:p-6">
//                   <div className="grid grid-cols-2 gap-3 sm:gap-4">
//                     <SummaryCard title="Students" value={group.totalStudents} />
//                     <SummaryCard title="Total Fees" value={formatCurrency(group.totalFees)} />
//                     <SummaryCard title="Paid Fees" value={formatCurrency(group.paidFees)} />
//                     <SummaryCard title="Due Fees" value={formatCurrency(group.dueFees)} />
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}

//           {/* 2nd Row: JSI BASIC CLASSES (Left) | JSI PRE-SCHOOLING (Right) */}
//           {stats.groupStats
//             .filter((g) => g.group === "JSI BASIC CLASSES" || g.group === "JSI PRE-SCHOOLING")
//             .sort((a, b) => {
//               const order = ["JSI BASIC CLASSES", "JSI PRE-SCHOOLING"];
//               return order.indexOf(a.group) - order.indexOf(b.group);
//             })
//             .map((group) => (
//               <Card
//                 key={group.group}
//                 className="bg-white/50 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl"
//               >
//                 <CardHeader className="border-b border-[#FFD700]/20 pb-2 p-3 sm:pb-3 sm:p-6">
//                   <CardTitle className="text-sm text-[#0FB3B7] flex items-center gap-2 sm:text-lg">
//                     <span className="inline-block w-1.5 h-5 bg-[#FFD700] rounded-full sm:h-6"></span>
//                     {group.group}
//                   </CardTitle>
//                 </CardHeader>

//                 <CardContent className="pt-3 p-3 sm:pt-4 sm:p-6">
//                   <div className="grid grid-cols-2 gap-3 sm:gap-4">
//                     <SummaryCard title="Students" value={group.totalStudents} />
//                     <SummaryCard title="Total Fees" value={formatCurrency(group.totalFees)} />
//                     <SummaryCard title="Paid Fees" value={formatCurrency(group.paidFees)} />
//                     <SummaryCard title="Due Fees" value={formatCurrency(group.dueFees)} />
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//         </div>

//       </section>


//     </div>
//   );
// }






















"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DashboardData } from "@/types/dashboard";

interface SummaryCardProps {
  title: string;
  value: string | number;
}

function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <Card className="bg-[#0FB3B7]/5 border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-lg h-full">
      <CardHeader className="pb-1 p-3 min-h-[40px] sm:pb-2 sm:p-6 sm:min-h-[48px]">
        <CardTitle className="text-[10px] font-small text-[#0FB3B7] uppercase tracking-wider line-clamp-2 sm:text-xs">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-3 pb-3 flex items-end min-h-[40px] sm:px-6 sm:pb-6 sm:min-h-[48px]">
        <p className="text-base font-bold text-[#0FB3B7] sm:text-xl break-all">{value}</p>
      </CardContent>
    </Card>
  );
}

const formatCurrency = (amount: number) =>
  `PKR ${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

interface DashboardSummaryCardsProps {
  stats: DashboardData;
  selectedMonth: number;
  yearInput: string;
  onMonthChange: (month: number) => void;
  onYearChange: (year: string) => void;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function DashboardSummaryCards({
  stats,
  selectedMonth,
  yearInput,
  onMonthChange,
  onYearChange,
}: DashboardSummaryCardsProps) {
  const currentPeriodLabel = `${stats.currentMonth} ${stats.currentYear}`;

  return (
    <div className="w-full min-w-0 bg-[#EFEFEF] p-3 space-y-6 sm:p-4 sm:space-y-8 lg:p-6">
      {/* Header Section with Yellow Accent */}
      <div className="flex flex-col gap-3 bg-white/50 backdrop-blur-sm rounded-lg p-3 border-l-4 border-[#FFD700] sm:gap-4 sm:p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-lg font-bold text-[#0FB3B7] tracking-wide sm:text-2xl">
            Dashboard
          </h1>
          <p className="text-sm text-[#0FB3B7]/60 sm:text-md">{currentPeriodLabel}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-end sm:justify-end">
          <label className="flex w-full flex-col gap-1 text-xs font-medium text-[#0FB3B7] sm:w-auto">
            Month
            <select
              value={selectedMonth}
              onChange={(event) => onMonthChange(Number(event.target.value))}
              className="h-9 w-full rounded-md border border-[#0FB3B7]/20 bg-white px-2 text-sm font-normal text-[#0FB3B7] outline-none focus:border-[#0FB3B7] focus:ring-2 focus:ring-[#0FB3B7]/20 sm:w-auto"
            >
              {MONTHS.map((month, index) => (
                <option key={month} value={index + 1}>{month}</option>
              ))}
            </select>
          </label>
          <label className="flex w-full flex-col gap-1 text-xs font-medium text-[#0FB3B7] sm:w-auto">
            Year
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]{4}"
              maxLength={4}
              list="dashboard-year-options"
              value={yearInput}
              onChange={(event) => onYearChange(event.target.value.replace(/\D/g, "").slice(0, 4))}
              aria-label="Year"
              className="w-full sm:w-20 border-[#0FB3B7]/20 bg-white text-[#0FB3B7] focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20"
            />
            <datalist id="dashboard-year-options">
              {Array.from({ length: 11 }, (_, index) => new Date().getFullYear() - 5 + index).map((year) => (
                <option key={year} value={year} />
              ))}
            </datalist>
          </label>
        </div>
      </div>

      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-1 h-6 bg-[#FFD700] rounded-full sm:h-8"></div>
          <h2 className="text-sm font-bold text-[#0FB3B7] uppercase tracking-wider sm:text-lg">
            Student Statistics
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <SummaryCard title="Total Students" value={stats.students.totalStudents} />
          <SummaryCard
            title="Current Month Active Students"
            value={stats.students.currentMonthActiveStudents}
          />
          <SummaryCard
            title="Current Month Inactive Students"
            value={stats.students.totalStudents - stats.students.currentMonthActiveStudents}
          />
          <SummaryCard
            title="Current Month Paid Students"
            value={stats.students.currentMonthPaidStudents}
          />
          <SummaryCard
            title="Current Month Unpaid Students"
            value={stats.students.currentMonthUnpaidStudents}
          />
        </div>
      </section>

      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-1 h-6 bg-[#FFD700] rounded-full sm:h-8"></div>
          <h2 className="text-sm font-bold text-[#0FB3B7] uppercase tracking-wider sm:text-lg">
            Financial Statistics
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Expected Monthly Income"
            value={formatCurrency(stats.financial.expectedMonthlyIncome)}
          />
          <SummaryCard
            title="Collected Income"
            value={formatCurrency(stats.financial.collectedIncome)}
          />
          <SummaryCard
            title="Remaining Income"
            value={formatCurrency(stats.financial.remainingIncome)}
          />
          <SummaryCard
            title="Total Overhead Due"
            value={formatCurrency(stats.financial.totalOverheadDue)}
          />
        </div>
      </section>


      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-1 h-6 bg-[#FFD700] rounded-full sm:h-8"></div>
          <h2 className="text-sm font-bold text-[#0FB3B7] uppercase tracking-wider sm:text-lg">
            Other Statistics
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Registration Fees"
            value={formatCurrency(stats.otherStats.registrationFees)}
          />

          <SummaryCard
            title="Additional / Stationery Charges"
            value={formatCurrency(stats.otherStats.additionalStationeryCharges)}
          />

          <SummaryCard
            title="Late Fees"
            value={formatCurrency(stats.otherStats.lateFees)}
          />

          <SummaryCard
            title="Discount"
            value={formatCurrency(stats.otherStats.discount)}
          />
        </div>
      </section>


      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-1 h-6 bg-[#FFD700] rounded-full sm:h-8"></div>
          <h2 className="text-sm font-bold text-[#0FB3B7] uppercase tracking-wider sm:text-lg">
            Receipt Statistics
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Receipts"
            value={stats.receipts.totalReceiptsCurrentMonth}
          />
          <SummaryCard
            title="Receipt Amount"
            value={formatCurrency(stats.receipts.totalReceiptAmountCurrentMonth)}
          />
          <SummaryCard
            title="Other Receipts"
            value={stats.receipts.totalOtherReceiptsCurrentMonth}
          />
          <SummaryCard
            title="Other Receipt Amount"
            value={formatCurrency(stats.receipts.totalOtherReceiptAmountCurrentMonth)}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-1 h-6 bg-[#FFD700] rounded-full sm:h-8"></div>
          <h2 className="text-sm font-bold text-[#0FB3B7] uppercase tracking-wider sm:text-lg">
            Department  Statistics
          </h2>
        </div>

        

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          {/* 1st Row: JSI TUITION CENTRE (Left) | JSI COACHING CENTRE (Right) */}
          {stats.groupStats
            .filter((g) => g.group === "JSI TUITION CENTRE" || g.group === "JSI COACHING CENTRE")
            .sort((a, b) => {
              const order = ["JSI TUITION CENTRE", "JSI COACHING CENTRE"];
              return order.indexOf(a.group) - order.indexOf(b.group);
            })
            .map((group) => (
              <Card
                key={group.group}
                className="bg-white/50 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl"
              >
                <CardHeader className="border-b border-[#FFD700]/20 pb-2 p-3 sm:pb-3 sm:p-6">
                  <CardTitle className="text-sm text-[#0FB3B7] flex items-center gap-2 sm:text-lg">
                    <span className="inline-block w-1.5 h-5 bg-[#FFD700] rounded-full sm:h-6 shrink-0"></span>
                    <span className="truncate">{group.group}</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-3 p-3 sm:pt-4 sm:p-6">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <SummaryCard title="Students" value={group.totalStudents} />
                    <SummaryCard title="Total Fees" value={formatCurrency(group.totalFees)} />
                    <SummaryCard title="Paid Fees" value={formatCurrency(group.paidFees)} />
                    <SummaryCard title="Due Fees" value={formatCurrency(group.dueFees)} />
                  </div>
                </CardContent>
              </Card>
            ))}

          {/* 2nd Row: JSI BASIC CLASSES (Left) | JSI PRE-SCHOOLING (Right) */}
          {stats.groupStats
            .filter((g) => g.group === "JSI BASIC CLASSES" || g.group === "JSI PRE-SCHOOLING")
            .sort((a, b) => {
              const order = ["JSI BASIC CLASSES", "JSI PRE-SCHOOLING"];
              return order.indexOf(a.group) - order.indexOf(b.group);
            })
            .map((group) => (
              <Card
                key={group.group}
                className="bg-white/50 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl"
              >
                <CardHeader className="border-b border-[#FFD700]/20 pb-2 p-3 sm:pb-3 sm:p-6">
                  <CardTitle className="text-sm text-[#0FB3B7] flex items-center gap-2 sm:text-lg">
                    <span className="inline-block w-1.5 h-5 bg-[#FFD700] rounded-full sm:h-6 shrink-0"></span>
                    <span className="truncate">{group.group}</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-3 p-3 sm:pt-4 sm:p-6">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <SummaryCard title="Students" value={group.totalStudents} />
                    <SummaryCard title="Total Fees" value={formatCurrency(group.totalFees)} />
                    <SummaryCard title="Paid Fees" value={formatCurrency(group.paidFees)} />
                    <SummaryCard title="Due Fees" value={formatCurrency(group.dueFees)} />
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

      </section>


    </div>
  );
}
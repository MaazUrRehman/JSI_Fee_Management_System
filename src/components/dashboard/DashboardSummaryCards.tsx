"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardData } from "@/types/dashboard";

interface SummaryCardProps {
  title: string;
  value: string | number;
}

function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    // <Card className="bg-[#0FB3B7]/5 border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-lg">
    //   <CardHeader className="pb-2">
    //     <CardTitle className="text-xs font-small text-[#0FB3B7] uppercase tracking-wider">
    //       {title}
    //     </CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     <p className="text-xl font-bold text-[#0FB3B7]">{value}</p>
    //   </CardContent>
    // </Card>

    <Card className="bg-[#0FB3B7]/5 border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-lg h-full">
      <CardHeader className="pb-2 min-h-[48px]">
        <CardTitle className="text-xs font-small text-[#0FB3B7] uppercase tracking-wider line-clamp-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 flex items-end h-[calc(100%-48px)]">
        <p className="text-xl font-bold text-[#0FB3B7]">{value}</p>
      </CardContent>
    </Card>
  );
}

const formatCurrency = (amount: number) =>
  `PKR ${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

interface DashboardSummaryCardsProps {
  stats: DashboardData;
}

export function DashboardSummaryCards({ stats }: DashboardSummaryCardsProps) {
  const currentPeriodLabel = `${stats.currentMonth} ${stats.currentYear}`;

  return (
    <div className="min-h-screen bg-[#EFEFEF] p-6 space-y-8">
      {/* Header Section with Yellow Accent */}
      <div className="flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-lg p-4 border-l-4 border-[#FFD700]">
        <div>
          <h1 className="text-2xl font-bold text-[#0FB3B7] tracking-wide">
            Dashboard
          </h1>
          <p className="text-md text-[#0FB3B7]/60">{currentPeriodLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
          <span className="text-md text-[#0FB3B7]/60">Live</span>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#FFD700] rounded-full"></div>
          <h2 className="text-lg font-bold text-[#0FB3B7] uppercase tracking-wider">
            Student Statistics
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
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

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#FFD700] rounded-full"></div>
          <h2 className="text-lg font-bold text-[#0FB3B7] uppercase tracking-wider">
            Financial Statistics
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#FFD700] rounded-full"></div>
          <h2 className="text-lg font-bold text-[#0FB3B7] uppercase tracking-wider">
            Receipt Statistics
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#FFD700] rounded-full"></div>
          <h2 className="text-lg font-bold text-[#0FB3B7] uppercase tracking-wider">
            Department  Statistics
          </h2>
        </div>

        {/* <div className="grid gap-6 lg:grid-cols-2">
          {stats.groupStats.map((group) => (
            <Card
              key={group.group}
              className="bg-white/50 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl"
            >
              <CardHeader className="border-b border-[#FFD700]/20 pb-3">
                <CardTitle className="text-[#0FB3B7] flex items-center gap-2 text-lg">
                  <span className="inline-block w-1.5 h-6 bg-[#FFD700] rounded-full"></span>
                  {group.group}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <SummaryCard title="Students" value={group.totalStudents} />
                  <SummaryCard title="Total Fees" value={formatCurrency(group.totalFees)} />
                  <SummaryCard title="Paid Fees" value={formatCurrency(group.paidFees)} />
                  <SummaryCard title="Due Fees" value={formatCurrency(group.dueFees)} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}


          <div className="grid gap-6 lg:grid-cols-2">
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
        <CardHeader className="border-b border-[#FFD700]/20 pb-3">
          <CardTitle className="text-[#0FB3B7] flex items-center gap-2 text-lg">
            <span className="inline-block w-1.5 h-6 bg-[#FFD700] rounded-full"></span>
            {group.group}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-4">
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
        <CardHeader className="border-b border-[#FFD700]/20 pb-3">
          <CardTitle className="text-[#0FB3B7] flex items-center gap-2 text-lg">
            <span className="inline-block w-1.5 h-6 bg-[#FFD700] rounded-full"></span>
            {group.group}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-4">
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
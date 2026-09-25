


"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { DashboardSummaryCards } from "@/components/dashboard/DashboardSummaryCards";
import DashboardCharts from "@/components/dashboard/DashboardCharts";

import {
  getDashboardData,
  getEmptyDashboardData,
} from "@/services/dashboard.service";

import { DashboardData } from "@/types/dashboard";

export default function DashboardPage() {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [yearInput, setYearInput] = useState(String(today.getFullYear()));
  const [dashboardData, setDashboardData] = useState<DashboardData>(
    getEmptyDashboardData()
  );
  const [loading, setLoading] = useState(true);

  const enteredYear = /^\d{4}$/.test(yearInput) ? Number(yearInput) : null;
  const selectedYear = enteredYear && enteredYear >= 1000 ? enteredYear : null;

  useEffect(() => {
    if (!selectedYear) return;

    let isCurrentRequest = true;
    const fetchDashboardData = async () => {
      setLoading(true);

      try {
        const data = await getDashboardData(selectedMonth, selectedYear);
        if (isCurrentRequest) setDashboardData(data);
      } catch (error) {
        console.error(error);
        if (isCurrentRequest) {
          toast.error("Failed to load dashboard data");
          setDashboardData(getEmptyDashboardData(new Date(selectedYear, selectedMonth - 1, 1)));
        }
      } finally {
        if (isCurrentRequest) setLoading(false);
      }
    };

    fetchDashboardData();
    return () => {
      isCurrentRequest = false;
    };
  }, [selectedMonth, selectedYear]);

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      
      {/* Summary Cards */}
      <DashboardSummaryCards
        stats={dashboardData}
        selectedMonth={selectedMonth}
        yearInput={yearInput}
        onMonthChange={setSelectedMonth}
        onYearChange={setYearInput}
      />

      {/* Charts */}
      <DashboardCharts data={dashboardData} />
    </div>
  );
}

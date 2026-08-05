


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
  const [dashboardData, setDashboardData] = useState<DashboardData>(
    getEmptyDashboardData()
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);

      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load dashboard data");
        setDashboardData(getEmptyDashboardData());
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Summary Cards */}
      <DashboardSummaryCards stats={dashboardData} />

      {/* Charts */}
      <DashboardCharts data={dashboardData} />
    </div>
  );
}
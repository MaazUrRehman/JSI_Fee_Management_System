"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardData } from "@/types/dashboard";

interface Props {
  data: DashboardData;
}

const COLORS = [
  "#0FB3B7", // Dark Seagreen
  "#FFD700", // Gold/Yellow
  "#FF6B6B", // Soft Red
  "#4ECDC4", // Mint
  "#45B7D1", // Blue
  "#96CEB4", // Light Green
];

export default function DashboardCharts({ data }: Props) {
  const otherReceiptsChart = [
    {
      name: "Other Receipts",
      amount: data.receipts.totalOtherReceiptAmountCurrentMonth,
    },
  ];
  return (
    <div className="min-h-screen bg-[#EFEFEF] p-6 space-y-8">
      {/* Header with Yellow Accent */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-[#FFD700] rounded-full"></div>
        <h2 className="text-xl font-bold text-[#0FB3B7] uppercase tracking-wider">
          Charts & Analytics
        </h2>
      </div>

      {/* Monthly Income */}
      <Card className="bg-white/70 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl">
        <CardHeader className="border-b border-[#FFD700]/20">
          <CardTitle className="text-[#0FB3B7] flex items-center gap-2">
            <span className="inline-block w-1.5 h-6 bg-[#FFD700] rounded-full"></span>
            Monthly Income Trend
          </CardTitle>
        </CardHeader>

        <CardContent className="h-[380px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.incomeTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="month" stroke="#0FB3B7" />
              <YAxis stroke="#0FB3B7" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 179, 183, 0.1)',
                  border: '1px solid #0FB3B7',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="expected"
                stroke="#0FB3B7"
                strokeWidth={3}
                dot={{ fill: '#0FB3B7', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="collected"
                stroke="#FFD700"
                strokeWidth={3}
                dot={{ fill: '#FFD700', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-white/70 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl">
          <CardHeader className="border-b border-[#FFD700]/20">
            <CardTitle className="text-[#0FB3B7] flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-[#FFD700] rounded-full"></span>
              Payment Status
            </CardTitle>
          </CardHeader>

          <CardContent className="h-[350px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.paymentStatus}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {data.paymentStatus.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 179, 183, 0.1)',
                    border: '1px solid #0FB3B7',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl">
          <CardHeader className="border-b border-[#FFD700]/20">
            <CardTitle className="text-[#0FB3B7] flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-[#FFD700] rounded-full"></span>
              Income Distribution
            </CardTitle>
          </CardHeader>

          <CardContent className="h-[350px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.incomeDistribution}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {data.incomeDistribution.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 179, 183, 0.1)',
                    border: '1px solid #0FB3B7',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Students */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-white/70 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl">
          <CardHeader className="border-b border-[#FFD700]/20">
            <CardTitle className="text-[#0FB3B7] flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-[#FFD700] rounded-full"></span>
              Students By Shift
            </CardTitle>
          </CardHeader>

          <CardContent className="h-[350px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.studentsByShift}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="shift" stroke="#0FB3B7" />
                <YAxis stroke="#0FB3B7" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 179, 183, 0.1)',
                    border: '1px solid #0FB3B7',
                    borderRadius: '8px'
                  }}
                />
                <Bar
                  dataKey="students"
                  fill="#0FB3B7"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl">
          <CardHeader className="border-b border-[#FFD700]/20">
            <CardTitle className="text-[#0FB3B7] flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-[#FFD700] rounded-full"></span>
              Students By Class
            </CardTitle>
          </CardHeader>

          <CardContent className="h-[350px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.studentsByClass}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="class" stroke="#0FB3B7" />
                <YAxis stroke="#0FB3B7" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 179, 183, 0.1)',
                    border: '1px solid #0FB3B7',
                    borderRadius: '8px'
                  }}
                />
                <Bar
                  dataKey="students"
                  fill="#FFD700"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Students By Group */}
      {/* <Card className="bg-white/70 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl">
        <CardHeader className="border-b border-[#FFD700]/20">
          <CardTitle className="text-[#0FB3B7] flex items-center gap-2">
            <span className="inline-block w-1.5 h-6 bg-[#FFD700] rounded-full"></span>
            Students By Department
          </CardTitle>
        </CardHeader>

        <CardContent className="h-[350px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.studentsByGroup}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="group" stroke="#0FB3B7" />
              <YAxis stroke="#0FB3B7" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 179, 183, 0.1)',
                  border: '1px solid #0FB3B7',
                  borderRadius: '8px'
                }}
              />
              <Bar
                dataKey="students"
                fill="#0FB3B7"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}


      {/* Students By Group */}
      <Card className="bg-white/70 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl">
        <CardHeader className="border-b border-[#FFD700]/20">
          <CardTitle className="text-[#0FB3B7] flex items-center gap-2">
            <span className="inline-block w-1.5 h-6 bg-[#FFD700] rounded-full"></span>
            Students By Department
          </CardTitle>
        </CardHeader>

        <CardContent className="h-[350px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[...data.studentsByGroup].sort((a, b) => {
                const order = [
                  "JSI TUITION CENTRE",
                  "JSI COACHING CENTRE",
                  "JSI BASIC CLASSES",
                  "JSI PRE-SCHOOLING"
                ];
                return order.indexOf(a.group) - order.indexOf(b.group);
              })}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="group" stroke="#0FB3B7" />
              <YAxis stroke="#0FB3B7" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 179, 183, 0.1)',
                  border: '1px solid #0FB3B7',
                  borderRadius: '8px'
                }}
              />
              <Bar
                dataKey="students"
                fill="#0FB3B7"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>


      {/* Other Receipts */}
      <Card className="bg-white/70 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl">
        <CardHeader className="border-b border-[#FFD700]/20">
          <CardTitle className="text-[#0FB3B7] flex items-center gap-2">
            <span className="inline-block w-1.5 h-6 bg-[#FFD700] rounded-full"></span>
            Other Receipts (Current Month)
          </CardTitle>
        </CardHeader>

        <CardContent className="h-[350px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  {
                    name: "Paid",
                    value: data.receipts.totalOtherReceiptAmountCurrentMonth,
                  },
                  {
                    name: "Unpaid",
                    value: Math.max(
                      0,
                      data.otherReceipts
                        .filter((r) => r.payment_status === "Unpaid")
                        .reduce((sum, r) => sum + Number(r.fees || 0), 0)
                    ),
                  },
                ]}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                <Cell fill="#0FB3B7" />
                <Cell fill="#FFD700" />
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 179, 183, 0.1)',
                  border: '1px solid #0FB3B7',
                  borderRadius: '8px'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-[#0FB3B7]/40 border-t border-[#FFD700]/20 pt-4 mt-8">
        <p>JSI Fee Management System © 2026</p>
      </div>
    </div>
  );
}
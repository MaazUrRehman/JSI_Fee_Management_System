

import { OtherReceipt } from "@/types/other_receipt";
import { Receipt } from "@/types/receipt";
import { Student } from "@/types/student";

export interface DashboardStudentStats {
  totalStudents: number;
  currentMonthActiveStudents: number;
  currentMonthPaidStudents: number;
  currentMonthUnpaidStudents: number;
}

export interface DashboardFinancialStats {
  expectedMonthlyIncome: number;
  collectedIncome: number;
  remainingIncome: number;
  totalOverheadDue: number;
}

// export interface DashboardReceiptStats {
//   totalReceiptsCurrentMonth: number;
//   otherReceiptsIncome: number;
// }

export interface DashboardReceiptStats {
  totalReceiptsCurrentMonth: number;
  totalReceiptAmountCurrentMonth: number;

  totalOtherReceiptsCurrentMonth: number;
  totalOtherReceiptAmountCurrentMonth: number;
}

export interface IncomeTrendItem {
  month: string;
  expected: number;
  collected: number;
}

export interface ChartItem {
  name: string;
  value: number;
}

export interface StudentsByGroupItem {
  group: string;
  students: number;
}

export interface StudentsByClassItem {
  class: string;
  students: number;
}

export interface StudentsByShiftItem {
  shift: string;
  students: number;
}


export interface GroupStatsItem {
  group: string;

  totalStudents: number;
  totalFees: number;
  paidFees: number;
  dueFees: number;
}


export interface DashboardStats {
  students: DashboardStudentStats;
  financial: DashboardFinancialStats;
  receipts: DashboardReceiptStats;
}

export interface DashboardData extends DashboardStats {
  currentMonth: string;
  currentYear: number;

  studentsList: Student[];
  currentMonthReceipts: Receipt[];
  otherReceipts: OtherReceipt[];

  // Step 3
  incomeTrend: IncomeTrendItem[];
  incomeDistribution: ChartItem[];
  paymentStatus: ChartItem[];

  // Step 4
  studentsByGroup: StudentsByGroupItem[];
  studentsByClass: StudentsByClassItem[];
  studentsByShift: StudentsByShiftItem[];
  groupStats: GroupStatsItem[];
}




import { format } from "date-fns";
import { supabase } from "@/lib/supabase";
import { DashboardData } from "@/types/dashboard";
import { OtherReceipt } from "@/types/other_receipt";
import { Receipt } from "@/types/receipt";
import { Student } from "@/types/student";

const EMPTY_STATS: DashboardData = {
  currentMonth: format(new Date(), "MMMM"),
  currentYear: Number(format(new Date(), "yyyy")),
  students: {
    totalStudents: 0,
    currentMonthActiveStudents: 0,
    currentMonthPaidStudents: 0,
    currentMonthUnpaidStudents: 0,
  },
  financial: {
    expectedMonthlyIncome: 0,
    collectedIncome: 0,
    remainingIncome: 0,
    totalOverheadDue: 0,
  },
  // receipts: {
  //   totalReceiptsCurrentMonth: 0,
  //   otherReceiptsIncome: 0,
  // },
  receipts: {
    totalReceiptsCurrentMonth: 0,
    totalReceiptAmountCurrentMonth: 0,
    totalOtherReceiptsCurrentMonth: 0,
    totalOtherReceiptAmountCurrentMonth: 0,
  },
  studentsList: [],
  currentMonthReceipts: [],
  otherReceipts: [],
  incomeTrend: [],
  paymentStatus: [],
  incomeDistribution: [],
  studentsByGroup: [],
  studentsByClass: [],
  studentsByShift: [],
  groupStats: []
};

export const calculateLateCharges = (referenceDate: Date = new Date()): number => {
  const day = referenceDate.getDate();
  if (day >= 1 && day <= 10) return 0;
  if (day >= 11 && day <= 20) return 100;
  return 200;
};

export const getStudentRegistrationMonths = (student: Student) => {
  const admissionDate = student.admission_date ? new Date(student.admission_date) : new Date();
  const months: { month: string; year: number }[] = [];

  for (let index = 0; index < (student.registered_for_months || 0); index++) {
    const date = new Date(admissionDate);
    date.setMonth(admissionDate.getMonth() + index);
    months.push({
      month: date.toLocaleString("default", { month: "long" }),
      year: date.getFullYear(),
    });
  }

  return months;
};

export const isStudentActiveForMonth = (
  student: Student,
  monthName: string,
  year: number
): boolean => {
  if (student.status !== "Active") return false;

  return getStudentRegistrationMonths(student).some(
    (entry) => entry.month === monthName && entry.year === year
  );
};

const matchesCurrentMonth = (
  receipt: Receipt,
  monthName: string,
  year: number
): boolean => {
  const receiptMonth =
    typeof receipt.month === "number"
      ? format(new Date(year, receipt.month - 1, 1), "MMMM")
      : String(receipt.month);

  return receiptMonth === monthName && Number(receipt.year) === year;
};

const getReceiptForStudent = (
  receipts: Receipt[],
  studentId: string,
  monthName: string,
  year: number
) => {
  return receipts.find(
    (receipt) =>
      receipt.student_id === studentId &&
      matchesCurrentMonth(receipt, monthName, year)
  );
};

export const buildDashboardData = (
  students: Student[],
  receipts: Receipt[],
  otherReceipts: OtherReceipt[],
  referenceDate: Date = new Date()
): DashboardData => {
  const currentMonth = format(referenceDate, "MMMM");
  const currentYear = Number(format(referenceDate, "yyyy"));

  const currentMonthReceipts = receipts.filter((receipt) =>
    matchesCurrentMonth(receipt, currentMonth, currentYear)
  );

  const currentMonthActiveStudents = students.filter((student) =>
    isStudentActiveForMonth(student, currentMonth, currentYear)
  );

  const currentMonthPaidStudents = currentMonthActiveStudents.filter((student) => {
    const receipt = getReceiptForStudent(
      currentMonthReceipts,
      student.id,
      currentMonth,
      currentYear
    );
    return receipt?.status === "Paid";
  });

  const currentMonthUnpaidStudents = currentMonthActiveStudents.filter((student) => {
    const receipt = getReceiptForStudent(
      currentMonthReceipts,
      student.id,
      currentMonth,
      currentYear
    );
    return receipt?.status !== "Paid";
  });

  const expectedMonthlyIncome = currentMonthActiveStudents.reduce(
    (total, student) => total + (Number(student.monthly_fee) || 0),
    0
  );

  const collectedIncome = currentMonthReceipts
    .filter((receipt) => receipt.status === "Paid")
    .reduce((total, receipt) => total + (Number(receipt.total_amount) - (Number(receipt.remaining_amount) || 0)), 0);

  const remainingIncome = Math.max(0, expectedMonthlyIncome - collectedIncome);

  const totalOverheadDue = currentMonthUnpaidStudents.reduce((total, student) => {
    const receipt = getReceiptForStudent(
      currentMonthReceipts,
      student.id,
      currentMonth,
      currentYear
    );

    if (receipt) {
      return total + (Number(receipt.late_charges) || 0);
    }

    return total + calculateLateCharges(referenceDate);
  }, 0);

  const otherReceiptsIncome = otherReceipts
    .filter((receipt) => receipt.payment_status === "Paid")
    .reduce((total, receipt) => total + (Number(receipt.fees) || 0), 0);


  // const currentMonthOtherReceipts = otherReceipts.filter((receipt) => {
  //   const date = new Date(receipt.date);
  //   return (
  //     format(date, "MMMM") === currentMonth &&
  //     date.getFullYear() === currentYear
  //   );
  // });

//   const currentMonthOtherReceipts = otherReceipts.filter((receipt) => {
//   if (!receipt.date) return false;

//   const date = new Date(receipt.date);

//   if (isNaN(date.getTime())) return false;

//   return (
//     format(date, "MMMM") === currentMonth &&
//     date.getFullYear() === currentYear
//   );
// });

const currentMonthOtherReceipts = otherReceipts.filter((receipt) => {
  if (!receipt.paid_date) return false;

  const date = new Date(receipt.paid_date);

  return (
    format(date, "MMMM") === currentMonth &&
    date.getFullYear() === currentYear
  );
});

  const totalReceiptAmountCurrentMonth = currentMonthReceipts.reduce(
    (sum, receipt) => sum + Number(receipt.total_amount || 0),
    0
  );

  const totalOtherReceiptAmountCurrentMonth = currentMonthOtherReceipts.reduce(
    (sum, receipt) => sum + Number(receipt.fees || 0),
    0
  );

  // Calculate income distribution
  const incomeDistribution = [
    {
      name: "Collected",
      value: collectedIncome,
    },
    {
      name: "Remaining",
      value: remainingIncome,
    },
  ];

  // Calculate payment status
  const paymentStatus = [
    {
      name: "Paid",
      value: currentMonthPaidStudents.length,
    },
    {
      name: "Unpaid",
      value: currentMonthUnpaidStudents.length,
    },
  ];

  // Calculate students by group
  // Calculate students by group
  const studentsByGroup = Object.values(
    students.reduce<Record<string, { group: string; students: number }>>(
      (acc, student) => {
        const key = student.student_group || "Unknown";

        if (!acc[key]) {
          acc[key] = {
            group: key,
            students: 0,
          };
        }

        acc[key].students++;
        return acc;
      },
      {}
    )
  );

  // Calculate students by class
  const studentsByClass = Object.values(
    students.reduce<Record<string, { class: string; students: number }>>(
      (acc, student) => {
        const key = student.class || "Unknown";

        if (!acc[key]) {
          acc[key] = {
            class: key,
            students: 0,
          };
        }

        acc[key].students++;
        return acc;
      },
      {}
    )
  );

  // Calculate students by shift
  const studentsByShift = Object.values(
    students.reduce<Record<string, { shift: string; students: number }>>(
      (acc, student) => {
        const key = student.shift || "Unknown";

        if (!acc[key]) {
          acc[key] = {
            shift: key,
            students: 0,
          };
        }

        acc[key].students++;
        return acc;
      },
      {}
    )
  );

  const GROUPS = [
    "JSI COACHING CENTRE",
    "JSI BASIC CLASSES",
    "JSI PRE-SCHOOLING",
    "JSI TUITION CENTRE",
  ];

  const groupStats = GROUPS.map((group) => {
    const groupStudents = currentMonthActiveStudents.filter(
      (s) => s.student_group === group
    );

    const paidStudents = groupStudents.filter((student) => {
      const receipt = getReceiptForStudent(
        currentMonthReceipts,
        student.id,
        currentMonth,
        currentYear
      );

      return receipt?.status === "Paid";
    });

    const totalFees = groupStudents.reduce(
      (sum, s) => sum + Number(s.monthly_fee || 0),
      0
    );

    const paidFees = paidStudents.reduce(
      (sum, s) => sum + Number(s.monthly_fee || 0),
      0
    );

    return {
      group,
      totalStudents: groupStudents.length,
      totalFees,
      paidFees,
      dueFees: totalFees - paidFees,
    };
  });

  // Calculate income trend for the year
  const incomeTrend = Array.from({ length: 12 }, (_, index) => {
    const month = format(new Date(currentYear, index, 1), "MMMM");

    const expected = students
      .filter((s) => isStudentActiveForMonth(s, month, currentYear))
      .reduce((sum, s) => sum + Number(s.monthly_fee || 0), 0);

    const collected = receipts
      .filter(
        (r) =>
          matchesCurrentMonth(r, month, currentYear) &&
          r.status === "Paid"
      )
      .reduce((sum, r) => sum + (Number(r.total_amount || 0) - (Number(r.remaining_amount) || 0)), 0);

    return {
      month,
      expected,
      collected,
    };
  });
  

  return {
    currentMonth,
    currentYear,
    students: {
      totalStudents: students.length,
      currentMonthActiveStudents: currentMonthActiveStudents.length,
      currentMonthPaidStudents: currentMonthPaidStudents.length,
      currentMonthUnpaidStudents: currentMonthUnpaidStudents.length,
    },
    financial: {
      expectedMonthlyIncome,
      collectedIncome,
      remainingIncome,
      totalOverheadDue,
    },
    receipts: {
      totalReceiptsCurrentMonth: currentMonthReceipts.length,
      totalReceiptAmountCurrentMonth,
      totalOtherReceiptsCurrentMonth: currentMonthOtherReceipts.length,
      totalOtherReceiptAmountCurrentMonth,
    },
    studentsList: students,
    currentMonthReceipts,
    otherReceipts,
    incomeTrend,
    paymentStatus,
    incomeDistribution,
    studentsByGroup,
    studentsByClass,
    studentsByShift,
    groupStats,
  };
};

export const getDashboardData = async (): Promise<DashboardData> => {
  const [studentsResult, receiptsResult, otherReceiptsResult] = await Promise.all([
    supabase.from("students").select("*"),
    supabase.from("receipts").select("*"),
    supabase.from("other_receipts").select("*"),
  ]);

  if (studentsResult.error) throw studentsResult.error;
  if (receiptsResult.error) throw receiptsResult.error;
  if (otherReceiptsResult.error) throw otherReceiptsResult.error;

  return buildDashboardData(
    (studentsResult.data || []) as Student[],
    (receiptsResult.data || []) as Receipt[],
    (otherReceiptsResult.data || []) as OtherReceipt[]
  );
};

export const getEmptyDashboardData = (): DashboardData => EMPTY_STATS;
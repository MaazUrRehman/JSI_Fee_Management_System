







"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ReceiptsTable } from "@/components/receipts/ReceiptsTable";
import { Student } from "@/types/student";
import { createReceipt } from "@/services/receipt.service";
import { getStudents } from "@/services/student.service";
import { getStudentReceipts } from "@/services/receipt.service";
import { Loader2 } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function ReceiptFormContent() {
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [receipts, setReceipts] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash");
  const [dueDate, setDueDate] = useState<string>("");
  const [registrationFee, setRegistrationFee] = useState<number>(0);
  const [monthlyFee, setMonthlyFee] = useState<number>(0);
  const [lateFee, setLateFee] = useState<number>(0);
  const [stationaryCharges, setStationaryCharges] = useState<number>(0);
  const [previousBalance, setPreviousBalance] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [paidAmountInput, setPaidAmountInput] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const receiptsTableRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
    fetchStudents();

    // Check for query params
    const studentId = searchParams.get("studentId");
    if (!studentId) {
      const day = new Date().getDate();
      if (day >= 1 && day <= 10) setLateFee(0);
      else if (day >= 11 && day <= 20) setLateFee(100);
      else setLateFee(200);
    }
  }, []);

  useEffect(() => {
    if (students.length > 0 && searchParams.get("studentId")) {
      const studentId = searchParams.get("studentId");
      const student = students.find(s => s.id === studentId);
      if (student) {
        setSelectedStudent(student);
        setMonthlyFee(student.monthly_fee);

        const month = searchParams.get("month");
        const year = searchParams.get("year");

        if (month) setSelectedMonth(month);
        if (year) setSelectedYear(year);

        const day = new Date().getDate();
        if (day >= 1 && day <= 10) setLateFee(0);
        else if (day >= 11 && day <= 20) setLateFee(100);
        else setLateFee(200);

        // Load student's receipts
        getStudentReceipts(student.id).then(setReceipts).catch(() => { });
      }
    }
  }, [students, searchParams]);

  // Previous Balance Auto-Fetcher logic
  useEffect(() => {
    if (selectedStudent && selectedMonth && selectedYear) {
      const studentReceipts = receipts.filter((r) => String(r.student_id) === String(selectedStudent.id));
      const latestReceipt = [...studentReceipts].sort((a, b) => {
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      })[0];

      const nextBalance = latestReceipt && latestReceipt.remaining_amount !== undefined && latestReceipt.remaining_amount !== null
        ? Number(latestReceipt.remaining_amount)
        : 0;
      setPreviousBalance(nextBalance);
    } else {
      setPreviousBalance(0);
    }
  }, [receipts, selectedStudent, selectedMonth, selectedYear]);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      toast.error("Failed to load students");
    }
  };

  const handleStudentSelect = async (studentId: string) => {
    if (!studentId) {
      setSelectedStudent(null);
      return;
    }

    // Find student in the students array
    const student = students.find(s => String(s.id) === String(studentId));

    if (!student) {
      toast.error("Student not found");
      setSelectedStudent(null);
      return;
    }

    setSelectedStudent(student);
    setSelectedMonth("");
    setRegistrationFee(0);
    setMonthlyFee(student.monthly_fee || 0);
    setStationaryCharges(0);
    setPreviousBalance(0);
    setDiscount(0);
    setPaidAmountInput(null);
    setDueDate("");

    const day = new Date().getDate();
    if (day >= 1 && day <= 10) setLateFee(0);
    else if (day >= 11 && day <= 20) setLateFee(100);
    else setLateFee(200);

    try {
      const data = await getStudentReceipts(student.id);
      setReceipts(data);
    } catch (error) {
      toast.error("Failed to load receipts");
    }
  };

  // const getAvailableMonths = () => {
  //   if (!selectedStudent || !selectedStudent.admission_date) return [];

  //   const totalRegistered = selectedStudent.registered_for_months || 0;
  //   const admissionDate = new Date(selectedStudent.admission_date);

  //   const registeredMonths: string[] = [];
  //   for (let i = 0; i < totalRegistered; i++) {
  //     const d = new Date(admissionDate);
  //     d.setMonth(admissionDate.getMonth() + i);
  //     registeredMonths.push(MONTHS[d.getMonth()]);
  //   }

  //   const normaliseMonth = (value: string | number | null | undefined) => {
  //     if (value === null || value === undefined || value === "") return null;
  //     if (typeof value === "number") {
  //       return MONTHS[value - 1] || null;
  //     }
  //     const normalized = String(value).trim().toLowerCase();
  //     if (!normalized) return null;
  //     const monthMap: Record<string, string> = {
  //       january: "January",
  //       jan: "January",
  //       february: "February",
  //       feb: "February",
  //       march: "March",
  //       mar: "March",
  //       april: "April",
  //       apr: "April",
  //       may: "May",
  //       june: "June",
  //       jun: "June",
  //       july: "July",
  //       jul: "July",
  //       august: "August",
  //       aug: "August",
  //       september: "September",
  //       sep: "September",
  //       october: "October",
  //       oct: "October",
  //       november: "November",
  //       nov: "November",
  //       december: "December",
  //       dec: "December",
  //     };
  //     return monthMap[normalized] || null;
  //   };

  //   const existingMonths = receipts
  //     .filter((r) => String(r.student_id) === String(selectedStudent.id))
  //     .map((r) => normaliseMonth(r.month))
  //     .filter((m): m is string => Boolean(m));

  //   return registeredMonths
  //     .filter((month, index, arr) => arr.indexOf(month) === index)
  //     .filter((month) => !existingMonths.includes(month));
  // };

  const getAvailableMonths = () => {
  if (!selectedStudent || !selectedStudent.admission_date) return [];

  const admissionDate = new Date(selectedStudent.admission_date);
  const totalMonths = Number(selectedStudent.registered_for_months || 0);

  // Registered months (name only)
  const registeredMonths: string[] = [];

  for (let i = 0; i < totalMonths; i++) {
    const d = new Date(admissionDate);
    d.setMonth(admissionDate.getMonth() + i);

    registeredMonths.push(MONTHS[d.getMonth()]);
  }

  // Student ki already paid receipts
  const paidMonths = receipts
    .filter(r => String(r.student_id) === String(selectedStudent.id))
    .map(r => {
      const m = Number(r.month);

      if (!isNaN(m) && m >= 1 && m <= 12) {
        return MONTHS[m - 1];
      }

      return String(r.month);
    });

  // Sirf unpaid months return karo
  return registeredMonths.filter(month => !paidMonths.includes(month));
};

  const totalAmount = Math.max(0, registrationFee + monthlyFee + lateFee + stationaryCharges + previousBalance - discount);
  const actualPaidAmount = paidAmountInput !== null ? paidAmountInput : totalAmount;
  const remainingAmount = Math.max(0, totalAmount - actualPaidAmount);

  const handleCreateReceipt = async () => {
    if (!selectedStudent || !selectedMonth) return;
    setIsLoading(true);
    try {
      const chargesArr: number[] = [];
      const detailsArr: string[] = [];
      if (registrationFee > 0) {
        chargesArr.push(registrationFee);
        detailsArr.push("Registration Fee");
      }
      if (stationaryCharges > 0) {
        chargesArr.push(stationaryCharges);
        detailsArr.push("Stationary / Additional Charges");
      }

      // Convert month name to numeric index (1‑12) for Supabase insertion
      const monthNumber = MONTHS.findIndex((m) => m === selectedMonth) + 1;

      await createReceipt({
        student_id: selectedStudent.id,
        month: selectedMonth, // store as number to match DB schema
        year: Number(selectedYear),
        fee_amount: monthlyFee,
        late_charges: lateFee,
        total_amount: totalAmount,
        payment_method: paymentMethod,
        receipt_no: `RCP-${Date.now()}`,
        status: "Paid",
        paid_date: new Date().toISOString().split('T')[0],
        additional_charges: chargesArr,
        additional_charges_details: detailsArr,
        discounts: [{ amount: discount, details: "Discount" }],
        total_discount: discount,
        previous_balance: previousBalance,
        remaining_amount: remainingAmount,
        due_date: dueDate || null,
        registration_fee: registrationFee,
      } as any);

      toast.success("Receipt created successfully");
      // Reset form state
      setSelectedStudent(null);
      setSelectedMonth("");
      setRegistrationFee(0);
      setMonthlyFee(0);
      setLateFee(0);
      setStationaryCharges(0);
      setPreviousBalance(0);
      setDiscount(0);
      setPaidAmountInput(null);
      setPaymentMethod("Cash");
      setDueDate("");

      // Refresh the receipts table to show the newly created receipt
      receiptsTableRef.current?.fetchReceipts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create receipt");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-[#EFEFEF] min-h-screen p-6 w-[65%]">
      <div className="flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-lg p-4 border-l-4 border-[#FFD700] mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0FB3B7] tracking-wide">
            Receipts
          </h1>
        </div>
      </div>

      <Card className="bg-white/70 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl">
        <CardHeader className="border-b border-[#FFD700]/20">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-[#FFD700] rounded-full"></div>
            <CardTitle className="text-[#0FB3B7] text-lg font-bold">Create Receipt</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-[#0FB3B7] font-medium mb-2">Student ID</Label>
              <Select onValueChange={(v) => handleStudentSelect(v ?? "")} value={selectedStudent?.student_id || ""}>
                <SelectTrigger className={`border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7] ${selectedStudent ? 'bg-green-50 border-green-300' : ''}`}>
                  <SelectValue>{selectedStudent?.student_id || "Select Student"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {[...students].sort((a, b) => a.student_id.localeCompare(b.student_id)).map(s => (
                    <SelectItem key={s.id} value={s.id} className="text-[#0FB3B7]">{s.student_id}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium mb-2">Month</Label>
              <Select value={selectedMonth} onValueChange={(v) => setSelectedMonth(v ?? "")} disabled={!selectedStudent}>
                <SelectTrigger className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7] disabled:opacity-50">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableMonths().map(m => (
                    <SelectItem key={m} value={m} className="text-[#0FB3B7]">{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium mb-2">Year</Label>
              <Input
                type="number"
                value={isMounted ? selectedYear : ""}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
              />
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium mb-2">Paid Date</Label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
              />
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium mb-2">Student Name</Label>
              <Input
                value={selectedStudent?.student_name || ""}
                readOnly
                className="border-[#0FB3B7]/30 bg-[#0FB3B7]/10 text-[#0FB3B7] font-semibold"
              />
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium mb-2">Father Name</Label>
              <Input
                value={selectedStudent?.father_name || ""}
                readOnly
                className="border-[#0FB3B7]/30 bg-[#0FB3B7]/10 text-[#0FB3B7]"
              />
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium mb-2">Class</Label>
              <Input
                value={selectedStudent?.class || ""}
                readOnly
                className="border-[#0FB3B7]/30 bg-[#0FB3B7]/10 text-[#0FB3B7]"
              />
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium mb-2">Group</Label>
              <Input
                value={selectedStudent?.student_group || ""}
                readOnly
                className="border-[#0FB3B7]/30 bg-[#0FB3B7]/10 text-[#0FB3B7]"
              />
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium mb-2">Shift</Label>
              <Input
                value={selectedStudent?.shift || ""}
                readOnly
                className="border-[#0FB3B7]/30 bg-[#0FB3B7]/10 text-[#0FB3B7]"
              />
            </div>

            {/* Calculations Fields */}
            <div>
              <Label className="text-[#0FB3B7] font-medium mb-2">Registration Fee (PKR)</Label>
              <Input
                type="number"
                value={registrationFee}
                onChange={(e) => setRegistrationFee(Number(e.target.value))}
                className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
              />
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium mb-2">Monthly Fee (PKR)</Label>
              <Input
                type="number"
                value={monthlyFee}
                onChange={(e) => setMonthlyFee(Number(e.target.value))}
                className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
              />
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium mb-2">Late Fee (PKR)</Label>
              <Input
                type="number"
                value={lateFee}
                onChange={(e) => setLateFee(Number(e.target.value))}
                className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
              />
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium mb-2">Stationary / Additional Charges (PKR)</Label>
              <Input
                type="number"
                value={stationaryCharges}
                onChange={(e) => setStationaryCharges(Number(e.target.value))}
                className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
              />
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium mb-2">Previous Balance (PKR)</Label>
              <Input
                type="number"
                value={previousBalance}
                onChange={(e) => setPreviousBalance(Number(e.target.value))}
                className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
              />
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium mb-2">Discount (PKR)</Label>
              <Input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
              />
            </div>

            <div className="col-span-2 border-t border-[#FFD700]/20 pt-4 grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#0FB3B7] font-medium mb-2">Total Amount</Label>
                <Input
                  value={`PKR ${totalAmount.toLocaleString()}`}
                  readOnly
                  className="border-[#0FB3B7]/20 bg-[#0FB3B7]/10 text-[#0FB3B7] font-bold text-lg"
                />
              </div>
              <div>
                <Label className="text-[#0FB3B7] font-medium mb-2">Paid Amount (PKR)</Label>
                <Input
                  type="number"
                  value={paidAmountInput !== null ? paidAmountInput : totalAmount}
                  onChange={(e) => setPaidAmountInput(Number(e.target.value))}
                  className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
                />
              </div>
            </div>

            <div>
              <Label className="text-[#0FB3B7] font-medium mb-2">Remaining Amount</Label>
              <Input
                value={`PKR ${remainingAmount.toLocaleString()}`}
                readOnly
                className="border-[#0FB3B7]/20 bg-red-50 text-red-600 font-bold"
              />
            </div>

            <div>
              <Label className="text-[#0FB3B7] font-medium mb-2">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={(v) => setPaymentMethod(v ?? "Cash")}>
                <SelectTrigger className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]">
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash" className="text-[#0FB3B7]">Cash</SelectItem>
                  <SelectItem value="Online" className="text-[#0FB3B7]">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium mb-2">Paid Date</Label>
              <Input
                value={isMounted ? new Date().toISOString().split('T')[0] : ""}
                readOnly
                className="border-[#0FB3B7]/20 bg-[#0FB3B7]/5 text-[#0FB3B7]/90"
              />
            </div>
          </div>

          <Button
            onClick={handleCreateReceipt}
            disabled={isLoading || !selectedStudent || !selectedMonth}
            className="w-full bg-[#0FB3B7] hover:bg-[#0E9EA2] text-white transition-all duration-200 hover:shadow-lg disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Receipt"}
          </Button>
        </CardContent>
      </Card>

      <ReceiptsTable ref={receiptsTableRef} />
    </div>
  );
}

export default function ReceiptForm() {
  return <Suspense fallback={<div className="flex justify-center items-center min-h-[400px] bg-[#EFEFEF]"><Loader2 className="h-10 w-10 animate-spin text-[#0FB3B7]" /></div>}><ReceiptFormContent /></Suspense>;
}
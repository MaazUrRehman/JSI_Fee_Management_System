

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Student } from "@/types/student";
import { Receipt } from "@/types/receipt";
import { createReceipt, getStudentReceipts } from "@/services/receipt.service";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { generateFeePDF } from "@/lib/pdf";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function FeeForm({ student, month, receipt, onClose }: { student: Student, month: number, receipt?: Receipt, onClose: () => void }) {
  const getChargesFromReceipt = (r?: Receipt) => {
    let reg = 0;
    let stat = 0;
    if (r) {
      const charges = r.additional_charges || [];
      const details = r.additional_charges_details || [];
      for (let i = 0; i < details.length; i++) {
        const d = details[i]?.toLowerCase() || "";
        if (d.includes("registration")) {
          reg += charges[i] || 0;
        } else {
          stat += charges[i] || 0;
        }
      }
    }
    return { reg, stat };
  };

  const { reg: initialReg, stat: initialStat } = getChargesFromReceipt(receipt);

  const [registrationFee, setRegistrationFee] = useState(initialReg);
  const [monthlyFee, setMonthlyFee] = useState(receipt?.fee_amount || student.monthly_fee);
  
  const calculateLateCharges = () => {
    if (receipt) return receipt.late_charges;
    const day = new Date().getDate();
    if (day >= 1 && day <= 10) return 0;
    if (day >= 11 && day <= 20) return 100;
    return 200;
  };
  
  const [lateFee, setLateFee] = useState(calculateLateCharges());
  const [stationaryCharges, setStationaryCharges] = useState(initialStat);
  const [previousBalance, setPreviousBalance] = useState(receipt?.previous_balance || 0);
  const [discount, setDiscount] = useState(receipt?.total_discount || 0);
  const [selectedYear, setSelectedYear] = useState(receipt?.year?.toString() || new Date().getFullYear().toString());
  const [dueDate, setDueDate] = useState<string>(receipt?.due_date || "");
  const [paymentMethod, setPaymentMethod] = useState(receipt?.payment_method || "Cash");
  const [isLoading, setIsLoading] = useState(false);

  const monthName = MONTH_NAMES[month - 1];
  const isPaid = !!receipt;

  // Auto logic for Previous Balance
  useEffect(() => {
    if (!receipt) {
      const fetchPrevBalance = async () => {
        try {
          const rawReceipts = await getStudentReceipts(student.id);
          const normalizedReceipts = (rawReceipts as Receipt[]).filter((item) => {
            const status = String(item.status ?? "").trim().toLowerCase();
            return status === "paid";
          });

          const targetYear = Number(selectedYear || new Date().getFullYear());
          const targetMonth = month;

          const previousReceipts = normalizedReceipts.filter((item) => {
            const itemYear = Number(item.year);
            const itemMonth = Number(item.month);
            if (Number.isNaN(itemYear)) return false;

            if (itemYear < targetYear) return true;
            if (itemYear === targetYear && itemMonth < targetMonth) return true;
            return false;
          });

          const sorted = previousReceipts.sort((a, b) => {
            if (Number(b.year) !== Number(a.year)) {
              return Number(b.year) - Number(a.year);
            }

            const aMonth = Number(a.month);
            const bMonth = Number(b.month);
            if (Number.isNaN(aMonth) || Number.isNaN(bMonth)) {
              return 0;
            }
            return bMonth - aMonth;
          });

          const latest = sorted[0];
          if (latest && latest.remaining_amount !== undefined && latest.remaining_amount !== null) {
            setPreviousBalance(Number(latest.remaining_amount));
          } else {
            setPreviousBalance(0);
          }
        } catch (err) {
          console.error("Failed to auto-fetch previous balance:", err);
          setPreviousBalance(0);
        }
      };
      fetchPrevBalance();
    }
  }, [student.id, receipt, selectedYear, month]);

  // Total Amount Calculation
  const totalAmount = Math.max(0, registrationFee + monthlyFee + lateFee + stationaryCharges + previousBalance - discount);
  
  // Paid Amount input state
  const initialPaidAmount = receipt 
    ? (receipt.total_amount - (receipt.remaining_amount || 0)) 
    : totalAmount;
  const [paidAmountInput, setPaidAmountInput] = useState<number | null>(receipt ? initialPaidAmount : null);
  
  const actualPaidAmount = paidAmountInput !== null ? paidAmountInput : totalAmount;
  const remainingAmount = Math.max(0, totalAmount - actualPaidAmount);

  const handlePay = async () => {
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

      await createReceipt({
          student_id: student.id,
          month: monthName, 
          year: Number(selectedYear),
          fee_amount: monthlyFee,
          late_charges: lateFee,
          total_amount: totalAmount,
          paid_date: new Date().toISOString().split('T')[0],
          payment_method: paymentMethod,
          receipt_no: `RCP-${Date.now()}`,
          status: "Paid",
          additional_charges: chargesArr,
          additional_charges_details: detailsArr,
          discounts: [{ amount: discount, details: "Discount" }],
          total_discount: discount,
          previous_balance: previousBalance,
          remaining_amount: remainingAmount,
          due_date: dueDate,
          registration_fee: registrationFee,
        } as any);
      toast.success("Fee paid successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to pay fee");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = () => {
    generateFeePDF(student, {
      receipt_no: receipt?.receipt_no || `VCH-${Date.now()}`,
      month: monthName,
      year: selectedYear,
      registration_fee: registrationFee,
      monthly_fee: monthlyFee,
      late_fee: lateFee,
      stationary_charges: stationaryCharges,
      previous_balance: previousBalance,
      discount: discount,
      total_amount: totalAmount,
      paid_amount: actualPaidAmount,
      remaining_amount: remainingAmount,
      payment_method: paymentMethod || "N/A",
      status: isPaid ? "Paid" : "Unpaid",
      due_date: dueDate,
      paid_date: receipt?.paid_date || new Date().toISOString().split('T')[0]
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-sm border-[#0FB3B7]/20 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-[#FFD700]/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-[#FFD700] rounded-full"></div>
            <DialogTitle className="text-[#0FB3B7] text-xl font-bold">
              {isPaid ? "View Receipt" : "Pay Fee"}
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-[#0FB3B7] font-medium">Student Name</Label>
              <Input 
                value={student.student_name} 
                readOnly 
                className="border-[#0FB3B7]/20 bg-[#0FB3B7]/5 text-[#0FB3B7]/90"
              />
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium">Student ID</Label>
              <Input 
                value={student.student_id} 
                readOnly 
                className="border-[#0FB3B7]/20 bg-[#0FB3B7]/5 text-[#0FB3B7]/90"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-[#0FB3B7] font-medium">Month</Label>
              <Input 
                value={monthName} 
                readOnly 
                className="border-[#0FB3B7]/20 bg-[#0FB3B7]/5 text-[#0FB3B7]/90"
              />
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium">Year</Label>
              <Input 
                type="number" 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)} 
                readOnly={isPaid}
                className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
              />
            </div>
          </div>

          <div>
            <Label className="text-[#0FB3B7] font-medium">Due Date</Label>
            <Input 
              type="date" 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)} 
              readOnly={isPaid}
              className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
            />
          </div>

          {/* Breakdown Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-[#0FB3B7] font-medium">Registration Fee</Label>
              <Input 
                type="number" 
                value={registrationFee} 
                onChange={(e) => setRegistrationFee(Number(e.target.value))} 
                readOnly={isPaid}
                className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
              />
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium">Monthly Fee</Label>
              <Input 
                type="number" 
                value={monthlyFee} 
                onChange={(e) => setMonthlyFee(Number(e.target.value))} 
                readOnly={isPaid}
                className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-[#0FB3B7] font-medium">Late Fee</Label>
              <Input 
                type="number" 
                value={lateFee} 
                onChange={(e) => setLateFee(Number(e.target.value))} 
                readOnly={isPaid}
                className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
              />
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium">Stationary / Additional Charges</Label>
              <Input 
                type="number" 
                value={stationaryCharges} 
                onChange={(e) => setStationaryCharges(Number(e.target.value))} 
                readOnly={isPaid}
                className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-[#0FB3B7] font-medium">Previous Balance</Label>
              <Input 
                type="number" 
                value={previousBalance} 
                onChange={(e) => setPreviousBalance(Number(e.target.value))} 
                readOnly={isPaid}
                className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
              />
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium">Discount</Label>
              <Input 
                type="number" 
                value={discount} 
                onChange={(e) => setDiscount(Number(e.target.value))} 
                readOnly={isPaid}
                className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-[#FFD700]/20 pt-4">
            <div>
              <Label className="text-[#0FB3B7] font-medium">Total Amount</Label>
              <Input 
                value={`PKR ${totalAmount.toLocaleString()}`} 
                readOnly 
                className="border-[#0FB3B7]/20 bg-[#0FB3B7]/10 text-[#0FB3B7] font-bold text-lg"
              />
            </div>
            <div>
              <Label className="text-[#0FB3B7] font-medium">Paid Amount</Label>
              <Input 
                type="number" 
                value={paidAmountInput !== null ? paidAmountInput : totalAmount} 
                onChange={(e) => setPaidAmountInput(Number(e.target.value))} 
                readOnly={isPaid}
                className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-[#0FB3B7] font-medium">Remaining Amount</Label>
              <Input 
                value={`PKR ${remainingAmount.toLocaleString()}`} 
                readOnly 
                className="border-[#0FB3B7]/20 bg-red-50 text-red-600 font-bold"
              />
            </div>
            <div>
              {!isPaid ? (
                <>
                  <Label className="text-[#0FB3B7] font-medium">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={(v) => setPaymentMethod(v ?? "Cash")}>
                    <SelectTrigger className="border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]">
                      <SelectValue placeholder="Select Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash" className="text-[#0FB3B7]">Cash</SelectItem>
                      <SelectItem value="Online" className="text-[#0FB3B7]">Online</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              ) : (
                <>
                  <Label className="text-[#0FB3B7] font-medium">Payment Method</Label>
                  <Input 
                    value={paymentMethod} 
                    readOnly 
                    className="border-[#0FB3B7]/20 bg-[#0FB3B7]/5 text-[#0FB3B7]/90"
                  />
                </>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            {!isPaid && (
              <Button 
                onClick={handlePay} 
                disabled={isLoading}
                className="bg-[#0FB3B7] hover:bg-[#0E9EA2] text-white transition-all duration-200 hover:shadow-lg"
              >
                {isLoading ? "Processing..." : "Pay Fee"}
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={downloadPDF}
              className="border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50 transition-all duration-200"
            >
              {isPaid ? "Download Slip" : "Download Voucher"}
            </Button>
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="text-[#0FB3B7]/70 hover:text-[#0FB3B7] hover:bg-[#0FB3B7]/10 transition-all duration-200"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

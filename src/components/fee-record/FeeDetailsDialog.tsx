
// "use client";

// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Student } from "@/types/student";
// import { Receipt } from "@/types/receipt";
// import { getStudentReceipts, deleteReceipt } from "@/services/receipt.service";
// import { updateStudent } from "@/services/student.service";
// import { FeeForm } from "./FeeForm";
// import { generateFeePDF } from "@/lib/pdf";

// export function FeeDetailsDialog({ student, open, onOpenChange }: { student: Student, open: boolean, onOpenChange: (open: boolean) => void }) {
//   const [receipts, setReceipts] = useState<Receipt[]>([]);
//   const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
//   const [currentStudent, setCurrentStudent] = useState<Student>(student);

//   const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//   const normalizeMonthValue = (value: number | string | null | undefined) => {
//     if (value === null || value === undefined || value === "") return null;

//     if (typeof value === "number") {
//       if (Number.isInteger(value) && value >= 1 && value <= 12) {
//         return monthNames[value - 1];
//       }
//       return null;
//     }

//     const normalized = String(value).trim().toLowerCase();
//     if (!normalized) return null;

//     const monthMap: Record<string, string> = {
//       january: "January",
//       jan: "January",
//       "1": "January",
//       february: "February",
//       feb: "February",
//       "2": "February",
//       march: "March",
//       mar: "March",
//       "3": "March",
//       april: "April",
//       apr: "April",
//       "4": "April",
//       may: "May",
//       "5": "May",
//       june: "June",
//       jun: "June",
//       "6": "June",
//       july: "July",
//       jul: "July",
//       "7": "July",
//       august: "August",
//       aug: "August",
//       "8": "August",
//       september: "September",
//       sep: "September",
//       "9": "September",
//       october: "October",
//       oct: "October",
//       "10": "October",
//       november: "November",
//       nov: "November",
//       "11": "November",
//       december: "December",
//       dec: "December",
//       "12": "December",
//     };

//     return monthMap[normalized] || null;
//   };

//   const getMatchingReceipt = (targetMonthName: string, targetYear: number) => {
//     return receipts.find((r) => {
//       const normalizedMonth = normalizeMonthValue(r.month);
//       const sameMonth = normalizedMonth?.toLowerCase() === targetMonthName.trim().toLowerCase();
//       const sameYear = Number(r.year) === targetYear;
//       const sameStudent = String(r.student_id) === String(currentStudent.id);
//       const isPaid = String(r.status ?? "").trim().toLowerCase() === "paid";

//       return sameStudent && sameMonth && sameYear && isPaid;
//     });
//   };

//   useEffect(() => {
//     if (open) fetchReceipts();
//   }, [open]);

//   const fetchReceipts = async () => {
//     try {
//       const data = await getStudentReceipts(currentStudent.id);
//       setReceipts(data);
//     } catch (error) {
//       toast.error("Failed to load receipts");
//     }
//   };

//   const getMonthName = (date: Date) => {
//     return date.toLocaleString('default', { month: 'long' });
//   };

//   const handleDownloadPDF = (r: Receipt) => {
//     let reg = 0;
//     let stat = 0;
//     const charges = r.additional_charges || [];
//     const details = r.additional_charges_details || [];
//     for (let i = 0; i < details.length; i++) {
//       const d = details[i]?.toLowerCase() || "";
//       if (d.includes("registration")) {
//         reg += charges[i] || 0;
//       } else {
//         stat += charges[i] || 0;
//       }
//     }

//     generateFeePDF(currentStudent, {
//       receipt_no: r.receipt_no,
//       month: String(r.month),
//       year: r.year,
//       registration_fee: reg,
//       monthly_fee: r.fee_amount,
//       late_fee: r.late_charges,
//       stationary_charges: stat,
//       previous_balance: r.previous_balance || 0,
//       discount: r.total_discount || 0,
//       total_amount: r.total_amount,
//       paid_amount: r.total_amount - (r.remaining_amount || 0),
//       remaining_amount: r.remaining_amount || 0,
//       payment_method: r.payment_method || "N/A",
//       status: r.status,
//       issue_date: r.due_date || (r.created_at ? r.created_at.split('T')[0] : undefined),
//       paid_date: r.paid_date || undefined,
//       due_date: undefined,
//     });
//   };

//   const admissionDate = currentStudent.admission_date ? new Date(currentStudent.admission_date) : new Date();

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="w-[92vw] max-w-[95vw] sm:max-w-[95vw] max-h-[90vh] gap-4 bg-white/95 p-4 sm:p-6 backdrop-blur-sm border-[#0FB3B7]/20 shadow-2xl">
//         <DialogHeader className="border-b border-[#FFD700]/20 pb-4">
//           <div className="flex min-w-0 items-center gap-3 pr-8">
//             <div className="w-1 h-8 bg-[#FFD700] rounded-full"></div>
//             <DialogTitle className="min-w-0 text-[#0FB3B7] text-xl font-bold">
//               Fee Record - {currentStudent.student_name} ({currentStudent.student_id})
//             </DialogTitle>
//           </div>
//         </DialogHeader>

//         <div className="mt-2 min-w-0 max-h-[calc(90vh-10rem)] overflow-y-auto">
//           <div className="w-full min-w-0 max-w-full rounded-lg border border-[#0FB3B7]/20">
//             <Table className="w-full table-fixed text-xs">
//               <TableHeader className="bg-[#0FB3B7]/5">
//                 <TableRow className="border-b border-[#0FB3B7]/10">
//                   <TableHead className="w-[14%] px-1.5 text-xs leading-tight whitespace-normal text-[#0FB3B7] font-medium">Month</TableHead>
//                   <TableHead className="w-[14%] px-1.5 text-xs leading-tight whitespace-normal text-[#0FB3B7] font-medium">Monthly Fee</TableHead>
//                   <TableHead className="w-[14%] px-1.5 text-xs leading-tight whitespace-normal text-[#0FB3B7] font-medium">Previous Balance</TableHead>
//                   <TableHead className="w-[14%] px-1.5 text-xs leading-tight whitespace-normal text-[#0FB3B7] font-medium">Remaining Amount</TableHead>
//                   <TableHead className="w-[14%] px-1.5 text-xs leading-tight whitespace-normal text-[#0FB3B7] font-medium">Total Amount</TableHead>
//                   <TableHead className="w-[12%] px-1.5 text-xs leading-tight whitespace-normal text-[#0FB3B7] font-medium">Status</TableHead>
//                   <TableHead className="w-[18%] px-1.5 text-xs leading-tight whitespace-normal text-[#0FB3B7] font-medium">Action</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {Array.from({ length: currentStudent.registered_for_months }).map((_, index) => {
//                   // Ensure correct sequential month generation
//                   const currentDate = new Date(admissionDate);
//                   currentDate.setMonth(admissionDate.getMonth() + index);

//                   const monthName = currentDate.toLocaleString('default', { month: 'long' });
//                   const year = currentDate.getFullYear();

//                   const receipt = getMatchingReceipt(monthName, year);

//                   const isPaid = Boolean(receipt);

//                   return (
//                     <TableRow
//                       key={`${index}-${year}-${monthName}`}
//                       className="hover:bg-[#0FB3B7]/5 transition-colors border-b border-[#0FB3B7]/5"
//                     >
//                       <TableCell className="px-1.5 py-2 text-[#0FB3B7]/90 font-medium">
//                         <span title={`${monthName} (${year})`} className="block truncate">{monthName} ({year})</span>
//                       </TableCell>
//                       <TableCell className="px-1.5 py-2 text-[#0FB3B7]/80">
//                         <span className="block truncate">PKR {receipt?.fee_amount || currentStudent.monthly_fee}</span>
//                       </TableCell>
//                       <TableCell className="px-1.5 py-2 text-[#0FB3B7]/80">
//                         <span className="block truncate">PKR {receipt?.previous_balance || 0}</span>
//                       </TableCell>
//                       <TableCell className="px-1.5 py-2 text-[#0FB3B7]/80">
//                         <span className="block truncate">PKR {receipt?.remaining_amount || 0}</span>
//                       </TableCell>
//                       <TableCell className="px-1.5 py-2 text-[#0FB3B7]/90 font-bold">
//                         <span className="block truncate">PKR {receipt?.total_amount || 0}</span>
//                       </TableCell>
//                       <TableCell className="px-1.5 py-2">
//                         <span className={isPaid ?
//                           "inline-block max-w-full truncate rounded-full bg-[#0FB3B7]/10 px-1.5 py-1 text-xs font-medium text-[#0FB3B7]" :
//                           "inline-block max-w-full truncate rounded-full bg-red-100 px-1.5 py-1 text-xs font-medium text-red-600"
//                         }>
//                           {isPaid ? "Paid ✓" : "Unpaid"}
//                         </span>
//                       </TableCell>
//                       <TableCell className="px-1.5 py-2">
//                         <div className="flex w-full min-w-0 flex-col gap-1">
//                           {!isPaid ? (
//                             <Button
//                               size="sm"
//                               onClick={() => setSelectedMonth(index + 1)}
//                               className="h-7 w-full px-1.5 text-xs bg-[#0FB3B7] hover:bg-[#0E9EA2] text-white transition-all duration-200 hover:shadow-md"
//                             >
//                               Pay Fee
//                             </Button>
//                           ) : (
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               onClick={() => receipt && handleDownloadPDF(receipt)}
//                               className="h-7 w-full px-1.5 text-xs border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50 transition-all duration-200"
//                             >
//                               Download
//                             </Button>
//                           )}
//                           {!isPaid && (
//                             <Button
//                               size="sm"
//                               variant="destructive"
//                               onClick={async () => {
//                                 if (confirm("Are you sure?")) {
//                                   await updateStudent(currentStudent.id, { registered_for_months: currentStudent.registered_for_months - 1 });
//                                   setCurrentStudent(prev => ({ ...prev, registered_for_months: prev.registered_for_months - 1 }));
//                                   toast.success("Record deleted");
//                                   fetchReceipts();
//                                 }
//                               }}
//                               className="h-7 w-full px-1.5 text-xs bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
//                             >
//                               Delete
//                             </Button>
//                           )}
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </div>

//           {/* Footer */}
//           <div className="mt-4 text-center text-xs text-[#0FB3B7]/40 border-t border-[#FFD700]/20 pt-3">
//             <p>Total Months: {currentStudent.registered_for_months} | Monthly Fee: ${currentStudent.monthly_fee}</p>
//           </div>
//         </div>
//       </DialogContent>

//       {selectedMonth && (
//         <FeeForm
//           student={currentStudent}
//           month={(() => {
//             const date = new Date(admissionDate);
//             date.setMonth(admissionDate.getMonth() + selectedMonth - 1);
//             return date.getMonth() + 1;
//           })()}
//           receipt={(() => {
//             const date = new Date(admissionDate);
//             date.setMonth(admissionDate.getMonth() + selectedMonth - 1);
//             return getMatchingReceipt(
//               date.toLocaleString('default', { month: 'long' }),
//               date.getFullYear()
//             );
//           })()}
//           onClose={() => { setSelectedMonth(null); fetchReceipts(); }}
//         />
//       )}
//     </Dialog>
//   );
// }




















"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Student } from "@/types/student";
import { Receipt } from "@/types/receipt";
import { getStudentReceipts, deleteReceipt } from "@/services/receipt.service";
import { updateStudent } from "@/services/student.service";
import { FeeForm } from "./FeeForm";
import { generateFeePDF } from "@/lib/pdf";

export function FeeDetailsDialog({ student, open, onOpenChange }: { student: Student, open: boolean, onOpenChange: (open: boolean) => void }) {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [currentStudent, setCurrentStudent] = useState<Student>(student);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const normalizeMonthValue = (value: number | string | null | undefined) => {
    if (value === null || value === undefined || value === "") return null;

    if (typeof value === "number") {
      if (Number.isInteger(value) && value >= 1 && value <= 12) {
        return monthNames[value - 1];
      }
      return null;
    }

    const normalized = String(value).trim().toLowerCase();
    if (!normalized) return null;

    const monthMap: Record<string, string> = {
      january: "January",
      jan: "January",
      "1": "January",
      february: "February",
      feb: "February",
      "2": "February",
      march: "March",
      mar: "March",
      "3": "March",
      april: "April",
      apr: "April",
      "4": "April",
      may: "May",
      "5": "May",
      june: "June",
      jun: "June",
      "6": "June",
      july: "July",
      jul: "July",
      "7": "July",
      august: "August",
      aug: "August",
      "8": "August",
      september: "September",
      sep: "September",
      "9": "September",
      october: "October",
      oct: "October",
      "10": "October",
      november: "November",
      nov: "November",
      "11": "November",
      december: "December",
      dec: "December",
      "12": "December",
    };

    return monthMap[normalized] || null;
  };

  const getMatchingReceipt = (targetMonthName: string, targetYear: number) => {
    return receipts.find((r) => {
      const normalizedMonth = normalizeMonthValue(r.month);
      const sameMonth = normalizedMonth?.toLowerCase() === targetMonthName.trim().toLowerCase();
      const sameYear = Number(r.year) === targetYear;
      const sameStudent = String(r.student_id) === String(currentStudent.id);
      const isPaid = String(r.status ?? "").trim().toLowerCase() === "paid";

      return sameStudent && sameMonth && sameYear && isPaid;
    });
  };

  useEffect(() => {
    if (open) fetchReceipts();
  }, [open]);

  const fetchReceipts = async () => {
    try {
      const data = await getStudentReceipts(currentStudent.id);
      setReceipts(data);
    } catch (error) {
      toast.error("Failed to load receipts");
    }
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long' });
  };

  const handleDownloadPDF = (r: Receipt) => {
    let reg = 0;
    let stat = 0;
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

    generateFeePDF(currentStudent, {
      receipt_no: r.receipt_no,
      month: String(r.month),
      year: r.year,
      registration_fee: reg,
      monthly_fee: r.fee_amount,
      late_fee: r.late_charges,
      stationary_charges: stat,
      previous_balance: r.previous_balance || 0,
      discount: r.total_discount || 0,
      total_amount: r.total_amount,
      paid_amount: r.total_amount - (r.remaining_amount || 0),
      remaining_amount: r.remaining_amount || 0,
      payment_method: r.payment_method || "N/A",
      status: r.status,
      issue_date: r.due_date || (r.created_at ? r.created_at.split('T')[0] : undefined),
      paid_date: r.paid_date || undefined,
      due_date: undefined,
    });
  };

  const admissionDate = currentStudent.admission_date ? new Date(currentStudent.admission_date) : new Date();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[95vw] max-h-[90vh] gap-3 bg-white/95 p-3 sm:gap-4 sm:p-6 backdrop-blur-sm border-[#0FB3B7]/20 shadow-2xl">
        <DialogHeader className="border-b border-[#FFD700]/20 pb-3 sm:pb-4">
          <div className="flex min-w-0 items-center gap-2 pr-8 sm:gap-3">
            <div className="w-1 h-6 bg-[#FFD700] rounded-full sm:h-8"></div>
            <DialogTitle className="min-w-0 text-[#0FB3B7] text-sm font-bold sm:text-xl">
              Fee Record - {currentStudent.student_name} ({currentStudent.student_id})
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="mt-2 min-w-0 max-h-[calc(90vh-10rem)] overflow-y-auto">
          <div className="w-full min-w-0 max-w-full rounded-lg border border-[#0FB3B7]/20">
            <Table className="w-full table-fixed text-xs">
              <TableHeader className="bg-[#0FB3B7]/5">
                <TableRow className="border-b border-[#0FB3B7]/10">
                  <TableHead className="w-[14%] px-1 text-[10px] leading-tight whitespace-normal text-[#0FB3B7] font-medium sm:px-1.5 sm:text-xs">Month</TableHead>
                  <TableHead className="w-[14%] px-1 text-[10px] leading-tight whitespace-normal text-[#0FB3B7] font-medium sm:px-1.5 sm:text-xs">Monthly Fee</TableHead>
                  <TableHead className="w-[14%] px-1 text-[10px] leading-tight whitespace-normal text-[#0FB3B7] font-medium sm:px-1.5 sm:text-xs">Previous Balance</TableHead>
                  <TableHead className="w-[14%] px-1 text-[10px] leading-tight whitespace-normal text-[#0FB3B7] font-medium sm:px-1.5 sm:text-xs">Remaining Amount</TableHead>
                  <TableHead className="w-[14%] px-1 text-[10px] leading-tight whitespace-normal text-[#0FB3B7] font-medium sm:px-1.5 sm:text-xs">Total Amount</TableHead>
                  <TableHead className="w-[12%] px-1 text-[10px] leading-tight whitespace-normal text-[#0FB3B7] font-medium sm:px-1.5 sm:text-xs">Status</TableHead>
                  <TableHead className="w-[18%] px-1 text-[10px] leading-tight whitespace-normal text-[#0FB3B7] font-medium sm:px-1.5 sm:text-xs">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: currentStudent.registered_for_months }).map((_, index) => {
                  const currentDate = new Date(admissionDate);
                  currentDate.setMonth(admissionDate.getMonth() + index);

                  const monthName = currentDate.toLocaleString('default', { month: 'long' });
                  const year = currentDate.getFullYear();

                  const receipt = getMatchingReceipt(monthName, year);

                  const isPaid = Boolean(receipt);

                  return (
                    <TableRow
                      key={`${index}-${year}-${monthName}`}
                      className="hover:bg-[#0FB3B7]/5 transition-colors border-b border-[#0FB3B7]/5"
                    >
                      <TableCell className="px-1 py-2 text-[10px] text-[#0FB3B7]/90 font-medium sm:px-1.5 sm:text-xs">
                        <span title={`${monthName} (${year})`} className="block truncate">{monthName} ({year})</span>
                      </TableCell>
                      <TableCell className="px-1 py-2 text-[10px] text-[#0FB3B7]/80 sm:px-1.5 sm:text-xs">
                        <span className="block truncate">PKR {receipt?.fee_amount || currentStudent.monthly_fee}</span>
                      </TableCell>
                      <TableCell className="px-1 py-2 text-[10px] text-[#0FB3B7]/80 sm:px-1.5 sm:text-xs">
                        <span className="block truncate">PKR {receipt?.previous_balance || 0}</span>
                      </TableCell>
                      <TableCell className="px-1 py-2 text-[10px] text-[#0FB3B7]/80 sm:px-1.5 sm:text-xs">
                        <span className="block truncate">PKR {receipt?.remaining_amount || 0}</span>
                      </TableCell>
                      <TableCell className="px-1 py-2 text-[10px] text-[#0FB3B7]/90 font-bold sm:px-1.5 sm:text-xs">
                        <span className="block truncate">PKR {receipt?.total_amount || 0}</span>
                      </TableCell>
                      <TableCell className="px-1 py-2 sm:px-1.5">
                        <span className={isPaid ?
                          "inline-block max-w-full truncate rounded-full bg-[#0FB3B7]/10 px-1 py-1 text-[10px] font-medium text-[#0FB3B7] sm:px-1.5 sm:text-xs" :
                          "inline-block max-w-full truncate rounded-full bg-red-100 px-1 py-1 text-[10px] font-medium text-red-600 sm:px-1.5 sm:text-xs"
                        }>
                          {isPaid ? "Paid ✓" : "Unpaid"}
                        </span>
                      </TableCell>
                      <TableCell className="px-1 py-2 sm:px-1.5">
                        <div className="flex w-full min-w-0 flex-col gap-1">
                          {!isPaid ? (
                            <Button
                              size="sm"
                              onClick={() => setSelectedMonth(index + 1)}
                              className="h-6 w-full px-1 text-[10px] bg-[#0FB3B7] hover:bg-[#0E9EA2] text-white transition-all duration-200 hover:shadow-md sm:h-7 sm:px-1.5 sm:text-xs"
                            >
                              Pay Fee
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => receipt && handleDownloadPDF(receipt)}
                              className="h-6 w-full px-1 text-[10px] border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50 transition-all duration-200 sm:h-7 sm:px-1.5 sm:text-xs"
                            >
                              Download
                            </Button>
                          )}
                          {!isPaid && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={async () => {
                                if (confirm("Are you sure?")) {
                                  await updateStudent(currentStudent.id, { registered_for_months: currentStudent.registered_for_months - 1 });
                                  setCurrentStudent(prev => ({ ...prev, registered_for_months: prev.registered_for_months - 1 }));
                                  toast.success("Record deleted");
                                  fetchReceipts();
                                }
                              }}
                              className="h-6 w-full px-1 text-[10px] bg-red-500 text-white hover:bg-red-600 transition-all duration-200 sm:h-7 sm:px-1.5 sm:text-xs"
                            >
                              Delete
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center text-[10px] text-[#0FB3B7]/40 border-t border-[#FFD700]/20 pt-3 sm:text-xs">
            <p>Total Months: {currentStudent.registered_for_months} | Monthly Fee: ${currentStudent.monthly_fee}</p>
          </div>
        </div>
      </DialogContent>

      {selectedMonth && (
        <FeeForm
          student={currentStudent}
          month={(() => {
            const date = new Date(admissionDate);
            date.setMonth(admissionDate.getMonth() + selectedMonth - 1);
            return date.getMonth() + 1;
          })()}
          receipt={(() => {
            const date = new Date(admissionDate);
            date.setMonth(admissionDate.getMonth() + selectedMonth - 1);
            return getMatchingReceipt(
              date.toLocaleString('default', { month: 'long' }),
              date.getFullYear()
            );
          })()}
          onClose={() => { setSelectedMonth(null); fetchReceipts(); }}
        />
      )}
    </Dialog>
  );
}
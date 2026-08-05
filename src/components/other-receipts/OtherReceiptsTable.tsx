

"use client";

import { useEffect, useState, useMemo, forwardRef, useImperativeHandle } from "react";
import { toast } from "sonner";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getOtherReceipts, updateOtherReceipt, deleteOtherReceipt } from "@/services/other_receipt.service";
import { OtherReceipt } from "@/types/other_receipt";
import { generateOtherReceiptPDF, OtherReceiptStudent, OtherReceiptPDFInfo } from "@/lib/other-receipt-pdf";

export const OtherReceiptsTable = forwardRef(({ onEdit }: { onEdit: (r: OtherReceipt) => void }, ref) => {
  const [data, setData] = useState<OtherReceipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetch = async () => {
    setLoading(true);
    try {
      setData(await getOtherReceipts());
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({ fetch }));
  useEffect(() => { fetch(); }, []);

  const processedData = useMemo(() => {
    return data.filter(r => {
      const matchesSearch = [r.student_name, r.father_name, r.phone, r.class].some(f => f?.toLowerCase().includes(search.toLowerCase()));
      const matchesClass = filterClass === "All" || r.class === filterClass;
      const matchesStatus = filterStatus === "All" || r.payment_status === filterStatus;
      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [data, search, filterClass, filterStatus]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, currentPage]);

  const totalPages = Math.ceil(processedData.length / pageSize) || 1;

  const handlePay = async (id: string) => {
    try {
      await updateOtherReceipt(id, { payment_status: "Paid", paid_date: new Date().toISOString() });
      toast.success("Marked as paid");
      fetch();
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteOtherReceipt(id);
      toast.success("Deleted successfully");
      fetch();
    } catch {
      toast.error("Failed to delete");
    }
  };

  // const downloadPDF = (r: OtherReceipt) => {
  //   const doc = new jsPDF();
  //   const title = r.payment_status === "Paid" ? "Payment Slip" : "Voucher";
  //   doc.setFontSize(18);
  //   doc.setTextColor(15, 179, 183); // #0FB3B7
  //   doc.text("JSI Fee Management System", 10, 10);
  //   doc.setTextColor(0, 0, 0);
  //   doc.setFontSize(14);
  //   doc.text(title, 10, 20);
  //   doc.setFontSize(12);
  //   doc.text(`Receipt ID: ${r.id}`, 10, 30);
  //   doc.text(`Student Name: ${r.student_name}`, 10, 40);
  //   doc.text(`Father Name: ${r.father_name}`, 10, 50);
  //   doc.text(`Class: ${r.class}`, 10, 60);
  //   doc.text(`Phone: ${r.phone || "N/A"}`, 10, 70);
  //   doc.text(`Address: ${r.address || "N/A"}`, 10, 80);
  //   doc.text(`Fees: PKR ${r.fees.toLocaleString()}`, 10, 90);
  //   doc.text(`Fees Details: ${r.fees_details || "N/A"}`, 10, 100);
  //   doc.text(`Due Date: ${new Date(r.due_date).toLocaleDateString()}`, 10, 110);
  //   if (r.paid_date) doc.text(`Paid Date: ${new Date(r.paid_date).toLocaleDateString()}`, 10, 120);
  //   doc.text(`Status: ${r.payment_status}`, 10, 130);
  //   doc.save(`${title}-${r.id}.pdf`);
  // };


  const downloadPDF = (r: OtherReceipt) => {
  const student: OtherReceiptStudent = {
    student_id: r.id.slice(0, 8).toUpperCase(),
    student_name: r.student_name,
    father_name: r.father_name,
    class: r.class,
    department: r.class,
    student_group: r.class,
    shift: "N/A",
    phone: r.phone,
    address: r.address,
  };

  const isPaid = r.payment_status === "Paid";
  const info: OtherReceiptPDFInfo = {
    receipt_no: r.id.slice(0, 8).toUpperCase(),
    month: new Date(r.due_date).toLocaleString("en-US", { month: "long" }),
    year: new Date(r.due_date).getFullYear(),
    issue_date: new Date().toISOString(),
    due_date: r.due_date,
    paid_date: r.paid_date || undefined,
    fees: r.fees,
    fees_details: r.fees_details || "Other Fees",
    total_amount: r.fees,
    paid_amount: isPaid ? r.fees : 0,
    remaining_amount: isPaid ? 0 : r.fees,
    status: r.payment_status as "Paid" | "Unpaid",
  };

  generateOtherReceiptPDF(student, info);
};

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px] bg-[#EFEFEF] rounded-lg">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-[#0FB3B7]" />
        <p className="text-[#0FB3B7]/60 text-sm">Loading receipts...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 bg-[#EFEFEF] p-4 rounded-lg">
      {/* Header with Yellow Accent */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-8 bg-[#FFD700] rounded-full"></div>
        <h2 className="text-lg font-bold text-[#0FB3B7] uppercase tracking-wider">
          Other Receipts
        </h2>
        <span className="ml-auto text-sm text-[#0FB3B7]/60">
          Total: {data.length} receipts
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-2 bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-[#0FB3B7]/20">
        <div className="space-y-1">
          <Input 
            placeholder="Search name/father/phone..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="w-64 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7] placeholder:text-[#0FB3B7]/40"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[#0FB3B7]">Class</label>
          <Select value={filterClass} onValueChange={(v) => setFilterClass(v ?? "All")}>
            <SelectTrigger className="w-40 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All" className="text-[#0FB3B7]">All Classes</SelectItem>
              {Array.from(new Set(data.map(r => r.class))).map(c => (
                <SelectItem key={c} value={c} className="text-[#0FB3B7]">{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[#0FB3B7]">Status</label>
          <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v ?? "All")}>
            <SelectTrigger className="w-40 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All" className="text-[#0FB3B7]">All Status</SelectItem>
              <SelectItem value="Paid" className="text-[#0FB3B7]">Paid</SelectItem>
              <SelectItem value="Unpaid" className="text-[#0FB3B7]">Unpaid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button 
          variant="outline" 
          onClick={() => { setSearch(""); setFilterClass("All"); setFilterStatus("All"); }}
          className="border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50"
        >
          Clear Filters
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#0FB3B7]/20 overflow-hidden bg-white/70 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#0FB3B7]/5">
              <TableRow className="border-b border-[#0FB3B7]/10">
                <TableHead className="text-[#0FB3B7] font-medium">Student</TableHead>
                <TableHead className="text-[#0FB3B7] font-medium">Father</TableHead>
                <TableHead className="text-[#0FB3B7] font-medium">Class</TableHead>
                <TableHead className="text-[#0FB3B7] font-medium">Phone</TableHead>
                <TableHead className="text-[#0FB3B7] font-medium">Address</TableHead>
                <TableHead className="text-[#0FB3B7] font-medium">Fees</TableHead>
                <TableHead className="text-[#0FB3B7] font-medium">Details</TableHead>
                <TableHead className="text-[#0FB3B7] font-medium">Due</TableHead>
                <TableHead className="text-[#0FB3B7] font-medium">Paid</TableHead>
                <TableHead className="text-[#0FB3B7] font-medium">Status</TableHead>
                <TableHead className="text-[#0FB3B7] font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((r) => (
                <TableRow 
                  key={r.id} 
                  className="hover:bg-[#0FB3B7]/5 transition-colors border-b border-[#0FB3B7]/5"
                >
                  <TableCell className="text-[#0FB3B7]/90 font-medium">{r.student_name}</TableCell>
                  <TableCell className="text-[#0FB3B7]/80">{r.father_name}</TableCell>
                  <TableCell className="text-[#0FB3B7]/90">{r.class}</TableCell>
                  <TableCell className="text-[#0FB3B7]/70">{r.phone}</TableCell>
                  <TableCell className="text-[#0FB3B7]/70 max-w-[100px] truncate" title={r.address}>
                    {r.address}
                  </TableCell>
                  <TableCell className="text-[#0FB3B7]/90 font-medium">PKR {r.fees}</TableCell>
                  <TableCell className="text-[#0FB3B7]/70">{r.fees_details}</TableCell>
                  <TableCell className="text-[#0FB3B7]/70">{new Date(r.due_date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-[#0FB3B7]/70">
                    {r.paid_date ? new Date(r.paid_date).toLocaleDateString() : "-"}
                  </TableCell>
                  <TableCell>
                    <span className={r.payment_status === "Paid" ? 
                      "px-2 py-1 rounded-full text-xs font-medium bg-[#0FB3B7] text-white" : 
                      "px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600"
                    }>
                      {r.payment_status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 min-w-[80px]">
                      <div className="flex gap-1">
                        {r.payment_status === "Unpaid" ? (
                          <AlertDialog>
                            <AlertDialogTrigger  asChild>
                              <Button 
                                size="sm" 
                                className="w-12 h-7 px-1 text-xs bg-[#0FB3B7] hover:bg-[#0E9EA2] text-white transition-all duration-200"
                              >
                                Pay
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="border-[#0FB3B7]/20">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-[#0FB3B7]">Confirm Payment</AlertDialogTitle>
                                <AlertDialogDescription className="text-[#0FB3B7]/60">
                                  Mark this receipt as paid?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handlePay(r.id)}
                                  className="bg-[#0FB3B7] hover:bg-[#0E9EA2]"
                                >
                                  Pay
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ) : (
                          <Button 
                            size="sm" 
                            disabled 
                            className="w-12 h-7 px-1 text-xs bg-[#0FB3B7] text-white"
                          >
                            Paid
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="w-12 h-7 px-1 text-[10px] leading-tight border-[#0FB3B7]/20 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50 transition-all duration-200"
                          onClick={() => downloadPDF(r)}
                        >
                          {r.payment_status === "Unpaid" ? "Vouch." : "Slip"}
                        </Button>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-12 h-7 px-1 text-xs border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50 transition-all duration-200"
                          onClick={() => onEdit(r)} 
                          disabled={r.payment_status === "Paid"}
                        >
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              className="w-12 h-7 px-1 text-xs text-white bg-red-500 hover:bg-red-600 transition-all duration-200"
                            >
                              Del
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="border-[#0FB3B7]/20">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-[#0FB3B7]">Confirm Delete</AlertDialogTitle>
                              <AlertDialogDescription className="text-[#0FB3B7]/60">
                                Are you sure you want to delete this receipt?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => handleDelete(r.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-8 text-[#0FB3B7]/40">
                    No receipts found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-[#0FB3B7]/20">
        <span className="text-sm text-[#0FB3B7]/70">
          Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, processedData.length)} of {processedData.length} receipts
        </span>
        <div className="flex gap-2">
          <Button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(p => p - 1)}
            className="border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50 disabled:opacity-50"
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4" /> Prev
          </Button>
          <span className="flex items-center px-3 text-sm text-[#0FB3B7]">
            Page {currentPage} of {totalPages}
          </span>
          <Button 
            disabled={currentPage >= totalPages} 
            onClick={() => setCurrentPage(p => p + 1)}
            className="border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50 disabled:opacity-50"
            variant="outline"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
});
OtherReceiptsTable.displayName = "OtherReceiptsTable";
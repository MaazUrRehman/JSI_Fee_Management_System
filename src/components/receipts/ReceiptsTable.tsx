


















"use client";

import { useEffect, useState, useMemo, forwardRef, useImperativeHandle } from "react";
import { toast } from "sonner";
import { Loader2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { generateFeePDF } from "@/lib/pdf";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Receipt } from "@/types/receipt";
import { Student } from "@/types/student";
import { getReceipts } from "@/services/receipt.service";
import { getStudents } from "@/services/student.service";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

type SortConfig = { key: string | null; direction: "asc" | "desc" };

export const ReceiptsTable = forwardRef((props, ref) => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{ month: string; payment_method: string; group: string; class: string }>({ month: "", payment_method: "", group: "", class: "" });
  const [sort, setSort] = useState<SortConfig>({ key: "created_at", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const groups = useMemo(() => Array.from(new Set(students.map(s => s.student_group))).filter(Boolean), [students]);
  const classes = useMemo(() => Array.from(new Set(students.map(s => s.class))).filter(Boolean), [students]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [receiptData, studentData] = await Promise.all([getReceipts(), getStudents()]);
      setReceipts(receiptData);
      setStudents(studentData);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({ fetchReceipts: fetchAllData }));

  useEffect(() => {
    fetchAllData();
  }, []);

  const processedData = useMemo(() => {
    let filtered = receipts.map(r => ({
      ...r,
      student: students.find(s => s.id === r.student_id)
    })).filter(r =>
      (r.receipt_no.toLowerCase().includes(search.toLowerCase()) || 
       r.student?.student_name.toLowerCase().includes(search.toLowerCase()) ||
       r.student?.student_id.toLowerCase().includes(search.toLowerCase())) &&
      (filters.month ? (String(r.month) === filters.month || (typeof r.month === "number" && MONTHS[r.month - 1] === filters.month)) : true) &&
      (filters.payment_method ? r.payment_method === filters.payment_method : true) &&
      (filters.group ? r.student?.student_group === filters.group : true) &&
      (filters.class ? r.student?.class === filters.class : true)
    );

    if (sort.key) {
      filtered.sort((a, b) => {
        let valA: any = sort.key!.includes('.') ? (a as any).student?.[sort.key!.split('.')[1]] : (a as any)[sort.key!];
        let valB: any = sort.key!.includes('.') ? (b as any).student?.[sort.key!.split('.')[1]] : (b as any)[sort.key!];
        
        valA = valA ?? "";
        valB = valB ?? "";
        
        if (valA < valB) return sort.direction === "asc" ? -1 : 1;
        if (valA > valB) return sort.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [receipts, students, search, filters, sort]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, currentPage]);

  const totalPages = Math.ceil(processedData.length / pageSize);

  const toggleSort = (key: string) => {
    setSort(prev => ({ key, direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc" }));
  };

  const downloadPDF = (r: Receipt & { student?: Student }) => {
    if (!r.student) return;
    
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

    generateFeePDF(r.student, {
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
      due_date: r.due_date,
      paid_date: r.paid_date || r.created_at
    });
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
          Receipts List
        </h2>
        <span className="ml-auto text-sm text-[#0FB3B7]/60">
          Total: {receipts.length} receipts
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-[#0FB3B7]/20">
        <Input 
          placeholder="Search Receipt/Student..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="w-64 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7] placeholder:text-[#0FB3B7]/40"
        />
        <Select value={filters.month} onValueChange={(v) => setFilters(p => ({ ...p, month: v ?? "" }))}>
          <SelectTrigger className="w-32 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((month) => (
              <SelectItem key={month} value={month} className="text-[#0FB3B7]">{month}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filters.payment_method} onValueChange={(v) => setFilters(p => ({ ...p, payment_method: v ?? "" }))}>
          <SelectTrigger className="w-32 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Cash" className="text-[#0FB3B7]">Cash</SelectItem>
            <SelectItem value="Online" className="text-[#0FB3B7]">Online</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.group} onValueChange={(v) => setFilters(p => ({ ...p, group: v ?? "" }))}>
          <SelectTrigger className="w-32 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]">
            <SelectValue placeholder="Group" />
          </SelectTrigger>
          <SelectContent>
            {groups.map(g => <SelectItem key={g!} value={g!} className="text-[#0FB3B7]">{g}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.class} onValueChange={(v) => setFilters(p => ({ ...p, class: v ?? "" }))}>
          <SelectTrigger className="w-32 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            {classes.map(c => <SelectItem key={c!} value={c!} className="text-[#0FB3B7]">{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          onClick={() => { setSearch(""); setFilters({ month: "", payment_method: "", group: "", class: "" }); }}
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
                {[
                  {key: "receipt_no", label: "Receipt No"},
                  {key: "student.student_id", label: "Student ID"},
                  {key: "student.student_name", label: "Student Name"},
                  {key: "student.father_name", label: "Father Name"},
                  {key: "student.class", label: "Class"},
                  {key: "student.student_group", label: "Group"},
                  {key: "student.shift", label: "Shift"},
                  {key: "month", label: "Month"},
                  {key: "fee_amount", label: "Fee Amount"},
                  {key: "late_charges", label: "Late Charges"},
                  {key: "additional_charges", label: "Additional Charges"},
                  {key: "total_discount", label: "Discount"},
                  {key: "total_amount", label: "Total Amount"},
                  {key: "previous_balance", label: "Previous Balance"},
                  {key: "remaining_amount", label: "Remaining Amount"},
                  {key: "paid_date", label: "Paid Date"},
                  {key: "payment_method", label: "Payment Method"},
                  {key: "status", label: "Status"},
                ].map(col => (
                  <TableHead 
                    key={col.key} 
                    className="cursor-pointer text-[#0FB3B7] font-medium hover:text-[#0FB3B7]/80 transition-colors whitespace-nowrap"
                    onClick={() => toggleSort(col.key)}
                  >
                    {col.label} 
                    {sort.key === col.key && (sort.direction === "asc" ? 
                      <ChevronUp className="inline h-4 w-4 ml-1" /> : 
                      <ChevronDown className="inline h-4 w-4 ml-1" />
                    )}
                  </TableHead>
                ))}
                <TableHead className="text-[#0FB3B7] font-medium whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((r) => (
                <TableRow 
                  key={r.id} 
                  className="hover:bg-[#0FB3B7]/5 transition-colors border-b border-[#0FB3B7]/5"
                >
                  <TableCell className="text-[#0FB3B7]/90 font-medium">{r.receipt_no}</TableCell>
                  <TableCell className="text-[#0FB3B7]/80">{r.student?.student_id}</TableCell>
                  <TableCell className="text-[#0FB3B7]/90">{r.student?.student_name}</TableCell>
                  <TableCell className="text-[#0FB3B7]/80">{r.student?.father_name}</TableCell>
                  <TableCell className="text-[#0FB3B7]/80">{r.student?.class}</TableCell>
                  <TableCell className="text-[#0FB3B7]/80">{r.student?.student_group}</TableCell>
                  <TableCell className="text-[#0FB3B7]/80">{r.student?.shift}</TableCell>
                  <TableCell className="text-[#0FB3B7]/80">{r.month}</TableCell>
                  <TableCell className="text-[#0FB3B7]/90 font-medium">PKR {r.fee_amount.toLocaleString()}</TableCell>
                  <TableCell className="text-[#0FB3B7]/80">PKR {r.late_charges.toLocaleString()}</TableCell>
                  <TableCell className="text-[#0FB3B7]/80">PKR { (r.additional_charges?.reduce((a,b) => a+b, 0) || 0).toLocaleString() }</TableCell>
                  
                  <TableCell className="text-[#0FB3B7]/80">PKR {((r as any).total_discount || 0).toLocaleString()}</TableCell>
                  
                  <TableCell className="text-[#0FB3B7] font-bold">PKR {r.total_amount.toLocaleString()}</TableCell>
                  <TableCell className="text-[#0FB3B7]/80">PKR { (r.previous_balance || 0).toLocaleString() }</TableCell>
                  <TableCell className="text-[#0FB3B7]/80">PKR { (r.remaining_amount || 0).toLocaleString() }</TableCell>
                  <TableCell className="text-[#0FB3B7]/70">{r.paid_date ? new Date(r.paid_date).toLocaleDateString() : "-"}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#0FB3B7]/10 text-[#0FB3B7]">
                      {r.payment_method}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {r.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => downloadPDF(r)}
                      className="text-[#0FB3B7] hover:text-[#0E9EA2] hover:bg-[#0FB3B7]/10"
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={19} className="text-center py-8 text-[#0FB3B7]/40">
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
            <ChevronLeft className="h-4 w-4" />
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
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
});
ReceiptsTable.displayName = "ReceiptsTable";
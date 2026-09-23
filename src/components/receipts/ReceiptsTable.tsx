


















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

  const SortLabel = ({ column, label }: { column: string; label: string }) => (
    <button
      type="button"
      onClick={() => toggleSort(column)}
      className="flex w-full items-center gap-0.5 truncate text-left hover:text-[#0FB3B7]/80"
    >
      <span className="truncate">{label}</span>
      {sort.key === column && (sort.direction === "asc"
        ? <ChevronUp className="h-3 w-3 shrink-0" />
        : <ChevronDown className="h-3 w-3 shrink-0" />)}
    </button>
  );

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
      // due_date column stores the Issue Date for paid receipts (set during payment).
      issue_date: r.due_date || r.created_at,
      due_date: undefined,
      paid_date: r.paid_date || undefined
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
      <div className="w-full min-w-0 max-w-full rounded-lg border border-[#0FB3B7]/20 bg-white/70 backdrop-blur-sm">
        <Table className="w-full table-fixed text-xs">
          <TableHeader className="bg-[#0FB3B7]/5">
            <TableRow className="border-b border-[#0FB3B7]/10">
              <TableHead className="w-[12%] px-1.5 py-2 text-[#0FB3B7]"><SortLabel column="receipt_no" label="Receipt No" /><SortLabel column="student.student_id" label="Student ID" /></TableHead>
              <TableHead className="w-[14%] px-1.5 py-2 text-[#0FB3B7]"><SortLabel column="student.student_name" label="Student Name" /><SortLabel column="student.father_name" label="Father Name" /></TableHead>
              <TableHead className="w-[14%] px-1.5 py-2 text-[#0FB3B7]"><SortLabel column="student.class" label="Class" /><SortLabel column="student.student_group" label="Group" /></TableHead>
              <TableHead className="w-[11%] px-1.5 py-2 text-[#0FB3B7]"><SortLabel column="student.shift" label="Shift" /><SortLabel column="month" label="Month" /></TableHead>
              <TableHead className="w-[15%] px-1.5 py-2 text-[#0FB3B7]"><SortLabel column="fee_amount" label="Fee" /><SortLabel column="late_charges" label="Late" /><SortLabel column="additional_charges" label="Additional" /><SortLabel column="total_discount" label="Discount" /></TableHead>
              <TableHead className="w-[15%] px-1.5 py-2 text-[#0FB3B7]"><SortLabel column="total_amount" label="Total" /><SortLabel column="previous_balance" label="Previous" /><SortLabel column="remaining_amount" label="Remaining" /></TableHead>
              <TableHead className="w-[11%] px-1.5 py-2 text-[#0FB3B7]"><SortLabel column="paid_date" label="Paid Date" /><SortLabel column="payment_method" label="Method" /><SortLabel column="status" label="Status" /></TableHead>
              <TableHead className="w-[8%] px-1.5 py-2 text-right text-[#0FB3B7]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((r) => {
              const additionalCharges = r.additional_charges?.reduce((a, b) => a + b, 0) || 0;
              const paidDate = r.paid_date ? new Date(r.paid_date).toLocaleDateString() : "-";

              return (
                <TableRow key={r.id} className="border-b border-[#0FB3B7]/5 hover:bg-[#0FB3B7]/5 transition-colors">
                  <TableCell className="px-1.5 py-2 align-top text-[#0FB3B7]/80"><div title={r.receipt_no} className="truncate font-medium text-[#0FB3B7]/90">{r.receipt_no}</div><div title={r.student?.student_id} className="truncate">{r.student?.student_id || "-"}</div></TableCell>
                  <TableCell className="px-1.5 py-2 align-top text-[#0FB3B7]/80"><div title={r.student?.student_name} className="truncate text-[#0FB3B7]/90">{r.student?.student_name || "-"}</div><div title={r.student?.father_name} className="truncate">{r.student?.father_name || "-"}</div></TableCell>
                  <TableCell className="px-1.5 py-2 align-top text-[#0FB3B7]/80"><div title={r.student?.class} className="truncate">{r.student?.class || "-"}</div><div title={r.student?.student_group} className="truncate">{r.student?.student_group || "-"}</div></TableCell>
                  <TableCell className="px-1.5 py-2 align-top text-[#0FB3B7]/80"><div title={r.student?.shift} className="truncate">{r.student?.shift || "-"}</div><div title={String(r.month)} className="truncate">{r.month}</div></TableCell>
                  <TableCell className="px-1.5 py-2 align-top text-[#0FB3B7]/80"><div title={`PKR ${r.fee_amount.toLocaleString()}`} className="truncate">Fee: PKR {r.fee_amount.toLocaleString()}</div><div title={`PKR ${r.late_charges.toLocaleString()}`} className="truncate">Late: PKR {r.late_charges.toLocaleString()}</div><div title={`PKR ${additionalCharges.toLocaleString()}`} className="truncate">Add: PKR {additionalCharges.toLocaleString()}</div><div title={`PKR ${((r as any).total_discount || 0).toLocaleString()}`} className="truncate">Disc: PKR {((r as any).total_discount || 0).toLocaleString()}</div></TableCell>
                  <TableCell className="px-1.5 py-2 align-top text-[#0FB3B7]/80"><div title={`PKR ${r.total_amount.toLocaleString()}`} className="truncate font-bold text-[#0FB3B7]">Total: PKR {r.total_amount.toLocaleString()}</div><div title={`PKR ${(r.previous_balance || 0).toLocaleString()}`} className="truncate">Prev: PKR {(r.previous_balance || 0).toLocaleString()}</div><div title={`PKR ${(r.remaining_amount || 0).toLocaleString()}`} className="truncate">Rem: PKR {(r.remaining_amount || 0).toLocaleString()}</div></TableCell>
                  <TableCell className="px-1.5 py-2 align-top text-[#0FB3B7]/80"><div title={paidDate} className="truncate">{paidDate}</div><div title={r.payment_method || "-"} className="truncate">{r.payment_method || "-"}</div><div title={r.status} className="truncate font-medium text-green-700">{r.status}</div></TableCell>
                  <TableCell className="px-1.5 py-2 text-right align-middle"><Button variant="ghost" size="sm" onClick={() => downloadPDF(r)} className="h-7 px-1.5 text-xs text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:text-[#0E9EA2]">Download</Button></TableCell>
                </TableRow>
              );
            })}
            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-[#0FB3B7]/40">No receipts found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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

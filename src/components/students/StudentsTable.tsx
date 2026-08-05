"use client";

import { useEffect, useState, forwardRef, useImperativeHandle, useMemo } from "react";
import { toast } from "sonner";
import { Loader2, Trash2, Edit2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getStudents, deleteStudent } from "@/services/student.service";
import { Student } from "@/types/student";
import { cn } from "@/lib/utils";

type SortConfig = { key: keyof Student | null; direction: "asc" | "desc" };

export const StudentsTable = forwardRef(({ onEdit }: { onEdit?: (student: Student) => void }, ref) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ class: "", group: "", status: "" });
  const [sort, setSort] = useState<SortConfig>({ key: "student_id", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      toast.error("Failed to load students");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({ fetchStudents }));
  useEffect(() => { fetchStudents(); }, []);

  const processedData = useMemo(() => {
    let filtered = students.filter(s =>
      (s.student_id.toLowerCase().includes(search.toLowerCase()) || s.student_name.toLowerCase().includes(search.toLowerCase())) &&
      (filters.class ? s.class === filters.class : true) &&
      (filters.group ? s.student_group === filters.group : true) &&
      (filters.status ? s.status === filters.status : true)
    );

    if (sort.key) {
      filtered.sort((a, b) => {
        const valA = a[sort.key as keyof Student] ?? "";
        const valB = b[sort.key as keyof Student] ?? "";
        if (valA < valB) return sort.direction === "asc" ? -1 : 1;
        if (valA > valB) return sort.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [students, search, filters, sort]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, currentPage]);

  const totalPages = Math.ceil(processedData.length / pageSize);

  const toggleSort = (key: keyof Student) => {
    setSort(prev => ({ key, direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc" }));
  };

  const SortIcon = ({ col }: { col: keyof Student }) => {
    if (sort.key !== col) return null;
    return sort.direction === "asc" ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />;
  };

  const classes = Array.from(new Set(students.map(s => s.class)));
  const groups = Array.from(new Set(students.map(s => s.student_group)));

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px] bg-[#EFEFEF] rounded-lg">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-[#0FB3B7]" />
        <p className="text-[#0FB3B7]/60 text-sm">Loading students...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 bg-[#EFEFEF] p-4 rounded-lg">
      {/* Header with Yellow Accent */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-8 bg-[#FFD700] rounded-full"></div>
        <h2 className="text-lg font-bold text-[#0FB3B7] uppercase tracking-wider">
          Students List
        </h2>
        <span className="ml-auto text-sm text-[#0FB3B7]/60">
          Total: {students.length} students
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-[#0FB3B7]/20">
        <Input
          placeholder="Search by ID or Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-48 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7] placeholder:text-[#0FB3B7]/40"
        />
        <Select value={filters.class} onValueChange={(v) => setFilters(p => ({ ...p, class: v ?? "" }))}>
          <SelectTrigger className="w-32 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            {classes.map(c => <SelectItem key={c} value={c} className="text-[#0FB3B7]">{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.group} onValueChange={(v) => setFilters(p => ({ ...p, group: v ?? "" }))}>
          <SelectTrigger className="w-32 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]">
            <SelectValue placeholder="Group" />
          </SelectTrigger>
          <SelectContent>
            {groups.map(g => <SelectItem key={g} value={g} className="text-[#0FB3B7]">{g}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.status} onValueChange={(v) => setFilters(p => ({ ...p, status: v ?? "" }))}>
          <SelectTrigger className="w-32 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active" className="text-[#0FB3B7]">Active</SelectItem>
            <SelectItem value="Inactive" className="text-[#0FB3B7]">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => { setSearch(""); setFilters({ class: "", group: "", status: "" }); }}
          className="border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50"
        >
          Clear Filters
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#0FB3B7]/20 overflow-hidden bg-white/70 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-[#0FB3B7]/5">
            <TableRow className="border-b border-[#0FB3B7]/10">
              {(["student_id", "student_name", "father_name", "class", "student_group", "shift", "monthly_fee", "registered_for_months", "phone", "address", "admission_date", "status"] as const).map(col => (
                <TableHead
                  key={col}
                  className="cursor-pointer text-[#0FB3B7] font-medium hover:text-[#0FB3B7]/80 transition-colors"
                  onClick={() => toggleSort(col)}
                >
                  {col.replace("_", " ")} <SortIcon col={col} />
                </TableHead>
              ))}
              <TableHead className="text-right text-[#0FB3B7] font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((student) => (
              <TableRow
                key={student.id}
                className="hover:bg-[#0FB3B7]/5 transition-colors border-b border-[#0FB3B7]/5"
              >
                <TableCell className="text-[#0FB3B7]/90 font-medium">{student.student_id}</TableCell>
                <TableCell className="text-[#0FB3B7]/90">{student.student_name}</TableCell>
                <TableCell className="text-[#0FB3B7]/80">{student.father_name}</TableCell>
                <TableCell className="text-[#0FB3B7]/90">{student.class}</TableCell>
                <TableCell className="text-[#0FB3B7]/80">{student.student_group}</TableCell>
                <TableCell className="text-[#0FB3B7]/80">{student.shift}</TableCell>
                <TableCell className="text-[#0FB3B7]/90 font-medium">PKR {student.monthly_fee}</TableCell>
                <TableCell className="text-[#0FB3B7]/80">{student.registered_for_months}</TableCell>
                <TableCell className="text-[#0FB3B7]/80">{student.phone || "-"}</TableCell>
                <TableCell className="text-[#0FB3B7]/80">{student.address || "-"}</TableCell>
                <TableCell className="text-[#0FB3B7]/80">{student.admission_date}</TableCell>
                {/* <TableCell>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    student.status === "Active"
                      ? "bg-[#0FB3B7]/10 text-[#0FB3B7]"
                      : "bg-red-100 text-red-600"
                  )}>
                    {student.status}
                  </span>
                </TableCell> */}

                <TableCell>
                  <button
                    onClick={async () => {
                      const newStatus = student.status === "Active" ? "Inactive" : "Active";
                      try {
                        const { updateStudent } = await import("@/services/student.service");
                        await updateStudent(student.id, { status: newStatus });
                        toast.success(`Student ${newStatus === "Active" ? "activated" : "deactivated"} successfully`);
                        fetchStudents();
                      } catch (error) {
                        toast.error("Failed to update status");
                      }
                    }}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none",
                      student.status === "Active" ? "bg-[#0FB3B7]" : "bg-gray-300"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200",
                        student.status === "Active" ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit?.(student)}
                      className="text-[#0FB3B7] hover:text-[#0E9EA2] hover:bg-[#0FB3B7]/10"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>

                    {/* ✅ FIXED: Use asChild pattern to avoid nested buttons */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="border-[#0FB3B7]/20">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-[#0FB3B7]">Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription className="text-[#0FB3B7]/60">
                            This action cannot be undone. This will permanently delete the student.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={async () => {
                              await deleteStudent(student.id);
                              toast.success("Student deleted successfully");
                              fetchStudents();
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={13} className="text-center py-8 text-[#0FB3B7]/40">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-[#0FB3B7]/20">
        <span className="text-sm text-[#0FB3B7]/70">
          Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, processedData.length)} of {processedData.length} students
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
StudentsTable.displayName = "StudentsTable";
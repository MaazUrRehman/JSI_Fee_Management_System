// "use client";

// import { useEffect, useState, useMemo } from "react";
// import { toast } from "sonner";
// import { Loader2, FileText, ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { getStudents } from "@/services/student.service";
// import { Student } from "@/types/student";
// import { FeeDetailsDialog } from "./FeeDetailsDialog";

// export function StudentFeeTable() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

//   // Search and Filters
//   const [search, setSearch] = useState("");
//   const [classFilter, setClassFilter] = useState("All");
//   const [groupFilter, setGroupFilter] = useState("All");

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     setLoading(true);
//     try {
//       const data = await getStudents();
//       setStudents(data);
//     } catch (error) {
//       toast.error("Failed to load students");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const processedData = useMemo(() => {
//     return students
//       .filter((student) => {
//         const matchesSearch =
//           student.student_id.toLowerCase().includes(search.toLowerCase()) ||
//           student.student_name.toLowerCase().includes(search.toLowerCase()) ||
//           student.father_name.toLowerCase().includes(search.toLowerCase());

//         const matchesClass = classFilter === "All" || student.class === classFilter;
//         const matchesGroup = groupFilter === "All" || student.student_group === groupFilter;

//         return matchesSearch && matchesClass && matchesGroup;
//       })
//       .sort((a, b) => a.student_id.localeCompare(b.student_id));
//   }, [students, search, classFilter, groupFilter]);

//   const paginatedData = useMemo(() => {
//     const start = (currentPage - 1) * pageSize;
//     return processedData.slice(start, start + pageSize);
//   }, [processedData, currentPage]);

//   const totalPages = Math.ceil(processedData.length / pageSize);

//   const clearFilters = () => {
//     setSearch("");
//     setClassFilter("All");
//     setGroupFilter("All");
//     setCurrentPage(1);
//   };

//   const classes = Array.from(new Set(students.map(s => s.class)));
//   const groups = Array.from(new Set(students.map(s => s.student_group)));

//   if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;

//   return (
//     <div className="space-y-4">
//       <div className="flex items-end gap-2">
//         <Input placeholder="Search..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="w-48" />
//         <div className="space-y-1">
//           <label className="text-sm font-medium">Class</label>
//           <Select
//             value={classFilter}
//             onValueChange={(v) => {
//               if (v !== null) {
//                 setClassFilter(v);
//                 setCurrentPage(1);
//               }
//             }}
//           >
//             <SelectTrigger className="w-32"><SelectValue placeholder="All Classes" /></SelectTrigger>
//             <SelectContent>
//               <SelectItem value="All">All Classes</SelectItem>
//               {classes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="space-y-1">
//           <label className="text-sm font-medium">Group</label>
//           <Select
//             value={groupFilter}
//             onValueChange={(v) => {
//               if (v !== null) {
//                 setGroupFilter(v);
//                 setCurrentPage(1);
//               }
//             }}
//           >
//             <SelectTrigger className="w-32"><SelectValue placeholder="All Groups" /></SelectTrigger>
//             <SelectContent>
//               <SelectItem value="All">All Groups</SelectItem>
//               {groups.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
//             </SelectContent>
//           </Select>
//         </div>
//         <Button variant="outline" onClick={clearFilters}>Clear</Button>
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Student ID</TableHead>
//               <TableHead>Student Name</TableHead>
//               <TableHead>Father Name</TableHead>
//               <TableHead>Class</TableHead>
//               <TableHead>Group</TableHead>
//               <TableHead>Shift</TableHead>
//               <TableHead>Monthly Fee</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-right">Action</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {paginatedData.map((student) => (
//               <TableRow key={student.id}>
//                 <TableCell>{student.student_id}</TableCell>
//                 <TableCell>{student.student_name}</TableCell>
//                 <TableCell>{student.father_name}</TableCell>
//                 <TableCell>{student.class}</TableCell>
//                 <TableCell>{student.student_group}</TableCell>
//                 <TableCell>{student.shift}</TableCell>
//                 <TableCell>{student.monthly_fee}</TableCell>
//                 <TableCell>{student.status}</TableCell>
//                 <TableCell className="text-right">
//                   <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student)}>
//                     <FileText className="mr-2 h-4 w-4" /> View Details
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="flex items-center justify-between">
//         <span>Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, processedData.length)} of {processedData.length} Students</span>
//         <div className="flex gap-2">
//           <Button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
//           <Button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
//         </div>
//       </div>

//       {selectedStudent && (
//         <FeeDetailsDialog
//           student={selectedStudent}
//           open={!!selectedStudent}
//           onOpenChange={(open) => !open && setSelectedStudent(null)}
//         />
//       )}
//     </div>
//   );
// }







"use client";

import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import { Loader2, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStudents } from "@/services/student.service";
import { Student } from "@/types/student";
import { FeeDetailsDialog } from "./FeeDetailsDialog";

export function StudentFeeTable() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Search and Filters
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [groupFilter, setGroupFilter] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const processedData = useMemo(() => {
    return students
      .filter((student) => {
        const matchesSearch =
          student.student_id.toLowerCase().includes(search.toLowerCase()) ||
          student.student_name.toLowerCase().includes(search.toLowerCase()) ||
          student.father_name.toLowerCase().includes(search.toLowerCase());

        const matchesClass = classFilter === "All" || student.class === classFilter;
        const matchesGroup = groupFilter === "All" || student.student_group === groupFilter;

        return matchesSearch && matchesClass && matchesGroup;
      })
      .sort((a, b) => a.student_id.localeCompare(b.student_id));
  }, [students, search, classFilter, groupFilter]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, currentPage]);

  const totalPages = Math.ceil(processedData.length / pageSize);

  const clearFilters = () => {
    setSearch("");
    setClassFilter("All");
    setGroupFilter("All");
    setCurrentPage(1);
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
      <div className="flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-lg p-4 border-l-4 border-[#FFD700] mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0FB3B7] tracking-wide">
            Student Fee Records
          </h1>
        </div>
        
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-2 bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-[#0FB3B7]/20">
        <div className="space-y-1">
          <Input 
            placeholder="Search by ID or Name..." 
            value={search} 
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} 
            className="w-48 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7] placeholder:text-[#0FB3B7]/40"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[#0FB3B7]">Class</label>
          <Select
            value={classFilter}
            onValueChange={(v) => {
              if (v !== null) {
                setClassFilter(v);
                setCurrentPage(1);
              }
            }}
          >
            <SelectTrigger className="w-32 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All" className="text-[#0FB3B7]">All Classes</SelectItem>
              {classes.map(c => <SelectItem key={c} value={c} className="text-[#0FB3B7]">{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[#0FB3B7]">Group</label>
          <Select
            value={groupFilter}
            onValueChange={(v) => {
              if (v !== null) {
                setGroupFilter(v);
                setCurrentPage(1);
              }
            }}
          >
            <SelectTrigger className="w-32 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]">
              <SelectValue placeholder="All Groups" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All" className="text-[#0FB3B7]">All Groups</SelectItem>
              {groups.map(g => <SelectItem key={g} value={g} className="text-[#0FB3B7]">{g}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Button 
          variant="outline" 
          onClick={clearFilters}
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
              <TableHead className="text-[#0FB3B7] font-medium">Student ID</TableHead>
              <TableHead className="text-[#0FB3B7] font-medium">Student Name</TableHead>
              <TableHead className="text-[#0FB3B7] font-medium">Father Name</TableHead>
              <TableHead className="text-[#0FB3B7] font-medium">Class</TableHead>
              <TableHead className="text-[#0FB3B7] font-medium">Group</TableHead>
              <TableHead className="text-[#0FB3B7] font-medium">Shift</TableHead>
              <TableHead className="text-[#0FB3B7] font-medium">Monthly Fee</TableHead>
              <TableHead className="text-[#0FB3B7] font-medium">Status</TableHead>
              <TableHead className="text-right text-[#0FB3B7] font-medium">Action</TableHead>
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
                <TableCell>
                  <span className={student.status === "Active" ? 
                    "px-2 py-1 rounded-full text-xs font-medium bg-[#0FB3B7]/10 text-[#0FB3B7]" : 
                    "px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600"
                  }>
                    {student.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedStudent(student)}
                    className="border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50 transition-all duration-200"
                  >
                    <FileText className="mr-2 h-4 w-4" /> View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-[#0FB3B7]/40">
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
          Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, processedData.length)} of {processedData.length} Students
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

      {selectedStudent && (
        <FeeDetailsDialog
          student={selectedStudent}
          open={!!selectedStudent}
          onOpenChange={(open) => !open && setSelectedStudent(null)}
        />
      )}
    </div>
  );
}
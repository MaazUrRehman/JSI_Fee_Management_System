// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { format } from "date-fns";
// import { getStudents } from "@/services/student.service";
// import { getReceipts } from "@/services/receipt.service";
// import { Student } from "@/types/student";
// import { Receipt } from "@/types/receipt";
// import { Card, CardContent } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

// export default function OverheadDuePage() {
//   const router = useRouter();
//   const [students, setStudents] = useState<Student[]>([]);
//   const [receipts, setReceipts] = useState<Receipt[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [classFilter, setClassFilter] = useState("All");
//   const [groupFilter, setGroupFilter] = useState("All");

//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;

//   // Current month as number (1-12)
//   const currentMonthName = format(new Date(), "MMMM");
//   const currentMonthYear = format(new Date(), "yyyy");

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [studentsData, receiptsData] = await Promise.all([
//         getStudents(),
//         getReceipts(),
//       ]);

//       setStudents(studentsData);
//       setReceipts(receiptsData);
//     } catch (error) {
//       toast.error("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Sirf woh students show karenge jin ki current month ki receipt EXIST nahi karti
//   const studentsWithDueFees = useMemo(() => {
//     return students
//       .filter((student) => {
//         // Check if receipt EXISTS for current month
//         // Receipt table mein month number mein store hai (August = 8)
//         // const hasReceipt = receipts.some(
//         //   (r) =>
//         //     r.student_id === student.id && // student.id se compare (primary key)
//         //     Number(r.month) === currentMonthNumber && // month number se compare
//         //     Number(r.year) === Number(currentMonthYear)
//         // );

//         const hasReceipt = receipts.some(
//           (r) =>
//             r.student_id === student.id &&
//             r.month === currentMonthName &&
//             Number(r.year) === Number(currentMonthYear)
//         );

//         // Return true (show) only if NO receipt exists
//         return !hasReceipt;
//       })
//       .filter((student) => {
//         const matchesSearch =
//           student.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           student.student_id.toLowerCase().includes(searchTerm.toLowerCase());

//         const matchesClass =
//           classFilter === "All" || student.class === classFilter;

//         const matchesGroup =
//           groupFilter === "All" || student.student_group === groupFilter;

//         return matchesSearch && matchesClass && matchesGroup;
//       });
//   }, [
//     students,
//     receipts,
//     currentMonthName,
//     currentMonthYear,
//     searchTerm,
//     classFilter,
//     groupFilter,
//   ]);

//   const paginatedData = useMemo(() => {
//     const start = (currentPage - 1) * pageSize;
//     return studentsWithDueFees.slice(start, start + pageSize);
//   }, [studentsWithDueFees, currentPage]);

//   const totalPages = Math.ceil(studentsWithDueFees.length / pageSize) || 1;

//   // Check if receipt exists for current month
//   const hasReceiptForCurrentMonth = (student: Student) => {
//     return receipts.some(
//       (r) =>
//         r.student_id === student.id &&
//         Number(r.month) === currentMonthNumber &&
//         Number(r.year) === Number(currentMonthYear)
//     );
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center min-h-[400px] bg-[#EFEFEF] rounded-lg">
//       <div className="flex flex-col items-center gap-3">
//         <Loader2 className="h-10 w-10 animate-spin text-[#0FB3B7]" />
//         <p className="text-[#0FB3B7]/60 text-sm">Loading overhead due...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="space-y-6 bg-[#EFEFEF] min-h-screen p-6">
//       {/* Header with Yellow Accent */}
//       <div className="flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-lg p-4 border-l-4 border-[#FFD700] mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-[#0FB3B7] tracking-wide">
//             Overhead Dues - {format(new Date(), "MMMM yyyy")}
//           </h1>
//           <p className="text-sm text-[#0FB3B7]/60 mt-1">
//             Showing students who haven't paid for {currentMonthName} {currentMonthYear}
//           </p>
//         </div>
//         <span className="ml-auto text-sm bg-[#0FB3B7]/10 text-[#0FB3B7] px-3 py-1 rounded-full font-medium">
//           {studentsWithDueFees.length} Due Students
//         </span>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap items-end gap-2 bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-[#0FB3B7]/20">
//         <div className="space-y-1">
//           <Input
//             placeholder="Search name/ID..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-64 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7] placeholder:text-[#0FB3B7]/40"
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-xs font-medium text-[#0FB3B7]">Class</label>
//           <Select
//             value={classFilter}
//             onValueChange={(value) => {
//               setClassFilter(value ?? "All");
//             }}
//           >
//             <SelectTrigger className="w-40 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]">
//               <SelectValue placeholder="All Classes" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="All" className="text-[#0FB3B7]">All Classes</SelectItem>
//               {Array.from(new Set(students.map(s => s.class))).map(c => (
//                 <SelectItem key={c} value={c} className="text-[#0FB3B7]">{c}</SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="space-y-1">
//           <label className="text-xs font-medium text-[#0FB3B7]">Group</label>
//           <Select
//             value={groupFilter}
//             onValueChange={(value) => {
//               setGroupFilter(value ?? "All");
//             }}
//           >
//             <SelectTrigger className="w-40 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]">
//               <SelectValue placeholder="All Groups" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="All" className="text-[#0FB3B7]">All Groups</SelectItem>
//               {Array.from(new Set(students.map(s => s.student_group))).filter(Boolean).map(g => (
//                 <SelectItem key={g} value={g!} className="text-[#0FB3B7]">{g}</SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <Button
//           variant="outline"
//           onClick={() => {
//             setSearchTerm("");
//             setClassFilter("All");
//             setGroupFilter("All");
//             setCurrentPage(1);
//           }}
//           className="border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50"
//         >
//           Clear Filters
//         </Button>
//       </div>

//       {/* Table */}
//       <Card className="bg-white/70 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl">
//         <CardContent className="pt-6">
//           <div className="rounded-lg border border-[#0FB3B7]/20 overflow-hidden">
//             <Table>
//               <TableHeader className="bg-[#0FB3B7]/5">
//                 <TableRow className="border-b border-[#0FB3B7]/10">
//                   <TableHead className="text-[#0FB3B7] font-medium">Student ID</TableHead>
//                   <TableHead className="text-[#0FB3B7] font-medium">Name</TableHead>
//                   <TableHead className="text-[#0FB3B7] font-medium">Father Name</TableHead>
//                   <TableHead className="text-[#0FB3B7] font-medium">Class</TableHead>
//                   <TableHead className="text-[#0FB3B7] font-medium">Group</TableHead>
//                   <TableHead className="text-[#0FB3B7] font-medium">Monthly Fee</TableHead>
//                   <TableHead className="text-[#0FB3B7] font-medium">Status</TableHead>
//                   <TableHead className="text-right text-[#0FB3B7] font-medium">Action</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {paginatedData.map((student) => (
//                   <TableRow
//                     key={student.id}
//                     className="hover:bg-[#0FB3B7]/5 transition-colors border-b border-[#0FB3B7]/5"
//                   >
//                     <TableCell className="text-[#0FB3B7]/90 font-medium">{student.student_id}</TableCell>
//                     <TableCell className="text-[#0FB3B7]/90">{student.student_name}</TableCell>
//                     <TableCell className="text-[#0FB3B7]/80">{student.father_name}</TableCell>
//                     <TableCell className="text-[#0FB3B7]/90">{student.class}</TableCell>
//                     <TableCell className="text-[#0FB3B7]/80">{student.student_group}</TableCell>
//                     <TableCell className="text-[#0FB3B7]/90 font-medium">PKR {student.monthly_fee}</TableCell>
//                     <TableCell>
//                       {hasReceiptForCurrentMonth(student) ? (
//                         <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
//                           Paid ✓
//                         </span>
//                       ) : (
//                         <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
//                           Due
//                         </span>
//                       )}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => router.push(`/receipts?studentId=${student.id}&month=${currentMonthName}&year=${currentMonthYear}&studentName=${encodeURIComponent(student.student_name)}&fatherName=${encodeURIComponent(student.father_name)}&class=${encodeURIComponent(student.class)}&group=${encodeURIComponent(student.student_group)}&monthlyFee=${student.monthly_fee}`)}
//                         className="border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50 transition-all duration-200"
//                       >
//                         Pay Fee
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//                 {paginatedData.length === 0 && (
//                   <TableRow>
//                     <TableCell colSpan={8} className="text-center py-8 text-[#0FB3B7]/40">
//                       {students.length === 0 ? "Loading students..." : "All students have paid for " + currentMonthName + " " + currentMonthYear + " ✅"}
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>

//           {/* Pagination */}
//           <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#FFD700]/20">
//             <span className="text-sm text-[#0FB3B7]/70">
//               Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, studentsWithDueFees.length)} of {studentsWithDueFees.length} students
//             </span>
//             <div className="flex gap-2">
//               <Button
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage(p => p - 1)}
//                 className="border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50 disabled:opacity-50"
//                 variant="outline"
//               >
//                 Prev
//               </Button>
//               <span className="flex items-center px-3 text-sm text-[#0FB3B7]">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <Button
//                 disabled={currentPage >= totalPages}
//                 onClick={() => setCurrentPage(p => p + 1)}
//                 className="border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50 disabled:opacity-50"
//                 variant="outline"
//               >
//                 Next
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


























"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { getStudents } from "@/services/student.service";
import { getReceipts } from "@/services/receipt.service";
import { Student } from "@/types/student";
import { Receipt } from "@/types/receipt";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function OverheadDuePage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [groupFilter, setGroupFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const currentMonthName = format(new Date(), "MMMM");
  const currentMonthYear = format(new Date(), "yyyy");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [studentsData, receiptsData] = await Promise.all([
        getStudents(),
        getReceipts(),
      ]);

      setStudents(studentsData);
      setReceipts(receiptsData);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Sirf woh students show karenge jin ki current month ki receipt EXIST nahi karti
  const studentsWithDueFees = useMemo(() => {
    return students
      .filter((student) => {
        // Check if receipt EXISTS for current month (text comparison)
        const hasReceipt = receipts.some(
          (r) =>
            r.student_id === student.id &&
            r.month === currentMonthName &&
            Number(r.year) === Number(currentMonthYear)
        );

        // Return true (show) only if NO receipt exists
        return !hasReceipt;
      })
      .filter((student) => {
        const matchesSearch =
          student.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.student_id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesClass =
          classFilter === "All" || student.class === classFilter;

        const matchesGroup =
          groupFilter === "All" || student.student_group === groupFilter;

        return matchesSearch && matchesClass && matchesGroup;
      });
  }, [
    students,
    receipts,
    currentMonthName,
    currentMonthYear,
    searchTerm,
    classFilter,
    groupFilter,
  ]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return studentsWithDueFees.slice(start, start + pageSize);
  }, [studentsWithDueFees, currentPage]);

  const totalPages = Math.ceil(studentsWithDueFees.length / pageSize) || 1;

  // Check if receipt exists for current month
  const hasReceiptForCurrentMonth = (student: Student) => {
    return receipts.some(
      (r) =>
        r.student_id === student.id &&
        r.month === currentMonthName &&
        Number(r.year) === Number(currentMonthYear)
    );
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px] bg-[#EFEFEF] rounded-lg">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-[#0FB3B7]" />
        <p className="text-[#0FB3B7]/60 text-sm">Loading overhead due...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 bg-[#EFEFEF] min-h-screen p-6">
      {/* Header with Yellow Accent */}
      <div className="flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-lg p-4 border-l-4 border-[#FFD700] mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0FB3B7] tracking-wide">
            Overhead Dues - {format(new Date(), "MMMM yyyy")}
          </h1>
          <p className="text-sm text-[#0FB3B7]/60 mt-1">
            Showing students who haven't paid for {currentMonthName} {currentMonthYear}
          </p>
        </div>
        <span className="ml-auto text-sm bg-[#0FB3B7]/10 text-[#0FB3B7] px-3 py-1 rounded-full font-medium">
          {studentsWithDueFees.length} Due Students
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-2 bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-[#0FB3B7]/20">
        <div className="space-y-1">
          <Input
            placeholder="Search name/ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7] placeholder:text-[#0FB3B7]/40"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[#0FB3B7]">Class</label>
          <Select
            value={classFilter}
            onValueChange={(value) => {
              setClassFilter(value ?? "All");
            }}
          >
            <SelectTrigger className="w-40 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All" className="text-[#0FB3B7]">All Classes</SelectItem>
              {Array.from(new Set(students.map(s => s.class))).map(c => (
                <SelectItem key={c} value={c} className="text-[#0FB3B7]">{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[#0FB3B7]">Group</label>
          <Select
            value={groupFilter}
            onValueChange={(value) => {
              setGroupFilter(value ?? "All");
            }}
          >
            <SelectTrigger className="w-40 border-[#0FB3B7]/20 focus:border-[#0FB3B7] focus:ring-[#0FB3B7]/20 text-[#0FB3B7]">
              <SelectValue placeholder="All Groups" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All" className="text-[#0FB3B7]">All Groups</SelectItem>
              {Array.from(new Set(students.map(s => s.student_group))).filter(Boolean).map(g => (
                <SelectItem key={g} value={g!} className="text-[#0FB3B7]">{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm("");
            setClassFilter("All");
            setGroupFilter("All");
            setCurrentPage(1);
          }}
          className="border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50"
        >
          Clear Filters
        </Button>
      </div>

      {/* Table */}
      <Card className="bg-white/70 backdrop-blur-sm border-[#0FB3B7]/20 hover:border-[#0FB3B7]/40 transition-all duration-200 hover:shadow-xl">
        <CardContent className="pt-6">
          <div className="rounded-lg border border-[#0FB3B7]/20 overflow-hidden">
            <Table>
              <TableHeader className="bg-[#0FB3B7]/5">
                <TableRow className="border-b border-[#0FB3B7]/10">
                  <TableHead className="text-[#0FB3B7] font-medium">Student ID</TableHead>
                  <TableHead className="text-[#0FB3B7] font-medium">Name</TableHead>
                  <TableHead className="text-[#0FB3B7] font-medium">Father Name</TableHead>
                  <TableHead className="text-[#0FB3B7] font-medium">Class</TableHead>
                  <TableHead className="text-[#0FB3B7] font-medium">Group</TableHead>
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
                    <TableCell className="text-[#0FB3B7]/90 font-medium">PKR {student.monthly_fee}</TableCell>
                    <TableCell>
                      {hasReceiptForCurrentMonth(student) ? (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Paid ✓
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
                          Due
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/receipts?studentId=${student.id}&month=${currentMonthName}&year=${currentMonthYear}&studentName=${encodeURIComponent(student.student_name)}&fatherName=${encodeURIComponent(student.father_name)}&class=${encodeURIComponent(student.class)}&group=${encodeURIComponent(student.student_group)}&monthlyFee=${student.monthly_fee}`)}
                        className="border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50 transition-all duration-200"
                      >
                        Pay Fee
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-[#0FB3B7]/40">
                      {students.length === 0 ? "Loading students..." : "All students have paid for " + currentMonthName + " " + currentMonthYear + " ✅"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#FFD700]/20">
            <span className="text-sm text-[#0FB3B7]/70">
              Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, studentsWithDueFees.length)} of {studentsWithDueFees.length} students
            </span>
            <div className="flex gap-2">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="border-[#0FB3B7]/30 text-[#0FB3B7] hover:bg-[#0FB3B7]/10 hover:border-[#0FB3B7]/50 disabled:opacity-50"
                variant="outline"
              >
                Prev
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
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
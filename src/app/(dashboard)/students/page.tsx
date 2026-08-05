"use client";

import { useRef, useState } from "react";
import { StudentRegistrationForm } from "@/components/students/StudentRegistrationForm";
import { StudentsTable } from "@/components/students/StudentsTable";
import { Student } from "@/types/student";

export default function StudentsPage() {
  const tableRef = useRef<{ fetchStudents: () => void }>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleRefresh = () => {
    tableRef.current?.fetchStudents();
    setEditingStudent(null);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <div ref={formRef}>
        <StudentRegistrationForm 
          onSuccess={handleRefresh} 
          editingStudent={editingStudent} 
          onCancel={() => setEditingStudent(null)}
        />
      </div>
      <StudentsTable ref={tableRef} onEdit={handleEdit} />
    </div>
  );
}

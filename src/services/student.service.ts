import { supabase } from "@/lib/supabase";
import { Student } from "@/types/student";

export const getStudents = async () => {
  const { data, error } = await supabase.from("students").select("*");
  if (error) throw error;
  return data as Student[];
};

export const getStudentById = async (id: string) => {
  const { data, error } = await supabase.from("students").select("*").eq("id", id).single();
  if (error) throw error;
  return data as Student;
};

export const createStudent = async (student: Omit<Student, "id" | "created_at" | "updated_at">) => {
  const { data, error } = await supabase.from("students").insert(student).select().single();
  if (error) throw error;
  return data as Student;
};

export const updateStudent = async (id: string, student: Partial<Omit<Student, "id" | "created_at" | "updated_at">>) => {
  const { data, error } = await supabase.from("students").update(student).eq("id", id).select().single();
  if (error) throw error;
  return data as Student;
};

export const deleteStudent = async (id: string) => {
  const { error } = await supabase.from("students").delete().eq("id", id);
  if (error) throw error;
};

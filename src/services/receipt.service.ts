import { supabase } from "@/lib/supabase";
import { Receipt } from "@/types/receipt";

export const getReceipts = async () => {
  const { data, error } = await supabase.from("receipts").select("*");
  if (error) throw error;
  return data as Receipt[];
};

export const getReceiptById = async (id: string) => {
  const { data, error } = await supabase.from("receipts").select("*").eq("id", id).single();
  if (error) throw error;
  return data as Receipt;
};

export const getStudentReceipts = async (studentId: string) => {
  const { data, error } = await supabase.from("receipts").select("*").eq("student_id", studentId);
  if (error) throw error;
  return data as Receipt[];
};

export const createReceipt = async (receipt: Omit<Receipt, "id" | "created_at" | "updated_at">) => {
  const { data, error } = await supabase.from("receipts").insert(receipt).select().single();
  if (error) throw error;
  return data as Receipt;
};

export const updateReceipt = async (id: string, receipt: Partial<Omit<Receipt, "id" | "created_at" | "updated_at">>) => {
  const { data, error } = await supabase.from("receipts").update(receipt).eq("id", id).select().single();
  if (error) throw error;
  return data as Receipt;
};

export const deleteReceipt = async (id: string) => {
  const { error } = await supabase.from("receipts").delete().eq("id", id);
  if (error) throw error;
};

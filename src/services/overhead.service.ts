import { supabase } from "@/lib/supabase";
import { Overhead } from "@/types/overhead";

export const getOverheads = async () => {
  const { data, error } = await supabase.from("overheads").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as Overhead[];
};

export const createOverhead = async (overhead: Omit<Overhead, "id" | "created_at" | "updated_at">) => {
  const { data, error } = await supabase.from("overheads").insert(overhead).select().single();
  if (error) throw error;
  return data as Overhead;
};

export const updateOverhead = async (id: string, overhead: Partial<Omit<Overhead, "id" | "created_at" | "updated_at">>) => {
  const { data, error } = await supabase.from("overheads").update({ ...overhead, updated_at: new Date().toISOString() }).eq("id", id).select().single();
  if (error) throw error;
  return data as Overhead;
};

export const deleteOverhead = async (id: string) => {
  const { error } = await supabase.from("overheads").delete().eq("id", id);
  if (error) throw error;
};

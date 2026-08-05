import { supabase } from "@/lib/supabase";
import { OtherReceipt } from "@/types/other_receipt";

export const getOtherReceipts = async () => {
  const { data, error } = await supabase.from("other_receipts").select("*");
  if (error) throw error;
  return data as OtherReceipt[];
};

export const createOtherReceipt = async (receipt: any) => {
  const { id, ...receiptWithoutId } = receipt;
  const { data, error } = await supabase.from("other_receipts").insert({
    ...receiptWithoutId,
    payment_status: "Unpaid",
    paid_date: null
  }).select().single();
  if (error) {
    console.error("Supabase Insert Error:", error);
    throw error;
  }
  return data as OtherReceipt;
};

export const updateOtherReceipt = async (id: string, receipt: Partial<OtherReceipt>) => {
  const { data, error } = await supabase.from("other_receipts").update(receipt).eq("id", id).select().single();
  if (error) throw error;
  return data as OtherReceipt;
};

export const deleteOtherReceipt = async (id: string) => {
  const { error } = await supabase.from("other_receipts").delete().eq("id", id);
  if (error) throw error;
};

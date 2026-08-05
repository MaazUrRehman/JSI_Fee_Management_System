export interface OtherReceipt {
  date: string | number | Date;
  id: string;
  student_name: string;
  father_name: string;
  class: string;
  phone: string;
  address: string;
  fees: number;
  fees_details: string;
  due_date: string;
  payment_status: "Unpaid" | "Paid";
  paid_date: string | null;
  created_at: string;
  updated_at: string;
}

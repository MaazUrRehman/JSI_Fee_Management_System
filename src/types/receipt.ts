export interface Receipt {
  id: string;
  student_id: string;
  month: number | string;
  year: number;
  fee_amount: number;
  late_charges: number;
  total_amount: number;
  paid_date?: string;
  payment_method?: string;
  receipt_no: string;
  status: string;
  created_at: string;
  updated_at: string;
  additional_charges?: number[];
  additional_charges_details?: string[];
  discounts?: { amount: number; details: string }[];
  total_discount?: number;
  previous_balance?: number;
  remaining_amount?: number;
  due_date?: string;
  registration_fee?: number;
}

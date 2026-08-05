export interface Student {
  group: string;
  shift: string;
  id: string;
  student_id: string;
  student_name: string;
  father_name: string;
  class: string;
  student_group: string;
  monthly_fee: number;
  admission_date?: string | null;
  phone?: string;
  address?: string;
  status: string;
  registered_for_months: number;
  created_at: string;
  updated_at: string;
}

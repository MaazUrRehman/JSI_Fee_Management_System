-- Create students table
CREATE TABLE students (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id text UNIQUE NOT NULL,
    student_name text NOT NULL,
    father_name text NOT NULL,
    class text NOT NULL,
    student_group text,
    monthly_fee numeric NOT NULL,
    admission_date date,
    phone text,
    address text,
    status text DEFAULT 'Active',
    registered_for_months integer DEFAULT 12,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create overheads table
CREATE TABLE overheads (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    amount numeric NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create receipts table
CREATE TABLE receipts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id uuid REFERENCES students(id) ON DELETE CASCADE,
    month integer NOT NULL,
    year integer NOT NULL,
    fee_amount numeric NOT NULL,
    late_charges numeric DEFAULT 0,
    total_amount numeric NOT NULL,
    paid_date date,
    due_date date,
    payment_method text,
    receipt_no text UNIQUE,
    status text DEFAULT 'Unpaid',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_students_student_id ON students(student_id);
CREATE INDEX idx_receipts_student_id ON receipts(student_id);
CREATE INDEX idx_receipts_receipt_no ON receipts(receipt_no);
CREATE INDEX idx_receipts_status ON receipts(status);

-- Migration: Add previous_balance and remaining_amount to receipts table
ALTER TABLE public.receipts ADD COLUMN IF NOT EXISTS previous_balance numeric DEFAULT 0;
ALTER TABLE public.receipts ADD COLUMN IF NOT EXISTS remaining_amount numeric DEFAULT 0;
ALTER TABLE public.receipts ADD COLUMN IF NOT EXISTS due_date date;

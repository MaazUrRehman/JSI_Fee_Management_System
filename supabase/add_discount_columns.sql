-- Add new discount columns to the receipts table
ALTER TABLE public.receipts ADD COLUMN IF NOT EXISTS discounts jsonb;
ALTER TABLE public.receipts ADD COLUMN IF NOT EXISTS total_discount numeric DEFAULT 0;
ALTER TABLE public.receipts ADD COLUMN IF NOT EXISTS discount_details text;

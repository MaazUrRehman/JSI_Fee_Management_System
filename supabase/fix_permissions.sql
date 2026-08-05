-- Ensure the table is accessible to the authenticated/anon roles.
-- Since the table is in the public schema, verify permissions:
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE public.other_receipts TO anon, authenticated;

-- If RLS is enabled, policies must be added. 
-- To match the behavior of other modules, either disable RLS or add a permissive policy:

-- Option A: Disable RLS (Simplest fix to match standard behavior)
ALTER TABLE public.other_receipts DISABLE ROW LEVEL SECURITY;

-- Option B: Enable RLS and add a policy for authenticated users (Recommended for security)
-- ALTER TABLE public.other_receipts ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow all actions for authenticated users" ON public.other_receipts
-- FOR ALL TO authenticated USING (true) WITH CHECK (true);

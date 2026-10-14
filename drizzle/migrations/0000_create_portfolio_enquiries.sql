CREATE TABLE public.portfolio_enquiries (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255 AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
 subject text NOT NULL CHECK (char_length(subject) BETWEEN 1 AND 150),
 message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 5000)
);
GRANT INSERT ON public.portfolio_enquiries TO anon, authenticated;
GRANT ALL ON public.portfolio_enquiries TO service_role;
ALTER TABLE public.portfolio_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors may submit enquiries" ON public.portfolio_enquiries FOR INSERT TO anon, authenticated WITH CHECK (char_length(name) BETWEEN 1 AND 100 AND char_length(subject) BETWEEN 1 AND 150 AND char_length(message) BETWEEN 10 AND 5000);

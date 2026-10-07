CREATE TABLE public.contact_submissions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
 message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 1000)
);
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE TABLE public.contact_rate_limits (
 key text PRIMARY KEY,
 window_start timestamptz NOT NULL DEFAULT now(),
 attempts integer NOT NULL DEFAULT 1
);
GRANT ALL ON public.contact_rate_limits TO service_role;
ALTER TABLE public.contact_rate_limits ENABLE ROW LEVEL SECURITY;
CREATE OR REPLACE FUNCTION public.submit_contact(p_name text, p_email text, p_message text, p_rate_key text)
RETURNS uuid LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
DECLARE v_attempts integer; v_id uuid;
BEGIN
 IF length(trim(p_name)) NOT BETWEEN 1 AND 100 OR length(p_email) NOT BETWEEN 3 AND 255 OR p_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' OR length(trim(p_message)) NOT BETWEEN 1 AND 1000 THEN
 RAISE EXCEPTION 'Invalid contact details'; END IF;
 INSERT INTO public.contact_rate_limits AS limits (key) VALUES (p_rate_key)
 ON CONFLICT (key) DO UPDATE SET
 attempts = CASE WHEN limits.window_start < now() - interval '10 minutes' THEN 1 ELSE limits.attempts + 1 END,
 window_start = CASE WHEN limits.window_start < now() - interval '10 minutes' THEN now() ELSE limits.window_start END
 RETURNING attempts INTO v_attempts;
 IF v_attempts > 5 THEN RETURN NULL; END IF;
 INSERT INTO public.contact_submissions(name,email,message) VALUES(trim(p_name),lower(trim(p_email)),trim(p_message)) RETURNING id INTO v_id;
 RETURN v_id;
END;
$$;
REVOKE ALL ON FUNCTION public.submit_contact(text,text,text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_contact(text,text,text,text) TO service_role;
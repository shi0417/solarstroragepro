-- =============================================
-- contact_submissions: stores website contact form inquiries
-- =============================================
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        TEXT    NOT NULL,
  company     TEXT    NOT NULL,
  email       TEXT    NOT NULL,
  project_type TEXT   DEFAULT NULL,
  message     TEXT    DEFAULT NULL,
  source      TEXT    DEFAULT 'website',
  locale      TEXT    DEFAULT 'en',
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous INSERT (public contact form)
CREATE POLICY "Allow anonymous insert on contact_submissions"
  ON public.contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can read (admin dashboard)
CREATE POLICY "Allow authenticated read on contact_submissions"
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Index for sorting by date
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
  ON public.contact_submissions (created_at DESC);

-- =============================================
-- resource_downloads: tracks email-gated resource downloads
-- =============================================
CREATE TABLE IF NOT EXISTS public.resource_downloads (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email         TEXT    NOT NULL,
  name          TEXT    DEFAULT NULL,
  company       TEXT    DEFAULT NULL,
  resource_slug TEXT    NOT NULL,
  resource_name TEXT    NOT NULL,
  source        TEXT    DEFAULT 'website',
  locale        TEXT    DEFAULT 'en',
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.resource_downloads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous INSERT
CREATE POLICY "Allow anonymous insert on resource_downloads"
  ON public.resource_downloads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can read
CREATE POLICY "Allow authenticated read on resource_downloads"
  ON public.resource_downloads
  FOR SELECT
  TO authenticated
  USING (true);

-- Index for sorting by date and dedup
CREATE INDEX IF NOT EXISTS idx_resource_downloads_created_at
  ON public.resource_downloads (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_resource_downloads_email_resource
  ON public.resource_downloads (email, resource_slug);

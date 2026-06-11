"""Execute Supabase migration SQL via Management API."""
import json
import urllib.request

API_URL = "https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query"
TOKEN = "REMOVED_SECRET"

queries = [
    # contact_submissions policies
    'CREATE POLICY "Allow anonymous insert on contact_submissions" ON public.contact_submissions FOR INSERT TO anon WITH CHECK (true);',
    'CREATE POLICY "Allow authenticated read on contact_submissions" ON public.contact_submissions FOR SELECT TO authenticated USING (true);',
    'CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions (created_at DESC);',
    # resource_downloads table
    'CREATE TABLE IF NOT EXISTS public.resource_downloads (id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, email TEXT NOT NULL, name TEXT DEFAULT NULL, company TEXT DEFAULT NULL, resource_slug TEXT NOT NULL, resource_name TEXT NOT NULL, source TEXT DEFAULT \'website\', locale TEXT DEFAULT \'en\', created_at TIMESTAMPTZ DEFAULT now());',
    # resource_downloads RLS
    'ALTER TABLE public.resource_downloads ENABLE ROW LEVEL SECURITY;',
    'CREATE POLICY "Allow anonymous insert on resource_downloads" ON public.resource_downloads FOR INSERT TO anon WITH CHECK (true);',
    'CREATE POLICY "Allow authenticated read on resource_downloads" ON public.resource_downloads FOR SELECT TO authenticated USING (true);',
    # resource_downloads indexes
    'CREATE INDEX IF NOT EXISTS idx_resource_downloads_created_at ON public.resource_downloads (created_at DESC);',
    'CREATE INDEX IF NOT EXISTS idx_resource_downloads_email_resource ON public.resource_downloads (email, resource_slug);',
]

def run_query(q):
    data = json.dumps({"query": q}).encode()
    req = urllib.request.Request(
        API_URL,
        data=data,
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        resp = urllib.request.urlopen(req, timeout=15)
        result = resp.read().decode()
        print(f"OK: {q[:70]}... => {result[:200]}")
        return True
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"ERR: {q[:70]}... => {body[:300]}")
        return False
    except Exception as e:
        print(f"ERR: {q[:70]}... => {str(e)[:200]}")
        return False

for i, q in enumerate(queries, 1):
    print(f"\n[{i}/{len(queries)}] Running...")
    ok = run_query(q)
    if not ok:
        print("Stopping due to error.")
        break

print("\nDone!")
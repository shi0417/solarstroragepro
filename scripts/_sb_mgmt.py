"""Minimal Supabase Management API SQL helper (works when *.supabase.co REST is TLS-reset locally)."""
import json
import os
import urllib.request
import urllib.error

PROJECT_REF = "qujcrmbzuzlgjrexbzga"


def _load_token():
    p = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env.local")
    for line in open(p, encoding="utf-8"):
        if line.startswith("SUPABASE_LOGIN_TOKEN"):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise RuntimeError("SUPABASE_LOGIN_TOKEN not found")


TOKEN = _load_token()


def query(sql, retries=3):
    url = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"
    body = json.dumps({"query": sql}).encode("utf-8")
    last = None
    for _ in range(retries):
        req = urllib.request.Request(
            url,
            data=body,
            headers={
                "Authorization": f"Bearer {TOKEN}",
                "Content-Type": "application/json",
                "User-Agent": "solarstoragepro-blog/1.0",
            },
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=90) as r:
                txt = r.read().decode("utf-8")
                return json.loads(txt) if txt.strip() else []
        except urllib.error.HTTPError as e:
            detail = e.read().decode("utf-8", "replace")
            last = RuntimeError(f"HTTP {e.code}: {detail[:500]}")
        except Exception as e:  # noqa: BLE001
            last = e
    raise last


def esc(s):
    return s.replace("'", "''")


if __name__ == "__main__":
    import sys

    sql = sys.argv[1] if len(sys.argv) > 1 else "select count(*) from blog_articles"
    print(json.dumps(query(sql), ensure_ascii=False, indent=1))

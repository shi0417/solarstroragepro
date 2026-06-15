"""Update a single blog article body via Supabase REST API PATCH."""
import json
import urllib.request
import urllib.error
import sys

SUPABASE_URL = "https://qujcrmbzuzlgjrexbzga.supabase.co"
ANON_KEY = "sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k"

def patch_body(article_id, locale, body_file):
    with open(body_file, "r", encoding="utf-8") as f:
        body = f.read()
    
    url = f"{SUPABASE_URL}/rest/v1/blog_article_translations?article_id=eq.{article_id}&locale=eq.{locale}"
    payload = json.dumps({"body": body}).encode("utf-8")
    
    req = urllib.request.Request(url, data=payload, method="PATCH",
        headers={
            "apikey": ANON_KEY,
            "Authorization": f"Bearer {ANON_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        })
    
    try:
        with urllib.request.urlopen(req) as resp:
            status = resp.status
            result = resp.read().decode("utf-8") or "(empty)"
        print(f"OK: article_id={article_id}, locale={locale}, status={status}, body_len={len(body)}")
    except urllib.error.HTTPError as e:
        print(f"FAIL: article_id={article_id}, locale={locale}, status={e.code}, body_len={len(body)}")
        print(f"  Error: {e.read().decode('utf-8', errors='replace')[:200]}")


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python patch_blog_body.py <article_id> <locale> <body_file>")
        sys.exit(1)
    patch_body(sys.argv[1], sys.argv[2], sys.argv[3])

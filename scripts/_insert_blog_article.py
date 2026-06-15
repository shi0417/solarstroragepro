"""Insert a new blog article into Supabase."""
import json
import urllib.request
import urllib.error
import sys

SUPABASE_URL = "https://qujcrmbzuzlgjrexbzga.supabase.co"
ANON_KEY = "sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k"

# Read login token from .env.local
env_path = "D:/project/solarstoragepro/.env.local"
login_token = None
with open(env_path, "r") as f:
    for line in f:
        if line.startswith("SUPABASE_LOGIN_TOKEN="):
            login_token = line.split("=", 1)[1].strip()
            break

HEADERS_ANON = {
    "apikey": ANON_KEY,
    "Authorization": f"Bearer {ANON_KEY}",
    "Content-Type": "application/json",
}

HEADERS_ADMIN = {
    "apikey": ANON_KEY,
    "Authorization": f"Bearer {login_token}",
    "Content-Type": "application/json",
}

def api_request(method, path, data=None, use_admin=False):
    """Make a Supabase REST API request."""
    url = f"{SUPABASE_URL}/rest/v1/{path}"
    headers = HEADERS_ADMIN if use_admin else HEADERS_ANON
    body = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            raw = resp.read().decode("utf-8")
            print(f"  Response ({resp.status}): {raw[:200]}")
            return json.loads(raw) if raw else []
    except urllib.error.HTTPError as e:
        raw = e.read().decode("utf-8")
        print(f"  HTTP Error {e.code}: {raw}")
        raise

# Load article data
with open("D:/project/solarstoragepro/scripts/_blog_new_article.json", "r", encoding="utf-8") as f:
    article = json.load(f)

print("=" * 60)
print(f"Inserting article: {article['slug']}")
print(f"Using login_token: {'***' + login_token[-6:] if login_token else 'NOT FOUND'}")
print("=" * 60)

# Step 1: Insert main record (try with admin token)
main_data = {
    "slug": article["slug"],
    "date": article["date"],
    "read_time": article["read_time"],
    "tags": article["tags"],
}
print("\n[Step 1] Inserting blog_articles (with login token)...")
try:
    result = api_request("POST", "blog_articles?select=id,slug", main_data, use_admin=True)
    article_id = result[0]["id"]
    print(f"  ✅ Created article: id={article_id}, slug={result[0]['slug']}")
except Exception as e:
    print(f"  ❌ Login token failed, trying anon key...")
    result = api_request("POST", "blog_articles?select=id,slug", main_data)
    article_id = result[0]["id"]
    print(f"  ✅ Created article: id={article_id}, slug={result[0]['slug']}")

# Step 2: Insert English translation
print("\n[Step 2] Inserting EN translation...")
en = article["en"]
trans_data = {
    "article_id": article_id,
    "locale": "en",
    "category": en["category"],
    "title": en["title"],
    "description": en["description"],
    "body": en["body"],
}
try:
    api_request("POST", "blog_article_translations", trans_data, use_admin=True)
    print(f"  ✅ EN translation inserted")
except Exception as e:
    print(f"  ❌ Login token failed for EN, trying anon...")
    api_request("POST", "blog_article_translations", trans_data)
    print(f"  ✅ EN translation inserted (anon)")

# Step 3: Insert Chinese translation
print("\n[Step 3] Inserting ZH translation...")
zh = article["zh"]
trans_data = {
    "article_id": article_id,
    "locale": "zh",
    "category": zh["category"],
    "title": zh["title"],
    "description": zh["description"],
    "body": zh["body"],
}
try:
    api_request("POST", "blog_article_translations", trans_data, use_admin=True)
    print(f"  ✅ ZH translation inserted")
except Exception as e:
    print(f"  ❌ Login token failed for ZH, trying anon...")
    api_request("POST", "blog_article_translations", trans_data)
    print(f"  ✅ ZH translation inserted (anon)")

# Step 4: Verify
print("\n[Step 4] Verifying...")
verify = api_request("GET", f"blog_articles?slug=eq.{article['slug']}&select=id,slug,date")
if verify and verify[0]["slug"] == article["slug"]:
    print(f"  ✅ Verification PASSED: slug={verify[0]['slug']}, date={verify[0]['date']}")

translations = api_request("GET", f"blog_article_translations?article_id=eq.{article_id}&select=locale")
locales = [t["locale"] for t in translations]
print(f"  ✅ Translations found: {len(locales)} ({', '.join(locales)})")

print("\n" + "=" * 60)
print("  🎉 Article #9 published successfully!")
print(f"  Slug: {article['slug']}")
print(f"  Article ID: {article_id}")
print(f"  URL: /blog/{article['slug']}")
print("=" * 60)

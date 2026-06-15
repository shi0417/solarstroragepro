"""Insert EN+ZH translations for existing blog article."""
import json
import urllib.request
import urllib.error

SUPABASE_URL = "https://qujcrmbzuzlgjrexbzga.supabase.co"
ANON_KEY = "sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k"
ARTICLE_ID = "f197da4c-ebcd-425e-b0c4-fb80121fd298"

HEADERS = {
    "apikey": ANON_KEY,
    "Authorization": f"Bearer {ANON_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation",
}

def post(path, data):
    url = f"{SUPABASE_URL}/rest/v1/{path}"
    body = json.dumps(data, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(url, data=body, headers=HEADERS, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            raw = resp.read().decode("utf-8")
            return json.loads(raw) if raw else []
    except urllib.error.HTTPError as e:
        raw = e.read().decode("utf-8")
        print(f"  ERROR {e.code}: {raw}")
        return None

# Load article
with open("D:/project/solarstoragepro/scripts/_blog_new_article.json", "r", encoding="utf-8") as f:
    article = json.load(f)

# Insert EN
print("Inserting EN translation...")
en = article["en"]
en_data = {
    "article_id": ARTICLE_ID,
    "locale": "en",
    "category": en["category"],
    "title": en["title"],
    "description": en["description"],
    "body": en["body"],
}
result = post("blog_article_translations", en_data)
if result:
    print(f"  ✅ EN inserted: id={result[0].get('id','?')}")

# Insert ZH
print("Inserting ZH translation...")
zh = article["zh"]
zh_data = {
    "article_id": ARTICLE_ID,
    "locale": "zh",
    "category": zh["category"],
    "title": zh["title"],
    "description": zh["description"],
    "body": zh["body"],
}
result = post("blog_article_translations", zh_data)
if result:
    print(f"  ✅ ZH inserted: id={result[0].get('id','?')}")

print("\nDone!")

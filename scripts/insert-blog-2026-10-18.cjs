const fs = require('fs');
const path = require('path');

const ANON_KEY = 'sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k';
const SUPABASE_URL = 'https://qujcrmbzuzlgjrexbzga.supabase.co';

const docPath = path.resolve(__dirname, '../docs/blog-2026-10-18-bess-soc-operating-window-optimization.md');
const doc = JSON.parse(fs.readFileSync(docPath, 'utf8'));

async function post(url, body, headers = {}) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return text ? JSON.parse(text) : null;
}

async function main() {
  const article = await post(`${SUPABASE_URL}/rest/v1/blog_articles`, {
    slug: doc.slug,
    date: doc.date,
    read_time: doc.read_time,
    tags: doc.tags,
  }, { Prefer: 'return=representation' });

  const articleId = article[0].id;
  console.log('Inserted article id:', articleId);

  for (const locale of ['en', 'zh']) {
    const t = doc[locale];
    await post(`${SUPABASE_URL}/rest/v1/blog_article_translations`, {
      article_id: articleId,
      locale,
      category: t.category,
      title: t.title,
      description: t.description,
      body: t.body,
    });
    console.log(`Inserted translation: ${locale}`);
  }

  // Verify
  const verifyRes = await fetch(`${SUPABASE_URL}/rest/v1/blog_articles?slug=eq.${doc.slug}&select=id,slug,date`, {
    headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
  });
  const verify = await verifyRes.json();
  console.log('Verification:', JSON.stringify(verify, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

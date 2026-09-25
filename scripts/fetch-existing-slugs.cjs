const fs = require('fs');
const path = require('path');

function loadAnonKey() {
  if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    const match = content.match(/^NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)$/m);
    if (match) return match[1].trim();
  }
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY not found in .env.local or environment');
}

const ANON_KEY = loadAnonKey();
const SUPABASE_URL = 'https://qujcrmbzuzlgjrexbzga.supabase.co';

async function main() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_articles?select=slug`, {
      method: 'GET',
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
      },
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('Failed:', res.status, err);
      process.exit(1);
    }
    const data = await res.json();
    const slugs = data.map((r) => r.slug).sort();
    console.log(JSON.stringify(slugs, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();

// Supabase Management API helper (token read at runtime from .env.local — never hardcode)
const fs = require('fs');
const path = require('path');
const env = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
const m = env.match(/SUPABASE_LOGIN_TOKEN=(\S+)/);
if (!m) throw new Error('SUPABASE_LOGIN_TOKEN not found');
const TOKEN = m[1];
const REF = 'qujcrmbzuzlgjrexbzga';
async function runSql(sql) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${REF}/database/query`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: sql })
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 500)}`);
  return JSON.parse(text);
}
module.exports = { runSql };

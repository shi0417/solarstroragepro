/**
 * Migrate blog articles from blog-data.ts to Supabase.
 *
 * Usage: node scripts/migrate-blog-to-supabase.cjs
 */

const fs = require("fs");
const path = require("path");

// ── Config ──
const SUPABASE_URL = "https://qujcrmbzuzlgjrexbzga.supabase.co";
const ANON_KEY = (() => {
  const envFile = fs.readFileSync(
    path.join(__dirname, "..", ".env.local"),
    "utf8"
  );
  const m = envFile.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY\s*=\s*(.+)/);
  return m ? m[1].trim() : "";
})();

async function supabaseFetch(endpoint, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
  const headers = {
    apikey: ANON_KEY,
    Authorization: `Bearer ${ANON_KEY}`,
    "Content-Type": "application/json",
    "Prefer": options.prefer || "return=representation",
    ...(options.headers || {}),
  };
  const res = await fetch(url, { method: options.method || "GET", headers, body: options.body });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status} ${endpoint}: ${body}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// ── Parse blog-data.ts ──
function parseArticles() {
  const filePath = path.join(__dirname, "..", "src", "app", "[locale]", "blog", "blog-data.ts");
  const src = fs.readFileSync(filePath, "utf8");

  // Find the ARTICLES array start
  const articlesStart = src.indexOf("export const ARTICLES");
  if (articlesStart === -1) throw new Error("ARTICLES not found");
  const afterOpen = src.indexOf("[", articlesStart);

  // Parse each article object, respecting backtick strings
  const articleChunks = [];
  let depth = 0;
  let currentStart = -1;
  let inQuote = false;
  let quoteChar = "";
  let inBacktick = false;

  for (let i = afterOpen + 1; i < src.length; i++) {
    const ch = src[i];

    // Track backtick strings (used for body content)
    if (ch === "`") {
      inBacktick = !inBacktick;
      continue;
    }
    if (inBacktick) continue;

    // Track regular quoted strings
    if (ch === "\"" || ch === "'") {
      if (!inQuote) {
        inQuote = true;
        quoteChar = ch;
      } else if (ch === quoteChar) {
        inQuote = false;
      }
      continue;
    }
    if (inQuote) continue;

    // Track brace depth
    if (ch === "{") {
      if (depth === 0) currentStart = i;
      depth++;
    } else if (ch === "}") {
      depth--;
      if (depth === 0 && currentStart >= 0) {
        articleChunks.push(src.substring(currentStart, i + 1));
        currentStart = -1;
      } else if (depth < 0) {
        // End of array
        break;
      }
    }
  }

  console.log(`Found ${articleChunks.length} article chunks`);

  // Parse each chunk
  return articleChunks.map((chunk) => parseArticleChunk(chunk));
}

function parseArticleChunk(chunk) {
  const slug = extract(chunk, /slug:\s*"([^"]+)"/);
  const date = extract(chunk, /date:\s*"([^"]+)"/);
  const readTime = parseInt(extract(chunk, /readTime:\s*(\d+)/) || "5");
  const tags = extractArray(chunk, /tags:\s*\[([\s\S]*?)\]/);

  const catEn = extract(chunk, /category:\s*\{[^}]*en:\s*"([^"]+)"/);
  const catZh = extract(chunk, /category:\s*\{[^}]*zh:\s*"([^"]+)"/);

  const titleEn = extract(chunk, /title:\s*\{[^}]*en:\s*"([^"]+)"/);
  const titleZh = extract(chunk, /title:\s*\{[^}]*zh:\s*"([^"]+)"/);

  const descEn = extract(chunk, /description:\s*\{[^}]*en:\s*"([^"]+)"/);
  const descZh = extract(chunk, /description:\s*\{[^}]*zh:\s*"([^"]+)"/);

  // Body uses backticks
  const bodyEn = extractBacktick(chunk, "en");
  const bodyZh = extractBacktick(chunk, "zh");

  return { slug, date, readTime, tags,
    category: { en: catEn || "", zh: catZh || "" },
    title: { en: titleEn || "", zh: titleZh || "" },
    description: { en: descEn || "", zh: descZh || "" },
    body: { en: bodyEn, zh: bodyZh },
  };
}

function extract(str, regex) {
  const m = str.match(regex);
  return m ? m[1] : null;
}

function extractArray(str, regex) {
  const m = str.match(regex);
  if (!m) return [];
  return m[1].split(",").map((s) => s.trim().replace(/"/g, "")).filter(Boolean);
}

function extractBacktick(chunk, locale) {
  // Find body: { en: `...`, zh: `...` }
  // We need to find the backtick string for the given locale
  const bodyStart = chunk.indexOf("body:");
  if (bodyStart === -1) return "";

  // Find the locale's backtick string
  const localePattern = new RegExp(locale + "\\s*:\\s*`");
  const localeMatch = chunk.match(localePattern);
  if (!localeMatch) return "";

  let pos = chunk.indexOf(localeMatch[0]) + localeMatch[0].length;
  let end = pos;
  while (end < chunk.length) {
    if (chunk[end] === "`" && chunk[end - 1] !== "\\") {
      break;
    }
    end++;
  }
  return chunk.substring(pos, end);
}

// ── Migration ──
async function migrate() {
  const articles = parseArticles();
  console.log(`Parsed ${articles.length} articles ready to migrate`);

  let inserted = 0;
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    if (!article.slug) {
      console.log(`  ⚠️ Article #${i + 1} has no slug, skipping`);
      continue;
    }
    console.log(`  Migrating: ${article.slug}`);

    // 1. Insert article
    const saved = await supabaseFetch("blog_articles", {
      method: "POST",
      body: JSON.stringify({
        slug: article.slug,
        date: article.date,
        read_time: article.readTime,
        tags: article.tags,
      }),
    });
    if (!saved || !saved[0] || !saved[0].id) {
      console.log(`    ❌ Failed: ${JSON.stringify(saved)}`);
      continue;
    }
    const articleId = saved[0].id;

    // 2. Insert English + Chinese translations
    for (const lc of ["en", "zh"]) {
      await supabaseFetch("blog_article_translations", {
        method: "POST",
        body: JSON.stringify({
          article_id: articleId,
          locale: lc,
          category: article.category[lc],
          title: article.title[lc],
          description: article.description[lc],
          body: article.body[lc],
        }),
        prefer: "return=minimal",
      });
    }

    console.log(`    ✅ Inserted (${articleId})`);
    inserted++;
  }

  console.log(`\n✅ Migration complete: ${inserted} articles migrated`);
}

migrate().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});

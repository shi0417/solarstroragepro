/**
 * Blog data access layer — fetches articles from Supabase.
 *
 * Usage:
 *   import { fetchArticles, fetchArticleBySlug } from "@/lib/blog-data";
 *   const articles = await fetchArticles("es");
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qujcrmbzuzlgjrexbzga.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  "sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k";

export interface BlogArticle {
  id: string;
  slug: string;
  date: string;
  readTime: number;
  tags: string[];
  category: string;
  title: string;
  description: string;
  body: string;
  locale: string;
}

async function supabaseGet(endpoint: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Accept: "application/json",
    },
    // Note: next.revalidate removed — ISR is server-only; this runs client-side
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(
      `[blog-data] Supabase fetch error: ${res.status} ${endpoint}`,
      { body: body.slice(0, 200) }
    );
    return [];
  }
  return res.json();
}

/**
 * Fetch all articles for a given locale, ordered by date descending.
 */
export async function fetchArticles(locale: string): Promise<BlogArticle[]> {
  const rows = await supabaseGet(
    `blog_articles?select=id,slug,date,read_time,tags,blog_article_translations(category,title,description,body)&blog_article_translations.locale=eq.${locale}&order=date.desc`
  );

  if (!rows || !Array.isArray(rows)) return [];

  /* eslint-disable @typescript-eslint/no-explicit-any */
  return rows
    .filter(
      (row: Record<string, any>) =>
        Array.isArray(row.blog_article_translations) &&
        row.blog_article_translations.length > 0
    )
    .map((row: Record<string, any>) => {
      const t = row.blog_article_translations[0];
      return {
      id: row.id as string,
      slug: row.slug as string,
      date: row.date as string,
      readTime: row.read_time as number,
      tags: (row.tags || []) as string[],
      category: (t.category || "") as string,
      title: (t.title || "") as string,
      description: (t.description || "") as string,
      body: (t.body || "") as string,
      locale,
    };
  });
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

/**
 * Fetch a single article by slug and locale.
 */
export async function fetchArticleBySlug(
  slug: string,
  locale: string
): Promise<BlogArticle | null> {
  const rows = await supabaseGet(
    `blog_articles?select=id,slug,date,read_time,tags,blog_article_translations(category,title,description,body)&slug=eq.${slug}&blog_article_translations.locale=eq.${locale}`
  );

  if (!rows || !rows.length) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row: Record<string, any> = rows[0];
  const translations = row.blog_article_translations;
  if (!Array.isArray(translations) || translations.length === 0) return null;
  const t = translations[0];
  return {
    id: row.id as string,
    slug: row.slug as string,
    date: row.date as string,
    readTime: row.read_time as number,
    tags: (row.tags || []) as string[],
    category: (t.category || "") as string,
    title: (t.title || "") as string,
    description: (t.description || "") as string,
    body: (t.body || "") as string,
    locale,
  };
}

/**
 * Fetch all slugs for sitemap / SSG.
 */
export async function fetchAllSlugs(): Promise<string[]> {
  const rows = await supabaseGet("blog_articles?select=slug");
  if (!rows || !Array.isArray(rows)) return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return rows.map((r: Record<string, any>) => r.slug as string);
}

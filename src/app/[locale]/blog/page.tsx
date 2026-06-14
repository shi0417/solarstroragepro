"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { fetchArticles, BlogArticle } from "@/lib/blog-data";

export default function BlogListPage() {
  const { locale, messages } = useLocaleContext();
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await fetchArticles(locale);
        if (!cancelled) {
          setArticles(data);
          setLoading(false);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e.message);
          setLoading(false);
        }
      }
    }
    load();
    return () => { cancelled = true; };
  }, [locale]);

  const b = messages.blog ?? {};

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* ── Hero Section ── */}
        <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-10%,rgba(245,158,11,0.12),transparent)]" />
          <div className="pointer-events-none absolute inset-0 bg-grid-slate bg-[length:44px_44px] opacity-10" />

          <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
            <p className="inline-flex rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-400">
              {b.badge}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {b.pageTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-400">
              {b.pageSub}
            </p>
          </div>
        </section>

        {/* ── Article Grid ── */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {loading && (
              <div className="grid gap-8 md:grid-cols-2">
                {[1, 2].map((n) => (
                  <div key={n} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6">
                    <div className="h-1.5 w-24 rounded bg-slate-200" />
                    <div className="mt-4 h-6 w-3/4 rounded bg-slate-200" />
                    <div className="mt-2 h-4 w-full rounded bg-slate-100" />
                    <div className="mt-2 h-4 w-2/3 rounded bg-slate-100" />
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-red-500">Failed to load articles: {error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && articles.length === 0 && (
              <div className="text-center py-12 text-slate-500">{b.noArticles || "No articles yet."}</div>
            )}

            {!loading && !error && articles.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5"
                  >
                    {/* Accent bar */}
                    <div className="h-1.5 bg-gradient-to-r from-brand-500 to-solar-500" />

                    <div className="flex flex-1 flex-col p-6">
                      {/* Category + Read time */}
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 font-medium text-brand-700">
                          {article.category}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readTime} {b.readTime}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {article.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="mt-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-brand-600 sm:text-2xl">
                        {article.title}
                      </h2>

                      {/* Description */}
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                        {article.description}
                      </p>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                          >
                            <Tag className="h-2.5 w-2.5" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read more */}
                      <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                        {b.readMore}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {b.ctaTitle}
            </h2>
            <p className="mt-3 text-slate-600">{b.ctaSub}</p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow-md hover:shadow-brand-600/20"
            >
              {b.ctaBtn}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

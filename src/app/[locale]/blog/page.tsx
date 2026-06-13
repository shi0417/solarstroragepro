"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { ARTICLES } from "./blog-data";

export default function BlogListPage() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";

  const ui = isZh
    ? {
        badge: "知识库",
        pageTitle: "储能技术博客",
        pageSub:
          "深入解析电池储能技术、市场趋势和最佳实践。从投资回报分析到安装指南，助您做出明智决策。",
        readMore: "阅读全文",
        readTime: "分钟阅读",
        backToHome: "返回首页",
        ctaTitle: "需要专业建议？",
        ctaSub: "我们的工程师团队可为您提供定制化的储能解决方案。",
        ctaBtn: "获取方案报价",
        categories: "分类",
      }
    : {
        badge: "Knowledge Base",
        pageTitle: "Energy Storage Blog",
        pageSub:
          "Deep dives into battery storage technology, market trends, and best practices. From ROI analysis to installation guides, make informed decisions for your energy storage projects.",
        readMore: "Read Article",
        readTime: "min read",
        backToHome: "Back to Home",
        ctaTitle: "Need Expert Advice?",
        ctaSub: "Our engineering team can design a custom energy storage solution for your project.",
        ctaBtn: "Request a Proposal",
        categories: "Categories",
      };

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
              {ui.badge}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {ui.pageTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-400">
              {ui.pageSub}
            </p>
          </div>
        </section>

        {/* ── Article Grid ── */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 md:grid-cols-2">
              {ARTICLES.map((article) => (
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
                        {isZh ? article.category.zh : article.category.en}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime} {ui.readTime}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="mt-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-brand-600 sm:text-2xl">
                      {isZh ? article.title.zh : article.title.en}
                    </h2>

                    {/* Description */}
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                      {isZh ? article.description.zh : article.description.en}
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
                      {ui.readMore}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {ui.ctaTitle}
            </h2>
            <p className="mt-3 text-slate-600">{ui.ctaSub}</p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow-md hover:shadow-brand-600/20"
            >
              {ui.ctaBtn}
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

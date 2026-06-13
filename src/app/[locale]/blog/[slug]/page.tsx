"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useLocaleContext } from "@/components/site/LocaleProvider";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { ContactForm } from "@/components/site/ContactForm";
import { getArticleBySlug, ARTICLES } from "../blog-data";

export default function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { locale, messages } = useLocaleContext();
  const isZh = locale === "zh";
  const article = getArticleBySlug(slug);

  const bd = messages.blogDetail ?? {};

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="mx-auto max-w-3xl px-4 py-32 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            {bd.notFound}
          </h1>
          <Link href="/blog" className="mt-4 inline-flex items-center gap-2 text-brand-600 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            {bd.backToBlog}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const title = isZh ? article.title.zh : article.title.en;
  const description = isZh ? article.description.zh : article.description.en;
  const body = isZh ? article.body.zh : article.body.en;

  // Parse body into sections for table of contents and rendering
  const sections = body.split("\n## ").filter(Boolean);
  const introSection = sections[0];
  const contentSections = sections.slice(1).map((section) => {
    const lines = section.split("\n");
    const heading = lines[0].replace(/^#+\s*/, "").trim();
    const content = lines.slice(1).join("\n");
    return { heading, content };
  });

  // Related articles (exclude current, take up to 3)
  const relatedArticles = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* ── Article Header ── */}
        <section className="relative overflow-hidden bg-slate-950 py-12 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-10%,rgba(245,158,11,0.1),transparent)]" />

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-brand-400"
            >
              <ArrowLeft className="h-4 w-4" />
              {bd.backToBlog}
            </Link>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <span className="inline-flex items-center gap-1 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-0.5 text-xs font-medium text-brand-400">
                {isZh ? article.category.zh : article.category.en}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {article.date}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime} {bd.readTime}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            <p className="mt-4 max-w-3xl text-lg text-slate-300">{description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-400"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Article Body ── */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_220px]">
              {/* Main content */}
              <article className="prose prose-slate prose-lg max-w-none prose-headings:scroll-mt-20 prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-table:text-sm">
                {/* Intro */}
                {renderBody(introSection)}

                {/* Content sections */}
                {contentSections.map((section) => (
                  <div key={section.heading}>
                    <h2 id={slugify(section.heading)}>{section.heading}</h2>
                    {renderBody(section.content)}
                  </div>
                ))}
              </article>

              {/* Sidebar: Table of Contents (desktop only) */}
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {bd.tableOfContents}
                  </h3>
                  <nav className="mt-3 space-y-2">
                    {contentSections.map((section) => (
                      <a
                        key={section.heading}
                        href={`#${slugify(section.heading)}`}
                        className="block text-sm text-slate-500 transition-colors hover:text-brand-600 line-clamp-2"
                      >
                        {section.heading}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── CTA: Contact Form ── */}
        <section id="contact" className="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {bd.ctaTitle}
              </h2>
              <p className="mt-3 text-slate-600">{bd.ctaSub}</p>
            </div>
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* ── Related Articles ── */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-slate-200 py-12 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className="text-2xl font-bold text-slate-900">{bd.relatedArticles}</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md"
                  >
                    <span className="text-xs font-medium text-brand-600">
                      {isZh ? related.category.zh : related.category.en}
                    </span>
                    <h3 className="mt-1 text-base font-semibold text-slate-900 transition-colors group-hover:text-brand-600 line-clamp-2">
                      {isZh ? related.title.zh : related.title.en}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-500 line-clamp-2">
                      {isZh ? related.description.zh : related.description.en}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

/** Simple slugify for heading anchors */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Render plain text with markdown-like formatting into JSX */
function renderBody(text: string): React.ReactNode {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let currentTable: { header?: string[]; rows: string[][] } | null = null;
  let key = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={key++}>
          {currentList.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const flushTable = () => {
    if (currentTable) {
      const t = currentTable;
      elements.push(
        <div key={key++} className="overflow-x-auto">
          <table>
            {t.header && (
              <thead>
                <tr>
                  {t.header.map((h, i) => (
                    <th key={i} dangerouslySetInnerHTML={{ __html: formatInline(h) }} />
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {t.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} dangerouslySetInnerHTML={{ __html: formatInline(cell) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTable = null;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      flushList();
      continue;
    }

    // Table row
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushList();
      const cells = trimmed.split("|").filter(Boolean).map((c) => c.trim());
      // Separator row
      if (cells.every((c) => /^[-:]+$/.test(c))) continue;
      if (!currentTable) {
        currentTable = { header: cells, rows: [] };
      } else {
        currentTable.rows.push(cells);
      }
      continue;
    }
    flushTable();

    // H3
    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(<h3 key={key++} dangerouslySetInnerHTML={{ __html: formatInline(trimmed.slice(4)) }} />);
      continue;
    }

    // List item
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      currentList.push(trimmed.slice(2));
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      currentList.push(trimmed.replace(/^\d+\.\s/, ""));
      continue;
    }

    flushList();

    // Paragraph
    elements.push(<p key={key++} dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />);
  }

  flushList();
  flushTable();

  return <>{elements}</>;
}

/** Format inline markdown: bold, code, links */
function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { BLOG_POSTS, formatBlogDate } from "@/lib/blogContent";
import { localizeHref } from "@/lib/seo";
import ScrollReveal from "./animations/ScrollReveal";

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

export default function BlogIndexPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="px-5 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-32 md:px-10">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-600"
              style={{ fontFamily: MONO }}
            >
              {t("blog.badge")}
            </p>
            <h1 className="max-w-2xl text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
              {t("blog.title")}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-500 sm:text-lg">
              {t("blog.subtitle")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Post list ─────────────────────────────────────── */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-24 md:px-10">
        <div className="mx-auto grid max-w-4xl gap-5">
          {BLOG_POSTS.map((post, i) => {
            const p = post[language];
            return (
              <ScrollReveal key={post.slug} delay={i * 0.08}>
                <Link
                  href={localizeHref(`/blog/${post.slug}`, language)}
                  className="group block rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_12px_40px_rgba(139,92,246,0.12)] sm:p-8"
                >
                  <div
                    className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400"
                    style={{ fontFamily: MONO }}
                  >
                    <span className="rounded-full bg-violet-50 px-2.5 py-1 text-violet-600">
                      {p.tag}
                    </span>
                    <span>{formatBlogDate(post.date, language)}</span>
                    <span aria-hidden>·</span>
                    <span>
                      {post.readingMinutes} {t("blog.minRead")}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-violet-700 sm:text-2xl">
                    {p.title}
                  </h2>
                  <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
                    {p.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-violet-600">
                    {t("blog.readArticle")}
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}

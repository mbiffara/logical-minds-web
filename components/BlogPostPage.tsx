"use client";

import Link from "next/link";
import { useContact } from "@/context/ContactContext";
import { useLanguage } from "@/context/LanguageContext";
import { BLOG_POSTS, formatBlogDate, type BlogPost } from "@/lib/blogContent";
import { localizeHref } from "@/lib/seo";
import ScrollReveal from "./animations/ScrollReveal";

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

export default function BlogPostPage({ post }: { post: BlogPost }) {
  const { t, language } = useLanguage();
  const { openContact } = useContact();

  const p = post[language];
  const others = BLOG_POSTS.filter((other) => other.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Article header ────────────────────────────────── */}
      <section className="px-5 pt-28 sm:px-8 sm:pt-32 md:px-10">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <Link
              href={localizeHref("/blog", language)}
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-violet-600"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {t("blog.backToBlog")}
            </Link>

            <div
              className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400"
              style={{ fontFamily: MONO }}
            >
              <span className="rounded-full bg-violet-50 px-2.5 py-1 text-violet-600">{p.tag}</span>
              <span>{formatBlogDate(post.date, language)}</span>
              <span aria-hidden>·</span>
              <span>
                {post.readingMinutes} {t("blog.minRead")}
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-[42px]">
              {p.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-gray-500 sm:text-lg">{p.excerpt}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Article body ──────────────────────────────────── */}
      <article className="px-5 pb-16 pt-10 sm:px-8 sm:pt-12 md:px-10">
        <div className="mx-auto max-w-3xl">
          {p.sections.map((section, i) => (
            <ScrollReveal key={i} className="mt-8 first:mt-0">
              <div>
                {section.heading && (
                  <h2 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">{section.heading}</h2>
                )}
                {section.paragraphs.map((paragraph, j) => (
                  <p key={j} className="mb-4 text-[15px] leading-[1.8] text-gray-600 sm:text-base">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mb-4 grid gap-2 pl-1">
                    {section.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-3 text-[15px] leading-[1.8] text-gray-600 sm:text-base">
                        <span aria-hidden className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ScrollReveal>
          ))}

          {/* CTA */}
          <ScrollReveal className="mt-14">
            <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-blue-50 p-7 sm:p-9">
              <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{t("blog.ctaTitle")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 sm:text-base">
                {t("blog.ctaSubtitle")}
              </p>
              <button
                onClick={openContact}
                className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,0.35)] transition-transform duration-200 hover:scale-[1.03]"
              >
                {t("blog.ctaButton")}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </article>

      {/* ── More articles ─────────────────────────────────── */}
      {others.length > 0 && (
        <section className="border-t border-gray-100 px-5 py-14 sm:px-8 md:px-10">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <h3
                className="mb-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400"
                style={{ fontFamily: MONO }}
              >
                {t("blog.moreArticles")}
              </h3>
            </ScrollReveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {others.map((other, i) => {
                const o = other[language];
                return (
                  <ScrollReveal key={other.slug} delay={i * 0.08}>
                    <Link
                      href={localizeHref(`/blog/${other.slug}`, language)}
                      className="group block h-full rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_12px_40px_rgba(139,92,246,0.12)]"
                    >
                      <p
                        className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400"
                        style={{ fontFamily: MONO }}
                      >
                        {formatBlogDate(other.date, language)}
                      </p>
                      <h4 className="text-base font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-violet-700">
                        {o.title}
                      </h4>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

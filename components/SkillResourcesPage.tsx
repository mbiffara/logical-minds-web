"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SKILL_RESOURCES, skillDownloadPath, formatSkillDate } from "@/lib/resourcesContent";
import ScrollReveal from "./animations/ScrollReveal";

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

export default function SkillResourcesPage() {
  const { t, language } = useLanguage();

  const howToSteps = (t("resources.howToSteps") as unknown as string[]) || [];

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
              {t("resources.badge")}
            </p>
            <h1 className="max-w-2xl text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
              {t("resources.skillsTitle")}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-500 sm:text-lg">
              {t("resources.skillsSubtitle")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Skill list ────────────────────────────────────── */}
      <section className="px-5 pb-14 sm:px-8 md:px-10">
        <div className="mx-auto grid max-w-4xl gap-5">
          {SKILL_RESOURCES.map((resource, i) => {
            const r = resource[language];
            return (
              <ScrollReveal key={resource.slug} delay={i * 0.08}>
                <div className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-violet-200 hover:shadow-[0_12px_40px_rgba(139,92,246,0.12)] sm:p-8">
                  <div
                    className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400"
                    style={{ fontFamily: MONO }}
                  >
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-600">
                      {t("resources.free")}
                    </span>
                    <span>
                      {t("resources.published")} {formatSkillDate(resource.date, language)}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold leading-snug text-gray-900 sm:text-2xl">{r.title}</h2>
                  <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
                    {r.description}
                  </p>
                  <a
                    href={skillDownloadPath(resource)}
                    download={resource.file}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,0.35)] transition-transform duration-200 hover:scale-[1.03]"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    {t("resources.download")}
                  </a>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── How to use ────────────────────────────────────── */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-24 md:px-10">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-blue-50 p-7 sm:p-9">
              <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{t("resources.howToTitle")}</h3>
              <ol className="mt-4 grid gap-3">
                {howToSteps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[11px] font-bold text-violet-700"
                      style={{ fontFamily: MONO }}
                    >
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

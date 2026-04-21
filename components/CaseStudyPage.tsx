"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useContact } from "@/context/ContactContext";
import { useLanguage } from "@/context/LanguageContext";
import { CASE_STUDY_SLUGS, type ProjectView } from "@/lib/caseStudyRoutes";
import ScrollReveal from "./animations/ScrollReveal";
import {
  SiNextdotjs, SiNodedotjs, SiPostgresql, SiTypescript, SiVercel,
  SiPython, SiOpenai, SiFastapi, SiDocker, SiReact, SiMongodb,
  SiRedis, SiKubernetes, SiWebrtc, SiRubyonrails,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import type { IconType } from "react-icons";

const techIconMap: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  PostgreSQL: SiPostgresql,
  TypeScript: SiTypescript,
  Vercel: SiVercel,
  Python: SiPython,
  "OpenAI API": SiOpenai,
  FastAPI: SiFastapi,
  Docker: SiDocker,
  React: SiReact,
  "React Native": SiReact,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  Kubernetes: SiKubernetes,
  WebRTC: SiWebrtc,
  AWS: FaAws,
  "Ruby on Rails": SiRubyonrails,
  "AWS Amplify": FaAws,
};

/* ── Brand colors per project ───────────────────────────── */
interface BrandColor {
  hex: string;
  rgb: string;
}

const brandColors: Record<ProjectView, BrandColor> = {
  creeadores:  { hex: "#0019DA", rgb: "0,25,218" },
  somosFin:    { hex: "#5938DC", rgb: "89,56,220" },
  tecabot:     { hex: "#3b82f6", rgb: "59,130,246" },
  solidCore:   { hex: "#036cff", rgb: "3,108,255" },
  preply:      { hex: "#ff7aac", rgb: "255,122,172" },
};

/* ── Project index & tag for hero overline ──────────────── */
const projectIndex: Record<ProjectView, number> = {
  creeadores: 1,
  somosFin: 2,
  tecabot: 3,
  solidCore: 4,
  preply: 5,
};

const projectTag: Record<ProjectView, string> = {
  creeadores: "Case Study",
  somosFin: "Case Study",
  tecabot: "Case Study",
  solidCore: "Case Study",
  preply: "Case Study",
};

const projectLogos: Record<ProjectView, string | null> = {
  creeadores: "/assets/logo-creeadores.svg",
  somosFin:   "/assets/logo-somosfin.svg",
  tecabot:    "/assets/logo-tecabot.svg",
  solidCore:  "/assets/logo-solidcore.svg",
  preply:     "/assets/logo-preply.svg",
};

const projectUrls: Record<ProjectView, string> = {
  creeadores: "https://www.creeadores.com/",
  somosFin:   "https://somosfin.com/",
  tecabot:    "",
  solidCore:  "https://solidcore.co/",
  preply:     "https://preply.com/",
};

/* Navigation order (visible case studies) */
const caseStudyOrder: ProjectView[] = ["creeadores", "somosFin", "solidCore", "preply"];

interface ResultMetric {
  value: string;
  label: string;
}

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/* ── Main CaseStudyPage component ────────────────────────── */
export default function CaseStudyPage({ projectKey }: { projectKey: ProjectView }) {
  const { openContact } = useContact();
  const { t } = useLanguage();

  const handleSpotlight = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);

  const c = brandColors[projectKey];

  const projectItems = t("portfolio.items") as Array<{ title: string; category: string }>;
  const idx = projectIndex[projectKey] - 1;
  const projectName = projectItems?.[idx]?.title ?? "";

  const subtitle: string = t(`portfolioDetail.items.${projectKey}.subtitle`);
  const challenge: string = t(`portfolioDetail.items.${projectKey}.challenge`);
  const solution: string = t(`portfolioDetail.items.${projectKey}.solution`);
  const results: ResultMetric[] = t(`portfolioDetail.items.${projectKey}.results`) || [];
  const techStack: string[] = t(`portfolioDetail.items.${projectKey}.techStack`) || [];

  return (
    <div className="min-h-screen" style={{ background: "#ffffff" }}>
      {/* ── Hero section ──────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-5 pb-14 pt-24 sm:px-8 sm:pb-16 sm:pt-28 md:px-10 md:pb-20 md:pt-32"
        style={{ background: c.hex, color: "#fff" }}
      >
        {/* Decorative blob 1 */}
        <div aria-hidden="true" className="absolute -right-20 -top-16 hidden h-72 w-72 rounded-[48px] sm:block sm:h-96 sm:w-96 md:-right-36 md:-top-28 md:h-[520px] md:w-[520px] md:rounded-[72px]" style={{ background: "rgba(0,0,0,0.16)" }} />
        {/* Decorative blob 2 */}
        <div aria-hidden="true" className="absolute right-12 top-20 hidden h-32 w-32 rounded-[36px] sm:block sm:right-24 sm:h-40 sm:w-40 md:right-[180px] md:top-20 md:h-[220px] md:w-[220px] md:rounded-[56px]" style={{ background: "rgba(255,255,255,0.16)" }} />

        <div className="relative mx-auto max-w-6xl">
          {/* Back link */}
          <ScrollReveal>
            <Link
              href="/#portfolio"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
            </Link>
          </ScrollReveal>

          <ScrollReveal>
              <div>
                <p className="mb-4 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] sm:mb-5" style={{ color: "rgba(255,255,255,0.85)" }}>
                  <span className="mr-2.5">0{projectIndex[projectKey]}/05</span>
                  {projectTag[projectKey]}
                </p>

                {projectLogos[projectKey] ? (
                  <img
                    src={projectLogos[projectKey]!}
                    alt={projectName}
                    className="h-8 w-auto sm:h-10 md:h-12"
                    style={{ maxWidth: 280, ...(projectKey !== "tecabot" ? { filter: "brightness(0) invert(1)" } : {}) }}
                  />
                ) : (
                  <h1
                    className="m-0 max-w-[860px] leading-[0.97] tracking-tight"
                    style={{
                      fontFamily: '"Alvar Essential", var(--font-sans), sans-serif',
                      fontSize: "clamp(28px, 4.5vw, 64px)",
                      fontWeight: 900,
                      letterSpacing: "-0.03em",
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    {projectName}
                  </h1>
                )}

                <p className="mt-5 max-w-xl text-[15px] leading-relaxed sm:mt-6 sm:max-w-[640px] sm:text-base md:text-[17px]" style={{ color: "rgba(255,255,255,0.9)" }}>
                  {subtitle}
                </p>

                {/* Visit site button in hero */}
                {projectUrls[projectKey] && (
                  <a
                    href={projectUrls[projectKey]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
                  >
                    {t("portfolioDetail.cta_visitSite")}
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                )}
              </div>
            </ScrollReveal>
        </div>
      </section>

      {/* ── Content below hero ────────────────────────────── */}
      <div className="px-5 pb-20 pt-10 sm:px-8 md:px-10">
        <div className="mx-auto w-full max-w-6xl">

          {/* Challenge & Solution */}
          <ScrollReveal>
            <div className="mt-2 grid gap-4 sm:grid-cols-2">
              {/* Challenge */}
              <div
                onMouseMove={handleSpotlight}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-500 sm:p-5 lg:p-6"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `rgba(${c.rgb}, 0.3)`;
                  e.currentTarget.style.boxShadow = `0 8px 30px rgba(${c.rgb}, 0.08)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(400px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(${c.rgb}, 0.04), transparent 60%)`,
                  }}
                />
                <div
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl transition-all duration-700"
                  style={{ background: `rgba(${c.rgb}, 0.04)` }}
                />
                <div className="relative">
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"
                      style={{
                        borderColor: `rgba(${c.rgb}, 0.25)`,
                        backgroundColor: `rgba(${c.rgb}, 0.07)`,
                        color: c.hex,
                      }}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </span>
                    <h3 className="font-semibold text-gray-900">
                      {t("portfolioDetail.challenge")}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-500">{challenge}</p>
                </div>
              </div>

              {/* Solution */}
              <div
                onMouseMove={handleSpotlight}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-500 sm:p-5 lg:p-6"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `rgba(${c.rgb}, 0.3)`;
                  e.currentTarget.style.boxShadow = `0 8px 30px rgba(${c.rgb}, 0.08)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(400px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(${c.rgb}, 0.04), transparent 60%)`,
                  }}
                />
                <div
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl transition-all duration-700"
                  style={{ background: `rgba(${c.rgb}, 0.04)` }}
                />
                <div className="relative">
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"
                      style={{
                        borderColor: `rgba(${c.rgb}, 0.25)`,
                        backgroundColor: `rgba(${c.rgb}, 0.07)`,
                        color: c.hex,
                      }}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18h6" />
                        <path d="M10 22h4" />
                        <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
                      </svg>
                    </span>
                    <h3 className="font-semibold text-gray-900">
                      {t("portfolioDetail.solution")}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-500">{solution}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Results */}
          <ScrollReveal>
            <div className="mt-12">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border"
                  style={{
                    borderColor: `rgba(${c.rgb}, 0.25)`,
                    backgroundColor: `rgba(${c.rgb}, 0.07)`,
                    color: c.hex,
                  }}
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </span>
                {t("portfolioDetail.results")}
              </h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {Array.isArray(results) && results.map((metric: ResultMetric, i: number) => (
                  <div
                    key={i}
                    onMouseMove={handleSpotlight}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-500 sm:p-5 lg:p-6"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `rgba(${c.rgb}, 0.3)`;
                      e.currentTarget.style.boxShadow = `0 8px 30px rgba(${c.rgb}, 0.08)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(400px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(${c.rgb}, 0.04), transparent 60%)`,
                      }}
                    />
                    <div
                      className="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl transition-all duration-700"
                      style={{ background: `rgba(${c.rgb}, 0.04)` }}
                    />
                    <div className="relative text-center">
                      <span
                        className="text-2xl font-bold sm:text-3xl lg:text-4xl"
                        style={{ color: c.hex }}
                      >
                        {metric.value}
                      </span>
                      <p className="mt-2 text-sm text-gray-500">{metric.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Tech Stack */}
          <ScrollReveal>
            <div className="mt-12">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <span className="h-px w-6" style={{ backgroundColor: `rgba(${c.rgb}, 0.4)` }} />
                {t("portfolioDetail.techStack")}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {Array.isArray(techStack) && techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-300"
                    style={{
                      borderColor: `rgba(${c.rgb}, 0.2)`,
                      backgroundColor: `rgba(${c.rgb}, 0.05)`,
                      color: c.hex,
                    }}
                  >
                    {techIconMap[tech] && (() => { const Icon = techIconMap[tech]; return <Icon className="h-3.5 w-3.5" />; })()}
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>

      {/* ── Bottom: CTA + Next Case Study ────────────────── */}
      {(() => {
        const currentIdx = caseStudyOrder.indexOf(projectKey);
        const nextKey = caseStudyOrder[(currentIdx + 1) % caseStudyOrder.length];
        const nc = brandColors[nextKey];
        const nextItems = t("portfolio.items") as Array<{ title: string }>;
        const nextIdx = projectIndex[nextKey] - 1;
        const nextName = nextItems?.[nextIdx]?.title ?? "";

        return (
          <ScrollReveal>
            <div className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 md:px-10">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* CTA card */}
                <div className="flex flex-col justify-between gap-8 rounded-2xl border border-gray-200 bg-white p-7 sm:p-9">
                  <div>
                    <p
                      className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em]"
                      style={{ color: "#9ca3af", fontFamily: MONO }}
                    >
                      {t("portfolioDetail.cta")}
                    </p>
                    <h3
                      style={{
                        fontFamily: '"Alvar Essential", var(--font-sans), sans-serif',
                        fontSize: "clamp(22px, 3vw, 32px)",
                        fontWeight: 900,
                        letterSpacing: "-0.02em",
                        color: "#1a1a2e",
                        lineHeight: 1.05,
                        textTransform: "uppercase",
                        margin: 0,
                        maxWidth: 320,
                      }}
                    >
                      {t("closingCta.headline")}
                    </h3>
                  </div>
                  <button
                    onClick={() => openContact()}
                    className="group/btn relative inline-flex w-fit cursor-pointer overflow-hidden rounded-full transition-all duration-500 hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                      background: c.hex,
                      boxShadow: `0 6px 24px rgba(${c.rgb}, 0.35)`,
                    }}
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
                    <span className="relative flex items-center gap-2 px-7 py-2.5 text-sm font-semibold text-white sm:px-8 sm:py-3">
                      {t("portfolioDetail.cta")}
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </span>
                  </button>
                </div>

                {/* Next case study card */}
                <Link
                  href={`/case-studies/${CASE_STUDY_SLUGS[nextKey]}`}
                  className="group/next relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 transition-transform duration-300 hover:scale-[1.01] sm:p-9"
                  style={{ background: nc.hex, color: "#fff", minHeight: 220 }}
                >
                  {/* LM isotipo watermark */}
                  <img
                    aria-hidden
                    src="/isotipo-lm.svg"
                    alt=""
                    className="pointer-events-none absolute opacity-[0.10]"
                    style={{ right: 20, top: -20, width: 200, height: 200, filter: "brightness(0) invert(1)" }}
                  />

                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: "rgba(255,255,255,0.75)", fontFamily: MONO }}
                  >
                    {t("portfolioDetail.nextCaseStudy")}
                  </p>

                  <div>
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                      style={{ color: "rgba(255,255,255,0.8)" }}
                    >
                      Case Study
                    </p>
                    {projectLogos[nextKey] ? (
                      <img
                        src={projectLogos[nextKey]!}
                        alt={nextName}
                        className="mt-3 h-7 w-auto sm:h-8"
                        style={{ maxWidth: 200, ...(nextKey !== "tecabot" ? { filter: "brightness(0) invert(1)" } : {}) }}
                      />
                    ) : (
                      <h3
                        className="mt-2"
                        style={{
                          fontFamily: '"Alvar Essential", var(--font-sans), sans-serif',
                          fontSize: "clamp(22px, 3vw, 36px)",
                          fontWeight: 900,
                          letterSpacing: "-0.02em",
                          color: "#fff",
                          lineHeight: 1.05,
                          textTransform: "uppercase",
                          margin: 0,
                          marginTop: 8,
                        }}
                      >
                        {nextName}
                      </h3>
                    )}
                    <div className="mt-3 flex items-center gap-2 text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                      <span>{t("portfolioDetail.cta_readMore")}</span>
                      <svg
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover/next:translate-x-1"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        );
      })()}
    </div>
  );
}

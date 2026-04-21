"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useContact } from "@/context/ContactContext";
import { CASE_STUDY_SLUGS, type ProjectView } from "@/lib/caseStudyRoutes";
import ScrollReveal from "./animations/ScrollReveal";
import {
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiTypescript,
  SiVercel,
  SiPython,
  SiOpenai,
  SiFastapi,
  SiDocker,
  SiReact,
  SiMongodb,
  SiRedis,
  SiKubernetes,
  SiWebrtc,
  SiRubyonrails,
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

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/* All keys matching translations array order */
const allProjectKeys: ProjectView[] = [
  "creeadores",
  "somosFin",
  "tecabot",
  "solidCore",
  "preply",
];

/* Visible projects */
const projectKeys: ProjectView[] = [
  "creeadores",
  "somosFin",
  "solidCore",
  "preply",
];

/* ── Category icon per project ─────────────────────────── */
const projectCategoryIcon: Record<ProjectView, React.ReactNode> = {
  creeadores: (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
    </svg>
  ),
  somosFin: (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" />
    </svg>
  ),
  tecabot: (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
    </svg>
  ),
  solidCore: (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 7v10M18 7v10M2 9v6M22 9v6M6 12h12M2 12h4M18 12h4" />
    </svg>
  ),
  preply: (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z" />
    </svg>
  ),
};

interface ProjectStyle {
  hex: string;
  rgb: string;
}

const projectStyles: Record<ProjectView, ProjectStyle> = {
  creeadores: { hex: "#0019DA", rgb: "0,25,218" },
  somosFin:   { hex: "#5938DC", rgb: "89,56,220" },
  tecabot:    { hex: "#3b82f6", rgb: "59,130,246" },
  solidCore:  { hex: "#036cff", rgb: "3,108,255" },
  preply:     { hex: "#ff7aac", rgb: "255,122,172" },
};

/* ── Project logo SVGs (null = use text title) ──────────── */
const projectLogos: Record<ProjectView, string | null> = {
  creeadores: "/assets/logo-creeadores.svg",
  somosFin:   "/assets/logo-somosfin.svg",
  tecabot:    "/assets/logo-tecabot.svg",
  solidCore:  "/assets/logo-solidcore.svg",
  preply:     "/assets/logo-preply.svg",
};



const projectUrls: Record<ProjectView, string> = {
  creeadores: "https://www.creeadores.com/",
  somosFin: "https://somosfin.com/",
  tecabot: "",
  solidCore: "https://solidcore.co/",
  preply: "https://preply.com/",
};

/* ── Main Portfolio section ─────────────────────────────── */
export default function Portfolio() {
  const { t } = useLanguage();
  const { openContact } = useContact();
  const items = t("portfolio.items") as Array<{
    title: string;
    category: string;
    description: string;
  }>;

  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ScrollReveal>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] backdrop-blur-xl px-3 py-1.5 shadow-[0_0_20px_rgba(124,58,237,0.1)]">
                <svg className="h-3.5 w-3.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                <span className="text-[10px] sm:text-xs text-violet-600 font-medium">{t("portfolio.badge")}</span>
              </div>
              <h2
                className="mt-3"
                style={{
                  fontFamily: '"Alvar Essential", var(--font-sans), sans-serif',
                  fontSize: "clamp(32px, 5vw, 56px)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: "#1a1a2e",
                  maxWidth: 640,
                  lineHeight: 0.94,
                  margin: 0,
                  marginTop: 14,
                  textTransform: "uppercase",
                }}
              >
                {t("portfolio.title")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed sm:text-base" style={{ color: "#6b7280", maxWidth: 680 }}>
                {t("portfolio.subtitle")}
              </p>
            </div>
            <span style={{ fontFamily: MONO, fontSize: 12, color: "#9ca3af" }}>
              0{projectKeys.length} / 0{projectKeys.length} cases
            </span>
          </div>
        </ScrollReveal>

        {/* Case study cards — text left, mockup right */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {Array.isArray(items) &&
            projectKeys.map((key, i) => {
              const item = items[allProjectKeys.indexOf(key)];
              const s = projectStyles[key];
              const results = t(`portfolioDetail.items.${key}.results`) as Array<{ value: string; label: string }> | undefined;
              const techStack = t(`portfolioDetail.items.${key}.techStack`) as string[] | undefined;
              const subtitle: string = t(`portfolioDetail.items.${key}.subtitle`);

              return (
                <ScrollReveal key={key} delay={i * 0.08}>
                  <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
                    <div className="flex flex-col justify-center px-6 py-6 sm:px-7 sm:py-7">
                      {/* Category badge */}
                      <div className="mb-3">
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em]"
                          style={{
                            backgroundColor: `rgba(${s.rgb}, 0.08)`,
                            color: s.hex,
                            border: `1px solid rgba(${s.rgb}, 0.15)`,
                          }}
                        >
                          {projectCategoryIcon[key]}
                          {item.category}
                        </span>
                      </div>

                      {/* Title — logo or text */}
                      {projectLogos[key] ? (
                        <div
                          aria-label={item.title}
                          role="img"
                          className="h-5 w-[140px] max-w-full sm:h-6 sm:w-[160px]"
                          style={{
                            backgroundColor: s.hex,
                            WebkitMaskImage: `url(${projectLogos[key]})`,
                            maskImage: `url(${projectLogos[key]})`,
                            WebkitMaskSize: "contain",
                            maskSize: "contain",
                            WebkitMaskRepeat: "no-repeat",
                            maskRepeat: "no-repeat",
                            WebkitMaskPosition: "left center",
                            maskPosition: "left center",
                          }}
                        />
                      ) : (
                        <h3
                          style={{
                            fontFamily: '"Alvar Essential", var(--font-sans), sans-serif',
                            fontSize: "clamp(20px, 2.5vw, 30px)",
                            fontWeight: 900,
                            letterSpacing: "-0.02em",
                            color: "#1a1a2e",
                            lineHeight: 1,
                            textTransform: "uppercase",
                            margin: 0,
                          }}
                        >
                          {item.title}
                        </h3>
                      )}

                      {/* Subtitle */}
                      <p
                        className="mt-2.5 text-[13px] font-semibold sm:text-sm"
                        style={{ color: "#374151" }}
                      >
                        {subtitle}
                      </p>

                      {/* Description */}
                      <p className="mt-1 text-[12px] leading-relaxed sm:text-[13px]" style={{ color: "#9ca3af" }}>
                        {item.description}
                      </p>

                      {/* Divider */}
                      <div className="my-4 h-px w-full bg-gray-100" />

                      {/* Results */}
                      {Array.isArray(results) && results.length > 0 && (
                        <div className="mb-4">
                          <p
                            className="mb-2 text-[9px] font-semibold uppercase tracking-[0.14em]"
                            style={{ color: "#9ca3af", fontFamily: MONO }}
                          >
                            {t("portfolioDetail.results")}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {results.map((r, ri) => (
                              <span
                                key={ri}
                                className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-600"
                              >
                                <span className="font-bold" style={{ color: s.hex }}>{r.value}</span>
                                {r.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack */}
                      {Array.isArray(techStack) && techStack.length > 0 && (
                        <div>
                          <p
                            className="mb-2 text-[9px] font-semibold uppercase tracking-[0.14em]"
                            style={{ color: "#9ca3af", fontFamily: MONO }}
                          >
                            {t("portfolioDetail.techStack")}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {techStack.map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-500"
                              >
                                {techIconMap[tech] && <span className="text-gray-400">{(() => { const Icon = techIconMap[tech]; return <Icon className="h-2.5 w-2.5" />; })()}</span>}
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CTAs */}
                      <div className="mt-5 flex items-center gap-3">
                        <Link
                          href={`/case-studies/${CASE_STUDY_SLUGS[key]}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-1.5 text-[11px] font-semibold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
                        >
                          {t("portfolioDetail.cta_readMore")}
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>
                        {projectUrls[key] && (
                          <a
                            href={projectUrls[key]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-semibold transition-all duration-200 hover:opacity-80"
                            style={{ backgroundColor: `rgba(${s.rgb}, 0.08)`, color: s.hex, border: `1px solid rgba(${s.rgb}, 0.25)` }}
                          >
                            {t("portfolioDetail.cta_visitSite")}
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.5}>
          <div className="mt-14 flex justify-center">
            <button
              onClick={openContact}
              className="group/btn relative inline-flex cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-violet-500 transition-all duration-500 hover:from-violet-700 hover:to-violet-600 hover:shadow-[0_6px_24px_rgba(124,58,237,0.35)] hover:scale-[1.01] active:scale-[0.99]"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
              <span className="relative flex items-center gap-2 px-8 py-2.5 font-semibold text-white lg:px-10 lg:py-3">
                {t("portfolio.cta")}
                <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </span>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

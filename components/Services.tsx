"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

import { SERVICE_SLUGS, type ServiceView } from "@/lib/serviceRoutes";
import ScrollReveal from "./animations/ScrollReveal";

/* ── Service groups with /new-style colors ──────────────── */
interface ServiceGroup {
  key: ServiceView;
  tag: string;
  color: string;
  fg: string;
}

const groups: ServiceGroup[] = [
  { key: "logicalExperiences", tag: "LM Experiences", color: "#227CFF", fg: "#fff" },
  { key: "logicalDevelopment", tag: "LM Development", color: "#8b5cf6", fg: "#fff" },
  { key: "logicalCloud",      tag: "LM Cloud",       color: "#F50132", fg: "#fff" },
  { key: "logicalTalents",    tag: "LM Talents",     color: "#22AE48", fg: "#fff" },
];

export default function Services() {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section header — /new style */}
        <ScrollReveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] backdrop-blur-xl px-3 py-1.5 shadow-[0_0_20px_rgba(124,58,237,0.1)]">
                <svg className="h-3.5 w-3.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                <span className="text-[10px] sm:text-xs text-violet-600 font-medium">{t("services.badge")}</span>
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
                {t("services.title")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed sm:text-base" style={{ color: "#6b7280", maxWidth: 680 }}>
                {t("services.subtitle")}
              </p>
            </div>
            <span
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: 12,
                color: "#9ca3af",
              }}
            >
              0{groups.length} / 0{groups.length} practices
            </span>
          </div>
        </ScrollReveal>

        {/* Cards grid — 2 columns */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {groups.map((group, i) => (
            <ScrollReveal key={group.key} delay={0.1 + i * 0.08}>
              <ServiceCard
                group={group}
                index={i}
                t={t}
                onNavigate={(key) => router.push(`/services/${SERVICE_SLUGS[key]}`)}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.6}>
          <div className="mt-14 flex justify-center">
            <a
              href="https://calendly.com/logicalminds"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-violet-500 transition-all duration-500 hover:from-violet-700 hover:to-violet-600 hover:shadow-[0_6px_24px_rgba(124,58,237,0.35)] hover:scale-[1.01] active:scale-[0.99]"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
              <span className="relative flex items-center gap-2 px-8 py-2.5 font-semibold text-white lg:px-10 lg:py-3">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                {t("services.cta")}
              </span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── Service brand SVGs ──────────────────────────────────── */
const serviceSvg: Record<ServiceView, string> = {
  logicalExperiences: "/assets/service-experiences.svg",
  logicalDevelopment: "/assets/service-development.svg",
  logicalCloud: "/assets/service-cloud.svg",
  logicalTalents: "/assets/service-talents.svg",
  logicalMvp: "/assets/service-development.svg",
};

/* ── Service Card — /new CaseCard style (colored bg) ──── */
interface ServiceCardProps {
  group: ServiceGroup;
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string) => any;
  onNavigate: (view: ServiceView) => void;
}

function ServiceCard({ group, index, t, onNavigate }: ServiceCardProps) {
  const [hover, setHover] = useState(false);
  const tags: string[] = t(`services.groups.${group.key}.tags`) || [];

  return (
    <div
      onClick={() => onNavigate(group.key)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="cursor-pointer"
      style={{
        background: group.color,
        color: group.fg,
        borderRadius: 28,
        padding: 32,
        minHeight: 340,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        transition: "transform 240ms ease-out",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        willChange: "transform",
      }}
    >
      {/* Brand SVG */}
      <img
        aria-hidden
        src={serviceSvg[group.key]}
        alt=""
        style={{
          position: "absolute",
          right: 24,
          bottom: 24,
          width: 120,
          height: 120,
          opacity: 0.15,
          transform: hover ? "translate(-6px, -6px) scale(1.05)" : "translate(0,0) scale(1)",
          transition: "transform 360ms ease-out, opacity 360ms ease-out",
          pointerEvents: "none",
        }}
      />

      {/* Top: icon + tag + number */}
      <div
        style={{
          fontFamily: "ui-monospace, monospace",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          opacity: 0.85,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <img
            aria-hidden
            src={serviceSvg[group.key]}
            alt=""
            style={{ width: 22, height: 22, opacity: 0.9 }}
          />
          {group.tag}
        </span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: "clamp(24px, 2.3vw, 32px)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginTop: 20,
          marginBottom: "auto",
          maxWidth: 440,
          textWrap: "balance",
        }}
      >
        <span style={{ fontWeight: 300, opacity: 0.6 }}>{t(`services.groups.${group.key}.prefix`)}</span>{t(`services.groups.${group.key}.title`)}
      </div>

      {/* Bottom: tags + arrow */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: 40,
          gap: 16,
        }}
      >
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {Array.isArray(tags) &&
            tags.map((tag: string) => (
              <span
                key={tag}
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.2)",
                  color: group.fg,
                  backdropFilter: "blur(4px)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <TagIcon tag={tag} />
                {tag}
              </span>
            ))}
        </div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            transform: hover ? "translateX(4px)" : "translateX(0)",
            transition: "transform 220ms ease-out",
          }}
        >
          →
        </div>
      </div>
    </div>
  );
}

/* ── Tag icons ──────────────────────────────────────────── */
const iconPaths: Record<string, string> = {
  // EN
  "Product Discovery": "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  "UX/UI Design": "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
  "Software Development": "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
  "Quality Assurance": "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  "Cloud & Infrastructure": "M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z",
  "AI Integration": "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z",
  "Staff Augmentation": "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  "Recruitment": "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  "AI Agents": "M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z",
  // ES (same paths as EN, different labels)
  "Descubrimiento de Producto": "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  "Diseño UX/UI": "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
  "Desarrollo de Software": "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
  "Aseguramiento de Calidad": "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  "Cloud e Infraestructura": "M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z",
  "Integración de IA": "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z",
  "Reclutamiento": "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  "Agentes de IA": "M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z",
};

// Fallback icon (generic dot)
const fallbackPath = "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z";

function TagIcon({ tag }: { tag: string }) {
  const d = iconPaths[tag] || fallbackPath;
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

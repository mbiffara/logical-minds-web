"use client";

import { useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useServiceDetail, type ServiceView } from "@/context/ServiceDetailContext";
import { useContact } from "@/context/ContactContext";
import ScrollReveal from "./animations/ScrollReveal";

/* ── Brand colors per group ───────────────────────────────── */
interface BrandColor {
  hex: string;
  rgb: string;
}

const brandColors: Record<ServiceView, BrandColor> = {
  logicalExperiences: { hex: "#227CFF", rgb: "34,124,255" },
  logicalDevelopment: { hex: "#FDA901", rgb: "253,169,1" },
  logicalCloud:       { hex: "#F50132", rgb: "245,1,50" },
  logicalTalents:     { hex: "#22AE48", rgb: "34,174,72" },
};

/* ── Group definitions ─────────────────────────────────────── */
interface ServiceGroup {
  key: ServiceView;
  number: string;
  icon: React.ReactNode;
}

const groups: ServiceGroup[] = [
  {
    key: "logicalExperiences",
    number: "01",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    key: "logicalDevelopment",
    number: "02",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    key: "logicalCloud",
    number: "03",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
  {
    key: "logicalTalents",
    number: "04",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

/* ══════════════════════════════════════════════════════════════
   Main Services Component
   ══════════════════════════════════════════════════════════════ */
export default function Services() {
  const { t } = useLanguage();
  const { openServiceDetail } = useServiceDetail();
  const { openContact } = useContact();

  const handleSpotlight = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    },
    []
  );

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-4 py-1.5 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
              <span className="text-xs font-medium text-violet-600">{t("services.badge")}</span>
            </div>
          </div>
          <h2 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl">
            {t("services.title")}
          </h2>
          <p className="mt-4 text-gray-500">{t("services.subtitle")}</p>
        </ScrollReveal>

        {/* Service cards */}
        <div className="mt-16 flex flex-col gap-4 sm:gap-5">
          {groups.map((group, i) => (
            <ScrollReveal key={group.key} delay={0.15 + i * 0.12}>
              <ServiceCard
                group={group}
                color={brandColors[group.key]}
                t={t}
                handleSpotlight={handleSpotlight}
                openServiceDetail={openServiceDetail}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.6}>
          <div className="mt-14 flex justify-center">
            <button
              onClick={openContact}
              className="group/btn relative inline-flex cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-violet-500 transition-all duration-500 hover:from-violet-700 hover:to-violet-600 hover:shadow-[0_6px_24px_rgba(124,58,237,0.35)] hover:scale-[1.01] active:scale-[0.99]"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
              <span className="relative flex items-center gap-2 px-8 py-2.5 font-semibold text-white lg:px-10 lg:py-3">
                {t("services.cta")}
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

/* ══════════════════════════════════════════════════════════════
   Service Card — clickable, opens overlay
   ══════════════════════════════════════════════════════════════ */
interface ServiceCardProps {
  group: ServiceGroup;
  color: BrandColor;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string) => any;
  handleSpotlight: (e: React.MouseEvent<HTMLDivElement>) => void;
  openServiceDetail: (view: ServiceView) => void;
}

function ServiceCard({ group, color, t, handleSpotlight, openServiceDetail }: ServiceCardProps) {
  const tags: string[] = t(`services.groups.${group.key}.tags`) || [];

  return (
    <div
      onClick={() => openServiceDetail(group.key)}
      onMouseMove={handleSpotlight}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white transition-all duration-500 hover:shadow-lg"
      style={{
        border: `1px solid rgba(${color.rgb}, 0.2)`,
        boxShadow: `0 1px 3px rgba(${color.rgb}, 0.04)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = `1px solid rgba(${color.rgb}, 0.4)`;
        e.currentTarget.style.boxShadow = `0 8px 32px rgba(${color.rgb}, 0.1)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = `1px solid rgba(${color.rgb}, 0.2)`;
        e.currentTarget.style.boxShadow = `0 1px 3px rgba(${color.rgb}, 0.04)`;
      }}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(${color.rgb}, 0.05), transparent 60%)`,
        }}
      />

      {/* Corner glow */}
      <div
        className="absolute -right-12 -top-12 h-36 w-36 rounded-full blur-3xl transition-opacity duration-700 opacity-0 group-hover:opacity-100"
        style={{ background: `rgba(${color.rgb}, 0.08)` }}
      />

      {/* Left accent line */}
      <div
        className="absolute left-0 top-0 h-full w-[2px]"
        style={{
          background: `linear-gradient(to bottom, ${color.hex}, rgba(${color.rgb}, 0.2), transparent)`,
        }}
      />

      {/* Watermark number */}
      <span
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none font-bold leading-none text-[4.5rem] sm:text-[5.5rem] lg:text-[6rem]"
        style={{ color: `rgba(${color.rgb}, 0.05)` }}
      >
        {group.number}
      </span>

      {/* Content */}
      <div className="relative flex flex-col gap-3 p-5 sm:p-6 lg:p-8 md:flex-row md:items-center md:gap-6">
        {/* Icon badge */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-500"
          style={{
            border: `1px solid rgba(${color.rgb}, 0.2)`,
            backgroundColor: `rgba(${color.rgb}, 0.06)`,
            color: color.hex,
          }}
        >
          {group.icon}
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-medium sm:text-base">
              <span className="text-gray-300">{t(`services.groups.${group.key}.prefix`)}</span>
              <span className="text-gray-700">
                {t(`services.groups.${group.key}.title`)}
              </span>
            </h3>
          </div>

          <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-gray-400 sm:text-sm">
            {t(`services.groups.${group.key}.subtitle`)}
          </p>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {Array.isArray(tags) && tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-0.5 text-[10px] font-medium sm:text-[11px]"
                style={{
                  border: `1px solid rgba(${color.rgb}, 0.15)`,
                  backgroundColor: `rgba(${color.rgb}, 0.05)`,
                  color: `rgba(${color.rgb}, 0.8)`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div
          className="hidden shrink-0 md:flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-0.5"
          style={{
            backgroundColor: `rgba(${color.rgb}, 0.06)`,
            color: color.hex,
          }}
        >
          <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

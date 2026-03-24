"use client";

import { useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAgentDetail, type AgentView } from "@/context/AgentDetailContext";
import { useContact } from "@/context/ContactContext";
import BlurText from "./animations/BlurText";
import ScrollReveal from "./animations/ScrollReveal";

const agents = [
  {
    key: "specializedAgents",
    number: "01",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
  {
    key: "orchestration",
    number: "02",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    key: "ecosystem",
    number: "03",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
];

export default function HowWeWork() {
  const { t } = useLanguage();
  const { openAgentDetail } = useAgentDetail();
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
    <section id="how-we-work" className="relative overflow-hidden py-24 sm:py-32">
      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-purple-500/[0.03] blur-[100px]" />
      </div>

      {/* Lightweight radial accents (pure CSS, zero JS) */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.035] blur-[150px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-purple-500/[0.025] blur-[100px]" />

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ── Badge ── */}
        <ScrollReveal>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-4 py-2 shadow-[0_0_20px_rgba(124,58,237,0.1)] backdrop-blur-xl">
              <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
              <span className="text-sm font-medium text-violet-400">
                {t("howWeWork.badge")}
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Heading ── */}
        <ScrollReveal delay={0.1}>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {t("howWeWork.title")}
          </h2>
        </ScrollReveal>

        <BlurText
          text={t("howWeWork.subtitle")}
          className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-gray-400 sm:text-lg"
          delay={0.25}
        />

        {/* ── Stacked horizontal cards ── */}
        <div className="mt-16 flex flex-col gap-4 sm:gap-5 lg:gap-6">
          {agents.map((agent, i) => (
            <ScrollReveal key={agent.key} delay={0.2 + i * 0.15}>
              <div
                onMouseMove={handleSpotlight}
                onClick={() => openAgentDetail(agent.key as AgentView)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_60px_rgba(124,58,237,0.12)]"
              >
                {/* Spotlight radial — follows mouse */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(600px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(124,58,237,0.06), transparent 60%)",
                  }}
                />

                {/* Corner glow */}
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-violet-500/[0.03] blur-3xl transition-all duration-700 group-hover:bg-violet-500/[0.1]" />

                {/* Left accent line */}
                <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-violet-500/60 via-purple-500/30 to-transparent" />

                {/* Watermark number */}
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none text-[5rem] font-bold leading-none text-white/[0.02] transition-colors duration-700 group-hover:text-white/[0.05] sm:text-[6rem] md:text-[6.5rem] lg:text-[7rem]">
                  {agent.number}
                </span>

                {/* ── Content layout ── */}
                <div className="relative flex flex-col gap-4 p-4 sm:p-6 lg:p-8 md:flex-row md:items-start md:gap-6">
                  {/* Left: Number + Icon */}
                  <div className="flex items-center gap-3 md:flex-col md:items-center md:gap-2 md:pt-0.5">
                    <span className="bg-gradient-to-b from-violet-400 to-violet-400/20 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                      {agent.number}
                    </span>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-violet-500/15 bg-violet-500/[0.07] text-violet-400 shadow-[0_0_15px_rgba(124,58,237,0.08)] transition-all duration-500 group-hover:border-violet-500/30 group-hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]">
                      {agent.icon}
                    </div>
                  </div>

                  {/* Center: Title + Description */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-base font-semibold text-white sm:text-lg lg:text-xl">
                        {t(`howWeWork.items.${agent.key}.title`)}
                      </h3>
                      {/* Status dot */}
                      <span className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-2 py-0.5">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        <span className="text-[9px] font-medium uppercase tracking-wider text-emerald-400">
                          {t("howWeWork.status")}
                        </span>
                      </span>
                    </div>

                    <p className="mt-2 mb-6 max-w-2xl text-xs leading-relaxed text-gray-400 sm:mb-0 sm:text-sm">
                      {t(`howWeWork.items.${agent.key}.description`)}
                    </p>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(t(`howWeWork.items.${agent.key}.tags`) as string[]).map(
                        (tag: string) => (
                          <span
                            key={tag}
                            className="rounded-full border border-violet-500/15 bg-violet-500/[0.05] px-2.5 py-0.5 text-[11px] text-violet-400/80"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Explore hint */}
                <span className="absolute bottom-3 right-4 flex items-center gap-1.5 text-xs font-medium text-violet-400/70 transition-all duration-300 group-hover:text-violet-400 sm:bottom-4 sm:right-6 sm:text-sm">
                  {t("howWeWork.explore")}
                  <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ── Callout Banner ── */}
        <ScrollReveal delay={0.6}>
          <div className="relative mt-12 overflow-hidden rounded-2xl">
            {/* Animated shimmer border */}
            <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_var(--shimmer-angle,0deg),transparent_40%,rgba(124,58,237,0.4)_50%,transparent_60%)] p-px animate-[shimmer-rotate_4s_linear_infinite]">
              <div className="h-full w-full rounded-[15px] bg-[#0a0a0f]" />
            </div>

            {/* Inner glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/[0.04] via-transparent to-purple-500/[0.04]" />

            <div className="relative flex items-start gap-4 p-6 sm:gap-5 sm:p-8 lg:items-center lg:p-10">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 text-violet-400 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
                {/* AI Agent / Robot icon */}
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h13.5A2.25 2.25 0 0 1 21 10.5v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 16.5v-6a2.25 2.25 0 0 1 2.25-2.25Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM15 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 16.5h6" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21v-2.25M16.5 21v-2.25" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M1.5 13.5h1.5M21 13.5h1.5" />
                </svg>
              </div>

              <p className="text-sm leading-relaxed text-gray-300 sm:text-base lg:text-lg">
                {t("howWeWork.callout")}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── CTA ── */}
        <ScrollReveal delay={0.75}>
          <div className="mt-10 flex justify-center">
            <button
              onClick={openContact}
              className="group/btn relative cursor-pointer overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.05] backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.08] hover:shadow-[0_8px_40px_rgba(124,58,237,0.12)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
              <span className="relative flex items-center gap-2 px-6 py-2.5 font-semibold text-white">
                {t("howWeWork.cta")}
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

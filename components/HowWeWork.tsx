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
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
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
    <section id="howWeWork" className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Subtle ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-purple-500/[0.02] blur-[100px]" />
      </div>

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/30 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <ScrollReveal>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 shadow-[0_0_20px_rgba(124,58,237,0.06)]">
              <svg className="h-4 w-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
              <span className="text-sm font-medium text-violet-600">
                {t("howWeWork.badge")}
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal delay={0.1}>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
            {t("howWeWork.title")}{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              {t("howWeWork.highlight")}
            </span>
          </h2>
        </ScrollReveal>

        <BlurText
          text={t("howWeWork.subtitle")}
          className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-gray-500 sm:text-lg"
          delay={0.25}
        />

        {/* Stacked horizontal cards */}
        <div className="mt-16 flex flex-col gap-4 sm:gap-5 lg:gap-6">
          {agents.map((agent, i) => (
            <ScrollReveal key={agent.key} delay={0.2 + i * 0.15}>
              <div
                onMouseMove={handleSpotlight}
                onClick={() => openAgentDetail(agent.key as AgentView)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/[0.08]"
              >
                {/* Spotlight radial — follows mouse */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(600px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(139,92,246,0.06), transparent 60%)",
                  }}
                />

                {/* Corner glow */}
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-violet-500/[0.02] blur-3xl transition-all duration-700 group-hover:bg-violet-500/[0.06]" />

                {/* Left accent line */}
                <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-violet-500/50 via-purple-400/20 to-transparent" />

                {/* Watermark number */}
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none text-[5rem] font-bold leading-none text-gray-100 transition-colors duration-700 group-hover:text-violet-100 sm:text-[6rem] md:text-[6.5rem] lg:text-[7rem]">
                  {agent.number}
                </span>

                {/* Content layout */}
                <div className="relative flex flex-col gap-4 p-4 sm:p-6 lg:p-8 md:flex-row md:items-start md:gap-6">
                  {/* Left: Number + Icon */}
                  <div className="flex items-center gap-3 md:flex-col md:items-center md:gap-2 md:pt-0.5">
                    <span className="bg-gradient-to-b from-violet-500 to-violet-400/30 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                      {agent.number}
                    </span>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-violet-200 bg-violet-50 text-violet-600 shadow-[0_0_15px_rgba(124,58,237,0.06)] transition-all duration-500 group-hover:border-violet-300 group-hover:shadow-[0_0_30px_rgba(124,58,237,0.12)]">
                      {agent.icon}
                    </div>
                  </div>

                  {/* Center: Title + Description */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl">
                        {t(`howWeWork.items.${agent.key}.title`)}
                      </h3>
                      {/* Status dot */}
                      <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        <span className="text-[9px] font-medium uppercase tracking-wider text-emerald-600">
                          {t("howWeWork.status")}
                        </span>
                      </span>
                    </div>

                    <p className="mt-2 mb-6 max-w-2xl text-xs leading-relaxed text-gray-500 sm:mb-0 sm:text-sm">
                      {t(`howWeWork.items.${agent.key}.description`)}
                    </p>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(t(`howWeWork.items.${agent.key}.tags`) as string[]).map(
                        (tag: string) => (
                          <span
                            key={tag}
                            className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-[11px] font-medium text-violet-600"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Explore hint */}
                <span className="absolute bottom-3 right-4 flex items-center gap-1.5 text-xs font-medium text-violet-400 transition-all duration-300 group-hover:text-violet-600 sm:bottom-4 sm:right-6 sm:text-sm">
                  {t("howWeWork.explore")}
                  <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Callout Banner */}
        <ScrollReveal delay={0.6}>
          <div className="group/callout relative mt-12 cursor-pointer overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50/80 to-purple-50/60 shadow-sm transition-all duration-500 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/[0.08]">
            <div className="relative flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:gap-8 lg:p-10">
              {/* Interactive robot icon */}
              <div className="flex shrink-0 items-center gap-4 lg:flex-col lg:gap-3">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-100 to-purple-100 text-violet-600 shadow-[0_0_30px_rgba(124,58,237,0.1)] transition-all duration-500 group-hover/callout:scale-110 group-hover/callout:shadow-[0_0_40px_rgba(124,58,237,0.2)]">
                  {/* Pulse ring */}
                  <span className="absolute inset-0 animate-ping rounded-2xl bg-violet-400/10" style={{ animationDuration: "3s" }} />
                  {/* Robot */}
                  <svg className="relative h-8 w-8 transition-transform duration-500 group-hover/callout:rotate-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h13.5A2.25 2.25 0 0 1 21 10.5v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 16.5v-6a2.25 2.25 0 0 1 2.25-2.25Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM15 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 16.5h6" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21v-2.25M16.5 21v-2.25" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M1.5 13.5h1.5M21 13.5h1.5" />
                  </svg>
                </div>
                {/* Live status indicator */}
                <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-medium text-emerald-600">{t("howWeWork.calloutStatus")}</span>
                </div>
              </div>

              {/* Text content */}
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl">
                  {t("howWeWork.calloutTitle")}
                </h4>
                <p className="text-sm leading-relaxed text-gray-500 sm:text-base">
                  {t("howWeWork.callout")}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.75}>
          <div className="mt-10 flex justify-center">
            <button
              onClick={openContact}
              className="group/btn relative inline-flex cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-violet-500 transition-all duration-500 hover:from-violet-700 hover:to-violet-600 hover:shadow-[0_6px_24px_rgba(124,58,237,0.35)] hover:scale-[1.01] active:scale-[0.99]"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
              <span className="relative flex items-center gap-2 px-8 py-2.5 font-semibold text-white lg:px-10 lg:py-3">
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

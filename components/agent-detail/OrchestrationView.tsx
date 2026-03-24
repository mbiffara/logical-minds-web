"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

const categoryKeys = [
  "communication",
  "development",
  "projectManagement",
  "design",
  "cicd",
  "data",
] as const;

const categoryIcons: Record<string, React.ReactNode> = {
  communication: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  ),
  development: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  projectManagement: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  ),
  design: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  cicd: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.015 4.356v4.992" />
    </svg>
  ),
  data: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
};

export default function OrchestrationView() {
  const { t } = useLanguage();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-integration-card]");
    gsap.fromTo(
      Array.from(cards),
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: "power3.out" }
    );
  }, []);

  const handleSpotlight = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div>
      {/* Title */}
      <h3 className="bg-gradient-to-r from-white via-violet-200 to-purple-400 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
        {t("agentDetail.orchestration.title")}
      </h3>
      <p className="mt-2 text-sm text-gray-400">{t("agentDetail.orchestration.subtitle")}</p>

      {/* Central hub */}
      <div className="mx-auto mt-10 flex justify-center">
        <div className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
          {/* Pulsing rings */}
          <div className="absolute inset-0 animate-ping rounded-full border border-violet-500/20" style={{ animationDuration: "3s" }} />
          <div className="absolute inset-2 animate-ping rounded-full border border-violet-500/15" style={{ animationDuration: "3s", animationDelay: "0.5s" }} />
          <div className="flex h-full w-full items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 shadow-[0_0_40px_rgba(124,58,237,0.2)]">
            <div className="text-center">
              <svg className="mx-auto h-6 w-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider text-violet-300">
                {t("agentDetail.orchestration.hubLabel")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Integration grid */}
      <div ref={gridRef} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categoryKeys.map((catKey) => {
          const label: string = t(`agentDetail.orchestration.categories.${catKey}.label`);
          const tools: string[] = t(`agentDetail.orchestration.categories.${catKey}.tools`) || [];

          return (
            <div
              key={catKey}
              data-integration-card
              onMouseMove={handleSpotlight}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.06]"
            >
              {/* Spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(350px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(124,58,237,0.06), transparent 60%)",
                }}
              />

              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-500/[0.03] blur-3xl transition-all duration-700 group-hover:bg-violet-500/[0.08]" />

              <div className="relative">
                {/* Category header */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/[0.07] text-violet-400 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]">
                    {categoryIcons[catKey]}
                  </div>
                  <h4 className="font-semibold text-white">{label}</h4>
                </div>

                {/* Tools */}
                <div className="mt-4 flex flex-col gap-2">
                  {Array.isArray(tools) &&
                    tools.map((tool: string) => (
                      <div
                        key={tool}
                        className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3.5 py-2.5 transition-all duration-300 hover:border-violet-500/20 hover:bg-white/[0.04]"
                      >
                        <span className="flex h-2 w-2 items-center justify-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-violet-400/60" />
                        </span>
                        <span className="text-sm text-gray-300">{tool}</span>
                        {/* Connection indicator */}
                        <span className="ml-auto flex items-center gap-1">
                          <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                          <span className="text-[9px] uppercase tracking-wider text-emerald-400/70">Connected</span>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Callout */}
      <div className="relative mt-8 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_var(--shimmer-angle,0deg),transparent_40%,rgba(124,58,237,0.35)_50%,transparent_60%)] p-px animate-[shimmer-rotate_4s_linear_infinite]">
          <div className="h-full w-full rounded-[15px] bg-[#0a0a0f]" />
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/[0.04] via-transparent to-purple-500/[0.04]" />
        <div className="relative px-6 py-5">
          <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
            {t("agentDetail.orchestration.callout")}
          </p>
        </div>
      </div>
    </div>
  );
}

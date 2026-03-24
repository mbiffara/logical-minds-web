"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

const serviceKeys = [
  "productDiscovery",
  "productDesign",
  "softwareDev",
  "qualityAssurance",
  "cloudInfra",
  "aiIntegration",
] as const;

const serviceIcons: Record<string, React.ReactNode> = {
  productDiscovery: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
  productDesign: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  softwareDev: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  qualityAssurance: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  cloudInfra: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  ),
  aiIntegration: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    </svg>
  ),
};

interface Agent {
  name: string;
  role: string;
  description: string;
  skills: string[];
}

export default function SpecializedAgentsView() {
  const { t } = useLanguage();
  const [activeService, setActiveService] = useState<typeof serviceKeys[number]>(serviceKeys[0]);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const handleSpotlight = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);

  const switchService = useCallback(
    (key: typeof serviceKeys[number]) => {
      if (key === activeService) return;

      const cards = cardsRef.current?.children;
      if (!cards) {
        setActiveService(key);
        return;
      }

      gsap.to(Array.from(cards), {
        opacity: 0,
        y: -15,
        filter: "blur(6px)",
        duration: 0.2,
        stagger: 0.04,
        ease: "power2.in",
        onComplete: () => {
          setActiveService(key);
        },
      });
    },
    [activeService]
  );

  useEffect(() => {
    const cards = cardsRef.current?.children;
    if (!cards) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.fromTo(
        Array.from(cards),
        { opacity: 0, y: 20, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.35, stagger: 0.08, ease: "power3.out" }
      );
      return;
    }

    gsap.fromTo(
      Array.from(cards),
      { opacity: 0, y: 20, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.35, stagger: 0.08, ease: "power3.out" }
    );
  }, [activeService]);

  const agents: Agent[] = t(`agentDetail.specializedAgents.services.${activeService}.agents`) || [];

  return (
    <div>
      {/* Title */}
      <h3 className="bg-gradient-to-r from-white via-violet-200 to-purple-400 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
        {t("agentDetail.specializedAgents.title")}
      </h3>
      <p className="mt-2 text-sm text-gray-400">{t("agentDetail.specializedAgents.subtitle")}</p>

      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Service tabs */}
        <div className="lg:w-[30%]">
          {/* Mobile: horizontal scroll */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-2 lg:overflow-x-visible lg:pb-0">
            {serviceKeys.map((key) => {
              const isActive = key === activeService;
              return (
                <button
                  key={key}
                  onClick={() => switchService(key)}
                  className={`group/tab flex shrink-0 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-300 lg:w-full ${
                    isActive
                      ? "border-violet-500/40 bg-violet-500/10 text-white shadow-[0_0_20px_rgba(124,58,237,0.1)]"
                      : "border-white/[0.06] bg-white/[0.02] text-gray-400 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {/* Active indicator */}
                  <div className="hidden lg:block">
                    <div className={`h-8 w-0.5 rounded-full transition-all duration-300 ${isActive ? "bg-violet-500" : "bg-white/[0.08]"}`} />
                  </div>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                    isActive ? "bg-violet-500/20 text-violet-400" : "bg-white/[0.04] text-gray-500 group-hover/tab:text-gray-300"
                  }`}>
                    {serviceIcons[key]}
                  </div>
                  <span className="whitespace-nowrap font-medium">
                    {t(`agentDetail.specializedAgents.services.${key}.title`)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Agent cards */}
        <div ref={cardsRef} className="flex flex-1 flex-col gap-4 lg:gap-4">
          {Array.isArray(agents) &&
            agents.map((agent: Agent, i: number) => (
              <div
                key={`${activeService}-${i}`}
                onMouseMove={handleSpotlight}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.06]"
              >
                {/* Spotlight */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(400px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(124,58,237,0.06), transparent 60%)",
                  }}
                />

                {/* Corner glow */}
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-violet-500/[0.03] blur-3xl transition-all duration-700 group-hover:bg-violet-500/[0.08]" />

                <div className="relative">
                  <div className="flex items-start gap-4">
                    {/* Agent icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/[0.07] text-violet-400 shadow-[0_0_15px_rgba(124,58,237,0.08)] transition-all duration-500 group-hover:border-violet-500/30 group-hover:shadow-[0_0_25px_rgba(124,58,237,0.18)]">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0ZM15 9.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0ZM9.75 13.5h4.5" />
                      </svg>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-white">{agent.name}</h4>
                        <span className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-2 py-0.5">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                          <span className="text-[9px] font-medium uppercase tracking-wider text-emerald-400">Active</span>
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-violet-400">{agent.role}</p>
                      <p className="mt-2 text-sm leading-relaxed text-gray-400">{agent.description}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {agent.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="rounded-full border border-violet-500/15 bg-violet-500/[0.05] px-2.5 py-0.5 text-[11px] text-violet-400/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

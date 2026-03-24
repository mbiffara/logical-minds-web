"use client";

import { useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import type { CapabilityData } from "@/lib/dashboard-data";
import AnimatedCounter from "./AnimatedCounter";

const capabilityIcons: Record<string, React.ReactNode> = {
  deployments: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
  analytics: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  sprint: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  monitoring: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
  codeReview: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  tasks: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
};

interface EcosystemQuickActionsProps {
  capabilities: CapabilityData[];
}

export default function EcosystemQuickActions({ capabilities }: EcosystemQuickActionsProps) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleSpotlight = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);

  const toggleExpand = useCallback((key: string) => {
    if (expanded === key) {
      // Collapse
      const el = contentRefs.current[key];
      if (el) {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => setExpanded(null),
        });
      } else {
        setExpanded(null);
      }
    } else {
      // Collapse previous
      if (expanded) {
        const prevEl = contentRefs.current[expanded];
        if (prevEl) {
          gsap.to(prevEl, { height: 0, opacity: 0, duration: 0.2, ease: "power2.in" });
        }
      }
      setExpanded(key);
    }
  }, [expanded]);

  // Animate expand
  const handleExpandRef = useCallback((key: string, el: HTMLDivElement | null) => {
    contentRefs.current[key] = el;
    if (el && expanded === key) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" }
      );
      // Stagger metrics
      const metrics = el.querySelectorAll("[data-metric]");
      gsap.fromTo(
        Array.from(metrics),
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.06, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [expanded]);

  return (
    <div>
      <h2 className="bg-gradient-to-r from-white via-violet-200 to-purple-400 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
        {t("dashboard.ecosystem.title")}
      </h2>
      <p className="mt-2 text-sm text-gray-400">{t("dashboard.ecosystem.subtitle")}</p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cap) => {
          const isExpanded = expanded === cap.key;

          return (
            <div
              key={cap.key}
              onMouseMove={handleSpotlight}
              onClick={() => toggleExpand(cap.key)}
              className={`group relative cursor-pointer overflow-hidden rounded-xl border p-4 backdrop-blur-xl transition-all duration-500 ${
                isExpanded
                  ? "border-violet-500/30 bg-violet-500/[0.06]"
                  : "border-white/[0.08] bg-white/[0.03] hover:border-violet-500/20 hover:bg-white/[0.05]"
              }`}
            >
              {/* Spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(250px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(124,58,237,0.06), transparent 60%)",
                }}
              />

              <div className="relative">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300 ${
                    isExpanded
                      ? "border-violet-500/30 bg-violet-500/20 text-violet-400"
                      : "border-violet-500/15 bg-violet-500/[0.07] text-violet-400"
                  }`}>
                    {capabilityIcons[cap.key]}
                  </div>
                  <h4 className="text-sm font-semibold text-white">{t(cap.labelKey)}</h4>
                  <svg
                    className={`ml-auto h-4 w-4 text-gray-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>

                {/* Expandable metrics */}
                {isExpanded && (
                  <div
                    ref={(el) => handleExpandRef(cap.key, el)}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {cap.metrics.map((metric, i) => {
                        const isPositive = metric.trend > 0;
                        // For some metrics, positive is bad (bounce rate, blockers, cpu usage, etc.)
                        const isGood = metric.labelKey.includes("bounce") || metric.labelKey.includes("blocked") || metric.labelKey.includes("Blocker") || metric.labelKey.includes("cpu")
                          ? !isPositive
                          : isPositive;

                        return (
                          <div key={metric.labelKey} data-metric className="text-center">
                            <p className="text-[10px] text-gray-500">{t(metric.labelKey)}</p>
                            <p className="mt-1 text-lg font-bold text-white">
                              <AnimatedCounter
                                target={metric.value}
                                suffix={metric.suffix}
                                decimals={metric.suffix === "%" && metric.value < 10 ? 1 : metric.value % 1 !== 0 ? 2 : 0}
                                duration={1}
                                delay={0.1 + i * 0.06}
                              />
                            </p>
                            <div className={`mt-0.5 flex items-center justify-center gap-0.5 text-[10px] ${isGood ? "text-emerald-400" : "text-red-400"}`}>
                              <svg className={`h-2.5 w-2.5 ${isPositive ? "" : "rotate-180"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                              </svg>
                              <span>{Math.abs(Number(metric.trend))}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

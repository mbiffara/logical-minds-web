"use client";

import { useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { GlobalStats } from "@/lib/dashboard-data";
import AnimatedCounter from "./AnimatedCounter";

interface StatCardDef {
  key: keyof GlobalStats;
  labelKey: string;
  suffix: string;
  decimals: number;
  delta: number;
  icon: React.ReactNode;
}

const statDefs: StatCardDef[] = [
  {
    key: "totalAgents",
    labelKey: "dashboard.stats.totalAgents",
    suffix: "",
    decimals: 0,
    delta: 0,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    key: "activeAgents",
    labelKey: "dashboard.stats.activeNow",
    suffix: "",
    decimals: 0,
    delta: 2.3,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.788m13.788 0c3.808 3.808 3.808 9.98 0 13.788" />
      </svg>
    ),
  },
  {
    key: "activeProjects",
    labelKey: "dashboard.stats.activeProjects",
    suffix: "",
    decimals: 0,
    delta: 1.4,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
  },
  {
    key: "tasksToday",
    labelKey: "dashboard.stats.tasksToday",
    suffix: "",
    decimals: 0,
    delta: 12.5,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: "successRate",
    labelKey: "dashboard.stats.successRate",
    suffix: "%",
    decimals: 1,
    delta: 0.3,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    key: "avgResponseTime",
    labelKey: "dashboard.stats.avgResponse",
    suffix: "s",
    decimals: 1,
    delta: -0.2,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

interface HeroStatsProps {
  stats: GlobalStats;
}

export default function HeroStats({ stats }: HeroStatsProps) {
  const { t } = useLanguage();

  const handleSpotlight = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {statDefs.map((def, i) => {
          const value = stats[def.key];
          const isResponseTime = def.key === "avgResponseTime";
          // For response time, negative delta is good
          const isPositive = isResponseTime ? def.delta < 0 : def.delta > 0;

          return (
            <div
              key={def.key}
              data-stat-card
              onMouseMove={handleSpotlight}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.06] lg:p-5"
            >
              {/* Spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(300px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(124,58,237,0.06), transparent 60%)",
                }}
              />
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/[0.03] blur-3xl transition-all duration-700 group-hover:bg-violet-500/[0.08]" />

              <div className="relative">
                {/* Icon + label */}
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-500/15 bg-violet-500/[0.07] text-violet-400">
                    {def.icon}
                  </div>
                  <span className="text-xs text-gray-400">{t(def.labelKey)}</span>
                </div>

                {/* Value */}
                <div className="mt-3 text-2xl font-bold text-white lg:text-3xl">
                  <AnimatedCounter
                    target={value}
                    suffix={def.suffix}
                    decimals={def.decimals}
                    delay={0.3 + i * 0.08}
                  />
                </div>

                {/* Delta */}
                {def.delta !== 0 && (
                  <div className={`mt-1 flex items-center gap-1 text-xs ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
                    <svg className={`h-3 w-3 ${isPositive ? "" : "rotate-180"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                    <span>{Math.abs(def.delta)}%</span>
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

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import type { ActivityLogEntry } from "@/lib/dashboard-data";
import { generateNewActivityEntry } from "@/lib/dashboard-data";

const typeColors: Record<string, string> = {
  success: "text-emerald-400",
  info: "text-violet-400",
  warning: "text-amber-400",
};

const typeDots: Record<string, string> = {
  success: "bg-emerald-400",
  info: "bg-violet-400",
  warning: "bg-amber-400",
};

const stageBadgeColors: Record<string, string> = {
  productDiscovery: "border-blue-500/20 bg-blue-500/[0.07] text-blue-400",
  productDesign: "border-pink-500/20 bg-pink-500/[0.07] text-pink-400",
  softwareDev: "border-cyan-500/20 bg-cyan-500/[0.07] text-cyan-400",
  qualityAssurance: "border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-400",
  cloudInfra: "border-amber-500/20 bg-amber-500/[0.07] text-amber-400",
  aiIntegration: "border-violet-500/20 bg-violet-500/[0.07] text-violet-400",
  productGrowth: "border-orange-500/20 bg-orange-500/[0.07] text-orange-400",
};

interface ActivityFeedProps {
  initialEntries: ActivityLogEntry[];
}

export default function ActivityFeed({ initialEntries }: ActivityFeedProps) {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<ActivityLogEntry[]>(initialEntries);
  const feedRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);

  const animateNewEntry = useCallback(() => {
    if (!feedRef.current) return;
    const items = feedRef.current.querySelectorAll("[data-feed-entry]");
    if (items.length > 0) {
      const newest = items[0];
      gsap.fromTo(
        newest,
        { opacity: 0, y: 15, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "power3.out" }
      );
    }
  }, []);

  // Auto-append new entries
  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current += 1;
      const newEntry = generateNewActivityEntry(indexRef.current);
      setEntries((prev) => [newEntry, ...prev.slice(0, 24)]);
      requestAnimationFrame(animateNewEntry);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [animateNewEntry]);

  return (
    <div data-activity-feed className="flex-1">
      <h2 className="bg-gradient-to-r from-white via-violet-200 to-purple-400 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
        {t("dashboard.activity.title")}
      </h2>
      <p className="mt-2 text-sm text-gray-400">{t("dashboard.activity.subtitle")}</p>

      {/* Terminal-style container */}
      <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c0c14] backdrop-blur-xl">
        {/* macOS dots header */}
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
          <span className="ml-3 text-[10px] text-gray-600 font-mono">agent-activity.log</span>
        </div>

        {/* Feed entries */}
        <div ref={feedRef} className="h-[420px] overflow-y-auto p-3 space-y-1">
          {entries.map((entry) => (
            <div
              key={entry.id}
              data-feed-entry
              className="flex items-start gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/[0.02]"
            >
              {/* Type dot */}
              <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${typeDots[entry.type]}`} />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {/* Timestamp */}
                  <span className="shrink-0 font-mono text-[10px] text-gray-600">{entry.timestamp}</span>
                  {/* Stage badge */}
                  <span className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-wider ${stageBadgeColors[entry.stage] || "border-gray-500/20 bg-gray-500/[0.07] text-gray-400"}`}>
                    {t(`dashboard.pipeline.stages.${entry.stage}`)}
                  </span>
                </div>
                <p className={`mt-0.5 truncate text-xs ${typeColors[entry.type]}`}>
                  <span className="text-gray-500">{t(entry.agentNameKey)}:</span>{" "}
                  {t(entry.actionKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

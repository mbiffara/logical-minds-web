"use client";

import { useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { AgentData } from "@/lib/dashboard-data";
import StatusIndicator from "./StatusIndicator";
import AgentSparkline from "./AgentSparkline";

interface AgentCardProps {
  agent: AgentData;
}

const statusTextColors: Record<string, string> = {
  active: "text-emerald-400",
  working: "text-amber-400",
  idle: "text-gray-400",
  error: "text-red-400",
};

export default function AgentCard({ agent }: AgentCardProps) {
  const { t } = useLanguage();

  const handleSpotlight = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      data-agent-card
      onMouseMove={handleSpotlight}
      className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.06]"
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
        {/* Header: name + status */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="truncate text-sm font-semibold text-white">{t(agent.nameKey)}</h4>
            <p className="mt-0.5 text-[11px] text-violet-400">{t(agent.roleKey)}</p>
          </div>
          <StatusIndicator
            status={agent.status}
            label={t(`dashboard.status.${agent.status}`)}
          />
        </div>

        {/* Mini metrics */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div>
            <p className="text-[10px] text-gray-500">{t("dashboard.agents.metrics.tasks")}</p>
            <p className="text-sm font-semibold text-white">{agent.metrics.tasksCompleted}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500">{t("dashboard.agents.metrics.success")}</p>
            <p className="text-sm font-semibold text-white">{agent.metrics.successRate}%</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500">{t("dashboard.agents.metrics.response")}</p>
            <p className="text-sm font-semibold text-white">{agent.metrics.avgResponseTime}s</p>
          </div>
        </div>

        {/* Sparkline */}
        <div className="mt-3">
          <AgentSparkline data={agent.activity} width={200} height={28} />
        </div>

        {/* Last action */}
        <p className={`mt-2 truncate text-[10px] ${statusTextColors[agent.status] || "text-gray-500"}`}>
          {t(agent.lastAction.descriptionKey)}
        </p>
      </div>
    </div>
  );
}

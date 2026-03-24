"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { AgentInfraInfo } from "@/lib/dashboard-data";

const infraStatusColors: Record<string, { dot: string; bg: string; border: string; text: string }> = {
  running: { dot: "bg-emerald-400", bg: "bg-emerald-500/[0.07]", border: "border-emerald-500/20", text: "text-emerald-400" },
  idle: { dot: "bg-gray-400", bg: "bg-gray-500/[0.07]", border: "border-gray-500/20", text: "text-gray-400" },
  scaling: { dot: "bg-amber-400", bg: "bg-amber-500/[0.07]", border: "border-amber-500/20", text: "text-amber-400" },
};

interface AgentInfraCardProps {
  infra: AgentInfraInfo;
}

export default function AgentInfraCard({ infra }: AgentInfraCardProps) {
  const { t } = useLanguage();
  const statusConfig = infraStatusColors[infra.status] || infraStatusColors.running;

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* OpenClaw icon */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/15 bg-violet-500/[0.07]">
            <svg className="h-5 w-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-white">{t("dashboard.agentDetail.infra.provider")}</p>
            <p className="text-[10px] font-mono text-gray-500">{infra.instanceId}</p>
          </div>
        </div>

        {/* Status badge */}
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 ${statusConfig.bg} ${statusConfig.border}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot} ${infra.status === "running" ? "animate-pulse" : ""}`} />
          <span className={`text-[9px] font-medium uppercase tracking-wider ${statusConfig.text}`}>
            {t(`dashboard.agentDetail.infra.status.${infra.status}`)}
          </span>
        </span>
      </div>

      {/* Metrics grid */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* Region */}
        <div>
          <p className="text-[10px] text-gray-500">{t("dashboard.agentDetail.infra.region")}</p>
          <p className="mt-0.5 text-xs font-semibold text-white">{infra.region}</p>
        </div>

        {/* CPU */}
        <div>
          <p className="text-[10px] text-gray-500">{t("dashboard.agentDetail.infra.cpu")}</p>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
                style={{ width: `${infra.cpu}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-gray-400">{infra.cpu}%</span>
          </div>
        </div>

        {/* Memory */}
        <div>
          <p className="text-[10px] text-gray-500">{t("dashboard.agentDetail.infra.memory")}</p>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                style={{ width: `${infra.memory}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-gray-400">{infra.memory}%</span>
          </div>
        </div>

        {/* Uptime */}
        <div>
          <p className="text-[10px] text-gray-500">{t("dashboard.agentDetail.infra.uptime")}</p>
          <p className="mt-0.5 text-xs font-semibold text-white">{infra.uptime}</p>
        </div>
      </div>

      {/* Model badge */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-[10px] text-gray-500">{t("dashboard.agentDetail.infra.model")}</span>
        <span className="rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-2 py-0.5 text-[10px] font-mono text-violet-300">
          {infra.model}
        </span>
      </div>
    </div>
  );
}

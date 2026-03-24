"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { AgentCostBreakdown } from "@/lib/dashboard-data";

interface AgentCostCardProps {
  cost: AgentCostBreakdown;
}

const costItems: { key: keyof Omit<AgentCostBreakdown, "total">; labelKey: string; gradient: string }[] = [
  { key: "server", labelKey: "dashboard.agentDetail.costBreakdown.server", gradient: "from-violet-500 to-purple-500" },
  { key: "database", labelKey: "dashboard.agentDetail.costBreakdown.database", gradient: "from-cyan-500 to-blue-500" },
  { key: "llm", labelKey: "dashboard.agentDetail.costBreakdown.llm", gradient: "from-amber-500 to-orange-500" },
];

export default function AgentCostCard({ cost }: AgentCostCardProps) {
  const { t } = useLanguage();
  const suffix = t("dashboard.agentDetail.costBreakdown.monthly");

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl">
      {/* Total header */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-wider text-gray-500">
          {t("dashboard.agentDetail.costBreakdown.total")}
        </p>
        <p className="text-lg font-bold text-white">
          ${cost.total.toFixed(2)}
          <span className="text-xs font-normal text-gray-500">{suffix}</span>
        </p>
      </div>

      {/* Stacked bar */}
      <div className="mt-3 flex h-2 gap-0.5 overflow-hidden rounded-full">
        {costItems.map((item) => (
          <div
            key={item.key}
            className={`h-full rounded-full bg-gradient-to-r ${item.gradient}`}
            style={{ width: `${(cost[item.key] / cost.total) * 100}%` }}
          />
        ))}
      </div>

      {/* Breakdown grid */}
      <div className="mt-3 grid grid-cols-3 gap-3">
        {costItems.map((item) => (
          <div key={item.key} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 shrink-0 rounded-full bg-gradient-to-r ${item.gradient}`} />
              <p className="text-[9px] uppercase tracking-wider text-gray-500">{t(item.labelKey)}</p>
            </div>
            <p className="mt-1 text-sm font-bold text-white font-mono">
              ${cost[item.key].toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import type { AgentData, PipelineStageData } from "@/lib/dashboard-data";
import AgentIcon from "./AgentIcon";

const statusColors: Record<string, { dot: string; text: string }> = {
  active: { dot: "bg-emerald-400", text: "text-emerald-400" },
  working: { dot: "bg-amber-400", text: "text-amber-400" },
  idle: { dot: "bg-gray-400", text: "text-gray-400" },
  error: { dot: "bg-red-400", text: "text-red-400" },
};

const stageGradients: Record<string, string> = {
  productDiscovery: "from-blue-500 to-blue-400",
  productDesign: "from-pink-500 to-pink-400",
  softwareDev: "from-cyan-500 to-cyan-400",
  qualityAssurance: "from-emerald-500 to-emerald-400",
  cloudInfra: "from-amber-500 to-amber-400",
  aiIntegration: "from-violet-500 to-violet-400",
  productGrowth: "from-orange-500 to-orange-400",
};

interface DashboardOverviewProps {
  agents: AgentData[];
  pipeline: PipelineStageData[];
  onSelectAgent: (agent: AgentData) => void;
}

export default function DashboardOverview({ agents, pipeline, onSelectAgent }: DashboardOverviewProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSpotlight = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const sections = containerRef.current.querySelectorAll("[data-detail-section]");
    gsap.fromTo(
      Array.from(sections),
      { y: 20, opacity: 0, filter: "blur(4px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.4, stagger: 0.06, ease: "power3.out" }
    );
  }, []);

  // Compute stats
  const statusCounts = agents.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalMonthlyCost = agents.reduce((sum, a) => sum + a.cost.total, 0);
  const totalServerCost = agents.reduce((sum, a) => sum + a.cost.server, 0);
  const totalDbCost = agents.reduce((sum, a) => sum + a.cost.database, 0);
  const totalLlmCost = agents.reduce((sum, a) => sum + a.cost.llm, 0);

  const modelCounts = agents.reduce((acc, a) => {
    const key = a.llmConfig.model;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const providerCounts = agents.reduce((acc, a) => {
    acc[a.llmConfig.provider] = (acc[a.llmConfig.provider] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div data-detail-section>
        <h2 className="bg-gradient-to-r from-white via-violet-200 to-purple-400 bg-clip-text text-lg font-bold text-transparent sm:text-xl">
          {t("dashboard.overview.title")}
        </h2>
        <p className="mt-1 text-xs text-gray-400">{t("dashboard.overview.subtitle")}</p>
      </div>

      {/* Status distribution */}
      <div data-detail-section>
        <h3 className="mb-3 text-sm font-semibold text-white">{t("dashboard.overview.agentStatus")}</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(["active", "working", "idle", "error"] as const).map((status) => {
            const config = statusColors[status];
            const count = statusCounts[status] || 0;
            return (
              <div
                key={status}
                onMouseMove={handleSpotlight}
                className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.06]"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(200px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(124,58,237,0.06), transparent 60%)" }}
                />
                <div className="relative flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${config.dot}`} />
                  <p className="text-[10px] uppercase tracking-wider text-gray-500">{t(`dashboard.status.${status}`)}</p>
                </div>
                <p className={`relative mt-1.5 text-2xl font-bold ${config.text}`}>{count}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Total Cost Breakdown */}
      <div data-detail-section>
        <h3 className="mb-3 text-sm font-semibold text-white">{t("dashboard.overview.totalCost")}</h3>
        <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-wider text-gray-500">{t("dashboard.overview.allAgents")}</p>
            <p className="text-xl font-bold text-white">
              ${totalMonthlyCost.toFixed(2)}
              <span className="text-xs font-normal text-gray-500">{t("dashboard.agentDetail.costBreakdown.monthly")}</span>
            </p>
          </div>

          {/* Stacked bar */}
          <div className="mt-3 flex h-2.5 gap-0.5 overflow-hidden rounded-full">
            <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500" style={{ width: `${(totalServerCost / totalMonthlyCost) * 100}%` }} />
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${(totalDbCost / totalMonthlyCost) * 100}%` }} />
            <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500" style={{ width: `${(totalLlmCost / totalMonthlyCost) * 100}%` }} />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
              { label: t("dashboard.agentDetail.costBreakdown.server"), value: totalServerCost, gradient: "from-violet-500 to-purple-500" },
              { label: t("dashboard.agentDetail.costBreakdown.database"), value: totalDbCost, gradient: "from-cyan-500 to-blue-500" },
              { label: t("dashboard.agentDetail.costBreakdown.llm"), value: totalLlmCost, gradient: "from-amber-500 to-orange-500" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                <div className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 shrink-0 rounded-full bg-gradient-to-r ${item.gradient}`} />
                  <p className="text-[9px] uppercase tracking-wider text-gray-500">{item.label}</p>
                </div>
                <p className="mt-1 text-sm font-bold text-white font-mono">${item.value.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Model / Provider distribution */}
      <div data-detail-section>
        <h3 className="mb-3 text-sm font-semibold text-white">{t("dashboard.overview.llmDistribution")}</h3>
        <div className="grid grid-cols-2 gap-3">
          {/* By provider */}
          <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-3">{t("dashboard.agentDetail.llm.provider")}</p>
            {Object.entries(providerCounts).map(([provider, count]) => (
              <div key={provider} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${provider === "Anthropic" ? "bg-amber-400" : "bg-emerald-400"}`} />
                  <span className="text-xs text-gray-300">{provider}</span>
                </div>
                <span className="text-xs font-bold text-white">{count}</span>
              </div>
            ))}
          </div>

          {/* By model */}
          <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-3">{t("dashboard.agentDetail.infra.model")}</p>
            {Object.entries(modelCounts).map(([model, count]) => (
              <div key={model} className="flex items-center justify-between py-1.5">
                <span className="rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-2 py-0.5 text-[10px] font-mono text-violet-300">{model}</span>
                <span className="text-xs font-bold text-white">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline stages overview */}
      <div data-detail-section>
        <h3 className="mb-3 text-sm font-semibold text-white">{t("dashboard.overview.stagesOverview")}</h3>
        <div className="space-y-2">
          {pipeline.map((stage) => {
            const activeCount = stage.agents.filter((a) => a.status === "active" || a.status === "working").length;
            const stageCost = stage.agents.reduce((sum, a) => sum + a.cost.total, 0);
            const gradient = stageGradients[stage.key] || "from-gray-500 to-gray-400";

            return (
              <div
                key={stage.key}
                className="cursor-pointer overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-[10px] font-bold text-white`}>
                      {stage.number}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-white">{t(stage.titleKey)}</p>
                      <p className="text-[10px] text-gray-500">
                        {activeCount}/{stage.agents.length} {t("dashboard.overview.active")}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-400">${stageCost.toFixed(0)}{t("dashboard.agentDetail.costBreakdown.monthly")}</span>
                </div>

                {/* Agent pills */}
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {stage.agents.map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => onSelectAgent(agent)}
                      className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] text-gray-400 transition-all duration-200 hover:border-violet-500/30 hover:bg-violet-500/[0.08] hover:text-white"
                    >
                      <AgentIcon status={agent.status} size="sm" />
                      {t(agent.nameKey).replace(" Agent", "").replace(" Agente", "").replace("Agente de ", "").replace("Agente ", "")}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

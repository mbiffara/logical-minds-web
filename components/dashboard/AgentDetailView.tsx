"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import type { AgentData, ActivityLogEntry } from "@/lib/dashboard-data";
import StatusIndicator from "./StatusIndicator";
import AgentSparkline from "./AgentSparkline";
import AgentInfraCard from "./AgentInfraCard";
import AgentLLMConfigCard from "./AgentLLMConfigCard";
import AgentCostCard from "./AgentCostCard";
import AgentIcon from "./AgentIcon";
import AgentIntegrations from "./AgentIntegrations";
import LinearTasksPanel from "./LinearTasksPanel";

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

interface AgentDetailViewProps {
  agent: AgentData;
  activityEntries: ActivityLogEntry[];
}

export default function AgentDetailView({ agent, activityEntries }: AgentDetailViewProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const prevAgentId = useRef<string>("");

  const handleSpotlight = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);

  // Animate in when agent changes
  useEffect(() => {
    if (prevAgentId.current === agent.id) return;
    prevAgentId.current = agent.id;

    if (!containerRef.current) return;
    const sections = containerRef.current.querySelectorAll("[data-detail-section]");
    gsap.fromTo(
      Array.from(sections),
      { y: 20, opacity: 0, filter: "blur(4px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.4, stagger: 0.06, ease: "power3.out" }
    );
  }, [agent.id]);

  // Filter activity entries for this agent
  const agentActivity = activityEntries.filter(
    (entry) => entry.agentNameKey === agent.nameKey
  ).slice(0, 8);

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Agent Header */}
      <div data-detail-section className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <AgentIcon status={agent.status} size="lg" className="mt-0.5" />
          <div>
            <h2 className="bg-gradient-to-r from-white via-violet-200 to-purple-400 bg-clip-text text-lg font-bold text-transparent sm:text-xl">
              {t(agent.nameKey)}
            </h2>
            <p className="mt-0.5 text-xs text-violet-400">{t(agent.roleKey)}</p>
          {/* Skills */}
          {agent.skills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {agent.skills.map((skillKey) => (
                <span
                  key={skillKey}
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] text-gray-400"
                >
                  {t(skillKey)}
                </span>
              ))}
            </div>
          )}
          </div>
        </div>
        <StatusIndicator status={agent.status} label={t(`dashboard.status.${agent.status}`)} size="md" />
      </div>

      {/* Infrastructure Card */}
      <div data-detail-section>
        <h3 className="mb-3 text-sm font-semibold text-white">{t("dashboard.agentDetail.infrastructure")}</h3>
        <AgentInfraCard infra={agent.infra} />
      </div>

      {/* LLM Configuration Card */}
      <div data-detail-section>
        <h3 className="mb-3 text-sm font-semibold text-white">{t("dashboard.agentDetail.llmConfig")}</h3>
        <AgentLLMConfigCard config={agent.llmConfig} />
      </div>

      {/* Cost Breakdown */}
      <div data-detail-section>
        <h3 className="mb-3 text-sm font-semibold text-white">{t("dashboard.agentDetail.cost")}</h3>
        <AgentCostCard cost={agent.cost} />
      </div>

      {/* Metrics Row */}
      <div data-detail-section>
        <h3 className="mb-3 text-sm font-semibold text-white">{t("dashboard.agentDetail.metrics")}</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: t("dashboard.agents.metrics.tasks"), value: String(agent.metrics.tasksCompleted), suffix: "" },
            { label: t("dashboard.agents.metrics.success"), value: String(agent.metrics.successRate), suffix: "%" },
            { label: t("dashboard.agents.metrics.response"), value: String(agent.metrics.avgResponseTime), suffix: "s" },
            { label: t("dashboard.agentDetail.infra.uptime"), value: agent.infra.uptime, suffix: "" },
          ].map((metric) => (
            <div
              key={metric.label}
              onMouseMove={handleSpotlight}
              className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.06]"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(200px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(124,58,237,0.06), transparent 60%)",
                }}
              />
              <div className="relative">
                <p className="text-[10px] text-gray-500">{metric.label}</p>
                <p className="mt-1 text-lg font-bold text-white">
                  {metric.value}{metric.suffix}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sparkline */}
      <div data-detail-section className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl">
        <AgentSparkline data={agent.activity} width={500} height={48} />
      </div>

      {/* Integrations */}
      <div data-detail-section>
        <AgentIntegrations integrations={agent.integrations} />
      </div>

      {/* Linear Tasks */}
      <div data-detail-section>
        <LinearTasksPanel tasks={agent.linearTasks} />
      </div>

      {/* Recent Activity (filtered for this agent) */}
      <div data-detail-section>
        <h3 className="text-sm font-semibold text-white">{t("dashboard.agentDetail.recentActivity")}</h3>
        {agentActivity.length > 0 ? (
          <div className="mt-3 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c0c14] backdrop-blur-xl">
            <div className="p-2 space-y-0.5">
              {agentActivity.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/[0.02]"
                >
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${typeDots[entry.type]}`} />
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[10px] text-gray-600">{entry.timestamp}</span>
                    <p className={`truncate text-xs ${typeColors[entry.type]}`}>
                      {t(entry.actionKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-2 text-xs text-gray-500">No recent activity</p>
        )}
      </div>
    </div>
  );
}

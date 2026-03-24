"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { PipelineStageData, AgentData } from "@/lib/dashboard-data";
import AgentIcon from "./AgentIcon";

const statusDotColors: Record<string, string> = {
  active: "bg-emerald-400",
  working: "bg-amber-400",
  idle: "bg-gray-400",
  error: "bg-red-400",
};

interface DashboardSidebarProps {
  pipeline: PipelineStageData[];
  productManager: AgentData | null;
  selectedAgentId: string | null;
  onSelectAgent: (agent: AgentData) => void;
  onSelectOverview: () => void;
  isOverview: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function DashboardSidebar({
  pipeline,
  productManager,
  selectedAgentId,
  onSelectAgent,
  onSelectOverview,
  isOverview,
  mobileOpen,
  onMobileClose,
}: DashboardSidebarProps) {
  const { t } = useLanguage();
  const [collapsedStages, setCollapsedStages] = useState<Set<string>>(new Set());

  const toggleStage = (key: string) => {
    setCollapsedStages((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-white/[0.06] px-4 py-4">
        <h2 className="text-sm font-bold text-white">{t("dashboard.sidebar.title")}</h2>
        <p className="mt-0.5 text-[11px] text-gray-500">
          {pipeline.reduce((sum, s) => sum + s.agents.length, 0) + (productManager ? 1 : 0)} {t("dashboard.sidebar.allAgents").toLowerCase()}
        </p>
      </div>

      {/* Overview button */}
      <div className="px-2 pt-3 pb-1">
        <button
          onClick={() => {
            onSelectOverview();
            onMobileClose();
          }}
          className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-all duration-200 ${
            isOverview
              ? "border border-violet-500/30 bg-violet-500/[0.1] text-white"
              : "border border-transparent text-gray-400 hover:bg-white/[0.04] hover:text-gray-200"
          }`}
        >
          <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
          <span className="text-xs font-semibold">{t("dashboard.sidebar.overview")}</span>
        </button>
      </div>

      {/* Product Manager */}
      {productManager && (
        <div className="px-2 pb-1">
          <button
            onClick={() => {
              onSelectAgent(productManager);
              onMobileClose();
            }}
            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-all duration-200 ${
              selectedAgentId === productManager.id
                ? "border border-violet-500/30 bg-violet-500/[0.1] text-white"
                : "border border-transparent text-gray-400 hover:bg-white/[0.04] hover:text-gray-200"
            }`}
          >
            <AgentIcon status={productManager.status} size="sm" />
            <span className="text-xs font-semibold">{t(productManager.nameKey).replace(" Agent", "").replace(" Agente", "").replace("Agente ", "")}</span>
          </button>
        </div>
      )}

      <div className="mx-3 h-px bg-white/[0.06]" />

      {/* Stage list */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {pipeline.map((stage) => {
          const isCollapsed = collapsedStages.has(stage.key);
          const activeCount = stage.agents.filter(
            (a) => a.status === "active" || a.status === "working"
          ).length;

          return (
            <div key={stage.key}>
              {/* Stage header */}
              <button
                onClick={() => toggleStage(stage.key)}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-white/[0.04]"
              >
                <span className="text-[10px] font-bold text-violet-400">{stage.number}</span>
                <span className="flex-1 text-xs font-semibold text-gray-300">{t(stage.titleKey)}</span>
                <span className="text-[10px] text-gray-600">{activeCount}/{stage.agents.length}</span>
                <svg
                  className={`h-3 w-3 text-gray-600 transition-transform duration-200 ${isCollapsed ? "-rotate-90" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Agent buttons */}
              {!isCollapsed && (
                <div className="ml-4 space-y-0.5 pb-1">
                  {stage.agents.map((agent) => {
                    const isSelected = selectedAgentId === agent.id;
                    return (
                      <button
                        key={agent.id}
                        onClick={() => {
                          onSelectAgent(agent);
                          onMobileClose();
                        }}
                        className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left transition-all duration-200 ${
                          isSelected
                            ? "border border-violet-500/30 bg-violet-500/[0.1] text-white"
                            : "border border-transparent text-gray-400 hover:bg-white/[0.04] hover:text-gray-200"
                        }`}
                      >
                        <AgentIcon status={agent.status} size="sm" />
                        <span className="truncate text-xs">{t(agent.nameKey).replace(" Agent", "").replace(" Agente", "").replace("Agente de ", "").replace("Agente ", "")}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-white/[0.06] bg-white/[0.02]">
        {sidebarContent}
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onMobileClose} />
          <aside className="absolute left-0 top-0 h-full w-72 border-r border-white/[0.06] bg-[#0c0c14]">
            {/* Close button */}
            <div className="absolute right-2 top-3">
              <button onClick={onMobileClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-white/[0.06] hover:text-white">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}

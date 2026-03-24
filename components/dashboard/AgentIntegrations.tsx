"use client";

import { useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { AgentIntegration } from "@/lib/dashboard-data";

const integrationStatusColors: Record<string, { dot: string; text: string }> = {
  connected: { dot: "bg-emerald-400", text: "text-emerald-400" },
  syncing: { dot: "bg-amber-400 animate-pulse", text: "text-amber-400" },
  disconnected: { dot: "bg-red-400", text: "text-red-400" },
};

interface AgentIntegrationsProps {
  integrations: AgentIntegration[];
}

export default function AgentIntegrations({ integrations }: AgentIntegrationsProps) {
  const { t } = useLanguage();

  const handleSpotlight = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{t("dashboard.agentDetail.integrations")}</h3>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {integrations.map((integration) => {
          const statusConfig = integrationStatusColors[integration.status] || integrationStatusColors.connected;
          return (
            <div
              key={integration.name}
              onMouseMove={handleSpotlight}
              className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.06]"
            >
              {/* Spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(200px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(124,58,237,0.06), transparent 60%)",
                }}
              />

              <div className="relative">
                {/* Tool name + status */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{integration.name}</span>
                  <span className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot}`} />
                    <span className={`text-[9px] font-medium uppercase tracking-wider ${statusConfig.text}`}>
                      {t(`dashboard.integrations.${integration.status}`)}
                    </span>
                  </span>
                </div>

                {/* Details */}
                <div className="mt-2.5 flex items-center justify-between text-[10px] text-gray-500">
                  <span>{t("dashboard.integrations.lastSync")}: {integration.lastSync}</span>
                  <span>{integration.eventsToday} {t("dashboard.integrations.eventsToday").toLowerCase()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

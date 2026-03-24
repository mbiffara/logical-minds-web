"use client";

import type { AgentStatus } from "@/lib/dashboard-data";

const statusConfig: Record<AgentStatus, { color: string; pulse: boolean; bg: string; border: string }> = {
  active: { color: "bg-emerald-400", pulse: true, bg: "bg-emerald-500/[0.07]", border: "border-emerald-500/20" },
  working: { color: "bg-amber-400", pulse: true, bg: "bg-amber-500/[0.07]", border: "border-amber-500/20" },
  idle: { color: "bg-gray-400", pulse: false, bg: "bg-gray-500/[0.07]", border: "border-gray-500/20" },
  error: { color: "bg-red-400", pulse: false, bg: "bg-red-500/[0.07]", border: "border-red-500/20" },
};

interface StatusIndicatorProps {
  status: AgentStatus;
  label?: string;
  size?: "sm" | "md";
}

export default function StatusIndicator({ status, label, size = "sm" }: StatusIndicatorProps) {
  const config = statusConfig[status];
  const dotSize = size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 ${config.bg} ${config.border}`}>
      <span className={`${dotSize} rounded-full ${config.color} ${config.pulse ? "animate-pulse" : ""}`} />
      {label && (
        <span className="text-[9px] font-medium uppercase tracking-wider text-current opacity-80">
          {label}
        </span>
      )}
    </span>
  );
}

import type { AgentStatus } from "@/lib/dashboard-data";

const statusGlow: Record<string, string> = {
  active: "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-400",
  working: "border-amber-500/30 bg-amber-500/[0.08] text-amber-400",
  idle: "border-gray-500/20 bg-gray-500/[0.06] text-gray-500",
  error: "border-red-500/30 bg-red-500/[0.08] text-red-400",
};

interface AgentIconProps {
  status?: AgentStatus;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function AgentIcon({ status = "active", size = "sm", className = "" }: AgentIconProps) {
  const sizeMap = {
    sm: "h-5 w-5",
    md: "h-7 w-7",
    lg: "h-9 w-9",
  };
  const iconSize = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className={`flex shrink-0 items-center justify-center rounded-lg border ${statusGlow[status] || statusGlow.active} ${sizeMap[size]} ${className}`}>
      <svg className={iconSize[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
      </svg>
    </div>
  );
}

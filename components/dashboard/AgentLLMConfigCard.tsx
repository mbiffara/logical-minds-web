"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { AgentLLMConfig } from "@/lib/dashboard-data";

const providerStyles: Record<string, { icon: string; border: string; bg: string; text: string; dot: string }> = {
  OpenAI: {
    icon: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/[0.07]",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  Anthropic: {
    icon: "text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/[0.07]",
    text: "text-amber-400",
    dot: "bg-amber-400",
  },
};

interface AgentLLMConfigCardProps {
  config: AgentLLMConfig;
}

export default function AgentLLMConfigCard({ config }: AgentLLMConfigCardProps) {
  const { t } = useLanguage();
  const style = providerStyles[config.provider] || providerStyles.OpenAI;

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl">
      {/* Provider + Model header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Provider icon */}
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${style.border} ${style.bg}`}>
            {config.provider === "Anthropic" ? (
              <svg className={`h-5 w-5 ${style.icon}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.304 3.541l-5.296 16.918h3.236L20.54 3.541h-3.236zm-10.608 0l5.296 16.918H8.756L3.46 3.541h3.236z" />
              </svg>
            ) : (
              <svg className={`h-5 w-5 ${style.icon}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 0011.7.292a6.046 6.046 0 00-5.764 4.218 5.99 5.99 0 00-3.997 2.9 6.05 6.05 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 23.7a6.046 6.046 0 005.764-4.218 5.99 5.99 0 003.997-2.9 6.056 6.056 0 00-.738-6.762zM13.26 22.43a4.476 4.476 0 01-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 00.392-.681v-6.737l2.02 1.168a.071.071 0 01.038.052v5.583a4.504 4.504 0 01-4.494 4.494zM3.6 18.304a4.47 4.47 0 01-.535-3.014l.142.085 4.783 2.759a.771.771 0 00.78 0l5.843-3.369v2.332a.08.08 0 01-.033.062L9.74 19.95a4.5 4.5 0 01-6.14-1.646zM2.34 7.896a4.485 4.485 0 012.366-1.973V11.6a.766.766 0 00.388.676l5.815 3.355-2.02 1.168a.076.076 0 01-.071 0l-4.83-2.786A4.504 4.504 0 012.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 01.071 0l4.83 2.791a4.494 4.494 0 01-.676 8.105v-5.678a.79.79 0 00-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 00-.785 0L9.409 9.23V6.897a.066.066 0 01.028-.061l4.83-2.787a4.5 4.5 0 016.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 01-.038-.057V6.075a4.5 4.5 0 017.375-3.453l-.142.08L8.704 5.46a.795.795 0 00-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v3.005l-2.602 1.5-2.607-1.5z" />
              </svg>
            )}
          </div>
          <div>
            <p className={`text-xs font-semibold ${style.text}`}>{config.provider}</p>
            <p className="text-[10px] font-mono text-gray-500">{t("dashboard.agentDetail.llm.provider")}</p>
          </div>
        </div>

        {/* Model badge */}
        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-mono font-medium ${style.border} ${style.bg} ${style.text}`}>
          {config.model}
        </span>
      </div>

      {/* Parameters grid */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
          <p className="text-[9px] uppercase tracking-wider text-gray-500">{t("dashboard.agentDetail.llm.temperature")}</p>
          <p className="mt-1 text-sm font-bold text-white font-mono">{config.temperature}</p>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
          <p className="text-[9px] uppercase tracking-wider text-gray-500">{t("dashboard.agentDetail.llm.maxTokens")}</p>
          <p className="mt-1 text-sm font-bold text-white font-mono">{config.maxTokens.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
          <p className="text-[9px] uppercase tracking-wider text-gray-500">{t("dashboard.agentDetail.llm.topP")}</p>
          <p className="mt-1 text-sm font-bold text-white font-mono">{config.topP}</p>
        </div>
      </div>

      {/* System Prompt preview */}
      <div className="mt-4">
        <p className="mb-2 text-[10px] uppercase tracking-wider text-gray-500">{t("dashboard.agentDetail.llm.systemPrompt")}</p>
        <div className="rounded-lg border border-white/[0.06] bg-[#0a0a12] p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="h-2 w-2 rounded-full bg-red-500/50" />
            <span className="h-2 w-2 rounded-full bg-amber-500/50" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/50" />
            <span className="ml-2 text-[9px] font-mono text-gray-600">system_prompt.txt</span>
          </div>
          <p className="text-[11px] leading-relaxed text-gray-400 font-mono line-clamp-4">
            {t(config.systemPromptKey)}
          </p>
        </div>
      </div>
    </div>
  );
}

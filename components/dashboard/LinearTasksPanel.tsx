"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { LinearTask } from "@/lib/dashboard-data";

const statusStyles: Record<string, { bg: string; border: string; text: string }> = {
  in_progress: { bg: "bg-blue-500/[0.1]", border: "border-blue-500/20", text: "text-blue-400" },
  done: { bg: "bg-emerald-500/[0.1]", border: "border-emerald-500/20", text: "text-emerald-400" },
  todo: { bg: "bg-gray-500/[0.1]", border: "border-gray-500/20", text: "text-gray-400" },
  blocked: { bg: "bg-red-500/[0.1]", border: "border-red-500/20", text: "text-red-400" },
};

const priorityStyles: Record<string, { bg: string; border: string; text: string }> = {
  urgent: { bg: "bg-red-500/[0.1]", border: "border-red-500/20", text: "text-red-400" },
  high: { bg: "bg-orange-500/[0.1]", border: "border-orange-500/20", text: "text-orange-400" },
  medium: { bg: "bg-amber-500/[0.1]", border: "border-amber-500/20", text: "text-amber-400" },
  low: { bg: "bg-gray-500/[0.1]", border: "border-gray-500/20", text: "text-gray-400" },
};

const statusTranslationKey: Record<string, string> = {
  in_progress: "inProgress",
  done: "done",
  todo: "todo",
  blocked: "blocked",
};

interface LinearTasksPanelProps {
  tasks: LinearTask[];
}

export default function LinearTasksPanel({ tasks }: LinearTasksPanelProps) {
  const { t } = useLanguage();

  if (tasks.length === 0) {
    return (
      <div>
        <h3 className="text-sm font-semibold text-white">{t("dashboard.linear.title")}</h3>
        <p className="mt-2 text-xs text-gray-500">{t("dashboard.linear.noTasks")}</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{t("dashboard.linear.title")}</h3>
      <div className="mt-3 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl">
        <div className="divide-y divide-white/[0.04]">
          {tasks.map((task) => {
            const sStyle = statusStyles[task.status] || statusStyles.todo;
            const pStyle = priorityStyles[task.priority] || priorityStyles.medium;
            const statusKey = statusTranslationKey[task.status] || task.status;

            return (
              <div key={task.id} className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/[0.02]">
                {/* Task ID */}
                <span className="shrink-0 font-mono text-[10px] text-violet-400">{task.id}</span>

                {/* Title */}
                <span className="min-w-0 flex-1 truncate text-xs text-gray-300">{t(task.title)}</span>

                {/* Priority badge */}
                <span className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-wider ${pStyle.bg} ${pStyle.border} ${pStyle.text}`}>
                  {t(`dashboard.linear.priority.${task.priority}`)}
                </span>

                {/* Status badge */}
                <span className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-wider ${sStyle.bg} ${sStyle.border} ${sStyle.text}`}>
                  {t(`dashboard.linear.status.${statusKey}`)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

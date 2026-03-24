"use client";

import { useLanguage } from "@/context/LanguageContext";
import ScrollReveal from "./animations/ScrollReveal";

const gradients = [
  "from-violet-500/20 to-purple-500/20",
  "from-purple-500/20 to-pink-500/20",
  "from-indigo-500/20 to-violet-500/20",
];

interface PartnerItem {
  name: string;
  industry: string;
  description: string;
  metric: string;
  metricLabel: string;
}

export default function Partners() {
  const { t } = useLanguage();
  const items = t("partners.items") as PartnerItem[];

  return (
    <section id="partners" className="relative py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-4 py-1.5 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
              <span className="text-xs font-medium text-violet-400">{t("partners.badge")}</span>
            </div>
          </div>
          <h2 className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
            {t("partners.title")}
          </h2>
          <p className="mt-4 text-gray-400">{t("partners.subtitle")}</p>
        </ScrollReveal>

        <div className="mt-16 grid gap-5 sm:gap-6 md:grid-cols-3">
          {Array.isArray(items) &&
            items.map((item, i) => (
              <ScrollReveal key={item.name} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.06] hover:shadow-[0_8px_40px_rgba(124,58,237,0.12)]">
                  {/* Gradient header */}
                  <div className={`h-2 bg-gradient-to-r ${gradients[i]}`} />

                  <div className="p-5 sm:p-6">
                    {/* Icon + Name */}
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
                        <span className="text-sm font-bold text-violet-400">
                          {item.name.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">{item.name}</h3>
                        <p className="text-xs text-violet-400/70">{item.industry}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-5 text-sm leading-relaxed text-gray-400">
                      {item.description}
                    </p>

                    {/* Metric */}
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 text-center">
                      <span className="block text-2xl font-bold text-violet-400 sm:text-3xl">
                        {item.metric}
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        {item.metricLabel}
                      </span>
                    </div>
                  </div>

                  {/* Glow */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-violet-500/0 blur-3xl transition-all duration-500 group-hover:bg-violet-500/10" />
                </div>
              </ScrollReveal>
            ))}
        </div>
      </div>
    </section>
  );
}

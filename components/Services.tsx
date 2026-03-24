"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useServiceDetail, type ServiceView } from "@/context/ServiceDetailContext";
import { useContact } from "@/context/ContactContext";
import ScrollReveal from "./animations/ScrollReveal";

const serviceKeys = ["productDev", "uxDesign", "fullstack", "qa", "cloud", "aiIntegration"] as const;

type ServiceKey = (typeof serviceKeys)[number];

const serviceIcons: Record<ServiceKey, React.ReactNode> = {
  productDev: (
    // Heroicon: RocketLaunch
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
  uxDesign: (
    // Heroicon: PaintBrush
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  fullstack: (
    // Heroicon: CodeBracket
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  qa: (
    // Heroicon: ShieldCheck
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  cloud: (
    // Heroicon: Cloud
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  ),
  aiIntegration: (
    // Heroicon: Sparkles
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
};

const serviceNumbers: Record<ServiceKey, string> = {
  productDev: "01",
  uxDesign: "02",
  fullstack: "03",
  qa: "04",
  cloud: "05",
  aiIntegration: "06",
};

// Bento grid class mappings per service
// Bento grid class mappings per service
// lg layout: row1 [productDev(2) + uxDesign(1)] | row2 [fullstack + qa + cloud] | row3 [aiIntegration(3)]
const gridClasses: Record<ServiceKey, string> = {
  productDev: "md:col-span-2 lg:col-span-2",
  uxDesign: "",
  fullstack: "",
  qa: "",
  cloud: "md:col-span-2 lg:col-span-1",
  aiIntegration: "md:col-span-2 lg:col-span-3",
};

const featuredKeys: ServiceKey[] = ["productDev", "aiIntegration"];

export default function Services() {
  const { t } = useLanguage();
  const { openServiceDetail } = useServiceDetail();
  const { openContact } = useContact();

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-4 py-1.5 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
              <span className="text-xs font-medium text-violet-400">{t("services.badge")}</span>
            </div>
          </div>
          <h2 className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl">
            {t("services.title")}
          </h2>
          <p className="mt-4 text-gray-400">{t("services.subtitle")}</p>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-4 md:gap-5 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceKeys.map((key, i) => {
            const isFeatured = featuredKeys.includes(key);
            const isProductDev = key === "productDev";
            const isAiIntegration = key === "aiIntegration";
            const tags: string[] = t(`services.items.${key}.tags`) || [];

            return (
              <ScrollReveal
                key={key}
                delay={i * 0.1}
                className={gridClasses[key]}
              >
                <div
                  onClick={() => openServiceDetail(key as ServiceView)}
                  className={`group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] p-5 sm:p-6 lg:p-8`}
                >
                  {/* Glow effect */}
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/5 blur-3xl transition-all duration-500 group-hover:bg-violet-500/10" />

                  {/* Background number watermark */}
                  <span className="pointer-events-none absolute right-4 top-2 select-none text-[5rem] font-bold leading-none text-white/[0.03]">
                    {serviceNumbers[key]}
                  </span>

                  {/* Featured accent lines */}
                  {isProductDev && (
                    <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-violet-500/60 via-purple-500/30 to-transparent" />
                  )}
                  {isAiIntegration && (
                    <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
                  )}

                  <div className="relative flex h-full flex-col">
                    {/* Icon badge */}
                    <div className="mb-4 inline-flex w-fit rounded-xl border border-violet-500/15 bg-violet-500/[0.07] p-3 text-violet-400">
                      {serviceIcons[key]}
                    </div>

                    {/* Title */}
                    <h3
                      className={`mb-3 font-semibold text-white ${isFeatured ? "text-lg sm:text-xl lg:text-2xl" : "text-base sm:text-lg"}`}
                    >
                      {t(`services.items.${key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="mb-8 text-xs leading-relaxed text-gray-400 flex-1 sm:mb-5 sm:text-sm">
                      {t(`services.items.${key}.description`)}
                    </p>

                    {/* Tags */}
                    {Array.isArray(tags) && tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="rounded-full border border-violet-500/15 bg-violet-500/[0.05] px-3 py-1 text-xs text-violet-400/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Explore hint */}
                  <span className="absolute bottom-3 right-4 flex items-center gap-1.5 text-xs font-medium text-violet-400/70 transition-all duration-300 group-hover:text-violet-400 sm:bottom-4 sm:right-6 sm:text-sm">
                    {t("services.explore")}
                    <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.6}>
          <div className="mt-14 flex justify-center">
            <button
              onClick={openContact}
              className="group/btn relative cursor-pointer overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.05] backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.08] hover:shadow-[0_8px_40px_rgba(124,58,237,0.12)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
              <span className="relative flex items-center gap-2 px-6 py-2.5 font-semibold text-white">
                {t("services.cta")}
                <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </span>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

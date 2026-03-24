"use client";

import { useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useContact } from "@/context/ContactContext";
import { usePortfolioDetail, type ProjectView } from "@/context/PortfolioDetailContext";
import ScrollReveal from "./animations/ScrollReveal";

const gradients = [
  "from-violet-500/20 to-purple-500/20",
  "from-purple-500/20 to-pink-500/20",
  "from-purple-500/20 to-emerald-500/20",
  "from-orange-500/20 to-red-500/20",
  "from-pink-500/20 to-rose-500/20",
  "from-indigo-500/20 to-violet-500/20",
];

const projectKeys: ProjectView[] = [
  "neuralCommerce",
  "mediScan",
  "autoFlow",
  "dataPulse",
  "designForge",
  "qualityShield",
];

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canHover = useRef(true);

  useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover)").matches;
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover.current) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!canHover.current) return;
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();
  const { openContact } = useContact();
  const { openPortfolioDetail } = usePortfolioDetail();
  const items = t("portfolio.items") as Array<{
    title: string;
    category: string;
    description: string;
  }>;

  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-4 py-1.5 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
              <span className="text-xs font-medium text-violet-400">{t("portfolio.badge")}</span>
            </div>
          </div>
          <h2 className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl">
            {t("portfolio.title")}
          </h2>
          <p className="mt-4 text-gray-400">{t("portfolio.subtitle")}</p>
        </ScrollReveal>

        <div className="mt-16 grid gap-4 sm:gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(items) &&
            items.slice(0, 3).map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <TiltCard>
                  <div
                    onClick={() => openPortfolioDetail(projectKeys[i])}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all hover:border-white/15 hover:shadow-[0_0_40px_rgba(139,92,246,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]"
                  >
                    {/* Gradient header */}
                    <div
                      className={`h-28 bg-gradient-to-br sm:h-36 md:h-40 lg:h-44 ${gradients[i % gradients.length]} flex items-center justify-center`}
                    >
                      <span className="text-3xl font-bold text-white/10 transition-all group-hover:text-white/20 group-hover:scale-110 sm:text-5xl">
                        {item.title?.[0] ?? ""}
                      </span>
                    </div>

                    <div className="p-4 sm:p-5 lg:p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="inline-block rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
                          {item.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-medium text-gray-500 transition-all group-hover:text-violet-400">
                          {t("services.explore")}
                          <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </span>
                      </div>
                      <h3 className="mb-2 text-base font-semibold text-white sm:text-lg lg:text-xl">
                        {item.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.5}>
          <div className="mt-14 flex justify-center">
            <button
              onClick={openContact}
              className="group/btn relative cursor-pointer overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.05] backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.08] hover:shadow-[0_8px_40px_rgba(124,58,237,0.12)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
              <span className="relative flex items-center gap-2 px-6 py-2.5 font-semibold text-white">
                {t("portfolio.cta")}
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

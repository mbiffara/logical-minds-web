"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { usePortfolioDetail, type ProjectView } from "@/context/PortfolioDetailContext";
import { useContact } from "@/context/ContactContext";
import { useLanguage } from "@/context/LanguageContext";
import { getTechIcon } from "@/lib/techIcons";

const projectKeys: ProjectView[] = [
  "neuralCommerce",
  "mediScan",
  "autoFlow",
  "dataPulse",
  "designForge",
  "qualityShield",
];

const categoryColors: Record<ProjectView, string> = {
  neuralCommerce: "from-violet-500 to-purple-500",
  mediScan: "from-emerald-500 to-teal-500",
  autoFlow: "from-orange-500 to-amber-500",
  dataPulse: "from-blue-500 to-cyan-500",
  designForge: "from-pink-500 to-rose-500",
  qualityShield: "from-indigo-500 to-violet-500",
};

interface ResultMetric {
  value: string;
  label: string;
}

export default function PortfolioDetailOverlay() {
  const { activeProject, closePortfolioDetail } = usePortfolioDetail();
  const { openContact } = useContact();
  const { t } = useLanguage();

  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isClosing = useRef(false);

  const handleSpotlight = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);

  const animateOpen = useCallback(() => {
    isClosing.current = false;
    requestAnimationFrame(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        overlayRef.current,
        { clipPath: "inset(0 0 100% 0)", opacity: 1 },
        { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power4.inOut" }
      );

      tl.fromTo(
        headerRef.current,
        { y: 40, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power4.out" },
        0.2
      );

      tl.fromTo(
        contentRef.current,
        { y: 30, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.45, ease: "power4.out" },
        0.35
      );
    });
  }, []);

  const animateClose = useCallback(() => {
    if (isClosing.current) return;
    isClosing.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        closePortfolioDetail();
        isClosing.current = false;
      },
    });

    tl.to(contentRef.current, { y: -20, opacity: 0, filter: "blur(8px)", duration: 0.3, ease: "power3.in" }, 0);
    tl.to(headerRef.current, { y: -30, opacity: 0, filter: "blur(8px)", duration: 0.3, ease: "power3.in" }, 0.05);
    tl.to(overlayRef.current, { clipPath: "inset(100% 0 0 0)", duration: 0.55, ease: "power4.inOut" }, 0.15);
  }, [closePortfolioDetail]);

  const handleCTA = useCallback(() => {
    animateClose();
    setTimeout(() => openContact(), 600);
  }, [animateClose, openContact]);

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
      animateOpen();
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeProject, animateOpen]);

  useEffect(() => {
    if (!activeProject) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") animateClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeProject, animateClose]);

  if (!activeProject) return null;

  const projectIndex = projectKeys.indexOf(activeProject);
  const projectName: string = (t("portfolio.items") as Array<{ title: string }>)?.[projectIndex]?.title ?? "";
  const projectCategory: string = (t("portfolio.items") as Array<{ category: string }>)?.[projectIndex]?.category ?? "";
  const subtitle: string = t(`portfolioDetail.items.${activeProject}.subtitle`);
  const challenge: string = t(`portfolioDetail.items.${activeProject}.challenge`);
  const solution: string = t(`portfolioDetail.items.${activeProject}.solution`);
  const results: ResultMetric[] = t(`portfolioDetail.items.${activeProject}.results`) || [];
  const techStack: string[] = t(`portfolioDetail.items.${activeProject}.techStack`) || [];
  const gradient = categoryColors[activeProject];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[55] flex flex-col overflow-y-auto opacity-0"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, rgba(124,58,237,0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(168,85,247,0.08) 0%, transparent 50%), rgba(5,5,10,0.97)",
      }}
    >
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Close button */}
      <button
        onClick={animateClose}
        className="fixed right-4 top-4 z-[60] flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-gray-400 backdrop-blur-lg transition-all hover:border-violet-500/30 hover:bg-white/[0.1] hover:text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] sm:right-6 sm:top-6"
        aria-label="Close overlay"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Content */}
      <div className="relative flex flex-1 flex-col px-4 pb-16 pt-20 sm:px-6 lg:px-8">

        <div className="mx-auto w-full max-w-6xl">
          {/* Header */}
          <div ref={headerRef} style={{ opacity: 0 }}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="mb-3 inline-block rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-1 text-xs font-medium text-gray-400 backdrop-blur-xl">
                  {projectCategory}
                </div>
                <h2 className={`bg-gradient-to-r ${gradient} bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl`}>
                  {projectName}
                </h2>
                <p className="mt-2 text-sm text-gray-400 sm:text-base lg:text-lg">{subtitle}</p>
              </div>
            </div>
          </div>

          <div ref={contentRef} className="mt-10" style={{ opacity: 0 }}>
            {/* Challenge & Solution */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Challenge */}
              <div
                onMouseMove={handleSpotlight}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.06] sm:p-5 lg:p-6"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(400px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(124,58,237,0.06), transparent 60%)",
                  }}
                />
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-500/[0.03] blur-3xl transition-all duration-700 group-hover:bg-violet-500/[0.08]" />
                <div className="relative">
                  <h3 className="flex items-center gap-2 text-base font-semibold text-white sm:text-lg">
                    <span className="h-px w-6 bg-violet-500/50" />
                    {t("portfolioDetail.challenge")}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-gray-400 sm:mt-4 sm:text-sm">{challenge}</p>
                </div>
              </div>

              {/* Solution */}
              <div
                onMouseMove={handleSpotlight}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.06] sm:p-5 lg:p-6"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(400px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(124,58,237,0.06), transparent 60%)",
                  }}
                />
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-500/[0.03] blur-3xl transition-all duration-700 group-hover:bg-violet-500/[0.08]" />
                <div className="relative">
                  <h3 className="flex items-center gap-2 text-base font-semibold text-white sm:text-lg">
                    <span className="h-px w-6 bg-violet-500/50" />
                    {t("portfolioDetail.solution")}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-gray-400 sm:mt-4 sm:text-sm">{solution}</p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mt-12">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <span className="h-px w-6 bg-violet-500/50" />
                {t("portfolioDetail.results")}
              </h3>

              <div className="mt-6 grid gap-3 sm:gap-4 lg:gap-6 sm:grid-cols-3">
                {Array.isArray(results) && results.map((metric: ResultMetric, i: number) => (
                  <div
                    key={i}
                    onMouseMove={handleSpotlight}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-center backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.06] sm:p-5 lg:p-6"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(400px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(124,58,237,0.06), transparent 60%)",
                      }}
                    />
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-500/[0.03] blur-3xl transition-all duration-700 group-hover:bg-violet-500/[0.08]" />
                    <div className="relative">
                      <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-2xl font-bold text-transparent sm:text-3xl lg:text-4xl`}>
                        {metric.value}
                      </span>
                      <p className="mt-2 text-sm text-gray-400">{metric.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mt-12">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <span className="h-px w-6 bg-violet-500/50" />
                {t("portfolioDetail.techStack")}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {Array.isArray(techStack) && techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-3.5 py-1.5 text-sm font-medium text-violet-300 transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/[0.12] hover:text-violet-200"
                  >
                    {getTechIcon(tech)}
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-14 flex justify-center">
              <button
                onClick={handleCTA}
                className="group/btn relative inline-flex cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-violet-500 transition-all duration-500 hover:from-violet-700 hover:to-violet-600 hover:shadow-[0_6px_24px_rgba(124,58,237,0.35)] hover:scale-[1.01] active:scale-[0.99]"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
                <span className="relative flex items-center gap-2 px-8 py-2.5 font-semibold text-white lg:px-10 lg:py-3">
                  {t("portfolioDetail.cta")}
                  <svg className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

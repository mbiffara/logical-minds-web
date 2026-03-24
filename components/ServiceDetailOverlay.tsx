"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useServiceDetail, type ServiceView } from "@/context/ServiceDetailContext";
import { useContact } from "@/context/ContactContext";
import { useLanguage } from "@/context/LanguageContext";
import { getTechIcon } from "@/lib/techIcons";

const serviceIcons: Record<ServiceView, React.ReactNode> = {
  productDev: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
  uxDesign: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  fullstack: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  qa: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  cloud: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  ),
  aiIntegration: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    </svg>
  ),
};

interface Deliverable {
  title: string;
  description: string;
}

export default function ServiceDetailOverlay() {
  const { activeService, closeServiceDetail } = useServiceDetail();
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
        closeServiceDetail();
        isClosing.current = false;
      },
    });

    tl.to(contentRef.current, { y: -20, opacity: 0, filter: "blur(8px)", duration: 0.3, ease: "power3.in" }, 0);
    tl.to(headerRef.current, { y: -30, opacity: 0, filter: "blur(8px)", duration: 0.3, ease: "power3.in" }, 0.05);
    tl.to(overlayRef.current, { clipPath: "inset(100% 0 0 0)", duration: 0.55, ease: "power4.inOut" }, 0.15);
  }, [closeServiceDetail]);

  const handleCTA = useCallback(() => {
    animateClose();
    setTimeout(() => openContact(), 600);
  }, [animateClose, openContact]);

  useEffect(() => {
    if (activeService) {
      document.body.style.overflow = "hidden";
      animateOpen();
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeService, animateOpen]);

  useEffect(() => {
    if (!activeService) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") animateClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeService, animateClose]);

  if (!activeService) return null;

  const serviceTitle: string = t(`services.items.${activeService}.title`);
  const serviceSubtitle: string = t(`serviceDetail.items.${activeService}.subtitle`);
  const deliverables: Deliverable[] = t(`serviceDetail.items.${activeService}.deliverables`) || [];
  const process: string[] = t(`serviceDetail.items.${activeService}.process`) || [];
  const techStack: string[] = t(`serviceDetail.items.${activeService}.techStack`) || [];

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
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/[0.1] text-violet-400 shadow-[0_0_25px_rgba(124,58,237,0.15)] sm:h-14 sm:w-14">
                {serviceIcons[activeService]}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  {serviceTitle}
                </h2>
                <p className="mt-1 text-sm text-gray-400 sm:text-base">{serviceSubtitle}</p>
              </div>
            </div>
          </div>

          <div ref={contentRef} className="mt-10" style={{ opacity: 0 }}>
            {/* Deliverables */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <span className="h-px w-6 bg-violet-500/50" />
                {t("serviceDetail.deliverables")}
              </h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.isArray(deliverables) && deliverables.map((item: Deliverable, i: number) => (
                  <div
                    key={i}
                    onMouseMove={handleSpotlight}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.06] sm:p-5 lg:p-6"
                  >
                    {/* Spotlight */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(400px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(124,58,237,0.06), transparent 60%)",
                      }}
                    />
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-500/[0.03] blur-3xl transition-all duration-700 group-hover:bg-violet-500/[0.08]" />

                    <div className="relative">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-violet-500/15 bg-violet-500/[0.07] text-sm font-bold text-violet-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className="font-semibold text-white">{item.title}</h4>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="mt-12">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <span className="h-px w-6 bg-violet-500/50" />
                {t("serviceDetail.process")}
              </h3>

              <div className="mt-6 flex flex-wrap gap-3">
                {Array.isArray(process) && process.map((step: string, i: number) => (
                  <div key={i} className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 backdrop-blur-xl">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-500/15 text-[10px] font-bold text-violet-400">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-300">{step}</span>
                    {i < process.length - 1 && (
                      <svg className="ml-1 hidden h-3 w-3 text-violet-500/40 sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mt-12">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <span className="h-px w-6 bg-violet-500/50" />
                {t("serviceDetail.techStack")}
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
                className="group/btn relative cursor-pointer overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.05] backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.08] hover:shadow-[0_8px_40px_rgba(124,58,237,0.12)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
                <span className="relative flex items-center gap-2 px-7 py-3 font-semibold text-white">
                  {t("serviceDetail.cta")}
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

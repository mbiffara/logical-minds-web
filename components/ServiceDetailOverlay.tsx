"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";
import { useServiceDetail, type ServiceView } from "@/context/ServiceDetailContext";
import { useContact } from "@/context/ContactContext";
import { useLanguage } from "@/context/LanguageContext";
import { getTechIcon } from "@/lib/techIcons";

/* ── Brand colors per group ───────────────────────────────── */
interface BrandColor {
  hex: string;
  rgb: string;
}

const brandColors: Record<ServiceView, BrandColor> = {
  logicalExperiences: { hex: "#227CFF", rgb: "34,124,255" },
  logicalDevelopment: { hex: "#FDA901", rgb: "253,169,1" },
  logicalCloud:       { hex: "#F50132", rgb: "245,1,50" },
  logicalTalents:     { hex: "#22AE48", rgb: "34,174,72" },
};

/* ── Tab mapping per group ────────────────────────────────── */
type SubService = "productDev" | "uxDesign" | "fullstack" | "qa" | "cloud" | "aiIntegration" | "staffAugmentation" | "recruitment" | "aiAgents";

const groupTabs: Record<ServiceView, { key: SubService; label: string; number: string }[]> = {
  logicalExperiences: [
    { key: "productDev", label: "Product Discovery", number: "01" },
    { key: "uxDesign", label: "UX/UI Design", number: "02" },
  ],
  logicalDevelopment: [
    { key: "fullstack", label: "Software Development", number: "01" },
    { key: "qa", label: "QA", number: "02" },
  ],
  logicalCloud: [
    { key: "cloud", label: "Cloud & Infrastructure", number: "01" },
    { key: "aiIntegration", label: "AI Integration", number: "02" },
  ],
  logicalTalents: [
    { key: "staffAugmentation", label: "Staff Augmentation", number: "01" },
    { key: "recruitment", label: "Recruitment", number: "02" },
    { key: "aiAgents", label: "AI Agents", number: "03" },
  ],
};

/* ── Group icons ──────────────────────────────────────────── */
const groupIcons: Record<ServiceView, React.ReactNode> = {
  logicalExperiences: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  logicalDevelopment: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  logicalCloud: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  ),
  logicalTalents: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
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

  const [activeTab, setActiveTab] = useState<SubService>("productDev");

  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isClosing = useRef(false);

  useEffect(() => {
    if (activeService) {
      setActiveTab(groupTabs[activeService][0].key);
    }
  }, [activeService]);

  const handleSpotlight = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);

  const animateOpen = useCallback(() => {
    isClosing.current = false;
    requestAnimationFrame(() => {
      const tl = gsap.timeline();
      tl.fromTo(overlayRef.current, { clipPath: "inset(0 0 100% 0)", opacity: 1 }, { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power4.inOut" });
      tl.fromTo(headerRef.current, { y: 40, opacity: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power4.out" }, 0.2);
      if (tabsRef.current) {
        tl.fromTo(Array.from(tabsRef.current.children), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.08, ease: "power3.out" }, 0.3);
      }
      tl.fromTo(contentRef.current, { y: 30, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.45, ease: "power4.out" }, 0.4);
    });
  }, []);

  const animateClose = useCallback(() => {
    if (isClosing.current) return;
    isClosing.current = true;
    const tl = gsap.timeline({ onComplete: () => { closeServiceDetail(); isClosing.current = false; } });
    tl.to(contentRef.current, { y: -20, opacity: 0, filter: "blur(8px)", duration: 0.3, ease: "power3.in" }, 0);
    if (tabsRef.current) {
      tl.to(Array.from(tabsRef.current.children), { y: -15, opacity: 0, duration: 0.25, stagger: 0.03, ease: "power3.in" }, 0);
    }
    tl.to(headerRef.current, { y: -30, opacity: 0, filter: "blur(8px)", duration: 0.3, ease: "power3.in" }, 0.05);
    tl.to(overlayRef.current, { clipPath: "inset(100% 0 0 0)", duration: 0.55, ease: "power4.inOut" }, 0.15);
  }, [closeServiceDetail]);

  const switchTab = useCallback(
    (tab: SubService) => {
      if (tab === activeTab || isClosing.current) return;
      gsap.to(contentRef.current, {
        opacity: 0, filter: "blur(4px)", duration: 0.25, ease: "power2.in",
        onComplete: () => {
          setActiveTab(tab);
          gsap.fromTo(contentRef.current, { opacity: 0, filter: "blur(4px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.3, ease: "power2.out" });
        },
      });
    },
    [activeTab]
  );

  const handleCTA = useCallback(() => {
    animateClose();
    setTimeout(() => openContact(), 600);
  }, [animateClose, openContact]);

  useEffect(() => {
    if (activeService) { document.body.style.overflow = "hidden"; animateOpen(); }
    else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [activeService, animateOpen]);

  useEffect(() => {
    if (!activeService) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") animateClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeService, animateClose]);

  if (!activeService) return null;

  const c = brandColors[activeService];
  const tabs = groupTabs[activeService];
  const groupTitle: string = t(`services.groups.${activeService}.title`);
  const groupPrefix: string = t(`services.groups.${activeService}.prefix`);
  const groupSubtitle: string = t(`services.groups.${activeService}.subtitle`);

  const deliverables: Deliverable[] = t(`serviceDetail.items.${activeTab}.deliverables`) || [];
  const process: string[] = t(`serviceDetail.items.${activeTab}.process`) || [];
  const techStack: string[] = t(`serviceDetail.items.${activeTab}.techStack`) || [];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[55] flex flex-col overflow-y-auto opacity-0"
      style={{
        background: `radial-gradient(ellipse at 30% 20%, rgba(${c.rgb}, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(${c.rgb}, 0.03) 0%, transparent 50%), #ffffff`,
      }}
    >
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(${c.rgb}, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(${c.rgb}, 0.08) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Close button */}
      <button
        onClick={animateClose}
        className="fixed right-4 top-4 z-[60] flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 shadow-sm transition-all hover:text-gray-600 sm:right-6 sm:top-6"
        style={{ ["--hover-border" as string]: `rgba(${c.rgb}, 0.3)` }}
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
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl border sm:h-14 sm:w-14"
                style={{
                  borderColor: `rgba(${c.rgb}, 0.25)`,
                  backgroundColor: `rgba(${c.rgb}, 0.07)`,
                  color: c.hex,
                  boxShadow: `0 0 25px rgba(${c.rgb}, 0.1)`,
                }}
              >
                {groupIcons[activeService]}
              </div>
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                  <span className="text-gray-400">{groupPrefix}</span>
                  <span style={{ color: c.hex }}>{groupTitle}</span>
                </h2>
                <p className="mt-1 text-sm text-gray-500 sm:text-base">{groupSubtitle}</p>
              </div>
            </div>
          </div>

          {/* Tab navigation */}
          <div ref={tabsRef} className="mt-8 flex gap-2 overflow-x-auto pb-1 sm:gap-3">
            {tabs.map((tab) => {
              const isActive = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  onClick={() => switchTab(tab.key)}
                  style={{
                    opacity: 0,
                    borderColor: isActive ? `rgba(${c.rgb}, 0.35)` : undefined,
                    backgroundColor: isActive ? `rgba(${c.rgb}, 0.07)` : undefined,
                    color: isActive ? c.hex : undefined,
                    boxShadow: isActive ? `0 0 20px rgba(${c.rgb}, 0.1)` : undefined,
                  }}
                  className={`flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 sm:px-5 sm:py-3 ${
                    !isActive ? "border-gray-200 bg-white text-gray-400 hover:text-gray-600" : ""
                  }`}
                >
                  <span
                    className="text-xs font-bold"
                    style={{ color: isActive ? c.hex : undefined }}
                  >
                    {tab.number}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div ref={contentRef} className="mt-10" style={{ opacity: 0 }}>

            {/* Deliverables */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <span className="h-px w-6" style={{ backgroundColor: `rgba(${c.rgb}, 0.4)` }} />
                {t("serviceDetail.deliverables")}
              </h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.isArray(deliverables) && deliverables.map((item: Deliverable, i: number) => (
                  <div
                    key={i}
                    onMouseMove={handleSpotlight}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-500 sm:p-5 lg:p-6"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `rgba(${c.rgb}, 0.3)`;
                      e.currentTarget.style.boxShadow = `0 8px 30px rgba(${c.rgb}, 0.08)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    {/* Spotlight */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(400px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(${c.rgb}, 0.04), transparent 60%)`,
                      }}
                    />
                    <div
                      className="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl transition-all duration-700"
                      style={{ background: `rgba(${c.rgb}, 0.04)` }}
                    />

                    <div className="relative">
                      <div className="mb-3 flex items-center gap-3">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm font-bold"
                          style={{
                            borderColor: `rgba(${c.rgb}, 0.25)`,
                            backgroundColor: `rgba(${c.rgb}, 0.07)`,
                            color: c.hex,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="mt-12">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <span className="h-px w-6" style={{ backgroundColor: `rgba(${c.rgb}, 0.4)` }} />
                {t("serviceDetail.process")}
              </h3>

              <div className="mt-6 flex flex-wrap gap-3">
                {Array.isArray(process) && process.map((step: string, i: number) => (
                  <div key={i} className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold"
                      style={{
                        backgroundColor: `rgba(${c.rgb}, 0.07)`,
                        color: c.hex,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-600">{step}</span>
                    {i < process.length - 1 && (
                      <svg className="ml-1 hidden h-3 w-3 sm:block" style={{ color: `rgba(${c.rgb}, 0.35)` }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mt-12">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <span className="h-px w-6" style={{ backgroundColor: `rgba(${c.rgb}, 0.4)` }} />
                {t("serviceDetail.techStack")}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {Array.isArray(techStack) && techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-300"
                    style={{
                      borderColor: `rgba(${c.rgb}, 0.2)`,
                      backgroundColor: `rgba(${c.rgb}, 0.05)`,
                      color: c.hex,
                    }}
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
                className="group/btn relative inline-flex cursor-pointer overflow-hidden rounded-full transition-all duration-500 hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  background: c.hex,
                  boxShadow: `0 6px 24px rgba(${c.rgb}, 0.35)`,
                }}
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
                <span className="relative flex items-center gap-2 px-8 py-2.5 font-semibold text-white lg:px-10 lg:py-3">
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

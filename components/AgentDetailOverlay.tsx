"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";
import { useAgentDetail, type AgentView } from "@/context/AgentDetailContext";
import { useLanguage } from "@/context/LanguageContext";
import SpecializedAgentsView from "./agent-detail/SpecializedAgentsView";
import OrchestrationView from "./agent-detail/OrchestrationView";
import EcosystemView from "./agent-detail/EcosystemView";

const tabs: { key: AgentView; number: string }[] = [
  { key: "specializedAgents", number: "01" },
  { key: "orchestration", number: "02" },
  { key: "ecosystem", number: "03" },
];

export default function AgentDetailOverlay() {
  const { activeView, closeAgentDetail } = useAgentDetail();
  const { t } = useLanguage();

  const [currentTab, setCurrentTab] = useState<AgentView>("specializedAgents");
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isClosing = useRef(false);

  // Sync tab with activeView when overlay opens
  useEffect(() => {
    if (activeView) {
      setCurrentTab(activeView);
    }
  }, [activeView]);

  const animateOpen = useCallback(() => {
    isClosing.current = false;
    requestAnimationFrame(() => {
      const tl = gsap.timeline();

      // Curtain reveal
      tl.fromTo(
        overlayRef.current,
        { clipPath: "inset(0 0 100% 0)", opacity: 1 },
        { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power4.inOut" }
      );

      // Header
      tl.fromTo(
        headerRef.current,
        { y: 40, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power4.out" },
        0.2
      );

      // Tab pills
      if (tabsRef.current) {
        const tabEls = tabsRef.current.children;
        tl.fromTo(
          Array.from(tabEls),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.08, ease: "power3.out" },
          0.3
        );
      }

      // Content area
      tl.fromTo(
        contentRef.current,
        { y: 30, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.45, ease: "power4.out" },
        0.4
      );
    });
  }, []);

  const animateClose = useCallback(() => {
    if (isClosing.current) return;
    isClosing.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        closeAgentDetail();
        isClosing.current = false;
      },
    });

    // Content + tabs out
    tl.to(contentRef.current, {
      y: -20,
      opacity: 0,
      filter: "blur(8px)",
      duration: 0.3,
      ease: "power3.in",
    }, 0);

    if (tabsRef.current) {
      tl.to(Array.from(tabsRef.current.children), {
        y: -15,
        opacity: 0,
        duration: 0.25,
        stagger: 0.03,
        ease: "power3.in",
      }, 0);
    }

    // Header out
    tl.to(headerRef.current, {
      y: -30,
      opacity: 0,
      filter: "blur(8px)",
      duration: 0.3,
      ease: "power3.in",
    }, 0.05);

    // Curtain close
    tl.to(overlayRef.current, {
      clipPath: "inset(100% 0 0 0)",
      duration: 0.55,
      ease: "power4.inOut",
    }, 0.15);
  }, [closeAgentDetail]);

  // Switch tab with crossfade
  const switchTab = useCallback(
    (tab: AgentView) => {
      if (tab === currentTab || isClosing.current) return;

      gsap.to(contentRef.current, {
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setCurrentTab(tab);
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, filter: "blur(4px)" },
            { opacity: 1, filter: "blur(0px)", duration: 0.3, ease: "power2.out" }
          );
        },
      });
    },
    [currentTab]
  );

  // Body scroll lock & open animation
  useEffect(() => {
    if (activeView) {
      document.body.style.overflow = "hidden";
      animateOpen();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeView, animateOpen]);

  // Escape key
  useEffect(() => {
    if (!activeView) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") animateClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeView, animateClose]);

  if (!activeView) return null;

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
        className="fixed right-6 top-6 z-[60] flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-gray-400 backdrop-blur-lg transition-all hover:border-violet-500/30 hover:bg-white/[0.1] hover:text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]"
        aria-label="Close overlay"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Content */}
      <div className="relative flex flex-1 flex-col px-4 pb-12 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          {/* Header */}
          <div ref={headerRef} style={{ opacity: 0 }}>
            <h2 className="bg-gradient-to-r from-white via-violet-200 to-purple-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl lg:text-4xl">
              {t("agentDetail.title")}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-gray-400 sm:text-base">
              {t("agentDetail.subtitle")}
            </p>
          </div>

          {/* Tab navigation */}
          <div ref={tabsRef} className="mt-8 flex gap-2 overflow-x-auto pb-1 sm:gap-3">
            {tabs.map((tab) => {
              const isActive = tab.key === currentTab;
              return (
                <button
                  key={tab.key}
                  onClick={() => switchTab(tab.key)}
                  style={{ opacity: 0 }}
                  className={`flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 sm:px-5 sm:py-3 ${
                    isActive
                      ? "border-violet-500/40 bg-violet-500/10 text-white shadow-[0_0_20px_rgba(124,58,237,0.12)]"
                      : "border-white/[0.08] bg-white/[0.03] text-gray-400 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <span className={`text-xs font-bold ${isActive ? "text-violet-400" : "text-gray-600"}`}>
                    {tab.number}
                  </span>
                  <span>{t(`agentDetail.tabs.${tab.key}`)}</span>
                </button>
              );
            })}
          </div>

          {/* Active view content */}
          <div ref={contentRef} className="mt-8" style={{ opacity: 0 }}>
            {currentTab === "specializedAgents" && <SpecializedAgentsView />}
            {currentTab === "orchestration" && <OrchestrationView />}
            {currentTab === "ecosystem" && <EcosystemView />}
          </div>
        </div>
      </div>
    </div>
  );
}

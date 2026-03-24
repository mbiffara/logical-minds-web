"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import gsap from "gsap";

import { useLanguage } from "@/context/LanguageContext";
import { teams } from "@/lib/dashboard-data";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const teamColorMap: Record<string, { bg: string; border: string; text: string; dot: string; pill: string; glow: string }> = {
  violet: {
    bg: "bg-violet-500/[0.08]",
    border: "border-violet-500/25",
    text: "text-violet-400",
    dot: "bg-violet-400",
    pill: "bg-violet-500/[0.12] text-violet-300 border-violet-500/20",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.15)]",
  },
  cyan: {
    bg: "bg-cyan-500/[0.08]",
    border: "border-cyan-500/25",
    text: "text-cyan-400",
    dot: "bg-cyan-400",
    pill: "bg-cyan-500/[0.12] text-cyan-300 border-cyan-500/20",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
  },
  amber: {
    bg: "bg-amber-500/[0.08]",
    border: "border-amber-500/25",
    text: "text-amber-400",
    dot: "bg-amber-400",
    pill: "bg-amber-500/[0.12] text-amber-300 border-amber-500/20",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
  },
  emerald: {
    bg: "bg-emerald-500/[0.08]",
    border: "border-emerald-500/25",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    pill: "bg-emerald-500/[0.12] text-emerald-300 border-emerald-500/20",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
  },
  pink: {
    bg: "bg-pink-500/[0.08]",
    border: "border-pink-500/25",
    text: "text-pink-400",
    dot: "bg-pink-400",
    pill: "bg-pink-500/[0.12] text-pink-300 border-pink-500/20",
    glow: "shadow-[0_0_20px_rgba(236,72,153,0.15)]",
  },
};

const teamInitials: Record<string, string> = {
  tech: "TC",
  marketing: "MK",
  sales: "SL",
  management: "MG",
  design: "DS",
};

interface DashboardTopBarProps {
  onMobileMenuToggle?: () => void;
}

export default function DashboardTopBar({ onMobileMenuToggle }: DashboardTopBarProps) {
  const { t } = useLanguage();
  const [clock, setClock] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const update = () => {
      setClock(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const openDrawer = useCallback(() => {
    setDrawerOpen(true);

    requestAnimationFrame(() => {
      if (tlRef.current) tlRef.current.kill();

      const tl = gsap.timeline();
      tlRef.current = tl;

      // 1. Overlay fade in
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // 2. Panel slide in from right
      tl.fromTo(
        panelRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power4.inOut" },
        0.05
      );

      // 3. Cards stagger in
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length) {
        tl.fromTo(
          cards,
          { y: 30, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.4,
            stagger: 0.06,
            ease: "power3.out",
          },
          0.25
        );
      }
    });
  }, []);

  const closeDrawer = useCallback(() => {
    if (tlRef.current) tlRef.current.kill();

    const tl = gsap.timeline({
      onComplete: () => setDrawerOpen(false),
    });
    tlRef.current = tl;

    // 1. Cards out
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length) {
      tl.to(cards, {
        y: 20,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.25,
        stagger: 0.03,
        ease: "power2.in",
      });
    }

    // 2. Panel slide out
    tl.to(
      panelRef.current,
      { x: "100%", duration: 0.4, ease: "power4.inOut" },
      cards.length ? 0.15 : 0
    );

    // 3. Overlay fade out
    tl.to(
      overlayRef.current,
      { opacity: 0, duration: 0.3, ease: "power2.in" },
      cards.length ? 0.2 : 0.1
    );
  }, []);

  return (
    <>
      <div className="sticky top-0 z-40 px-4 pt-4">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/[0.1] bg-white/[0.07] px-5 py-3 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(124,58,237,0.08),inset_0_1px_0_rgba(255,255,255,0.08)]">
          {/* Top highlight line */}
          <div className="pointer-events-none absolute inset-x-4 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <div className="flex items-center justify-between">
            {/* Left: hamburger (mobile) + logo + title + team badge */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Mobile menu toggle */}
              {onMobileMenuToggle && (
                <button
                  onClick={onMobileMenuToggle}
                  className="flex items-center justify-center rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/[0.06] hover:text-white lg:hidden"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>
              )}

              {/* Logo */}
              <Link href="/" className="shrink-0 transition-opacity duration-200 hover:opacity-80">
                <img
                  src="/logo-logical-minds.svg"
                  alt="Logical Minds"
                  width={120}
                  height={17}
                  className="h-auto w-[100px] sm:w-[120px]"
                />
              </Link>

              <div className="hidden h-5 w-px bg-white/[0.1] sm:block" />

              <h1 className="hidden bg-gradient-to-r from-white via-violet-200 to-purple-400 bg-clip-text text-sm font-bold text-transparent sm:block sm:text-base">
                {t("dashboard.topBar.title")}
              </h1>

              {/* Tech Team badge */}
              <span className="flex items-center gap-1.5 rounded-full border border-violet-500/25 bg-violet-500/[0.08] px-2.5 py-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-violet-400">
                  {t("dashboard.teams.tech.name")}
                </span>
              </span>

              {/* Team switcher button */}
              <button
                onClick={openDrawer}
                className="flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] p-1.5 text-gray-400 transition-all duration-200 hover:border-violet-500/30 hover:bg-violet-500/[0.08] hover:text-violet-300"
                title={t("dashboard.topBar.teamSwitcher")}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </button>
            </div>

            {/* Right: clock + language switcher */}
            <div className="flex items-center gap-4">
              {clock && (
                <span className="hidden font-mono text-xs text-gray-500 lg:block">
                  {clock}
                </span>
              )}
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Team switcher drawer — portaled to body to avoid overflow/transform clipping */}
      {drawerOpen && createPortal(
        <div className="fixed inset-0 z-[60] overflow-hidden">
          {/* Overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeDrawer}
            style={{ opacity: 0 }}
          />

          {/* Panel */}
          <div
            ref={panelRef}
            className="absolute right-0 top-0 h-full w-full max-w-md border-l border-white/[0.08] bg-[#0c0c14]/95 backdrop-blur-2xl shadow-[-8px_0_40px_rgba(0,0,0,0.5)]"
            style={{ transform: "translateX(100%)" }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
              <div>
                <h2 className="text-base font-bold text-white">{t("dashboard.topBar.allTeams")}</h2>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  {teams.length} {t("dashboard.topBar.allTeams").toLowerCase()}
                </p>
              </div>
              <button
                onClick={closeDrawer}
                className="rounded-lg border border-white/[0.08] p-2 text-gray-400 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Team cards */}
            <div className="overflow-y-auto px-6 py-5 space-y-3" style={{ maxHeight: "calc(100vh - 80px)" }}>
              {teams.map((team, i) => {
                const colors = teamColorMap[team.color] || teamColorMap.violet;
                const isActive = team.id === "tech";
                const initials = teamInitials[team.id] || "??";

                return (
                  <div
                    key={team.id}
                    ref={(el) => { cardsRef.current[i] = el!; }}
                    className={`group relative rounded-xl border p-4 transition-all duration-300 ${
                      isActive
                        ? `${colors.border} ${colors.bg} ${colors.glow}`
                        : "border-white/[0.06] bg-white/[0.03] hover:border-white/[0.1] hover:bg-white/[0.05]"
                    }`}
                    style={{ opacity: 0 }}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -top-px right-4 rounded-b-md bg-violet-500 px-2 py-0.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-white">
                          {t("dashboard.topBar.activeTeam")}
                        </span>
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      {/* Team icon */}
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${colors.border} ${colors.bg}`}>
                        <span className={`text-xs font-bold ${colors.text}`}>{initials}</span>
                      </div>

                      <div className="min-w-0 flex-1">
                        {/* Name + agent count */}
                        <div className="flex items-center justify-between">
                          <h3 className={`text-sm font-semibold ${isActive ? "text-white" : "text-gray-200"}`}>
                            {t(team.nameKey)}
                          </h3>
                          <span className={`text-[11px] font-medium ${colors.text}`}>
                            {team.agentCount} {t("dashboard.topBar.agents")}
                          </span>
                        </div>

                        {/* Stage pills */}
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {team.stageKeys.map((stageKey) => (
                            <span
                              key={stageKey}
                              className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-medium ${colors.pill}`}
                            >
                              {t(stageKey)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

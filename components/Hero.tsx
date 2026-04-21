"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useContact } from "@/context/ContactContext";
import gsap from "gsap";

export default function Hero() {
  const { t, language } = useLanguage();
  const { openContact } = useContact();

  const t3 = t("hero.t3") as string;

  return (
    <section className="relative flex min-h-[70vh] lg:min-h-[78vh] max-h-[860px] items-center overflow-hidden bg-white">
      {/* Static grid background with radial fade */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)",
          backgroundSize: "70px 40px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Radial fade to white */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,white_75%)]" />

      {/* Decorative shapes — hidden on mobile */}
      <div
        aria-hidden
        className="absolute pointer-events-none z-[2] hidden lg:block"
        style={{
          top: -60,
          right: -140,
          width: 560,
          height: 560,
          borderRadius: 72,
          background: "#7c3aed",
          opacity: 0.92,
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none z-[2] hidden lg:block"
        style={{
          top: 170,
          right: -40,
          width: 280,
          height: 280,
          borderRadius: 64,
          background: "#1a1a2e",
        }}
      />

      {/* Content — single column mobile, two columns desktop */}
      <div className="relative z-[10] mx-auto w-full max-w-[1360px] px-5 sm:px-8 pt-[110px] md:pt-[130px] lg:pt-[140px] pb-12 lg:pb-16 grid grid-cols-1 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-8 lg:gap-12 items-center">
        {/* Left — text content */}
        <div>
          {/* Overline badge */}
          <div className="mb-5 lg:mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] backdrop-blur-xl px-3 py-1.5 shadow-[0_0_20px_rgba(124,58,237,0.1)]">
            <svg className="h-3.5 w-3.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
            <span className="text-[10px] sm:text-xs text-violet-600 font-medium">{t("hero.badge") as string}</span>
          </div>

          {/* Headline */}
          <h1
            className="mb-0"
            style={{
              fontFamily: '"Alvar Essential", var(--font-sans), sans-serif',
              fontSize: "clamp(32px, 6.2vw, 82px)",
              fontWeight: 900,
              lineHeight: 0.94,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              textWrap: "balance",
              maxWidth: 820,
              color: "#1a1a2e",
            }}
          >
            {t("hero.t1") as string}
            <br />
            <span style={{ color: "#7c3aed" }}>
              {t("hero.t2") as string}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{
                  display: "inline-block",
                  width: "0.45em",
                  height: "0.45em",
                  marginLeft: "0.1em",
                  verticalAlign: "super",
                  animation: "sparkle-twinkle 3s ease-in-out infinite",
                }}
              >
                {/* 4-point sparkle */}
                <path d="M12 0L13.5 9.5L24 12L13.5 14.5L12 24L10.5 14.5L0 12L10.5 9.5Z" />
                {/* Small secondary sparkle */}
                <circle cx="20" cy="4" r="1.5" opacity="0.6" />
              </svg>
            </span>
            <br />
            {t3}
          </h1>

          {/* Subtitle */}
          <p
            className="text-gray-500"
            style={{
              fontSize: "clamp(14px, 2.5vw, 16px)",
              lineHeight: 1.5,
              maxWidth: 480,
              marginTop: 18,
              marginBottom: 24,
              fontWeight: 400,
            }}
          >
            {t("hero.subtitle") as string}<span className="font-semibold text-gray-800">{t("hero.subtitleBold") as string}</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={openContact}
              className="group/btn relative inline-flex w-full cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-violet-500 transition-all duration-500 hover:from-violet-700 hover:to-violet-600 hover:shadow-[0_6px_24px_rgba(124,58,237,0.35)] hover:scale-[1.01] active:scale-[0.99] sm:w-auto"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
              <span className="relative flex w-full items-center justify-center gap-2 px-5 py-2 text-sm font-semibold text-white sm:px-7 lg:px-8 lg:py-2.5">
                {t("hero.cta") as string}
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </span>
            </button>
            <a
              href="https://calendly.com/logicalminds/30-min?back=1&month=2026-04"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex w-full cursor-pointer overflow-hidden rounded-full border border-violet-300 bg-violet-500/[0.07] backdrop-blur-xl transition-all duration-500 hover:border-violet-400 hover:bg-violet-500/[0.12] hover:shadow-[0_0_24px_rgba(139,92,246,0.2)] sm:w-auto animate-[glow-pulse_3s_ease-in-out_infinite]"
            >
              <span className="relative flex w-full items-center justify-center gap-2 px-5 py-2 text-sm font-semibold text-violet-600 transition-all duration-500 sm:px-7 lg:px-8 lg:py-2.5">
                <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                {t("hero.ctaSecondary") as string}
              </span>
            </a>
          </div>

          {/* Scroll indicator — hidden on small mobile, compact on tablet */}
          <div
            className="mt-8 lg:mt-12 hidden sm:flex"
            style={{
              alignItems: "center",
              gap: 16,
              paddingTop: 20,
              borderTop: "1px solid #e5e7eb",
              fontFamily: "ui-monospace, monospace",
              fontSize: 11,
              color: "#9ca3af",
            }}
          >
            <div className="flex h-7 w-4 items-start justify-center rounded-full border-[1.5px] border-gray-300 p-[3px] shrink-0">
              <div className="h-1.5 w-[3px] animate-bounce rounded-full bg-gray-400" />
            </div>
            <span>scroll</span>
            <span style={{ display: "inline-block", width: 40, height: 1, background: "#d1d5db" }} />
            {(
              [
                { label: t("nav.about") as string, id: "about" },
                { label: t("nav.services") as string, id: "services" },
                { label: t("nav.portfolio") as string, id: "portfolio" },
                { label: t("nav.contact") as string, id: "contact" },
              ] as const
            ).map((item, i) => (
              <span key={item.id} className="flex items-center gap-3">
                {i > 0 && <span style={{ color: "#d1d5db" }}>&middot;</span>}
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.id === "contact") {
                      openContact();
                    } else {
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="hero-scroll-link"
                >
                  {item.label}
                </a>
              </span>
            ))}
          </div>
        </div>

        {/* Right — Gantt Chart (hidden on mobile, visible from md) */}
        <div className="hidden md:block" style={{ marginLeft: -120, marginRight: 0, marginTop: -16, transform: "scale(0.90)", transformOrigin: "top center" }}>
          <HeroGanttChart t={(key: string) => t(key) as string} />
        </div>
      </div>
    </section>
  );
}

/* ── Gantt chart data (moved from Roadmap) ──────────────── */

const ganttPhases = [
  { key: "discovery", color: "#6F2AE4", start: 1, end: 3, hasAI: true, icon: "search" },
  { key: "design", color: "#F50132", start: 3, end: 6, hasAI: true, icon: "palette" },
  { key: "development", color: "#227CFF", start: 4, end: 9, hasAI: true, icon: "code" },
  { key: "qa", color: "#22AE48", start: 8, end: 11, hasAI: false, icon: "beaker" },
  { key: "deploy", color: "#FDA901", start: 10, end: 12, hasAI: false, icon: "rocket" },
];

const milestones = [
  { week: 3, key: "scope" },
  { week: 6, key: "designApproved" },
  { week: 9, key: "beta" },
  { week: 12, key: "launch", isLaunch: true },
];

const TOTAL_WEEKS = 12;
const TODAY_WEEK = 4;
const GANTT_PHASE_DURATION = 4000;
const MONO = "ui-monospace, SFMono-Regular, monospace";

/* ── Phase icons ─────────────────────────────────────────── */
function GanttPhaseIcon({ type, size = 14 }: { type: string; size?: number }) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (type) {
    case "search": return <svg {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
    case "palette": return <svg {...props}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.75 1.5-1.5 0-.39-.15-.74-.39-1.04-.23-.29-.38-.63-.38-1.02 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.17-4.49-9.44-10-9.94z" /><circle cx="7.5" cy="11.5" r="1.5" fill="currentColor" /><circle cx="12" cy="7.5" r="1.5" fill="currentColor" /><circle cx="16.5" cy="11.5" r="1.5" fill="currentColor" /></svg>;
    case "code": return <svg {...props}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;
    case "beaker": return <svg {...props}><path d="M9 2h6M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" /></svg>;
    case "rocket": return <svg {...props}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>;
    default: return null;
  }
}

/* ── Gantt chart component (adapted for Hero — animations on mount, no ScrollTrigger) ── */
function HeroGanttChart({ t }: { t: (key: string) => string }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-cycle phases
  useEffect(() => {
    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / GANTT_PHASE_DURATION) * 100);
      setProgress(pct);
      if (pct >= 100) {
        setActivePhase((p) => (p + 1) % ganttPhases.length);
        setProgress(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 50);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [activePhase]);

  const handlePhaseClick = useCallback((idx: number) => {
    setActivePhase(idx);
    setProgress(0);
  }, []);

  // Animate on mount (no ScrollTrigger since Hero is above-fold)
  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;

    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(el.querySelectorAll(".week-num"), { opacity: 0, y: -10 }, {
      opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power3.out",
    })
    .fromTo(el.querySelectorAll(".gantt-bar"), { scaleX: 0, opacity: 0 }, {
      scaleX: 1, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out", transformOrigin: "left center",
    }, "-=0.3")
    .fromTo(el.querySelectorAll(".milestone"), { scale: 0, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.7)",
    }, "-=0.3")
    .fromTo(el.querySelector(".today-line"), { opacity: 0 }, {
      opacity: 1, duration: 0.6, ease: "power3.out",
    }, "-=0.2");

    return () => { tl.revert(); };
  }, []);

  const colWidth = `${100 / TOTAL_WEEKS}%`;
  const todayPos = `${((TODAY_WEEK - 0.5) / TOTAL_WEEKS) * 100}%`;
  const active = ganttPhases[activePhase];

  return (
    <div ref={chartRef} className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-2.5" style={{ fontFamily: MONO, fontSize: 10 }}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: active.color, boxShadow: `0 0 6px ${active.color}55` }} />
        <span className="font-bold text-gray-800 uppercase tracking-wider" style={{ fontSize: 9, letterSpacing: "0.08em" }}>{t("roadmap.ganttTitle")}</span>
        <span className="ml-auto text-gray-400" style={{ fontVariantNumeric: "tabular-nums" }}>
          {t(`roadmap.phases.${active.key}`)}
        </span>
      </div>

      {/* Phase tabs */}
      <div className="flex border-b border-gray-100" style={{ fontFamily: MONO, fontSize: 9.5 }}>
        {ganttPhases.map((phase, i) => (
          <button
            key={phase.key}
            onClick={() => handlePhaseClick(i)}
            className="flex flex-1 cursor-pointer items-center justify-center gap-1 py-2 transition-all duration-200"
            style={{
              background: i === activePhase ? "#fff" : "transparent",
              borderBottom: i === activePhase ? `2px solid ${phase.color}` : "2px solid transparent",
              color: i === activePhase ? phase.color : "#9ca3af",
              fontWeight: i === activePhase ? 600 : 400,
            }}
          >
            <GanttPhaseIcon type={phase.icon} size={10} />
            <span className="hidden sm:inline">{t(`roadmap.phases.${phase.key}`)}</span>
          </button>
        ))}
      </div>

      {/* Gantt bars */}
      <div style={{ padding: "16px 20px 8px" }}>
        {/* Week header */}
        <div className="flex" style={{ marginBottom: 6 }}>
          {Array.from({ length: TOTAL_WEEKS }, (_, i) => (
            <div key={i} className="week-num text-center" style={{ width: colWidth, fontFamily: MONO, fontSize: 9, fontWeight: 600, color: "#d1d5db", opacity: 0 }}>
              {i + 1}
            </div>
          ))}
        </div>

        {/* Phase rows */}
        <div className="relative">
          {/* Vertical grid lines */}
          {Array.from({ length: TOTAL_WEEKS + 1 }, (_, i) => (
            <div key={i} aria-hidden className="absolute top-0 bottom-0" style={{ left: `${(i / TOTAL_WEEKS) * 100}%`, width: 1, background: "rgba(0,0,0,0.04)" }} />
          ))}

          {/* Today line */}
          <div className="today-line absolute top-0 bottom-0 z-10" style={{ left: todayPos, width: 2, background: "#6F2AE4", opacity: 0 }}>
            <div className="absolute -top-4 -translate-x-1/2" style={{ left: 1, fontFamily: MONO, fontSize: 8, fontWeight: 600, color: "#6F2AE4", whiteSpace: "nowrap", background: "white", padding: "1px 5px", borderRadius: 3, border: "1px solid #6F2AE4" }}>
              {t("roadmap.today")}
            </div>
            <div className="absolute -top-0.5 -translate-x-1/2 animate-pulse" style={{ left: 1, width: 5, height: 5, borderRadius: "50%", background: "#6F2AE4" }} />
          </div>

          {ganttPhases.map((phase, idx) => {
            const left = `${((phase.start - 1) / TOTAL_WEEKS) * 100}%`;
            const width = `${((phase.end - phase.start + 1) / TOTAL_WEEKS) * 100}%`;
            const isActive = idx === activePhase;

            return (
              <div key={phase.key} className="relative flex items-center" style={{ height: 36 }}>
                <div
                  className="gantt-bar absolute flex cursor-pointer items-center gap-1 transition-all duration-300"
                  onClick={() => handlePhaseClick(idx)}
                  style={{
                    left, width,
                    height: isActive ? 26 : 22,
                    borderRadius: 6,
                    background: phase.color,
                    opacity: isActive ? 1 : 0.5,
                    padding: "0 8px",
                    transform: "scaleX(0)",
                    boxShadow: isActive ? `0 2px 12px ${phase.color}44` : "none",
                  }}
                >
                  <span style={{ flexShrink: 0, color: phase.key === "deploy" ? "#1C1C1C" : "rgba(255,255,255,0.9)" }}>
                    <GanttPhaseIcon type={phase.icon} size={11} />
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 600, fontFamily: MONO, color: phase.key === "deploy" ? "#1C1C1C" : "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {t(`roadmap.phases.${phase.key}`)}
                  </span>
                  {phase.hasAI && (
                    <span style={{ color: phase.key === "deploy" ? "#1C1C1C" : "rgba(255,255,255,0.7)", flexShrink: 0, marginLeft: "auto" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Milestones */}
          <div className="relative" style={{ height: 28 }}>
            {milestones.map((ms) => {
              const left = `${((ms.week - 0.5) / TOTAL_WEEKS) * 100}%`;
              return (
                <div key={ms.key} className="milestone absolute flex flex-col items-center" style={{ left, top: 2, transform: "translateX(-50%) scale(0)" }}>
                  <span style={{ fontSize: 12, color: ms.isLaunch ? "#22AE48" : "#6F2AE4", lineHeight: 1 }}>&#9670;</span>
                  <span style={{ fontFamily: MONO, fontSize: 8, fontWeight: 500, color: "#9ca3af", whiteSpace: "nowrap", marginTop: 1 }}>
                    {t(`roadmap.milestones.${ms.key}`)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: "#f3f4f6" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${active.color}, ${active.color}99)`, transition: "width 60ms linear" }} />
      </div>
      <div className="flex items-center gap-3 px-5 py-1.5" style={{ fontFamily: MONO, fontSize: 8.5, color: "#9ca3af" }}>
        <span>{activePhase + 1}/{ganttPhases.length}</span>
        <span>{t(`roadmap.phases.${active.key}`).toLowerCase()}</span>
        <span style={{ marginLeft: "auto" }}>auto</span>
      </div>
    </div>
  );
}

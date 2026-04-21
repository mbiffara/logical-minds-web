"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import ScrollReveal from "./animations/ScrollReveal";

/* ── Phase data for Product Mockup ──────────────────────── */
const PHASES = [
  { key: "discover", label: "Discover", color: "#6F2AE4", iconType: "search" },
  { key: "design", label: "Design", color: "#F50132", iconType: "palette" },
  { key: "develop", label: "Develop", color: "#227CFF", iconType: "code" },
  { key: "qa", label: "QA", color: "#22AE48", iconType: "beaker" },
  { key: "deploy", label: "Deploy", color: "#FDA901", iconType: "rocket" },
] as const;

const PHASE_DURATION = 5000;
const MONO = "ui-monospace, SFMono-Regular, monospace";

/* ── Phase icons ─────────────────────────────────────────── */
function PhaseIcon({ type, size = 11 }: { type: string; size?: number }) {
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

/* ── Product Mockup — interactive phase-cycling wireframe ── */
function ProductMockup() {
  const [activePhase, setActivePhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phaseKey, setPhaseKey] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / PHASE_DURATION) * 100);
      setProgress(pct);
      if (pct >= 100) {
        setActivePhase((p) => (p + 1) % PHASES.length);
        setPhaseKey((k) => k + 1);
        setProgress(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 50);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activePhase]);

  const handleTabClick = useCallback((idx: number) => {
    setActivePhase(idx);
    setPhaseKey((k) => k + 1);
    setProgress(0);
  }, []);

  const active = PHASES[activePhase];

  return (
    <div
      style={{
        position: "relative",
        background: "#fafafa",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "7px 12px",
          borderBottom: "1px solid #e5e7eb",
          fontFamily: MONO,
          fontSize: 10,
          color: "#6b7280",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: active.color,
            boxShadow: `0 0 6px ${active.color}55`,
            transition: "all 300ms ease",
          }}
        />
        <span>product.logicalminds.co</span>
        <span style={{ marginLeft: "auto", fontVariantNumeric: "tabular-nums", color: active.color, fontWeight: 600, transition: "color 300ms ease" }}>
          {active.label}
        </span>
      </div>

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #e5e7eb",
          fontFamily: MONO,
          fontSize: 9.5,
        }}
      >
        {PHASES.map((phase, i) => (
          <button
            key={phase.key}
            onClick={() => handleTabClick(i)}
            style={{
              flex: 1,
              padding: "8px 4px",
              minHeight: 36,
              background: i === activePhase ? "#fff" : "transparent",
              border: "none",
              borderBottom: i === activePhase ? `2px solid ${phase.color}` : "2px solid transparent",
              color: i === activePhase ? phase.color : "#9ca3af",
              fontWeight: i === activePhase ? 600 : 400,
              cursor: "pointer",
              fontFamily: MONO,
              fontSize: 9.5,
              transition: "all 200ms ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <PhaseIcon type={phase.iconType} size={10} />
            {phase.label}
          </button>
        ))}
      </div>

      {/* Phase content */}
      <div style={{ height: 196, padding: "10px 12px", position: "relative", overflow: "hidden" }}>
        <PhaseContent phase={activePhase} key={phaseKey} />
      </div>

      {/* Footer — progress bar + info */}
      <div style={{ borderTop: "1px solid #e5e7eb" }}>
        <div style={{ height: 2, background: "#f3f4f6" }}>
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${active.color}, ${active.color}99)`,
              transition: "width 60ms linear",
            }}
          />
        </div>
        <div
          style={{
            padding: "5px 12px",
            display: "flex",
            gap: 12,
            fontFamily: MONO,
            fontSize: 9,
            color: "#9ca3af",
          }}
        >
          <span>{activePhase + 1}/{PHASES.length}</span>
          <span style={{ color: active.color, fontWeight: 600 }}>{active.label.toLowerCase()}</span>
          <span style={{ marginLeft: "auto" }}>auto</span>
        </div>
      </div>
    </div>
  );
}

/* ── Phase content renderers ── */

function PhaseContent({ phase }: { phase: number }) {
  switch (phase) {
    case 0: return <DiscoverPhase />;
    case 1: return <DesignPhase />;
    case 2: return <DevelopPhase />;
    case 3: return <QAPhase />;
    case 4: return <DeployPhase />;
    default: return null;
  }
}

/* Phase 0 — Discover: Notion-style user stories board with live status transitions */
function DiscoverPhase() {
  const initial = [
    { id: "US-01", title: "User authentication flow", priority: "High", status: "Done" },
    { id: "US-02", title: "Dashboard analytics view", priority: "High", status: "In Progress" },
    { id: "US-03", title: "Notification preferences", priority: "Medium", status: "To Do" },
    { id: "US-04", title: "Export data to CSV", priority: "Low", status: "To Do" },
    { id: "US-05", title: "Role-based permissions", priority: "High", status: "To Do" },
    { id: "US-06", title: "Onboarding walkthrough", priority: "Medium", status: "To Do" },
  ];

  const [stories, setStories] = useState(initial);
  const [highlight, setHighlight] = useState<string | null>(null);

  // Animate status transitions
  useEffect(() => {
    const transitions = [
      { delay: 1200, id: "US-03", to: "In Progress" },
      { delay: 2400, id: "US-02", to: "Done" },
      { delay: 3600, id: "US-05", to: "In Progress" },
      { delay: 4200, id: "US-04", to: "In Progress" },
    ];

    const timers = transitions.map(({ delay, id, to }) =>
      setTimeout(() => {
        setHighlight(id);
        setStories((prev) => prev.map((s) => s.id === id ? { ...s, status: to } : s));
        setTimeout(() => setHighlight(null), 500);
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  const statusColor: Record<string, { bg: string; text: string }> = {
    "Done": { bg: "#dcfce7", text: "#16a34a" },
    "In Progress": { bg: "#ede9fe", text: "#7c3aed" },
    "To Do": { bg: "#f3f4f6", text: "#6b7280" },
  };

  const priorityColor: Record<string, string> = {
    High: "#ef4444",
    Medium: "#f59e0b",
    Low: "#9ca3af",
  };

  // Count by status
  const counts = stories.reduce((acc, s) => { acc[s.status] = (acc[s.status] || 0) + 1; return acc; }, {} as Record<string, number>);

  return (
    <div style={{ fontFamily: MONO, fontSize: 9.5, color: "#374151" }}>
      {/* Summary bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
        {(["Done", "In Progress", "To Do"] as const).map((status) => {
          const sc = statusColor[status];
          return (
            <div key={status} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: 2, background: sc.text, flexShrink: 0 }} />
              <span style={{ color: "#6b7280" }}>{status}</span>
              <span style={{ fontWeight: 700, color: sc.text }}>{counts[status] || 0}</span>
            </div>
          );
        })}
      </div>

      {/* Header row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "38px 1fr 52px 68px",
          gap: 6,
          padding: "0 2px 5px",
          borderBottom: "1px solid #e5e7eb",
          fontSize: 8,
          color: "#9ca3af",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        <span>ID</span>
        <span>Story</span>
        <span>Priority</span>
        <span>Status</span>
      </div>

      {/* Story rows */}
      {stories.map((s, i) => {
        const sc = statusColor[s.status];
        const isHighlighted = highlight === s.id;
        return (
          <div
            key={s.id}
            style={{
              display: "grid",
              gridTemplateColumns: "38px 1fr 52px 68px",
              gap: 6,
              padding: "4px 2px",
              borderBottom: "1px solid #f3f4f6",
              alignItems: "center",
              opacity: 0,
              animation: `fadeIn 250ms ease-out ${i * 80}ms forwards`,
              background: isHighlighted ? `${sc.bg}` : "transparent",
              transition: "background 400ms ease",
              borderRadius: 3,
            }}
          >
            <span style={{ color: "#9ca3af", fontSize: 8.5 }}>{s.id}</span>
            <span style={{ color: "#374151", fontSize: 9.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 8.5 }}>
              <span style={{ width: 5, height: 5, borderRadius: 999, background: priorityColor[s.priority], flexShrink: 0 }} />
              {s.priority}
            </span>
            <span
              style={{
                fontSize: 8.5,
                padding: "1px 5px",
                borderRadius: 3,
                background: sc.bg,
                color: sc.text,
                fontWeight: 500,
                textAlign: "center",
                whiteSpace: "nowrap",
                transition: "all 300ms ease",
              }}
            >
              {s.status}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* Phase 1 — Design: component tree + live preview canvas */
function DesignPhase() {
  const tree = [
    { name: "App", depth: 0, icon: "◇" },
    { name: "Header", depth: 1, icon: "□" },
    { name: "Hero", depth: 1, icon: "▣", active: true },
    { name: "Features", depth: 1, icon: "⊞" },
    { name: "Footer", depth: 1, icon: "□" },
  ];

  return (
    <div style={{ fontFamily: MONO, fontSize: 9.5, display: "flex", gap: 8, height: "100%" }}>
      {/* Component tree */}
      <div style={{ width: 90, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, padding: "6px 5px", flexShrink: 0 }}>
        <div style={{ fontSize: 8, color: "#9ca3af", marginBottom: 4, paddingLeft: 2, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Components</div>
        {tree.map((n, i) => (
          <div
            key={n.name}
            style={{
              padding: "3px 4px",
              paddingLeft: 4 + n.depth * 10,
              borderRadius: 3,
              marginBottom: 1,
              background: n.active ? "#7c3aed" : "transparent",
              color: n.active ? "#fff" : "#6b7280",
              fontSize: 9,
              display: "flex",
              alignItems: "center",
              gap: 4,
              opacity: 0,
              animation: `fadeIn 200ms ease-out ${i * 60}ms forwards`,
            }}
          >
            <span style={{ fontSize: 8, opacity: 0.7 }}>{n.icon}</span>
            {n.name}
          </div>
        ))}
      </div>

      {/* Preview canvas */}
      <div style={{ flex: 1, position: "relative", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, padding: 6, overflow: "hidden" }}>
        {/* Mini wireframe preview */}
        <div style={{ opacity: 0, animation: "fadeIn 400ms ease-out 200ms forwards" }}>
          {/* Nav bar */}
          <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 6, padding: "4px 6px", background: "#f9fafb", borderRadius: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: "#7c3aed" }} />
            <div style={{ flex: 1 }} />
            {[1, 2, 3].map((n) => <div key={n} style={{ width: 20, height: 3, borderRadius: 1, background: "#e5e7eb" }} />)}
          </div>
          {/* Hero block */}
          <div style={{ background: "linear-gradient(135deg, #ede9fe, #dbeafe)", borderRadius: 4, padding: "14px 8px", marginBottom: 6, textAlign: "center", border: "2px solid #7c3aed" }}>
            <div style={{ width: "60%", height: 4, background: "#7c3aed", borderRadius: 2, margin: "0 auto 6px" }} />
            <div style={{ width: "40%", height: 3, background: "#a78bfa", borderRadius: 2, margin: "0 auto 8px" }} />
            <div style={{ display: "inline-block", width: 30, height: 8, background: "#7c3aed", borderRadius: 3 }} />
          </div>
          {/* Feature cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
            {[0, 1, 2].map((n) => (
              <div key={n} style={{ background: "#f9fafb", borderRadius: 3, padding: "8px 4px", border: "1px solid #f3f4f6", opacity: 0, animation: `fadeIn 300ms ease-out ${500 + n * 120}ms forwards` }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: n === 0 ? "#e9e5f5" : n === 1 ? "#dbeafe" : "#fef3c7", margin: "0 auto 4px" }} />
                <div style={{ width: "80%", height: 2, background: "#e5e7eb", borderRadius: 1, margin: "0 auto" }} />
              </div>
            ))}
          </div>
        </div>
        {/* Floating cursor */}
        <div style={{ position: "absolute", top: 20, left: 20, pointerEvents: "none", animation: "cursorMove 4s ease-in-out infinite" }}>
          <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
            <path d="M1 1l5.5 14 2-5.5L14 7z" fill="#7c3aed" stroke="#fff" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* Phase 2 — Develop: split frontend/backend view */
function DevelopPhase() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= 5) return;
    const id = setTimeout(() => setStep((s) => s + 1), 500);
    return () => clearTimeout(id);
  }, [step]);

  return (
    <div style={{ fontFamily: MONO, fontSize: 9.5, display: "flex", gap: 6, height: "100%" }}>
      {/* Frontend panel */}
      <div style={{ flex: 1, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "4px 8px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 8, color: "#2563eb", fontWeight: 600 }}>FRONTEND</span>
          <span style={{ marginLeft: "auto", fontSize: 7.5, color: "#9ca3af" }}>React + Next.js</span>
        </div>
        <div style={{ padding: "5px 8px", fontSize: 8.5, lineHeight: 1.7 }}>
          {[
            { text: "<Dashboard />", c: "#2563eb" },
            { text: "  <StatsGrid data={api} />", c: "#374151" },
            { text: "  <ChartView live={true} />", c: "#374151" },
            { text: "  <UserTable paginated />", c: "#374151" },
          ].map((line, i) => (
            <div key={i} style={{ opacity: i <= step ? 1 : 0, transition: "opacity 200ms ease", color: line.c }}>{line.text}</div>
          ))}
        </div>
        {step >= 4 && (
          <div style={{ padding: "3px 8px", borderTop: "1px solid #f3f4f6", fontSize: 7.5, color: "#16a34a", opacity: 0, animation: "fadeIn 250ms ease-out forwards" }}>
            ✓ HMR · 48ms
          </div>
        )}
      </div>

      {/* Connection indicator */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, flexShrink: 0, width: 16 }}>
        <svg width="16" height="40" style={{ opacity: step >= 2 ? 1 : 0.2, transition: "opacity 300ms ease" }}>
          <line x1="8" y1="0" x2="8" y2="16" stroke="#7c3aed" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="8" cy="20" r="3" fill="#7c3aed" />
          <line x1="8" y1="24" x2="8" y2="40" stroke="#7c3aed" strokeWidth="1" strokeDasharray="3 2" />
        </svg>
        <span style={{ fontSize: 6.5, color: "#7c3aed", fontWeight: 600, writingMode: "vertical-lr" }}>API</span>
      </div>

      {/* Backend panel */}
      <div style={{ flex: 1, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "4px 8px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 8, color: "#16a34a", fontWeight: 600 }}>BACKEND</span>
          <span style={{ marginLeft: "auto", fontSize: 7.5, color: "#9ca3af" }}>Rails + Postgres</span>
        </div>
        <div style={{ padding: "5px 8px", fontSize: 8.5, lineHeight: 1.7 }}>
          {[
            { text: "GET /api/stats", c: "#16a34a" },
            { text: "POST /api/users", c: "#16a34a" },
            { text: "WS  /api/live", c: "#f59e0b" },
            { text: "GET /api/health ✓", c: "#9ca3af" },
          ].map((line, i) => (
            <div key={i} style={{ opacity: i <= step - 1 ? 1 : 0, transition: "opacity 200ms ease", color: line.c }}>{line.text}</div>
          ))}
        </div>
        {step >= 4 && (
          <div style={{ padding: "3px 8px", borderTop: "1px solid #f3f4f6", fontSize: 7.5, color: "#16a34a", opacity: 0, animation: "fadeIn 250ms ease-out 200ms forwards" }}>
            ✓ 4 routes · 12ms avg
          </div>
        )}
      </div>
    </div>
  );
}

/* Phase 3 — QA: test suite runner + coverage */
function QAPhase() {
  const [ran, setRan] = useState(0);

  const suites = [
    { name: "Auth flows", tests: 24, pass: 24, time: "1.8s" },
    { name: "API endpoints", tests: 38, pass: 38, time: "3.2s" },
    { name: "UI components", tests: 56, pass: 55, time: "4.1s" },
    { name: "E2E critical paths", tests: 12, pass: 12, time: "8.6s" },
    { name: "Performance", tests: 8, pass: 8, time: "2.4s" },
  ];

  useEffect(() => {
    if (ran >= suites.length) return;
    const id = setTimeout(() => setRan((r) => r + 1), 600);
    return () => clearTimeout(id);
  }, [ran, suites.length]);

  const totalTests = suites.reduce((a, s) => a + s.tests, 0);
  const totalPass = suites.slice(0, ran).reduce((a, s) => a + s.pass, 0);
  const totalAll = suites.slice(0, ran).reduce((a, s) => a + s.tests, 0);

  return (
    <div style={{ fontFamily: MONO, fontSize: 9.5 }}>
      {/* Header with tools */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 8, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Test Suites</span>
        <span style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
          {["Jest", "Cypress", "Lighthouse"].map((t) => (
            <span key={t} style={{ fontSize: 7.5, padding: "1px 5px", borderRadius: 3, background: "#f3f4f6", color: "#6b7280" }}>{t}</span>
          ))}
        </span>
      </div>

      {/* Suite rows */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, overflow: "hidden", marginBottom: 6 }}>
        {suites.map((s, i) => {
          const active = i < ran;
          const running = i === ran;
          const allPass = s.pass === s.tests;
          return (
            <div
              key={s.name}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 50px 40px",
                gap: 6,
                padding: "4px 8px",
                borderBottom: i < suites.length - 1 ? "1px solid #f3f4f6" : "none",
                alignItems: "center",
                fontSize: 8.5,
                opacity: active || running ? 1 : 0.3,
                transition: "opacity 250ms ease",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#374151" }}>
                <span style={{ color: active ? (allPass ? "#16a34a" : "#f59e0b") : running ? "#7c3aed" : "#d1d5db", fontSize: 10 }}>
                  {active ? (allPass ? "✓" : "!") : running ? "›" : "·"}
                </span>
                {s.name}
              </span>
              <span style={{ color: active ? "#16a34a" : "#9ca3af", textAlign: "right" }}>
                {active ? `${s.pass}/${s.tests}` : `0/${s.tests}`}
              </span>
              <span style={{ color: "#9ca3af", textAlign: "right" }}>{active ? s.time : "—"}</span>
            </div>
          );
        })}
      </div>

      {/* Coverage bar + summary */}
      {ran >= suites.length && (
        <div style={{ display: "flex", gap: 6, alignItems: "center", opacity: 0, animation: "fadeIn 300ms ease-out forwards" }}>
          <div style={{ flex: 1, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 5, padding: "4px 8px", fontSize: 8.5, color: "#16a34a", fontWeight: 500 }}>
            ✓ {totalPass}/{totalAll} passed · 97.1% coverage
          </div>
          <div style={{ background: totalPass < totalAll ? "#fefce8" : "#f0fdf4", border: `1px solid ${totalPass < totalAll ? "#fde68a" : "#bbf7d0"}`, borderRadius: 5, padding: "4px 8px", fontSize: 8.5, color: totalPass < totalAll ? "#f59e0b" : "#16a34a", fontWeight: 500 }}>
            {totalPass < totalAll ? "1 flaky" : "0 flaky"}
          </div>
        </div>
      )}
    </div>
  );
}

/* Phase 4 — Deploy: CI/CD pipeline with tech stack */
function DeployPhase() {
  const brandHex = "#7c3aed";
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= 5) return;
    const id = setTimeout(() => setStep((s) => s + 1), 700);
    return () => clearTimeout(id);
  }, [step]);

  const stages = [
    { label: "Build", status: step >= 1 ? "done" : step === 0 ? "running" : "pending" },
    { label: "Test", status: step >= 2 ? "done" : step === 1 ? "running" : "pending" },
    { label: "Docker", status: step >= 3 ? "done" : step === 2 ? "running" : "pending" },
    { label: "Deploy", status: step >= 4 ? "done" : step === 3 ? "running" : "pending" },
  ];

  return (
    <div style={{ fontFamily: MONO, fontSize: 9.5 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 8, opacity: 0, animation: "fadeIn 250ms ease-out forwards" }}>
        <span style={{ fontSize: 8, color: "#9ca3af" }}>CI/CD PIPELINE</span>
        <span style={{ fontSize: 8, color: step >= 4 ? "#16a34a" : brandHex, fontWeight: 700 }}>● {step >= 4 ? "DEPLOYED" : "RUNNING"}</span>
        <span style={{ fontSize: 8, color: "#9ca3af", marginLeft: "auto" }}>main</span>
      </div>
      {/* Pipeline stages */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 10 }}>
        {stages.map((s, i) => (
          <div key={s.label} style={{ display: "contents" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
              <div style={{
                width: 26, height: 26, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 400ms ease",
                background: s.status === "done" ? "#dcfce7" : s.status === "running" ? `${brandHex}22` : "#f3f4f6",
                border: `1.5px solid ${s.status === "done" ? "#16a34a" : s.status === "running" ? brandHex : "#e5e7eb"}`,
                ...(s.status === "running" ? { boxShadow: `0 0 8px ${brandHex}44` } : {}),
              }}>
                {s.status === "done" ? <span style={{ color: "#16a34a", fontSize: 9, fontWeight: 700 }}>✓</span> : s.status === "running" ? <span style={{ color: brandHex, fontSize: 9, animation: "blink 1s infinite" }}>●</span> : <span style={{ color: "#9ca3af", fontSize: 9 }}>○</span>}
              </div>
              <span style={{ fontSize: 7, fontWeight: 600, color: s.status === "done" ? "#16a34a" : s.status === "running" ? brandHex : "#9ca3af" }}>{s.label}</span>
            </div>
            {i < stages.length - 1 && (
              <div style={{ flex: 1, height: 1.5, minWidth: 12, background: s.status === "done" ? "#16a34a" : "#e5e7eb", transition: "background 400ms ease", marginBottom: 16 }} />
            )}
          </div>
        ))}
      </div>
      {/* Log output */}
      <div style={{ background: "#f9fafb", borderRadius: 6, border: "1px solid #e5e7eb", padding: "4px 6px", fontSize: 8, lineHeight: 1.8 }}>
        {[
          { text: "$ npm run build", c: brandHex, show: step >= 0 },
          { text: "  ✓ Compiled in 2.4s", c: "#16a34a", show: step >= 1 },
          { text: "$ docker push lm-api:latest", c: brandHex, show: step >= 2 },
          { text: "  ✓ Pushed sha256:a3b1…", c: "#16a34a", show: step >= 3 },
          { text: "$ kubectl rollout → deployed", c: "#16a34a", show: step >= 4 },
        ].map((l, i) => (
          <div key={i} style={{ color: l.c, opacity: l.show ? 1 : 0, transition: "opacity 200ms ease" }}>{l.text}</div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Roadmap section ────────────────────────────────── */
export default function Roadmap() {
  const { t } = useLanguage();

  return (
    <section id="roadmap" className="relative py-20 sm:py-28" style={{ background: "#fff" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1.2fr]">
          {/* Left column — text */}
          <ScrollReveal>
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] backdrop-blur-xl px-3 py-1.5 shadow-[0_0_20px_rgba(124,58,237,0.1)]">
                <svg className="h-3.5 w-3.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
                <span className="text-[10px] sm:text-xs text-violet-600 font-medium">{t("roadmap.badge")}</span>
              </div>

              {/* Heading */}
              <h2
                className="mt-5"
                style={{
                  fontFamily: '"Alvar Essential", var(--font-sans), sans-serif',
                  fontSize: "clamp(28px, 4vw, 44px)",
                  fontWeight: 900,
                  lineHeight: 0.94,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  color: "#1a1a2e",
                  textWrap: "balance",
                }}
              >
                {t("roadmap.title")}
              </h2>

              {/* Subtitle */}
              <p
                className="mt-4 text-sm leading-relaxed sm:text-base"
                style={{ color: "#6b7280", maxWidth: 540 }}
              >
                {t("roadmap.subtitlePre") as string}<span className="font-semibold text-gray-800">{t("roadmap.subtitleBold") as string}</span>{t("roadmap.subtitlePost") as string}
              </p>

              {/* Stats row */}
              <div className="mt-8 flex gap-6">
                {([
                  { key: "stat1", icon: <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg> },
                  { key: "stat2", icon: <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg> },
                  { key: "stat3", icon: <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg> },
                ] as const).map(({ key, icon }) => (
                  <div key={key}>
                    <div className="flex items-center gap-1.5" style={{ fontSize: 18, fontWeight: 800, color: "#6F2AE4", lineHeight: 1.2 }}>
                      {icon}
                      {t(`roadmap.${key}`)}
                    </div>
                    <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
                      {t(`roadmap.${key}Label`)}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/services/mvp-12-weeks"
                  className="group/btn relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-violet-500 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-500 hover:from-violet-700 hover:to-violet-600 hover:shadow-[0_6px_24px_rgba(124,58,237,0.35)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
                  <span className="relative flex items-center gap-1.5">
                    <img aria-hidden src="/assets/service-development.svg" alt="" style={{ width: 16, height: 16 }} />
                    <span>{t("roadmap.exploreMvp")}{" "}<span className="font-light opacity-85">Logical</span><span className="font-black">MVP</span></span>
                  </span>
                </Link>
                <a
                  href="https://calendly.com/logicalminds/30-min?back=1&month=2026-04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-violet-300 bg-violet-500/[0.07] backdrop-blur-xl px-6 py-2.5 text-sm font-semibold text-violet-600 transition-all duration-500 hover:border-violet-400 hover:bg-violet-500/[0.12] hover:shadow-[0_0_24px_rgba(139,92,246,0.2)]"
                >
                  <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  {t("roadmap.cta")}
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right column — Product Mockup */}
          <ScrollReveal delay={0.2}>
            <ProductMockup />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

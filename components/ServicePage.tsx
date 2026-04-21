"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useContact } from "@/context/ContactContext";
import { useLanguage } from "@/context/LanguageContext";
import { SERVICE_SLUGS, type ServiceView } from "@/lib/serviceRoutes";
import ScrollReveal from "./animations/ScrollReveal";
import {
  SiNextdotjs, SiNodedotjs, SiPostgresql, SiTypescript, SiVercel,
  SiPython, SiOpenai, SiFastapi, SiDocker, SiReact, SiMongodb,
  SiRedis, SiKubernetes, SiWebrtc, SiRubyonrails, SiAnthropic,
  SiCloudflare, SiCypress, SiDatadog, SiFigma, SiFramer, SiGithub,
  SiGithubactions, SiHotjar, SiJest, SiLangchain, SiLighthouse,
  SiLinear, SiNotion, SiPrisma, SiSentry, SiSlack, SiStorybook,
  SiSupabase, SiTailwindcss, SiTerraform, SiMiro, SiGoogleanalytics,
  SiGooglemeet, SiClaude, SiGsap, SiFirebase, SiTestinglibrary, SiGooglecloud, SiJira, SiTrello, SiToptal,
} from "react-icons/si";
import { FaAws, FaLinkedin, FaMicrosoft, FaChartBar, FaRoute, FaProjectDiagram, FaCogs } from "react-icons/fa";
import type { IconType } from "react-icons";

const techIconMap: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  PostgreSQL: SiPostgresql,
  TypeScript: SiTypescript,
  Vercel: SiVercel,
  Python: SiPython,
  OpenAI: SiOpenai,
  "OpenAI API": SiOpenai,
  FastAPI: SiFastapi,
  Docker: SiDocker,
  React: SiReact,
  "React Native": SiReact,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  Kubernetes: SiKubernetes,
  WebRTC: SiWebrtc,
  "Ruby on Rails": SiRubyonrails,
  AWS: FaAws,
  Anthropic: SiAnthropic,
  Cloudflare: SiCloudflare,
  Cypress: SiCypress,
  Datadog: SiDatadog,
  Figma: SiFigma,
  Framer: SiFramer,
  GitHub: SiGithub,
  "GitHub Actions": SiGithubactions,
  Hotjar: SiHotjar,
  Jest: SiJest,
  LangChain: SiLangchain,
  Lighthouse: SiLighthouse,
  Linear: SiLinear,
  LinkedIn: FaLinkedin,
  Notion: SiNotion,
  Prisma: SiPrisma,
  Sentry: SiSentry,
  Slack: SiSlack,
  Storybook: SiStorybook,
  Supabase: SiSupabase,
  "Tailwind CSS": SiTailwindcss,
  Terraform: SiTerraform,
  Miro: SiMiro,
  "Google Analytics": SiGoogleanalytics,
  "Google Meet": SiGooglemeet,
  Playwright: SiTestinglibrary,
  "AI Research Tools": SiClaude,
  "Microsoft Clarity": FaMicrosoft,
  Amplitude: FaChartBar,
  GSAP: SiGsap,
  "Framer Motion": SiReact,
  Firebase: SiFirebase,
  "Vercel AI SDK": SiVercel,
  Pinecone: FaProjectDiagram,
  n8n: FaCogs,
  OpenRouter: FaRoute,
  "Google Cloud": SiGooglecloud,
  "Microsoft Azure": FaMicrosoft,
  Jira: SiJira,
  Trello: SiTrello,
  Toptal: SiToptal,
};

/* ── Brand colors per group ───────────────────────────────── */
interface BrandColor {
  hex: string;
  rgb: string;
}

const brandColors: Record<ServiceView, BrandColor> = {
  logicalExperiences: { hex: "#227CFF", rgb: "34,124,255" },
  logicalDevelopment: { hex: "#8b5cf6", rgb: "139,92,246" },
  logicalCloud:       { hex: "#F50132", rgb: "245,1,50" },
  logicalTalents:     { hex: "#22AE48", rgb: "34,174,72" },
  logicalMvp:         { hex: "#f59e0b", rgb: "245,158,11" },
};

/* ── Tab mapping per group ────────────────────────────────── */
type SubService = "productDev" | "uxDesign" | "fullstack" | "qa" | "cloud" | "aiIntegration" | "staffAugmentation" | "recruitment" | "mvpDiscovery" | "mvpBuild" | "mvpLaunch" | "mvpProductDev" | "mvpUxDesign" | "mvpQa" | "mvpCloud";

interface TabDef {
  key: SubService;
  label: string;
  number: string;
  iconType: string;
}

const groupTabs: Record<ServiceView, TabDef[]> = {
  logicalExperiences: [
    { key: "productDev", label: "Product Discovery", number: "01", iconType: "search" },
    { key: "uxDesign", label: "UX/UI Design", number: "02", iconType: "palette" },
  ],
  logicalDevelopment: [
    { key: "fullstack", label: "Software Development", number: "01", iconType: "code" },
    { key: "qa", label: "QA", number: "02", iconType: "beaker" },
  ],
  logicalCloud: [
    { key: "cloud", label: "Cloud & Infrastructure", number: "01", iconType: "cloud" },
    { key: "aiIntegration", label: "AI Integration", number: "02", iconType: "sparkle" },
  ],
  logicalTalents: [
    { key: "staffAugmentation", label: "Staff Augmentation", number: "01", iconType: "users" },
    { key: "recruitment", label: "Recruitment", number: "02", iconType: "search" },
  ],
  logicalMvp: [
    { key: "mvpProductDev", label: "Product Discovery", number: "01", iconType: "search" },
    { key: "mvpUxDesign", label: "UX/UI Design", number: "02", iconType: "palette" },
    { key: "fullstack", label: "Software Development", number: "03", iconType: "code" },
    { key: "mvpQa", label: "QA", number: "04", iconType: "beaker" },
    { key: "mvpCloud", label: "Cloud Infrastructure", number: "05", iconType: "cloud" },
  ],
};

/* ── Group index & tag for hero overline ──────────────────── */
const groupIndex: Record<ServiceView, number> = {
  logicalExperiences: 1,
  logicalDevelopment: 2,
  logicalCloud: 3,
  logicalTalents: 4,
  logicalMvp: 5,
};

const groupTag: Record<ServiceView, string> = {
  logicalExperiences: "LM Experiences",
  logicalDevelopment: "LM Development",
  logicalCloud: "LM Cloud",
  logicalTalents: "LM Talents",
  logicalMvp: "LM MVP",
};

interface Deliverable {
  title: string;
  description: string;
}

/* ── Service brand SVGs ──────────────────────────────────── */
const serviceSvg: Record<ServiceView, string> = {
  logicalExperiences: "/assets/service-experiences.svg",
  logicalDevelopment: "/assets/service-development.svg",
  logicalCloud: "/assets/service-cloud.svg",
  logicalTalents: "/assets/service-talents.svg",
  logicalMvp: "/assets/service-development.svg",
};

/* ── Shared monospace font stack ──────────────────────────── */
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const PHASE_DURATION = 5000;

/* ── Tab icons (matching Roadmap phase icons) ─────────────── */
function TabIcon({ type, size = 11 }: { type: string; size?: number }) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (type) {
    case "search": return <svg {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
    case "palette": return <svg {...props}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.75 1.5-1.5 0-.39-.15-.74-.39-1.04-.23-.29-.38-.63-.38-1.02 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.17-4.49-9.44-10-9.94z" /><circle cx="7.5" cy="11.5" r="1.5" fill="currentColor" /><circle cx="12" cy="7.5" r="1.5" fill="currentColor" /><circle cx="16.5" cy="11.5" r="1.5" fill="currentColor" /></svg>;
    case "code": return <svg {...props}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;
    case "beaker": return <svg {...props}><path d="M9 2h6M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" /></svg>;
    case "rocket": return <svg {...props}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>;
    case "cloud": return <svg {...props}><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg>;
    case "sparkle": return <svg {...props}><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /><path d="M20 3v4" /><path d="M22 5h-4" /></svg>;
    case "users": return <svg {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "cpu": return <svg {...props}><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" /></svg>;
    default: return null;
  }
}

/* ── ServiceMockup — ProductMockup-style interactive preview ─ */
function ServiceMockup({ brandHex, tabs }: { brandHex: string; tabs: TabDef[] }) {
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
        setActivePhase((p) => (p + 1) % tabs.length);
        setPhaseKey((k) => k + 1);
        setProgress(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 50);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [activePhase, tabs.length]);

  const handleTabClick = useCallback((idx: number) => {
    setActivePhase(idx);
    setPhaseKey((k) => k + 1);
    setProgress(0);
  }, []);

  const active = tabs[activePhase];

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
            width: 6, height: 6, borderRadius: 999,
            background: brandHex,
            boxShadow: `0 0 6px ${brandHex}55`,
            transition: "all 300ms ease",
          }}
        />
        <span>service.logicalminds.co</span>
        <span style={{ marginLeft: "auto", fontVariantNumeric: "tabular-nums", color: brandHex, fontWeight: 600, transition: "color 300ms ease" }}>
          {active.label}
        </span>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", fontFamily: MONO, fontSize: 9.5 }}>
        {tabs.map((tab, i) => (
          <button
            key={tab.key}
            onClick={() => handleTabClick(i)}
            style={{
              flex: 1,
              padding: "6px 4px",
              background: i === activePhase ? "#fff" : "transparent",
              border: "none",
              borderBottom: i === activePhase ? `2px solid ${brandHex}` : "2px solid transparent",
              color: i === activePhase ? brandHex : "#9ca3af",
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
            <TabIcon type={tab.iconType} size={10} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Phase content */}
      <div style={{ height: 196, padding: "10px 12px", position: "relative", overflow: "hidden" }}>
        <MockupContent tabKey={active.key} brandHex={brandHex} key={phaseKey} />
      </div>

      {/* Footer — progress bar + info */}
      <div style={{ borderTop: "1px solid #e5e7eb" }}>
        <div style={{ height: 2, background: "#f3f4f6" }}>
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${brandHex}, ${brandHex}99)`,
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
          <span>{activePhase + 1}/{tabs.length}</span>
          <span style={{ color: brandHex, fontWeight: 600 }}>{active.label.toLowerCase()}</span>
          <span style={{ marginLeft: "auto" }}>auto</span>
        </div>
      </div>
    </div>
  );
}

/* ── Mockup content dispatcher ────────────────────────────── */
const contentTypeMap: Record<SubService, string> = {
  productDev: "board", uxDesign: "wireframe", fullstack: "code", qa: "tests",
  cloud: "terminal", aiIntegration: "pipeline", staffAugmentation: "team",
  recruitment: "hiring", mvpDiscovery: "board",
  mvpBuild: "code", mvpLaunch: "terminal",
  mvpProductDev: "board", mvpUxDesign: "wireframe", mvpQa: "tests", mvpCloud: "terminal",
};

function MockupContent({ tabKey, brandHex }: { tabKey: SubService; brandHex: string }) {
  const type = contentTypeMap[tabKey] || "board";
  switch (type) {
    case "board": return <BoardContent brandHex={brandHex} />;
    case "wireframe": return <WireframeContent brandHex={brandHex} />;
    case "code": return <CodeContent brandHex={brandHex} />;
    case "tests": return <TestsContent brandHex={brandHex} />;
    case "terminal": return <TerminalContent brandHex={brandHex} />;
    case "pipeline": return <PipelineContent brandHex={brandHex} />;
    case "team": return <TeamContent brandHex={brandHex} />;
    case "hiring": return <HiringContent brandHex={brandHex} />;
    default: return <BoardContent brandHex={brandHex} />;
  }
}

/* ── Board Content — Kanban-style list ────────────────────── */
function BoardContent({ brandHex }: { brandHex: string }) {
  const items = [
    { id: "US-01", title: "User authentication flow", status: "Done" },
    { id: "US-02", title: "Dashboard analytics view", status: "In Progress" },
    { id: "US-03", title: "Notification preferences", status: "To Do" },
    { id: "US-04", title: "Export data to CSV", status: "To Do" },
    { id: "US-05", title: "Role-based permissions", status: "In Progress" },
    { id: "US-06", title: "Onboarding walkthrough", status: "To Do" },
  ];
  const sc: Record<string, { bg: string; text: string }> = {
    Done: { bg: "#dcfce7", text: "#16a34a" },
    "In Progress": { bg: "#ede9fe", text: brandHex },
    "To Do": { bg: "#f3f4f6", text: "#6b7280" },
  };

  return (
    <div style={{ fontFamily: MONO, fontSize: 9.5, color: "#374151" }}>
      <div style={{ display: "grid", gridTemplateColumns: "38px 1fr 68px", gap: 6, padding: "0 2px 5px", borderBottom: "1px solid #e5e7eb", fontSize: 8, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        <span>ID</span><span>Story</span><span>Status</span>
      </div>
      {items.map((s, i) => {
        const c = sc[s.status];
        return (
          <div key={s.id} style={{ display: "grid", gridTemplateColumns: "38px 1fr 68px", gap: 6, padding: "4px 2px", borderBottom: "1px solid #f3f4f6", alignItems: "center", opacity: 0, animation: `fadeIn 250ms ease-out ${i * 80}ms forwards` }}>
            <span style={{ color: "#9ca3af", fontSize: 8.5 }}>{s.id}</span>
            <span style={{ color: "#374151", fontSize: 9.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</span>
            <span style={{ fontSize: 7.5, fontWeight: 600, padding: "2px 5px", borderRadius: 4, background: c.bg, color: c.text, textAlign: "center" }}>{s.status}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Wireframe Content — layout mockup ────────────────────── */
function WireframeContent({ brandHex }: { brandHex: string }) {
  return (
    <div style={{ fontFamily: MONO, fontSize: 9.5, position: "relative" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 8, opacity: 0, animation: "fadeIn 300ms ease-out forwards" }}>
        <div style={{ width: 48, height: 48, borderRadius: 8, background: `${brandHex}22`, border: `1px solid ${brandHex}33` }} />
        <div style={{ flex: 1 }}>
          <div style={{ height: 8, width: "70%", borderRadius: 4, background: "#e5e7eb", marginBottom: 6 }} />
          <div style={{ height: 6, width: "50%", borderRadius: 3, background: "#f3f4f6" }} />
          <div style={{ height: 6, width: "85%", borderRadius: 3, background: "#f3f4f6", marginTop: 4 }} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ borderRadius: 8, border: "1px solid #e5e7eb", padding: 8, background: "#fff", opacity: 0, animation: `fadeIn 300ms ease-out ${150 + i * 100}ms forwards` }}>
            <div style={{ height: 32, borderRadius: 6, background: i === 1 ? `${brandHex}15` : "#f9fafb", marginBottom: 6 }} />
            <div style={{ height: 5, width: "80%", borderRadius: 3, background: "#e5e7eb", marginBottom: 4 }} />
            <div style={{ height: 5, width: "55%", borderRadius: 3, background: "#f3f4f6" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 8, opacity: 0, animation: "fadeIn 300ms ease-out 600ms forwards" }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ flex: 1, height: 24, borderRadius: 6, background: i === 1 ? brandHex : "#e5e7eb", opacity: i === 1 ? 1 : 0.5 }} />
        ))}
      </div>
      {/* Floating design cursor */}
      <div style={{ position: "absolute", top: 30, left: 40, pointerEvents: "none", animation: "cursorMove 4s ease-in-out infinite", zIndex: 10 }}>
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
          <path d="M1 1l5.5 14 2-5.5L14 7z" fill={brandHex} stroke="#fff" strokeWidth="1" />
        </svg>
        <span style={{ display: "block", marginTop: 2, marginLeft: 10, fontSize: 7, fontWeight: 600, color: "#fff", background: brandHex, borderRadius: 3, padding: "1px 4px", whiteSpace: "nowrap" }}>Designer</span>
      </div>
    </div>
  );
}

/* ── Code Content — split frontend/backend view ──────────── */
function CodeContent({ brandHex }: { brandHex: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= 5) return;
    const id = setTimeout(() => setStep((s) => s + 1), 500);
    return () => clearTimeout(id);
  }, [step]);

  return (
    <div style={{ fontFamily: MONO, fontSize: 9.5, display: "flex", gap: 5, height: "100%" }}>
      {/* Frontend panel */}
      <div style={{ flex: 1, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ padding: "3px 6px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 7.5, color: brandHex, fontWeight: 600 }}>FRONTEND</span>
          <span style={{ marginLeft: "auto", fontSize: 7, color: "#9ca3af" }}>React + Next.js</span>
        </div>
        <div style={{ padding: "4px 6px", fontSize: 8, lineHeight: 1.7 }}>
          {[
            { text: "<Dashboard />", c: brandHex },
            { text: "  <StatsGrid data={api} />", c: "#374151" },
            { text: "  <ChartView live={true} />", c: "#374151" },
            { text: "  <UserTable paginated />", c: "#374151" },
          ].map((line, i) => (
            <div key={i} style={{ opacity: i <= step ? 1 : 0, transition: "opacity 200ms ease", color: line.c }}>{line.text}</div>
          ))}
        </div>
        {step >= 4 && (
          <div style={{ padding: "2px 6px", borderTop: "1px solid #f3f4f6", fontSize: 7, color: "#16a34a", opacity: 0, animation: "fadeIn 250ms ease-out forwards" }}>
            ✓ HMR · 48ms
          </div>
        )}
      </div>

      {/* Connection indicator */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, flexShrink: 0, width: 14 }}>
        <svg width="14" height="36" style={{ opacity: step >= 2 ? 1 : 0.2, transition: "opacity 300ms ease" }}>
          <line x1="7" y1="0" x2="7" y2="14" stroke={brandHex} strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="7" cy="18" r="2.5" fill={brandHex} />
          <line x1="7" y1="22" x2="7" y2="36" stroke={brandHex} strokeWidth="1" strokeDasharray="3 2" />
        </svg>
        <span style={{ fontSize: 6, color: brandHex, fontWeight: 600, writingMode: "vertical-lr" }}>API</span>
      </div>

      {/* Backend panel */}
      <div style={{ flex: 1, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ padding: "3px 6px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 7.5, color: "#16a34a", fontWeight: 600 }}>BACKEND</span>
          <span style={{ marginLeft: "auto", fontSize: 7, color: "#9ca3af" }}>Node + Postgres</span>
        </div>
        <div style={{ padding: "4px 6px", fontSize: 8, lineHeight: 1.7 }}>
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
          <div style={{ padding: "2px 6px", borderTop: "1px solid #f3f4f6", fontSize: 7, color: "#16a34a", opacity: 0, animation: "fadeIn 250ms ease-out 200ms forwards" }}>
            ✓ 4 routes · 12ms avg
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Tests Content — test results ─────────────────────────── */
function TestsContent({ brandHex }: { brandHex: string }) {
  const tests = [
    { name: "auth.login.test.ts", pass: 12, fail: 0 },
    { name: "api.users.test.ts", pass: 8, fail: 1 },
    { name: "dashboard.test.ts", pass: 15, fail: 0 },
    { name: "export.csv.test.ts", pass: 6, fail: 0 },
    { name: "permissions.test.ts", pass: 9, fail: 2 },
  ];
  const total = tests.reduce((a, t) => ({ p: a.p + t.pass, f: a.f + t.fail }), { p: 0, f: 0 });
  return (
    <div style={{ fontFamily: MONO, fontSize: 9.5, color: "#374151" }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 8, fontSize: 9, opacity: 0, animation: "fadeIn 250ms ease-out forwards" }}>
        <span style={{ color: "#16a34a", fontWeight: 700 }}>{total.p} passed</span>
        <span style={{ color: total.f > 0 ? "#ef4444" : "#9ca3af", fontWeight: 700 }}>{total.f} failed</span>
        <span style={{ color: brandHex, fontWeight: 600, marginLeft: "auto" }}>{Math.round((total.p / (total.p + total.f)) * 100)}% coverage</span>
      </div>
      {tests.map((t, i) => (
        <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 2px", borderBottom: "1px solid #f3f4f6", opacity: 0, animation: `fadeIn 200ms ease-out ${100 + i * 80}ms forwards` }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: t.fail > 0 ? "#fecaca" : "#dcfce7", border: `1px solid ${t.fail > 0 ? "#ef4444" : "#16a34a"}44`, flexShrink: 0 }} />
          <span style={{ flex: 1, fontSize: 9.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</span>
          <span style={{ fontSize: 8, color: "#16a34a", fontWeight: 600 }}>{t.pass}✓</span>
          {t.fail > 0 && <span style={{ fontSize: 8, color: "#ef4444", fontWeight: 600 }}>{t.fail}✗</span>}
        </div>
      ))}
    </div>
  );
}

/* ── Terminal Content — deploy commands ────────────────────── */
/* ── Terminal Content — CI/CD pipeline ────────────────────── */
function TerminalContent({ brandHex }: { brandHex: string }) {
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

/* ── Pipeline Content — AI node graph (Anthropic) ─────────── */
function PipelineContent({ brandHex }: { brandHex: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= 4) return;
    const id = setTimeout(() => setStep((s) => s + 1), 600);
    return () => clearTimeout(id);
  }, [step]);

  const nodeStyle = (active: boolean, highlight?: boolean): React.CSSProperties => ({
    padding: "5px 8px", borderRadius: 6, textAlign: "center" as const, fontSize: 8, fontWeight: 700,
    background: highlight ? `${brandHex}15` : "#fff",
    border: `1px solid ${active ? brandHex : "#e5e7eb"}`,
    transition: "all 400ms ease",
    ...(highlight && active ? { boxShadow: `0 0 10px ${brandHex}33` } : {}),
  });

  const lineStyle = (active: boolean): React.CSSProperties => ({
    flex: 1, height: 1.5, minWidth: 8,
    background: active ? brandHex : "#e5e7eb",
    transition: "background 400ms ease",
  });

  return (
    <div style={{ fontFamily: MONO, fontSize: 9.5 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 6, opacity: 0, animation: "fadeIn 250ms ease-out forwards" }}>
        <span style={{ fontSize: 8, color: "#9ca3af" }}>AI PIPELINE</span>
        <span style={{ fontSize: 8, color: step >= 4 ? "#16a34a" : brandHex, fontWeight: 700 }}>● {step >= 4 ? "COMPLETE" : "PROCESSING"}</span>
        <span style={{ fontSize: 8, color: "#9ca3af", marginLeft: "auto" }}>anthropic</span>
      </div>
      {/* Node graph — pure flex layout */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
        {/* Top row: Input → Prompt Engine → Response */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, opacity: 0, animation: "fadeIn 300ms ease-out 100ms forwards" }}>
          <div style={nodeStyle(step >= 0)}>
            <span style={{ color: "#374151" }}>→ User Input</span>
          </div>
          <div style={lineStyle(step >= 1)} />
          <div style={nodeStyle(step >= 1)}>
            <span style={{ color: "#374151" }}>⚙ Prompt Engine</span>
          </div>
          <div style={lineStyle(step >= 2)} />
          <div style={nodeStyle(step >= 3)}>
            <span style={{ color: step >= 3 ? "#16a34a" : "#374151" }}>✓ Response</span>
          </div>
        </div>
        {/* Bottom row: centered Claude API node with vertical connectors */}
        <div style={{ display: "flex", justifyContent: "center", opacity: 0, animation: "fadeIn 300ms ease-out 300ms forwards" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <svg width="2" height="8"><line x1="1" y1="0" x2="1" y2="8" stroke={step >= 1 ? brandHex : "#e5e7eb"} strokeWidth="1.5" strokeDasharray={step >= 1 ? "none" : "3 2"} style={{ transition: "stroke 400ms ease" }} /></svg>
            <div style={{ ...nodeStyle(step >= 1, true), padding: "6px 12px" }}>
              <span style={{ color: brandHex }}>◆ Claude API</span>
              <div style={{ fontSize: 7, color: "#9ca3af", fontWeight: 400, marginTop: 2 }}>claude-sonnet-4-5</div>
            </div>
            <svg width="2" height="8"><line x1="1" y1="0" x2="1" y2="8" stroke={step >= 2 ? brandHex : "#e5e7eb"} strokeWidth="1.5" strokeDasharray={step >= 2 ? "none" : "3 2"} style={{ transition: "stroke 400ms ease" }} /></svg>
          </div>
        </div>
      </div>
      {/* Status log */}
      <div style={{ background: "#f9fafb", borderRadius: 6, border: "1px solid #e5e7eb", padding: "4px 6px", fontSize: 7.5, lineHeight: 1.8 }}>
        {[
          { text: "→ Routing to Prompt Engine + Claude API", show: step >= 1 },
          { text: "◆ anthropic/claude-sonnet-4-5 · streaming", show: step >= 2 },
          { text: "✓ 847 tokens · 320ms · $0.003", show: step >= 3 },
        ].map((l, i) => (
          <div key={i} style={{ color: i === 2 ? "#16a34a" : i === 1 ? brandHex : "#6b7280", opacity: l.show ? 1 : 0, transition: "opacity 200ms ease" }}>{l.text}</div>
        ))}
      </div>
    </div>
  );
}

/* ── Team Content — people grid ───────────────────────────── */
/* ── Hiring Content — recruitment pipeline ────────────────── */
function HiringContent({ brandHex }: { brandHex: string }) {
  const candidates = [
    { name: "María López", role: "Senior Frontend", stage: "Offer", match: "96%", img: "https://randomuser.me/api/portraits/women/26.jpg" },
    { name: "James Park", role: "Full-Stack Dev", stage: "Interview", match: "91%", img: "https://randomuser.me/api/portraits/men/46.jpg" },
    { name: "Laura Méndez", role: "Backend Engineer", stage: "Technical", match: "88%", img: "https://randomuser.me/api/portraits/women/52.jpg" },
    { name: "David Kim", role: "DevOps Engineer", stage: "Screening", match: "84%", img: "https://randomuser.me/api/portraits/men/22.jpg" },
  ];
  const stageColors: Record<string, { bg: string; text: string }> = {
    Offer: { bg: "#dcfce7", text: "#16a34a" },
    Interview: { bg: "#ede9fe", text: brandHex },
    Technical: { bg: "#dbeafe", text: "#2563eb" },
    Screening: { bg: "#fef3c7", text: "#d97706" },
    Sourcing: { bg: "#f3f4f6", text: "#6b7280" },
  };
  return (
    <div style={{ fontFamily: MONO, fontSize: 9.5, color: "#374151" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 68px 40px", gap: 6, padding: "0 2px 5px", borderBottom: "1px solid #e5e7eb", fontSize: 8, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        <span>Candidate</span><span style={{ textAlign: "center" }}>Stage</span><span style={{ textAlign: "right" }}>Match</span>
      </div>
      {candidates.map((c, i) => {
        const sc = stageColors[c.stage];
        return (
          <div key={c.name} style={{ display: "grid", gridTemplateColumns: "1fr 68px 40px", gap: 6, padding: "4px 2px", borderBottom: "1px solid #f3f4f6", alignItems: "center", opacity: 0, animation: `fadeIn 250ms ease-out ${i * 80}ms forwards` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0 }}>
              <img src={c.img} alt={c.name} style={{ width: 18, height: 18, borderRadius: 999, objectFit: "cover", flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 9, fontWeight: 600, color: "#374151", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
                <div style={{ fontSize: 7.5, color: "#9ca3af" }}>{c.role}</div>
              </div>
            </div>
            <span style={{ fontSize: 7.5, fontWeight: 600, padding: "2px 0", borderRadius: 4, background: sc.bg, color: sc.text, textAlign: "center", display: "block" }}>{c.stage}</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: brandHex, textAlign: "right" }}>{c.match}</span>
          </div>
        );
      })}
    </div>
  );
}

function TeamContent({ brandHex }: { brandHex: string }) {
  const members = [
    { name: "Ana García", role: "Full-Stack", status: "online", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Carlos Ruiz", role: "ML Engineer", status: "online", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Sofia Chen", role: "UX Designer", status: "busy", img: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Liam Torres", role: "DevOps Lead", status: "online", img: "https://randomuser.me/api/portraits/men/75.jpg" },
  ];
  return (
    <div style={{ fontFamily: MONO, fontSize: 9.5 }}>
      <div style={{ fontSize: 8, color: "#9ca3af", marginBottom: 6, display: "flex", gap: 8, opacity: 0, animation: "fadeIn 250ms ease-out forwards" }}>
        <span>TEAM</span>
        <span style={{ color: brandHex, fontWeight: 700 }}>4 ACTIVE</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {members.map((m, i) => (
          <div key={m.name} style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 8, background: "#fff", opacity: 0, animation: `fadeIn 250ms ease-out ${100 + i * 100}ms forwards` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <div style={{ width: 22, height: 22, borderRadius: 999, position: "relative", overflow: "visible", flexShrink: 0 }}>
                <img src={m.img} alt={m.name} style={{ width: 22, height: 22, borderRadius: 999, objectFit: "cover" }} />
                <span style={{ position: "absolute", bottom: -1, right: -1, width: 6, height: 6, borderRadius: 999, background: m.status === "online" ? "#22c55e" : "#f59e0b", border: "1.5px solid #fff" }} />
              </div>
              <div>
                <div style={{ fontSize: 9, fontWeight: 600, color: "#374151" }}>{m.name}</div>
                <div style={{ fontSize: 7.5, color: "#9ca3af" }}>{m.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Homepage-style Gantt chart for MVP hero ───────────────── */
const ganttPhases = [
  { key: "discovery", color: "#6F2AE4", start: 1, end: 3, hasAI: true, icon: "search" },
  { key: "design", color: "#F50132", start: 3, end: 6, hasAI: true, icon: "palette" },
  { key: "development", color: "#227CFF", start: 4, end: 9, hasAI: true, icon: "code" },
  { key: "qa", color: "#22AE48", start: 8, end: 11, hasAI: false, icon: "beaker" },
  { key: "deploy", color: "#FDA901", start: 10, end: 12, hasAI: false, icon: "rocket" },
];

const ganttMilestones = [
  { week: 3, key: "scope" },
  { week: 6, key: "designApproved" },
  { week: 9, key: "beta" },
  { week: 12, key: "launch", isLaunch: true },
];

const TOTAL_WEEKS = 12;
const TODAY_WEEK = 4;
const GANTT_PHASE_DURATION = 4000;

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

function MvpHeroGantt() {
  const { t } = useLanguage();
  const chartRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    <div ref={chartRef} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-1.5" style={{ fontFamily: MONO, fontSize: 9 }}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: active.color, boxShadow: `0 0 6px ${active.color}55` }} />
        <span className="font-bold text-gray-800 uppercase tracking-wider" style={{ fontSize: 8, letterSpacing: "0.08em" }}>{t("roadmap.ganttTitle")}</span>
        <span className="ml-auto text-gray-400" style={{ fontVariantNumeric: "tabular-nums", fontSize: 8 }}>
          {t(`roadmap.phases.${active.key}`)}
        </span>
      </div>

      {/* Phase tabs */}
      <div className="flex border-b border-gray-100" style={{ fontFamily: MONO, fontSize: 8.5 }}>
        {ganttPhases.map((phase, i) => (
          <button
            key={phase.key}
            onClick={() => handlePhaseClick(i)}
            className="flex flex-1 cursor-pointer items-center justify-center gap-1 py-1.5 transition-all duration-200"
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
      <div style={{ padding: "12px 16px 6px" }}>
        {/* Week header */}
        <div className="flex" style={{ marginBottom: 4 }}>
          {Array.from({ length: TOTAL_WEEKS }, (_, i) => (
            <div key={i} className="week-num text-center" style={{ width: colWidth, fontFamily: MONO, fontSize: 8, fontWeight: 600, color: "#d1d5db", opacity: 0 }}>
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
            <div className="absolute -top-3.5 -translate-x-1/2" style={{ left: 1, fontFamily: MONO, fontSize: 7, fontWeight: 600, color: "#6F2AE4", whiteSpace: "nowrap", background: "white", padding: "1px 4px", borderRadius: 3, border: "1px solid #6F2AE4" }}>
              {t("roadmap.today")}
            </div>
            <div className="absolute -top-0.5 -translate-x-1/2 animate-pulse" style={{ left: 1, width: 4, height: 4, borderRadius: "50%", background: "#6F2AE4" }} />
          </div>

          {ganttPhases.map((phase, idx) => {
            const left = `${((phase.start - 1) / TOTAL_WEEKS) * 100}%`;
            const width = `${((phase.end - phase.start + 1) / TOTAL_WEEKS) * 100}%`;
            const isActive = idx === activePhase;
            return (
              <div key={phase.key} className="relative flex items-center" style={{ height: 30 }}>
                <div
                  className="gantt-bar absolute flex cursor-pointer items-center gap-1 transition-all duration-300"
                  onClick={() => handlePhaseClick(idx)}
                  style={{
                    left, width,
                    height: isActive ? 22 : 18,
                    borderRadius: 5,
                    background: phase.color,
                    opacity: isActive ? 1 : 0.5,
                    padding: "0 6px",
                    transform: "scaleX(0)",
                    boxShadow: isActive ? `0 2px 12px ${phase.color}44` : "none",
                  }}
                >
                  <span style={{ flexShrink: 0, color: phase.key === "deploy" ? "#1C1C1C" : "rgba(255,255,255,0.9)" }}>
                    <GanttPhaseIcon type={phase.icon} size={9} />
                  </span>
                  <span style={{ fontSize: 8.5, fontWeight: 600, fontFamily: MONO, color: phase.key === "deploy" ? "#1C1C1C" : "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {t(`roadmap.phases.${phase.key}`)}
                  </span>
                  {phase.hasAI && (
                    <span style={{ color: phase.key === "deploy" ? "#1C1C1C" : "rgba(255,255,255,0.7)", flexShrink: 0, marginLeft: "auto" }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Milestones */}
          <div className="relative" style={{ height: 22 }}>
            {ganttMilestones.map((ms) => {
              const left = `${((ms.week - 0.5) / TOTAL_WEEKS) * 100}%`;
              return (
                <div key={ms.key} className="milestone absolute flex flex-col items-center" style={{ left, top: 1, transform: "translateX(-50%) scale(0)" }}>
                  <span style={{ fontSize: 10, color: ms.isLaunch ? "#22AE48" : "#6F2AE4", lineHeight: 1 }}>&#9670;</span>
                  <span style={{ fontFamily: MONO, fontSize: 7, fontWeight: 500, color: "#9ca3af", whiteSpace: "nowrap", marginTop: 1 }}>
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
      <div className="flex items-center gap-3 px-4 py-1" style={{ fontFamily: MONO, fontSize: 8, color: "#9ca3af" }}>
        <span>{activePhase + 1}/{ganttPhases.length}</span>
        <span>{t(`roadmap.phases.${active.key}`).toLowerCase()}</span>
        <span style={{ marginLeft: "auto" }}>auto</span>
      </div>
    </div>
  );
}

/* ── Main ServicePage component ──────────────────────────── */
export default function ServicePage({ serviceKey }: { serviceKey: ServiceView }) {
  const { openContact } = useContact();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<SubService>(groupTabs[serviceKey][0].key);

  const handleSpotlight = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);

  const c = brandColors[serviceKey];
  const tabs = groupTabs[serviceKey];

  const deliverables: Deliverable[] = t(`serviceDetail.items.${activeTab}.deliverables`) || [];
  const process: string[] = t(`serviceDetail.items.${activeTab}.process`) || [];
  const techStack: string[] = t(`serviceDetail.items.${activeTab}.techStack`) || [];

  return (
    <div className="min-h-screen" style={{ background: "#ffffff" }}>
      {/* Hero section — full width colored bg */}
      <section
        className="relative overflow-hidden px-5 pb-14 pt-24 sm:px-8 sm:pb-16 sm:pt-28 md:px-10 md:pb-20 md:pt-32"
        style={{ background: c.hex, color: "#fff" }}
      >
        {/* Decorative blob 1 */}
        <div aria-hidden="true" className="absolute -right-20 -top-16 hidden h-72 w-72 rounded-[48px] sm:block sm:h-96 sm:w-96 md:-right-36 md:-top-28 md:h-[520px] md:w-[520px] md:rounded-[72px]" style={{ background: "rgba(0,0,0,0.16)" }} />
        {/* Decorative blob 2 */}
        <div aria-hidden="true" className="absolute right-12 top-20 hidden h-32 w-32 rounded-[36px] sm:block sm:right-24 sm:h-40 sm:w-40 md:right-[180px] md:top-20 md:h-[220px] md:w-[220px] md:rounded-[56px]" style={{ background: "rgba(255,255,255,0.16)" }} />
        {/* Brand SVG watermark */}
        <img
          aria-hidden
          src={serviceSvg[serviceKey]}
          alt=""
          className="pointer-events-none absolute hidden sm:block"
          style={{ right: 60, bottom: 20, width: 180, height: 180, opacity: 0.08 }}
        />

        <div className="relative mx-auto max-w-6xl">
          {/* Back link */}
          <ScrollReveal>
            <Link
              href="/#services"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
            </Link>
          </ScrollReveal>

          <div className={`grid grid-cols-1 gap-8 lg:gap-12 ${serviceKey === "logicalMvp" ? "items-start lg:grid-cols-[0.85fr_1.15fr]" : "items-end lg:grid-cols-[1.1fr_1fr]"}`}>
            {/* Text column */}
            <ScrollReveal>
              <div>
                <p className="mb-4 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] sm:mb-5" style={{ color: "rgba(255,255,255,0.85)" }}>
                  <img aria-hidden src={serviceSvg[serviceKey]} alt="" style={{ width: 18, height: 18, opacity: 0.9 }} />
                  <span className="mr-2.5">0{groupIndex[serviceKey]}/05</span>
                  {groupTag[serviceKey]}
                </p>

                <h1
                  className="m-0 max-w-[860px] leading-[0.97] tracking-tight"
                  style={{
                    fontFamily: '"Alvar Essential", var(--font-sans), sans-serif',
                    fontSize: "clamp(28px, 4.5vw, 64px)",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    color: "#fff",
                    textTransform: "uppercase",
                  }}
                >
                  {t(`services.groups.${serviceKey}.hero`).split("\n").map((line: string, i: number) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </h1>

                <p className="mt-5 max-w-xl text-[15px] leading-relaxed sm:mt-6 sm:max-w-[640px] sm:text-base md:text-[17px]" style={{ color: "rgba(255,255,255,0.9)" }}>
                  {t(`serviceDetail.items.${activeTab}.subtitle`)}
                </p>
              </div>
            </ScrollReveal>

            {/* Preview column — desktop only */}
            <ScrollReveal delay={0.2}>
              <div className="hidden lg:block">
                {serviceKey === "logicalMvp" ? (
                  <MvpHeroGantt />
                ) : (
                  <ServiceMockup brandHex={c.hex} tabs={tabs} />
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Content below hero */}
      <div className="px-5 pb-20 pt-10 sm:px-8 md:px-10">
        <div className="mx-auto w-full max-w-6xl">

          {/* Tab navigation */}
          <ScrollReveal>
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1 sm:gap-3">
              {tabs.map((tab) => {
                const isActive = tab.key === activeTab;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      borderColor: isActive ? `rgba(${c.rgb}, 0.35)` : undefined,
                      backgroundColor: isActive ? `rgba(${c.rgb}, 0.07)` : undefined,
                      color: isActive ? c.hex : undefined,
                      boxShadow: isActive ? `0 0 20px rgba(${c.rgb}, 0.1)` : undefined,
                    }}
                    className={`flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 sm:px-5 sm:py-3 ${
                      !isActive ? "border-gray-200 bg-white text-gray-400 hover:text-gray-600" : ""
                    }`}
                  >
                    <TabIcon type={tab.iconType} size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Tab content */}
          <div className="mt-10">

            {/* Deliverables */}
            <ScrollReveal>
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
            </ScrollReveal>

            {/* Process */}
            <ScrollReveal>
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
            </ScrollReveal>

            {/* Tech Stack */}
            <ScrollReveal>
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
                      {techIconMap[tech] && (() => { const Icon = techIconMap[tech]; return <Icon className="h-3.5 w-3.5" />; })()}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </div>

      {/* Bottom: CTA + Next Service navigation */}
      {(() => {
        const serviceOrder: ServiceView[] = ["logicalExperiences", "logicalDevelopment", "logicalCloud", "logicalTalents", "logicalMvp"];
        const currentIdx = serviceOrder.indexOf(serviceKey);
        const nextKey = serviceOrder[(currentIdx + 1) % serviceOrder.length];
        const nc = brandColors[nextKey];
        const nextTag = groupTag[nextKey];
        const nextHero: string = t(`services.groups.${nextKey}.hero`);
        const nextSvg = serviceSvg[nextKey];

        return (
          <ScrollReveal>
            <div className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 md:px-10">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* CTA card */}
                <div
                  className="flex flex-col justify-between gap-8 rounded-2xl border border-gray-200 bg-white p-7 sm:p-9"
                >
                  <div>
                    <p
                      className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em]"
                      style={{ color: "#9ca3af", fontFamily: MONO }}
                    >
                      {t("serviceDetail.cta")}
                    </p>
                    <h3
                      style={{
                        fontFamily: '"Alvar Essential", var(--font-sans), sans-serif',
                        fontSize: "clamp(22px, 3vw, 32px)",
                        fontWeight: 900,
                        letterSpacing: "-0.02em",
                        color: "#1a1a2e",
                        lineHeight: 1.05,
                        textTransform: "uppercase",
                        margin: 0,
                        maxWidth: 320,
                      }}
                    >
                      {t("closingCta.headline")}
                    </h3>
                  </div>
                  <button
                    onClick={() => openContact()}
                    className="group/btn relative inline-flex w-fit cursor-pointer overflow-hidden rounded-full transition-all duration-500 hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                      background: c.hex,
                      boxShadow: `0 6px 24px rgba(${c.rgb}, 0.35)`,
                    }}
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
                    <span className="relative flex items-center gap-2 px-7 py-2.5 text-sm font-semibold text-white sm:px-8 sm:py-3">
                      {t("serviceDetail.cta")}
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </span>
                  </button>
                </div>

                {/* Next service card */}
                <Link
                  href={`/services/${SERVICE_SLUGS[nextKey]}`}
                  className="group/next relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 transition-transform duration-300 hover:scale-[1.01] sm:p-9"
                  style={{ background: nc.hex, color: "#fff", minHeight: 220 }}
                >
                  {/* Decorative SVG watermark */}
                  <img
                    aria-hidden
                    src={nextSvg}
                    alt=""
                    className="pointer-events-none absolute opacity-[0.12]"
                    style={{ right: 24, top: 24, width: 80, height: 80 }}
                  />

                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: "rgba(255,255,255,0.75)", fontFamily: MONO }}
                  >
                    Next Service
                  </p>

                  <div>
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                      style={{ color: "rgba(255,255,255,0.8)" }}
                    >
                      {nextTag}
                    </p>
                    <h3
                      className="mt-2"
                      style={{
                        fontFamily: '"Alvar Essential", var(--font-sans), sans-serif',
                        fontSize: "clamp(22px, 3vw, 36px)",
                        fontWeight: 900,
                        letterSpacing: "-0.02em",
                        color: "#fff",
                        lineHeight: 1.05,
                        textTransform: "uppercase",
                        margin: 0,
                        marginTop: 8,
                      }}
                    >
                      {nextHero}
                    </h3>
                    <div className="mt-3 flex items-center gap-2 text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                      <span>{t("services.explore")}</span>
                      <svg
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover/next:translate-x-1"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        );
      })()}

      {/* fadeIn keyframe for mockup content */}
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

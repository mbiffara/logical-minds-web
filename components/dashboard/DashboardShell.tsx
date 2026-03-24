"use client";

import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import gsap from "gsap";
import type { AgentData } from "@/lib/dashboard-data";
import {
  generateAgents,
  generateGlobalStats,
  generatePipeline,
  generateActivityLog,
  generateIntegrationCategories,
  generateCapabilities,
} from "@/lib/dashboard-data";
import DashboardTopBar from "./DashboardTopBar";
import HeroStats from "./HeroStats";
import DashboardSidebar from "./DashboardSidebar";
import AgentDetailView from "./AgentDetailView";
import DashboardOverview from "./DashboardOverview";
import OrchestrationPanel from "./OrchestrationPanel";
import ActivityFeed from "./ActivityFeed";
import EcosystemQuickActions from "./EcosystemQuickActions";

export default function DashboardShell() {
  const shellRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // State
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Generate data once
  const agents = useMemo(() => generateAgents(), []);
  const productManager = useMemo(() => agents.find((a) => a.id === "product-manager") ?? null, [agents]);
  const stats = useMemo(() => generateGlobalStats(agents), [agents]);
  const pipeline = useMemo(() => generatePipeline(agents), [agents]);
  const activityLog = useMemo(() => generateActivityLog(), []);
  const integrationCategories = useMemo(() => generateIntegrationCategories(), []);
  const capabilities = useMemo(() => generateCapabilities(), []);

  const handleSelectAgent = useCallback((agent: AgentData) => {
    setSelectedAgent(agent);
  }, []);

  const handleSelectOverview = useCallback(() => {
    setSelectedAgent(null);
  }, []);

  const handleMobileClose = useCallback(() => {
    setMobileSidebarOpen(false);
  }, []);

  // Master GSAP entry timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Background fade in
      if (bgRef.current) {
        tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0);
      }

      // TopBar slides from top
      if (topBarRef.current) {
        tl.fromTo(
          topBarRef.current,
          { y: -40, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power4.out" },
          0.1
        );
      }

      // Hero stat cards stagger in
      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll("[data-stat-card]");
        tl.fromTo(
          Array.from(cards),
          { y: 40, opacity: 0, filter: "blur(6px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, stagger: 0.08, ease: "power3.out" },
          0.3
        );
      }

      // Main content fade in
      if (mainContentRef.current) {
        tl.fromTo(
          mainContentRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          0.6
        );
      }
    }, shellRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={shellRef} className="relative min-h-screen overflow-x-hidden">
      {/* Background */}
      <div
        ref={bgRef}
        className="pointer-events-none fixed inset-0"
        style={{
          opacity: 0,
          background:
            "radial-gradient(ellipse at 20% 10%, rgba(124,58,237,0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 50%), #0a0a0f",
        }}
      />

      {/* Grid texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Grain texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Top Bar */}
        <div ref={topBarRef} style={{ opacity: 0 }}>
          <DashboardTopBar onMobileMenuToggle={() => setMobileSidebarOpen((v) => !v)} />
        </div>

        {/* Hero Stats */}
        <div ref={statsRef} className="mx-auto max-w-6xl px-4 pt-8">
          <HeroStats stats={stats} />
        </div>

        {/* Sidebar + Main Layout */}
        <div ref={mainContentRef} style={{ opacity: 0 }} className="mx-auto max-w-6xl px-4 pt-8">
          <div className="flex gap-6">
            {/* Sidebar */}
            <DashboardSidebar
              pipeline={pipeline}
              productManager={productManager}
              selectedAgentId={selectedAgent?.id ?? null}
              onSelectAgent={handleSelectAgent}
              onSelectOverview={handleSelectOverview}
              isOverview={selectedAgent === null}
              mobileOpen={mobileSidebarOpen}
              onMobileClose={handleMobileClose}
            />

            {/* Main content area */}
            <main className="min-w-0 flex-1">
              {/* Agent Detail or Overview */}
              {selectedAgent ? (
                <AgentDetailView
                  agent={selectedAgent}
                  activityEntries={activityLog}
                />
              ) : (
                <DashboardOverview
                  agents={agents}
                  pipeline={pipeline}
                  onSelectAgent={handleSelectAgent}
                />
              )}

              {/* Orchestration Hub */}
              <div className="mt-8">
                <OrchestrationPanel categories={integrationCategories} />
              </div>

              {/* Activity Feed */}
              <div className="mt-8">
                <ActivityFeed initialEntries={activityLog} />
              </div>

              {/* Ecosystem Quick Actions */}
              <div className="mt-8">
                <EcosystemQuickActions capabilities={capabilities} />
              </div>

              {/* Bottom spacing */}
              <div className="h-20" />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

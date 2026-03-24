"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import { useContact } from "@/context/ContactContext";
import ScrollReveal from "./animations/ScrollReveal";
import SplitText from "./animations/SplitText";
import BlurText from "./animations/BlurText";
import Prisma from "./animations/Prisma";
import Aurora from "./animations/Aurora";
import Particles from "./animations/Particles";
import FloatingLines from "./animations/FloatingLines";
import SectionDivider from "./SectionDivider";

/* ─── Week timeline data ─── */
const weekKeys = ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8"] as const;

const weekAgentCounts = [3, 4, 3, 6, 6, 4, 5, 4];

/* ─── Deliverables icons (Heroicons outline) ─── */
const deliverableKeys = ["app", "design", "api", "cicd", "monitoring"] as const;

const deliverableIcons: Record<string, React.ReactNode> = {
  app: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
    </svg>
  ),
  design: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
    </svg>
  ),
  api: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  ),
  cicd: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
    </svg>
  ),
  monitoring: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  ),
};

/* ─── Bento grid classes for deliverables ─── */
const deliverableGridClasses: Record<string, string> = {
  app: "md:col-span-2 lg:col-span-2",
  design: "",
  api: "",
  cicd: "",
  monitoring: "md:col-span-2 lg:col-span-1",
};

/* ─── Value prop icons ─── */
const valueIcons: Record<string, React.ReactNode> = {
  agents: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
  ),
  collaboration: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  ),
  production: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    </svg>
  ),
};

const valueCardKeys = ["agents", "collaboration", "production"] as const;

export default function MvpLanding() {
  const { t } = useLanguage();
  const { openContact } = useContact();

  /* ─── GSAP entry animation refs ─── */
  const shellRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Background fades in
      if (bgRef.current) {
        tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0);
      }

      // Badge
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { y: 20, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" },
          0.2
        );
      }

      // Headline
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          0.35
        );
      }

      // Price
      if (priceRef.current) {
        tl.fromTo(
          priceRef.current,
          { y: 15, opacity: 0, filter: "blur(6px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" },
          0.5
        );
      }

      // Subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          0.65
        );
      }

      // CTAs
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          0.8
        );
      }
    }, shellRef);

    return () => ctx.revert();
  }, []);

  const handleSpotlight = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    },
    []
  );

  const scrollToProcess = () => {
    document.getElementById("mvp-timeline")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={shellRef}>
      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — Hero
      ═══════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Ambient background */}
        <div ref={bgRef} className="pointer-events-none absolute inset-0" style={{ opacity: 0 }}>
          {/* Prisma light refraction effect */}
          <Prisma
            colors={["#7c3aed", "#a855f7", "#c084fc", "#e879f9", "#818cf8", "#6366f1"]}
            speed={0.8}
            opacity={0.1}
          />

          {/* Aurora ambient glow layer */}
          <Aurora
            colors={["#7c3aed", "#a855f7", "#4f46e5", "#7c3aed"]}
            speed={0.6}
            className="opacity-60"
          />

          {/* Radial ambient blurs */}
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/[0.05] blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-purple-500/[0.04] blur-[100px]" />
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.04] blur-[150px]" />

          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Grain texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Bottom gradient fade to base bg */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-32 text-center sm:px-6 lg:px-8">
          {/* Badge */}
          <div ref={badgeRef} className="flex justify-center" style={{ opacity: 0 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-4 py-2 shadow-[0_0_20px_rgba(124,58,237,0.1)] backdrop-blur-xl">
              <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
              <span className="text-sm font-medium text-violet-400">
                {t("mvp.hero.badge")}
              </span>
            </div>
          </div>

          {/* Headline */}
          <div ref={headlineRef} className="mt-8" style={{ opacity: 0 }}>
            <SplitText
              text={t("mvp.hero.headline1")}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
              splitType="words"
              delay={0.4}
            />
            <br />
            <SplitText
              text={t("mvp.hero.headline2")}
              className="hero-gradient-text text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              splitType="words"
              delay={0.7}
            />
          </div>

          {/* Price */}
          <div ref={priceRef} className="mt-5 flex justify-center" style={{ opacity: 0 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2 backdrop-blur-xl">
              <span className="text-lg font-bold tracking-tight text-white sm:text-xl md:text-2xl">
                {t("mvp.hero.price")}
              </span>
            </span>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} style={{ opacity: 0 }}>
            <BlurText
              text={t("mvp.hero.subtitle")}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg"
              delay={0.8}
            />
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ opacity: 0 }}>
            <button
              onClick={openContact}
              className="group/btn relative inline-flex w-full cursor-pointer overflow-hidden rounded-full border border-white/[0.1] bg-white/[0.05] backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.08] hover:shadow-[0_8px_40px_rgba(124,58,237,0.12)] sm:w-auto"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
              <span className="relative flex items-center justify-center gap-2 px-6 py-2.5 text-base font-semibold text-white sm:px-8 lg:px-10 lg:py-3">
                {t("mvp.hero.cta")}
                <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </span>
            </button>
            <button
              onClick={scrollToProcess}
              className="group/btn relative inline-flex w-full cursor-pointer overflow-hidden rounded-full border border-white/[0.1] bg-white/[0.05] backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.08] hover:shadow-[0_8px_40px_rgba(124,58,237,0.12)] sm:w-auto"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
              <span className="relative flex items-center justify-center gap-2 px-6 py-2.5 text-base font-semibold text-white sm:px-8 lg:px-10 lg:py-3">
                {t("mvp.hero.ctaSecondary")}
              </span>
            </button>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — Value Proposition
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        {/* Particles network background */}
        <div className="pointer-events-none absolute inset-0">
          <Particles
            count={50}
            colors={["#7c3aed", "#a855f7", "#8b5cf6"]}
            maxRadius={1.5}
            speed={0.2}
            connectionDistance={120}
            connectionOpacity={0.1}
            className="absolute inset-0"
            style={{ opacity: 0.5 }}
          />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <ScrollReveal>
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-4 py-2 shadow-[0_0_20px_rgba(124,58,237,0.1)] backdrop-blur-xl">
                <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
                <span className="text-sm font-medium text-violet-400">
                  {t("mvp.value.badge")}
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {t("mvp.value.title")}
            </h2>
          </ScrollReveal>

          <BlurText
            text={t("mvp.value.subtitle")}
            className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-gray-400 sm:text-lg"
            delay={0.25}
          />

          {/* 3-column cards */}
          <div className="mt-16 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 lg:gap-6">
            {valueCardKeys.map((key, i) => (
              <ScrollReveal key={key} delay={0.2 + i * 0.15}>
                <div
                  onMouseMove={handleSpotlight}
                  className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(124,58,237,0.12)] sm:p-8"
                >
                  {/* Spotlight */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(400px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(124,58,237,0.06), transparent 60%)",
                    }}
                  />

                  {/* Corner glow */}
                  <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-violet-500/[0.03] blur-3xl transition-all duration-700 group-hover:bg-violet-500/[0.1]" />

                  {/* Watermark number */}
                  <span className="pointer-events-none absolute right-4 top-2 select-none text-[4rem] font-bold leading-none text-white/[0.03] sm:text-[5rem]">
                    {t(`mvp.value.cards.${key}.number`)}
                  </span>

                  {/* Icon */}
                  <div className="relative mb-4 inline-flex rounded-xl border border-violet-500/15 bg-violet-500/[0.07] p-3 text-violet-400">
                    {valueIcons[key]}
                  </div>

                  {/* Content */}
                  <h3 className="relative mb-3 text-lg font-semibold text-white sm:text-xl">
                    {t(`mvp.value.cards.${key}.title`)}
                  </h3>
                  <p className="relative text-sm leading-relaxed text-gray-400">
                    {t(`mvp.value.cards.${key}.desc`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — 8-Week Timeline
      ═══════════════════════════════════════════════════════ */}
      <section id="mvp-timeline" className="relative overflow-hidden py-24 sm:py-32">
        {/* Aurora ambient background */}
        <div className="pointer-events-none absolute inset-0">
          <Aurora
            colors={["#4f46e5", "#7c3aed", "#6d28d9", "#4f46e5"]}
            speed={0.4}
            className="opacity-40"
          />
        </div>

        {/* FloatingLines shader effect */}
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <FloatingLines
            linesGradient={["#7c3aed", "#a855f7", "#818cf8", "#c084fc"]}
            enabledWaves={["middle", "bottom"]}
            lineCount={[4, 3]}
            lineDistance={[6, 4]}
            animationSpeed={0.6}
            interactive={false}
            parallax={false}
            mixBlendMode="screen"
          />
        </div>

        {/* Ambient radial blurs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/[0.05] blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-purple-500/[0.04] blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.03] blur-[150px]" />
        </div>

        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Grain texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <ScrollReveal>
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-4 py-2 shadow-[0_0_20px_rgba(124,58,237,0.1)] backdrop-blur-xl">
                <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
                <span className="text-sm font-medium text-violet-400">
                  {t("mvp.timeline.badge")}
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {t("mvp.timeline.title")}
            </h2>
          </ScrollReveal>

          <BlurText
            text={t("mvp.timeline.subtitle")}
            className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-gray-400 sm:text-lg"
            delay={0.25}
          />

          {/* Timeline */}
          <div className="relative mt-16">
            {/* Center vertical line (desktop only) */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-violet-500/40 via-purple-500/20 to-transparent md:block" />

            <div className="space-y-6 md:space-y-12">
              {weekKeys.map((key, i) => {
                const isLeft = i % 2 === 0;
                const weekNum = i + 1;
                const tags: string[] = t(`mvp.timeline.weeks.${key}.tags`) || [];

                return (
                  <ScrollReveal
                    key={key}
                    delay={0.1 + i * 0.08}
                    direction={isLeft ? "left" : "right"}
                    distance={40}
                  >
                    <div className={`relative flex flex-col md:flex-row md:items-start ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      {/* Week card */}
                      <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-0" : "md:pl-0"}`}>
                        <div
                          onMouseMove={handleSpotlight}
                          className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(124,58,237,0.12)] sm:p-6"
                        >
                          {/* Spotlight */}
                          <div
                            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            style={{
                              background:
                                "radial-gradient(400px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(124,58,237,0.06), transparent 60%)",
                            }}
                          />

                          {/* Left accent */}
                          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-violet-500/60 via-purple-500/30 to-transparent" />

                          {/* Watermark week number */}
                          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none text-[5rem] font-bold leading-none text-white/[0.02] sm:text-[6rem]">
                            {String(weekNum).padStart(2, "0")}
                          </span>

                          <div className="relative">
                            {/* Week number */}
                            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                              W{weekNum}
                            </span>

                            {/* Title */}
                            <h3 className="mt-2 text-base font-semibold text-white sm:text-lg lg:text-xl">
                              {t(`mvp.timeline.weeks.${key}.title`)}
                            </h3>

                            {/* Description */}
                            <p className="mt-2 text-xs leading-relaxed text-gray-400 sm:text-sm">
                              {t(`mvp.timeline.weeks.${key}.description`)}
                            </p>

                            {/* Tags + agent count */}
                            <div className="mt-4 flex flex-wrap items-center gap-1.5">
                              {Array.isArray(tags) && tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-violet-500/15 bg-violet-500/[0.05] px-2.5 py-0.5 text-[11px] text-violet-400/80"
                                >
                                  {tag}
                                </span>
                              ))}
                              <span className="ml-auto flex items-center gap-1 text-[11px] text-gray-500">
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                                </svg>
                                {weekAgentCounts[i]} agents
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Center dot (desktop) */}
                      <div className="absolute left-1/2 top-6 z-10 hidden -translate-x-1/2 md:flex">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-500/30 bg-[#0a0a0f] shadow-[0_0_15px_rgba(124,58,237,0.15)]">
                          <span className="text-[10px] font-bold text-violet-400">{weekNum}</span>
                        </div>
                      </div>

                      {/* Spacer for the other side */}
                      <div className="hidden w-[calc(50%-2rem)] md:block" />
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — Deliverables
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-1/4 top-0 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-purple-500/[0.04] blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-violet-500/[0.035] blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.025] blur-[150px]" />
        </div>

        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <div className="mb-4 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-4 py-1.5 backdrop-blur-xl">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
                <span className="text-xs font-medium text-violet-400">{t("mvp.deliverables.badge")}</span>
              </div>
            </div>
            <h2 className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl">
              {t("mvp.deliverables.title")}
            </h2>
          </ScrollReveal>

          {/* Bento grid */}
          <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
            {deliverableKeys.map((key, i) => (
              <ScrollReveal
                key={key}
                delay={i * 0.1}
                className={deliverableGridClasses[key]}
              >
                <div
                  onMouseMove={handleSpotlight}
                  className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] sm:p-6 lg:p-8"
                >
                  {/* Spotlight */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(400px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(124,58,237,0.06), transparent 60%)",
                    }}
                  />

                  {/* Glow */}
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/5 blur-3xl transition-all duration-500 group-hover:bg-violet-500/10" />

                  {/* Watermark number */}
                  <span className="pointer-events-none absolute right-4 top-2 select-none text-[5rem] font-bold leading-none text-white/[0.03]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Content */}
                  <div className="relative">
                    <div className="mb-4 inline-flex rounded-xl border border-violet-500/15 bg-violet-500/[0.07] p-3 text-violet-400">
                      {deliverableIcons[key]}
                    </div>
                    <h3 className="mb-3 text-base font-semibold text-white sm:text-lg">
                      {t(`mvp.deliverables.cards.${key}.title`)}
                    </h3>
                    <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                      {t(`mvp.deliverables.cards.${key}.desc`)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════
          SECTION 5 — Final CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        {/* Aurora background */}
        <div className="pointer-events-none absolute inset-0">
          <Aurora
            colors={["#6d28d9", "#7c3aed", "#4f46e5", "#6d28d9"]}
            speed={0.5}
            className="opacity-50"
          />
        </div>

        {/* Prisma light refraction */}
        <div className="pointer-events-none absolute inset-0">
          <Prisma
            colors={["#7c3aed", "#a855f7", "#c084fc", "#e879f9", "#818cf8", "#6366f1"]}
            speed={0.6}
            opacity={0.08}
          />
        </div>

        {/* Strong radial glows for emphasis */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.08] blur-[150px]" />
          <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-purple-500/[0.06] blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] translate-x-1/2 rounded-full bg-indigo-500/[0.05] blur-[100px]" />
        </div>

        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-2xl">
              {/* Shimmer border */}
              <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_var(--shimmer-angle,0deg),transparent_40%,rgba(124,58,237,0.4)_50%,transparent_60%)] p-px animate-[shimmer-rotate_4s_linear_infinite]">
                <div className="h-full w-full rounded-[15px] bg-[#0a0a0f]" />
              </div>

              {/* Inner glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/[0.04] via-transparent to-purple-500/[0.04]" />

              <div className="relative px-6 py-16 text-center sm:px-12 sm:py-20">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {t("mvp.cta.title")}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
                  {t("mvp.cta.subtitle")}
                </p>
                <div className="mt-8">
                  <button
                    onClick={openContact}
                    className="group/btn relative inline-flex cursor-pointer overflow-hidden rounded-full border border-white/[0.1] bg-white/[0.05] backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.08] hover:shadow-[0_8px_40px_rgba(124,58,237,0.12)]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
                    <span className="relative flex items-center justify-center gap-2 px-6 py-2.5 text-base font-semibold text-white sm:px-8 lg:px-10 lg:py-3">
                      {t("mvp.cta.button")}
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

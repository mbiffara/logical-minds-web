"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import { useContact } from "@/context/ContactContext";
import Particles from "./animations/Particles";
import GridBackground from "./animations/GridBackground";
import SplitText from "./animations/SplitText";

export default function Hero() {
  const { t } = useLanguage();
  const { openContact } = useContact();
  const sparkleRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!sparkleRef.current) return;
    gsap.fromTo(
      sparkleRef.current,
      { opacity: 0, scale: 0, rotate: -180 },
      { opacity: 1, scale: 1, rotate: 0, duration: 0.8, delay: 0.4, ease: "back.out(2)" }
    );
    gsap.to(sparkleRef.current, {
      rotate: 15,
      scale: 1.1,
      duration: 2,
      delay: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section className="relative flex h-[95dvh] max-h-[900px] min-h-[600px] items-center justify-center overflow-hidden bg-white">
      {/* Grid background */}
      <div className="absolute inset-0 z-0">
        <GridBackground
          direction="diagonal"
          speed={0.3}
          borderColor="rgba(139, 92, 246, 0.08)"
          cellWidth={70}
          cellHeight={40}
          hoverFillColor="rgba(139, 92, 246, 0.06)"
          hoverTrailAmount={5}
        />
      </div>

      {/* Particles on top of grid */}
      <Particles
        count={60}
        colors={["#7c3aed", "#a855f7", "#8b5cf6"]}
        maxRadius={1.5}
        speed={0.2}
        connectionDistance={120}
        connectionOpacity={0.08}
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ opacity: 0.5 }}
      />

      {/* Radial fade to white at edges */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_30%,white_75%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl lg:max-w-5xl px-4 pt-[80px] text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] backdrop-blur-xl px-4 py-2 shadow-[0_0_20px_rgba(124,58,237,0.1)]">
          <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
          <span className="text-sm text-violet-600 font-medium">AI-First Software Factory</span>
        </div>

        <h1 className="mb-6 font-bold leading-tight tracking-tight">
          <span className="text-2xl text-gray-600 sm:text-3xl md:text-4xl lg:text-5xl">
            <SplitText
              text={t("hero.headline1")}
              splitType="words"
              duration={0.8}
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
            />
          </span>
          <br />
          <span className="relative mt-2 inline-flex items-center gap-2 text-3xl sm:text-4xl sm:gap-3 md:text-5xl lg:text-5xl xl:text-6xl">
            <svg ref={sparkleRef} className="h-[0.75em] w-[0.75em] shrink-0 text-violet-500 drop-shadow-[0_0_12px_rgba(139,92,246,0.4)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
            <SplitText
              text={t("hero.headline2")}
              splitType="words"
              duration={0.8}
              from={{ opacity: 0, y: 50, filter: "blur(8px)" }}
              to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              delay={0.4}
              className="hero-gradient-text"
            />
          </span>
        </h1>

        <p className="mx-auto mb-7 max-w-xl text-xs text-gray-500 sm:text-sm md:text-base">
          {t("hero.subtitle")}
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={openContact}
            className="group/btn relative inline-flex w-full cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-violet-500 transition-all duration-500 hover:from-violet-700 hover:to-violet-600 hover:shadow-[0_6px_24px_rgba(124,58,237,0.35)] hover:scale-[1.01] active:scale-[0.99] sm:w-auto"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
            <span className="relative flex w-full items-center justify-center gap-2 px-6 py-2.5 text-base font-semibold text-white sm:px-8 lg:px-10 lg:py-3">
              {t("hero.cta")}
              <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </span>
          </button>
          <a
            href="/mvp-in-8-weeks"
            className="group/btn relative inline-flex w-full cursor-pointer overflow-hidden rounded-full border border-violet-300 bg-violet-500/[0.07] backdrop-blur-xl transition-all duration-500 hover:border-violet-400 hover:bg-violet-500/[0.12] hover:shadow-[0_0_24px_rgba(139,92,246,0.2)] sm:w-auto animate-[glow-pulse_3s_ease-in-out_infinite]"
          >
            <span className="relative flex w-full items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-violet-600 transition-all duration-500 sm:px-8 sm:text-base lg:px-10 lg:py-3">
              <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              {t("hero.ctaSecondary")}
            </span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-6 flex justify-center sm:mt-10 md:mt-14">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-gray-300 p-1">
            <div className="h-2 w-1 animate-bounce rounded-full bg-gray-400" />
          </div>
        </div>
      </div>
    </section>
  );
}

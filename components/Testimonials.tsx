"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { useContact } from "@/context/ContactContext";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const { t, language } = useLanguage();
  const { openContact } = useContact();

  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        badgeRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );

      const words = headlineRef.current?.querySelectorAll(".word");
      if (words) {
        gsap.fromTo(
          words,
          { y: 80, opacity: 0, filter: "blur(12px)" },
          {
            y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power4.out", stagger: 0.08,
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
          }
        );
      }

      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0, filter: "blur(6px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%", once: true },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 55%", once: true },
        }
      );

      const noteItems = noteRef.current?.querySelectorAll(".note-item");
      if (noteItems) {
        gsap.fromTo(
          noteItems,
          { y: 10, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 50%", once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [language]);

  const headline = t("closingCta.headline") as string;
  const headlineWords = typeof headline === "string" ? headline.split(" ") : [];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-12 sm:py-16 lg:py-20"
      style={{ background: "#6F2AE4", scrollMarginTop: 80 }}
    >
      {/* Decorative shapes — /new style */}
      <div
        aria-hidden
        className="absolute pointer-events-none hidden sm:block"
        style={{
          bottom: -80,
          right: -60,
          width: 300,
          height: 300,
          borderRadius: 60,
          background: "#1C1C1C",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none hidden sm:block"
        style={{
          bottom: 60,
          right: 200,
          width: 140,
          height: 140,
          borderRadius: 40,
          background: "rgba(255,255,255,0.12)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Badge */}
        <div ref={badgeRef} style={{ opacity: 0 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-xl">
            <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
            <span className="text-sm font-medium text-white">{t("closingCta.badge")}</span>
          </div>
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          style={{
            fontFamily: '"Alvar Essential", var(--font-sans), sans-serif',
            fontSize: "clamp(26px, 4.5vw, 56px)",
            fontWeight: 900,
            lineHeight: 0.94,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            maxWidth: 900,
            textWrap: "balance",
          }}
        >
          {headlineWords.map((word, i) => {
            const isStartup = word.toLowerCase() === "startup";
            const needsBreak = word.toLowerCase() === "next" || word.toLowerCase() === "próxima";
            return (
              <span key={i}>
                {needsBreak && <br />}
                <span className="word inline-block text-white" style={{ opacity: 0 }}>
                {word}
                {isStartup && (
                  <svg
                    className="inline-block ml-2 -mt-1"
                    style={{ width: "0.6em", height: "0.6em" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                )}
                {i < headlineWords.length - 1 && "\u00A0"}
                </span>
              </span>
            );
          })}
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-4 max-w-xl lg:max-w-2xl text-sm leading-relaxed sm:text-base md:text-lg"
          style={{ opacity: 0, color: "rgba(255,255,255,0.7)" }}
        >
          {t("closingCta.subtitle")}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-6 flex flex-wrap gap-3" style={{ opacity: 0 }}>
          <button
            onClick={openContact}
            className="group/btn relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#1a1a2e] transition-all duration-500 hover:shadow-[0_6px_24px_rgba(255,255,255,0.25)] hover:scale-[1.01] active:scale-[0.99] sm:text-base"
          >
            {t("hero.cta")}
            <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button>
          <a
            href="https://calendly.com/logicalminds/30-min?back=1&month=2026-04"
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-white/30 bg-white/10 backdrop-blur-xl px-6 py-2.5 text-sm font-semibold text-white transition-all duration-500 hover:bg-white/20 hover:border-white/50 hover:shadow-[0_0_24px_rgba(255,255,255,0.15)] hover:scale-[1.01] active:scale-[0.99] sm:text-base"
          >
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            {t("roadmap.cta")}
          </a>
        </div>

        {/* Notes */}
        <div ref={noteRef} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="note-item flex items-center gap-1.5" style={{ opacity: 0 }}>
            <svg className="h-3.5 w-3.5" fill="none" stroke="rgba(255,255,255,0.7)" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            <span className="text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{t("closingCta.note1")}</span>
          </div>
          <div className="note-item flex items-center gap-1.5" style={{ opacity: 0 }}>
            <svg className="h-3.5 w-3.5" fill="none" stroke="rgba(255,255,255,0.7)" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{t("closingCta.note2")}</span>
          </div>
          <div className="note-item flex items-center gap-1.5" style={{ opacity: 0 }}>
            <svg className="h-3.5 w-3.5" fill="none" stroke="rgba(255,255,255,0.7)" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            <span className="text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{t("closingCta.note3")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

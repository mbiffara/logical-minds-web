"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { useContact } from "@/context/ContactContext";
import LightPillar from "./animations/LightPillar";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const { t } = useLanguage();
  const { openContact } = useContact();

  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge fades in
      gsap.fromTo(
        badgeRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Headline — words stagger in from below with blur
      const words = headlineRef.current?.querySelectorAll(".word");
      if (words) {
        gsap.fromTo(
          words,
          { y: 80, opacity: 0, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      // Divider line expands
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            once: true,
          },
        }
      );

      // Subtitle fades in
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            once: true,
          },
        }
      );

      // CTA scales in
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            once: true,
          },
        }
      );

      // Note items stagger in
      const noteItems = noteRef.current?.querySelectorAll(".note-item");
      if (noteItems) {
        gsap.fromTo(
          noteItems,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split headline into words for stagger animation
  const headline = t("closingCta.headline") as string;
  const headlineWords = typeof headline === "string" ? headline.split(" ") : [];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* Light Pillar background */}
      <LightPillar
        topColor="#5227FF"
        bottomColor="#FF9FFC"
        intensity={1.4}
        rotationSpeed={0.3}
        glowAmount={0.004}
        pillarWidth={3.5}
        pillarHeight={0.45}
        noiseIntensity={0.5}
        pillarRotation={25}
        quality="medium"
      />

      {/* Dark overlay for text contrast */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(248,249,252,0.3) 0%, rgba(248,249,252,0.6) 50%, rgba(248,249,252,0.9) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <div ref={badgeRef} className="flex justify-center" style={{ opacity: 0 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-4 py-2 shadow-[0_0_20px_rgba(124,58,237,0.1)] backdrop-blur-xl">
            <svg className="h-3.5 w-3.5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
            <span className="text-sm font-medium text-violet-600">{t("closingCta.badge")}</span>
          </div>
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl sm:leading-[1.1] md:text-5xl lg:text-7xl"
        >
          {headlineWords.map((word, i) => (
            <span
              key={i}
              className="word inline-block bg-gradient-to-b from-gray-900 via-gray-800 to-gray-500 bg-clip-text text-transparent"
              style={{ opacity: 0 }}
            >
              {word}
              {i < headlineWords.length - 1 && "\u00A0"}
            </span>
          ))}
        </h2>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="mx-auto mt-8 h-px w-24 origin-center bg-gradient-to-r from-transparent via-violet-500 to-transparent sm:w-32 md:w-40 lg:w-48"
          style={{ transform: "scaleX(0)" }}
        />

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mx-auto mt-8 max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg"
          style={{ opacity: 0 }}
        >
          {t("closingCta.subtitle")}
        </p>

        {/* CTA — glassmorphism */}
        <div ref={ctaRef} className="mt-8" style={{ opacity: 0 }}>
          <button
            onClick={openContact}
            className="group/btn relative inline-flex cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-violet-500 transition-all duration-500 hover:from-violet-700 hover:to-violet-600 hover:shadow-[0_6px_24px_rgba(124,58,237,0.35)] hover:scale-[1.01] active:scale-[0.99]"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
            <span className="relative flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold text-white sm:text-lg">
              {t("closingCta.cta")}
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Notes */}
        <div ref={noteRef} className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <div className="note-item flex items-center gap-1.5" style={{ opacity: 0 }}>
            <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            <span className="text-xs text-gray-500 sm:text-sm">{t("closingCta.note1")}</span>
          </div>
          <div className="note-item flex items-center gap-1.5" style={{ opacity: 0 }}>
            <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="text-xs text-gray-500 sm:text-sm">{t("closingCta.note2")}</span>
          </div>
          <div className="note-item flex items-center gap-1.5" style={{ opacity: 0 }}>
            <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            <span className="text-xs text-gray-500 sm:text-sm">{t("closingCta.note3")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

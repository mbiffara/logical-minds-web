"use client";

import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

const PHRASE_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h", "i"] as const;

/**
 * Single marquee row — renders phrases 4× for seamless infinite loop.
 * Alternates filled gradient text and outlined (stroke) text.
 */
function MarqueeRow({
  phrases,
  outlineIndices,
}: {
  phrases: string[];
  outlineIndices: number[];
}) {
  // 4 copies for seamless looping (animate -25% to loop one full set)
  const items = Array(4)
    .fill(phrases)
    .flat();

  return (
    <>
      {items.map((phrase, i) => {
        const isOutline = outlineIndices.includes(i % phrases.length);

        return (
          <div key={i} className="flex shrink-0 items-center">
            {/* Glowing separator dot */}
            <span className="mx-4 sm:mx-6 md:mx-8 flex items-center" aria-hidden="true">
              <svg className="h-7 w-7 text-violet-400 drop-shadow-[0_0_8px_rgba(124,58,237,0.7)] sm:h-8 sm:w-8 md:h-9 md:w-9" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </span>

            {/* Phrase */}
            {isOutline ? (
              <span
                className="whitespace-nowrap text-3xl font-bold tracking-tight select-none sm:text-4xl md:text-5xl lg:text-6xl"
                style={{
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.2)",
                  color: "transparent",
                }}
              >
                {phrase}
              </span>
            ) : (
              <span className="whitespace-nowrap bg-gradient-to-r from-white via-gray-200 to-white/80 bg-clip-text text-3xl font-bold tracking-tight text-transparent select-none sm:text-4xl md:text-5xl lg:text-6xl">
                {phrase}
              </span>
            )}
          </div>
        );
      })}
    </>
  );
}

export default function ScrollMarquee() {
  const { t } = useLanguage();

  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const row1Phrases = useMemo(
    () => PHRASE_KEYS.map((k) => t(`marquee.row1.${k}`)),
    [t]
  );
  const row2Phrases = useMemo(
    () => PHRASE_KEYS.map((k) => t(`marquee.row2.${k}`)),
    [t]
  );

  useEffect(() => {
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    const container = containerRef.current;
    if (!row1 || !row2 || !container) return;

    // Respect prefers-reduced-motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Row 1 → scrolls left:  xPercent 0 → -25 (1 of 4 copies)
    const tl1 = gsap.to(row1, {
      xPercent: -25,
      duration: reduced ? 120 : 30,
      ease: "none",
      repeat: -1,
    });

    // Row 2 → scrolls right: xPercent -25 → 0
    const tl2 = gsap.fromTo(
      row2,
      { xPercent: -25 },
      { xPercent: 0, duration: reduced ? 140 : 35, ease: "none", repeat: -1 }
    );

    // If reduced motion, skip velocity effects
    if (reduced) {
      return () => {
        tl1.kill();
        tl2.kill();
      };
    }

    // Scroll-velocity tracking
    let currentScroll = window.scrollY;
    let velocity = 0;
    let rafId: number;

    const onScroll = () => {
      const y = window.scrollY;
      velocity = y - currentScroll;
      currentScroll = y;
    };

    const tick = () => {
      // Speed boost proportional to scroll velocity
      const speed = 1 + Math.min(Math.abs(velocity) * 0.04, 4);
      tl1.timeScale(speed);
      tl2.timeScale(speed);

      // Skew the container based on scroll direction
      gsap.to(container, {
        skewX: gsap.utils.clamp(-4, 4, velocity * 0.2),
        duration: 0.3,
        overwrite: true,
      });

      // Decay velocity naturally
      velocity *= 0.92;

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      tl1.kill();
      tl2.kill();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24"
      aria-hidden="true"
    >
      {/* Subtle purple atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      {/* Edge fade mask */}
      <div
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
        }}
      >
        <div ref={containerRef} className="space-y-6 sm:space-y-10 will-change-transform">
          {/* Row 1 — scrolls left */}
          <div ref={row1Ref} className="flex will-change-transform">
            <MarqueeRow phrases={row1Phrases} outlineIndices={[1, 3, 5, 7]} />
          </div>

          {/* Row 2 — scrolls right */}
          <div ref={row2Ref} className="flex will-change-transform">
            <MarqueeRow phrases={row2Phrases} outlineIndices={[0, 2, 4, 6, 8]} />
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
    </section>
  );
}

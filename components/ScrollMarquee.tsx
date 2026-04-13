"use client";

import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

const PHRASE_KEYS = ["a", "b", "c", "d", "e", "f"] as const;

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
  return (
    <>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0" aria-hidden={copy > 0 || undefined}>
          {phrases.map((phrase, i) => {
            const isOutline = outlineIndices.includes(i);
            return (
              <div key={i} className="flex shrink-0 items-center">
                <span className="mx-4 sm:mx-6 md:mx-8 flex items-center" aria-hidden="true">
                  <svg className="h-7 w-7 text-violet-500 drop-shadow-[0_0_8px_rgba(124,58,237,0.3)] sm:h-8 sm:w-8 md:h-9 md:w-9" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </span>
                {isOutline ? (
                  <span
                    className="whitespace-nowrap text-3xl font-bold tracking-tight select-none sm:text-4xl md:text-5xl lg:text-6xl"
                    style={{
                      WebkitTextStroke: "1.5px rgba(124,58,237,0.2)",
                      color: "transparent",
                    }}
                  >
                    {phrase}
                  </span>
                ) : (
                  <span className="whitespace-nowrap bg-gradient-to-r from-gray-800 via-violet-600 to-gray-800 bg-clip-text text-3xl font-bold tracking-tight text-transparent select-none sm:text-4xl md:text-5xl lg:text-6xl">
                    {phrase}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
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

    // Measure the width of the first copy (first child) for pixel-perfect looping
    const row1Copy = row1.children[0] as HTMLElement;
    const row2Copy = row2.children[0] as HTMLElement;
    const w1 = row1Copy.offsetWidth;
    const w2 = row2Copy.offsetWidth;

    // Row 1 → scrolls left by exactly one copy width
    const tl1 = gsap.to(row1, {
      x: -w1,
      duration: reduced ? 500 : 160,
      ease: "none",
      repeat: -1,
    });

    // Row 2 → scrolls right by exactly one copy width
    const tl2 = gsap.fromTo(
      row2,
      { x: -w2 },
      { x: 0, duration: reduced ? 700 : 220, ease: "none", repeat: -1 }
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
  }, [row1Phrases, row2Phrases]);

  return (
    <section
      className="relative py-10 sm:py-16 bg-violet-500/[0.04]"
      aria-hidden="true"
    >
      {/* Subtle purple atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      {/* Edge fade mask */}
      <div
        className="overflow-x-clip"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
        }}
      >
        <div ref={containerRef} className="space-y-6 sm:space-y-10 will-change-transform">
          {/* Row 1 — scrolls left */}
          <div ref={row1Ref} className="flex py-2 will-change-transform">
            <MarqueeRow phrases={row1Phrases} outlineIndices={[1, 3, 5]} />
          </div>

          {/* Row 2 — scrolls right */}
          <div ref={row2Ref} className="flex py-2 will-change-transform">
            <MarqueeRow phrases={row2Phrases} outlineIndices={[0, 2, 4]} />
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
    </section>
  );
}

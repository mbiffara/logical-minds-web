"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  onComplete?: () => void;
}

export default function SplitText({
  text,
  className = "",
  delay = 0,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  onComplete,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reset on text change so animation can replay
    hasAnimated.current = false;

    const elements = container.querySelectorAll(".split-element");
    gsap.set(elements, from);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          gsap.to(elements, {
            ...to,
            duration,
            ease,
            stagger: splitType === "chars" ? 0.03 : 0.08,
            delay,
            onComplete,
          });
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [text, delay, duration, ease, splitType, from, to, threshold, rootMargin, onComplete]);

  const items = splitType === "chars" ? text.split("") : text.split(" ");

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {items.map((item, i) => (
        <span
          key={i}
          className="split-element inline-block"
          style={{ whiteSpace: item === " " ? "pre" : undefined }}
        >
          {item}
          {splitType === "words" && i < items.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </div>
  );
}

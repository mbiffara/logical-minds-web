"use client";

import { useEffect, useRef, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // On mobile, force "words" split to reduce animated elements
  const effectiveSplit = isMobile ? "words" : splitType;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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
            stagger: effectiveSplit === "chars" ? 0.03 : 0.08,
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
  }, [text, delay, duration, ease, effectiveSplit, from, to, threshold, rootMargin, onComplete]);

  const items = effectiveSplit === "chars" ? text.split("") : text.split(" ");

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {items.map((item, i) => (
        <span
          key={i}
          className="split-element inline-block"
          style={{ whiteSpace: item === " " ? "pre" : undefined }}
        >
          {item}
          {effectiveSplit === "words" && i < items.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </div>
  );
}

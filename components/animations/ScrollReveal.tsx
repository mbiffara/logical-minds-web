"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  direction = "up",
  distance = 60,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    hasAnimated.current = false;

    const axes = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 },
    };

    const { x, y } = axes[direction];
    gsap.set(el, { opacity: 0, x, y });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          gsap.to(el, {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            ease: "power3.out",
            delay,
          });
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "-50px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, duration, direction, distance, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

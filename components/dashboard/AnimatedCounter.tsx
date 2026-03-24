"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  delay?: number;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  decimals = 0,
  duration = 1.5,
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration,
            delay,
            ease: "power2.out",
            onUpdate: () => {
              if (ref.current) {
                ref.current.textContent = obj.val.toFixed(decimals) + suffix;
              }
            },
          });
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, [target, suffix, decimals, duration, delay, hasAnimated]);

  return <span ref={ref}>0{suffix}</span>;
}

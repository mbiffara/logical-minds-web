"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

interface ScrollFloatProps {
  children: ReactNode;
  className?: string;
  offsetY?: number;
  duration?: number;
}

export default function ScrollFloat({
  children,
  className = "",
  offsetY = 30,
  duration = 1,
}: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height))
      );
      const y = (1 - progress) * offsetY;
      gsap.to(el, { y, duration, ease: "power1.out", overwrite: true });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offsetY, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

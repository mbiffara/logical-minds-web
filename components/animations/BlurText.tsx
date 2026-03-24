"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function BlurText({
  text,
  className = "",
  delay = 0,
  duration = 0.8,
}: BlurTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    hasAnimated.current = false;

    const words = container.querySelectorAll(".blur-word");
    gsap.set(words, { opacity: 0, filter: "blur(10px)", y: 20 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          gsap.to(words, {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration,
            ease: "power2.out",
            stagger: 0.06,
            delay,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [text, delay, duration]);

  return (
    <div ref={containerRef} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="blur-word inline-block mr-[0.3em]">
          {word}
        </span>
      ))}
    </div>
  );
}

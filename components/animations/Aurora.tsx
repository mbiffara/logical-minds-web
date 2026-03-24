"use client";

import { useEffect, useRef } from "react";

interface AuroraProps {
  className?: string;
  colors?: string[];
  speed?: number;
}

export default function Aurora({
  className = "",
  colors = ["#7c3aed", "#a855f7", "#8b5cf6", "#7c3aed"],
  speed = 1,
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    // Run at 30fps on mobile (barely visible difference for ambient gradients)
    const targetFrameTime = isMobile ? 33.3 : 16.6;
    let lastFrameTime = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      // Frame throttling for mobile
      if (now - lastFrameTime < targetFrameTime) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = now;

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < colors.length; i++) {
        const x = w * (0.3 + 0.4 * Math.sin(time * 0.5 * speed + i * 1.5));
        const y = h * (0.3 + 0.4 * Math.cos(time * 0.3 * speed + i * 2));
        const radius = Math.max(w, h) * (0.3 + 0.1 * Math.sin(time * 0.7 + i));

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, colors[i] + "40");
        gradient.addColorStop(0.5, colors[i] + "15");
        gradient.addColorStop(1, colors[i] + "00");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      time += 0.01;
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [colors, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: "none" }}
    />
  );
}

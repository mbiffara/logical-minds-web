"use client";

import { useEffect, useRef } from "react";

export default function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Disable on touch devices — splashes don't make sense with discrete taps
    const isTouchOnly = !window.matchMedia("(hover: hover)").matches;
    if (isTouchOnly) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const splashes: {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      color: string;
    }[] = [];

    const colors = ["#7c3aed", "#a855f7", "#8b5cf6"];
    let mouse = { x: -100, y: -100 };
    let animationId: number;
    let lastSplash = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };

      const now = Date.now();
      if (now - lastSplash > 50) {
        lastSplash = now;
        // Cap array to prevent memory bloat
        if (splashes.length > 30) splashes.shift();
        splashes.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          maxRadius: 20 + Math.random() * 30,
          opacity: 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw cursor glow
      const glow = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 60
      );
      glow.addColorStop(0, "rgba(124, 58, 237, 0.15)");
      glow.addColorStop(1, "rgba(124, 58, 237, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw splashes
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        s.radius += (s.maxRadius - s.radius) * 0.1;
        s.opacity *= 0.95;

        if (s.opacity < 0.01) {
          splashes.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.strokeStyle = s.color + Math.floor(s.opacity * 255).toString(16).padStart(2, "0");
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}

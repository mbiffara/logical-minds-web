"use client";

import { useEffect, useRef } from "react";

interface PrismaProps {
  className?: string;
  colors?: string[];
  speed?: number;
  opacity?: number;
}

export default function Prisma({
  className = "",
  colors = ["#7c3aed", "#a855f7", "#c084fc", "#e879f9", "#818cf8", "#6366f1"],
  speed = 1,
  opacity = 0.12,
}: PrismaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    const targetFrameTime = isMobile ? 33.3 : 16.6;
    let lastFrameTime = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Helper: hex to rgba
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    };

    const draw = (now: number) => {
      if (now - lastFrameTime < targetFrameTime) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = now;

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.45;
      const t = time * speed;

      // --- Light beams dispersing from center ---
      const beamCount = colors.length;
      for (let i = 0; i < beamCount; i++) {
        const baseAngle = (Math.PI * 2 * i) / beamCount;
        const angle = baseAngle + Math.sin(t * 0.4 + i * 0.8) * 0.3;
        const length = Math.max(w, h) * (0.8 + 0.2 * Math.sin(t * 0.6 + i));

        const endX = cx + Math.cos(angle) * length;
        const endY = cy + Math.sin(angle) * length;

        // Beam gradient
        const grad = ctx.createLinearGradient(cx, cy, endX, endY);
        grad.addColorStop(0, hexToRgba(colors[i], opacity * 1.5));
        grad.addColorStop(0.3, hexToRgba(colors[i], opacity));
        grad.addColorStop(1, hexToRgba(colors[i], 0));

        ctx.save();
        ctx.globalCompositeOperation = "screen";

        // Draw tapered beam
        const spread = 30 + 20 * Math.sin(t * 0.3 + i * 1.2);
        const perpX = Math.cos(angle + Math.PI / 2);
        const perpY = Math.sin(angle + Math.PI / 2);

        ctx.beginPath();
        ctx.moveTo(cx + perpX * 3, cy + perpY * 3);
        ctx.moveTo(cx - perpX * 3, cy - perpY * 3);
        ctx.lineTo(endX + perpX * spread, endY + perpY * spread);
        ctx.lineTo(endX - perpX * spread, endY - perpY * spread);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }

      // --- Central glow (prism core) ---
      const coreRadius = Math.min(w, h) * 0.15;
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
      coreGrad.addColorStop(0, `rgba(139, 92, 246, ${opacity * 2})`);
      coreGrad.addColorStop(0.5, `rgba(124, 58, 237, ${opacity})`);
      coreGrad.addColorStop(1, "rgba(124, 58, 237, 0)");
      ctx.fillStyle = coreGrad;
      ctx.fillRect(cx - coreRadius, cy - coreRadius, coreRadius * 2, coreRadius * 2);

      // --- Soft orbiting glows ---
      for (let i = 0; i < 3; i++) {
        const orbitAngle = t * 0.25 + (Math.PI * 2 * i) / 3;
        const orbitRadius = Math.min(w, h) * (0.2 + 0.08 * Math.sin(t * 0.5 + i));
        const ox = cx + Math.cos(orbitAngle) * orbitRadius;
        const oy = cy + Math.sin(orbitAngle) * orbitRadius;
        const glowR = Math.min(w, h) * 0.18;

        const orbGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, glowR);
        const ci = i % colors.length;
        orbGrad.addColorStop(0, hexToRgba(colors[ci], opacity * 0.8));
        orbGrad.addColorStop(1, hexToRgba(colors[ci], 0));

        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = orbGrad;
        ctx.fillRect(ox - glowR, oy - glowR, glowR * 2, glowR * 2);
        ctx.restore();
      }

      // --- Prismatic refraction lines ---
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < 8; i++) {
        const lineAngle = (Math.PI * 2 * i) / 8 + t * 0.15;
        const innerR = Math.min(w, h) * 0.05;
        const outerR = Math.max(w, h) * (0.5 + 0.15 * Math.sin(t * 0.8 + i));
        const x1 = cx + Math.cos(lineAngle) * innerR;
        const y1 = cy + Math.sin(lineAngle) * innerR;
        const x2 = cx + Math.cos(lineAngle) * outerR;
        const y2 = cy + Math.sin(lineAngle) * outerR;

        const lineGrad = ctx.createLinearGradient(x1, y1, x2, y2);
        const lc = colors[i % colors.length];
        lineGrad.addColorStop(0, hexToRgba(lc, opacity * 0.6));
        lineGrad.addColorStop(0.6, hexToRgba(lc, opacity * 0.15));
        lineGrad.addColorStop(1, hexToRgba(lc, 0));

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 1.5 + Math.sin(t + i) * 0.5;
        ctx.stroke();
      }
      ctx.restore();

      time += 0.01;
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [colors, speed, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      style={{ pointerEvents: "none" }}
    />
  );
}

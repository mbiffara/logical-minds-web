"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
}

interface ParticlesProps {
  count?: number;
  colors?: string[];
  maxRadius?: number;
  speed?: number;
  connectionDistance?: number;
  connectionOpacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Particles({
  count = 80,
  colors = ["#7c3aed", "#a855f7", "#8b5cf6"],
  maxRadius = 2,
  speed = 0.3,
  connectionDistance = 150,
  connectionOpacity = 0.15,
  className,
  style,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999 };

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const effectiveCount = isMobile ? Math.min(count, 30) : count;
    const effectiveConnectionDist = isMobile ? Math.min(connectionDistance, 80) : connectionDistance;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      particles = [];
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (let i = 0; i < effectiveCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: Math.random() * maxRadius + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    resize();
    createParticles();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        createParticles();
      }, 150);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseLeave = () => {
      mouse = { x: -9999, y: -9999 };
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    // Pre-compute opacity hex values for faster rendering
    const opacityHexCache: Record<number, string> = {};
    const getOpacityHex = (opacity: number): string => {
      const key = Math.floor(opacity * 255);
      if (!opacityHexCache[key]) opacityHexCache[key] = key.toString(16).padStart(2, "0");
      return opacityHexCache[key];
    };

    // Use squared distance to avoid sqrt in inner loop
    const connDistSq = effectiveConnectionDist * effectiveConnectionDist;
    const mouseConnDist = effectiveConnectionDist * 1.5;
    const mouseConnDistSq = mouseConnDist * mouseConnDist;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Update and draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Mouse repulsion (use squared distance)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 14400 && distSq > 0) { // 120^2
          const dist = Math.sqrt(distSq);
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + getOpacityHex(p.opacity);
        ctx.fill();
      }

      // Draw connections (use squared distance to avoid sqrt)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connDistSq) {
            const dist = Math.sqrt(distSq);
            const opacity = (1 - dist / effectiveConnectionDist) * connectionOpacity;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Connection to mouse (use squared distance)
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < mouseConnDistSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const opacity = (1 - dist / mouseConnDist) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [count, colors, maxRadius, speed, connectionDistance, connectionOpacity]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "fixed inset-0 pointer-events-none z-0"}
      style={style ?? { opacity: 0.6 }}
    />
  );
}

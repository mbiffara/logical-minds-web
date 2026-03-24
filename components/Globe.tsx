"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";

const MARKERS = [
  { location: [-34.6037, -58.3816] as [number, number], size: 0.05 },
  { location: [40.7128, -74.006] as [number, number], size: 0.05 },
];

// phi ≈ 4.9 faces the Americas (~80°W longitude)
const BASE_PHI = 4.9;
const THETA = 0.05;

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerDown = useRef<{ x: number; y: number } | null>(null);
  const pointerOffset = useRef({ x: 0, y: 0 });
  const autoRotation = useRef(0);

  const onPointerDownHandler = useCallback((e: React.PointerEvent) => {
    pointerDown.current = {
      x: e.clientX - pointerOffset.current.x,
      y: e.clientY - pointerOffset.current.y,
    };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
  }, []);

  const onPointerUpHandler = useCallback(() => {
    pointerDown.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  }, []);

  const onMouseMoveHandler = useCallback((e: React.MouseEvent) => {
    if (pointerDown.current !== null) {
      pointerOffset.current = {
        x: e.clientX - pointerDown.current.x,
        y: e.clientY - pointerDown.current.y,
      };
    }
  }, []);

  const onTouchMoveHandler = useCallback((e: React.TouchEvent) => {
    if (pointerDown.current !== null && e.touches[0]) {
      pointerOffset.current = {
        x: e.touches[0].clientX - pointerDown.current.x,
        y: e.touches[0].clientY - pointerDown.current.y,
      };
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const getWidth = () => container.clientWidth || 400;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    const samples = isMobile ? 8000 : 16000;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: getWidth() * dpr,
      height: getWidth() * dpr,
      phi: BASE_PHI,
      theta: THETA,
      dark: 1,
      diffuse: 3,
      mapSamples: samples,
      mapBrightness: 6,
      mapBaseBrightness: 0.02,
      baseColor: [0.12, 0.1, 0.18],
      markerColor: [0.486, 0.361, 0.906],
      glowColor: [0.12, 0.06, 0.22],
      markers: MARKERS,
    });

    let frameId: number;
    const render = () => {
      const w = getWidth() * dpr;
      autoRotation.current += 0.002;
      globe.update({
        phi: BASE_PHI + autoRotation.current + pointerOffset.current.x / 200,
        theta: THETA + pointerOffset.current.y / 300,
        width: w,
        height: w,
      });
      frameId = requestAnimationFrame(render);
    };
    frameId = requestAnimationFrame(render);

    requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(frameId);
      globe.destroy();
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      {/* Globe */}
      <div ref={containerRef} className="relative aspect-square w-full max-w-[500px]">
        {/* Ambient glow behind globe */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-violet-500/[0.06] blur-3xl" />

        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDownHandler}
          onPointerUp={onPointerUpHandler}
          onPointerOut={onPointerUpHandler}
          onMouseMove={onMouseMoveHandler}
          onTouchMove={onTouchMoveHandler}
          className="absolute inset-0 h-full w-full cursor-grab opacity-0 transition-opacity duration-1000"
        />
      </div>

      {/* Location labels */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl leading-none">🇦🇷</span>
          <span className="text-sm text-gray-400">Buenos Aires, AR</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl leading-none">🇺🇸</span>
          <span className="text-sm text-gray-400">New York, US</span>
        </div>
      </div>
    </div>
  );
}

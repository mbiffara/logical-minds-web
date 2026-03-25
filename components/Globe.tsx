"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import createGlobe from "cobe";

const MARKERS = [
  { location: [-34.6037, -58.3816] as [number, number], size: 0.05, id: "bsas" },
  { location: [40.7128, -74.006] as [number, number], size: 0.05, id: "nyc" },
];

const MARKER_INFO: Record<string, { label: string; flag: string; subtitle: string }> = {
  bsas: { label: "Buenos Aires, AR", flag: "🇦🇷", subtitle: "HQ" },
  nyc: { label: "New York, US", flag: "🇺🇸", subtitle: "Office" },
};

// phi ≈ 4.65 centers between Buenos Aires (-58°W) and New York (-74°W)
const BASE_PHI = 4.65;
const THETA = 0.05;

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerDown = useRef<{ x: number; y: number } | null>(null);
  const pointerOffset = useRef({ x: 0, y: 0 });
  const autoRotation = useRef(0);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

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
      autoRotation.current += 0.0005;
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

  const handleMarkerClick = useCallback((id: string) => {
    setActiveMarker((prev) => (prev === id ? null : id));
  }, []);

  const handleDismiss = useCallback(() => {
    setActiveMarker(null);
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <style>{`
        .marker-overlay {
          position: absolute;
          translate: -50% -50%;
          pointer-events: auto;
          transition: opacity 0.3s, filter 0.3s;
          z-index: 10;
        }
        .marker-overlay-bsas {
          position-anchor: --cobe-bsas;
          left: anchor(center);
          top: anchor(center);
          opacity: var(--cobe-visible-bsas, 0);
          filter: blur(calc((1 - var(--cobe-visible-bsas, 0)) * 4px));
        }
        .marker-overlay-nyc {
          position-anchor: --cobe-nyc;
          left: anchor(center);
          top: anchor(center);
          opacity: var(--cobe-visible-nyc, 0);
          filter: blur(calc((1 - var(--cobe-visible-nyc, 0)) * 4px));
        }
      `}</style>

      {/* Globe */}
      <div
        ref={containerRef}
        className="relative aspect-square w-full max-w-[500px]"
        onClick={handleDismiss}
      >
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

        {/* Marker overlays — anchored to cobe markers via CSS Anchor Positioning */}
        {MARKERS.map((marker) => {
          const info = MARKER_INFO[marker.id];
          const isActive = activeMarker === marker.id;
          return (
            <div
              key={marker.id}
              className={`marker-overlay marker-overlay-${marker.id} group`}
              onClick={(e) => {
                e.stopPropagation();
                handleMarkerClick(marker.id);
              }}
              onMouseEnter={() => setActiveMarker(marker.id)}
              onMouseLeave={() => setActiveMarker(null)}
            >
              {/* Pulsing dot */}
              <div className="relative flex h-5 w-5 cursor-pointer items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400/40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
              </div>

              {/* Tooltip */}
              <div
                className={`
                  pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2
                  whitespace-nowrap rounded-lg border border-white/10
                  bg-[#0a0a0f]/80 px-3 py-2 backdrop-blur-xl
                  shadow-[0_0_20px_rgba(124,58,237,0.2)]
                  transition-all duration-200
                  ${isActive
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-1 scale-95 opacity-0"
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg leading-none">{info.flag}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{info.label}</p>
                    <p className="text-xs text-violet-300/70">{info.subtitle}</p>
                  </div>
                </div>
                {/* Tooltip arrow */}
                <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-white/10" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

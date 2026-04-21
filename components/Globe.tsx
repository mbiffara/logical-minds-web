"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import createGlobe from "cobe";

const MARKERS = [
  { location: [-34.6037, -58.3816] as [number, number], size: 0.06, id: "bsas" },
  { location: [40.7128, -74.006] as [number, number], size: 0.06, id: "nyc" },
  { location: [-23.5505, -46.6333] as [number, number], size: 0.05, id: "saopaulo" },
  { location: [19.4326, -99.1332] as [number, number], size: 0.05, id: "cdmx" },
  { location: [25.7617, -80.1918] as [number, number], size: 0.04, id: "miami" },
  { location: [-33.4489, -70.6693] as [number, number], size: 0.05, id: "santiago" },
  { location: [4.711, -74.0721] as [number, number], size: 0.05, id: "bogota" },
];

const MARKER_INFO: Record<string, { label: string; flag: string; subtitle: string }> = {
  bsas: { label: "Buenos Aires, AR", flag: "🇦🇷", subtitle: "HQ" },
  nyc: { label: "New York, US", flag: "🇺🇸", subtitle: "Office" },
  saopaulo: { label: "São Paulo, BR", flag: "🇧🇷", subtitle: "Tech Hub" },
  cdmx: { label: "Ciudad de México, MX", flag: "🇲🇽", subtitle: "Tech Hub" },
  miami: { label: "Miami, US", flag: "🇺🇸", subtitle: "Tech Hub" },
  santiago: { label: "Santiago, CL", flag: "🇨🇱", subtitle: "Tech Hub" },
  bogota: { label: "Bogotá, CO", flag: "🇨🇴", subtitle: "Tech Hub" },
};

// phi centers on the Americas (≈ -70°W longitude → radians)
const BASE_PHI = 4.85;
const THETA = 0.15;

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
    const samples = isMobile ? 12000 : 30000;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: getWidth() * dpr,
      height: getWidth() * dpr,
      phi: BASE_PHI,
      theta: THETA,
      dark: 0,
      diffuse: 1.4,
      mapSamples: samples,
      mapBrightness: 2,
      mapBaseBrightness: 0.01,
      baseColor: [1, 1, 1],
      markerColor: [0.486, 0.231, 0.929],
      glowColor: [0.96, 0.96, 1],
      markers: MARKERS,
    });

    let frameId: number;
    const render = () => {
      const w = getWidth() * dpr;
      autoRotation.current += 0.0002;
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
        ${MARKERS.map(
          (m) => `.marker-overlay-${m.id} {
          position-anchor: --cobe-${m.id};
          left: anchor(center);
          top: anchor(center);
          opacity: var(--cobe-visible-${m.id}, 0);
          filter: blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 4px));
        }`
        ).join("\n        ")}
      `}</style>

      {/* Globe */}
      <div
        ref={containerRef}
        className="relative aspect-square w-full max-w-[500px]"
        onClick={handleDismiss}
      >
        {/* Ambient glow behind globe */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-violet-300/[0.12] blur-3xl" />

        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDownHandler}
          onPointerUp={onPointerUpHandler}
          onPointerOut={onPointerUpHandler}
          onMouseMove={onMouseMoveHandler}
          onTouchMove={onTouchMoveHandler}
          className="absolute inset-0 h-full w-full cursor-grab opacity-0 transition-opacity duration-1000 drop-shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
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
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500/40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
              </div>

              {/* Tooltip */}
              <div
                className={`
                  pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2
                  whitespace-nowrap rounded-lg border border-gray-200
                  bg-white/90 px-3 py-2 backdrop-blur-xl
                  shadow-[0_4px_20px_rgba(124,58,237,0.12)]
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
                    <p className="text-sm font-medium text-gray-800">{info.label}</p>
                    <p className="text-xs text-violet-500/70">{info.subtitle}</p>
                  </div>
                </div>
                {/* Tooltip arrow */}
                <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-200" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

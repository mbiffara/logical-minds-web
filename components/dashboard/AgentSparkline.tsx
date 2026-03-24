"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface AgentSparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

export default function AgentSparkline({
  data,
  width = 120,
  height = 32,
  color = "rgba(139, 92, 246, 1)",
}: AgentSparklineProps) {
  const pathRef = useRef<SVGPathElement>(null);

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 4) - 2;
    return { x, y };
  });

  // Build smooth SVG path
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx = (prev.x + curr.x) / 2;
    d += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
  }

  // Fill area path
  const fillD = `${d} L ${width} ${height} L 0 ${height} Z`;

  const gradientId = `sparkline-grad-${data.slice(0, 3).join("-")}`;

  useEffect(() => {
    if (!pathRef.current) return;
    const totalLength = pathRef.current.getTotalLength();
    gsap.fromTo(
      pathRef.current,
      { strokeDasharray: totalLength, strokeDashoffset: totalLength },
      { strokeDashoffset: 0, duration: 1.2, ease: "power2.out", delay: 0.5 }
    );
  }, []);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill={`url(#${gradientId})`} />
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSite } from "./Providers";

const ACCENTS = ["purple", "blue", "red", "yellow", "green"] as const;
const ACCENT_HEX: Record<(typeof ACCENTS)[number], string> = {
  purple: "#6F2AE4",
  blue: "#227CFF",
  red: "#F50132",
  yellow: "#FDA901",
  green: "#22AE48",
};

export default function Tweaks() {
  const { tweaks, setTweaks } = useSite();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "." && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open tweaks"
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 100,
          background: "var(--lm-ink-800)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 999,
          padding: "10px 14px",
          cursor: "pointer",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          boxShadow: "0 20px 40px -20px rgba(0,0,0,0.5)",
        }}
      >
        tweaks
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 100,
        background: "var(--lm-ink-800)",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 20,
        padding: 18,
        minWidth: 280,
        fontSize: 13,
        boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
          Tweaks
        </div>
        <button onClick={() => setOpen(false)} style={{ background: "none", border: 0, color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 14 }}>
          ×
        </button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 8, fontFamily: "var(--font-mono)" }}>theme</div>
        <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.06)", padding: 3, borderRadius: 999 }}>
          {(["dark", "light"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTweaks({ ...tweaks, theme: t })}
              style={{
                flex: 1, padding: "6px 10px", borderRadius: 999, border: 0, cursor: "pointer",
                background: tweaks.theme === t ? "#fff" : "transparent",
                color: tweaks.theme === t ? "#1C1C1C" : "rgba(255,255,255,0.8)",
                fontSize: 12, fontWeight: 600, textTransform: "capitalize",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 8, fontFamily: "var(--font-mono)" }}>accent</div>
        <div style={{ display: "flex", gap: 8 }}>
          {ACCENTS.map((a) => (
            <button
              key={a}
              onClick={() => setTweaks({ ...tweaks, accent: a })}
              aria-label={a}
              style={{
                width: 32, height: 32, borderRadius: 999, cursor: "pointer",
                background: ACCENT_HEX[a],
                border: tweaks.accent === a ? "2px solid #fff" : "2px solid transparent",
                outline: tweaks.accent === a ? "1px solid " + ACCENT_HEX[a] : "none",
                outlineOffset: 2, transition: "transform 160ms",
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 8, fontFamily: "var(--font-mono)" }}>density</div>
        <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.06)", padding: 3, borderRadius: 999 }}>
          {(["compact", "default", "spacious"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setTweaks({ ...tweaks, density: d })}
              style={{
                flex: 1, padding: "6px 8px", borderRadius: 999, border: 0, cursor: "pointer",
                background: tweaks.density === d ? "#fff" : "transparent",
                color: tweaks.density === d ? "#1C1C1C" : "rgba(255,255,255,0.8)",
                fontSize: 11, fontWeight: 600, textTransform: "capitalize",
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

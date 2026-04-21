"use client";

import { useEffect, useState } from "react";
import Button from "./ui/Button";
import { useSite } from "./Providers";
import { UI } from "@/lib/new-content";

export default function HeroSection() {
  const { lang } = useSite();
  const ui = UI[lang];
  const t3Words = ui.hero.t3.split(" ");

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "calc(var(--pad-section) * 0.9) var(--pad-x) var(--pad-section)",
        minHeight: "88vh",
        display: "grid",
        alignItems: "center",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -60,
          right: -140,
          width: 560,
          height: 560,
          borderRadius: 72,
          background: "var(--accent)",
          opacity: 0.95,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 170,
          right: -40,
          width: 280,
          height: 280,
          borderRadius: 64,
          background: "var(--lm-ink-900)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--fg) 6%, transparent) 1px, transparent 1px)",
          backgroundSize: "120px 100%",
          maskImage: "linear-gradient(to bottom, black, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.25fr) minmax(0, 1fr)",
          gap: 48,
          alignItems: "center",
          maxWidth: 1360,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div>
          <div className="overline" style={{ marginBottom: 22, color: "var(--accent-400, var(--accent))" }}>
            <span className="mono" style={{ opacity: 0.8, marginRight: 10 }}>
              v2026.04
            </span>
            {ui.hero.overline}
          </div>

          <h1
            style={{
              fontSize: "clamp(56px, 9vw, 108px)",
              fontWeight: 900,
              lineHeight: 0.94,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              margin: 0,
              textWrap: "balance",
            }}
          >
            {ui.hero.t1}
            <br />
            {ui.hero.t2}
            <br />
            <span style={{ color: "var(--accent)" }}>{t3Words[0]}</span> {t3Words.slice(1).join(" ")}
          </h1>

          <p
            style={{
              fontSize: 19,
              lineHeight: 1.5,
              color: "var(--fg-muted)",
              maxWidth: 560,
              marginTop: 28,
              marginBottom: 36,
              fontWeight: 400,
            }}
          >
            {ui.hero.sub}
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Button size="lg" href="/new#contact">
              {ui.cta.book}
            </Button>
            <Button size="lg" variant="secondary" href="/new#work">
              {ui.cta.work}
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 48,
              paddingTop: 20,
              borderTop: "1px solid var(--border)",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--fg-subtle)",
            }}
          >
            <span>scroll</span>
            <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--border-strong)" }} />
            <span>
              {ui.nav.services} &middot; {ui.nav.work} &middot; {ui.nav.approach}
            </span>
          </div>
        </div>

        <HeroTerminal />
      </div>
    </section>
  );
}

function HeroTerminal() {
  const { lang } = useSite();
  const ui = UI[lang];
  const lines = ui.terminal.lines;
  const [count, setCount] = useState(1);
  const [hhmmss, setHhmmss] = useState("--:--:--");

  useEffect(() => {
    setCount(1);
  }, [lang]);

  useEffect(() => {
    if (count >= lines.length) return;
    const id = window.setTimeout(() => setCount((c) => Math.min(c + 1, lines.length)), 680);
    return () => window.clearTimeout(id);
  }, [count, lines.length]);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setHhmmss(
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`,
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        background: "color-mix(in oklab, var(--bg-alt) 92%, transparent)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: 0,
        overflow: "hidden",
        boxShadow: "0 40px 80px -40px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          borderBottom: "1px solid var(--border)",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--fg-muted)",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: "var(--lm-green)",
            boxShadow: "0 0 10px var(--lm-green)",
          }}
        />
        <span>{ui.terminal.title}</span>
        <span style={{ color: "var(--fg-subtle)" }}>&mdash; {ui.terminal.sub}</span>
        <span style={{ marginLeft: "auto" }} className="tnum">
          {hhmmss}
        </span>
      </div>
      <div
        style={{
          padding: "16px 18px",
          fontFamily: "var(--font-mono)",
          fontSize: 12.5,
          lineHeight: 1.9,
        }}
      >
        {lines.slice(0, count).map((l, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "44px 72px 1fr",
              gap: 12,
              alignItems: "baseline",
            }}
          >
            <span style={{ color: "var(--fg-subtle)" }}>{String(i + 1).padStart(2, "0")}</span>
            <span
              style={{
                color: l.who === "human" ? "var(--accent)" : "var(--lm-yellow)",
                fontWeight: 600,
              }}
            >
              {l.who}
            </span>
            <span style={{ color: "var(--fg)" }}>
              <span style={{ color: "var(--fg-subtle)", marginRight: 8 }}>{l.role}</span>
              {l.msg}
            </span>
          </div>
        ))}
        {count < lines.length && (
          <div style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 12 }}>
            <span style={{ color: "var(--fg-subtle)" }}>{String(count + 1).padStart(2, "0")}</span>
            <span
              className="blink"
              style={{ width: 7, height: 14, background: "var(--accent)", display: "inline-block" }}
            />
          </div>
        )}
      </div>
      <div
        style={{
          padding: "10px 16px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          gap: 18,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--fg-subtle)",
        }}
      >
        <span>humans: 4</span>
        <span>agents: 7</span>
        <span style={{ marginLeft: "auto" }}>uptime 99.98%</span>
      </div>
    </div>
  );
}

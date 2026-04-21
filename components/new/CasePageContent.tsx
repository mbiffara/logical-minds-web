"use client";

import Link from "next/link";
import Reveal from "./ui/Reveal";
import { useSite } from "./Providers";
import { CASES, UI } from "@/lib/new-content";

export default function CasePageContent({ id }: { id: string }) {
  const { lang } = useSite();
  const ui = UI[lang];
  const c = CASES.find((x) => x.id === id);
  if (!c) return null;
  const copy = c[lang];
  const idx = CASES.indexOf(c);
  const next = CASES[(idx + 1) % CASES.length];
  const fg = c.color === "#FDA901" ? "#1C1C1C" : "#fff";
  const nextFg = next.color === "#FDA901" ? "#1C1C1C" : "#fff";

  return (
    <div className="route">
      <section
        style={{
          position: "relative", overflow: "hidden", background: c.color, color: fg,
          padding: "calc(var(--pad-section) * 0.8) var(--pad-x) var(--pad-section)",
        }}
      >
        <div aria-hidden style={{ position: "absolute", bottom: -120, right: -120, width: 400, height: 400, borderRadius: 72, background: "rgba(0,0,0,0.15)" }} />
        <div style={{ position: "relative", maxWidth: 1360, margin: "0 auto" }}>
          <Link href="/new#work" style={{ cursor: "pointer", fontSize: 13, opacity: 0.8, display: "inline-block", marginBottom: 28, fontFamily: "var(--font-mono)", color: "currentColor" }}>
            {ui.cases.back}
          </Link>
          <div className="overline" style={{ color: "currentColor", opacity: 0.9, marginBottom: 20 }}>
            <span className="mono" style={{ marginRight: 10 }}>case 0{idx + 1}</span>
            {copy.cat}
          </div>
          <h1 style={{ fontSize: "clamp(48px, 6.5vw, 84px)", fontWeight: 900, margin: 0, lineHeight: 0.98, letterSpacing: "-0.03em", textTransform: "uppercase", maxWidth: 1000, textWrap: "balance" }}>
            {copy.title}
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, maxWidth: 720, marginTop: 28, opacity: 0.94 }}>
            {copy.lede}
          </p>

          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 48, fontFamily: "var(--font-mono)", fontSize: 12 }}>
            <div>
              <div style={{ opacity: 0.7, marginBottom: 6 }}>{ui.cases.client}</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{c.client}</div>
            </div>
            <div>
              <div style={{ opacity: 0.7, marginBottom: 6 }}>{ui.cases.year}</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{c.year}</div>
            </div>
            <div>
              <div style={{ opacity: 0.7, marginBottom: 6 }}>{ui.cases.stack}</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{c.stack.join(" · ")}</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--pad-section) var(--pad-x)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div className="overline" style={{ marginBottom: 28 }}>{ui.cases.metrics}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--gap-grid, 16px)" }}>
            {copy.metrics.map((m, i) => (
              <Reveal key={m.k} delay={i * 60}>
                <div style={{ borderTop: "1px solid var(--border-strong)", paddingTop: 18 }}>
                  <div className="tnum" style={{ fontSize: "clamp(42px, 5.5vw, 72px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1, color: c.color }}>
                    {m.v}
                  </div>
                  <div style={{ marginTop: 12, fontSize: 13, color: "var(--fg-muted)" }}>{m.k}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--pad-section) var(--pad-x)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="overline" style={{ marginBottom: 20 }}>{ui.cases.approach}</div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, margin: "0 0 32px", letterSpacing: "-0.025em" }}>
            {copy.cat.split(" · ")[1] || copy.cat}
          </h2>
          <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {copy.approach.map((step, i) => (
              <li key={i} className="spec-row">
                <span className="k">step 0{i + 1}</span>
                <span className="v" style={{ fontWeight: 500 }}>{step}</span>
                <span className="end">✓</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section style={{ padding: "var(--pad-section) var(--pad-x)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Link
            href={`/new/work/${next.id}`}
            style={{
              display: "block", background: next.color, color: nextFg, borderRadius: 28, padding: 48,
              cursor: "pointer", position: "relative", overflow: "hidden", transition: "transform 220ms var(--ease-out)",
            }}
          >
            <div aria-hidden style={{ position: "absolute", right: -40, bottom: -40, width: 180, height: 180, borderRadius: 48, background: "rgba(0,0,0,0.18)" }} />
            <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
              <div>
                <div className="overline" style={{ color: "currentColor", opacity: 0.85, marginBottom: 16 }}>{ui.cases.next}</div>
                <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.85 }}>
                  {next.client} · {next[lang].cat}
                </div>
                <h3 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, margin: "12px 0 0", letterSpacing: "-0.025em", lineHeight: 1.05, maxWidth: 720 }}>
                  {next[lang].title}
                </h3>
              </div>
              <div style={{ fontSize: 48, fontWeight: 700 }}>→</div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

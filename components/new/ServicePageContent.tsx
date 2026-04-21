"use client";

import Link from "next/link";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import { useSite } from "./Providers";
import { SERVICE_DETAIL, SUBBRANDS, UI } from "@/lib/new-content";

export default function ServicePageContent({ id }: { id: string }) {
  const { lang } = useSite();
  const ui = UI[lang];
  const s = SUBBRANDS.find((x) => x.id === id);
  if (!s) return null;
  const copy = s[lang];
  const detail = SERVICE_DETAIL[id][lang];
  const idx = SUBBRANDS.indexOf(s);
  const next = SUBBRANDS[(idx + 1) % SUBBRANDS.length];
  const heroFg = s.color === "#FDA901" ? "#1C1C1C" : "#fff";
  const nextFg = next.color === "#FDA901" ? "#1C1C1C" : "#fff";

  return (
    <div className="route">
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: s.color,
          color: heroFg,
          padding: "calc(var(--pad-section) * 0.8) var(--pad-x) var(--pad-section)",
        }}
      >
        <div aria-hidden style={{ position: "absolute", top: -120, right: -140, width: 520, height: 520, borderRadius: 72, background: "rgba(0,0,0,0.16)" }} />
        <div aria-hidden style={{ position: "absolute", top: 80, right: 180, width: 220, height: 220, borderRadius: 56, background: "rgba(255,255,255,0.16)" }} />
        <div style={{ position: "relative", maxWidth: 1360, margin: "0 auto" }}>
          <Link href="/new#services" style={{ cursor: "pointer", fontSize: 13, opacity: 0.8, display: "inline-block", marginBottom: 28, fontFamily: "var(--font-mono)", color: "currentColor" }}>
            {ui.service.back}
          </Link>
          <div className="overline" style={{ color: "currentColor", opacity: 0.85, marginBottom: 22 }}>
            <span className="mono" style={{ marginRight: 10 }}>0{idx + 1}/05</span>
            {s.tag}
          </div>
          <h1 style={{ fontSize: "clamp(52px, 7vw, 92px)", fontWeight: 900, margin: 0, lineHeight: 0.97, letterSpacing: "-0.03em", textTransform: "uppercase", maxWidth: 980, textWrap: "balance" }}>
            {detail.hero}
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, maxWidth: 680, marginTop: 28, color: "currentColor", opacity: 0.92 }}>
            {detail.intro}
          </p>
        </div>
      </section>

      <section style={{ padding: "var(--pad-section) var(--pad-x)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div className="overline" style={{ marginBottom: 28 }}>{ui.service.offerings}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--gap-grid, 16px)" }}>
            {detail.offerings.map((o, i) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{ border: "1px solid var(--border)", borderRadius: 20, padding: 24, minHeight: 180, display: "flex", flexDirection: "column", background: "var(--bg-alt)" }}>
                  <div className="mono" style={{ fontSize: 11, color: s.color, marginBottom: 14, letterSpacing: "0.08em" }}>0{i + 1}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: "-0.015em" }}>{o.t}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--fg-muted)", marginTop: 8, marginBottom: 0 }}>{o.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--pad-section) var(--pad-x)", background: "var(--bg-alt)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="overline" style={{ marginBottom: 20 }}>{ui.service.how}</div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, margin: "0 0 32px", letterSpacing: "-0.025em" }}>
            {copy.title}
          </h2>
          <div>
            {detail.how.map((h) => (
              <div key={h.step} className="spec-row">
                <span className="k">{h.step} · {h.t}</span>
                <span className="v">{h.d}</span>
                <span className="end">—</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--pad-section) var(--pad-x)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", borderRadius: 28, padding: 40, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 24 }}>
            <div>
              <div className="overline" style={{ marginBottom: 14 }}>{ui.cta_final.o}</div>
              <h3 style={{ fontSize: 36, fontWeight: 700, margin: 0, letterSpacing: "-0.02em", maxWidth: 360 }}>
                {ui.cta_final.t1} {ui.cta_final.t2}
              </h3>
            </div>
            <Button size="lg" href="/new#contact">{ui.service.cta}</Button>
          </div>
          <Link
            href={`/new/services/${next.id}`}
            style={{
              background: next.color, color: nextFg, borderRadius: 28, padding: 40,
              display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 220,
              cursor: "pointer", transition: "transform 220ms var(--ease-out)",
            }}
          >
            <div className="overline" style={{ color: "currentColor", opacity: 0.85 }}>{ui.service.next}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.85 }}>{next.tag}</div>
              <h3 style={{ fontSize: 40, fontWeight: 700, margin: "12px 0 0", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                {next[lang].title}
              </h3>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

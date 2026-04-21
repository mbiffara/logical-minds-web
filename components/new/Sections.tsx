"use client";

import Link from "next/link";
import { useState } from "react";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import Logo from "./ui/Logo";
import { useSite } from "./Providers";
import { CASES, CLIENTS, SUBBRANDS, UI, type Subbrand, type CaseStudy, type UIStrings } from "@/lib/new-content";

export function Clients() {
  const { lang } = useSite();
  const ui = UI[lang];
  return (
    <section
      style={{
        padding: "40px var(--pad-x)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap", maxWidth: 1360, margin: "0 auto" }}>
        <div className="overline" style={{ flex: "0 0 auto" }}>{ui.clients}</div>
        <div
          style={{
            display: "flex",
            gap: 48,
            flex: 1,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {CLIENTS.map((c) => (
            <span
              key={c}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: "0.18em",
                color: "var(--fg-subtle)",
                opacity: 0.7,
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid() {
  const { lang } = useSite();
  const ui = UI[lang];
  return (
    <section id="services" style={{ padding: "var(--pad-section) var(--pad-x)", scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        <Reveal>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 24,
              marginBottom: 48,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div className="overline" style={{ marginBottom: 14 }}>{ui.services.overline}</div>
              <h2
                style={{
                  fontSize: "clamp(40px, 5vw, 64px)",
                  fontWeight: 700,
                  margin: 0,
                  letterSpacing: "-0.025em",
                  color: "var(--fg)",
                  maxWidth: 640,
                }}
              >
                {ui.services.title}
              </h2>
            </div>
            <div className="mono" style={{ fontSize: 12, color: "var(--fg-subtle)" }}>05 / 05 practices</div>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "var(--gap-grid, 16px)" }}>
          {SUBBRANDS.map((s, i) => (
            <Reveal key={s.id} delay={i * 60} style={{ gridColumn: i < 2 ? "span 6" : "span 4" }}>
              <ServiceCard s={s} index={i} large={i < 2} ui={ui} lang={lang} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, index, large, ui, lang }: { s: Subbrand; index: number; large: boolean; ui: UIStrings; lang: "en" | "es" }) {
  const [hover, setHover] = useState(false);
  const copy = s[lang];
  return (
    <Link
      href={`/new/services/${s.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        background: "var(--bg-alt)",
        border: "1px solid var(--border)",
        borderRadius: 24,
        padding: large ? "32px 32px 28px" : "24px 22px",
        minHeight: large ? 280 : 220,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "all 220ms var(--ease-out)",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        borderColor: hover ? "var(--border-strong)" : "var(--border)",
      }}
    >
      <div
        className="mono"
        style={{
          fontSize: 11,
          color: "var(--fg-subtle)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{String(index + 1).padStart(2, "0")} / {s.tag}</span>
        <span style={{ opacity: hover ? 1 : 0, transition: "opacity 220ms", color: s.color }}>↗</span>
      </div>

      <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: i < index + 1 ? s.color : "var(--border-strong)",
              opacity: i < index + 1 ? 1 : 0.5,
            }}
          />
        ))}
      </div>

      <h3 style={{ fontSize: large ? 30 : 22, fontWeight: 700, margin: 0, color: "var(--fg)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
        {copy.title}
      </h3>
      <p style={{ fontSize: 15, lineHeight: 1.5, color: "var(--fg-muted)", margin: 0 }}>{copy.tagline}</p>

      <div style={{ marginTop: "auto", paddingTop: 14, fontSize: 13, fontWeight: 600, color: s.color, display: "flex", alignItems: "center", gap: 6 }}>
        {ui.service.cta.replace("→", "").trim()} →
      </div>
    </Link>
  );
}

export function Approach() {
  const { lang } = useSite();
  const ui = UI[lang];
  return (
    <section id="approach" style={{ padding: "var(--pad-section) var(--pad-x)", borderTop: "1px solid var(--border)", position: "relative", scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)", gap: 64, alignItems: "flex-start" }}>
          <Reveal>
            <div style={{ position: "sticky", top: 100 }}>
              <div className="overline" style={{ marginBottom: 14 }}>{ui.approach.overline}</div>
              <h2 style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 700, margin: 0, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
                {ui.approach.title}
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: "var(--fg-muted)", marginTop: 20, maxWidth: 460 }}>
                {ui.approach.blurb}
              </p>
            </div>
          </Reveal>

          <div>
            {ui.approachSteps.map((step, i) => (
              <Reveal key={step.n} delay={i * 80}>
                <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 24, padding: "28px 0", borderTop: "1px solid var(--border)", alignItems: "baseline" }}>
                  <span className="mono" style={{ color: "var(--accent)", fontSize: 14, fontWeight: 600, letterSpacing: "0.08em" }}>
                    {step.n}
                  </span>
                  <div>
                    <h3 style={{ fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>{step.t}</h3>
                    <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--fg-muted)", marginTop: 6, marginBottom: 0 }}>
                      {step.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  const { lang } = useSite();
  const ui = UI[lang];
  return (
    <section style={{ padding: "var(--pad-section) var(--pad-x)", background: "var(--bg-alt)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        <div className="overline" style={{ marginBottom: 40 }}>{ui.stats.overline}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
          {ui.stats.items.map((it, i) => (
            <Reveal key={it.k} delay={i * 80}>
              <div style={{ borderTop: "1px solid var(--border-strong)", paddingTop: 18 }}>
                <div className="tnum" style={{ fontSize: "clamp(48px, 6vw, 84px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1, color: "var(--fg)" }}>
                  {it.v}
                </div>
                <div style={{ marginTop: 14, fontSize: 13, color: "var(--fg-muted)" }}>{it.k}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Work() {
  const { lang } = useSite();
  const ui = UI[lang];
  return (
    <section id="work" style={{ padding: "var(--pad-section) var(--pad-x)", scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 48, flexWrap: "wrap" }}>
            <div>
              <div className="overline" style={{ marginBottom: 14 }}>{ui.work.overline}</div>
              <h2 style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 700, margin: 0, letterSpacing: "-0.025em" }}>
                {ui.work.title}
              </h2>
            </div>
            <div className="mono" style={{ fontSize: 12, color: "var(--fg-subtle)" }}>
              03 / {CASES.length} cases
            </div>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--gap-grid, 16px)" }}>
          {CASES.map((c, i) => (
            <Reveal key={c.id} delay={i * 80}>
              <CaseCard c={c} lang={lang} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCard({ c, lang }: { c: CaseStudy; lang: "en" | "es" }) {
  const [hover, setHover] = useState(false);
  const copy = c[lang];
  const fg = c.color === "#FDA901" ? "#1C1C1C" : "#fff";
  return (
    <Link
      href={`/new/work/${c.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: c.color,
        color: fg,
        borderRadius: 28,
        padding: 32,
        minHeight: 380,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "transform 240ms var(--ease-out)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute", right: -60, bottom: -60, width: 200, height: 200,
          borderRadius: 56, background: "rgba(0,0,0,0.18)",
          transform: hover ? "translate(-10px, -10px)" : "translate(0,0)",
          transition: "transform 360ms var(--ease-out)",
        }}
      />

      <div className="mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.85, display: "flex", justifyContent: "space-between" }}>
        <span>{copy.cat}</span>
        <span>{c.year}</span>
      </div>

      <div style={{ fontSize: "clamp(26px, 2.3vw, 34px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginTop: 20, marginBottom: "auto", maxWidth: 440, textWrap: "balance" }}>
        {copy.title}
      </div>

      <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 40, gap: 16 }}>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {copy.metrics.slice(0, 2).map((m) => (
            <div key={m.k}>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }} className="tnum">{m.v}</div>
              <div style={{ fontSize: 11, opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 4 }}>{m.k}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, transform: hover ? "translateX(4px)" : "translateX(0)", transition: "transform 220ms var(--ease-out)" }}>→</div>
      </div>
    </Link>
  );
}

export function About() {
  const { lang } = useSite();
  const content = lang === "es"
    ? {
        o: "Equipo",
        t: "Humanos que piensan. Máquinas que repiten.",
        p: "Somos un colectivo de ingenieros, diseñadores y estrategas trabajando desde Buenos Aires y remoto. Cada proyecto tiene un lead humano senior y una flota de agentes hechos a medida. El resultado: criterio, velocidad y código que no da vergüenza mantener.",
        facts: [
          { k: "Fundada", v: "2021" },
          { k: "Equipo", v: "24 humanos · 12 agentes" },
          { k: "HQ", v: "Buenos Aires" },
          { k: "Idiomas", v: "ES · EN · PT" },
        ],
      }
    : {
        o: "About",
        t: "Humans who think. Machines that repeat.",
        p: "We're a collective of engineers, designers, and strategists based in Buenos Aires and remote. Every project has a senior human lead and a roster of purpose-built AI agents. The result: judgment, speed, and code you aren't embarrassed to maintain.",
        facts: [
          { k: "Founded", v: "2021" },
          { k: "Team", v: "24 humans · 12 agents" },
          { k: "HQ", v: "Buenos Aires" },
          { k: "Languages", v: "ES · EN · PT" },
        ],
      };

  return (
    <section id="about" style={{ padding: "var(--pad-section) var(--pad-x)", borderTop: "1px solid var(--border)", scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1.2fr) minmax(0,1fr)", gap: 64 }}>
        <div>
          <div className="overline" style={{ marginBottom: 14 }}>{content.o}</div>
          <h2 style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 700, margin: 0, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
            {content.t}
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--fg-muted)", marginTop: 20, maxWidth: 520 }}>
            {content.p}
          </p>
        </div>
        <div>
          {content.facts.map((f) => (
            <div key={f.k} className="spec-row">
              <span className="k">{f.k}</span>
              <span className="v">{f.v}</span>
              <span className="end">—</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const { lang } = useSite();
  const ui = UI[lang];
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--accent)",
        color: "var(--accent-fg)",
        padding: "calc(var(--pad-section) * 1.1) var(--pad-x)",
        scrollMarginTop: 80,
      }}
    >
      <div aria-hidden style={{ position: "absolute", bottom: -100, right: -80, width: 380, height: 380, borderRadius: 72, background: "var(--lm-ink-900)" }} />
      <div aria-hidden style={{ position: "absolute", bottom: 80, right: 260, width: 180, height: 180, borderRadius: 48, background: "color-mix(in oklab, var(--accent-fg) 20%, transparent)" }} />
      <div style={{ position: "relative", maxWidth: 1360, margin: "0 auto" }}>
        <div className="overline" style={{ marginBottom: 22, opacity: 0.85, color: "var(--accent-fg)" }}>
          {ui.cta_final.o}
        </div>
        <h2 style={{ fontSize: "clamp(56px, 8vw, 112px)", fontWeight: 900, margin: 0, lineHeight: 0.96, letterSpacing: "-0.03em", textTransform: "uppercase", maxWidth: 900, textWrap: "balance" }}>
          {ui.cta_final.t1}
          <br />
          {ui.cta_final.t2}
        </h2>
        <div style={{ display: "flex", gap: 10, marginTop: 36, flexWrap: "wrap" }}>
          <Button variant="dark" size="lg" href="mailto:hola@logicalminds.ai">hola@logicalminds.ai</Button>
          <Button
            variant="outline"
            size="lg"
            style={{
              color: "var(--accent-fg)",
              boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--accent-fg) 35%, transparent)",
            }}
          >
            +54 11 2345 6789
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { lang } = useSite();
  const ui = UI[lang];
  return (
    <footer style={{ background: "var(--lm-ink-900)", color: "#fff", padding: "64px var(--pad-x) 32px" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) repeat(3, minmax(0, 1fr))", gap: 40, alignItems: "flex-start" }}>
        <div>
          <Logo variant="white" height={24} />
          <p style={{ marginTop: 20, color: "rgba(255,255,255,0.6)", fontSize: 14, maxWidth: 320, lineHeight: 1.55 }}>
            Human + AI hybrid digital products agency. {ui.footer.sub}.
          </p>
        </div>
        <div>
          <div className="overline" style={{ color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>{ui.nav.services}</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
            {SUBBRANDS.map((s) => (
              <li key={s.id}>
                <Link href={`/new/services/${s.id}`} style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, cursor: "pointer" }}>
                  {s.tag}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="overline" style={{ color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>{ui.nav.work}</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
            {CASES.map((c) => (
              <li key={c.id}>
                <Link href={`/new/work/${c.id}`} style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, cursor: "pointer" }}>
                  {c.client} — {c[lang].cat.split(" · ")[0]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="overline" style={{ color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>{ui.footer.contact}</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10, fontSize: 14 }}>
            <li><a href="mailto:hola@logicalminds.ai" style={{ color: "rgba(255,255,255,0.85)" }}>hola@logicalminds.ai</a></li>
            <li style={{ color: "rgba(255,255,255,0.85)" }}>+54 11 2345 6789</li>
            <li style={{ color: "rgba(255,255,255,0.5)", marginTop: 6 }}>LinkedIn · GitHub · Instagram</li>
          </ul>
        </div>
      </div>
      <div style={{ maxWidth: 1360, margin: "48px auto 0", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-mono)" }}>
        <span>{ui.footer.copy} · {ui.footer.sub}</span>
        <span>lat -34.60 · lng -58.38</span>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./ui/Button";
import Logo from "./ui/Logo";
import { useSite } from "./Providers";
import { UI } from "@/lib/new-content";

export default function Navbar() {
  const { lang, setLang } = useSite();
  const ui = UI[lang];
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const wrapper = document.getElementById("new-site-wrapper");
    if (!wrapper) return;
    const onScroll = () => setScrolled(wrapper.scrollTop > 8);
    onScroll();
    wrapper.addEventListener("scroll", onScroll, { passive: true });
    return () => wrapper.removeEventListener("scroll", onScroll);
  }, []);

  const items: { id: string; label: string; href: string }[] = [
    { id: "services", label: ui.nav.services, href: "/new#services" },
    { id: "work", label: ui.nav.work, href: "/new#work" },
    { id: "approach", label: ui.nav.approach, href: "/new#approach" },
    { id: "about", label: ui.nav.about, href: "/new#about" },
  ];

  const onService = pathname?.startsWith("/new/services");
  const onCase = pathname?.startsWith("/new/work");
  const currentSection: string | null = onService ? "services" : onCase ? "work" : null;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "color-mix(in oklab, var(--bg) 82%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(1.2)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px) saturate(1.2)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "background 220ms var(--ease-out), border-color 220ms var(--ease-out)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          padding: "16px var(--pad-x, 48px)",
          gap: 24,
        }}
      >
        <Link href="/new" style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10 }}>
          <span className="darkonly"><Logo variant="white" height={22} /></span>
          <span className="lightonly"><Logo variant="color" height={22} /></span>
        </Link>

        <nav
          className="hide-sm"
          style={{
            display: "flex",
            gap: 4,
            alignItems: "center",
            padding: 4,
            borderRadius: 999,
            background: "color-mix(in oklab, var(--bg-alt) 80%, transparent)",
            border: "1px solid var(--border)",
          }}
        >
          {items.map((it) => {
            const active = currentSection === it.id;
            return (
              <Link
                key={it.id}
                href={it.href}
                style={{
                  padding: "7px 14px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 500,
                  color: active ? "var(--fg)" : "var(--fg-muted)",
                  background: active ? "color-mix(in oklab, var(--fg) 10%, transparent)" : "transparent",
                  cursor: "pointer",
                  transition: "color 180ms var(--ease-out), background 180ms var(--ease-out)",
                }}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}>
          <div
            style={{
              display: "inline-flex",
              padding: 3,
              borderRadius: 999,
              border: "1px solid var(--border)",
              background: "var(--bg-alt)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 500,
            }}
          >
            {(["es", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  border: 0,
                  cursor: "pointer",
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: lang === l ? "var(--fg)" : "transparent",
                  color: lang === l ? "var(--bg)" : "var(--fg-muted)",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition: "all 160ms var(--ease-out)",
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <Button size="sm" href="/new#contact">{ui.nav.contact}</Button>
        </div>
      </div>
    </header>
  );
}

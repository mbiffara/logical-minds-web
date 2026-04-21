"use client";

import { useState, type CSSProperties, type MouseEventHandler, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "light" | "outline";
type Size = "sm" | "md" | "lg";

type Props = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  onClick?: MouseEventHandler;
  href?: string;
  style?: CSSProperties;
  type?: "button" | "submit";
};

const sizes: Record<Size, CSSProperties> = {
  sm: { padding: "8px 14px", fontSize: 13 },
  md: { padding: "11px 20px", fontSize: 14 },
  lg: { padding: "15px 28px", fontSize: 15 },
};

const baseVariants: Record<Variant, CSSProperties> = {
  primary: { background: "var(--accent)", color: "var(--accent-fg)" },
  secondary: { background: "rgba(255,255,255,0.06)", color: "var(--fg)", boxShadow: "inset 0 0 0 1px var(--border-strong)" },
  ghost: { background: "transparent", color: "var(--fg)" },
  dark: { background: "var(--lm-ink-900)", color: "#fff" },
  light: { background: "#fff", color: "var(--lm-ink)" },
  outline: { background: "transparent", color: "var(--fg)", boxShadow: "inset 0 0 0 1px var(--border-strong)" },
};

const hoverVariants: Record<Variant, CSSProperties> = {
  primary: { background: "var(--accent-400)" },
  secondary: { background: "rgba(255,255,255,0.12)" },
  ghost: { opacity: 1 },
  dark: { background: "var(--lm-ink-700)" },
  light: { background: "var(--lm-paper-alt)" },
  outline: { background: "rgba(255,255,255,0.04)" },
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  href,
  style,
  type = "button",
}: Props) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);

  const base: CSSProperties = {
    fontFamily: "inherit",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    letterSpacing: "-0.005em",
    transition:
      "background 180ms var(--ease-out), color 180ms var(--ease-out), transform 120ms var(--ease-out), opacity 180ms var(--ease-out), box-shadow 180ms var(--ease-out)",
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transform: press ? "scale(0.98)" : "scale(1)",
    ...(variant === "ghost" ? { opacity: hover ? 1 : 0.78 } : {}),
  };

  const merged: CSSProperties = {
    ...base,
    ...sizes[size],
    ...baseVariants[variant],
    ...(hover ? hoverVariants[variant] : {}),
    ...(style || {}),
  };

  const commonHandlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setPress(false); },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
  };

  if (href) {
    return (
      <a href={href} style={merged} {...commonHandlers}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} style={merged} {...commonHandlers}>
      {children}
    </button>
  );
}

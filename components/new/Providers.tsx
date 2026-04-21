"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Lang } from "@/lib/new-content";

type Theme = "dark" | "light";
type Accent = "purple" | "blue" | "red" | "yellow" | "green";
type Density = "compact" | "default" | "spacious";

type Tweaks = { theme: Theme; accent: Accent; density: Density };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  tweaks: Tweaks;
  setTweaks: (t: Tweaks) => void;
};

const SiteContext = createContext<Ctx | null>(null);

const DEFAULTS: { lang: Lang } & Tweaks = {
  lang: "es",
  theme: "light",
  accent: "purple",
  density: "spacious",
};

export function Providers({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULTS.lang);
  const [tweaks, setTweaksState] = useState<Tweaks>({
    theme: DEFAULTS.theme,
    accent: DEFAULTS.accent,
    density: DEFAULTS.density,
  });

  useEffect(() => {
    try {
      const storedLang = localStorage.getItem("lm.lang") as Lang | null;
      const storedTheme = localStorage.getItem("lm.theme") as Theme | null;
      const storedAccent = localStorage.getItem("lm.accent") as Accent | null;
      const storedDensity = localStorage.getItem("lm.density") as Density | null;
      if (storedLang) setLangState(storedLang);
      setTweaksState((t) => ({
        theme: storedTheme ?? t.theme,
        accent: storedAccent ?? t.accent,
        density: storedDensity ?? t.density,
      }));
    } catch {}
  }, []);

  useEffect(() => {
    const el = document.getElementById("new-site-wrapper");
    if (el) {
      el.dataset.theme = tweaks.theme;
      el.dataset.accent = tweaks.accent;
      el.dataset.density = tweaks.density;
    }
    try {
      localStorage.setItem("lm.theme", tweaks.theme);
      localStorage.setItem("lm.accent", tweaks.accent);
      localStorage.setItem("lm.density", tweaks.density);
    } catch {}
  }, [tweaks]);

  useEffect(() => {
    try { localStorage.setItem("lm.lang", lang); } catch {}
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang: setLangState,
      tweaks,
      setTweaks: setTweaksState,
    }),
    [lang, tweaks],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): Ctx {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <Providers>");
  return ctx;
}

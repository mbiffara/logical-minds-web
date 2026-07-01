"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/lib/translations";

/** Map the current pathname to its equivalent in the target locale. */
function localizedPath(pathname: string, target: Language): string {
  // Strip any existing /es prefix to get the canonical (English) path.
  const base = pathname.replace(/^\/es(?=\/|$)/, "") || "/";
  if (target === "es") {
    return base === "/" ? "/es" : `/es${base}`;
  }
  return base;
}

export default function LanguageSwitcher() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 p-[3px] relative z-[60]">
      {(["en", "es"] as const).map((l) => (
        <button
          key={l}
          onClick={() => {
            if (l !== language) router.push(localizedPath(pathname ?? "/", l));
          }}
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
            language === l
              ? "bg-gray-900 text-white"
              : "text-gray-400 hover:text-gray-600"
          }`}
          style={{ fontFamily: "var(--font-geist-mono, ui-monospace, monospace)" }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

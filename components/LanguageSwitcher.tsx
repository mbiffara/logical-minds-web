"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 p-[3px] relative z-[60]">
      {(["en", "es"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLanguage(l)}
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

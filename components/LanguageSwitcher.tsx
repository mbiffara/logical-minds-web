"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/[0.1] bg-white/[0.05] backdrop-blur-xl p-1 relative z-[60]">
      <button
        onClick={() => setLanguage("en")}
        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 cursor-pointer sm:py-1 ${
          language === "en"
            ? "bg-violet-500/20 text-violet-400 shadow-[0_0_10px_rgba(124,58,237,0.3)]"
            : "text-gray-400 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("es")}
        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 cursor-pointer sm:py-1 ${
          language === "es"
            ? "bg-violet-500/20 text-violet-400 shadow-[0_0_10px_rgba(124,58,237,0.3)]"
            : "text-gray-400 hover:text-white"
        }`}
      >
        ES
      </button>
    </div>
  );
}

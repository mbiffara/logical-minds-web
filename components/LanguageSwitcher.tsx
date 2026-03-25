"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/[0.1] bg-white/[0.05] backdrop-blur-xl p-0.5 relative z-[60] sm:gap-1 sm:p-1">
      <button
        onClick={() => setLanguage("en")}
        className={`rounded-full px-2 py-1 text-[10px] font-medium transition-all duration-300 cursor-pointer sm:px-3 sm:py-1 sm:text-xs ${
          language === "en"
            ? "bg-violet-500/20 text-violet-400 shadow-[0_0_10px_rgba(124,58,237,0.3)]"
            : "text-gray-400 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("es")}
        className={`rounded-full px-2 py-1 text-[10px] font-medium transition-all duration-300 cursor-pointer sm:px-3 sm:py-1 sm:text-xs ${
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

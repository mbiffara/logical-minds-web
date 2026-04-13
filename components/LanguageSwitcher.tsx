"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-gray-200 bg-white/60 backdrop-blur-xl p-0.5 relative z-[60] sm:gap-1 sm:p-1 shadow-sm">
      <button
        onClick={() => setLanguage("en")}
        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all duration-300 cursor-pointer sm:px-3 sm:py-1 sm:text-xs ${
          language === "en"
            ? "bg-violet-600 text-white shadow-md"
            : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("es")}
        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all duration-300 cursor-pointer sm:px-3 sm:py-1 sm:text-xs ${
          language === "es"
            ? "bg-violet-600 text-white shadow-md"
            : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
        }`}
      >
        ES
      </button>
    </div>
  );
}

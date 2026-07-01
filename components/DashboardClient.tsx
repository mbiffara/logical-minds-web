"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import type { Language } from "@/lib/translations";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardClient({ locale = "en" }: { locale?: Language }) {
  return (
    <LanguageProvider initialLanguage={locale}>
      <DashboardShell />
    </LanguageProvider>
  );
}

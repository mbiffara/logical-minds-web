"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardPage() {
  return (
    <LanguageProvider>
      <DashboardShell />
    </LanguageProvider>
  );
}

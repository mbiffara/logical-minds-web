"use client";

import dynamic from "next/dynamic";
import { LanguageProvider } from "@/context/LanguageContext";
import { ContactProvider } from "@/context/ContactContext";
import type { Language } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import SkillResourcesPage from "@/components/SkillResourcesPage";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const ContactOverlay = dynamic(() => import("@/components/ContactOverlay"), { ssr: false });

export default function SkillResourcesClient({ locale = "en" }: { locale?: Language }) {
  return (
    <LanguageProvider initialLanguage={locale}>
      <ContactProvider>
        <Navbar />
        <main>
          <SkillResourcesPage />
        </main>
        <Footer />
        <ContactOverlay />
      </ContactProvider>
    </LanguageProvider>
  );
}

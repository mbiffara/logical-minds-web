"use client";

import dynamic from "next/dynamic";
import { LanguageProvider } from "@/context/LanguageContext";
import { ContactProvider } from "@/context/ContactContext";
import type { ProjectView } from "@/lib/caseStudyRoutes";
import type { Language } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import CaseStudyPage from "@/components/CaseStudyPage";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const ContactOverlay = dynamic(() => import("@/components/ContactOverlay"), { ssr: false });

export default function CaseStudyRouteClient({
  projectKey,
  locale = "en",
}: {
  projectKey: ProjectView;
  locale?: Language;
}) {
  return (
    <LanguageProvider initialLanguage={locale}>
      <ContactProvider>
        <Navbar />
        <main>
          <CaseStudyPage projectKey={projectKey} />
        </main>
        <Footer />
        <ContactOverlay />
      </ContactProvider>
    </LanguageProvider>
  );
}

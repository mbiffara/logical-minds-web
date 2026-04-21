"use client";

import { use } from "react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { LanguageProvider } from "@/context/LanguageContext";
import { ContactProvider } from "@/context/ContactContext";
import { SLUG_TO_PROJECT } from "@/lib/caseStudyRoutes";
import Navbar from "@/components/Navbar";
import CaseStudyPage from "@/components/CaseStudyPage";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const ContactOverlay = dynamic(() => import("@/components/ContactOverlay"), { ssr: false });

export default function CaseStudyRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const projectKey = SLUG_TO_PROJECT[slug];

  if (!projectKey) {
    redirect("/");
  }

  return (
    <LanguageProvider>
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

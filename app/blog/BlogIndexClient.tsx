"use client";

import dynamic from "next/dynamic";
import { LanguageProvider } from "@/context/LanguageContext";
import { ContactProvider } from "@/context/ContactContext";
import type { Language } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import BlogIndexPage from "@/components/BlogIndexPage";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const ContactOverlay = dynamic(() => import("@/components/ContactOverlay"), { ssr: false });

export default function BlogIndexClient({ locale = "en" }: { locale?: Language }) {
  return (
    <LanguageProvider initialLanguage={locale}>
      <ContactProvider>
        <Navbar />
        <main>
          <BlogIndexPage />
        </main>
        <Footer />
        <ContactOverlay />
      </ContactProvider>
    </LanguageProvider>
  );
}

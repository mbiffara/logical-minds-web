"use client";

import dynamic from "next/dynamic";
import { LanguageProvider } from "@/context/LanguageContext";
import { ContactProvider } from "@/context/ContactContext";
import Navbar from "@/components/Navbar";

const MvpLanding = dynamic(() => import("@/components/MvpLanding"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const ContactOverlay = dynamic(() => import("@/components/ContactOverlay"), { ssr: false });

export default function MvpPage() {
  return (
    <LanguageProvider>
      <ContactProvider>
        <Navbar />
        <main>
          <MvpLanding />
        </main>
        <Footer />
        <ContactOverlay />
      </ContactProvider>
    </LanguageProvider>
  );
}

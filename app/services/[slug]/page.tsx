"use client";

import { use } from "react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { LanguageProvider } from "@/context/LanguageContext";
import { ContactProvider } from "@/context/ContactContext";
import { SLUG_TO_SERVICE } from "@/lib/serviceRoutes";
import Navbar from "@/components/Navbar";
import ServicePage from "@/components/ServicePage";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const ContactOverlay = dynamic(() => import("@/components/ContactOverlay"), { ssr: false });

export default function ServiceRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const serviceKey = SLUG_TO_SERVICE[slug];

  if (!serviceKey) {
    redirect("/");
  }

  return (
    <LanguageProvider>
      <ContactProvider>
        <Navbar />
        <main>
          <ServicePage serviceKey={serviceKey} />
        </main>
        <Footer />
        <ContactOverlay />
      </ContactProvider>
    </LanguageProvider>
  );
}

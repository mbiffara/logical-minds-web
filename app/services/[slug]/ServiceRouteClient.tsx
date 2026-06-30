"use client";

import dynamic from "next/dynamic";
import { LanguageProvider } from "@/context/LanguageContext";
import { ContactProvider } from "@/context/ContactContext";
import type { ServiceView } from "@/lib/serviceRoutes";
import Navbar from "@/components/Navbar";
import ServicePage from "@/components/ServicePage";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const ContactOverlay = dynamic(() => import("@/components/ContactOverlay"), { ssr: false });

export default function ServiceRouteClient({ serviceKey }: { serviceKey: ServiceView }) {
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

"use client";

import dynamic from "next/dynamic";
import { LanguageProvider } from "@/context/LanguageContext";
import { ContactProvider } from "@/context/ContactContext";
import { AgentDetailProvider } from "@/context/AgentDetailContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SectionDivider from "@/components/SectionDivider";
import ClientsMarquee from "@/components/ClientsMarquee";

// Lazy load below-fold components
const About = dynamic(() => import("@/components/About"), { ssr: false });
const Roadmap = dynamic(() => import("@/components/Roadmap"), { ssr: false });
const Services = dynamic(() => import("@/components/Services"), { ssr: false });
const Portfolio = dynamic(() => import("@/components/Portfolio"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

// Lazy load overlays (only rendered when opened)
const ContactOverlay = dynamic(() => import("@/components/ContactOverlay"), { ssr: false });
const AgentDetailOverlay = dynamic(() => import("@/components/AgentDetailOverlay"), { ssr: false });

export default function Home() {
  return (
    <LanguageProvider>
      <ContactProvider>
        <AgentDetailProvider>
            <Navbar />
            <main>
              <Hero />
              <About />
              <ClientsMarquee />
              <SectionDivider />
              <Roadmap />
              <SectionDivider />
              <Services />
              <SectionDivider />
              <Portfolio />
              <SectionDivider />
              <Testimonials />
            </main>
            <Footer />
            <ContactOverlay />
            <AgentDetailOverlay />
        </AgentDetailProvider>
      </ContactProvider>
    </LanguageProvider>
  );
}

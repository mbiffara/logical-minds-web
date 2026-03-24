"use client";

import dynamic from "next/dynamic";
import { LanguageProvider } from "@/context/LanguageContext";
import { ContactProvider } from "@/context/ContactContext";
import { AgentDetailProvider } from "@/context/AgentDetailContext";
import { ServiceDetailProvider } from "@/context/ServiceDetailContext";
import { PortfolioDetailProvider } from "@/context/PortfolioDetailContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SectionDivider from "@/components/SectionDivider";

// Lazy load below-fold components
const ScrollMarquee = dynamic(() => import("@/components/ScrollMarquee"), { ssr: false });
const About = dynamic(() => import("@/components/About"), { ssr: false });
const HowWeWork = dynamic(() => import("@/components/HowWeWork"), { ssr: false });
const Services = dynamic(() => import("@/components/Services"), { ssr: false });
const Portfolio = dynamic(() => import("@/components/Portfolio"), { ssr: false });
const Partners = dynamic(() => import("@/components/Partners"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

// Lazy load overlays (only rendered when opened)
const ContactOverlay = dynamic(() => import("@/components/ContactOverlay"), { ssr: false });
const AgentDetailOverlay = dynamic(() => import("@/components/AgentDetailOverlay"), { ssr: false });
const ServiceDetailOverlay = dynamic(() => import("@/components/ServiceDetailOverlay"), { ssr: false });
const PortfolioDetailOverlay = dynamic(() => import("@/components/PortfolioDetailOverlay"), { ssr: false });

export default function Home() {
  return (
    <LanguageProvider>
      <ContactProvider>
        <AgentDetailProvider>
          <ServiceDetailProvider>
            <PortfolioDetailProvider>
              <Navbar />
              <main>
                <Hero />
                <ScrollMarquee />
                <SectionDivider />
                <About />
                <SectionDivider />
                <HowWeWork />
                <SectionDivider />
                <Services />
                <SectionDivider />
                <Portfolio />
                <SectionDivider />
                <Partners />
                <SectionDivider />
                <Testimonials />
                <ScrollMarquee />
              </main>
              <Footer />
              <ContactOverlay />
              <AgentDetailOverlay />
              <ServiceDetailOverlay />
              <PortfolioDetailOverlay />
            </PortfolioDetailProvider>
          </ServiceDetailProvider>
        </AgentDetailProvider>
      </ContactProvider>
    </LanguageProvider>
  );
}

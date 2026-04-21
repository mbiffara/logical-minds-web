"use client";

import { Providers } from "@/components/new/Providers";
import Navbar from "@/components/new/Navbar";
import HeroSection from "@/components/new/HeroSection";
import {
  Clients,
  ServicesGrid,
  Approach,
  Stats,
  Work,
  About,
  FinalCTA,
  Footer,
} from "@/components/new/Sections";
import Tweaks from "@/components/new/Tweaks";

export default function NewPage() {
  return (
    <Providers>
      <div
        id="new-site-wrapper"
        data-theme="light"
        data-accent="purple"
        data-density="spacious"
        style={{ position: "fixed", inset: 0, overflowY: "auto", zIndex: 50 }}
      >
        <Navbar />
        <main>
          <HeroSection />
          <Clients />
          <ServicesGrid />
          <Approach />
          <Stats />
          <Work />
          <About />
          <FinalCTA />
        </main>
        <Footer />
        <Tweaks />
      </div>
    </Providers>
  );
}

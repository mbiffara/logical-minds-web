"use client";

import { use } from "react";
import { Providers } from "@/components/new/Providers";
import Navbar from "@/components/new/Navbar";
import { Footer } from "@/components/new/Sections";
import Tweaks from "@/components/new/Tweaks";
import ServicePageContent from "@/components/new/ServicePageContent";

export default function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

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
          <ServicePageContent id={id} />
        </main>
        <Footer />
        <Tweaks />
      </div>
    </Providers>
  );
}

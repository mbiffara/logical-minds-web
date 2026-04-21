"use client";

import { use } from "react";
import { Providers } from "@/components/new/Providers";
import Navbar from "@/components/new/Navbar";
import { Footer } from "@/components/new/Sections";
import Tweaks from "@/components/new/Tweaks";
import CasePageContent from "@/components/new/CasePageContent";

export default function CasePage({ params }: { params: Promise<{ id: string }> }) {
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
          <CasePageContent id={id} />
        </main>
        <Footer />
        <Tweaks />
      </div>
    </Providers>
  );
}

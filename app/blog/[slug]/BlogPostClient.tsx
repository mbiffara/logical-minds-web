"use client";

import dynamic from "next/dynamic";
import { LanguageProvider } from "@/context/LanguageContext";
import { ContactProvider } from "@/context/ContactContext";
import type { Language } from "@/lib/translations";
import type { BlogPost } from "@/lib/blogContent";
import Navbar from "@/components/Navbar";
import BlogPostPage from "@/components/BlogPostPage";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const ContactOverlay = dynamic(() => import("@/components/ContactOverlay"), { ssr: false });

export default function BlogPostClient({
  post,
  locale = "en",
}: {
  post: BlogPost;
  locale?: Language;
}) {
  return (
    <LanguageProvider initialLanguage={locale}>
      <ContactProvider>
        <Navbar />
        <main>
          <BlogPostPage post={post} />
        </main>
        <Footer />
        <ContactOverlay />
      </ContactProvider>
    </LanguageProvider>
  );
}

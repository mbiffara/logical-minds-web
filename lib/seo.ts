import type { Metadata } from "next";

/**
 * Canonical host for the site. The domain is served on the `www` subdomain
 * (the apex 308-redirects to it), so every canonical/OG/sitemap URL must use
 * `www` to avoid a self-redirecting canonical.
 */
export const SITE_URL = "https://www.logicalminds.co";

const OG_IMAGE = `${SITE_URL}/og-image.png`;

type SeoEntry = { title: string; description: string };

/**
 * Per-service SEO copy (English — the indexed language). Keyed by URL slug
 * (see SERVICE_SLUGS in lib/serviceRoutes.ts). Kept static so it can run in a
 * server `generateMetadata` without the client i18n context.
 */
export const serviceSeo: Record<string, SeoEntry> = {
  "logical-experiences": {
    title: "Product Strategy & UX/UI Design",
    description:
      "From idea validation to pixel-perfect interfaces — product discovery and UX/UI design that build products people love. By Logical Minds, Buenos Aires.",
  },
  "logical-development": {
    title: "Full-Stack Software Engineering",
    description:
      "Robust, tested, production-ready software engineered for scale — full-stack development and QA from Logical Minds' hybrid human + AI team.",
  },
  "logical-cloud": {
    title: "Cloud Infrastructure & AI Integration",
    description:
      "Scalable cloud infrastructure and intelligent automation powered by modern DevOps and AI integration. Built by Logical Minds in Buenos Aires.",
  },
  "logical-talents": {
    title: "Team Scaling & Tech Recruitment",
    description:
      "Scale your team with dedicated engineers and AI-powered technical recruitment built around your workflow and stack. From Logical Minds.",
  },
  "mvp-12-weeks": {
    title: "MVP in 12 Weeks",
    description:
      "From zero to a production-ready MVP in 12 weeks — strategy, design, build, QA, and launch included. Ship your product with Logical Minds.",
  },
};

/**
 * Per-case-study SEO copy (English). Keyed by URL slug (see CASE_STUDY_SLUGS
 * in lib/caseStudyRoutes.ts).
 */
export const caseStudySeo: Record<string, SeoEntry> = {
  creeadores: {
    title: "Creeadores Case Study",
    description:
      "UGC marketplace connecting brands with content creators — 500+ creators onboarded and 3x faster campaign launches. A Logical Minds case study.",
  },
  "somos-fin": {
    title: "Somos Fin Case Study",
    description:
      "AI chatbot for a personal finance platform delivering 24/7 guidance with an 85% resolution rate and +60% engagement. A Logical Minds case study.",
  },
  tecabot: {
    title: "Tecabot Case Study",
    description:
      "Web app and WhatsApp bot for expense tracking — 2,000+ monthly active users logging 10K+ expenses a month. A Logical Minds case study.",
  },
  "solid-core": {
    title: "SolidCore Case Study",
    description:
      "Unified mobile app for boutique fitness studio management across 100+ studios, lifting member retention +35%. A Logical Minds case study.",
  },
  preply: {
    title: "Preply Case Study",
    description:
      "AI-powered language tutoring marketplace matching 100K+ tutors with learners across 180 countries. A Logical Minds case study.",
  },
};

/**
 * Build a complete Metadata object for a sub-page: unique title/description,
 * a self-referencing canonical, and a full openGraph block (Next overwrites
 * rather than deep-merges openGraph, so all fields must be restated here).
 */
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: "es_AR",
      url,
      siteName: "Logical Minds",
      title,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

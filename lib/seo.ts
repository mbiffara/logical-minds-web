import type { Metadata } from "next";
import type { Language } from "@/lib/translations";

/**
 * Canonical host. The apex 308-redirects to `www`, so every canonical / OG /
 * hreflang / sitemap URL must use `www` to avoid a self-redirecting canonical.
 */
export const SITE_URL = "https://www.logicalminds.co";

const OG_IMAGE = `${SITE_URL}/og-image.png`;

/** English lives at the root; Spanish is prefixed with `/es` ("as-needed"). */
export function localePrefix(locale: Language): string {
  return locale === "es" ? "/es" : "";
}

const OG_LOCALE: Record<Language, string> = { en: "en_US", es: "es_AR" };

type SeoEntry = { title: string; description: string };

/**
 * Per-page SEO copy per locale. Kept static (not via the client i18n context)
 * so it can run inside a server `generateMetadata`. Keyed by URL slug — see
 * SERVICE_SLUGS / CASE_STUDY_SLUGS.
 */
export const homeSeo: Record<Language, SeoEntry> = {
  en: {
    title: "Logical Minds — We ship products that scale.",
    description:
      "Product agency that partners with companies to build and ship technology products. A hybrid team of engineers, designers, and AI agents — based in Buenos Aires, serving LATAM & globally.",
  },
  es: {
    title: "Logical Minds — Creamos productos que escalan.",
    description:
      "Agencia de producto que se asocia con empresas para construir y lanzar productos tecnológicos. Un equipo híbrido de ingenieros, diseñadores y agentes de IA — con base en Buenos Aires, al servicio de LATAM y el mundo.",
  },
};

export const serviceSeo: Record<Language, Record<string, SeoEntry>> = {
  en: {
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
  },
  es: {
    "logical-experiences": {
      title: "Estrategia de Producto y Diseño UX/UI",
      description:
        "De la validación de ideas a interfaces pixel-perfect — descubrimiento de producto y diseño UX/UI que crean productos que la gente ama. Por Logical Minds, Buenos Aires.",
    },
    "logical-development": {
      title: "Ingeniería de Software Full-Stack",
      description:
        "Software robusto, testeado y listo para producción, diseñado para escalar — desarrollo full-stack y QA del equipo híbrido humano + IA de Logical Minds.",
    },
    "logical-cloud": {
      title: "Infraestructura Cloud e Integración de IA",
      description:
        "Infraestructura cloud escalable y automatización inteligente con DevOps moderno e integración de IA. Construido por Logical Minds en Buenos Aires.",
    },
    "logical-talents": {
      title: "Escalado de Equipos y Reclutamiento Tech",
      description:
        "Escala tu equipo con ingenieros dedicados y reclutamiento técnico potenciado por IA, adaptado a tu flujo de trabajo y stack. Por Logical Minds.",
    },
    "mvp-12-weeks": {
      title: "MVP en 12 Semanas",
      description:
        "De cero a un MVP listo para producción en 12 semanas — estrategia, diseño, desarrollo, QA y lanzamiento incluidos. Lanza tu producto con Logical Minds.",
    },
  },
};

export const caseStudySeo: Record<Language, Record<string, SeoEntry>> = {
  en: {
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
  },
  es: {
    creeadores: {
      title: "Caso de Éxito: Creeadores",
      description:
        "Marketplace UGC que conecta marcas con creadores de contenido — 500+ creadores incorporados y lanzamientos de campaña 3x más rápidos. Un caso de éxito de Logical Minds.",
    },
    "somos-fin": {
      title: "Caso de Éxito: Somos Fin",
      description:
        "Chatbot de IA para una plataforma de finanzas personales con asistencia 24/7, 85% de resolución y +60% de engagement. Un caso de éxito de Logical Minds.",
    },
    tecabot: {
      title: "Caso de Éxito: Tecabot",
      description:
        "App web y bot de WhatsApp para registro de gastos — 2.000+ usuarios activos mensuales y 10K+ gastos al mes. Un caso de éxito de Logical Minds.",
    },
    "solid-core": {
      title: "Caso de Éxito: SolidCore",
      description:
        "App móvil unificada para gestión de estudios fitness boutique en 100+ estudios, con +35% de retención de miembros. Un caso de éxito de Logical Minds.",
    },
    preply: {
      title: "Caso de Éxito: Preply",
      description:
        "Marketplace de tutoría de idiomas con IA que conecta 100K+ tutores con estudiantes en 180 países. Un caso de éxito de Logical Minds.",
    },
  },
};

export const dashboardSeo: Record<Language, SeoEntry> = {
  en: {
    title: "AI Command Center — Logical Minds",
    description:
      "Mission-control dashboard tracking 18 specialized AI agents across 6 product lifecycle stages in real time.",
  },
  es: {
    title: "Centro de Comando IA — Logical Minds",
    description:
      "Panel de control que monitorea 18 agentes de IA especializados en 6 etapas del ciclo de vida del producto en tiempo real.",
  },
};

/**
 * Build a complete, locale-aware Metadata object: a self-referencing canonical
 * plus reciprocal hreflang alternates (en / es / x-default) and a full
 * openGraph block (Next overwrites rather than deep-merges openGraph).
 *
 * `enPath` / `esPath` are absolute-from-root paths for the two locale variants
 * (use "" for the English homepage so the canonical has no trailing slash).
 * `title` may be a plain string (the root "%s — Logical Minds" template is
 * applied) or `{ absolute }` to bypass the template.
 */
export function localizedMetadata({
  locale,
  enPath,
  esPath,
  title,
  description,
}: {
  locale: Language;
  enPath: string;
  esPath: string;
  title: Metadata["title"];
  description: string;
}): Metadata {
  const enUrl = `${SITE_URL}${enPath}`;
  const esUrl = `${SITE_URL}${esPath}`;
  const url = locale === "es" ? esUrl : enUrl;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: enUrl,
        es: esUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      alternateLocale: locale === "es" ? OG_LOCALE.en : OG_LOCALE.es,
      url,
      siteName: "Logical Minds",
      title: typeof title === "object" && title && "absolute" in title ? title.absolute : (title as string),
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Logical Minds" }],
    },
    twitter: {
      card: "summary_large_image",
      title: typeof title === "object" && title && "absolute" in title ? title.absolute : (title as string),
      description,
      images: [OG_IMAGE],
    },
  };
}

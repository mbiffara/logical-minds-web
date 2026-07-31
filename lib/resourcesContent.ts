/**
 * Free downloadable resources (Claude/agent skills as .md files).
 *
 * The actual files live in `public/resources/skills/` and are served
 * statically, so each one has a direct, shareable URL:
 *   https://www.logicalminds.co/resources/skills/<file>.md
 *
 * To publish a new skill: drop the .md file in `public/resources/skills/`
 * and append an entry here — the listing page and sitemap pick it up.
 */

export interface SkillResourceLocale {
  title: string;
  description: string;
}

export interface SkillResource {
  slug: string;
  /** File name inside public/resources/skills/ (also the download name). */
  file: string;
  /** ISO date the resource was published. */
  date: string;
  en: SkillResourceLocale;
  es: SkillResourceLocale;
}

export const SKILL_RESOURCES: SkillResource[] = [
  {
    slug: "app-security-best-practices",
    file: "app-security-best-practices.md",
    date: "2026-07-31",
    en: {
      title: "App Security Best Practices",
      description:
        "A Claude skill that enforces security best practices when building or reviewing app features — JWT auth, server-side role checks, file uploads, webhooks, OAuth, multi-tenancy, privacy, and a 12-point review checklist.",
    },
    es: {
      title: "App Security Best Practices",
      description:
        "Una skill de Claude que aplica buenas prácticas de seguridad al construir o revisar funcionalidades — auth con JWT, chequeos de roles en el servidor, uploads, webhooks, OAuth, multi-tenancy, privacidad y un checklist de review de 12 puntos.",
    },
  },
  {
    slug: "mvp-scoping",
    file: "mvp-scoping.md",
    date: "2026-07-30",
    en: {
      title: "MVP Scoping",
      description:
        "A Claude skill that turns a product idea into a ruthlessly scoped MVP plan — the one behavior to validate, what stays manual, and what to ship in 12 weeks.",
    },
    es: {
      title: "MVP Scoping",
      description:
        "Una skill de Claude que convierte una idea de producto en un plan de MVP con alcance implacable — el comportamiento a validar, qué queda manual y qué lanzar en 12 semanas.",
    },
  },
];

export function skillDownloadPath(resource: SkillResource): string {
  return `/resources/skills/${resource.file}`;
}

export function formatSkillDate(iso: string, language: "en" | "es"): string {
  return new Intl.DateTimeFormat(language === "es" ? "es-AR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}

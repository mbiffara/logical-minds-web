import type { MetadataRoute } from "next";
import { SITE_URL, serviceSeo, caseStudySeo } from "@/lib/seo";

/**
 * Emit both locale variants of a page with reciprocal hreflang alternates.
 * Next does not auto-add a self-referencing <xhtml:link>, so each entry lists
 * both `en` and `es` (plus x-default) explicitly.
 * `enPath` uses "" for the homepage so the URL has no trailing slash.
 */
function localizedEntries(
  enPath: string,
  priority: number,
): MetadataRoute.Sitemap {
  const enUrl = `${SITE_URL}${enPath}`;
  const esUrl = `${SITE_URL}/es${enPath}`;
  const languages = { en: enUrl, es: esUrl, "x-default": enUrl };
  const common = { changeFrequency: "monthly" as const, priority, alternates: { languages } };
  return [
    { url: enUrl, ...common },
    { url: esUrl, ...common },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localizedEntries("", 1),
    ...Object.keys(serviceSeo.en).flatMap((slug) =>
      localizedEntries(`/services/${slug}`, 0.8),
    ),
    ...Object.keys(caseStudySeo.en).flatMap((slug) =>
      localizedEntries(`/case-studies/${slug}`, 0.7),
    ),
    ...localizedEntries("/dashboard-ia", 0.3),
  ];
}

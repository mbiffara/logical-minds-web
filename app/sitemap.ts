import type { MetadataRoute } from "next";
import { SITE_URL, serviceSeo, caseStudySeo } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...Object.keys(serviceSeo).map((slug) => ({
      url: `${SITE_URL}/services/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...Object.keys(caseStudySeo).map((slug) => ({
      url: `${SITE_URL}/case-studies/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return routes;
}

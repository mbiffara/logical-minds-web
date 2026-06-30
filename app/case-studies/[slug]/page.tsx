import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SLUG_TO_PROJECT, CASE_STUDY_SLUGS } from "@/lib/caseStudyRoutes";
import { caseStudySeo, pageMetadata } from "@/lib/seo";
import CaseStudyRouteClient from "./CaseStudyRouteClient";

export function generateStaticParams() {
  return Object.values(CASE_STUDY_SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seo = caseStudySeo[slug];
  if (!seo) return {};
  return pageMetadata({
    path: `/case-studies/${slug}`,
    title: seo.title,
    description: seo.description,
  });
}

export default async function CaseStudyRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectKey = SLUG_TO_PROJECT[slug];

  if (!projectKey) {
    notFound();
  }

  return <CaseStudyRouteClient projectKey={projectKey} />;
}

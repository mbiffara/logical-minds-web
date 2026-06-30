import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SLUG_TO_SERVICE, SERVICE_SLUGS } from "@/lib/serviceRoutes";
import { serviceSeo, pageMetadata } from "@/lib/seo";
import ServiceRouteClient from "./ServiceRouteClient";

export function generateStaticParams() {
  return Object.values(SERVICE_SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seo = serviceSeo[slug];
  if (!seo) return {};
  return pageMetadata({
    path: `/services/${slug}`,
    title: seo.title,
    description: seo.description,
  });
}

export default async function ServiceRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const serviceKey = SLUG_TO_SERVICE[slug];

  if (!serviceKey) {
    notFound();
  }

  return <ServiceRouteClient serviceKey={serviceKey} />;
}

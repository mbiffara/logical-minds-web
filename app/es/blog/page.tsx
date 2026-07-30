import type { Metadata } from "next";
import { blogSeo, localizedMetadata } from "@/lib/seo";
import BlogIndexClient from "../../blog/BlogIndexClient";

export const metadata: Metadata = localizedMetadata({
  locale: "es",
  enPath: "/blog",
  esPath: "/es/blog",
  title: blogSeo.es.title,
  description: blogSeo.es.description,
});

export default function BlogRouteEs() {
  return <BlogIndexClient locale="es" />;
}

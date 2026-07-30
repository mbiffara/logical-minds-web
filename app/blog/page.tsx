import type { Metadata } from "next";
import { blogSeo, localizedMetadata } from "@/lib/seo";
import BlogIndexClient from "./BlogIndexClient";

export const metadata: Metadata = localizedMetadata({
  locale: "en",
  enPath: "/blog",
  esPath: "/es/blog",
  title: blogSeo.en.title,
  description: blogSeo.en.description,
});

export default function BlogRoute() {
  return <BlogIndexClient locale="en" />;
}

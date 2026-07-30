import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPost } from "@/lib/blogContent";
import { localizedMetadata } from "@/lib/seo";
import BlogPostClient from "./BlogPostClient";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return localizedMetadata({
    locale: "en",
    enPath: `/blog/${slug}`,
    esPath: `/es/blog/${slug}`,
    title: post.en.title,
    description: post.en.excerpt,
  });
}

export default async function BlogPostRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} locale="en" />;
}

import type { Metadata } from "next";
import { dashboardSeo, localizedMetadata } from "@/lib/seo";

export const metadata: Metadata = localizedMetadata({
  locale: "en",
  enPath: "/dashboard-ia",
  esPath: "/es/dashboard-ia",
  title: { absolute: dashboardSeo.en.title },
  description: dashboardSeo.en.description,
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

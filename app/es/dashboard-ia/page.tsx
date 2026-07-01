import type { Metadata } from "next";
import { dashboardSeo, localizedMetadata } from "@/lib/seo";
import DashboardClient from "@/components/DashboardClient";

export const metadata: Metadata = localizedMetadata({
  locale: "es",
  enPath: "/dashboard-ia",
  esPath: "/es/dashboard-ia",
  title: { absolute: dashboardSeo.es.title },
  description: dashboardSeo.es.description,
});

export default function DashboardPageEs() {
  return <DashboardClient locale="es" />;
}

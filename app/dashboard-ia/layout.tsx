import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "AI Command Center — Logical Minds" },
  description:
    "Mission-control dashboard tracking 18 specialized AI agents across 6 product lifecycle stages in real time.",
  alternates: { canonical: `${SITE_URL}/dashboard-ia` },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

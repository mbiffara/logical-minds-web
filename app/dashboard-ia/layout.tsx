import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Command Center — Logical Minds",
  description:
    "Mission-control dashboard tracking 18 specialized AI agents across 6 product lifecycle stages in real time.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

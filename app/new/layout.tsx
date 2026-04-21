import type { Metadata } from "next";
import "./new-styles.css";

export const metadata: Metadata = {
  title: "Logical Minds — New",
  description: "Human + AI hybrid digital products agency. Hybrid design preview.",
};

export default function NewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

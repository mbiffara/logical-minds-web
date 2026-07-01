import type { Metadata } from "next";
import { homeSeo, localizedMetadata } from "@/lib/seo";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = localizedMetadata({
  locale: "es",
  enPath: "",
  esPath: "/es",
  title: { absolute: homeSeo.es.title },
  description: homeSeo.es.description,
});

export default function HomeEs() {
  return <HomeClient locale="es" />;
}

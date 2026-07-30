import type { Metadata } from "next";
import { skillResourcesSeo, localizedMetadata } from "@/lib/seo";
import SkillResourcesClient from "../../../resources/skills/SkillResourcesClient";

export const metadata: Metadata = localizedMetadata({
  locale: "es",
  enPath: "/resources/skills",
  esPath: "/es/resources/skills",
  title: skillResourcesSeo.es.title,
  description: skillResourcesSeo.es.description,
});

export default function SkillResourcesRouteEs() {
  return <SkillResourcesClient locale="es" />;
}

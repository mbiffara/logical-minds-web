import type { Metadata } from "next";
import { skillResourcesSeo, localizedMetadata } from "@/lib/seo";
import SkillResourcesClient from "./SkillResourcesClient";

export const metadata: Metadata = localizedMetadata({
  locale: "en",
  enPath: "/resources/skills",
  esPath: "/es/resources/skills",
  title: skillResourcesSeo.en.title,
  description: skillResourcesSeo.en.description,
});

export default function SkillResourcesRoute() {
  return <SkillResourcesClient locale="en" />;
}

export type ServiceView = "logicalExperiences" | "logicalDevelopment" | "logicalCloud" | "logicalTalents" | "logicalMvp";

export const SERVICE_SLUGS: Record<ServiceView, string> = {
  logicalExperiences: "logical-experiences",
  logicalDevelopment: "logical-development",
  logicalCloud: "logical-cloud",
  logicalTalents: "logical-talents",
  logicalMvp: "mvp-12-weeks",
};

export const SLUG_TO_SERVICE: Record<string, ServiceView> = Object.fromEntries(
  Object.entries(SERVICE_SLUGS).map(([key, slug]) => [slug, key as ServiceView])
) as Record<string, ServiceView>;

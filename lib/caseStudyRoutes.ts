export type ProjectView = "creeadores" | "somosFin" | "tecabot" | "solidCore" | "preply";

export const CASE_STUDY_SLUGS: Record<ProjectView, string> = {
  creeadores: "creeadores",
  somosFin: "somos-fin",
  tecabot: "tecabot",
  solidCore: "solid-core",
  preply: "preply",
};

export const SLUG_TO_PROJECT: Record<string, ProjectView> = Object.fromEntries(
  Object.entries(CASE_STUDY_SLUGS).map(([key, slug]) => [slug, key as ProjectView])
) as Record<string, ProjectView>;

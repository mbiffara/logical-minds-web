"use client";

import { useLanguage } from "@/context/LanguageContext";
import {
  SiNextdotjs,
  SiRubyonrails,
  SiReact,
  SiPostgresql,
  SiSupabase,
  SiMongodb,
  SiGithubactions,
  SiGooglecloud,
  SiVercel,
  SiDocker,
  SiTypescript,
  SiNodedotjs,
  SiOpenai,
  SiFastapi,
  SiTailwindcss,
  SiNotion,
  SiFigma,
  SiClaude,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import type { IconType } from "react-icons";

const TOOLS: { name: string; icon: IconType }[] = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Ruby on Rails", icon: SiRubyonrails },
  { name: "React Native", icon: SiReact },
  { name: "Claude Code", icon: SiClaude },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Supabase", icon: SiSupabase },
  { name: "MongoDB", icon: SiMongodb },
  { name: "AWS", icon: FaAws },
  { name: "GitHub Actions", icon: SiGithubactions },
  { name: "Google Cloud", icon: SiGooglecloud },
  { name: "Vercel", icon: SiVercel },
  { name: "Docker", icon: SiDocker },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "OpenAI", icon: SiOpenai },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Notion", icon: SiNotion },
  { name: "Figma", icon: SiFigma },
];

export default function ClientsMarquee() {
  const { t } = useLanguage();

  return (
    <section
      style={{
        padding: "36px 0",
        background: "#f8f9fc",
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center gap-8">
        <span
          style={{
            flex: "0 0 auto",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#9ca3af",
          }}
        >
          {t("clients.label") as string}
        </span>

        {/* Marquee container */}
        <div className="relative flex-1 overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f8f9fc] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f8f9fc] to-transparent" />

          <div className="flex animate-[marquee_28s_linear_infinite]">
            {[...TOOLS, ...TOOLS].map((tool, i) => {
              const Icon = tool.icon;
              return (
                <span
                  key={`${tool.name}-${i}`}
                  className="shrink-0 px-5 flex items-center gap-1.5"
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                    letterSpacing: "0.04em",
                    color: "#374151",
                    opacity: 0.85,
                  }}
                >
                  <Icon className="h-6 w-6 shrink-0" />
                  {tool.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

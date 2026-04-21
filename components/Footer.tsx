"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useContact } from "@/context/ContactContext";
import Link from "next/link";
import type { ServiceView } from "@/lib/serviceRoutes";
import { SERVICE_SLUGS } from "@/lib/serviceRoutes";
import { CASE_STUDY_SLUGS, type ProjectView } from "@/lib/caseStudyRoutes";

const SERVICES: { key: ServiceView; label: string; color: string; svg: string }[] = [
  { key: "logicalExperiences", label: "LM Experiences", color: "#227CFF", svg: "/assets/service-experiences.svg" },
  { key: "logicalDevelopment", label: "LM Development", color: "#8b5cf6", svg: "/assets/service-development.svg" },
  { key: "logicalCloud", label: "LM Cloud+AI", color: "#F50132", svg: "/assets/service-cloud.svg" },
  { key: "logicalTalents", label: "LM Talents", color: "#22AE48", svg: "/assets/service-talents.svg" },
];

const WORK: { label: string; key: ProjectView }[] = [
  { label: "Creeadores", key: "creeadores" },
  { label: "Somos Fin", key: "somosFin" },
  { label: "SolidCore", key: "solidCore" },
  { label: "Preply", key: "preply" },
];

export default function Footer() {
  const { t, language } = useLanguage();
  const { openContact } = useContact();

  const handleScroll = (id: string) => {
    if (id === "contact") {
      openContact();
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-white/5 bg-[#1C1C1C]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:py-10 lg:py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <img
              src="/logo-logical-minds-light.svg"
              alt="Logical Minds"
              width={160}
              height={22}
              className="h-6 w-auto"
            />
            <p className="mt-4 max-w-[320px] text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Human + AI · Digital Products Agency
            </p>
          </div>

          {/* Services */}
          <div>
            <h4
              className="mb-3.5"
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}
            >
              {t("nav.services")}
            </h4>
            <ul className="grid gap-2.5">
              {SERVICES.map((s) => (
                <li key={s.key}>
                  <Link
                    href={`/services/${SERVICE_SLUGS[s.key]}`}
                    className="group/svc inline-flex items-center gap-2 text-sm transition-colors duration-200 cursor-pointer"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = s.color;
                      const dot = e.currentTarget.querySelector<HTMLSpanElement>("[data-dot]");
                      if (dot) dot.style.backgroundColor = s.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                      const dot = e.currentTarget.querySelector<HTMLSpanElement>("[data-dot]");
                      if (dot) dot.style.backgroundColor = "rgba(255,255,255,0.1)";
                    }}
                  >
                    <span
                      data-dot
                      className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full transition-colors duration-200"
                      style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    >
                      <img aria-hidden src={s.svg} alt="" className="h-2.5 w-2.5" />
                    </span>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Work */}
          <div>
            <h4
              className="mb-3.5"
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}
            >
              {t("portfolio.badge")}
            </h4>
            <ul className="grid gap-2.5">
              {WORK.map((w) => (
                <li key={w.key}>
                  <Link
                    href={`/case-studies/${CASE_STUDY_SLUGS[w.key]}`}
                    className="text-sm transition-colors duration-200 hover:text-violet-400"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {w.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="mb-3.5"
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}
            >
              {t("nav.contact")}
            </h4>
            <ul className="grid gap-2.5 text-sm">
              <li>
                <a href="mailto:marcelo@logicalminds.co" className="transition-colors duration-200 hover:text-violet-400" style={{ color: "rgba(255,255,255,0.85)" }}>
                  marcelo@logicalminds.co
                </a>
              </li>
              <li style={{ color: "rgba(255,255,255,0.85)" }}>+54 9 11 6045-9009</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-5"
          style={{ borderColor: "rgba(255,255,255,0.08)", fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "ui-monospace, monospace" }}
        >
          <span>&copy; {new Date().getFullYear()} Logical Minds. {t("footer.rights")}</span>
          <div className="flex gap-2.5">
            <a href="https://www.instagram.com/logicalminds.co/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-white/40 transition-all duration-200 hover:border-white/25 hover:bg-white/5 hover:text-white">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
            <a href="https://www.linkedin.com/company/logicalminds-co/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-white/40 transition-all duration-200 hover:border-white/25 hover:bg-white/5 hover:text-white">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

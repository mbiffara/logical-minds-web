"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import { useContact } from "@/context/ContactContext";
import { useServiceDetail, type ServiceView } from "@/context/ServiceDetailContext";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  "about",
  "howWeWork",
  "services",
  "portfolio",
  "contact",
] as const;

/* ── Service groups for dropdowns ──────────────────────────── */
const serviceGroups: { key: ServiceView; color: string }[] = [
  { key: "logicalExperiences", color: "#227CFF" },
  { key: "logicalDevelopment", color: "#FDA901" },
  { key: "logicalCloud", color: "#F50132" },
  { key: "logicalTalents", color: "#22AE48" },
];

const howWeWorkItems = ["specializedAgents", "orchestration", "ecosystem"] as const;

export default function Navbar() {
  const { t } = useLanguage();
  const { openContact } = useContact();
  const { openServiceDetail } = useServiceDetail();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobileLink, setExpandedMobileLink] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLButtonElement | null)[]>([]);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const accentLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const handleDropdownEnter = useCallback((link: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(link);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.filter((l) => l !== "contact") as unknown as string[];
    let observers: IntersectionObserver[] = [];

    const setup = () => {
      observers.forEach((o) => o.disconnect());
      observers = [];

      let found = 0;
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        found++;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          },
          { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
        );

        observer.observe(el);
        observers.push(observer);
      });

      return found === sectionIds.length;
    };

    if (!setup()) {
      const interval = setInterval(() => {
        if (setup()) clearInterval(interval);
      }, 500);
      return () => {
        clearInterval(interval);
        observers.forEach((o) => o.disconnect());
      };
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    setExpandedMobileLink(null);

    requestAnimationFrame(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );

      tl.fromTo(
        sidebarRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power4.out" },
        0.05
      );

      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: "power3.inOut" },
        0.3
      );

      linksRef.current.filter(Boolean).forEach((link, i) => {
        tl.fromTo(
          link,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.55, ease: "power4.out" },
          0.3 + i * 0.07
        );
      });

      numbersRef.current.filter(Boolean).forEach((num, i) => {
        tl.fromTo(
          num,
          { opacity: 0, y: 20, rotateZ: -90, scale: 0.3 },
          { opacity: 1, y: 0, rotateZ: 0, scale: 1, duration: 0.4, ease: "back.out(3)" },
          0.35 + i * 0.07
        );
      });

      accentLinesRef.current.filter(Boolean).forEach((line, i) => {
        tl.fromTo(
          line,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.35, ease: "power3.out" },
          0.4 + i * 0.07
        );
      });

      tl.fromTo(
        footerRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
        0.55
      );
    });
  }, []);

  const closeMenu = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => setMenuOpen(false),
    });

    linksRef.current.filter(Boolean).forEach((link, i) => {
      tl.to(link, { y: "-110%", opacity: 0, duration: 0.35, ease: "power3.in" }, i * 0.03);
    });

    tl.to(
      numbersRef.current.filter(Boolean),
      { opacity: 0, rotateZ: 90, scale: 0.3, duration: 0.25, stagger: 0.03, ease: "power3.in" },
      0
    );

    tl.to(
      accentLinesRef.current.filter(Boolean),
      { scaleX: 0, opacity: 0, duration: 0.25, stagger: 0.02, ease: "power3.in" },
      0
    );

    tl.to(footerRef.current, { y: 15, opacity: 0, duration: 0.25 }, 0);
    tl.to(lineRef.current, { scaleX: 0, duration: 0.3, ease: "power3.in" }, 0.05);
    tl.to(sidebarRef.current, { x: "100%", duration: 0.45, ease: "power3.in" }, 0.1);
    tl.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.15);
  }, []);

  const handleClick = (id: string) => {
    closeMenu();
    if (id === "contact") {
      setTimeout(() => openContact(), 500);
    } else {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  const handleMobileToggle = (link: string) => {
    const hasDropdown = link === "howWeWork" || link === "services";
    if (hasDropdown) {
      setExpandedMobileLink((prev) => (prev === link ? null : link));
    } else {
      handleClick(link);
    }
  };

  const handleMobileSubClick = (sectionId: string, serviceKey?: ServiceView) => {
    closeMenu();
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      if (serviceKey) {
        setTimeout(() => openServiceDetail(serviceKey), 400);
      }
    }, 500);
  };

  /* ── Desktop nav link renderer ──────────────────────────── */
  const renderDesktopLink = (link: (typeof navLinks)[number]) => {
    const isActive = activeSection === link;
    const hasDropdown = link === "howWeWork" || link === "services";

    if (hasDropdown) {
      return (
        <div
          key={link}
          className="relative"
          onMouseEnter={() => handleDropdownEnter(link)}
          onMouseLeave={handleDropdownLeave}
        >
          <button
            onClick={() => {
              document.getElementById(link)?.scrollIntoView({ behavior: "smooth" });
              setOpenDropdown(null);
            }}
            className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer ${
              isActive
                ? "text-violet-600"
                : "text-gray-500 hover:text-violet-600 hover:bg-violet-50"
            }`}
          >
            {t(`nav.${link}`)}
            <svg
              className={`h-3 w-3 transition-transform duration-300 ${openDropdown === link ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            <span
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-violet-500 transition-all duration-300 ${
                isActive ? "w-4 opacity-100" : "w-0 opacity-0"
              }`}
            />
          </button>

          {/* Dropdown panel */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 transition-all duration-300 ${
              openDropdown === link
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="rounded-xl border border-gray-200/80 bg-white/95 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-1.5 min-w-[260px]">
              {link === "services" &&
                serviceGroups.map((group) => (
                  <button
                    key={group.key}
                    onClick={() => {
                      setOpenDropdown(null);
                      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                      setTimeout(() => openServiceDetail(group.key), 400);
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-all duration-200 hover:bg-gray-50 cursor-pointer group/item"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full shrink-0 transition-shadow duration-300 group-hover/item:shadow-[0_0_8px_var(--dot-color)]"
                      style={{ backgroundColor: group.color, "--dot-color": group.color } as React.CSSProperties}
                    />
                    <span className="text-sm font-medium text-gray-600 transition-colors duration-200 group-hover/item:text-gray-900">
                      <span className="text-gray-400">{t(`services.groups.${group.key}.prefix`)}</span>
                      {t(`services.groups.${group.key}.title`)}
                    </span>
                  </button>
                ))}

              {link === "howWeWork" &&
                howWeWorkItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setOpenDropdown(null);
                      document.getElementById("howWeWork")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-all duration-200 hover:bg-gray-50 cursor-pointer group/item"
                  >
                    <span className="h-2.5 w-2.5 rounded-full shrink-0 bg-violet-400 transition-shadow duration-300 group-hover/item:shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                    <span className="text-sm font-medium text-gray-600 transition-colors duration-200 group-hover/item:text-gray-900">
                      {(t(`howWeWork.items.${item}`) as { title: string })?.title}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <button
        key={link}
        onClick={() => {
          document.getElementById(link)?.scrollIntoView({ behavior: "smooth" });
        }}
        className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer ${
          isActive
            ? "text-violet-600"
            : "text-gray-500 hover:text-violet-600 hover:bg-violet-50"
        }`}
      >
        {t(`nav.${link}`)}
        <span
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-violet-500 transition-all duration-300 ${
            isActive ? "w-4 opacity-100" : "w-0 opacity-0"
          }`}
        />
      </button>
    );
  };

  /* ── Mobile sub-items for expanded links ────────────────── */
  const renderMobileSubItems = (link: string) => {
    if (link === "services") {
      return (
        <div className="ml-10 mt-1 mb-2 flex flex-col gap-1">
          {serviceGroups.map((group) => (
            <button
              key={group.key}
              onClick={() => handleMobileSubClick("services", group.key)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-all duration-200 hover:bg-gray-50 cursor-pointer group/sub"
            >
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: group.color }}
              />
              <span className="text-sm font-medium text-gray-500 transition-colors duration-200 group-hover/sub:text-gray-800">
                <span className="text-gray-400">{t(`services.groups.${group.key}.prefix`)}</span>
                {t(`services.groups.${group.key}.title`)}
              </span>
            </button>
          ))}
          {/* "View all" link to scroll to section */}
          <button
            onClick={() => handleClick("services")}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-all duration-200 hover:bg-violet-50 cursor-pointer"
          >
            <span className="h-2 w-2 rounded-full shrink-0 bg-violet-300" />
            <span className="text-sm font-medium text-violet-500">
              {t("services.title")}
              <svg className="ml-1 inline h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </button>
        </div>
      );
    }

    if (link === "howWeWork") {
      return (
        <div className="ml-10 mt-1 mb-2 flex flex-col gap-1">
          {howWeWorkItems.map((item) => (
            <button
              key={item}
              onClick={() => handleMobileSubClick("howWeWork")}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-all duration-200 hover:bg-gray-50 cursor-pointer group/sub"
            >
              <span className="h-2 w-2 rounded-full shrink-0 bg-violet-400" />
              <span className="text-sm font-medium text-gray-500 transition-colors duration-200 group-hover/sub:text-gray-800">
                {(t(`howWeWork.items.${item}`) as { title: string })?.title}
              </span>
            </button>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {/* Full-width Header */}
      <nav className={`fixed top-0 left-0 right-0 transition-all duration-500 border-b ${menuOpen ? "z-[60]" : "z-50"} ${
            scrolled
              ? "border-gray-200/80 bg-white/70 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.08)]"
              : "border-gray-200/50 bg-white/40 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
          }`}>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
            <div className="flex h-20 items-center justify-between">
              {/* Logo */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-2 relative z-[60] cursor-pointer"
              >
                <img
                  src="/logo-logical-minds.svg"
                  alt="Logical Minds"
                  width={160}
                  height={22}
                  className="h-5 w-auto sm:h-6"
                />
              </a>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.filter((l) => l !== "contact").map(renderDesktopLink)}
              </div>

              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <button
                  onClick={openContact}
                  className="hidden lg:inline-flex group/btn relative cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-violet-500 transition-all duration-500 hover:from-violet-700 hover:to-violet-600 hover:shadow-[0_6px_24px_rgba(124,58,237,0.35)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
                  <span className="relative flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white">
                    {t("hero.cta")}
                    <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </span>
                </button>

                {/* Hamburger Button — mobile only */}
                <button
                  onClick={menuOpen ? closeMenu : openMenu}
                  className="relative z-[60] flex lg:hidden h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-xl transition-colors hover:bg-gray-200/50 cursor-pointer"
                  aria-label="Toggle menu"
                >
                  <span
                    className={`block h-[2px] w-5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${
                      menuOpen
                        ? "translate-y-[7px] rotate-45 bg-gray-800"
                        : "bg-gray-600"
                    }`}
                  />
                  <span
                    className={`block h-[2px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${
                      menuOpen
                        ? "w-5 opacity-0 scale-0 bg-gray-800"
                        : "w-3 bg-gray-600"
                    }`}
                  />
                  <span
                    className={`block h-[2px] w-5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${
                      menuOpen
                        ? "-translate-y-[7px] -rotate-45 bg-gray-800"
                        : "bg-gray-600"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
      </nav>

      {/* Sidebar Menu */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            ref={backdropRef}
            className="fixed inset-0 z-[55] bg-black/30 backdrop-blur-sm"
            onClick={closeMenu}
            style={{ opacity: 0 }}
          />

          {/* Sidebar Panel */}
          <div
            ref={sidebarRef}
            className="fixed top-0 right-0 bottom-0 z-[56] w-full max-w-md overflow-y-auto border-l border-gray-200 bg-white/95 backdrop-blur-2xl shadow-[-8px_0_40px_rgba(0,0,0,0.08)]"
            style={{ transform: "translateX(100%)" }}
          >
            {/* Subtle violet gradient accents */}
            <div className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background: "radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(168,85,247,0.04) 0%, transparent 50%)",
              }}
            />

            {/* Sidebar Content */}
            <div className="relative flex h-full flex-col justify-center px-8 sm:px-10">
              {/* Divider Line */}
              <div
                ref={lineRef}
                className="mb-8 h-px origin-left bg-gradient-to-r from-violet-500/40 via-gray-200 to-transparent"
                style={{ transform: "scaleX(0)" }}
              />

              {/* Nav Links */}
              <div className="flex flex-col gap-3">
                {navLinks.map((link, i) => {
                  const hasDropdown = link === "howWeWork" || link === "services";
                  const isExpanded = expandedMobileLink === link;

                  return (
                    <div key={link} className="group">
                      <div
                        className="flex items-baseline gap-4 py-1"
                        style={{ perspective: "800px" }}
                      >
                        {/* Number */}
                        <span
                          ref={(el) => { numbersRef.current[i] = el; }}
                          className="font-mono text-xs text-violet-400 transition-all duration-300 group-hover:text-violet-600 group-hover:scale-110"
                          style={{ opacity: 0, transformOrigin: "center center" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        {/* Link */}
                        <div className="overflow-hidden" style={{ perspective: "800px" }}>
                          <button
                            ref={(el) => { linksRef.current[i] = el; }}
                            onClick={() => handleMobileToggle(link)}
                            className="relative text-left text-2xl sm:text-3xl font-semibold text-gray-700 transition-all duration-500 hover:text-violet-600 hover:translate-x-3 cursor-pointer will-change-transform"
                            style={{
                              opacity: 0,
                              transformOrigin: "left bottom",
                              transformStyle: "preserve-3d",
                            }}
                          >
                            <span className="relative inline-flex items-center gap-2">
                              {t(`nav.${link}`)}
                              {hasDropdown ? (
                                <svg
                                  className={`h-[0.35em] w-[0.35em] text-violet-300 transition-all duration-500 group-hover:text-violet-500 ${isExpanded ? "rotate-180" : ""}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2.5}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                              ) : (
                                <svg
                                  className="h-[0.35em] w-[0.35em] text-violet-300 transition-all duration-500 group-hover:text-violet-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2.5}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                              )}
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Mobile sub-items */}
                      {hasDropdown && (
                        <div
                          className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
                          style={{
                            maxHeight: isExpanded ? "300px" : "0px",
                            opacity: isExpanded ? 1 : 0,
                          }}
                        >
                          {renderMobileSubItems(link)}
                        </div>
                      )}

                      {/* Accent line per row */}
                      <div
                        ref={(el) => { accentLinesRef.current[i] = el; }}
                        className="h-px origin-left bg-gradient-to-r from-violet-400/30 via-gray-200/50 to-transparent"
                        style={{ opacity: 0, transform: "scaleX(0)" }}
                      />
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Footer — fixed at bottom */}
            <div
              ref={footerRef}
              className="absolute bottom-0 left-0 right-0 px-8 sm:px-10 pb-8"
              style={{ opacity: 0 }}
            >
              <div className="h-px mb-5 bg-gradient-to-r from-gray-200 via-gray-100 to-transparent" />
              <div className="flex gap-6 mb-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 transition-colors duration-300 hover:text-violet-600 cursor-pointer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 transition-colors duration-300 hover:text-violet-600 cursor-pointer"
                >
                  Twitter
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 transition-colors duration-300 hover:text-violet-600 cursor-pointer"
                >
                  GitHub
                </a>
              </div>
              <p className="text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Logical Minds
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

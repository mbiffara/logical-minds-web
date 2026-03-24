"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import { useContact } from "@/context/ContactContext";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  "about",
  "services",
  "portfolio",
  "partners",
  "contact",
] as const;


export default function Navbar() {
  const { t } = useLanguage();
  const { openContact } = useContact();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLButtonElement | null)[]>([]);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const accentLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
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

    requestAnimationFrame(() => {
      const tl = gsap.timeline();
      tlRef.current = tl;

      // Overlay curtain reveal
      tl.fromTo(
        overlayRef.current,
        { clipPath: "inset(0 0 100% 0)", opacity: 1 },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.55,
          ease: "power4.inOut",
        }
      );

      // Divider line
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power3.inOut" },
        0.25
      );

      // Each link: mask reveal (slide up from behind overflow-hidden)
      linksRef.current.filter(Boolean).forEach((link, i) => {
        const delay = 0.3 + i * 0.08;

        // Text reveal: slide up + blur to sharp
        tl.fromTo(
          link,
          {
            y: "110%",
            rotateX: 50,
            opacity: 0,
            filter: "blur(12px)",
          },
          {
            y: "0%",
            rotateX: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.65,
            ease: "power4.out",
          },
          delay
        );
      });

      // Numbers: spin in from random rotation
      numbersRef.current.filter(Boolean).forEach((num, i) => {
        tl.fromTo(
          num,
          {
            opacity: 0,
            y: 20,
            rotateZ: -90,
            scale: 0.3,
          },
          {
            opacity: 1,
            y: 0,
            rotateZ: 0,
            scale: 1,
            duration: 0.45,
            ease: "back.out(3)",
          },
          0.35 + i * 0.08
        );
      });

      // Accent lines grow per row
      accentLinesRef.current.filter(Boolean).forEach((line, i) => {
        tl.fromTo(
          line,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          },
          0.4 + i * 0.08
        );
      });

      // Footer fade + slide in
      tl.fromTo(
        footerRef.current,
        { y: 30, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.45, ease: "power3.out" },
        0.6
      );
    });
  }, []);

  const closeMenu = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => setMenuOpen(false),
    });

    // Links fly out upward with blur
    linksRef.current.filter(Boolean).forEach((link, i) => {
      tl.to(
        link,
        {
          y: "-110%",
          rotateX: -30,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.4,
          ease: "power3.in",
        },
        i * 0.04
      );
    });

    // Numbers spin out
    tl.to(
      numbersRef.current.filter(Boolean),
      {
        opacity: 0,
        rotateZ: 90,
        scale: 0.3,
        duration: 0.3,
        stagger: 0.03,
        ease: "power3.in",
      },
      0
    );

    // Accent lines shrink
    tl.to(
      accentLinesRef.current.filter(Boolean),
      {
        scaleX: 0,
        opacity: 0,
        duration: 0.3,
        stagger: 0.02,
        ease: "power3.in",
      },
      0
    );

    // Footer out
    tl.to(footerRef.current, { y: 20, opacity: 0, filter: "blur(6px)", duration: 0.3 }, 0);

    // Line shrink
    tl.to(lineRef.current, { scaleX: 0, duration: 0.4, ease: "power3.in" }, 0.1);

    // Overlay curtain close
    tl.to(
      overlayRef.current,
      {
        clipPath: "inset(100% 0 0 0)",
        duration: 0.6,
        ease: "power4.inOut",
      },
      0.2
    );
  }, []);

  const handleClick = (id: string) => {
    closeMenu();
    if (id === "contact") {
      setTimeout(() => openContact(), 600);
    } else {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 600);
    }
  };

  return (
    <>
      {/* Floating Island Navbar */}
      <div className={`fixed top-0 left-0 right-0 flex justify-center px-4 pt-4 ${menuOpen ? "z-[60]" : "z-50"}`}>
        <nav
          className={`w-full max-w-6xl transition-all duration-500 rounded-2xl border ${
            scrolled
              ? "border-white/[0.1] bg-white/[0.07] backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(124,58,237,0.08),inset_0_1px_0_rgba(255,255,255,0.08)]"
              : "border-white/[0.08] bg-white/[0.04] backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]"
          }`}
        >
          <div className="pointer-events-none absolute inset-x-4 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <div className="px-5 sm:px-6">
            <div className="flex h-14 items-center justify-between">
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
                  className="h-6 w-auto"
                />
              </a>

              <div className="flex items-center gap-4">
                <LanguageSwitcher />

                {/* Hamburger Button */}
                <button
                  onClick={menuOpen ? closeMenu : openMenu}
                  className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-xl transition-colors hover:bg-white/10 cursor-pointer"
                  aria-label="Toggle menu"
                >
                  <span
                    className={`block h-[2px] w-5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${
                      menuOpen
                        ? "translate-y-[7px] rotate-45 bg-white"
                        : "bg-gray-300"
                    }`}
                  />
                  <span
                    className={`block h-[2px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${
                      menuOpen
                        ? "w-5 opacity-0 scale-0 bg-white"
                        : "w-3 bg-gray-300"
                    }`}
                  />
                  <span
                    className={`block h-[2px] w-5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${
                      menuOpen
                        ? "-translate-y-[7px] -rotate-45 bg-white"
                        : "bg-gray-300"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Fullscreen Menu Overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[55] flex flex-col opacity-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(124,58,237,0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(168,85,247,0.08) 0%, transparent 50%), rgba(5,5,10,0.97)",
          }}
        >
          {/* Grain texture overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Menu Content */}
          <div className="flex flex-1 flex-col justify-center mx-auto w-full max-w-6xl px-4">
            {/* Divider Line */}
            <div
              ref={lineRef}
              className="mb-10 h-px origin-left bg-gradient-to-r from-violet-500/50 via-white/10 to-transparent"
              style={{ transform: "scaleX(0)" }}
            />

            {/* Nav Links */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {navLinks.map((link, i) => (
                <div key={link} className="group">
                  <div
                    className="flex items-baseline gap-4 sm:gap-6 py-1"
                    style={{ perspective: "800px" }}
                  >
                    {/* Number */}
                    <span
                      ref={(el) => { numbersRef.current[i] = el; }}
                      className="font-mono text-xs sm:text-sm text-violet-400/60 transition-all duration-300 group-hover:text-violet-400 group-hover:scale-110"
                      style={{ opacity: 0, transformOrigin: "center center" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Link — overflow-hidden mask for reveal */}
                    <div className="overflow-hidden" style={{ perspective: "800px" }}>
                      <button
                        ref={(el) => { linksRef.current[i] = el; }}
                        onClick={() => handleClick(link)}
                        className="relative text-left text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white/80 transition-all duration-500 hover:text-white hover:translate-x-4 cursor-pointer will-change-transform"
                        style={{
                          opacity: 0,
                          transformOrigin: "left bottom",
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <span className="relative inline-flex items-center gap-2 sm:gap-3">
                          {t(`nav.${link}`)}
                          <svg
                            className="h-[0.35em] w-[0.35em] text-violet-400/50 transition-all duration-500 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Accent line per row */}
                  <div
                    ref={(el) => { accentLinesRef.current[i] = el; }}
                    className="h-px origin-left bg-gradient-to-r from-violet-500/30 via-purple-400/10 to-transparent"
                    style={{ opacity: 0, transform: "scaleX(0)" }}
                  />
                </div>
              ))}
            </div>

            {/* Bottom Divider */}
            <div className="mt-10 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
          </div>

          {/* Footer */}
          <div
            ref={footerRef}
            className="flex items-center justify-between mx-auto w-full max-w-6xl px-4 pb-8"
            style={{ opacity: 0 }}
          >
            <div className="flex gap-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 transition-colors duration-300 hover:text-violet-400 cursor-pointer"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 transition-colors duration-300 hover:text-violet-400 cursor-pointer"
              >
                Twitter
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 transition-colors duration-300 hover:text-violet-400 cursor-pointer"
              >
                GitHub
              </a>
            </div>
            <p className="text-xs text-gray-600">
              &copy; {new Date().getFullYear()} Logical Minds
            </p>
          </div>
        </div>
      )}
    </>
  );
}

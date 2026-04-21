"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";
import { useContact } from "@/context/ContactContext";
import { useLanguage } from "@/context/LanguageContext";

const serviceKeys = [
  "productDev",
  "uxDesign",
  "fullstack",
  "qa",
  "cloud",
  "aiIntegration",
  "mvp12weeks",
] as const;
const budgetKeys = [
  "under10k",
  "10k25k",
  "25k50k",
  "50k100k",
  "over100k",
] as const;
const deadlineKeys = [
  "asap",
  "1month",
  "1to3months",
  "3to6months",
  "flexible",
] as const;

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 min-h-[44px] text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-violet-500 focus:bg-white focus:shadow-[0_0_20px_rgba(124,58,237,0.08)] focus:ring-1 focus:ring-violet-500";

const selectClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 min-h-[44px] text-sm text-gray-900 outline-none transition-all duration-300 focus:border-violet-500 focus:bg-white focus:shadow-[0_0_20px_rgba(124,58,237,0.08)] focus:ring-1 focus:ring-violet-500 appearance-none cursor-pointer [&>option]:bg-white [&>option]:text-gray-900";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/logicalminds.co/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/logicalminds-co/posts/?feedView=all",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

export default function ContactOverlay() {
  const { isOpen, closeContact } = useContact();
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const overlayRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLFormElement>(null);
  const formFieldsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  /* Spotlight for form card */
  const handleSpotlight = useCallback(
    (e: React.MouseEvent<HTMLFormElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty(
        "--spot-x",
        `${e.clientX - rect.left}px`
      );
      e.currentTarget.style.setProperty(
        "--spot-y",
        `${e.clientY - rect.top}px`
      );
    },
    []
  );

  const animateOpen = useCallback(() => {
    requestAnimationFrame(() => {
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.fromTo(
        overlayRef.current,
        { clipPath: "inset(0 0 100% 0)", opacity: 1 },
        { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power4.inOut" }
      );

      tl.fromTo(
        leftRef.current,
        { y: 40, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power4.out",
        },
        0.2
      );

      // Form card entrance
      tl.fromTo(
        formCardRef.current,
        { y: 30, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power4.out",
        },
        0.25
      );

      formFieldsRef.current.filter(Boolean).forEach((field, i) => {
        tl.fromTo(
          field,
          { y: 20, opacity: 0, filter: "blur(5px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.35,
            ease: "power3.out",
          },
          0.35 + i * 0.05
        );
      });

      tl.fromTo(
        bottomRef.current,
        { y: 15, opacity: 0, filter: "blur(4px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "power3.out",
        },
        0.6
      );
    });
  }, []);

  const animateClose = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => closeContact(),
    });

    formFieldsRef.current.filter(Boolean).forEach((field, i) => {
      tl.to(
        field,
        {
          y: -30,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.3,
          ease: "power3.in",
        },
        i * 0.03
      );
    });

    tl.to(
      leftRef.current,
      {
        y: -40,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.3,
        ease: "power3.in",
      },
      0
    );

    tl.to(
      formCardRef.current,
      {
        y: -30,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.3,
        ease: "power3.in",
      },
      0.05
    );

    tl.to(
      bottomRef.current,
      {
        y: 20,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.3,
        ease: "power3.in",
      },
      0
    );

    tl.to(
      overlayRef.current,
      {
        clipPath: "inset(100% 0 0 0)",
        duration: 0.6,
        ease: "power4.inOut",
      },
      0.15
    );
  }, [closeContact]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      animateOpen();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, animateOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") animateClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, animateClose]);

  if (!isOpen) return null;

  const setFieldRef = (i: number) => (el: HTMLDivElement | null) => {
    formFieldsRef.current[i] = el;
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[55] flex flex-col overflow-y-auto opacity-0"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, rgba(124,58,237,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(168,85,247,0.04) 0%, transparent 50%), #f8f9fc",
      }}
    >
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Close button */}
      <button
        onClick={animateClose}
        className="fixed right-4 top-4 z-[60] flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white/60 text-gray-400 backdrop-blur-lg transition-all hover:border-violet-300 hover:bg-white hover:text-gray-900 hover:shadow-[0_0_20px_rgba(124,58,237,0.1)] sm:right-6 sm:top-6"
        aria-label="Close contact"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* ── Content ── */}
      <div className="flex flex-1 items-start lg:items-center justify-center px-4 py-12 sm:py-16 lg:py-6">
        <div className="flex w-full max-w-7xl flex-col lg:flex-row lg:items-stretch lg:gap-0">
          {/* ─── Left Panel ─── */}
          <div
            ref={leftRef}
            className="flex flex-col justify-center px-4 pb-8 lg:w-[42%] lg:pb-0 lg:pl-4 lg:pr-10"
            style={{ opacity: 0 }}
          >
            {/* Title */}
            <h2
              style={{
                fontFamily: '"Alvar Essential", var(--font-sans), sans-serif',
                fontSize: "clamp(22px, 3.5vw, 32px)",
                fontWeight: 900,
                lineHeight: 0.94,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "#1a1a2e",
              }}
            >
              <svg className="inline-block mr-2 -mt-1 h-6 w-6 text-violet-500 sm:h-7 sm:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
              {t("contact.title")}
            </h2>

            {/* Description */}
            <p className="mt-2 text-xs leading-relaxed text-gray-400 sm:text-sm">
              {t("contact.description")}
            </p>

            {/* Response time badge */}
            <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-emerald-600">
                {t("contact.responseTime")}
              </span>
            </div>

            {/* Gradient divider */}
            <div className="my-4 h-px bg-gradient-to-r from-violet-300/60 via-purple-200/30 to-transparent" />

            {/* Contact info — glassmorphism cards */}
            <div className="flex flex-col gap-2">
              {/* Email */}
              <div className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white/60 px-4 py-3 transition-all duration-300 hover:border-violet-300 hover:bg-white hover:shadow-[0_4px_20px_rgba(124,58,237,0.06)]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-500 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400">
                    {t("contact.info.emailLabel")}
                  </p>
                  <p className="text-sm text-gray-900">
                    {t("contact.info.email")}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white/60 px-4 py-3 transition-all duration-300 hover:border-violet-300 hover:bg-white hover:shadow-[0_4px_20px_rgba(124,58,237,0.06)]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-500 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400">
                    {t("contact.info.phoneLabel")}
                  </p>
                  <p className="text-sm text-gray-900">
                    {t("contact.info.phone")}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white/60 px-4 py-3 transition-all duration-300 hover:border-violet-300 hover:bg-white hover:shadow-[0_4px_20px_rgba(124,58,237,0.06)]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-500 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400">
                    {t("contact.info.locationLabel")}
                  </p>
                  <p className="text-sm text-gray-900">
                    {t("contact.info.location")}
                  </p>
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div className="mt-4 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white/60 text-gray-400 transition-all duration-300 hover:border-violet-300 hover:bg-white hover:text-violet-500 hover:shadow-[0_0_15px_rgba(124,58,237,0.08)]"
                  aria-label={s.name}
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ─── Right Panel (Form Card) ─── */}
          <div className="lg:w-[58%]">
            <form
              ref={formCardRef}
              onSubmit={async (e) => {
                e.preventDefault();
                setError("");
                setSubmitting(true);
                const form = e.currentTarget;
                const data = {
                  name: (form.querySelector("#contact-name") as HTMLInputElement)?.value,
                  email: (form.querySelector("#contact-email") as HTMLInputElement)?.value,
                  company: (form.querySelector("#contact-company") as HTMLInputElement)?.value,
                  phone: (form.querySelector("#contact-phone") as HTMLInputElement)?.value,
                  service: (form.querySelector("#contact-service") as HTMLSelectElement)?.value,
                  budget: (form.querySelector("#contact-budget") as HTMLSelectElement)?.value,
                  deadline: (form.querySelector("#contact-deadline") as HTMLSelectElement)?.value,
                  message: (form.querySelector("#contact-message") as HTMLTextAreaElement)?.value,
                };
                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });
                  if (!res.ok) throw new Error("Failed");
                  setSubmitted(true);
                } catch {
                  setError(t("contact.form.error") || "Something went wrong. Please try again.");
                } finally {
                  setSubmitting(false);
                }
              }}
              onMouseMove={handleSpotlight}
              className="group/form relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm backdrop-blur-xl transition-all duration-500 hover:border-violet-300 hover:shadow-[0_8px_40px_rgba(124,58,237,0.08)] sm:p-5 lg:p-6"
              style={{ opacity: 0 }}
            >
              {/* Spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/form:opacity-100"
                style={{
                  background:
                    "radial-gradient(600px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(124,58,237,0.03), transparent 60%)",
                }}
              />

              {/* Corner glow */}
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-violet-500/[0.02] blur-3xl transition-all duration-700 group-hover/form:bg-violet-500/[0.05]" />

              {/* Top accent line */}
              <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />

              {/* Success state */}
              {submitted ? (
                <div className="relative flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                    <svg className="h-8 w-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{t("contact.form.successTitle")}</h3>
                  <p className="max-w-sm text-sm text-gray-500">{t("contact.form.successMessage")}</p>
                </div>
              ) : (
              <>

              {/* Error message */}
              {error && (
                <div className="relative mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="relative grid gap-4 sm:grid-cols-2">
                {/* Name */}
                <div ref={setFieldRef(0)} style={{ opacity: 0 }}>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400"
                  >
                    {t("contact.form.name")}
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    className={inputClass}
                    placeholder={t("contact.form.name")}
                  />
                </div>

                {/* Email */}
                <div ref={setFieldRef(1)} style={{ opacity: 0 }}>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400"
                  >
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    className={inputClass}
                    placeholder={t("contact.form.email")}
                  />
                </div>

                {/* Company */}
                <div ref={setFieldRef(2)} style={{ opacity: 0 }}>
                  <label
                    htmlFor="contact-company"
                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400"
                  >
                    {t("contact.form.company")}
                  </label>
                  <input
                    type="text"
                    id="contact-company"
                    className={inputClass}
                    placeholder={t("contact.form.company")}
                  />
                </div>

                {/* Phone */}
                <div ref={setFieldRef(3)} style={{ opacity: 0 }}>
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400"
                  >
                    {t("contact.form.phone")}
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    className={inputClass}
                    placeholder={t("contact.form.phone")}
                  />
                </div>

                {/* Service — full width */}
                <div ref={setFieldRef(4)} className="sm:col-span-2" style={{ opacity: 0 }}>
                  <label
                    htmlFor="contact-service"
                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400"
                  >
                    {t("contact.form.service")}
                  </label>
                  <select
                    id="contact-service"
                    className={selectClass}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {t("contact.form.selectPlaceholder")}
                    </option>
                    {serviceKeys.map((key) => (
                      <option key={key} value={key}>
                        {t(`contact.form.serviceOptions.${key}`)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div ref={setFieldRef(5)} style={{ opacity: 0 }}>
                  <label
                    htmlFor="contact-budget"
                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400"
                  >
                    {t("contact.form.budget")}
                  </label>
                  <select
                    id="contact-budget"
                    className={selectClass}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {t("contact.form.selectPlaceholder")}
                    </option>
                    {budgetKeys.map((key) => (
                      <option key={key} value={key}>
                        {t(`contact.form.budgetOptions.${key}`)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Deadline */}
                <div ref={setFieldRef(6)} style={{ opacity: 0 }}>
                  <label
                    htmlFor="contact-deadline"
                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400"
                  >
                    {t("contact.form.deadline")}
                  </label>
                  <select
                    id="contact-deadline"
                    className={selectClass}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {t("contact.form.selectPlaceholder")}
                    </option>
                    {deadlineKeys.map((key) => (
                      <option key={key} value={key}>
                        {t(`contact.form.deadlineOptions.${key}`)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message — full width */}
                <div
                  ref={setFieldRef(7)}
                  className="sm:col-span-2"
                  style={{ opacity: 0 }}
                >
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400"
                  >
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    className={`${inputClass} resize-none`}
                    placeholder={t("contact.form.message")}
                  />
                </div>
              </div>

              {/* Submit + Schedule — side by side */}
              <div ref={bottomRef} className="relative mt-5 flex gap-3" style={{ opacity: 0 }}>
                <button
                  type="submit"
                  disabled={submitting}
                  className="group/btn relative flex-1 cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-violet-500 transition-all duration-500 hover:from-violet-700 hover:to-violet-600 hover:shadow-[0_6px_24px_rgba(124,58,237,0.35)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
                  <span className="relative flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white">
                    {submitting ? t("contact.form.sending") : t("contact.form.send")}
                    {!submitting && (
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    )}
                  </span>
                </button>

                <a
                  href="https://calendly.com/logicalminds/30-min?back=1&month=2026-04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cal flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-200 bg-white py-3 text-sm transition-all duration-300 hover:border-violet-300 hover:shadow-[0_4px_20px_rgba(124,58,237,0.08)]"
                >
                  <svg className="h-4 w-4 shrink-0 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <span className="font-semibold text-gray-900 transition-colors group-hover/cal:text-violet-600">
                    {t("contact.form.scheduleCall")}
                  </span>
                </a>
              </div>
              </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

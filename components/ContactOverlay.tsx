"use client";

import { useRef, useEffect, useCallback } from "react";
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
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-violet-500 focus:bg-white focus:shadow-[0_0_20px_rgba(124,58,237,0.08)] focus:ring-1 focus:ring-violet-500 sm:text-base";

const selectClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300 focus:border-violet-500 focus:bg-white focus:shadow-[0_0_20px_rgba(124,58,237,0.08)] focus:ring-1 focus:ring-violet-500 appearance-none cursor-pointer [&>option]:bg-white [&>option]:text-gray-900 sm:text-base";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com",
    path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

export default function ContactOverlay() {
  const { isOpen, closeContact } = useContact();
  const { t } = useLanguage();

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
      <div className="flex flex-1 items-center justify-center px-4 py-20 lg:py-12">
        <div className="flex w-full max-w-7xl flex-col lg:flex-row lg:items-stretch lg:gap-0">
          {/* ─── Left Panel ─── */}
          <div
            ref={leftRef}
            className="flex flex-col justify-center px-4 pb-10 lg:w-[42%] lg:pb-0 lg:pl-4 lg:pr-12"
            style={{ opacity: 0 }}
          >
            {/* Title */}
            <h2 className="bg-gradient-to-r from-gray-900 via-violet-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl lg:text-4xl">
              {t("contact.title")}
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base lg:text-lg">
              {t("contact.subtitle")}
            </p>

            {/* Description */}
            <p className="mt-2 text-xs leading-relaxed text-gray-400 sm:text-sm">
              {t("contact.description")}
            </p>

            {/* AI Agents callout — shimmer border */}
            <div className="relative mt-6 overflow-hidden rounded-xl">
              <div className="absolute inset-0 rounded-xl bg-[conic-gradient(from_var(--shimmer-angle,0deg),transparent_40%,rgba(124,58,237,0.35)_50%,transparent_60%)] p-px animate-[shimmer-rotate_4s_linear_infinite]">
                <div className="h-full w-full rounded-[11px] bg-white" />
              </div>
              <div className="relative flex items-start gap-3 px-4 py-3.5">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.08)]">
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
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                    />
                  </svg>
                </div>
                <p className="text-xs leading-relaxed text-gray-500">
                  <span className="font-medium text-violet-600">
                    {t("contact.aiAgents.highlight")}
                  </span>{" "}
                  {t("contact.aiAgents.text")}
                </p>
              </div>
            </div>

            {/* Response time badge */}
            <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-emerald-600">
                {t("contact.responseTime")}
              </span>
            </div>

            {/* Gradient divider */}
            <div className="my-6 h-px bg-gradient-to-r from-violet-300/60 via-purple-200/30 to-transparent" />

            {/* Contact info — glassmorphism cards */}
            <div className="flex flex-col gap-3">
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
            <div className="mt-6 flex gap-3">
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
              onSubmit={(e) => e.preventDefault()}
              onMouseMove={handleSpotlight}
              className="group/form relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm backdrop-blur-xl transition-all duration-500 hover:border-violet-300 hover:shadow-[0_8px_40px_rgba(124,58,237,0.08)] sm:p-6 lg:p-8"
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

              <div className="relative grid gap-5 sm:grid-cols-2">
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

                {/* Service */}
                <div ref={setFieldRef(4)} style={{ opacity: 0 }}>
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
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder={t("contact.form.message")}
                  />
                </div>
              </div>

              {/* Submit */}
              <div ref={bottomRef} className="relative mt-8" style={{ opacity: 0 }}>
                <button
                  type="submit"
                  className="group/btn relative w-full cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-violet-500 transition-all duration-500 hover:from-violet-700 hover:to-violet-600 hover:shadow-[0_6px_24px_rgba(124,58,237,0.35)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
                  <span className="relative flex items-center justify-center gap-2 py-3.5 font-semibold text-white">
                    {t("contact.form.send")}
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
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

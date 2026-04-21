"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";


const Globe = dynamic(() => import("./Globe"), { ssr: false });


export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative pt-8 pb-20 sm:pt-12 sm:pb-28 bg-white border-t border-b border-gray-200">

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-8 md:gap-12 lg:gap-16 md:grid-cols-2">
          {/* Left: Text + Toptal + Stats */}
          <div className="min-w-0">
            <img
              src="/logo-logical-minds.svg"
              alt="Logical Minds"
              width={240}
              height={33}
              className="h-6 w-auto sm:h-7 lg:h-8"
            />

            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
              {t("about.description")}
            </p>

            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              {t("about.mission")}
            </p>

            {/* Badges row */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4 md:gap-5">
              {/* Founder Badge */}
              <a
                  href="https://calendly.com/logicalminds/30-min?back=1&month=2026-04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/badge inline-flex items-center gap-3 rounded-2xl border border-gray-200 bg-white shadow-sm px-4 py-3 transition-all duration-300 hover:border-violet-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]"
                >
                  <Image
                    src="/marcelo-biffara.jpg"
                    alt="Marcelo Biffara"
                    width={52}
                    height={52}
                    className="h-[52px] w-[52px] shrink-0 rounded-xl border border-gray-200 object-cover"
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-gray-800">
                      Marcelo Biffara
                    </span>
                    <span className="text-xs text-gray-500">CEO / Founder</span>
                    <span className="mt-1 flex items-center gap-1 text-[11px] font-medium text-violet-500 transition-colors duration-200 group-hover/badge:text-violet-600">
                      <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      {t("about.scheduleMeet") as string}
                    </span>
                  </div>
                </a>

              {/* Toptal Badge */}
              <a
                  href="https://www.toptal.com/developers/resume/marcelo-biffara#BDREgX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/badge inline-flex items-center gap-3 rounded-2xl border border-gray-200 bg-white shadow-sm px-3 py-2.5 transition-all duration-300 hover:border-[#204ECF]/40 hover:shadow-[0_0_30px_rgba(32,78,207,0.12)] sm:gap-4 sm:px-5 sm:py-4"
                >
                  {/* Toptal icon mark */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: "#204ECF" }}>
                    <svg viewBox="0 0 21 27" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                      <path d="m8.11 0 6.71 6.7c.05.05.09.1.15.15l5.85 5.85-9.51 9.46 4.35 4.36-2.91 2.89-6.66-6.66c-.08-.07-.16-.15-.24-.23l-5.85-5.84 9.48-9.43-4.32-4.31zm4.25 10.5c-.09-.02-.18-.02-.26 0-.09.03-.16.07-.32.22l-5.41 5.39c-.16.16-.2.23-.22.31-.03.09-.03.18 0 .26.02.09.07.17.22.32l1.72 1.72c.15.15.22.19.31.22.09.02.17.02.26 0 .09-.03.16-.07.31-.22l5.41-5.39c.16-.15.2-.23.23-.31.02-.09.02-.17 0-.26s-.07-.16-.22-.31l-1.72-1.72c-.15-.16-.23-.2-.31-.23z" fill="#ffffff"/>
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-800">
                        TOP 3% TALENT
                      </span>
                      {/* Stars */}
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-3 w-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span>Vetted by</span>
                      {/* Toptal wordmark */}
                      <svg viewBox="0 0 108 30" width="50" xmlns="http://www.w3.org/2000/svg">
                        <g clipRule="evenodd" fill="#6b7280" fillRule="evenodd">
                          <path d="m8.11 0 6.71 6.7c.05.05.09.1.15.15l5.85 5.85-9.51 9.46 4.35 4.36-2.91 2.89-6.66-6.66c-.08-.07-.16-.15-.24-.23l-5.85-5.84 9.48-9.43-4.32-4.31zm4.25 10.5c-.09-.02-.18-.02-.26 0-.09.03-.16.07-.32.22l-5.41 5.39c-.16.16-.2.23-.22.31-.03.09-.03.18 0 .26.02.09.07.17.22.32l1.72 1.72c.15.15.22.19.31.22.09.02.17.02.26 0 .09-.03.16-.07.31-.22l5.41-5.39c.16-.15.2-.23.23-.31.02-.09.02-.17 0-.26s-.07-.16-.22-.31l-1.72-1.72c-.15-.16-.23-.2-.31-.23z"/>
                          <path d="m62.65 7.76c2.11 0 3.91.82 5.34 2.4 1.46 1.53 2.19 3.64 2.18 6.26 0 2.56-.75 4.8-2.24 6.38-1.47 1.57-3.34 2.37-5.58 2.37-1.93-.01-3.68-.7-4.84-1.89l-.16-.17-.01 6.75-3.82-.01v-.28l.04-21.61h3.8l-.01 2.64c1.25-1.41 3.26-2.84 5.3-2.84zm24.45.06c2.18 0 3.68.49 4.84 1.44 1.11.92 1.7 2.56 1.75 4.29v.26l-.02 11.14h-3.87v-.46c0-.48 0-.97 0-1.47-1.12 1.55-2.68 2.3-4.76 2.3-1.65 0-3.05-.5-4.07-1.43-1.03-.94-1.58-2.23-1.58-3.73.02-2.83 2.02-4.79 5.52-5.4l.27-.05 4.64-.73v-.37c0-.78-.23-1.72-.69-2.11-.47-.4-1.04-.73-2.03-.73-2.73 0-3.29 2.01-3.32 3.02v.09l-3.42.04c0-1.49.69-3.42 2.08-4.63 1.12-.97 2.75-1.42 4.33-1.47h.3zm-14.98-4.36h3.81l-.01 4.56h3.53v3.18l-3.54-.01-.01 8.54c0 .94.19 1.56.6 1.85.43.3 1.3.02 1.3.02l.34 3.32s-1.2.31-1.96.31c-.99 0-1.84-.25-2.49-.75-1.06-.8-1.6-2.2-1.6-4.17l.02-9.12-3.19-3.19 3.2.01zm-22.46 6.8c1.1 1.13 2.41 3.14 2.4 6.26-.01 3.11-1.32 5.11-2.41 6.24-1.5 1.54-3.54 2.42-5.59 2.42-.08 0-.16 0-.25-.01-2.19-.01-4.13-.79-5.75-2.33-1.63-1.55-2.46-3.68-2.46-6.36s.84-4.82 2.47-6.36c1.62-1.53 3.55-2.3 5.75-2.3 2.17-.07 4.29.83 5.84 2.44zm-8.81-7.04v3.77l-7.36.01.02 17.97-3.97-.01v-.34l.03-17.63h-7.51l.01-3.77zm54.68.25 3.42.01v.09l-.03 21.38-3.42-.01v-.1zm-5.71 13.58-3.81.64c-1.86.32-2.72 1.04-2.73 2.3-.01 1.15.81 1.92 2.09 1.99h.16.02c2.44 0 4.17-1.9 4.26-4.67l.01-.22zm-46.02-5.84c-1.28 0-2.39.49-3.29 1.47-.88.96-1.33 2.24-1.33 3.81 0 1.58.45 2.86 1.33 3.82.89.98 2 1.47 3.28 1.48 1.3 0 2.42-.49 3.31-1.47.9-.98 1.35-2.26 1.36-3.81.01-1.56-.45-2.84-1.35-3.82s-2.01-1.48-3.31-1.48zm17.94.12h-.02c-1.28 0-2.34.46-3.24 1.43-.9.94-1.35 2.16-1.36 3.63 0 1.49.45 2.83 1.35 3.8.92.95 1.98 1.42 3.25 1.42 1.29 0 2.38-.48 3.25-1.41.91-.97 1.35-2.3 1.36-3.79 0-1.48-.46-2.7-1.34-3.63-.87-.96-1.96-1.45-3.25-1.45z"/>
                        </g>
                      </svg>
                    </div>
                  </div>
                </a>
            </div>
          </div>

          {/* Right: 3D Globe — hidden on mobile for performance */}
          <div className="hidden lg:block">
            <Globe />
          </div>
        </div>

      </div>
    </section>
  );
}

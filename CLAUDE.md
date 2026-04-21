# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build — use to verify compilation
npm run lint         # ESLint (eslint-config-next)
```

No test runner is configured.

## Tech Stack

- **Next.js 16** (App Router, TypeScript, Turbopack) — React 19
- **Tailwind CSS v4** — CSS-first config with `@theme inline` in `globals.css`, uses `@tailwindcss/postcss`
- **GSAP 3** — scroll-triggered animations, timelines, SplitText
- **Framer Motion** — React motion primitives
- **THREE.js + Cobe** — 3D globe, shader-based effects (FloatingLines, LightPillar, Prisma)
- **Custom React Context i18n** — EN/ES bilingual via `useLanguage().t()` dot-notation

## Architecture

### Route Structure

| Route | Page Component | Notes |
|-------|---------------|-------|
| `/` | `app/page.tsx` | Main landing — composes all sections with nested context providers |
| `/services/[slug]` | ServicePage component | Dynamic service detail pages (slugs: `logical-experiences`, `logical-development`, `logical-cloud`, `logical-talents`) |
| `/mvp-in-8-weeks` | MvpLanding component | Standalone MVP landing page |
| `/jonathan-guidi` | Team member profile | Individual profile page |
| `/dashboard-ia` | DashboardShell component | AI Command Center with 18 agent cards |
| `/new` | Alternate design | Experimental redesign with its own providers, components, and content system |
| `/new/services/[id]` | ServicePageContent | New design service detail pages |
| `/new/work/[id]` | CasePageContent | New design case study/portfolio pages |

### Context Providers

Four context providers in `context/`:

| Context | State | Purpose |
|---------|-------|---------|
| `LanguageContext` | `language` (EN/ES) | i18n, stored in `localStorage` as `"lm-lang"` |
| `ContactContext` | `isOpen` | Contact overlay toggle |
| `AgentDetailContext` | `activeView` | Agent detail overlay (specializedAgents / orchestration / ecosystem) |
| `PortfolioDetailContext` | `activeProject` | Portfolio detail overlay (creeadores / somosFin / tecabot) |

**Provider nesting order on `/` landing page:**

```
LanguageProvider → ContactProvider → AgentDetailProvider → PortfolioDetailProvider
```

Providers are wrapped per-page, not in the root layout. All overlay components render globally at the page root and are toggled via their respective contexts.

### Lazy Loading Pattern

Below-fold sections and all overlays use `dynamic(() => import(...), { ssr: false })`. Only `Navbar`, `Hero`, `ClientsMarquee`, and `SectionDivider` are statically imported for above-the-fold performance.

### Landing Page Section Order

Navbar → Hero → About → ClientsMarquee → SectionDivider → Roadmap → SectionDivider → Services → SectionDivider → Portfolio → SectionDivider → Testimonials → Footer → Overlays

### i18n System

- **Context**: `context/LanguageContext.tsx` — stores language in `localStorage` as `"lm-lang"`, default `"en"`
- **Translations**: `lib/translations.ts` — deeply nested EN/ES object, accessed via `t("hero.headline1")` dot-notation
- **Rule**: All user-facing strings must go through `useLanguage().t()` — never hardcode text

### Service Routing

Service detail pages moved from overlay-based to route-based (`/services/[slug]`). Slug mappings in `lib/serviceRoutes.ts`:
- `logicalExperiences` → `logical-experiences`
- `logicalDevelopment` → `logical-development`
- `logicalCloud` → `logical-cloud`
- `logicalTalents` → `logical-talents`

### Component Organization

- `components/animations/` — reusable animation primitives (ScrollReveal, SplitText, Particles, GridBackground, etc.)
- `components/dashboard/` — AI dashboard components (AgentCard, ActivityFeed, HeroStats, etc.)
- `components/agent-detail/` — detailed agent view components
- `components/new/` — alternate redesign components with own provider system (`Providers.tsx` manages theme/accent/density/language)
- Root `components/` — landing page sections (Hero, About, Services, Portfolio, etc.) and overlays

### Key Data Files

- `lib/translations.ts` (~136KB) — all bilingual copy for main site
- `lib/new-content.ts` — bilingual content for `/new` redesign (Subbrand, CaseStudy types)
- `lib/serviceRoutes.ts` — service slug mappings and `ServiceView` type
- `lib/dashboard-data.ts` — agent definitions, pipeline stages, team configs
- `lib/techIcons.tsx` — SVG icon library for tech badges

## Design System

- **Background**: `#0a0a0f` (dark sections), `#f8f9fc` (page body set in root layout)
- **Accent colors**: Blue `#3b82f6`, Cyan `#06b6d4`, Purple `#8b5cf6`
- **Service group colors**: Experiences `#227CFF`, Development `#FDA901`, Cloud `#F50132`, Talents `#22AE48`
- **Typography**: Poppins (via `next/font/google`, variable `--font-poppins`), Alvar Essential (custom `@font-face` Bold 700 + Black 900 from `/public/fonts/`)
- **Spacing**: 8px grid
- **Cards**: Glassmorphism — `white/5` bg, `white/5` border, `backdrop-blur`
- **Effects**: Glow borders, gradient text (`hero-gradient-text`), scroll-triggered animations
- **Accessibility**: `prefers-reduced-motion` media query disables animations; reduced `backdrop-blur` on mobile for GPU performance

## Code Conventions

- `"use client"` only when the component needs interactivity or hooks
- Mobile-first responsive: base styles = mobile, then `sm:`/`md:`/`lg:`
- Every section needs a scroll-triggered animation (ScrollReveal minimum)
- CTAs: high-contrast gradient buttons with glow shadow
- Section dividers: gradient `h-px` lines via `<SectionDivider />`
- Hover states: border glow + subtle scale + bg lighten
- Smooth scroll via `scrollIntoView({ behavior: "smooth" })` from anchor/button clicks
- Path alias: `@/*` maps to project root

## Known Issues

- **Node.js v22.9.0**: jsrepo/React Bits CLI won't work (needs >=22.12.0). Implement animation components manually.
- **Next.js 16**: `params` and `searchParams` are Promises — must `await` them in page/layout components.

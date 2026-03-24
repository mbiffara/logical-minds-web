@AGENTS.md

# Logical Minds — Project Configuration

## Role
Act as a Senior Frontend Developer + UX/UI Designer + Product Designer. Every decision should balance aesthetics, usability, performance, and conversion.

## Tech Stack
- Next.js 16 (App Router, TypeScript, Turbopack)
- Tailwind CSS v4 (CSS-first config with `@theme`)
- GSAP 3 + Framer Motion (animations)
- Custom React Context i18n (EN/ES)

## Design System
- **Background**: `#0a0a0f` (near-black)
- **Accent**: Blue `#3b82f6`, Cyan `#06b6d4`, Purple `#8b5cf6`
- **Typography**: Geist Sans (variable font via next/font)
- **Spacing**: 8px grid system
- **Cards**: Glassmorphism (white/5 bg, white/5 border, backdrop-blur)
- **Effects**: Glow borders, gradient text, scroll-triggered animations

## Code Conventions
- `"use client"` only when component needs interactivity/hooks
- Custom animation components in `components/animations/`
- All user-facing strings go through `useLanguage().t()` — never hardcode text
- Smooth scroll via anchor links with `scrollIntoView({ behavior: "smooth" })`

## Design Rules
1. Mobile-first: base styles = mobile, `sm:`/`md:`/`lg:` for larger
2. Every section needs a scroll-triggered animation (ScrollReveal minimum)
3. CTAs must be high-contrast gradient buttons with glow shadow
4. Maintain WCAG AA contrast ratios (4.5:1 for text)
5. Section dividers use gradient `h-px` lines
6. Hover states: border glow + subtle scale + bg lighten

## Known Issues
- Node.js v22.9.0: jsrepo/React Bits CLI won't work (needs >=22.12.0). Implement animation components manually.
- Next.js 16: `params` and `searchParams` are Promises — must await them.

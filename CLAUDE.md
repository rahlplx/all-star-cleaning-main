# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing website for All Star Cleaning, an Ottawa exterior cleaning service. Converts visitors to phone calls. ~600+ static pages.

- **Framework**: Astro 6.3 + React 19
- **Deployment**: Cloudflare Pages
- **CMS**: Keystatic (headless, cloud-backed JSON)
- **Styling**: Tailwind CSS v4 + custom design tokens
- **i18n**: English + French, manual routing via `[locale]` param
- **Pages**: ~1000+ (880 programmatic = 44 locations × 5 services × 2 locales × 2 route patterns)
- **Services**: Window cleaning, gutter cleaning, pressure washing, siding cleaning, snow removal

## Commands

```bash
npm run dev        # Dev server → http://localhost:4321
npm run build      # Production build → ./dist/
npm run preview    # Preview production build locally
npm run typecheck  # Type check via astro check
```

## CodeGraph (AI code intelligence MCP)

Codegraph builds a local SQLite symbol graph so AI agents can navigate code without scanning every file.

**First-time setup** (once per machine):
```bash
npm install -g @colbymchenry/codegraph
codegraph init -i    # builds .codegraph/codegraph.db — ~250ms for this repo
```

The MCP server is pre-configured in `.mcp.json`. Claude Code will automatically use tools like `codegraph_search`, `codegraph_callers`, `codegraph_callees`, and `codegraph_impact` once the binary is installed and the index is built.

## Key Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config, Cloudflare adapter, i18n, obfuscation Vite plugins |
| `keystatic.config.ts` | CMS schema — collections: reviews, services; singletons: settings, about, homepage |
| `src/styles/global.css` | Tailwind `@theme` tokens (colors, typography, spacing, motion) |
| `src/middleware.ts` | i18n routing middleware |
| `src/data/locations.ts` | 44 Ottawa locations with coordinates, area, postal codes, neighbours |
| `src/data/services.ts` | Service data loader and helpers |
| `src/types.ts` | TypeScript interfaces |
| `src/lib/utils.ts` | `cn()`, `formatPhone()`, `hreflangUrl()` |
| `src/seo/` | Schema.org generators (local-business, service, FAQ, breadcrumb, review, etc.) |
| `DESIGN.md` | Design system reference (colors, typography, elevation, motion, rules) |
| `PRODUCT.md` | Product/UX strategy (brand voice, user profiles, conversion goals) |

## Routes

```
/                                           → redirects to /en/
/[locale]/                                  → Homepage
/[locale]/about
/[locale]/reviews
/[locale]/services/
/[locale]/services/[serviceSlug]            → 5 services × 2 locales = 10 pages
/[locale]/area/
/[locale]/area/[locationSlug]/              → 44 locations × 2 locales = 88 pages
/[locale]/area/[locationSlug]/[serviceSlug]         → 440 programmatic pages
/[locale]/services/[serviceSlug]/[locationSlug]     → 440 inverse programmatic pages
/[locale]/privacy
/[locale]/terms
/keystatic/*                                → CMS admin UI
/api/keystatic/*                            → CMS API
```

## Components

**Astro** (`src/components/`):
- `BaseHead.astro` — meta, OG tags, hreflang, canonical
- `Header.astro` — sticky nav, mobile hamburger, phone link
- `Footer.astro` — 4-column layout with social icons
- `TopBar.astro` — optional announcement bar
- `StickyBottomCTA.astro` — fixed mobile call/quote CTA
- `JsonLd.astro` — injects JSON-LD structured data
- `FAQAccordion.astro` — accordion FAQ
- `ServiceBadge.astro` — service card with icon

**React** (`src/components/ui/`):
- `button.tsx` — CVA button with variants (default/destructive/outline/secondary/ghost/link) and sizes

## Content (Keystatic CMS)

JSON files in `src/content/`:
- `services/*.json` — window-cleaning, gutter-cleaning, pressure-washing, siding-cleaning, snow-removal
- `reviews/*.json` — 5 customer reviews
- `about.json`, `homepage.json`, `settings.json`

Edit via `/keystatic` admin UI (requires dev server) or directly in JSON files.

## Environment Variables

**`.env`** — Keystatic CMS credentials:
```
KEYSTATIC_GITHUB_CLIENT_ID
KEYSTATIC_GITHUB_CLIENT_SECRET
KEYSTATIC_SECRET
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
```

**`.env.local`** — Local overrides:
```
WEB3FORMS_ACCESS_KEY   # Contact form submissions
PUBLIC_SITE_URL        # Canonical URL (https://www.allstarcleaning.ca)
```

## Layouts

Two layouts, always nested — choose the inner one:

- **`BaseLayout.astro`** — head + topbar + header + footer + sticky CTA. Pass a `schemas` array (JSON-LD objects from `src/seo/`) and it injects them via `JsonLd.astro`. Use directly only for non-content pages (redirects, etc.).
- **`PageLayout.astro`** — wraps `BaseLayout`, adds an optional branded hero (title/subtitle) and optional breadcrumb nav. Use for all content pages.

Pass schemas up through `PageLayout` → `BaseLayout` via the `schemas` prop; never inject JSON-LD manually.

## Bilingual Pattern

Every user-facing string has an English and French variant. In `src/types.ts`, bilingual fields follow the `fr*` convention: `name`/`frName`, `slug`/`frSlug`, `features`/`frFeatures`, `faqs`/`frFaqs`, etc. The same pattern applies in service JSON files and location data.

For common UI strings (nav labels, footer text, CTAs), use the translations hook:

```ts
import { useTranslations } from '@/i18n/translations';
const t = useTranslations(locale); // locale is 'en' | 'fr'
t('nav.services')                  // returns English or French string
```

Page-specific bilingual text is handled inline with an `isFr` boolean: `const isFr = locale === 'fr'`.

## Programmatic Pages (880 location×service combos)

Two inverse route patterns exist for the same content, serving different SEO entry points:
- `/[locale]/area/[locationSlug]/[serviceSlug]` — location-first
- `/[locale]/services/[serviceSlug]/[locationSlug]` — service-first

Both use the same data (`services` × `locations` × locales). The area-first page (`src/pages/[locale]/area/[locationSlug]/[serviceSlug].astro`) is the canonical pattern. Its `getStaticPaths()` cross-joins all locales × locations × services. Each page:

1. Computes breadcrumbs from locale/location/service slugs
2. Builds a `schemas` array: `getLocationServiceSchema()` + `getBreadcrumbSchema()` + optional `getFAQSchema()`
3. Renders via `PageLayout` with hero title templated as "{Service} in {Location}"

When adding a new service or location, no changes are needed here — `getStaticPaths()` picks them up automatically.

## i18n Middleware

`src/middleware.ts` exempts `/keystatic/*` and `/api/keystatic/*` from i18n routing, then delegates to Astro's built-in middleware with `redirectToDefaultLocale: true` and `prefixDefaultLocale: true`. Result: `/` → `/en/`, unknown locales redirect to the default. If adding new routes that should bypass i18n (e.g., API endpoints), add them to the exemption check in middleware.

## Conventions

1. **Path alias**: `@/*` → `src/*` — use `@/components/...`, `@/lib/utils`, etc.
2. **i18n**: Always thread `locale` param through pages; use `hreflangUrl()` for alternate language links.
3. **Tailwind tokens**: Use CSS vars from `global.css @theme` (e.g. `--color-brand-blue`), never hardcode hex.
4. **Design rules**: See `DESIGN.md` — no pure black/white, no gradient text, no decorative side-stripes.
5. **Obfuscation**: Vite plugins rename `--tw-*` → `--c-*` and reroute `/_astro/` → `/static/` in production. Don't reference internal Tailwind vars directly.
6. **Static only**: No backend. Forms via Web3Forms. No DB queries anywhere.
7. **SEO schemas**: Use generators in `src/seo/` — never hand-write JSON-LD.
8. **Add location**: Append to `src/data/locations.ts` — programmatic pages auto-generate at build time.
9. **Add service**: Create JSON in `src/content/services/`, update `src/data/services.ts` loader array.
10. **Layouts**: Wrap pages in `BaseLayout.astro` (head + header + footer) or `PageLayout.astro` (adds breadcrumbs + hero).

## Impeccable (Design Anti-Slop)
Skill installed at `.agents/skills/impeccable/SKILL.md`.  
`DESIGN.md` + `PRODUCT.md` satisfy the `/teach` prerequisite — skip `/teach`, go straight to `/audit`, `/polish`, `/craft`.

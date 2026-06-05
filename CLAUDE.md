# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing website for All Star Cleaning, an Ottawa exterior cleaning service. Converts visitors to phone calls. ~1000+ static pages.

- **Framework**: Astro 6.3 + React 19
- **Deployment**: Cloudflare Pages
- **CMS**: Keystatic (headless, cloud-backed JSON)
- **Styling**: Tailwind CSS v4 + custom design tokens
- **i18n**: English + French, manual routing via `[locale]` param
- **Pages**: ~1000+ (900 programmatic = 45 locations × 5 services × 2 locales × 2 route patterns)
- **Services**: Window cleaning, gutter cleaning, pressure washing, siding cleaning, snow removal

## Commands

```bash
npm run dev        # Dev server → http://localhost:4321
npm run build      # Production build → ./dist/
npm run preview    # Preview production build locally
npm run typecheck  # Type check via astro check
```

## MCP Servers (`.mcp.json`)

Three servers are pre-configured. Claude Code connects automatically when the project is open.

### Astro Docs (`astro-docs`)
Searches the official Astro documentation. Tool: `search_astro_docs(query)`.

Use it whenever you need to verify Astro API behaviour, check breaking changes, or look up config options:
```
search_astro_docs("getStaticPaths params i18n manual routing")
search_astro_docs("Content Layer API JSON loader type safety")
search_astro_docs("Cloudflare adapter static output prerender")
search_astro_docs("View Transitions persist scroll position")
```

Good queries: specific API names, error message text, feature names. The tool returns excerpts from the live docs — always prefer this over training-data guesses for Astro-specific APIs.

### CodeGraph (`codegraph`)
Builds a local SQLite symbol graph for fast code navigation without full file scans. Tools: `codegraph_search`, `codegraph_callers`, `codegraph_callees`, `codegraph_impact`.

**First-time setup** (once per machine):
```bash
npm install -g @colbymchenry/codegraph
codegraph init -i    # builds .codegraph/codegraph.db — ~250ms for this repo
```

### Cloudflare (`cloudflare`)
Access to Cloudflare platform APIs (Workers, Pages, KV, etc.) — useful for deployment config questions.

## Key Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config, Cloudflare adapter, i18n, obfuscation Vite plugins |
| `keystatic.config.ts` | CMS schema — collections: reviews, services; singletons: settings, about, homepage |
| `src/styles/global.css` | Tailwind `@theme` tokens (colors, typography, spacing, motion) |
| `src/middleware.ts` | i18n routing middleware |
| `src/data/locations.ts` | 45 Ottawa locations with coordinates, area, postal codes, neighbours |
| `src/data/services.ts` | Service data loader and helpers |
| `src/types.ts` | TypeScript interfaces |
| `src/lib/utils.ts` | `cn()`, `formatPhone()`, `hreflangUrl()` |
| `src/seo/` | Schema.org generators (`getLocalBusinessSchema`, `getWebSiteSchema`, `getServiceSchema`, `getFAQSchema`, `getBreadcrumbSchema`, `getLocationServiceSchema`, `getHowToSchema`, `getReviewSchema`, `getFounderSchema`) |
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
/[locale]/area/[locationSlug]/              → 45 locations × 2 locales = 90 pages
/[locale]/area/[locationSlug]/[serviceSlug]         → 450 programmatic pages
/[locale]/services/[serviceSlug]/[locationSlug]     → 450 inverse programmatic pages
/[locale]/contact
/[locale]/privacy
/[locale]/terms
/[locale]/sitemap
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
- `FAQAccordion.astro` — ARIA accordion (`button[aria-expanded]` + `role="region"`, JS toggle, keyboard accessible)
- `ServiceBadge.astro` — service card with icon

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
WEB3FORMS_ACCESS_KEY        # Contact form submissions
PUBLIC_SITE_URL             # Canonical URL (https://allstarcleaning.ca) — non-www
PUBLIC_CF_ANALYTICS_TOKEN   # Cloudflare Web Analytics beacon token (optional — analytics disabled if unset)
```

## Layouts

Two layouts, always nested — choose the inner one:

- **`BaseLayout.astro`** — head + topbar + header + footer + sticky CTA. Pass a `schema` prop (JSON-LD object or array from `src/seo/`) and it injects them via `JsonLd.astro`. Use directly only for non-content pages (redirects, etc.).
- **`PageLayout.astro`** — wraps `BaseLayout`, adds an optional branded hero (title/subtitle) and optional breadcrumb nav. Use for all content pages.

Pass schemas up through `PageLayout` → `BaseLayout` via the `schema` prop; never inject JSON-LD manually.

## Bilingual Pattern

Every user-facing string has an English and French variant. In `src/types.ts`, bilingual fields follow the `fr*` convention: `name`/`frName`, `slug`/`frSlug`, `features`/`frFeatures`, `faqs`/`frFaqs`, etc. The same pattern applies in service JSON files and location data.

For common UI strings (nav labels, footer text, CTAs), use the translations hook:

```ts
import { useTranslations } from '@/i18n/translations';
const t = useTranslations(locale); // locale is 'en' | 'fr'
t('nav.services')                  // returns English or French string
```

Page-specific bilingual text is handled inline with an `isFr` boolean: `const isFr = locale === 'fr'`.

## Programmatic Pages (900 location×service combos)

Two inverse route patterns exist for the same content, serving different SEO entry points:
- `/[locale]/area/[locationSlug]/[serviceSlug]` — location-first
- `/[locale]/services/[serviceSlug]/[locationSlug]` — service-first

Both use the same data (`services` × `locations` × locales). The area-first page (`src/pages/[locale]/area/[locationSlug]/[serviceSlug].astro`) is the canonical pattern. Its `getStaticPaths()` cross-joins all locales × locations × services. Each page:

1. Computes breadcrumbs from locale/location/service slugs
2. Builds a schema array: `getLocationServiceSchema()` + `getBreadcrumbSchema()` + optional `getFAQSchema()`
3. Renders via `PageLayout` with hero title templated as "{Service} in {Location}"

When adding a new service or location, no changes are needed here — `getStaticPaths()` picks them up automatically.

## i18n Middleware

`src/middleware.ts` exempts `/keystatic/*` and `/api/keystatic/*` from i18n routing, then delegates to Astro's built-in middleware with `redirectToDefaultLocale: true` and `prefixDefaultLocale: true`. Result: `/` → `/en/`, unknown locales redirect to the default. If adding new routes that should bypass i18n (e.g., API endpoints), add them to the exemption check in middleware.

## AI Traps — Read Before Editing

These patterns cause silent breakage if changed without understanding the full picture:

| Trap | Detail |
|------|--------|
| **Domain: non-www only** | `https://allstarcleaning.ca` — no `www.`. Hardcoded in two independent places: `astro.config.mjs` (`site:`) for sitemap, `src/layouts/BaseLayout.astro` (`siteUrl`) for canonicals + JSON-LD. Both must match. |
| **`neighbours` are slug strings** | In `src/data/locations.ts`, `neighbours` holds EN slug strings (e.g. `'kanata'`), not `Location` objects. Resolve via `locations.find(l => l.slug === n)`. |
| **URL slugs are always EN** | Both `/en/` and `/fr/` routes use the English `slug` value, never `frSlug`. French is translated text, not translated URL segments. |
| **`as unknown as Service`** | Double cast in `src/data/services.ts` is intentional — Keystatic JSON doesn't satisfy the strict `Service` TS interface. Do not "fix" it. |
| **`/` always → `/en/`** | `src/pages/index.astro` hard-redirects to `/en/`. Do not add Accept-Language detection — it breaks Cloudflare CDN caching. |
| **`_routes.json` ↔ middleware** | `public/_routes.json` and `src/middleware.ts` must stay in sync for Keystatic routes (`/keystatic/*`, `/api/keystatic/*`). Add any new bypasses to both. |
| **`schema` prop (singular)** | `BaseLayout.astro` and `PageLayout.astro` accept `schema` (singular). Passing `schemas` silently passes nothing. |

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
The `impeccable` skill is available in Claude Code. `DESIGN.md` + `PRODUCT.md` satisfy the `/teach` prerequisite — skip `/teach`, go straight to `/audit`, `/polish`, `/craft`.

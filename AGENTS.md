# AGENTS.md — All Star Cleaning

Guidance for AI agents (OpenAI Codex, Gemini CLI, etc.) working in this repository. Claude Code users: see `CLAUDE.md` for Claude-specific tooling.

## Project

Marketing website for All Star Cleaning, an Ottawa exterior cleaning service. Goal: convert visitors to phone calls. 1000+ static pages.

- **Framework**: Astro 6.3 + React 19
- **Deployment**: Cloudflare Pages (`output: 'static'`)
- **CMS**: Keystatic — headless, JSON files in `src/content/`
- **Styling**: Tailwind CSS v4 + OKLCH design tokens
- **i18n**: English + French via `[locale]` param routing
- **Services**: window-cleaning, gutter-cleaning, pressure-washing, siding-cleaning, snow-removal

## Commands

```bash
npm run dev        # Dev server → http://localhost:4321
npm run build      # Production build → ./dist/
npm run preview    # Preview production build locally
npm run typecheck  # Type check via astro check
```

No test suite. No ESLint. No Prettier.

## Routes

```
/                                               → redirects to /en/
/[locale]/                                      → Homepage
/[locale]/about
/[locale]/reviews
/[locale]/services/
/[locale]/services/[serviceSlug]                → 5 services × 2 locales = 10 pages
/[locale]/area/
/[locale]/area/[locationSlug]/                  → 44 locations × 2 locales = 88 pages
/[locale]/area/[locationSlug]/[serviceSlug]     → 440 programmatic pages (location-first)
/[locale]/services/[serviceSlug]/[locationSlug] → 440 programmatic pages (service-first, same content)
/[locale]/privacy | /[locale]/terms | /[locale]/sitemap
/keystatic/* | /api/keystatic/*                 → CMS (bypass i18n middleware)
```

## Key Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config, Cloudflare adapter, i18n, obfuscation Vite plugins |
| `keystatic.config.ts` | CMS schema — collections: reviews, services; singletons: settings, about, homepage |
| `src/styles/global.css` | Tailwind `@theme` tokens (colors, typography, spacing, motion) |
| `src/middleware.ts` | i18n routing middleware (passes Keystatic routes through) |
| `src/data/locations.ts` | 44 Ottawa locations with coordinates, area, postal codes, neighbours |
| `src/data/services.ts` | Service array + `getServiceBySlug()` helper |
| `src/types.ts` | TypeScript interfaces (Service, Location, Review, FAQItem, etc.) |
| `src/i18n/translations.ts` | All EN/FR UI strings — use `useTranslations(locale)` |
| `src/lib/utils.ts` | `cn()`, `formatPhone()`, `hreflangUrl()` |
| `src/seo/` | Schema.org generators — never hand-write JSON-LD |
| `DESIGN.md` | Full design system (colors, typography, elevation, motion, rules) |
| `PRODUCT.md` | Brand voice, user profiles, conversion goals |

## Layouts

Two layouts, always nested — use the inner one for content pages:

- **`BaseLayout.astro`** — head + topbar + header + footer + sticky CTA. Accepts `schema` prop (JSON-LD object or array from `src/seo/`).
- **`PageLayout.astro`** — wraps BaseLayout, adds optional branded hero (`heroTitle`/`heroSubtitle`) and breadcrumb nav. Pass schemas via `schema` prop; they flow through to BaseLayout.

## i18n

- Translation strings: `src/i18n/translations.ts` — `useTranslations(locale)` hook
- Bilingual data fields: `name`/`frName`, `slug`/`frSlug`, `features`/`frFeatures`, `faqs`/`frFaqs`
- Page-specific text: inline `isFr` boolean (`const isFr = locale === 'fr'`)
- Alternate language links: `hreflangUrl()` from `src/lib/utils.ts`

## Environment Variables

**`.env`** (Keystatic CMS — required for admin UI):
```
KEYSTATIC_GITHUB_CLIENT_ID
KEYSTATIC_GITHUB_CLIENT_SECRET
KEYSTATIC_SECRET
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
```

**`.env.local`** (local overrides):
```
WEB3FORMS_ACCESS_KEY        # Contact form submissions
PUBLIC_SITE_URL             # Canonical URL (https://www.allstarcleaning.ca)
PUBLIC_CF_ANALYTICS_TOKEN   # Cloudflare Web Analytics (optional)
```

Neither file is committed — create locally.

## Gotchas

1. **Path alias**: `@/*` → `src/*` — always use `@/components/...`, never `../` chains.
2. **Build obfuscation**: Production renames `--tw-*` → `--c-*`, layer names, and `/_astro/` → `/static/`. Don't reference internal Tailwind vars — use design tokens from `global.css @theme`.
3. **No source maps**: `sourcemap: false` in astro.config.mjs.
4. **HTML comments stripped**: Custom Vite plugin removes all HTML comments in prod. Don't use comments for conditional logic.
5. **Static only**: No backend. No DB. Forms via Web3Forms. No SSR.
6. **SEO schemas**: Use generators in `src/seo/` — never hand-write JSON-LD.
7. **Adding a location**: Append to `src/data/locations.ts` — programmatic pages auto-generate.
8. **Adding a service**: Create JSON in `src/content/services/`, add import + entry in `src/data/services.ts`.
9. **No tests/lint**: Only `npm run typecheck` (astro check).
10. **No CI/CD in repo**: Cloudflare Pages handles deployment automatically.
11. **Design rules**: See `DESIGN.md` — no pure black/white, no gradient text, no side-stripe borders.

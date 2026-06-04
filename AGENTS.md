# AGENTS.md — All Star Cleaning

## Project Overview

Marketing website for All Star Cleaning, an Ottawa exterior cleaning service. Converts visitors to phone calls. ~600+ static pages.

- **Framework**: Astro 6.3 + React 19
- **Deployment**: Cloudflare Pages
- **CMS**: Keystatic (headless, cloud-backed JSON)
- **Styling**: Tailwind CSS v4 + custom design tokens (OKLCH colors)
- **i18n**: English + French, manual routing via `[locale]` param
- **Pages**: ~600+ (440 programmatic = 44 locations × 5 services × 2 locales)
- **Services**: Window cleaning, gutter cleaning, pressure washing, siding cleaning, snow removal

## Commands

```bash
npm run dev        # Dev server → http://localhost:4321
npm run build      # Production build → ./dist/
npm run preview    # Preview production build locally
npm run typecheck  # Type check via astro check
```

**No test suite, no ESLint, no Prettier.** Only `typecheck` available.

## Key Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config, Cloudflare adapter, i18n, obfuscation Vite plugins |
| `keystatic.config.ts` | CMS schema — collections: reviews, services; singletons: settings, about, homepage |
| `src/styles/global.css` | Tailwind `@theme` tokens (colors, typography, spacing, motion) |
| `src/middleware.ts` | i18n routing middleware (passes Keystatic routes through) |
| `src/data/locations.ts` | 44 Ottawa locations with coordinates, area, postal codes, neighbours |
| `src/data/services.ts` | Service data loader and helpers |
| `src/types.ts` | TypeScript interfaces (Service, Location, Review, etc.) |
| `src/lib/utils.ts` | `cn()`, `formatPhone()`, `hreflangUrl()` |
| `src/i18n/translations.ts` | All EN/FR translation strings |
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
/[locale]/area/[locationSlug]/[serviceSlug] → 440 programmatic pages
/[locale]/privacy
/[locale]/terms
/keystatic/*                                → CMS admin UI
/api/keystatic/*                            → CMS API
```

## Components

**Astro** (`src/components/`):
- `BaseHead.astro` — meta, OG tags, hreflang, canonical
- `Header.astro` — sticky nav, mobile hamburger, phone link
- `Footer.astro` — 4-column layout with social icons (has proper `aria-labels`)
- `TopBar.astro` — optional announcement bar
- `StickyBottomCTA.astro` — fixed mobile call/quote CTA
- `JsonLd.astro` — injects JSON-LD structured data
- `FAQAccordion.astro` — uses native `<details>/<summary>` (accessible by default)
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

**Note:** Neither `.env` nor `.env.local` exist in the repo. Create them locally.

## i18n

- Locales: `en`, `fr` (hardcoded in `src/middleware.ts`)
- Translation strings: `src/i18n/translations.ts` — flat object with `en` and `fr` exports
- Routing: manual via `[locale]` param. Middleware redirects `/` → `/en/`, strips non-prefix paths
- Always thread `locale` through pages and components
- Use `hreflangUrl()` from `src/lib/utils.ts` for alternate language links

## Gotchas

1. **Path alias**: `@/*` → `src/*` — always use `@/components/...`, never relative `../` chains
2. **Build obfuscation**: Production builds rename `--tw-*` → `--c-*` (Tailwind), layer names (`theme` → `design-tokens`, `utilities` → `helpers`), and `/_astro/` → `/static/`. Never reference `--tw-*` CSS vars in custom code — use the design tokens from `global.css @theme` instead.
3. **No source maps**: `sourcemap: false` in astro.config.mjs. Don't rely on them for debugging.
4. **HTML comments stripped**: Custom Vite plugin removes all HTML comments in prod. Don't use comments for framework-specific conditional logic.
5. **Static only**: No backend. No DB. Forms use Web3Forms (third-party). No server-side rendering.
6. **SEO schemas**: Use generators in `src/seo/` — never hand-write JSON-LD structured data.
7. **Adding locations**: Append to `src/data/locations.ts` — 44 locations, pages auto-generate at build time.
8. **Adding services**: Create JSON in `src/content/services/`, add import + entry in `src/data/services.ts`.
9. **Layouts**: Wrap pages in `BaseLayout.astro` (head + header + footer) or `PageLayout.astro` (adds breadcrumbs + hero).
10. **Tailwind tokens**: Use CSS vars from `global.css @theme` (e.g. `--color-midnight-indigo`, `--color-navy`), never hardcode hex values.
11. **Design rules**: See `DESIGN.md` — no pure black/white, no gradient text, no decorative side-stripes.
12. **No tests or lint**: No test suite, no ESLint, no Prettier. Only `npm run typecheck` (astro check).
13. **No CI/CD in repo**: Cloudflare Pages handles deployment. No GitHub Actions workflows.
14. **No `.env` files committed**: Create `.env` with Keystatic creds, `.env.local` with Web3Forms key and `PUBLIC_SITE_URL`.

## Impeccable (Design Anti-Slop)

OpenCode plugin installed at `~/.config/opencode/.opencode/skills/impeccable/`.  
`DESIGN.md` + `PRODUCT.md` satisfy the `/teach` prerequisite — skip `/teach`, go straight to `/audit`, `/polish`, `/craft`.

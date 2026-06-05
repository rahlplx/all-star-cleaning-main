# All Star Cleaning

Bilingual (EN/FR) marketing website for an Ottawa exterior cleaning service. ~1000+ static pages. Goal: convert visitors to phone calls.

**Live:** [allstarcleaning.ca](https://allstarcleaning.ca)

## Stack

| Layer | Tech |
|-------|------|
| Framework | Astro 6.3 + React 19 |
| Deployment | Cloudflare Pages (`output: 'static'`) |
| CMS | Keystatic (JSON files in `src/content/`) |
| Styles | Tailwind CSS v4 + OKLCH design tokens |
| i18n | English + French via `[locale]` param routing |

## Quick Start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → ./dist/
npm run preview    # preview production build
npm run typecheck  # astro check (no test suite)
```

Environment variables needed — see [AGENTS.md](AGENTS.md#environment-variables) for `.env` and `.env.local` setup.

## Pages

```
/                                                → redirects → /en/
/[locale]/                                       → Homepage
/[locale]/about | /reviews | /services/
/[locale]/services/[serviceSlug]                 → 5 service pages
/[locale]/area/[locationSlug]/                   → 45 location pages
/[locale]/area/[locationSlug]/[serviceSlug]      → 450 programmatic pages
/[locale]/services/[serviceSlug]/[locationSlug]  → 450 inverse programmatic pages
/[locale]/privacy | /terms | /sitemap
/keystatic/* | /api/keystatic/*                  → CMS admin (dev only)
```

**900 programmatic pages** from 45 Ottawa locations × 5 services × 2 locales × 2 route patterns.

## Services

Window cleaning · Gutter cleaning · Pressure washing · Siding cleaning · Snow removal

## Content Management

Edit content via the Keystatic CMS at `/keystatic` (requires dev server running with Keystatic credentials). Or edit JSON files directly in `src/content/`.

- `src/content/services/*.json` — service descriptions, features, FAQs
- `src/content/reviews/*.json` — customer reviews
- `src/content/settings.json` — phone, email, address, social links
- `src/content/homepage.json` — hero, stats, CTAs
- `src/content/about.json` — about page copy

## Extending

**Add a location** — append to `src/data/locations.ts`. All 900 programmatic pages regenerate at next build.

**Add a service** — create `src/content/services/{slug}.json`, add import + entry in `src/data/services.ts`.

## Docs

| File | Purpose |
|------|---------|
| [AGENTS.md](AGENTS.md) | Architecture, routes, key files, env vars, AI traps |
| [CLAUDE.md](CLAUDE.md) | Claude Code — MCP servers, conventions, programmatic page patterns |
| [DESIGN.md](DESIGN.md) | Full design system — OKLCH palette, typography, elevation, motion rules |
| [PRODUCT.md](PRODUCT.md) | Brand voice, user profiles, conversion goals |
| [llms.txt](llms.txt) | LLM-readable project index |

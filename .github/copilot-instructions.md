# GitHub Copilot Instructions — All Star Cleaning

Astro 6.3 + Cloudflare Pages marketing site. 1000+ static pages, bilingual EN/FR, Tailwind CSS v4 with OKLCH design tokens. Full context in `AGENTS.md`, `DESIGN.md`, `PRODUCT.md`.

## Critical rules

- **Path alias**: `@/*` → `src/*`. Never use `../` chains.
- **Layouts**: Use `PageLayout.astro` for content pages. Pass structured data via `schema` prop (singular) — never inject JSON-LD manually.
- **Tailwind tokens**: Use CSS vars from `src/styles/global.css`. Never hardcode hex. Never use `--tw-*` vars (renamed to `--c-*` in production).
- **i18n**: Every user-facing string has EN + FR. Use `useTranslations(locale)` from `src/i18n/translations.ts` for common strings. Use `isFr` boolean for page-specific text.
- **Schema.org**: Use generators from `src/seo/` — `getBreadcrumbSchema`, `getLocationServiceSchema`, `getFAQSchema`, etc.
- **Static only**: No backend, no DB, no SSR. Forms via Web3Forms.
- **No tests**: Only `npm run typecheck` (astro check).

## Design rules (from DESIGN.md)

No pure black/white for large areas. No gradient text. No side-stripe borders. No nested cards. Cards: `rounded-xl`, flat at rest, `hover:-translate-y-0.5 hover:shadow-md`. Touch targets: min 44×44px.

## Adding content

- **Location**: Append to `src/data/locations.ts` → 900 programmatic pages auto-generate
- **Service**: Create `src/content/services/{slug}.json` + add to `src/data/services.ts`

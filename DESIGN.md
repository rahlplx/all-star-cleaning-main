# Design System — All Star Cleaning Ottawa

## Color Strategy: Enterprise Cleaning Palette
Star Blue (`oklch(35% 0.12 225)`) carries the authoritative brand voice across headings, primary CTAs, and active states. The hue shift from 265° (indigo) to 225° (blue) evokes water and cleanliness — core to the cleaning brand. Fresh Teal (`oklch(65% 0.11 175)`) provides a secondary accent for eco-friendly and modern messaging. Star Gold (`oklch(68% 0.15 48)`) signals premium quality and "All Star" excellence. Cool Gray neutrals (`hue 225°`) maintain a crisp, clean feel throughout.

## Palette

### Primary: Star Blue (10-step scale)
| Step | Token | OKLCH | Use Case |
|------|-------|-------|----------|
| 50 | `--color-blue-50` | `oklch(97% 0.01 225)` | Light backgrounds, tints |
| 100 | `--color-blue-100` | `oklch(94% 0.02 225)` | Hover backgrounds |
| 200 | `--color-blue-200` | `oklch(89% 0.04 225)` | Active backgrounds |
| 300 | `--color-blue-300` | `oklch(82% 0.07 225)` | Borders, dividers |
| 400 | `--color-blue-400` | `oklch(74% 0.10 225)` | Subtle accents |
| 500 | `--color-blue-500` | `oklch(65% 0.13 225)` | Primary brand |
| 600 | `--color-blue-600` | `oklch(55% 0.15 225)` | Hover states |
| 700 | `--color-blue-700` | `oklch(45% 0.14 225)` | Active states |
| 800 | `--color-blue-800` | `oklch(35% 0.12 225)` | Dark accents, primary CTA |
| 900 | `--color-blue-900` | `oklch(25% 0.10 225)` | Deep backgrounds |
| 950 | `--color-blue-950` | `oklch(18% 0.08 225)` | Near-black |

### Secondary: Fresh Teal (10-step scale)
| Step | Token | OKLCH | Use Case |
|------|-------|-------|----------|
| 50 | `--color-teal-50` | `oklch(97% 0.01 175)` | Light tints |
| 100 | `--color-teal-100` | `oklch(94% 0.02 175)` | Hover backgrounds |
| 200 | `--color-teal-200` | `oklch(89% 0.04 175)` | Active backgrounds |
| 300 | `--color-teal-300` | `oklch(82% 0.06 175)` | Borders |
| 400 | `--color-teal-400` | `oklch(74% 0.09 175)` | Subtle accents |
| 500 | `--color-teal-500` | `oklch(65% 0.11 175)` | Secondary brand |
| 600 | `--color-teal-600` | `oklch(55% 0.12 175)` | Hover states |
| 700 | `--color-teal-700` | `oklch(45% 0.11 175)` | Active states |
| 800 | `--color-teal-800` | `oklch(35% 0.09 175)` | Dark accents |
| 900 | `--color-teal-900` | `oklch(25% 0.07 175)` | Deep backgrounds |
| 950 | `--color-teal-950` | `oklch(18% 0.05 175)` | Near-black |

### Accent: Star Gold (10-step scale)
| Step | Token | OKLCH | Use Case |
|------|-------|-------|----------|
| 50 | `--color-gold-50` | `oklch(97% 0.02 48)` | Light tints |
| 100 | `--color-gold-100` | `oklch(94% 0.04 48)` | Hover backgrounds |
| 200 | `--color-gold-200` | `oklch(89% 0.07 48)` | Active backgrounds |
| 300 | `--color-gold-300` | `oklch(82% 0.10 48)` | Borders |
| 400 | `--color-gold-400` | `oklch(75% 0.13 48)` | Subtle accents |
| 500 | `--color-gold-500` | `oklch(68% 0.15 48)` | Accent brand, ratings |
| 600 | `--color-gold-600` | `oklch(60% 0.16 48)` | Hover states |
| 700 | `--color-gold-700` | `oklch(52% 0.15 48)` | Active states |
| 800 | `--color-gold-800` | `oklch(44% 0.13 48)` | Dark accents |
| 900 | `--color-gold-900` | `oklch(36% 0.11 48)` | Deep backgrounds |
| 950 | `--color-gold-950` | `oklch(28% 0.09 48)` | Near-black |

### Neutral: Cool Gray (10-step scale, hue 225)
| Step | Token | OKLCH | Use Case |
|------|-------|-------|----------|
| 50 | `--color-gray-50` | `oklch(98.5% 0.003 225)` | Page background |
| 100 | `--color-gray-100` | `oklch(96.5% 0.005 225)` | Card background |
| 200 | `--color-gray-200` | `oklch(93% 0.007 225)` | Borders, dividers |
| 300 | `--color-gray-300` | `oklch(89% 0.009 225)` | Disabled borders |
| 400 | `--color-gray-400` | `oklch(82% 0.010 225)` | Placeholder text |
| 500 | `--color-gray-500` | `oklch(70% 0.012 225)` | Muted text |
| 600 | `--color-gray-600` | `oklch(55% 0.015 225)` | Secondary text |
| 700 | `--color-gray-700` | `oklch(42% 0.018 225)` | Body text |
| 800 | `--color-gray-800` | `oklch(30% 0.020 225)` | Headings |
| 900 | `--color-gray-900` | `oklch(20% 0.022 225)` | Near-black |
| 950 | `--color-gray-950` | `oklch(13% 0.025 225)` | Pure dark |

### Semantic: Success (Clean Green, hue 150)
| Step | Token | OKLCH | Use Case |
|------|-------|-------|----------|
| 50 | `--color-green-50` | `oklch(97% 0.02 150)` | Success backgrounds |
| 500 | `--color-green-500` | `oklch(65% 0.17 150)` | Success default |
| 600 | `--color-green-600` | `oklch(55% 0.18 150)` | Hover success |

### Semantic: Info (Sky Blue, hue 210)
| Step | Token | OKLCH | Use Case |
|------|-------|-------|----------|
| 50 | `--color-sky-50` | `oklch(97% 0.01 210)` | Info backgrounds |
| 500 | `--color-sky-500` | `oklch(65% 0.11 210)` | Info default |
| 600 | `--color-sky-600` | `oklch(55% 0.12 210)` | Hover info |

### Semantic: Warning (Amber, hue 75)
| Step | Token | OKLCH | Use Case |
|------|-------|-------|----------|
| 50 | `--color-amber-50` | `oklch(97% 0.02 75)` | Warning backgrounds |
| 500 | `--color-amber-500` | `oklch(65% 0.16 75)` | Warning default |
| 600 | `--color-amber-600` | `oklch(55% 0.17 75)` | Hover warning |

### Semantic: Error (Signal Red, hue 25)
| Step | Token | OKLCH | Use Case |
|------|-------|-------|----------|
| 50 | `--color-red-50` | `oklch(97% 0.02 25)` | Error backgrounds |
| 500 | `--color-red-500` | `oklch(65% 0.18 25)` | Error default |
| 600 | `--color-red-600` | `oklch(55% 0.20 25)` | Hover error |

### Surface Hierarchy
| Token | Value | Use Case |
|-------|-------|----------|
| `--color-surface-background` | `var(--color-gray-50)` | Page base |
| `--color-surface-card` | `oklch(100% 0 0)` | Content cards |
| `--color-surface-elevated` | `oklch(100% 0 0)` | Floating elements |
| `--color-surface-overlay` | `oklch(20% 0.022 225 / 0.5)` | Modals, backdrops |
| `--color-surface-inverse` | `var(--color-gray-900)` | Inverted surfaces |

### State Colors
| Token | Value | Use Case |
|-------|-------|----------|
| `--color-state-hover` | `var(--color-blue-50)` | Hover background |
| `--color-state-active` | `var(--color-blue-100)` | Pressed background |
| `--color-state-focus` | `var(--color-blue-500)` | Focus ring |
| `--color-state-disabled` | `var(--color-gray-200)` | Disabled background |
| `--color-state-disabled-text` | `var(--color-gray-400)` | Disabled text |

### Data Visualization
| Token | Value | Use Case |
|-------|-------|----------|
| `--color-chart-1` | `var(--color-blue-500)` | Primary data series |
| `--color-chart-2` | `var(--color-teal-500)` | Secondary data series |
| `--color-chart-3` | `var(--color-gold-500)` | Tertiary data series |
| `--color-chart-4` | `var(--color-green-500)` | Quaternary data series |
| `--color-chart-5` | `var(--color-sky-500)` | Quinary data series |
| `--color-chart-6` | `var(--color-red-500)` | Senary data series |

### Legacy Aliases
| Legacy Token | Maps To |
|--------------|---------|
| `--color-midnight-indigo` | `--color-blue-800` |
| `--color-navy` | `--color-gray-900` |
| `--color-gold` | `--color-gold-500` |
| `--color-off-white` | `--color-gray-50` |
| `--color-background` | `--color-gray-50` |
| `--color-primary` | `--color-blue-800` |

## Typography

### Fonts
- **Headings**: DM Serif Display — editorial authority, local trust, distinctive without being ornate
- **Body**: Outfit — clean geometric sans, excellent readability at body sizes, pairs well with serif headings

### Scale
Fluid `clamp()` for headings, fixed `rem` for body. Ratio 1.25 between steps.

| Role | Token | Value |
|------|-------|-------|
| Display | `--text-display` | `clamp(2.5rem, 5vw, 4.5rem)` |
| Headline | `--text-headline` | `clamp(1.75rem, 4vw, 3rem)` |
| Subheading | `--text-subheading` | `clamp(1.125rem, 2.5vw, 1.5rem)` |
| Body | `--text-base` | `1rem` (16px) |
| Small | `--text-sm` | `0.875rem` |
| Caption | `--text-xs` | `0.75rem` |

### Line Heights
- Headings: 1.1-1.2
- Body: 1.6 (the readability sweet spot)
- Light text on dark: +0.05-0.1

## Elevation
Flat by default. Shadows only on state change (hover, sticky).

| Level | Token | Purpose |
|-------|-------|---------|
| Rest | none | Cards and surfaces at rest are flat |
| Subtle | `--shadow-sm` | Resting cards |
| Hover | `--shadow-md` | Hover lift on cards |
| Elevated | `--shadow-lg` | Sticky CTAs, dropdowns |
| Prominent | `--shadow-xl` | Hero elements, modals |

## Motion

| Token | Duration | Easing | Use Case |
|-------|----------|--------|----------|
| `--transition-fast` | 150ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Color, opacity transitions |
| `--transition-base` | 250ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Transforms, non-color changes |
| `--transition-slow` | 350ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Orchestrated entrances |
| `--transition-entrance` | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Page load animations |

**Rules:**
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-quart) — no bounce, no spring
- Never animate layout properties (`width`, `height`, `padding`, `margin`)
- Always respect `prefers-reduced-motion`
- Use `will-change` sparingly (only on actively animating elements)

## Spacing Scale

8pt-based scale with semantic tokens for section rhythm and intra-component gaps.

| Token | Value | Use Case |
|-------|-------|----------|
| `--space-section-sm` | 4rem (64px) | Small section padding |
| `--space-section-md` | 5rem (80px) | Medium section padding |
| `--space-section-lg` | 6rem (96px) | Large section padding |
| `--space-gap-tight` | 0.5rem (8px) | Related siblings |
| `--space-gap-normal` | 1rem (16px) | Standard grouping |
| `--space-gap-relaxed` | 1.5rem (24px) | Section internals |
| `--space-gap-loose` | 2rem (32px) | Distinct groups |
| `--space-gap-section` | 3rem (48px) | Section separation |
| `--space-gap-spread` | 5rem (80px) | Generous separation |

**Rules:**
- Magazine-scale breathing room: generous separations between sections (48-80px)
- Tight groupings for related elements (8-16px)
- Use `--space-section-*` for vertical page rhythm
- Use `--space-gap-*` for horizontal/grid gaps

## Z-Index Scale

| Token | Value | Use Case |
|-------|-------|----------|
| `--z-base` | 0 | Default stacking |
| `--z-dropdown` | 10 | Dropdowns, popovers |
| `--z-sticky` | 20 | Sticky headers, sticky CTAs |
| `--z-overlay` | 30 | Modal backdrops |
| `--z-modal` | 40 | Modal content |
| `--z-toast` | 50 | Notifications, toasts |

## Components

### CTA Buttons
- Primary: `rounded-full bg-midnight-indigo text-white shadow-lg hover:bg-midnight-indigo-dark`
- Secondary: `rounded-full border-2 border-white/30 text-white hover:border-white/60`
- Touch targets: minimum 44x44px (48px on coarse pointers)

### Cards
- Rounded corners (`rounded-xl`), hairline border, flat at rest
- Hover: subtle lift (`-translate-y-0.5`) + shadow increase
- No side-stripe borders (impeccable ban)
- No nested cards

### Breadcrumbs
- Hairline bottom border, compact padding
- Chevron separators, last item bold with `aria-current`

## Rules
1. Never use pure `#000` or pure `#fff` for large areas
2. Never use gradient text (`background-clip: text` + gradient)
3. Never use side-stripe borders (border-left/right > 1px as accent)
4. Never nest cards inside cards
5. Cap body line length at 65ch
6. Tint all neutrals toward brand hue (indigo)
7. Gray text on colored backgrounds: use a shade of the background color instead
8. Every interactive element needs hover, focus, active, and disabled states

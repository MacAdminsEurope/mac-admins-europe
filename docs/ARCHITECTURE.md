# Architecture

## Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Astro 5** | Static-first, zero-JS-by-default, great DX for content sites. Fast page loads, simple deploys. |
| Language | **TypeScript** | All data files (`src/data/**`) are typed so a typo or missing field fails at build time, not at runtime. |
| Styling | **Plain CSS** (`src/styles/global.css`) + Astro scoped `<style>` | No CSS framework dependency. One global file holds the design tokens and shared components; per-page styles are scoped via Astro's built-in scoping. |
| Icons | Inline SVG | No external icon library. Each SVG is small enough to live inline next to its usage. |
| Forms | `forminit` | Lightweight client-side form library, only used on the newsletter component. |
| Hosting | **GitHub Pages** + **GitHub Actions** | Free, reliable, integrates directly with the repo. Custom domain `macadmins-eu.org` via the `CNAME` file. |

The site is **static-only**: `astro.config.mjs` has the server adapter commented out. Every page is pre-rendered to HTML at build time.

## Project structure

```
mac-admins-europe/
├── public/                       # Static assets served at the root
│   ├── photo_gallery/            # 2026 event photos (by ZED Images)
│   ├── img/                      # Speaker headshots, sponsor logos, hero imagery
│   ├── favicon.*                 # Favicons
│   └── CNAME                     # macadmins-eu.org (in repo root, copied at build)
│
├── src/
│   ├── pages/                    # Each .astro file = a route
│   │   ├── index.astro           # Homepage
│   │   ├── community.astro
│   │   ├── contact.astro
│   │   ├── code-of-conduct.astro
│   │   ├── privacy.astro
│   │   ├── team.astro
│   │   ├── tickets.astro
│   │   └── 2026/                 # The 2026 archive section
│   │       ├── index.astro       # /2026 archive overview
│   │       ├── program.astro
│   │       ├── speakers.astro
│   │       ├── sponsors.astro
│   │       ├── sponsors/         # Sub-routes (e.g. become a sponsor)
│   │       ├── location.astro
│   │       ├── videos.astro
│   │       └── gallery.astro
│   │
│   ├── data/                     # Typed content data (no JSX, no UI)
│   │   ├── archive.ts            # Registry of every conference year
│   │   └── 2026/
│   │       ├── edition.ts        # Year identity: colors + label
│   │       ├── archive.ts        # Year metadata + archive page links
│   │       ├── speakers.ts       # Speaker list + talk details
│   │       ├── schedule.ts       # Day schedule + YouTube URLs
│   │       ├── sponsors.ts       # Sponsor list + tiers
│   │       └── location.ts       # Venue details
│   │
│   ├── layouts/
│   │   ├── Layout.astro          # Global wrapper: header, footer, meta, nav
│   │   └── EditionArchiveLayout.astro  # Wraps a year's pages, injects edition colors
│   │
│   ├── components/               # Small reusable Astro components (NewsletterForm, etc.)
│   ├── styles/
│   │   └── global.css            # Design tokens + all shared component CSS
│   ├── utils/
│   │   └── baseUrl.ts            # Helper for build-time base URL
│   └── img/                      # Imported (not public) imagery
│
├── docs/                         # You are here
├── .github/workflows/deploy.yml  # GitHub Pages deploy
├── astro.config.mjs
└── package.json
```

## Key files & what they do

### `src/layouts/Layout.astro`
The **outermost wrapper for every page**. It renders:
- `<head>` with meta, OpenGraph, Twitter cards, favicons, and analytics
- The site `<header>` (sticky nav: Community, Contact, View Archive)
- The page slot
- The site `<footer>` (4-column grid: brand, archive link, info links, newsletter)
- Mobile nav toggle + scroll-shadow script

All pages use this either directly or via `EditionArchiveLayout`.

### `src/layouts/EditionArchiveLayout.astro`
A **thin wrapper around `Layout.astro`** that takes an `edition` prop (from `src/data/<year>/edition.ts`) and emits inline CSS custom properties for that year's color palette. This is the mechanism that lets each conference year have its own visual identity without duplicating CSS.

```astro
<EditionArchiveLayout edition={edition2026}>
  <!-- This entire subtree can now use var(--eu-blue), var(--eu-gold), etc.
       and they'll match the 2026 palette. Next year will be a different palette. -->
</EditionArchiveLayout>
```

See [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md) for the full variable list.

### `src/data/archive.ts`
The **registry of every conference year**. New years import from `src/data/<year>/archive.ts` and append to the `archiveYears` array. This is what the previous-years/archive pages iterate over.

### `src/styles/global.css`
~5000 lines. Holds:
- CSS custom properties (design tokens) at `:root`
- Reset + base typography
- Shared components: buttons, nav, footer, page hero, schedule blocks, speaker cards, ticket cards, modals, etc.
- Per-page section styles (homepage, program, speakers, sponsors, location)
- Responsive breakpoints (768px is the main mobile boundary)

Per-page styles that only apply to one route should be in that route's scoped `<style>` block instead.

## Design choices & their rationale

### Astro over Next.js / Gatsby
The site is **content-heavy and interaction-light**. Astro ships zero JavaScript by default; only the few interactive bits (mobile nav, lightbox, modals) get JS, and only the JS they need. This keeps the site fast on slow connections at a conference venue.

### Plain CSS with custom properties (no Tailwind / no CSS-in-JS)
Custom properties give us per-edition theming for free (see `EditionArchiveLayout`). No build-step CSS, no runtime cost, easy to debug. The trade-off: `global.css` is large, so we lean on scoped `<style>` blocks for page-specific design.

### Typed data files instead of a CMS
Speakers, schedule, sponsors, etc. live in TypeScript files. This means:
- **No external service** to break, pay for, or migrate
- **Type safety**: missing fields fail the build
- **PR-able**: edits go through git history, reviewable and revertable
- Trade-off: editors need to be comfortable with code

### `public` branch as the deploy trigger
Day-to-day commits go to `main`. When the team is ready to deploy, they push `main` → `public`. This decouples "merged to the trunk" from "live on the site" and acts as a soft staging step. See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

### Per-year subfolders rather than dynamic routes
`/2026/program` is a real file at `src/pages/2026/program.astro`, not `/[year]/program.astro`. This:
- Lets each year diverge in layout if needed
- Avoids the temptation to share data structures that should evolve year-over-year
- Makes the archive feel like a frozen snapshot (because it is)

See [`ARCHIVE-SYSTEM.md`](./ARCHIVE-SYSTEM.md) for the full reasoning and pattern.

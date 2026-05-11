# Agent Instructions — Mac Admins Europe

> **If you are an AI coding assistant working on this repo (Cursor, Windsurf, Claude Code, Codex, Copilot, Aider, Continue, etc.), read this file first.**

## TL;DR

This is an **Astro 5** static site for the Mac Admins Europe conference, deployed to GitHub Pages at <https://macadmins-eu.org>. The site is **content-heavy and interaction-light**, with a per-year archive pattern that lets each conference edition coexist as a frozen snapshot.

**Before making changes**, read the relevant docs in `/docs/`:

| Task | Read first |
| --- | --- |
| Understand the codebase | [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) |
| Touch CSS, colors, spacing, components | [`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md) |
| Touch anything under `src/data/<year>/` or `src/pages/<year>/` | [`docs/ARCHIVE-SYSTEM.md`](./docs/ARCHIVE-SYSTEM.md) |
| Add a new conference year | [`docs/ADDING-A-NEW-YEAR.md`](./docs/ADDING-A-NEW-YEAR.md) |
| Set up local dev or deploy | [`docs/CONTRIBUTING.md`](./docs/CONTRIBUTING.md) |

## Critical rules

These are not negotiable. Following them prevents the most common mistakes:

### 1. Never modify an old conference year

`src/data/2026/` and `src/pages/2026/` are a **frozen archive**. The event happened, the data is fixed. If you're adding 2027, copy the folder — do not refactor 2026 to share with 2027.

### 2. Only use CSS tokens that exist in `global.css`

Many tokens have appeared in old code that aren't defined. Verify before using:

```bash
grep -oE '^\s*--[a-z0-9-]+' src/styles/global.css | sort -u
```

The full canonical list is in [`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md#complete-token-reference). **Do not use** `--surface-card`, `--text-main`, or `--text-muted` — they look real but don't exist.

### 3. The breakpoint is `768px`

The site has one primary responsive breakpoint. Do not invent new breakpoints (`640px`, `480px`, `1024px`) without a real reason.

### 4. Branch model: `main` for work, `public` for deploy

Pushing to `public` triggers the GitHub Pages deploy. Day-to-day commits go on `main`. Do not push to `public` without verifying the build.

```bash
git push origin main           # safe, no deploy
git push origin main:public    # triggers deploy
```

### 5. Per-edition theming

Archive pages live under an `EditionArchiveLayout` wrapper that re-binds color custom properties (`--eu-blue`, `--eu-gold`, etc.) to that year's palette. Inside an archive page, prefer `--theme-primary` / `--theme-accent` over `--edition-*` — those are the consumer aliases.

## Project layout (at a glance)

```
src/
├── pages/                  # Each .astro file = a route
│   ├── index.astro
│   ├── 2026/               # The 2026 archive (frozen)
│   │   ├── index.astro     # /2026 overview
│   │   ├── program.astro
│   │   ├── speakers.astro
│   │   ├── sponsors.astro
│   │   ├── location.astro
│   │   ├── videos.astro
│   │   └── gallery.astro
│   └── …
├── data/
│   ├── archive.ts          # Registry of all conference years
│   └── 2026/               # Typed content for 2026 (frozen)
│       ├── edition.ts      # Visual identity (colors)
│       ├── archive.ts      # Year metadata + links
│       ├── speakers.ts
│       ├── schedule.ts
│       ├── sponsors.ts
│       └── location.ts
├── layouts/
│   ├── Layout.astro
│   └── EditionArchiveLayout.astro
├── styles/
│   └── global.css          # All design tokens + shared component CSS
└── utils/
    └── baseUrl.ts

public/
├── photo_gallery/          # 2026 event photos (ZED Images)
└── img/                    # Speakers, sponsors, archive imagery
```

## Common tasks — quick recipes

### Adding a speaker
Edit `src/data/2026/speakers.ts`. Each speaker needs a unique `order` number (used as a stable ID by `schedule.ts`). Don't reuse or renumber existing ones.

### Adding a YouTube recording
Set `youtubeUrl: 'https://www.youtube.com/watch?v=…'` on the relevant entry in `src/data/2026/schedule.ts`. This automatically:
- Shows the YouTube icon on the program page
- Adds the talk to `/2026/videos`

### Editing styles
- **Shared/reusable** → `src/styles/global.css`
- **Page-specific** → scoped `<style>` block at the bottom of the page's `.astro` file
- See "Scoped page styles vs global.css — the contract" in [`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md)

### Adding a new conference year
Follow [`docs/ADDING-A-NEW-YEAR.md`](./docs/ADDING-A-NEW-YEAR.md) step-by-step. **You should not need to modify anything inside `src/data/2026/` or `src/pages/2026/`.**

## Style & conventions

- **TypeScript everywhere** — data files are typed; build fails on schema violations
- **Astro components** (`.astro`), not React/Vue/Svelte
- **Plain CSS** in `global.css` + scoped `<style>` blocks; no Tailwind, no CSS-in-JS
- **Inline SVG icons**, no icon library
- **External links** always carry `target="_blank" rel="noopener noreferrer"`
- **Semantic HTML** — real `<button>`, `<a>`, `<nav>`, `<main>`; no `<div onclick>`
- **Accessibility** — `:focus-visible` outlines, focus management in modals/lightboxes, `prefers-reduced-motion` support
- **Commit prefixes** — `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`

## Verifying before committing

```bash
npm run build        # must pass; TypeScript errors fail the build
npm run dev          # local server at http://localhost:4321
```

Pre-commit checklist (from `docs/CONTRIBUTING.md`):
- [ ] `npm run build` succeeds with no TypeScript errors
- [ ] Mobile breakpoint (≤ 768px) still looks right
- [ ] Modals/lightboxes open and close cleanly
- [ ] No console errors in dev tools
- [ ] External links have `rel="noopener noreferrer"`
- [ ] Images have `alt` (or `aria-hidden` if decorative)

## What this site is NOT

- **Not a CMS-driven site.** Content lives in TypeScript files, not a database.
- **Not server-rendered.** Static-only; the Astro server adapter is intentionally disabled.
- **Not a React app.** Don't reach for `useState`. If interactivity is needed, write a small vanilla JS `<script>` block in the `.astro` file.
- **Not styled with Tailwind.** Resist the urge to add it.

## When in doubt

Read the doc that's closest to what you're touching. Each doc page is focused (~200 lines each) and self-contained. If a doc seems out of date relative to the code, **the code is the source of truth** — but please update the doc in the same PR.

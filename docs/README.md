# Mac Admins Europe — Documentation

Welcome to the project docs. These pages explain how the site is built, why it's built that way, and how to keep it healthy across multiple conference years.

## Start here

| If you want to… | Read |
| --- | --- |
| Understand the tech stack and folder layout | [`ARCHITECTURE.md`](./ARCHITECTURE.md) |
| Understand colors, spacing, typography, and UI patterns | [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md) |
| Understand how each conference year is archived | [`ARCHIVE-SYSTEM.md`](./ARCHIVE-SYSTEM.md) |
| Add a new conference year (e.g. 2027) | [`ADDING-A-NEW-YEAR.md`](./ADDING-A-NEW-YEAR.md) |
| Set up local dev, branching, and deploy | [`CONTRIBUTING.md`](./CONTRIBUTING.md) |

> **AI coding assistants** (Cursor, Windsurf, Claude Code, Codex, Copilot, etc.): start with [`/AGENTS.md`](../AGENTS.md) at the repo root. It's a condensed version of these docs with the critical rules.

## TL;DR

- **Astro 5** static site, hosted on **GitHub Pages** via custom domain `macadmins-eu.org`
- **TypeScript-typed data files** under `src/data/<year>/` drive the per-year pages
- **One layout per archive year** (`EditionArchiveLayout.astro`) injects that year's color identity as CSS custom properties
- **Branch model:** day-to-day work happens on `main`; pushing `main` → `public` triggers the GitHub Actions deploy
- **Adding a new year:** copy `src/pages/2026/` and `src/data/2026/`, swap colors, populate data, register in `src/data/archive.ts`. The shared layout + global CSS does the rest.

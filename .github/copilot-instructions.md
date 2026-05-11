# GitHub Copilot Instructions

This repo is an **Astro 5** static site for the Mac Admins Europe conference.

**Before suggesting changes, follow the project's full agent instructions at [`/AGENTS.md`](../AGENTS.md)** — it contains the architecture overview, design system rules, the per-year archive pattern, and a list of common mistakes to avoid.

For any task, the relevant deep-dive doc is in [`/docs/`](../docs/):

- Architecture & tech choices → [`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md)
- Design tokens & components → [`docs/DESIGN-SYSTEM.md`](../docs/DESIGN-SYSTEM.md)
- The 2026/per-year archive system → [`docs/ARCHIVE-SYSTEM.md`](../docs/ARCHIVE-SYSTEM.md)
- Adding a new conference year → [`docs/ADDING-A-NEW-YEAR.md`](../docs/ADDING-A-NEW-YEAR.md)
- Dev setup & deploy → [`docs/CONTRIBUTING.md`](../docs/CONTRIBUTING.md)

## Quick rules

- **Don't modify `src/data/2026/` or `src/pages/2026/`** — that year is a frozen archive
- **Use only CSS tokens defined in `src/styles/global.css`** — `--surface-card`, `--text-main`, `--text-muted` look real but don't exist
- **Single responsive breakpoint:** `768px`
- **No Tailwind, no React, no CSS-in-JS** — plain Astro + plain CSS + custom properties
- **Branch workflow:** feature branch → PR into `main` → merge → second PR from `main` → `public` → merge triggers deploy. Never commit directly to `main` or `public`

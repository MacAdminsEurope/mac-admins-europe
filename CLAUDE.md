# Claude Code Instructions — Mac Admins Europe

This is an **Astro 5** static site for the Mac Admins Europe conference, deployed to GitHub Pages at <https://macadmins-eu.org>.

**Start with [`AGENTS.md`](./AGENTS.md)** — it's the canonical agent guide for this repo. The deeper docs live in [`/docs/`](./docs/README.md).

## Critical rules

1. **Never modify `src/data/2026/` or `src/pages/2026/`** — frozen archive (the event happened; data is fixed)
2. **Only use CSS tokens that exist in `src/styles/global.css`** — see [`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md#complete-token-reference). **Do not use** `--surface-card`, `--text-main`, `--text-muted` — they look real but don't exist
3. **Single mobile breakpoint:** `768px`
4. **Branch model:** push to `main` for work, push to `public` to trigger the GitHub Pages deploy
5. **No Tailwind, no React/Vue, no CSS-in-JS** — plain Astro + plain CSS + CSS custom properties
6. **Per-edition theming:** inside an archive page, prefer `--theme-primary` / `--theme-accent` over the raw `--eu-*` or `--edition-*` tokens

## Where to read before changing things

| Task | Doc |
| --- | --- |
| Codebase overview, tech stack, folder layout | [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) |
| CSS tokens, colors, spacing, components | [`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md) |
| Anything in `src/data/2026/` or `src/pages/2026/` | [`docs/ARCHIVE-SYSTEM.md`](./docs/ARCHIVE-SYSTEM.md) |
| Adding 2027 (or any new year) | [`docs/ADDING-A-NEW-YEAR.md`](./docs/ADDING-A-NEW-YEAR.md) |
| Local dev, branch workflow, deploy | [`docs/CONTRIBUTING.md`](./docs/CONTRIBUTING.md) |

## Common tasks

### Adding a speaker
Edit `src/data/2026/speakers.ts`. Each speaker needs a unique `order` number (stable ID used by `schedule.ts` to join speakers to sessions). Never reuse or renumber existing `order` values.

### Adding a YouTube recording for an existing talk
Set `youtubeUrl: 'https://www.youtube.com/watch?v=…'` on the matching entry in `src/data/2026/schedule.ts`. The program page and `/2026/videos` page both pick this up automatically.

### Editing styles
- **Shared/reusable** → `src/styles/global.css`
- **Page-specific** → scoped `<style>` block at the bottom of the `.astro` file
- Astro scopes `<style>` blocks automatically, so class names won't collide with `global.css`. But `var(--token)` references DO cascade — only use tokens that actually exist.

### Adding a new conference year
Follow [`docs/ADDING-A-NEW-YEAR.md`](./docs/ADDING-A-NEW-YEAR.md). You should not need to modify anything inside `src/data/2026/` or `src/pages/2026/`.

## Style & conventions

- **TypeScript everywhere** — data files are typed; build fails on schema violations
- **Astro components** (`.astro`), not React/Vue/Svelte
- **Inline SVG icons** — no icon library
- **External links** carry `target="_blank" rel="noopener noreferrer"`
- **Semantic HTML** — real `<button>`, `<a>`, `<nav>`, `<main>`; never `<div onclick>`
- **Accessibility** — `:focus-visible` outlines on custom interactive elements, focus management in modals/lightboxes, respect `prefers-reduced-motion`
- **Commit prefixes** — `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`

## Verifying before committing

```bash
npm run build    # must pass; TypeScript errors fail the build
npm run dev      # local server at http://localhost:4321
```

Pre-commit checklist:
- [ ] `npm run build` succeeds with no TypeScript errors
- [ ] Mobile breakpoint (≤ 768px) still looks right
- [ ] Modals/lightboxes open and close cleanly
- [ ] No console errors in dev tools
- [ ] External links have `rel="noopener noreferrer"`
- [ ] Images have `alt` (or `aria-hidden` if decorative)

## What this site is NOT

- **Not a CMS-driven site** — content lives in TypeScript files, not a database
- **Not server-rendered** — static-only; the Astro server adapter is intentionally disabled
- **Not a React app** — if interactivity is needed, write a small vanilla JS `<script>` block in the `.astro` file
- **Not styled with Tailwind** — resist the urge to add it

## Defaults for working in this repo

- When uncertain about a token, class, or pattern, **read the relevant `/docs/` page** before guessing.
- If a doc seems out of date relative to the code, **the code is the source of truth** — but update the doc in the same change.
- Prefer **minimal, focused edits** over large refactors. Old pages can stay on old patterns.
- Run `npm run build` after any non-trivial change to catch type errors early.

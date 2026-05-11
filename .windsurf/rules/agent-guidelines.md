---
description: Mac Admins Europe — agent guardrails and pointers to project docs
trigger: always_on
---

# Mac Admins Europe — Windsurf Rules

This is an **Astro 5** static site for the Mac Admins Europe conference, deployed to GitHub Pages at <https://macadmins-eu.org>.

**Always read `@AGENTS.md` first** — it's the canonical agent guide. The deeper docs live in `@docs/`.

## Critical rules

1. **Always work on a feature branch** — never commit directly to `main` or `public`. See "Branch workflow" below.
2. **Never modify `src/data/2026/` or `src/pages/2026/`** — frozen archive
3. **Only use CSS tokens that exist in `src/styles/global.css`** — see `@docs/DESIGN-SYSTEM.md` for the canonical list. **Do not use** `--surface-card`, `--text-main`, `--text-muted` (they don't exist)
4. **Single mobile breakpoint:** `768px`
5. **No Tailwind, no React/Vue, no CSS-in-JS** — plain Astro + plain CSS

## Branch workflow (required)

All changes follow this flow. Do not skip steps.

```
feature branch  →  PR into main  →  (merge)  →  PR into public  →  (merge → deploys)
```

### Step-by-step

1. **Start from an up-to-date `main`:**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create a feature branch.** Use a descriptive prefix:
   - `feat/...` — new feature or content
   - `fix/...` — bug fix
   - `chore/...` — tooling, deps, config
   - `docs/...` — documentation only
   - `style/...` — CSS or visual tweaks only
   - `refactor/...` — internal restructure

   ```bash
   git checkout -b feat/add-2027-speakers
   ```

3. **Commit your changes** to the feature branch with conventional-commit subject lines:
   ```bash
   git commit -m "feat: add three keynote speakers for 2027"
   ```

4. **Verify the build locally before opening a PR:**
   ```bash
   npm run build
   ```

5. **Push the feature branch and open a PR into `main`:**
   ```bash
   git push origin feat/add-2027-speakers
   ```
   Then open the PR in GitHub UI. Request review from code owners listed in `.github/CODEOWNERS`.

6. **After the PR is approved and merged into `main`**, the change lives on `main` but is NOT yet deployed.

7. **To deploy, open a second PR from `main` → `public`:**
   - Title it something like `deploy: <date or change summary>`
   - This PR can batch multiple already-merged changes from `main`
   - Once approved and merged into `public`, the GitHub Actions workflow deploys to <https://macadmins-eu.org>

### Why two PRs?

- **`main` PR** = "this change is correct and reviewed"
- **`public` PR** = "this change should go live right now"

This separation lets multiple already-reviewed changes batch into a single coordinated deploy, and gives a final pre-deploy review window.

### When working as an AI assistant

- **Always offer to create a feature branch** when starting work, unless the user is already on one.
- **Never push directly to `main` or `public`**, even if asked, unless the user explicitly overrides this rule with awareness of the consequences.
- **At the end of a task, suggest the branch name and PR title.** Do not open the PR yourself unless the user asks.

## Where to read before changing

| Task | Doc |
| --- | --- |
| Codebase overview | `@docs/ARCHITECTURE.md` |
| CSS / colors / spacing | `@docs/DESIGN-SYSTEM.md` |
| Anything in `2026/` | `@docs/ARCHIVE-SYSTEM.md` |
| Adding 2027 (or any new year) | `@docs/ADDING-A-NEW-YEAR.md` |
| Dev workflow / deploy | `@docs/CONTRIBUTING.md` |

## Style

- TypeScript-typed data files; build fails on schema violations
- Inline SVG icons (no icon library)
- External links: `target="_blank" rel="noopener noreferrer"`
- `:focus-visible` outlines on interactive elements
- Respect `prefers-reduced-motion`
- Commit prefixes: `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`

## Verifying before committing

```bash
npm run build    # must pass
npm run dev      # local server at http://localhost:4321
```

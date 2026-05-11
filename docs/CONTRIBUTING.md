# Contributing & Workflow

## Local development

You'll need **Node.js 20+** (matches the GitHub Actions runner) and npm.

```bash
git clone https://github.com/MacAdminsEurope/mac-admins-europe.git
cd mac-admins-europe
npm install
npm run dev
```

The site is served at `http://localhost:4321` with hot reload on file changes.

### Useful commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build to `./dist` |
| `npm run preview` | Serve the built site locally to verify before deploy |

## Editing content vs. editing code

Most updates fall into **content editing**:
- Adding a speaker → edit `src/data/<year>/speakers.ts`
- Updating the schedule → edit `src/data/<year>/schedule.ts`
- Adding a sponsor → edit `src/data/<year>/sponsors.ts`
- Updating venue info → edit `src/data/<year>/location.ts`
- Adding a YouTube recording → set `youtubeUrl` on the relevant `scheduleItem`

These are TypeScript files but they're just typed JSON in practice. If a field is missing, the build will tell you.

**Code editing** (changing layouts, components, or styles) requires more care — see the [`ARCHITECTURE.md`](./ARCHITECTURE.md) and [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md) docs first.

## Branch model

Two long-lived branches:

| Branch | Purpose |
| --- | --- |
| `main` | Day-to-day development. Merge PRs here. Commits to `main` do **not** deploy. |
| `public` | Production. A push to `public` triggers the GitHub Pages deploy via `.github/workflows/deploy.yml`. |

### Typical flow

```bash
# Work on main
git checkout main
git pull origin main
# … edit files …
git add .
git commit -m "feat: short description"
git push origin main

# When ready to deploy
git push origin main:public
```

This pattern means:
- Multiple commits can land on `main` before any of them go live
- `public` always reflects what's currently on the production site
- Rolling back is a matter of pushing an earlier commit to `public`

### Why not deploy from `main`?

The `public` branch acts as a soft gate. It separates "the team has agreed this is correct" from "this is live for the world to see". Useful when the team is testing several changes together before a coordinated deploy (for example, right before announcing a new sponsor or speaker batch).

## Commit message style

Conventional-commit prefixes are encouraged but not enforced:

- `feat:` — new functionality (page, feature, content addition that changes behavior)
- `fix:` — bug fix
- `chore:` — tooling, dependency bumps, config
- `docs:` — documentation only
- `style:` — visual/CSS tweaks with no functional change
- `refactor:` — restructure without changing behavior

Keep the subject line short and imperative ("add gallery page", not "added gallery page" or "this PR adds the gallery page").

## Pre-commit checklist

Before pushing to `public`:

- [ ] `npm run build` succeeds with no TypeScript errors
- [ ] You've clicked through changed pages locally
- [ ] Mobile breakpoint (resize browser ≤ 768px) still looks right
- [ ] Modals/lightboxes open and close cleanly
- [ ] No console errors in dev tools
- [ ] External links open in a new tab with `rel="noopener noreferrer"`
- [ ] Images have `alt` attributes (or `aria-hidden` if decorative)

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) runs on every push to `public`:

1. Checks out the repo
2. Installs Node 20 + dependencies (`npm ci`)
3. Runs `npm run build` to generate `./dist`
4. Uploads `./dist` as a Pages artifact
5. Deploys to GitHub Pages

The custom domain `macadmins-eu.org` is set via the `CNAME` file in the repo root. Don't delete it.

**Typical deploy time:** ~2 minutes from `git push origin main:public` to the live site updating.

You can watch progress at the [Actions tab](https://github.com/MacAdminsEurope/mac-admins-europe/actions).

## Adding dependencies

Avoid adding npm packages unless there's a clear win. The site deliberately runs on a minimal dependency set (Astro, TypeScript, and a couple of small helpers). Every dep is a long-term commitment for the maintainer.

If you do need to add something:

```bash
npm install --save <pkg>
git add package.json package-lock.json
git commit -m "chore: add <pkg> for <reason>"
```

## Accessibility

We care about this — the site is for a community that includes people relying on assistive tech.

- Real semantic HTML (`<button>`, `<a>`, headings in order, `<nav>`, `<main>`, `<footer>`)
- Color contrast: WCAG AA minimum. The current EU blue + gold palette is checked; verify any new palette.
- Focus management: when opening modals or lightboxes, move focus into them; restore focus on close.
- `:focus-visible` outlines on every interactive element.
- Respect `prefers-reduced-motion`.

See the gallery and program pages for working examples.

## When something breaks in production

1. **Check the Actions log** — most deploy failures are TypeScript errors in a data file (missing field, wrong type).
2. **Roll back fast:**
   ```bash
   git checkout public
   git reset --hard <previous-good-commit>
   git push --force origin public
   ```
   GitHub Pages will redeploy the older commit in ~2 minutes.
3. Fix forward on `main`, push to `public` once verified.

## Questions

Open an issue, or reach out via the contact form at `/contact`.

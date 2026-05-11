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

Two long-lived branches plus short-lived feature branches:

| Branch | Purpose |
| --- | --- |
| `main` | Reviewed, integrated work. The trunk. Not deployed. |
| `public` | Production. Merging into `public` triggers the GitHub Pages deploy via `.github/workflows/deploy.yml`. |
| `feat/...`, `fix/...`, `chore/...`, etc. | Short-lived feature branches. All work happens here first. |

### The required flow

Every change goes through this exact path. No direct commits to `main` or `public`.

```
feature branch  →  PR into main  →  (merge)  →  PR into public  →  (merge → deploys)
```

### Step-by-step

```bash
# 1. Start from an up-to-date main
git checkout main
git pull origin main

# 2. Create a feature branch with a conventional prefix
git checkout -b feat/add-2027-keynote

# 3. Make your changes, then verify the build
npm run build

# 4. Commit with a conventional-commit subject line
git add .
git commit -m "feat: add 2027 keynote speaker"

# 5. Push and open a PR into main
git push origin feat/add-2027-keynote
```

Then in the GitHub UI:

6. Open a **pull request from your feature branch into `main`**
7. Code owners (listed in `.github/CODEOWNERS`) are auto-requested for review
8. After at least one approval, merge the PR (squash merge keeps history tidy)
9. **Open a second PR from `main` into `public`** when you're ready to deploy
   - Title format: `deploy: <brief summary or date>`
   - This can batch multiple already-reviewed `main` changes into one coordinated deploy
10. Merging that PR triggers the GitHub Actions workflow and deploys to <https://macadmins-eu.org>

### Branch name conventions

| Prefix | Use for |
| --- | --- |
| `feat/` | New feature, content addition, or capability |
| `fix/` | Bug fix |
| `chore/` | Tooling, dependency bumps, config changes |
| `docs/` | Documentation only |
| `style/` | CSS or visual tweaks with no functional change |
| `refactor/` | Internal restructure without behavior change |

After the branch prefix, use a short kebab-case description: `feat/add-2027-speakers`, `fix/gallery-mobile-padding`, `docs/contributing-update`.

### Why two PRs?

Splitting "code reviewed" from "deployed to production" is intentional:

- **The PR into `main`** answers "is this change correct, reviewed, tested?"
- **The PR from `main` → `public`** answers "should this go live to the world right now?"

Real benefits:

- Multiple already-reviewed changes can batch into one coordinated deploy (useful around announcements)
- A final pre-deploy review window catches anything that slipped through
- `main` always reflects "what we've agreed on", `public` always reflects "what visitors see right now"
- Reverting is trivial — revert the deploy PR
- Audit trail: every deploy is a discrete, dated, reviewable PR on GitHub

### When working with an AI coding assistant

The agent instructions (in `AGENTS.md`, `CLAUDE.md`, `.cursor/`, `.windsurf/`) tell assistants to:

- **Offer to create a feature branch** at the start of any non-trivial task
- **Never push directly to `main` or `public`**
- **Suggest the branch name and PR title** at the end of a task rather than opening the PR themselves

You can always override this if you have a specific reason — the rule exists to prevent accidents, not to slow you down on genuine emergencies.

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

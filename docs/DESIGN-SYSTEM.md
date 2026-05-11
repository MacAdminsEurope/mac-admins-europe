# Design System

All design tokens live in `src/styles/global.css` under `:root`. Per-year colors are layered on top via `EditionArchiveLayout.astro`.

## Brand identity

Mac Admins Europe is a **European-flavoured** brand. The 2026 palette deliberately echoes the EU flag (deep blue + gold), softened with a community green accent.

| Token | 2026 value | Use |
| --- | --- | --- |
| `--eu-blue` | `#003399` | Primary surface, page hero, nav |
| `--eu-blue-dark` | `#002266` | Scrolled nav, footer background |
| `--eu-blue-light` | `#0044cc` | Hover states |
| `--eu-gold` | `#ffcc00` | Primary CTA, section labels, accents |
| `--eu-gold-dark` | `#e6b800` | Gold hover |
| `--eu-gold-light` | `#ffd633` | Gold tints |
| `--eu-green` | `#00a651` | Community/positive accents |
| `--eu-green-dark` | `#008540` | Green hover |
| `--eu-green-light` | `#00b860` | Green tints |

> **Per-edition theming:** these `--eu-*` tokens are *re-assigned by* `EditionArchiveLayout` based on the edition's `visualIdentity.colors`. The same CSS rules then look different on a 2027 page than on a 2026 page automatically. See [`ARCHIVE-SYSTEM.md`](./ARCHIVE-SYSTEM.md).

The generic aliases `--edition-primary`, `--edition-primary-dark`, `--edition-accent`, etc. exist for places where you want "the year's color" without picking blue or gold specifically.

## Neutrals

A standard 9-step gray scale: `--gray-100` (lightest) through `--gray-900` (near-black), plus `--white` and `--black`. Use:
- `--gray-100/200` for backgrounds, borders
- `--gray-500/600` for muted text
- `--gray-700/800/900` for body and headings

## Typography

| Token | Value |
| --- | --- |
| `--font-display` | `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif` |
| `--font-mono` | `'Space Mono', 'SF Mono', monospace` |

Headings use `--font-display` with `font-weight: 700` and `line-height: 1.2`. `h1` uses `clamp(2.5rem, 5vw, 4rem)` so it scales fluidly.

Body copy: `1.125rem` / `line-height: 1.75` for comfortable reading.

Use `--font-mono` for time slots in the program (`.block-time`) and the lightbox counter — anywhere the digits should be tabular.

## Spacing scale

Eight-step exponential scale:

| Token | Value |
| --- | --- |
| `--space-xs` | `0.25rem` |
| `--space-sm` | `0.5rem` |
| `--space-md` | `1rem` |
| `--space-lg` | `1.5rem` |
| `--space-xl` | `2rem` |
| `--space-2xl` | `3rem` |
| `--space-3xl` | `4rem` |
| `--space-4xl` | `6rem` |

**Rule of thumb:** never hardcode `padding: 12px` — pick the nearest token. If the design genuinely needs an off-scale value, that's a sign the token scale should be revisited.

## Border radius, shadows, transitions

| Category | Tokens |
| --- | --- |
| Radius | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full` |
| Shadow | `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`, `--shadow-gold` |
| Transition | `--transition-fast`, `--transition-base`, `--transition-slow` |

## Container

```css
--container-max: 1200px;
--container-padding: var(--space-lg);  /* 1rem on mobile */
```

`.container` is the canonical content wrapper: max 1200px wide, centered, with token-based horizontal padding that shrinks on mobile.

The gallery uses a custom `.container-full` because photos look better edge-to-edge.

## Component patterns

### Buttons
`.btn` is the base. Apply a variant:
- `.btn-primary` — gold background, blue text. Used on hero CTAs and any "go to" action.
- `.btn-secondary` — transparent + white border. Used inside dark hero sections where outline buttons would clash with the blue background.
- `.btn-outline` — blue border on light surfaces.

> **The "back to overview" buttons on 2026 sub-pages use `.btn-primary` (yellow) intentionally** — the hero background is blue, and an outline button gets lost against it.

### Page hero
The `.page-hero` class produces the dark-blue full-bleed section at the top of every sub-page. Convention inside:

```astro
<section class="page-hero">
  <div class="container">
    <span class="section-label">2026 Archive</span>
    <h1>Page Title</h1>
    <p>Optional subtitle</p>
    <div style="margin-top: 1.5rem;">
      <a href={`${base}/2026`} class="btn btn-primary">&larr; Back to 2026 Overview</a>
    </div>
  </div>
</section>
```

### Section labels
`.section-label` renders an uppercased gold mini-heading above an `h1` or `h2`. It's the visual cue that says "you are in an archive year" or "this is a tagged section".

### Schedule blocks
Each `.schedule-block` is a 2-column grid (time | content) with a left border colored by its type:
- `session` → EU blue
- `sponsor` → EU gold
- `keynote` → EU gold + cream background
- `break` / `lunch` → green-tinged
- `registration` → green-blue

The `.youtube-icon-link` (added when a session has a recording) sits inline with the talk title via `.block-title-row`.

### Speaker cards
`.speaker-card` is a vertical card with a square headshot, name, role/company tags, social links, optional bio, and an "About My Talk" button. On the program page, a simplified speaker placeholder is used inside the schedule block.

### Modals
Two patterns:
- **Talk-description modals** on the program and speakers pages — opened by clicking a block/button with `data-talk-modal-trigger`. CSS controlled via `.is-open` class.
- **Lightbox** on the gallery — full-screen overlay with keyboard nav, focus management, touch swipe, and image preloading. Built from scratch in `gallery.astro` because the requirements were specific.

## Accessibility patterns

- All interactive elements are real `<button>` or `<a>` elements (no `<div onclick>`).
- External links use `target="_blank" rel="noopener noreferrer"`.
- Decorative SVGs get `aria-hidden="true"`; meaningful icons get an `aria-label` on the parent link/button.
- `:focus-visible` outlines are explicit on custom interactive elements (gallery items, lightbox buttons).
- Modal/lightbox open: focus moves into the dialog; on close, focus returns to the trigger.
- `prefers-reduced-motion: reduce` disables hover transforms and transitions on the gallery.
- Body scroll is locked while a modal/lightbox is open.

## Responsive breakpoints

The site uses one primary breakpoint:

```css
@media (max-width: 768px) { ... }
```

Below this:
- Container padding shrinks (`--space-md` instead of `--space-lg`)
- Section padding shrinks (`--space-3xl` instead of `--space-4xl`)
- Nav collapses into the hamburger drawer
- Multi-column grids collapse to single-column or 2-up
- Schedule blocks stack the time above the content

Some pages (e.g. gallery) have a secondary mobile breakpoint they own internally. Keep `768px` as the default unless there's a real reason to deviate.

## Scoped page styles vs. `global.css` — the contract

Some pages (notably `2026/gallery.astro` and `2026/videos.astro`) keep their CSS inside an Astro `<style>` block at the bottom of the page rather than in `global.css`. Astro automatically scopes those rules, so:

- **Class names declared inside a scoped `<style>` block are isolated.** They cannot collide with anything in `global.css` now or in the future. Renaming a class in `global.css` will *not* affect a scoped page's own selectors.

But two things still couple a scoped page to `global.css`:

### CSS custom properties cascade through

Every `var(--space-md)`, `var(--gray-600)`, `var(--eu-blue)` etc. inside a scoped block reads the value defined at `:root` in `global.css`. If a token is **renamed or deleted**, the scoped style silently loses that value (CSS falls back to the property's initial value, e.g. `transparent` for a background).

**Rules:**
- Only reference tokens that actually exist in `global.css`. Run `grep "^\s*--" src/styles/global.css` to see the canonical list.
- For critical values, use a fallback: `border-radius: var(--radius-md, 8px);`
- If you rename a token in `global.css`, **also update every page that references it**. Search the codebase before renaming.

### Global classes used in the page markup

Every archive page uses global classes for the chrome: `.page-hero`, `.container`, `.section-label`, `.btn`, `.btn-primary`. These live in `global.css` and are *not* scoped. If renamed there, the hero and CTA buttons on every page break.

**Rule:** treat these as a public API. If you rename one, it's a coordinated change across many files.

### Why keep page-specific CSS scoped instead of in `global.css`?

- The gallery's lightbox styles only apply to one page. Putting them in `global.css` bloats it for every other page.
- Scoped styles document themselves by being next to the markup they style.
- Hot reload during dev is faster (smaller stylesheet recompile).

If a pattern starts appearing on multiple pages, **move it into `global.css` as a reusable component class** — that's the signal it has graduated from "page-specific" to "design-system".

## Complete token reference

These are the **only** CSS custom properties safe to use across the site. Generated from `global.css`:

**Brand & edition colors** (per-edition: re-bound by `EditionArchiveLayout`)
`--eu-blue`, `--eu-blue-dark`, `--eu-blue-light`
`--eu-gold`, `--eu-gold-dark`, `--eu-gold-light`
`--eu-green`, `--eu-green-dark`, `--eu-green-light`

**Edition tokens** (only valid *inside* an `.edition-archive` wrapper — i.e. on any 2026 sub-page)
`--edition-primary`, `--edition-primary-dark`, `--edition-primary-light`
`--edition-accent`, `--edition-accent-dark`, `--edition-accent-light`
`--theme-primary`, `--theme-primary-dark`, `--theme-primary-light`
`--theme-accent`, `--theme-accent-dark`, `--theme-accent-light`

> Prefer `--theme-*` inside archive pages — it's the consumer-facing alias. `--edition-*` is the input, `--theme-*` is the output. The site uses `--theme-*` in `global.css` for things like the page-hero gradient and section labels.

**Neutrals**
`--white`, `--off-white`, `--black`
`--gray-100` … `--gray-900`

**Status**
`--error-red`, `--error-red-light`
`--success-green-bg`, `--success-green-text`
`--social-pink-bg`, `--social-pink-text`

**Typography**
`--font-display`, `--font-mono`

**Spacing**
`--space-xs` (0.25rem), `--space-sm` (0.5rem), `--space-md` (1rem), `--space-lg` (1.5rem), `--space-xl` (2rem), `--space-2xl` (3rem), `--space-3xl` (4rem), `--space-4xl` (6rem)

**Radius**
`--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-2xl`, `--radius-full`

**Shadows**
`--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`, `--shadow-gold`

**Transitions**
`--transition-fast`, `--transition-base`, `--transition-slow`

**Container**
`--container-max`, `--container-padding`

**Component-scoped (inside their own rules; don't use elsewhere)**
`--footer-grid-columns`, `--footer-grid-gap` — `.footer`
`--lightbox-nav-size`, `--lightbox-nav-font-size`, `--lightbox-nav-offset` — `.lightbox-prev/.lightbox-next`

### Tokens that DO NOT exist (don't use these)

These names have appeared in old code but are not defined anywhere. Using them silently fails:

- ❌ `--surface-card` → use `var(--white)` or `var(--off-white)`
- ❌ `--text-main` → use `var(--gray-900)` for body, `var(--gray-700)` for secondary
- ❌ `--text-muted` → use `var(--gray-600)`. There's a `.text-muted` *class* in `global.css`, but no matching variable.

### Verifying tokens before committing

```bash
# List every token defined in global.css
grep -oE '^\s*--[a-z0-9-]+' src/styles/global.css | sort -u

# List every token referenced across all pages
grep -rhEo 'var\(--[a-z0-9-]+' src/pages/ src/components/ src/layouts/ | sort -u
```

Diff the two lists. Every reference must appear in the definitions.

## Shared lightbox system

There's a `.lightbox-prev` / `.lightbox-next` / `.lightbox-content` system in `global.css` (around line 2728) intended for reuse. The 2026 gallery (`gallery.astro`) does *not* use it — it implements its own scoped `.lb-prev` / `.lb-next` classes because the gallery has slightly different requirements (image counter, ZED credit footer, swipe).

If you build another image viewer somewhere on the site, **prefer the shared `.lightbox-*` classes** unless you have a clear reason to fork. Forking is fine — but document it inside the page so future maintainers know it's intentional.

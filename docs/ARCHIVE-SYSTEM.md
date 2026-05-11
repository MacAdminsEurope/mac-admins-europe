# The Archive System

Mac Admins Europe is a conference that happens once a year. After the event, that year's content becomes a **frozen archive**. The site is designed so that each year is fully self-contained and additive — old years never need to change when a new one is added.

## The model

A **conference year** is described by three layers:

```
┌──────────────────────────────────────────────────────────┐
│ 1. Visual identity (edition.ts)                          │
│    Colors + label that define how this year looks        │
├──────────────────────────────────────────────────────────┤
│ 2. Metadata (archive.ts)                                 │
│    Date, location, summary, links to that year's pages   │
├──────────────────────────────────────────────────────────┤
│ 3. Content (speakers.ts, schedule.ts, sponsors.ts, ...)  │
│    The actual people, talks, sessions, and partners      │
└──────────────────────────────────────────────────────────┘
```

These are kept in `src/data/<year>/` as TypeScript files. Pages under `src/pages/<year>/` import from `../../data/<year>/` and render the content.

## The shared registry

Every conference year is registered exactly once in `src/data/archive.ts`:

```ts
import { archive2026 } from "./2026/archive";
// import { archive2027 } from "./2027/archive";   // when 2027 arrives

export const archiveYears: ConferenceArchiveYear[] = [
  archive2026,
  // archive2027,
];
```

Pages that need to list "all years" (the previous-years page, footer links, etc.) iterate over `archiveYears`. Pages that are specific to one year import directly from that year's data files.

## The shared layout

`src/layouts/EditionArchiveLayout.astro` is the wrapper used by every per-year page. It takes one prop:

```ts
interface Props {
  title: string;
  description?: string;
  edition: ConferenceEditionIdentity;
}
```

…and emits an inline `style` attribute that **reassigns the color custom properties** for that year. The relevant block:

```astro
const editionVariables = [
  ["--eu-blue", colors.euBlue],
  ["--eu-blue-dark", colors.euBlueDark],
  ["--eu-gold", colors.euGold],
  // … etc
  ["--edition-primary", colors.euBlue],
  ["--edition-accent", colors.euGold],
].map(([n, v]) => `${n}: ${v}`).join("; ");
```

Then:

```astro
<div class="edition-archive {edition.className}" style={editionVariables}>
  <slot />
</div>
```

**Net effect:** the same `.btn-primary` rule in `global.css` (which uses `var(--eu-gold)`) will render gold on a 2026 page and could render a totally different color on a 2027 page — without changing a single CSS rule.

## Why this design

### Old years should never change

After a conference ends, the data for that year is fixed. Sponsors paid for their tier, speakers had a specific role, the schedule was what it was. If we shared data structures across years, a change to one year's data model could accidentally break an older year. Per-year folders mean **the past is immutable by default**.

### Visual evolution is encouraged

Each year may want a fresh look — different palette, perhaps a different vibe. By driving everything through `edition.ts` and CSS variables, you change colors in one place and the entire year's section retraces those colors. No find-and-replace.

### Each year is forkable

If 2027 wants a different program-page layout, you copy `2026/program.astro` to `2027/program.astro` and start editing. The 2026 page stays untouched. This is intentional: archive pages should be allowed to drift.

### Type-safe additions

All year-specific data files conform to interfaces (`Speaker`, `ScheduleItem`, `Sponsor`, `ConferenceArchiveYear`). The build fails loudly if a field is missing or mistyped. There's no runtime "oh, this year's speakers don't have bios" surprise.

## File-by-file walkthrough (using 2026)

### `src/data/2026/edition.ts`
The **visual identity**. Year, label, className, and the full color palette.

```ts
export const edition2026 = {
  year: 2026,
  label: "Mac Admins Europe 2026",
  className: "edition-2026",
  visualIdentity: {
    name: "EU Blue and Gold",
    colors: { euBlue: "#003399", euGold: "#ffcc00", /* … */ },
  },
} as const;
```

### `src/data/2026/archive.ts`
The **metadata + link grid**. This is what `src/data/archive.ts` registers.

```ts
export const archive2026 = {
  year: 2026,
  date: "April 30, 2026",
  location: location.city,
  venue: location.venue,
  edition: edition2026,
  summary: "…",
  links: [
    { label: "Program",  href: "/2026/program",  description: "…" },
    { label: "Speakers", href: "/2026/speakers", description: "…" },
    { label: "Sponsors", href: "/2026/sponsors", description: "…" },
    { label: "Location", href: "/2026/location", description: "…" },
    { label: "Videos",   href: "/2026/videos",   description: "…" },
    { label: "Photos",   href: "/2026/gallery",  description: "…" },
  ],
};
```

The `links` array drives the cards on `/2026` (the year overview page). Add a new sub-page → add a `links` entry.

### `src/data/2026/speakers.ts`
Array of `Speaker` objects. Each has `order` (used for stable ID + custom sort), name, role, company, image, bio, talk title, talk description, LinkedIn, Slack, optional `type` (`speaker` vs `sponsor`).

The `placeholderTalkTitle` and `placeholderTalkDescription` constants let speaker.astro detect "no talk info yet" and render a TBA card.

### `src/data/2026/schedule.ts`
Array of `ScheduleItem` objects: time slot, type (`session`, `sponsor`, `keynote`, `break`, `lunch`, `registration`), title, optional description and emoji, optional `speakerIds[]` (linking to speakers by their `order`), optional `youtubeUrl`.

Talks with `speakerIds` pull the talk title from the speaker record, falling back to the schedule's `title` if not set. This keeps the schedule canonical for time/type and the speakers file canonical for talk content.

### `src/data/2026/sponsors.ts`
Sponsor objects grouped by tier. The sponsors page renders them tier-by-tier.

### `src/data/2026/location.ts`
Venue display name, address, city, Maps URL, and travel info.

### Pages under `src/pages/2026/`
| File | Renders |
| --- | --- |
| `index.astro` | The `archive.links` grid as cards |
| `program.astro` | The schedule with inline YouTube icons + click-to-open talk modals |
| `speakers.astro` | Cards for each speaker with "About My Talk" modal |
| `sponsors.astro` | Sponsors grouped by tier |
| `location.astro` | Venue details, address, transit info |
| `videos.astro` | All schedule items with a `youtubeUrl`, rendered as YouTube-thumbnail cards |
| `gallery.astro` | Photo grid with lightbox; photos served from `public/photo_gallery/` |

Every one of these pages opens with:

```astro
<EditionArchiveLayout
  title="2026 … | Mac Admins Europe Archive"
  description="…"
  edition={edition2026}
>
  <section class="page-hero">
    <div class="container">
      <span class="section-label">2026 Archive</span>
      <h1>Page Title</h1>
      …
      <div style="margin-top: 1.5rem;">
        <a href={`${base}/2026`} class="btn btn-primary">&larr; Back to 2026 Overview</a>
      </div>
    </div>
  </section>
  …
```

That hero + back-button pattern is the convention for every archive sub-page.

## Frozen-snapshot principles

A few rules of thumb to keep the archive system healthy:

1. **Don't refactor old data files** to fit a new schema. If 2027 needs a new speaker field, make it optional or branch the interface.
2. **Don't share data structures across years** without thinking. Shared interfaces (`Speaker`, `ScheduleItem`) are fine for shape; sharing the actual *speaker array* between years would be a mistake.
3. **Old pages can have old patterns.** If you redesign the program page for 2027, the 2026 program page can stay as-is.
4. **Visual evolution is fine, brand discipline matters.** Each year picks its own palette via `edition.ts`, but stay within the design system — same spacing scale, same typography, same component shapes. The site should feel like one site across years, just with a different accent.
5. **Add, don't migrate.** Adding a new year should never require touching `src/data/2026/`.

Ready to add a new year? Continue to [`ADDING-A-NEW-YEAR.md`](./ADDING-A-NEW-YEAR.md).

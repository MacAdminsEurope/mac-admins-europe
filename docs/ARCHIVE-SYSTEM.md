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

## Data-file reference (for editors)

This is the authoritative shape for every file under `src/data/<year>/`. If you only edit content (not code), this is the section you'll come back to.

### `edition.ts`

One exported object: `edition<YEAR>`. Required fields:

| Field | Type | Notes |
| --- | --- | --- |
| `year` | `number` | e.g. `2026` |
| `label` | `string` | Human-readable, used in `<title>` and OG meta |
| `className` | `string` | Unique CSS class (`edition-2026`) attached to the wrapper |
| `visualIdentity.name` | `string` | Palette name, shown only as a `data-` attribute |
| `visualIdentity.colors.*` | 9 hex strings | `euBlue/euBlueDark/euBlueLight`, `euGold/…`, `euGreen/…` |

End with `as const;` so TypeScript narrows the literal types.

### `archive.ts`

One exported object: `archive<YEAR>`. Required fields:

| Field | Type | Notes |
| --- | --- | --- |
| `year` | `number` | Must match `edition.year` |
| `date` | `string` | Display string, e.g. `"April 30, 2026"` |
| `location` | `string` | Pulled from `location.city` |
| `venue` | `string` | Pulled from `location.venue` |
| `edition` | `editionXXXX` | Imported from `./edition` |
| `summary` | `string` | 1–2 sentence event description |
| `links[]` | `{ label, href, description }[]` | Cards on the `/YEAR` overview page |

**Convention:** only add a `links` entry once the target page has real content. Adding `Videos` before recordings exist will publish a broken card.

### `location.ts`

| Field | Notes |
| --- | --- |
| `city` | Used in archive cards and meta |
| `venue` | Plain ASCII version |
| `venueDisplayName` | May include en-dashes / typography |
| `address` | Full street address |
| `mapsUrl` | A `google.com/maps/search/?api=1&query=…` URL |
| `summary` | 1-sentence description |

### `speakers.ts`

Defines `Speaker` (or `Person`) interface locally and exports a `speakers: Speaker[]` array.

| Field | Type | Notes |
| --- | --- | --- |
| `order` | `number` | **Stable ID, not display order.** Schedule items link to speakers via `speakerIds`. Once set, don't change. New speakers get a fresh unused number. |
| `name` | `string` | Display name |
| `role` | `string` | Job title |
| `company` | `string` | |
| `image` | `string` | Path to headshot in `public/img/speakers/` |
| `bio` | `string` | Plain text |
| `talk` | `string` | Talk title (placeholder allowed — see below) |
| `talkDescription` | `string` | Talk abstract |
| `linkedin` | `string?` | URL |
| `slack` | `string?` | Mac Admins Slack profile URL |
| `type` | `'speaker' \| 'sponsor'?` | Defaults to `'speaker'`. Sponsor talks render slightly differently. |

**Placeholder pattern:** if a speaker is confirmed but their talk isn't finalised, set `talk` and `talkDescription` to the values exported as `placeholderTalkTitle` / `placeholderTalkDescription`. The speakers and program pages detect this and render a "talk details TBA" state.

### `schedule.ts`

Defines `ScheduleItem` interface locally and exports `scheduleItems: ScheduleItem[]` plus the `ScheduleBlockType` union.

| Field | Type | Notes |
| --- | --- | --- |
| `time` | `string` | Display string, e.g. `"09:30 - 10:15"` |
| `type` | `ScheduleBlockType` | `'registration' \| 'keynote' \| 'session' \| 'sponsor' \| 'break' \| 'lunch'`. Drives the left-border color. |
| `title` | `string` | Falls back if no `speakerIds`. Speakers' `talk` title takes precedence when joined. |
| `description` | `string?` | Used for non-talk blocks (registration, breaks, lunch) |
| `emoji` | `string?` | Renders before the title on non-talk blocks |
| `speakerIds` | `number[]?` | Array of speaker `order` values. Multiple IDs = joint talk. |
| `youtubeUrl` | `string?` | Adding this enables the inline YouTube icon AND adds the item to the `/YEAR/videos` page automatically. |
| `resources` | `TalkResource[]?` | Optional list of post-talk resources (slides PDF, GitHub repo, website, docs). Rendered as pills at the bottom of the corresponding card on `/YEAR/videos`. Only shows on talks that already have a `youtubeUrl`. |

#### Adding talk resources

A `TalkResource` is just `{ label: string, url: string }`. The renderer is dumb on purpose: it shows the label as a pill, and the URL is the link target.

```ts
{
  time: '10:15 - 10:40',
  type: 'sponsor',
  title: 'Securing Developer Workflows ...',
  speakerIds: [9],
  youtubeUrl: 'https://www.youtube.com/watch?v=hRrSXQrtWmc',
  resources: [
    { label: 'Slides (PDF)', url: '/2026/slides/starr-securing-workflows.pdf' },
    { label: 'Workbrew docs', url: 'https://workbrew.com/docs' },
  ],
}
```

**URL conventions:**

- **External URLs** (`https://…`) — open in a new tab with `rel="noopener noreferrer"`
- **Internal URLs** (`/2026/…`) — open in the same tab. Browsers render PDFs inline.

**Self-hosted PDFs:**

- Drop the file into `public/<year>/slides/`
- Reference it as `/<year>/slides/<filename>.pdf` in the `url` field
- Naming convention: `<speaker-lastname>-<short-talk-keyword>.pdf` (e.g. `starr-securing-workflows.pdf`). Keeps the folder readable when listing.
- No size processing happens; the file is served as-is. Keep PDFs under ~20 MB for sensible mobile loading.

**Visibility rule:** the resources block only renders on the `/YEAR/videos` page, only on cards where `youtubeUrl` is set, only when `resources` has at least one entry. Adding `resources` to a non-recorded talk does nothing visible — it'll just sit in the data file. (We may add a separate `/YEAR/talks` view later if there's demand.)

### `sponsors.ts`

Defines `Sponsor` interface locally and exports `sponsors: Sponsor[]` plus the `SponsorTier` type alias.

| Field | Notes |
| --- | --- |
| `name` | Display name |
| `tier` | `'platinum' \| 'gold' \| 'silver' \| 'patron'` — drives grouping and tier badge |
| `logo` | Path in `public/img/sponsors/` |
| `url` | Either an external URL OR an internal `/YEAR/sponsors/<slug>` route. **Both patterns are valid.** Internal routes go to a dedicated sponsor sub-page; external URLs open the sponsor's own site. |
| `tagline` | Long blurb shown on the sponsor sub-page |

### Type discipline

Each data file currently declares its own local `interface`. This works but means a schema change has to be repeated per year. If schema reuse becomes painful, the next step is a shared `src/types/conference.ts` — but we deliberately haven't done that yet, to preserve per-year freedom.

If you do extract shared types, treat them as **additive only**: never remove or rename a field that older years rely on.

---

Ready to add a new year? Continue to [`ADDING-A-NEW-YEAR.md`](./ADDING-A-NEW-YEAR.md).

# Adding a New Conference Year

This is the step-by-step recipe for onboarding a new year (we'll use **2027** as the example — substitute as needed). Read [`ARCHIVE-SYSTEM.md`](./ARCHIVE-SYSTEM.md) first if you haven't.

> **Mental model:** you're cloning the 2026 archive folder, swapping the data, optionally tweaking the palette, then registering the new year in one central file. **You should not need to edit anything inside `src/data/2026/` or `src/pages/2026/`.**

## 1. Clone the data folder

```bash
cp -R src/data/2026 src/data/2027
```

You now have:

```
src/data/2027/
├── archive.ts
├── edition.ts
├── location.ts
├── schedule.ts
├── speakers.ts
└── sponsors.ts
```

## 2. Update the edition identity

Edit `src/data/2027/edition.ts`:

```ts
export const edition2027 = {
  year: 2027,
  label: "Mac Admins Europe 2027",
  className: "edition-2027",          // unique CSS class for any year-specific styling
  visualIdentity: {
    name: "Pick a name — e.g. 'Amsterdam Canal'",
    colors: {
      euBlue:       "#…",  // primary
      euBlueDark:   "#…",
      euBlueLight:  "#…",
      euGold:       "#…",  // accent
      euGoldDark:   "#…",
      euGoldLight:  "#…",
      euGreen:      "#…",  // positive/community
      euGreenDark:  "#…",
      euGreenLight: "#…",
    },
  },
} as const;
```

> **Tip:** the tokens are named `euBlue/euGold/euGreen` for historical reasons (EU flag). They don't need to literally be blue and gold — they're "primary, accent, positive" slots. The 2027 palette could be teal + coral + sand and the same naming still works.

Pick contrast-safe colors:
- Primary (`euBlue`) needs **white text** to read on top (used in the page hero).
- Accent (`euGold`) needs **dark text** to read on top (used on the primary CTA button).

Run the colors through a contrast checker before committing.

## 3. Update the year metadata

Edit `src/data/2027/archive.ts`:

```ts
import { location } from "./location";
import { edition2027 } from "./edition";

export const archive2027 = {
  year: 2027,
  date: "Month DD, 2027",
  location: location.city,
  venue: location.venue,
  edition: edition2027,
  summary: "Short description of the year.",
  links: [
    { label: "Program",  href: "/2027/program",  description: "…" },
    { label: "Speakers", href: "/2027/speakers", description: "…" },
    { label: "Sponsors", href: "/2027/sponsors", description: "…" },
    { label: "Location", href: "/2027/location", description: "…" },
    // Add Videos and Photos links AFTER the event,
    // once you have recordings and photos uploaded.
  ],
};
```

## 4. Replace the year's content

Now edit the rest of the data files for the new year. Reset, don't refactor:

- **`location.ts`** — new venue, address, transit info
- **`speakers.ts`** — empty the array (or seed with `placeholderTalkTitle` entries to show "TBA"). Add speakers as they're confirmed.
- **`schedule.ts`** — wipe `scheduleItems` and rebuild as the program firms up. Leave `youtubeUrl` off for now; add after the event.
- **`sponsors.ts`** — wipe and add sponsors as they sign.

The TypeScript interfaces (`Speaker`, `ScheduleItem`, `Sponsor`) live in these files. You can leave them as-is — they're shape definitions, safe to share across years.

## 5. Clone the pages folder

```bash
cp -R src/pages/2026 src/pages/2027
```

You now have a full set of pages for 2027: `index.astro`, `program.astro`, `speakers.astro`, `sponsors.astro`, `location.astro`, `videos.astro`, `gallery.astro`, and the `sponsors/` subfolder.

## 6. Rewire the page imports

In each file under `src/pages/2027/`, find imports like:

```ts
import { speakers } from '../../data/2026/speakers';
import { scheduleItems } from '../../data/2026/schedule';
import { edition2026 } from '../../data/2026/edition';
```

…and update them to `2027`:

```ts
import { speakers } from '../../data/2027/speakers';
import { scheduleItems } from '../../data/2027/schedule';
import { edition2027 } from '../../data/2027/edition';
```

Also update any `edition={edition2026}` props to `edition={edition2027}`, the page hero label `<span class="section-label">2026 Archive</span>` to `2027`, and back-button `href={`${base}/2026`}` to `${base}/2027`.

**A quick sanity check:** search the new folder for `2026`. Every match should be obvious — they all need to become `2027`.

```bash
grep -rn "2026" src/pages/2027/ src/data/2027/
```

## 7. Register the new year in the global registry

Edit `src/data/archive.ts`:

```ts
import { archive2026 } from "./2026/archive";
import { archive2027 } from "./2027/archive";    // ← new

export const archiveYears: ConferenceArchiveYear[] = [
  archive2027,   // ← newest first
  archive2026,
];
```

The previous-years page and footer "Archive" link both iterate over `archiveYears`. Putting the newest year first means it appears at the top.

## 8. Decide what the homepage links to

The homepage hero CTA currently links to `/2026/videos`. When 2027 becomes the current/latest year, update `src/pages/index.astro` to point at `/2027/…` (or `/2027` overview if there's no content yet).

Similarly:
- Update `src/layouts/Layout.astro` nav "View Archive" link from `/2026` to `/2027` once 2027 is the headline year.
- The homepage's archive-style copy (the "thank you to everyone" paragraph) will also need rewriting when 2026 stops being the most recent event.

## 9. Build, preview, and iterate

```bash
npm run dev
```

Visit `http://localhost:4321/2027` and click through every link. Things to check:

- [ ] Hero shows the new colors (palette is applied via `EditionArchiveLayout`)
- [ ] All sub-pages load with no console errors
- [ ] Back-button on each sub-page goes to `/2027`
- [ ] Speaker/sponsor/schedule data renders correctly
- [ ] Modals open and close
- [ ] Mobile nav works
- [ ] Old years (`/2026/*`) are completely unaffected

## 10. (After the event) Add videos and photos

Once the 2027 conference happens:

- Add `youtubeUrl` strings to the relevant entries in `src/data/2027/schedule.ts`. The program page automatically shows the YouTube icon and the videos page automatically lists any session with a URL.
- Drop event photos into `public/photo_gallery/` (use a year-prefixed filename convention, e.g. `2027-MM-DD_MacAdmins_Europe_NNNN.jpg`). Update `gallery.astro` to point at the new filenames. Consider moving 2026 photos to `public/photo_gallery/2026/` and 2027 to `public/photo_gallery/2027/` if both years should coexist.
- Add the `Videos` and `Photos` link entries to `src/data/2027/archive.ts`.

## 11. Deploy

Standard flow ([`CONTRIBUTING.md`](./CONTRIBUTING.md)):

```bash
git checkout -b feat/add-2027-archive
git add .
git commit -m "feat: add 2027 archive"
git push origin feat/add-2027-archive
```

Then open a PR from `feat/add-2027-archive` into `main`. After that PR is reviewed and merged, open the second deploy PR from `main` into `public`; merging that deploy PR triggers the GitHub Pages deploy.

## Common pitfalls

- **Forgetting to update import paths inside `src/pages/2027/`.** Symptom: the new year's pages show 2026 data. Fix: re-run the `grep -rn "2026"` check.
- **Copy-pasting `edition2026` but using it on 2027 pages.** Symptom: 2027 looks visually identical to 2026. Fix: `edition={edition2027}` in `EditionArchiveLayout`.
- **Adding YouTube/Photos links before they exist.** Symptom: 404s on the year overview. Fix: only add `links` entries in `archive.ts` once the destination page has real content.
- **Editing the 2026 folder by accident.** Symptom: history says the old year changed too. Fix: `git diff src/data/2026/ src/pages/2026/` before committing should show **no changes**.
- **Photo filename collisions in `public/photo_gallery/`.** If both years' photos go in the same folder, use a year prefix.

That's it. The archive system is designed to make this a 30-minute job once you've done it once.

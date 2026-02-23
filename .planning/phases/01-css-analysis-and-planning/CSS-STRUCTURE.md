# CSS Structure Documentation

**Analyzed:** 2026-02-23  
**File:** `src/styles/global.css`  
**Total Lines:** 5,166  
**Purpose:** Map of CSS categories to line ranges for easy navigation during refactoring

---

## Overview

The global.css file is a monolithic 5,166-line stylesheet containing all styles for the Mac Admins Europe Astro website. It is organized into the following major categories:

| Category | Line Range | Description |
|----------|------------|-------------|
| CSS Variables | 1-76 | :root custom properties (colors, spacing, typography, shadows, transitions) |
| Base/Reset | 78-100 | Reset rules, box-sizing, base typography |
| Typography | 103-128 | Headings (h1-h6), paragraphs, links, images |
| Layout Components | 130-427 | Container, header, nav, footer |
| Utility Classes | 203-235 | Spacing, text, background, opacity, max-width, animations |
| Responsive | 237-499 | Media queries for mobile/tablet breakpoints |
| Homepage Sections | 578-1310 | Hero, About, Speakers Preview, CFP, Schedule, Sponsors Preview, Programme Banner, Location Preview, CTA |
| Program Page | 1310-1539 | Schedule timeline, session blocks |
| Speakers Page | 1541-1662 | Speaker cards, CFP section |
| Tickets Page | 1664-1991 | Pricing tiers, FAQ, newsletter CTA |
| Location Page | 1993-2523 | Venue info, gallery, map, travel, accommodation |
| Sponsors Page | 2525-3250 | Hero, benefits, packages, sponsor cards, tiers |
| Contact/Forms | 3251-3921 | Contact forms, newsletter forms |
| Community Page | 4387-4723 | Regional groups, events, conferences |

---

## Detailed Category Map

### 1. CSS Variables (Lines 1-76)

**Purpose:** Define all design tokens used throughout the stylesheet

**Line Range:** 1-76

**Key Patterns:**
- `:root` - All custom properties
- `--eu-blue`, `--eu-gold`, `--eu-green` - Brand colors
- `--gray-100` through `--gray-900` - Neutral palette
- `--font-display`, `--font-mono` - Typography
- `--space-xs` through `--space-4xl` - Spacing scale
- `--radius-sm` through `--radius-full` - Border radius
- `--shadow-sm` through `--shadow-xl` - Shadow system
- `--transition-fast`, `--transition-base`, `--transition-slow` - Transitions

**Count:** ~70 CSS variables defined

---

### 2. Base/Reset (Lines 78-100)

**Purpose:** Reset default browser styles and set base element styles

**Line Range:** 78-100

**Key Selectors:**
- `*, *::before, *::after` - Box-sizing reset
- `html` - Base font-size, smooth scroll
- `body` - Base font family, size, line-height, colors

---

### 3. Typography (Lines 103-128)

**Purpose:** Heading and text element styles

**Line Range:** 103-128

**Key Selectors:**
- `h1, h2, h3, h4, h5, h6` - Heading styles with clamp() for responsiveness
- `p` - Paragraph styling
- `a` - Link colors and transitions
- `img` - Responsive images

---

### 4. Layout Components (Lines 130-427)

**Purpose:** Core layout elements used across all pages

#### Container (Lines 130-137)
- `.container` - Max-width 1200px with responsive padding

#### Header (Lines ~336-400)
- `.header` - Fixed/sticky header
- `.header-inner` - Header container
- `.logo` - Site logo

#### Navigation (Lines ~336-499)
- `.nav` - Main navigation
- `.nav-menu` - Navigation links list
- `.nav-toggle` - Mobile hamburger button
- `.nav-close` - Mobile menu close button

#### Footer (Lines ~336-426)
- `.footer` - Footer container
- `.footer-grid` - Footer columns grid
- `.footer-links` - Footer link lists
- `.footer-newsletter` - Newsletter signup
- `.footer-bottom` - Copyright area

---

### 5. Buttons (Lines 139-201)

**Purpose:** Button component styles

**Line Range:** 139-201

**Key Selectors:**
- `.btn` - Base button styles
- `.btn-primary` - Primary CTA (gold)
- `.btn-secondary` - Secondary (outline white)
- `.btn-outline` - Outline blue
- `.btn-white` - White background

---

### 6. Utility Classes (Lines 203-235)

**Purpose:** Reusable utility classes for common patterns

**Line Range:** 203-235

**Categories:**

#### Text Utilities (Lines 207-212)
- `.text-center`, `.text-left`, `.text-right`
- `.text-sm`, `.text-lg`

#### Background Utilities (Lines 213-216)
- `.bg-white`, `.bg-gray`, `.bg-blue`

#### Spacing Utilities (Lines 217-222)
- `.mt-1` through `.mt-4`, `.mb-1` through `.mb-4`
- `.p-1` through `.p-4`

#### Opacity Utilities (Lines 223-225)
- `.opacity-50`, `.opacity-75`

#### Max-width Utilities (Lines 226-229)
- `.max-w-md`, `.max-w-lg`, `.max-w-xl`

#### Animations (Lines 230-235)
- `@keyframes float`
- Animation utility classes

---

### 7. Responsive Breakpoints (Lines 237-499)

**Purpose:** Mobile and tablet responsive styles

**Breakpoints:**
| Breakpoint | Lines | Description |
|------------|-------|-------------|
| 768px | 237-426 | Mobile styles |
| 1024px | 428-432 | Tablet styles |

**Key Responsive Areas:**
- Navigation mobile menu (lines 434-493)
- Footer grid reflow (lines 495-498)

---

### 8. Homepage Sections (Lines 578-1310)

The homepage is composed of multiple sections:

#### Hero Section (Lines 578-718)
- `.hero` - Full-viewport hero with video
- `.hero-content` - Hero text content
- `.hero-title` - Main headline
- `.hero-subtitle` - Subheadline
- `.hero-video` - Video container
- `.ring-video` - Circular video mask
- `.hero-scroll` - Scroll indicator

#### About Section (Lines 720-785)
- `.about` - About container
- `.about-grid` - Two-column layout
- `.about-content` - Text content
- `.about-features` - Feature list
- `.feature-icon` - Feature bullet icons
- `.about-visual` - Visual side

#### Speakers Preview (Lines 788-971)
- `.speakers-grid` - Grid layout
- `.speaker-card` - Individual speaker
- `.speaker-image` - Speaker photo
- `.speaker-info` - Speaker details

#### CFP Section (Lines 974-1018)
- `.cfp-section` - Call for Papers banner

#### Schedule Timeline (Lines 1021-1055)
- `.schedule-timeline` - Timeline container

#### Sponsors Preview (Lines 1058-1121)
- `.sponsors-preview` - Sponsors grid

#### Programme Banner (Lines 1124-1223)
- `.programme-banner` - CTA to program page

#### Location Preview (Lines 1226-1280)
- `.location-preview` - Location teaser

#### CTA Section (Lines 1283-1309)
- `.cta-section` - Final CTA banner

---

### 9. Program Page (Lines 1310-1539)

**Purpose:** Schedule and timeline styles

**Line Range:** 1310-1539

**Key Selectors:**
- `.program-page` - Page container
- `.timeline` - Schedule timeline
- `.timeline-item` - Individual session
- `.timeline-time` - Time block
- `.session-card` - Session presentation
- `.session-title`, `.session-speaker`, `.session-track`

---

### 10. Speakers Page (Lines 1541-1662)

**Purpose:** Speaker listing and CFP styles

**Line Range:** 1541-1662

**Key Selectors:**
- `.speakers-page` - Page container
- `.speakers-grid` - Speaker card grid
- `.speaker-card-large` - Featured speaker
- `.speaker-photo` - Photo styling
- `.speaker-name`, `.speaker-title`, `.speaker-company`
- `.cfp-box` - Call for Papers box

---

### 11. Tickets Page (Lines 1664-1991)

**Purpose:** Ticket pricing and FAQ styles

**Line Range:** 1664-1991

**Key Selectors:**
- `.tickets-page` - Page container
- `.pricing-grid` - Price tier cards
- `.pricing-card` - Individual tier
- `.pricing-header` - Tier name/price
- `.pricing-features` - Feature list
- `.pricing-cta` - Purchase button
- `.early-bird` - Featured/discounted tier
- `.group-tickets` - Group pricing
- `.faq-section` - FAQ accordion
- `.faq-item`, `.faq-question`, `.faq-answer`
- `.newsletter-cta` - Newsletter signup

---

### 12. Location Page (Lines 1993-2523)

**Purpose:** Venue, travel, and accommodation styles

**Line Range:** 1993-2523

**Key Sections:**

#### Venue (Lines 2000-2037)
- `.venue-header` - Venue title area
- `.venue-info` - Venue details grid
- `.venue-gallery` - 2x2 image grid
- `.gallery-item` - Individual image

#### Lightbox (Lines 2074-2183)
- `.lightbox` - Modal overlay
- `.lightbox-content` - Image container
- `.lightbox-close` - Close button

#### Map Section (Lines 2185-2207)
- `.map-section` - Map embed area

#### Why Leiden (Lines 2209-2242)
- `.why-leiden` - City benefits section

#### Travel Info (Lines 2245-2321)
- `.travel-info` - Travel options
- `.travel-option` - Individual option
- `.train-times` - Train schedule

#### Accommodation (Lines 2337-2480)
- `.accommodation` - Hotel suggestions
- `.hotel-card` - Individual hotel
- `.hotel-image`, `.hotel-info`, `.hotel-price`

#### Explore Leiden (Lines 2483-2522)
- `.explore-section` - Things to do

---

### 13. Sponsors Page (Lines 2525-3250)

**Purpose:** Sponsor tiers, packages, and cards

**Line Range:** 2525-3250

**Key Sections:**

#### Hero (Lines 2532-2550)
- `.sponsor-hero` - Page hero

#### Benefits (Lines 2552-2563)
- `.benefits-grid` - Benefits layout

#### Packages (Lines 2565-2584)
- `.packages-grid` - Package cards

#### Package Cards (Lines 2586-2822)
- `.package-card` - Individual package
- `.package-platinum` - Platinum tier
- `.package-gold` - Gold tier
- `.package-silver` - Silver tier
- `.package-bronze` - Bronze tier
- `.package-feature` - Feature list

#### Current Sponsors (Lines 2846-2960)
- `.sponsors-section` - Sponsor display
- `.sponsors-grid` - Grid layout

#### Sponsor Cards (Lines 2977-3130)
- `.sponsor-card` - Individual sponsor
- `.sponsor-logo` - Logo area
- `.sponsor-info` - Company info
- `.sponsor-tier` - Tier indicator

#### Become Sponsor (Lines 3196-3248)
- `.become-sponsor` - CTA section

---

### 14. Contact & Forms (Lines 3251-3921)

**Purpose:** All form-related styles

#### Contact Form (Lines 3743-3805)
- `.contact-form` - Form container
- `.form-row` - Form row
- `.form-group` - Input group
- `.form-group label` - Label styling
- `.form-group input`, `.form-group select`, `.form-group textarea` - Input styles
- `.form-group input:focus` - Focus states

#### Form Status (Lines 3807-3837)
- `.form-status` - Status message container
- `.status-sending` - Submitting state
- `.status-success` - Success state
- `.status-error` - Error state

#### Newsletter Form (Lines 3839-3919)
- `.newsletter-form` - Newsletter signup
- `.newsletter-input` - Email input
- `.newsletter-btn` - Submit button

---

### 15. Community Page (Lines 4387-4723)

**Purpose:** Community resources and events

**Key Sections:**

#### Regional Groups (Lines 4414-4465)
- `.regional-groups` - Groups section
- `.group-card` - Individual group

#### Events (Lines 4468-4519)
- `.community-events` - Events list
- `.event-card` - Individual event

#### International Conferences (Lines 4558-4601)
- `.intl-conferences` - Conference list
- `.conference-card` - Individual conference

#### Responsive (Lines 4697-4723)
- Mobile breakpoint styles

---

## Utility Patterns

### Grid Classes
- `.grid`, `.grid-cols-2`, `.grid-cols-3`, `.grid-cols-4`
- `.gap-1` through `.gap-4`

### Flex Classes
- `.flex`, `.flex-col`, `.flex-wrap`
-center`, `.justify- `.items-between`, `.justify-center`

### Display Classes
- `.block`, `.inline-block`, `.inline`
- `.hidden` (with responsive variants)

---

## Media Query Summary

| Breakpoint | Count | Lines |
|------------|-------|-------|
| 480px | 2 | 3520, 4718 |
| 768px | 8 | 237, 434, 4163, 4698, 4768, 4821, 4890, 5142 |
| 1024px | 4 | 428, 3514, 4080, 5124 |

---

## Notes for Refactoring

1. **Shared Components:** Buttons, forms, cards appear in multiple page sections and should be extracted first

2. **Page-Specific Styles:** Each major page (homepage, speakers, sponsors, tickets, location, community) has dedicated sections that can be split into separate files

3. **Utility Layer:** The utility classes (lines 203-235) are well-organized and can become a separate `utilities.css` file

4. **Responsive Consolidation:** Multiple media query blocks at same breakpoints can be consolidated

5. **CSS Variables:** The :root variables are comprehensive and should remain in a central location

6. **Duplicates:** A separate analysis documents duplicate selectors across the file

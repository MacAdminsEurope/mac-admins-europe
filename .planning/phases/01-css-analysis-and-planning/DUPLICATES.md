# CSS Duplicates Analysis

**Analyzed:** 2026-02-23  
**File:** `src/styles/global.css`  
**Total Lines:** 5,166

---

## Summary

| Category | Count | Priority |
|----------|-------|----------|
| Duplicate Selectors | 5 | HIGH |
| Near-Duplicate Selectors | 12 | MEDIUM |
| Common Properties | 6 patterns | LOW |
| Duplicate Media Queries | 3 | MEDIUM |

---

## 1. Duplicate Selectors (HIGH Priority)

Same CSS selector defined in multiple locations. These should be consolidated.

### `.sponsor-detail-event-note`
- **Lines:** 4960, 5096
- **Issue:** Selector appears twice with potentially different definitions
- **Lines 4960-5108:** Contains h2 and p styling
- **Line 5147:** Another definition in responsive context

### `.newsletter-content`
- **Lines:** 3844, 4837
- **Issue:** Appears in both contact forms section and community page
- **Lines 3844-3853:** h2 and p styling
- **Line 4837:** Duplicate in community page section

### `.lightbox-next`
- **Lines:** 2150, 2175, 4327
- **Issue:** Navigation button defined multiple times
- **Lines 2150-2180:** Location page lightbox
- **Line 4327:** Another lightbox definition

### `.sponsor-card-placeholder`
- **Lines:** 3123, 3182
- **Issue:** Placeholder card defined twice
- **Line 3123:** Sponsors page placeholder
- **Line 3182:** Another placeholder definition

### `.incremental-label` (Complex - Qualified Selectors)
- **Lines:** 2619, 2637, 2650, 2745, 2807, 3320
- **Issue:** Same class with different parent selectors (`.package-card.platinum .incremental-label`, etc.)
- **Status:** Intentional - these are tier-specific variants

---

## 2. Near-Duplicate Selectors (MEDIUM Priority)

Similar selectors that could potentially be consolidated.

### Button Variants
| Selector | Line | Notes |
|----------|------|-------|
| `.btn` | 140 | Base button |
| `.btn-primary` | 156 | Primary variant |
| `.btn-secondary` | 169 | Secondary variant |
| `.btn-outline` | 180 | Outline variant |
| `.btn-white` | 191 | White variant |
| `.btn-white-outline` | 1179 | Another white outline |
| `.btn-gold` | 1207 | Gold variant |
| `.btn-lg` | 1220 | Large size |

**Consolidation opportunity:** Many button styles share similar properties. Could use modifier classes (`.btn--primary`, `.btn--large`).

### Card Variants
| Selector | Line | Notes |
|----------|------|-------|
| `.speaker-card` | 797 | Speaker cards |
| `.ticket-card` | ~1700 | Ticket cards |
| `.package-card` | ~2586 | Package cards |
| `.sponsor-card` | ~2977 | Sponsor cards |
| `.hotel-card` | ~2360 | Hotel cards |
| `.event-card` | ~4468 | Event cards |

**Consolidation opportunity:** All cards share common properties (border-radius, box-shadow, padding). Could extract `.card` base class.

### Form Input Variants
| Selector | Lines | Notes |
|----------|-------|-------|
| `.form-group input` | 3771 | Contact form |
| `.newsletter-input` | ~3860 | Newsletter form |
| `.form-group textarea` | 3773 | Textarea |

**Consolidation opportunity:** Extract shared input styles to `.input` base class.

### Grid Patterns
| Selector | Lines | Notes |
|----------|-------|-------|
| `.footer-grid` | 346 | Footer columns |
| `.about-grid` | 727 | About section |
| `.tickets-grid` | ~1700 | Tickets |
| `.speakers-grid` | 791 | Speakers |
| `.sponsors-grid` | ~2910 | Sponsors |
| `.pricing-grid` | ~1720 | Pricing |

**Consolidation opportunity:** Most grids use `display: grid` with similar gap values. Could use utility classes.

---

## 3. Common Properties (LOW Priority)

Common property-value pairs that appear frequently. This is acceptable CSS practice - not true duplication.

### Display Properties
| Property | Count | Notes |
|----------|-------|-------|
| `display: flex` | 80 | Very common - layout foundation |
| `display: grid` | 29 | Grid layouts |
| `display: block` | 29 | Block elements |
| `display: inline` | 13 | Inline elements |
| `display: none` | 7 | Visibility toggle |

### Color Properties
| Property | Count | Notes |
|----------|-------|-------|
| `color: var(--white)` | 61 | Text on dark backgrounds |
| `color: var(--eu-blue)` | 49 | Primary brand color |
| `color: var(--eu-gold)` | 39 | Accent color |
| `color: var(--eu-blue-dark)` | 27 | Dark variant |

### Background Properties
| Property | Count | Notes |
|----------|-------|-------|
| `background: var(--eu-blue)` | 26 | Primary backgrounds |
| `background: var(--white)` | 22 | Content backgrounds |
| `background: var(--off-white)` | 19 | Section backgrounds |
| `background: var(--eu-gold)` | 13 | CTA backgrounds |

**Assessment:** These common properties are standard CSS practice using design tokens. They do NOT need refactoring - using CSS variables consistently is the correct approach.

---

## 4. Duplicate Media Queries (MEDIUM Priority)

Multiple `@media` blocks at the same breakpoint.

### 768px Breakpoint - 8 occurrences
| Lines | Context |
|-------|---------|
| 237 | Base responsive styles |
| 434 | Navigation mobile menu |
| 4163 | Contact page |
| 4698 | Community page responsive |
| 4768 | Community responsive |
| 4821 | Community responsive |
| 4890 | Community responsive |
| 5142 | Final responsive |

**Consolidation opportunity:** Group all 768px styles into single `@media` block.

### 1024px Breakpoint - 4 occurrences
| Lines | Context |
|-------|---------|
| 428 | Layout responsive |
| 3514 | Pricing summary |
| 4080 | Various |
| 5124 | Final |

**Consolidation opportunity:** Group all 1024px styles.

### 480px Breakpoint - 2 occurrences
| Lines | Context |
|-------|---------|
| 3520 | Pricing |
| 4718 | Community |

**Consolidation opportunity:** Group all 480px styles.

---

## Priority Recommendations

### HIGH Priority (Fix in Phase 2)
1. **Consolidate duplicate selectors:**
   - Merge `.sponsor-detail-event-note` definitions
   - Merge `.newsletter-content` definitions  
   - Merge `.lightbox-next` definitions
   - Merge `.sponsor-card-placeholder` definitions

### MEDIUM Priority (Consider in Phase 2)
2. **Extract base component classes:**
   - Create `.card` base class
   - Create `.input` base class
   - Consider BEM-style button modifiers

3. **Consolidate media queries:**
   - Group all 768px styles
   - Group all 1024px styles
   - Group all 480px styles

### LOW Priority (Acceptable - No Action Needed)
4. **Common properties:** Using CSS variables consistently is correct practice. Do NOT refactor color/display patterns.

---

## Refactoring Impact

| Priority | Estimated Effort | Impact |
|----------|------------------|--------|
| HIGH | Low | Reduces confusion, single source of truth |
| MEDIUM | Medium | Improves maintainability, clearer component hierarchy |
| LOW | None | Current approach is correct |

---

## Files Referenced

All line numbers reference `src/styles/global.css`.

# College Advising Services Redesign — Design Spec
**Date:** 2026-07-25
**Status:** Approved

---

## Overview

Replace the current 3-tier + 7-stage à la carte pricing system for Academic Support (College Advising) with a simpler 4-rung ladder built around how Cruz actually wants to deliver the service: a paid community presentation, a standalone Q&A hour, a single personalized private session, and an ongoing done-with-you package. Add a "cost of getting it wrong" comparison section — using real figures already in Cruz's own community presentation deck — to justify the pricing against the much larger cost of a bad college decision (predatory for-profit schools, non-transferring credits, private loans).

This redesign touches the Academic Support tab on `/services` and the `/college-advising` page. Business Start-Up, Translation Services, and Web Design tabs/pages are untouched.

### Why

The current setup (3 named packages — "Show Me the Map" $79, "Walk Me Through It" $197, "Done With You" $375 — plus a 7-stage à la carte grid of 20+ individually priced items) is too complex to explain in a sales conversation. It also has no place for two things Cruz now wants to sell: a live community presentation (he already has a finished 28-slide bilingual deck, "Entendiendo el Camino Universitario") and a low-commitment "ask me anything" hour.

---

## The New Ladder

All four items are paid — nothing in the new lineup is free. They are not all rungs of one strict upsell ladder — the Ask-Anything Hour is a standalone, always-available option, not something meant to compete head-to-head with the Private Family Session for a buyer's attention.

### 1. Community Presentation — "Entendiendo el Camino Universitario" / "Understanding the College Path"
- **Price:** $20/family
- **Format:** Live group session, ~75 minutes, delivered on request at churches, schools, libraries, community centers, or booked directly by a family
- **Content:** The existing 28-slide bilingual deck as-is — the problem (families "reinventing the wheel," universities incentivized to fill seats not guide students), Texas Hispanic attainment stats, academic vocabulary, degree/school types, financial-aid traps (TASFA, private loans, non-transferring credits, for-profit schools), and the 9th–12th grade roadmap
- **Takeaway materials:** attendees receive a printed/digital roadmap one-pager + planning checklist + FAFSA prep guide. (This repurposes the deliverables from the old "Show Me the Map" $79 product instead of discarding them.)
- **Booking:** "Request a Presentation for Your Group" — on-request only, no published calendar

### 2. Ask-Anything Hour — "La Hora de Preguntas"
- **Price:** $49
- **Format:** 1:1, 60 minutes, booked on request
- **What it is:** No agenda, no prep on Cruz's part, no deliverable. The client brings whatever question they have — a specific school, a confusing financial aid letter, "is this offer legit," anything.
- **Positioning:** Presented as a standalone utility product, not as "step 2" of a funnel. It should not be laid out immediately next to the Private Family Session in a way that invites a side-by-side tier comparison.

### 3. Private Family Session — "El Plan Para Tu Familia" / "Your Family's Plan"
- **Price:** $97
- **Format:** 1:1, single session, 90–120 minutes, booked on request
- **What it is:** Takes the presentation's general content and personalizes it to one student — their grade level, GPA, immigration/financial-aid situation, target majors and schools. Requires prep and review on Cruz's part.
- **Deliverable:** a written, personalized roadmap the family keeps.
- **Role:** This is the new main paid entry point for people who want individualized help. It replaces "Show Me the Map" ($79) and "Walk Me Through It" ($197) as named products.

### 4. Done-With-You
- **Price:** $375 (unchanged)
- **Format:** 8 weekly 1:1 sessions over 60 days
- **What it includes:** full application built together, FAFSA completed together, enrollment steps handled together, bilingual family sessions included
- **Value framing (new copy):** *"8 dedicated working sessions at our standard $75/session rate would run $600. Bundled as Done-With-You, it's $375 — you save $225 (37%), plus FAFSA and enrollment support included at no extra charge."*
  - The $75/session figure is a stated reference/comparison rate for marketing purposes only — it is not a separately bookable product.

### What gets cut
- The 7-stage à la carte grid (20+ individually priced line items across Direction & Discovery, College List & Research, Applications & Documents, Essays & Personal Statement, Financial Aid & FAFSA, Acceptance & Enrollment, College Success) is removed entirely as a sellable menu.
- Its content isn't lost — relevant pieces are folded into what's described as included in the Private Family Session and Done-With-You package copy.

### What's unchanged
- The 7-stage roadmap visual/content on `/college-advising` (`ca.stagesHeading`, `ca.stages`, etc.) stays as the "how we think about this" methodology explainer. It stops being a priced menu but continues to build credibility and show the underlying system.
- Business Start-Up, Translation Services, and Web Design tabs/pages: no changes.

---

## "The Real Cost of Getting This Wrong" (new content, appears in two places)

A comparison section that reframes Puente's fees as insurance against much larger, real losses — using figures already present in the community presentation deck (`PUENTE Education Presentation (2).pdf`), so no new research/claims are introduced:

- Average total cost of a bachelor's degree: **~$146,795** (presentation, slide 10) — a wrong turn (wrong major, wrong school, time at a non-transferring or for-profit program) can waste years and tens of thousands of dollars of that.
- Non-transferring credits mean **paying twice** for a class already passed (slide 15).
- Private loans carry **variable, high interest with no federal borrower protections** — explicitly framed in the deck as "last resort only" (slide 18).
- **31%** of Latino students at 4-year Texas universities, and **45%** at community colleges, never finish (slides 6 and 19) — often due to information gaps, not money.
- Closing line: *"A single misstep can cost thousands. Getting it right, with Puente, costs $20 to $375."*

### Placement
- **`/college-advising`:** a shorter version of this comparison, placed near the existing "La Realidad en Texas" stats block (`ca.stats`), reinforcing the persuasion narrative before the reader ever sees a price.
- **`/services` (Academic Support tab):** the fuller version, placed directly above or beside the new 4-tier pricing ladder, as the explicit "why these prices make sense" argument at the point of purchase decision.

---

## Technical Implementation

### Files changed

1. **`src/lib/translations.ts`**
   - Replace the `academic` object (EN block ~line 514, ES block ~line 1441) — remove `packages` (3-tier) and `alaCarte` (7-stage grid); add the new 4-item ladder (Community Presentation, Ask-Anything Hour, Private Family Session, Done-With-You) with bilingual copy, prices, and feature lists.
   - Add a new `academic.costComparison` (or similarly named) content block with the "cost of getting it wrong" copy, bilingual, for reuse on both pages.
   - Update `collegeAdvising` (EN ~line 182, ES ~line 1109) to add the shorter cost-comparison copy near the existing `stats` block. `stagesHeading`/`stages` (the 7-stage roadmap) stay as-is.

2. **`src/app/services/page.tsx`**
   - Rework the "ACADEMIC SUPPORT TAB" section (currently ~lines 111–247): replace the 3-card package grid + collapsible à la carte section with the new 4-item ladder layout and the cost-comparison block.
   - Each of the 4 items shows: name (EN/ES), price, format/duration, feature list, and a CTA to `/contact` (matching the existing card pattern already used elsewhere on this page).
   - The Ask-Anything Hour should be visually set apart from the Presentation → Private Session → Done-With-You progression (e.g., its own smaller card or a separate row) rather than placed as an equal-weight 3rd card in a straight comparison grid, per its "standalone utility" positioning.

3. **`src/app/college-advising/page.tsx`**
   - Add the shorter cost-comparison content near the existing "Story Block" stats grid (`ca.stats`, ~lines 62–69).
   - No structural changes to the 7-stage roadmap section, bilingual block, or process/scenarios section.

### Bilingual approach
Consistent with the rest of the site: every new user-visible string goes into both the `en` and `es` blocks of `translations.ts`, following the existing `{ en, es }` or parallel-object patterns already used for feature lists elsewhere in the file.

### No new shared components
All new sections (ladder cards, cost-comparison block) are rendered inline within the existing pages, following the pattern already established by the rest of `/services` (no new reusable component files).

---

## Out of Scope
- No booking/calendar system — all four offerings remain "request via contact form," matching how the site already routes every CTA to `/contact`.
- No changes to Business Start-Up, Translation Services, or Web Design tabs/pages.
- No backend/API/payment work.
- No changes to the actual presentation deck content (`PUENTE Education Presentation (2).pdf`) — it's used as a copy source, not modified.

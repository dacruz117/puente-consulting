# Site Content & Navigation Refresh — Design Spec
**Date:** 2026-07-26
**Status:** Approved

---

## Overview

Seven related follow-ups to the college advising pricing redesign (`2026-07-25-college-advising-services-redesign-design.md`), aligning the rest of the site with the new pricing ladder and simplifying navigation and contact:

1. Reposition the cost-comparison section on `/college-advising` to lead right after the hero.
2. Remove stage-based sales language from `/college-advising`'s "How It Works" and example scenarios, replacing it with copy that matches the actual 4-item ladder.
3. Swap the Ask-Anything Hour and Community Presentation card positions on `/services`, and rename the Ask-Anything Hour in Spanish.
4. Remove the Calendly widget from `/contact`; the message form becomes the only way to reach out, with new optional preferred-date/preferred-time fields.
5. Merge Web Design into Business Start-Up (one page, one nav entry, one `/services` tab).
6. Add a top-level "Pricing" nav link and a new FAQ page + nav link.
7. Draft FAQ content for review.

None of these introduce new pages beyond FAQ, new dependencies, or backend/API work — this is content, layout, and navigation restructuring on the existing bilingual Next.js static-export site.

---

## 1. Cost-Comparison Repositioning (`/college-advising`)

**Current:** hero → Story Block (with stats) → cost-comparison section → 7-stage roadmap → ...

**New:** hero → cost-comparison section → Story Block (with stats) → 7-stage roadmap → ...

Purely a JSX reordering in `src/app/college-advising/page.tsx` — the `ca.costComparison` content itself (heading, 2 points, closing line) is unchanged.

---

## 2. Remove Stage-Based Sales Language (`/college-advising`)

The existing "How It Works" (`ca.processHeading`/`processIntro`/`processSteps`) and "scenarios" sections describe engagement as working through "7 stages" (e.g., "we identify which of the 7 stages apply," "this is Stage 5 work") — a framing left over from when academic services were sold à la carte by stage. That no longer matches the 4-item ladder (Presentation / Ask-Anything Hour / Private Family Session / Done-With-You), so this content is rewritten. The 7-stage roadmap section itself (`ca.stagesHeading`/`ca.stages`) is **not** touched — it stays as internal methodology/credibility content, not a sales structure.

### New "How It Works" copy (EN)

- Heading: "How it works" (unchanged)
- Intro: "Four steps. No guesswork. You always know where you stand and what comes next." (unchanged)
- Steps:
  1. **Start wherever makes sense** — "Attend a $20 community presentation, book a private family session, or just ask us a question — there's no wrong place to begin."
  2. **Get a plan built around your student** — "In a Private Family Session, we look at your student's grade, GPA, and goals, and hand you a written roadmap — not a generic checklist."
  3. **Go as deep as you need** — "Need more than a plan? Done-With-You puts us alongside you for 8 weekly sessions handling applications, FAFSA, and enrollment together."
  4. **Your student arrives ready** — "Not just accepted. Enrolled, informed, and actually prepared for what comes next." (unchanged — already product-agnostic)

(Spanish mirrors this exactly in tone and structure.)

### New "Scenarios" copy (EN)

The `stages` array on each scenario (e.g., `["Stage 5: Financial Aid", "Aid offer comparison"]`) is renamed to `tags` and repointed at actual products/topics instead of roadmap stage numbers.

- **Scenario 1** (financial aid comparison): answer reworded to "In a Private Family Session, we sit down with both offers, walk through the real cost of attendance at each school, and explain what is a grant vs. a loan — so the family makes a confident decision, not a panicked one." Tags: `["Financial aid comparison", "Private Family Session"]`.
- **Scenario 2** (10th grader, no direction): answer reworded to "A Private Family Session starts with a conversation about interests, goals, and options, and gives you a 2-year timeline so the family knows exactly what to do and when — no more wondering where to start." Tags: `["Direction & goal-setting", "Private Family Session"]`.

(Spanish mirrors this exactly.)

---

## 3. Ladder Swap + Rename (`/services`, Academic Support tab)

**Current 3-card row:** Presentation ($20) → Private Session ($97, "Most Popular") → Done-With-You ($375), with Ask-Anything Hour ($49) as a separate standalone card below.

**New:** Ask-Anything Hour ($49) → Private Session ($97, "Most Popular") → Done-With-You ($375) in the 3-card row; Community Presentation ($20) becomes the standalone card below, in the visual "spot" Ask-Anything used to occupy. The standalone card's framing note changes from Ask-Anything's old "Not a step in a ladder — just a flexible hour whenever you need one" to a line suited to Presentation's own logistics: "Prefer a live group session? Request one for your church, school, or community group — or book one just for your family."

Only the **positions** change — no pricing, feature lists, or descriptions change for any of the four items.

### Spanish rename

Ask-Anything Hour's Spanish name changes from "La Hora de Preguntas" to **"Consulta Abierta."** No other copy for that item changes.

---

## 4. Contact Page Simplification

**Remove:** the entire Calendly column (widget, `CALENDLY_URL` embed, script tag, "Book a Session" heading/copy tied to it) from `src/app/contact/page.tsx`. Delete the now-unused `CALENDLY_URL` constant from `src/lib/constants.ts` if nothing else references it.

**Result:** `/contact` becomes a single, centered column containing only the existing `ContactForm`, framed as the one way to reach out — you'll reply manually by email.

**New fields on `ContactForm`:** two optional fields, placed after the existing service-interest dropdown and before the message textarea:
- **Preferred date** — `<input type="date" name="preferred_date">`, optional
- **Preferred time** — `<input type="time" name="preferred_time">`, optional

These pass through the existing Web3Forms submission (`formData` already collects all named fields automatically) — no changes needed to the submit handler itself. Labeled clearly as a *preference* (e.g., "Preferred date (optional)"), since you're replying manually and confirming by email, not booking automatically.

---

## 5. Merge Web Design into Business Start-Up

- `src/app/business-startup/page.tsx` gains a second section presenting the existing Web Design content (hero/tagline, package cards) below the existing Business Start-Up content, with its own clear heading (e.g., "Web Design" as a sub-section divider) — reusing the content currently in `t.webDesign.*` as-is, just relocated onto this page.
- `src/app/web-design/page.tsx` becomes a client-side redirect to `/business-startup` (using `useRouter().replace()` in a `useEffect`, since this is a static-export site — `next.config.js` has `output: 'export'`, so server-side `redirects()` config isn't available). Preserves old bookmarks/links without a broken page.
- **Nav (`src/components/Navbar.tsx`):** `serviceLinks` drops the standalone Web Design entry; the dropdown now lists College Advising, Business Start-Up, Translation Services.
- **`/services` pricing page:** the `business` and `webDesign` tabs merge into one tab (reusing the `business` tab's key/position). Within that tab: the existing Business Start-Up package grid + à la carte grid render first, followed by the existing Web Design package grid as a second sub-section with its own heading. Tab count on `/services` goes from 5 (general, academic, business, translation, webDesign) to 4 (general, academic, business+webDesign combined, translation).

---

## 6. Navigation Additions

- **Pricing:** a new top-level nav link, "Pricing" (EN) / "Precios" (ES), pointing to `/services`, placed next to "About" in both desktop and mobile nav. The existing Services dropdown (with its buried "View All Pricing" link) is unchanged — this adds a second, more visible path to the same page, per your instruction.
- **FAQ:** a new page at `/faq` with its own nav link ("FAQ" in both languages, since it's used as-is in Spanish informally, or "Preguntas Frecuentes" — full Spanish label used for the page heading, with "FAQ" acceptable as the short nav label in both languages), placed next to About/Pricing. Structure matches the site's existing simple content pages (hero + content sections), fully bilingual via `translations.ts`.

---

## 7. FAQ Content (draft — for review before going live)

Nine bilingual Q&A pairs, covering:

1. **What is Puente?** — Bilingual consulting practice in Central Texas helping first-generation families navigate college admissions, aspiring entrepreneurs start businesses, plus translation and web design support — in English and Spanish.
2. **Who is college advising for?** — Families of students from middle school through college, especially first-generation, Spanish-speaking families wanting a personalized guide, not a generic checklist.
3. **What's the difference between the four college-advising services?** — Short description of Community Presentation, Ask-Anything Hour, Private Family Session, Done-With-You (pricing + what each includes).
4. **Do I have to start with the Community Presentation?** — No; start wherever makes sense — presentation, Private Family Session, or Ask-Anything Hour directly.
5. **Are your services offered in Spanish?** — Yes, every session and page is available in both English and Spanish.
6. **How do I book a session?** — Send a message through the Contact page with a preferred date/time; you'll follow up personally by email to confirm — no automated booking system.
7. **What if I only need business start-up help, or only a website, not both?** — Business Start-Up and Web Design are shown together since many clients need both, but either can be booked on its own — just say so in the message.
8. **What grade or age should my student be to start?** — Works with students from middle school through college; earlier (ideally 9th grade) means more proactive planning, per the 7-stage roadmap.
9. **Do you offer translation services on their own?** — Yes, a separate Translation Services line exists independent of college advising or business consulting.

Exact bilingual copy will be written out in full (no placeholders) in the implementation plan, matching this outline.

---

## Technical Implementation

### Files changed

1. **`src/lib/translations.ts`** (EN + ES):
   - `collegeAdvising`: reorder is JSX-only (no translation change), but `processSteps` and `scenarios` content rewritten per Section 2; `scenarios[].stages` renamed to `scenarios[].tags`.
   - `services.academic`: no pricing/copy changes, only consuming-page JSX reorders (Section 3); `askAnything.name` in the ES block changes to "Consulta Abierta."
   - `services.business` and `services.webDesign`: no content changes — only how `/services/page.tsx` renders them (merged into one tab, Section 5).
   - Add new `faq` translation block (EN + ES) with the 9 Q&A pairs from Section 7.
   - Add `nav.pricing`/`nav.precios` (if not already present from the earlier redesign — confirm) and `nav.faq` entries.
   - Remove/repoint any translation strings solely tied to the Calendly section on `/contact` (e.g. `contact.bookSession`, `contact.scheduleText`) if they become unused, or repurpose them for the simplified single-form framing.
   - Add `contactForm.preferredDate` / `contactForm.preferredTime` label strings.

2. **`src/app/college-advising/page.tsx`** — reorder cost-comparison section above Story Block; no other structural change.

3. **`src/app/services/page.tsx`** — Academic tab: swap card order in the 3-card map and the standalone card (Section 3). Business/Web Design tabs: merge into one tab entry, rendering both package grids in sequence (Section 5). Tab list (`tabs` array, `Tab` type) updates from 5 to 4 entries.

4. **`src/app/contact/page.tsx`** — remove Calendly column/widget/script; single-column layout with `ContactForm` only.

5. **`src/components/ContactForm.tsx`** — add preferred-date and preferred-time input fields.

6. **`src/lib/constants.ts`** — remove `CALENDLY_URL` if no longer referenced anywhere.

7. **`src/app/business-startup/page.tsx`** — add Web Design section below existing content.

8. **`src/app/web-design/page.tsx`** — replace with a client-side redirect to `/business-startup`.

9. **`src/components/Navbar.tsx`** — drop Web Design from `serviceLinks`; add top-level Pricing and FAQ links (desktop + mobile menus).

10. **`src/app/faq/page.tsx`** — new page, following the site's existing simple-content-page pattern.

### Bilingual approach

Consistent with the rest of the site: every new or changed user-visible string goes into both `en` and `es` blocks of `translations.ts`.

### No new shared components

FAQ page follows existing page patterns (hero + content sections) already used elsewhere on the site (e.g., `/about`). No new reusable components introduced.

---

## Out of Scope

- No changes to the pricing, features, or descriptions of any of the 4 academic ladder items, the Business Start-Up packages, or the Web Design packages themselves — only their layout position and page grouping change.
- No real booking/calendar system — the Contact page's date/time fields are a preference passed along in the email notification, not a scheduling integration.
- No changes to the 7-stage roadmap content on `/college-advising`.
- No changes to Translation Services.
- FAQ content in Section 7 is a first draft for review, not final — exact wording may change before the implementation plan locks it in.

# Home Page Redesign — Design Spec
**Date:** 2026-04-20
**Status:** Approved for implementation

---

## Overview

Redesign the home page from a general-assistance-focused page into a clear service hub that lets visitors immediately identify which of Puente's three services applies to them, builds trust, and drives them to book a free intro call. The language toggle is also made globally prominent.

---

## Page Structure

Five sections, in order:

1. Hero — service-first with three cards
2. Who it's for — three persona tiles
3. Service snapshots — three detailed cards
4. Trust block — photo + credentials
5. CTA banner — free intro call

---

## Section 1 — Hero

**Background:** `bg-primary` (#1A1A1A) with austin-skyline.jpg at 20% opacity (same as all other pages).

**Content:**
- Eyebrow pill: `"Bilingual · Austin, TX · EN / ES"` (uses `text-accent-light` on a subtle border)
- H1: `"Guidance for college, business, and everyday life."` — bold, large, tight letter-spacing
- Subtitle: `"Helping Spanish-speaking families navigate the systems that were never explained to them — in English, in Spanish, or both."`
- Three service cards in a horizontal grid below the headline

**Hero service cards** (3-column grid, dark glass style):
Each card links to its respective page and shows:
- Icon (emoji or SVG)
- Service name (bold, white)
- One-line description (muted white)
- Price anchor + link label (accent-light color)

| Card | Name | Description | Price label |
|---|---|---|---|
| 1 | General Assistance | Forms, appointments, registrations, and everyday digital systems. | $25/hr · See services → |
| 2 | College Advising | From first question to first day of class — the full 7-stage roadmap. | From $79 · See packages → |
| 3 | Business Start-Up | Idea to open for business — 8 stages, 109 steps, done with you. | From $97 · See packages → |

Cards link to `/services`, `/college-advising`, `/business-startup` respectively.

---

## Section 2 — Who It's For

**Background:** `bg-accent` (#1B3A5C) — dark blue, provides strong visual contrast after the hero.

**Content:**
- Section eyebrow: `"Who we help"`
- H2: `"Sound familiar?"`
- Three persona tiles in a 3-column grid

**Persona tiles** (dark glass style, border-left accent):
Each tile has a situational quote in italic + a service link below.

| Tile | Quote | Link |
|---|---|---|
| 1 | "My daughter got accepted. We have no idea what to do next." | → College Advising |
| 2 | "I want to start a business but I don't know how to make it official." | → Business Start-Up |
| 3 | "I need help with forms, appointments, and paperwork — in Spanish." | → General Assistance |

All three quotes and links are fully translated in EN and ES via `translations.ts`.

---

## Section 3 — Service Snapshots

**Background:** `bg-cream` (#F9F7F4)

**Content:**
- Section eyebrow: `"What we offer"`
- H2: `"Three ways Puente can help"`
- Three cards in a 3-column grid (1-col on mobile)

**Snapshot card structure:**
- Tag pill (service category)
- Card title
- One-sentence description
- 2–4 bullet highlights (pulled from the real service pages)
- Starting price
- CTA link button → respective page

| Card | Title | Bullets | Price | CTA |
|---|---|---|---|---|
| General Assistance | Everyday Navigation | Toll tags & registration · Appointments & applications · Official letters explained · Resume & email setup | $25 / hour | Book a session → `/contact` |
| College Advising | The 7-Stage Academic Roadmap | School list & research · Essays & personal statement · FAFSA & financial aid · Acceptance & enrollment | From $79 | See the roadmap → `/college-advising` |
| Business Start-Up | Idea to Open for Business | Legal structure & EIN · Brand, website & digital presence · Sales process & outreach · Financial controls & growth | From $97 | See the 8 stages → `/business-startup` |

College Advising card gets a subtle accent border/ring to indicate it is a featured service.

---

## Section 4 — Trust Block

**Background:** `bg-white`

**Layout:** 2-column grid (1-col on mobile) — photo left, content right.

**Photo:** `/profile.png` (existing asset). Rounded corners, shadow.

**Content:**
- Section eyebrow: `"Why Puente"`
- H2: `"Experienced. Bilingual. On your side."`
- Short paragraph (2–3 sentences) about background and approach
- Credential pills (flex-wrap row):
  - Bachelor's Degree
  - Higher Ed Administration
  - Bilingual EN / ES
  - 1:1 Sessions
  - Confidential
  - Transparent Pricing
- Pull-quote (existing translation key `home.trustGoal`): `"My goal is not just to complete the task — but to empower you to feel confident doing it next time."`

All text uses existing `home` translation keys where possible; new keys added for paragraph text.

---

## Section 5 — CTA Banner

**Reuses the existing `CTABanner` component.**

- Heading: `"Not sure where to start?"`
- Sub-line: `"The intro call is free. We'll figure out together what you need."` (new translation key)
- Button: `"Book a Free Intro Call →"` → `/contact`

---

## Language Toggle — Navbar Update

**Current state:** Small faded text button (`ES` / `EN`) — easy to miss.

**New treatment (Option B):** A distinct white button with a flag emoji and full text label, placed in the navbar between the nav links and the "Book a Session" CTA.

**Desktop:**
```
[🇲🇽 Ver en Español]   [Book a Session]
```
When in ES mode, shows:
```
[🇺🇸 View in English]   [Agenda una Sesión]
```

**Mobile:** Same button appears in the mobile menu row (between nav links and Book a Session button). The current muted text toggle is removed entirely.

**Styling:** `bg-white text-primary font-semibold text-sm px-4 py-2 rounded-lg` — stands out clearly against the dark `bg-primary` navbar.

**Scope:** Change is in `Navbar.tsx` only. No other files need to change for this feature.

---

## Translations

New keys needed in both `en` and `es` objects in `translations.ts` under `home`:

```typescript
home: {
  // existing keys stay, new additions:
  heroEyebrow: "Bilingual · Austin, TX · EN / ES",
  heroTitle: "Guidance for college, business, and everyday life.",
  heroSubtitle: "Helping Spanish-speaking families navigate the systems that were never explained to them — in English, in Spanish, or both.",

  whoTitle: "Sound familiar?",
  whoEyebrow: "Who we help",
  personas: [
    { quote: "My daughter got accepted. We have no idea what to do next.", link: "→ College Advising", href: "/college-advising" },
    { quote: "I want to start a business but I don't know how to make it official.", link: "→ Business Start-Up", href: "/business-startup" },
    { quote: "I need help with forms, appointments, and paperwork — in Spanish.", link: "→ General Assistance", href: "/services" },
  ],

  snapshotsEyebrow: "What we offer",
  snapshotsTitle: "Three ways Puente can help",

  trustEyebrow: "Why Puente",
  trustTitle: "Experienced. Bilingual. On your side.",
  trustParagraph: "With a background in higher education administration and years of guiding families through complex systems, I bring both the knowledge and the patience to make these processes feel manageable.",
  trustPills: ["Bachelor's Degree", "Higher Ed Administration", "Bilingual EN / ES", "1:1 Sessions", "Confidential", "Transparent Pricing"],

  ctaHeading: "Not sure where to start?",
  ctaSub: "The intro call is free. We'll figure out together what you need.",
  ctaButton: "Book a Free Intro Call →",
}
```

Navbar toggle labels added to `nav` key:
```typescript
nav: {
  langButtonToEs: "Ver en Español",     // shown when current lang is EN
  langButtonToEn: "View in English",    // shown when current lang is ES
}
```

---

## Files to Change

| File | What changes |
|---|---|
| `src/app/page.tsx` | Full rewrite — new section structure |
| `src/components/Navbar.tsx` | Replace muted text toggle with flag + label button |
| `src/lib/translations.ts` | Add new `home` keys + `nav.langButton*` keys (both EN and ES) |

---

## What Does NOT Change

- The existing color palette, fonts, and Tailwind config — no changes
- All other pages — untouched
- The `CTABanner`, `CheckIcon`, `Footer` components — used as-is
- The language toggle logic (`LanguageContext`) — only the button's visual treatment changes

# Services & Pricing Page — Design Spec
**Date:** 2026-04-16  
**Status:** Approved

---

## Overview

Add a dedicated `/services` pricing page for the Business Startup consulting offering, and update the existing `/business-startup` page to reflect the 8-stage framework. Both pages are fully bilingual (EN/ES) using the existing `LanguageContext` and `translations.ts` system.

---

## Route & Navigation

- New page: `src/app/services/page.tsx` at URL `/services`
- Nav link added: **"Pricing"** (EN) / **"Precios"** (ES)
- Placed after "Business Start-Up" in the nav array in `Navbar.tsx`
- Nav translations added to both `en.nav` and `es.nav` in `translations.ts`

---

## Business Start-Up Page (`/business-startup`) Updates

The existing page uses the generic `ServicePage` component via `translations.businessStartup`. These translations are updated:

- **Hero description** — updated to reference the 109-step system and 8 stages
- **"What We Offer" grid** — replaced with the 8 stages (title + milestone outcome), rendered in `ServicePage`'s existing 2-column grid
- **Process steps** — updated to 4 steps: (1) Assess your starting point, (2) Map the stages you need, (3) Execute stage by stage, (4) Launch with confidence
- **"See full pricing →"** CTA link added pointing to `/services` via `CTABanner` with custom props

### 8 Stages (used in both pages)

| Stage | Name | Milestone Outcome |
|-------|------|-------------------|
| 1 | Idea & Validation | Business concept defined, market researched, feasibility confirmed |
| 2 | Legal & Structure | Entity formed, EIN obtained, licenses secured, bank account open |
| 3 | Brand & Identity | Name, logo, tagline, brand colors, business cards, elevator pitch done |
| 4 | Digital & Online Presence | Domain, website, email, social media, Google Business set up |
| 5 | Operations & Systems | Phone, CRM, invoicing, templates, insurance, accounting software in place |
| 6 | Sales & Marketing | Sales process defined, outreach started, first prospects contacted |
| 7 | Financial Controls | Bookkeeping active, pricing set, cash flow tracked, tax prep started |
| 8 | Growth & Scale | First revenue earned, team/contractors hired, systems being optimized |

---

## `/services` Page Layout

### 1. Hero Section
- Background: `bg-accent` (navy `#1B3A5C`) + Austin skyline image overlay at 20% opacity (matches all other service pages)
- Headline: "Let's build your business the right way."
- Subtext: "I help first-time and aspiring business owners go from idea to open for business — with a proven 109-step system covering every stage: legal setup, branding, website, sales, finances, and growth."

### 2. Package Cards
Three cards side-by-side on desktop (`md:grid-cols-3`), stacked on mobile.

| Package | Price | Highlight |
|---------|-------|-----------|
| Inform Me | $97 one-time | Standard card (white bg) |
| Walk Me Through It | $297 / 3 sessions over 90 days | **Most Popular** — `bg-accent` navy bg, white text, visually elevated |
| Done With You | $750 / 60-day co-pilot | Standard card (white bg) |

Each card includes:
- Package name + price
- Full feature list with checkmarks (includes all items from cheaper tiers)
- CTA button → `/contact`

Below all cards: founding client note — "Founding client pricing — limited to 3 spots. Rate increases once spots are filled."

#### Feature lists

**Inform Me ($97):**
- Full 109-task startup checklist
- All 8 launch stages
- Tool & vendor recommendations
- 30-day email support
- Self-paced

**Walk Me Through It ($297):** Everything in Inform Me, plus:
- 3 × 60-min strategy sessions
- Personalized stage-by-stage plan
- Sales process + outreach help
- Priority email between sessions

**Done With You ($750):** Everything in Walk Me Through It, plus:
- Weekly 1:1 sessions (8 total)
- Brand + digital presence built
- Financial model & pricing setup
- First proposal reviewed & coached

### 3. À la Carte Section
- Section title: "Only need help with one piece? Pick your stage."
- Note: "Bundle 3 or more stages and save 15%."
- Grid: 2 cols on mobile → 4 cols on desktop (`grid-cols-2 md:grid-cols-4`)
- 8 stage cards, each with a **color-coded left border** (4px, inline style) using 8 distinct colors

Stage card colors:
1. `#3B82F6` (blue)
2. `#10B981` (emerald)
3. `#8B5CF6` (purple)
4. `#06B6D4` (cyan)
5. `#F59E0B` (amber)
6. `#EF4444` (red)
7. `#6366F1` (indigo)
8. `#D97706` (gold)

Each stage card contains:
- Stage number + name (header)
- 3 individual line items with prices
- "Full Stage X advisory: $XXX" bolded at bottom

#### À la Carte Pricing

**Stage 1 — Idea & Validation**
- Business concept + target market session — $97
- Competitive landscape research report — $147
- Customer discovery interview framework — $97
- Full Stage 1 advisory — **$247**

**Stage 2 — Legal & Structure**
- Entity selection + formation walkthrough — $147
- Business banking + EIN setup guide — $97
- License & permit research — $127
- Full Stage 2 advisory — **$297**

**Stage 3 — Brand & Identity**
- Brand positioning + audience persona — $97
- Logo brief + vendor sourcing — $127
- Brand style guide — $147
- Full Stage 3 advisory — **$247**

**Stage 4 — Digital & Online Presence**
- Website copy framework (5 pages) — $197
- Google Business + LinkedIn optimization — $127
- Full digital presence audit + plan — $167
- Full Stage 4 advisory — **$297**

**Stage 5 — Operations & Systems**
- CRM setup + email template kit — $147
- Contract + invoice template build — $127
- Operations systems audit + recommendations — $167
- Full Stage 5 advisory — **$297**

**Stage 6 — Sales & Marketing**
- Sales process map + outreach sequence — $197
- Prospect list build (50 targets) — $147
- Proposal / pitch deck template — $147
- Full Stage 6 advisory — **$347**

**Stage 7 — Financial Controls**
- Financial model + break-even analysis — $197
- Cash flow tracker + 90-day forecast — $167
- Bookkeeping system setup — $147
- Full Stage 7 advisory — **$347**

**Stage 8 — Growth & Scale**
- SOP creation (5 core processes) — $247
- Referral program + partner strategy — $197
- 90-day growth review session — $197
- Full Stage 8 advisory — **$347**

### 4. How It Works
4 numbered steps using existing accent-circle pattern from `ServicePage`:
1. We assess where you are
2. You get your custom roadmap
3. We work through it together
4. You launch with confidence

### 5. CTA Footer Bar
Uses existing `CTABanner` component with:
- `heading`: "Ready to start? Contact us to claim your founding client spot."
- `buttonText`: "Book a Free Intro Call"
- `href`: `/contact`

---

## Technical Implementation

### Files changed
1. `src/lib/translations.ts` — add `nav.pricing`/`nav.precios`, update `businessStartup` section (8 stages + updated process steps), add full `services` section (EN + ES)
2. `src/components/Navbar.tsx` — add Pricing nav link
3. `src/app/business-startup/page.tsx` — no structural change; content driven by updated translations + CTABanner props
4. `src/app/services/page.tsx` — new file, standalone `"use client"` page component

### No new shared components
The `/services` page is self-contained. All sections (hero, cards, stage grid, steps, CTA) are rendered inline. The only shared component used is `CTABanner`.

### Bilingual approach
All user-visible strings go through `translations.ts`. Spanish translations provided for all new content.

---

## Out of Scope
- No changes to College Advising or Translation Services pages
- No new reusable components
- No contact form changes
- No backend/API work

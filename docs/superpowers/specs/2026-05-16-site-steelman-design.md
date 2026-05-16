# Site Steelman — Full Pre-Launch Review Design Spec

**Date:** 2026-05-16
**Status:** Approved

---

## Overview

A comprehensive pre-launch audit of Puente Bilingual Services covering process mapping, existing design documents, website layout, and customer-facing content. All five services are in scope: General Assistance, College Advising, Business Startup, Translation Services, and Web Design. Changes are tiered by impact.

### Context established during review

- Delivery model: **in-person**, Austin metro area
- Web design is a **core pillar**, not supplementary
- Scheduling tool: **Calendly** (not yet integrated)
- Credentials: **BBA, Texas A&M University – Central Texas; Enrollment Advisor at TAMUCT**
- No testimonials yet; structure should support adding them later
- Community Info Session credit: **placeholder — remove entirely**
- Web design platform: custom-built sites (not templates), hosted on Netlify/Cloudflare, version-controlled via GitHub

---

## Tier 1 — Critical

### 1.1 About page — factual corrections

**File:** `src/lib/translations.ts` → `en.about.paragraphs` and `es.about.paragraphs`

Three changes:
- Remove "screen-share or phone support" — replace with in-person language
- Replace vague credentials with: "With a BBA from Texas A&M University – Central Texas and professional experience as an Enrollment Advisor at TAMUCT, I bring firsthand knowledge of the systems your family is navigating."
- Add Austin metro service area: "Puente serves the Austin metro area in person."

Spanish equivalents required for all three changes.

---

### 1.2 Contact form — add missing services

**File:** `src/lib/translations.ts` → `en.contactForm` and `es.contactForm`

Current service interest options: College Advising, Business Start-Up, Both.

Replace with:
- General Assistance
- College Advising
- Business Start-Up
- Translation Services
- Web Design
- Multiple Services

Remove the "Both" option. Add "Multiple Services" as the catch-all.

Spanish translations required for all new options.

---

### 1.3 Calendly integration

**Files:** `src/app/contact/page.tsx`, `src/lib/translations.ts` → `en.contact` and `es.contact`

- All "Book a Session" and "Book a Free Intro Call" buttons/links across the entire site must link to the Calendly URL (to be provided by the user before implementation)
- The contact page should display Calendly as the **primary action** (embedded or as a prominent button)
- The contact form remains as a **secondary option** for clients who prefer to message first
- Add a label above the form: "Prefer to send a message? Use the form below."
- Translation required for new label

---

### 1.4 Remove Community Info Session credit

**File:** `src/lib/translations.ts` → `en.services.academic.communityCredit` and `es.services.academic.communityCredit`

Delete the `communityCredit` object entirely from both EN and ES.

**File:** `src/app/services/page.tsx`

Remove the Lightbulb + community credit block from the Academic tab (lines ~180–188).

---

### 1.5 Web Design — Basic plan logo contradiction

**File:** `src/lib/translations.ts` → `en.webDesign.packages[0].features` and `es` equivalent

Change:
- `"Logo, services list & photo gallery (up to 10 photos)"` → `"Your logo placed, services list & photo gallery (up to 10 photos)"`
- ES: `"Logo, lista de servicios y galería de fotos (hasta 10 fotos)"` → `"Su logo colocado, lista de servicios y galería de fotos (hasta 10 fotos)"`

The add-on "Basic logo design — $150" remains unchanged. The clarification makes clear the Basic plan places an existing logo; logo design is a separate paid add-on.

---

### 1.6 College Advising — fix heroSubEs rendering in English mode

**File:** `src/app/college-advising/page.tsx`

Currently `ca.heroSubEs` renders unconditionally as italic text under the English hero subtitle. It should only render when `lang === "es"`.

Change:
```tsx
// Before (always renders)
<p className="text-sm text-gray-500 italic mb-8">{ca.heroSubEs}</p>

// After (conditional)
{lang === "es" && (
  <p className="text-sm text-gray-500 italic mb-8">{ca.heroSubEs}</p>
)}
```

**File:** `src/app/college-advising/page.tsx` requires `lang` from `useLanguage()` — verify it is already destructured (it is not currently; `heroSubEs` uses `ca` only). Add `lang` to the destructure.

---

## Tier 2 — Important

### 2.1 Navigation — rename "Pricing" and unify service coverage

**File:** `src/lib/translations.ts` → `en.nav.pricing` and `es.nav.pricing`

- Rename `"Pricing"` → `"Services & Pricing"`
- Rename ES `"Precios"` → `"Servicios y Precios"`

**File:** `src/app/services/page.tsx` and `src/lib/translations.ts` → `en.services` and `es.services`

Add two new tabs to the Services & Pricing page:
- **Translation Services tab** — show the existing translation pricing (hourly rate + per-document note)
- **Web Design tab** — show the 3 web design packages inline (same data as `/web-design` page, no duplication of logic — import or reference the same translation keys)

Update `en.services.tabs`:
```
general: "General Assistance"
academic: "Academic Support"
business: "Business Start-Up"
translation: "Translation Services"   ← new
webDesign: "Web Design"               ← new
```

Spanish equivalents required.

---

### 2.2 Home page — add Web Design as a core pillar

**File:** `src/lib/translations.ts` → `en.home` and `es.home`

**Hero cards:** Add a 4th card for Web Design:
```
name: "Web Design"
description: "Custom-built websites for local businesses. Not a template — a real site, built for you."
priceLabel: "From $300 · See packages →"
href: "/web-design"
```

Update hero card grid from `md:grid-cols-3` → `md:grid-cols-2 lg:grid-cols-4` in `src/app/page.tsx`.

**`cardIcons` map:** Add `/web-design` entry using an appropriate Lucide icon (e.g., `Monitor` or `Globe`).

**Snapshots section:**
- Update section title: `"Three ways Puente can help"` → `"How Puente can help"`
- Add a Web Design snapshot card:
```
tag: "Web Design"
title: "A Real Website, Not a Template"
description: "Custom-built, professionally hosted, and maintained for you every month."
bullets: [
  "Custom design, not a template",
  "Domain & hosting included",
  "Monthly maintenance included",
  "Bilingual content available",
]
price: "From $300 setup + $75/mo"
cta: "See packages →"
href: "/web-design"
featured: false
```

Spanish equivalents required for all new content.

---

### 2.3 Business Startup page — expand to match College Advising depth

**File:** `src/lib/translations.ts` → `en.businessStartup` and `es.businessStartup`

**File:** `src/app/business-startup/page.tsx` — currently uses generic `ServicePage` component. Replace with a bespoke page matching the College Advising structure:

Add the following content blocks (translations required for all):

**Story block:**
```
heading: "Most people never launch. Not because of the idea."
p1: "Starting a business in the U.S. involves licenses, tax IDs, banking, branding, websites, and systems that no one explains in one place. Most aspiring owners get stuck on step two and never move forward."
p2: "Puente walks you through every step, in person, in English or Spanish, using a proven 8-stage system built from real startup experience."
quote: "I want to open a business but I don't know how to make it official."
quoteAttr: "The question Puente was built to answer."
```

**Stats block (4 stats):**
```
{ number: "8",      label: "Stages from idea to open for business" }
{ number: "1:1",    label: "Personalized guidance, every session" }
{ number: "EN/ES",  label: "Fully bilingual sessions available" }
{ number: "$0",     label: "Intro call, no commitment to get started" }
```

Note: "109" is intentionally excluded from the stats block to stay consistent with Section 3.6 (Option B removes the specific number from copy until it can be shown visually).

**Stage descriptions:** Expand each of the 8 stages from one sentence to a short paragraph (3–5 sentences), similar to the College Advising stage descriptions. Tags per stage (3–4 each). Full content provided below:

**Stage 1 — Idea & Validation**
Description: "Before investing time or money, every business needs a clear concept and a real market. We help you define exactly what your business does, who it serves, and whether there is enough demand to make it worth building. We research competitors, talk through pricing models, and confirm that your idea is viable before you spend a dollar. Most people skip this stage — and it shows."
Tags: ["Business concept", "Market research", "Feasibility check"]

**Stage 2 — Legal & Structure**
Description: "Getting legal is not optional — it protects you, your customers, and your income. We walk through entity selection (LLC, sole proprietor, or corporation), help you obtain your EIN from the IRS, guide you through opening a dedicated business bank account, and identify any licenses or permits required for your specific industry and city. This stage turns an idea into a real, legitimate business."
Tags: ["LLC formation", "EIN setup", "Business banking", "Licenses & permits"]

**Stage 3 — Brand & Identity**
Description: "Your brand is how customers recognize and remember you. We help you define your business name, develop a tagline, establish brand colors and visual style, and create a brief elevator pitch you can use anywhere. If you need a logo, we help you brief a designer or connect you with a vendor. By the end of this stage, your business has a face and a voice."
Tags: ["Business name", "Logo brief", "Brand style", "Elevator pitch"]

**Stage 4 — Digital & Online Presence**
Description: "Customers search online before they call. If you are not findable, you are invisible. We set up your domain, coordinate website development, create a professional email address, establish your Google Business Profile, and configure your social media presence. This stage ensures that when someone in Austin searches for what you offer, they can find you and trust what they see."
Tags: ["Domain & website", "Google Business", "Social media setup", "Professional email"]

**Stage 5 — Operations & Systems**
Description: "A business that runs on sticky notes and memory does not scale. We set up the core systems that keep your business running smoothly: a CRM for tracking leads and clients, an invoicing tool for getting paid, contract and proposal templates, and the accounting software you will need come tax time. We also review your insurance needs and help you get the right coverage in place."
Tags: ["CRM setup", "Invoicing & contracts", "Accounting software", "Insurance review"]

**Stage 6 — Sales & Marketing**
Description: "Revenue does not come from having a website — it comes from a sales process. We build your sales workflow from first contact to closed deal, create an outreach sequence for your first prospects, and help you build a list of target customers. If you have never sold before, we walk through the conversation together. By the end of this stage, you are actively talking to potential clients."
Tags: ["Sales process", "Outreach sequence", "Prospect list", "First clients"]

**Stage 7 — Financial Controls**
Description: "Most small businesses fail because of cash flow problems, not bad products. We help you build a financial model, set your pricing so that you are actually profitable, activate bookkeeping, and create a 90-day cash flow forecast. We also make sure you are ready for quarterly taxes so there are no surprises at year end. This stage gives you the financial visibility to make real decisions."
Tags: ["Pricing model", "Cash flow tracking", "Bookkeeping", "Tax prep"]

**Stage 8 — Growth & Scale**
Description: "Once you have revenue, the work shifts from launching to growing. We help you document your core processes so the business can run without you doing everything yourself, build a referral strategy to bring in consistent leads, and review your first 90 days to identify what is working and what to change. This stage turns a running business into one that is built to last."
Tags: ["SOPs", "Referral program", "90-day review", "Systems for growth"]

**Customer scenarios (2):**
```
Scenario 1:
  question: "I want to open a cleaning business. I have customers lined up but I don't know how to make it legal or take payments."
  answer: "We start at Stage 2 (Legal & Structure): entity formation, EIN, business banking. Then Stage 5 (Operations): invoicing setup, contract templates, and payment processing. You go from informal to official in a few sessions."
  stages: ["Stage 2: Legal & Structure", "Stage 5: Operations & Systems"]

Scenario 2:
  question: "I have a business idea but I don't know if it's viable or how to research the market."
  answer: "That's Stage 1: Idea & Validation. We define the concept, research the target market, and confirm feasibility before you spend a dollar. No guessing, no wasted money."
  stages: ["Stage 1: Idea & Validation"]
```

**Bilingual block:**
```
heading: "For entrepreneurs who think in Spanish."
p1: "Many first-time business owners in the Austin area are more comfortable planning and thinking in Spanish, even when their business will operate in English. Puente works in both."
p2: "We explain what an LLC is. What an EIN does. What 'registered agent' means. What bookkeeping actually requires. In whatever language makes you feel confident, not confused."
cta: "Book a bilingual session →"
```

---

### 2.4 Web Design page — add substance beyond pricing

**File:** `src/lib/translations.ts` → `en.webDesign` and `es.webDesign`
**File:** `src/app/web-design/page.tsx`

Add the following sections (new translation keys required):

**Differentiator block** (above or below pricing):
```
heading: "Not a template. A real website."
p1: "Most budget website options give you a drag-and-drop template and leave you to figure out the rest. Puente builds your site from scratch — custom design, clean code, version-controlled, and hosted professionally."
p2: "You get a site that looks like your business, not like everyone else's."
bullets: [
  "Custom-built, not a Wix or Squarespace template",
  "Hosted on professional infrastructure (not shared hosting)",
  "Version-controlled — your site is never lost",
  "Monthly maintenance included in every plan",
]
```

**How it works (4 steps):**
```
1. Kickoff meeting (in person, Austin metro) — we review your brand, gather content, and agree on the design direction
2. Build — your site is built and shared for review within the agreed timeline
3. Revisions — we incorporate your feedback (2 rounds included in all plans)
4. Launch & maintain — we go live and handle ongoing updates each month
```

**Turnaround time note:**
```
"Most Basic sites launch within 2 weeks. Standard and Premium projects typically run 3–4 weeks depending on content."
```

**Add disclaimer section:**
```
"All websites are built to the specifications agreed upon at project kickoff. Puente Bilingual Services does not guarantee specific business outcomes from web presence. Monthly maintenance covers routine updates and content changes; major redesigns are scoped separately."
```

---

### 2.5 College Advising — fix Stage 7 positioning and stats

**File:** `src/lib/translations.ts` → `en.collegeAdvising.stages[6]` and `en.collegeAdvising.stats[0]`

Stage 7 description: Add an opening line to clarify this stage is for already-enrolled students:
> "Already enrolled? This stage is for students navigating university from the inside. [existing description follows]"

Stats fix:
- Change `"7 Stages of support, from direction to graduation"` → `"7 Stages of support, from first question to first day of class"`

Spanish equivalents required.

---

### 2.6 À la carte pricing — make savings visible

**File:** `src/lib/translations.ts` → `en.services.academic.alaCarte.stages` and `en.services.business.alaCarte.stages`

Add a `savings` field to each stage object showing the dollar amount saved vs. buying items individually:

```typescript
{
  ...,
  fullLabel: "Full Stage 1 advisory",
  fullPrice: "$247",
  savings: "Save $94 vs. individual items"  // ← new
}
```

Calculate the savings for every stage in both Academic and Business.

**File:** `src/app/services/page.tsx`

Render the savings line beneath the full stage price in the à la carte cards.

Spanish translation for the savings label pattern: `"Ahorra $X al comprar la etapa completa"`

---

### 2.7 About page — in-person and Austin metro

**File:** `src/lib/translations.ts` → `en.about` and `es.about`

Add a new field or update existing paragraph:
- Explicitly state: "Puente serves the Austin metro area — all sessions are in person."
- Ensure this appears on the About page in the story section.

---

## Tier 3 — Polish

### 3.1 Testimonials placeholder structure

**Files:** `src/app/page.tsx`, `src/app/college-advising/page.tsx`, `src/app/business-startup/page.tsx`, `src/app/web-design/page.tsx`
**File:** `src/lib/translations.ts` → add `testimonialsComingSoon` key to relevant sections

Add a testimonials section to each of the above pages. While no real testimonials exist yet, the section should render a message like:
> "Reviews coming soon — currently accepting founding clients."

Structure the section so real testimonials (name, quote, service) can be added later by populating an array in translations.

---

### 3.2 Translation Services — ballpark pricing guidance

**File:** `src/lib/translations.ts` → `en.translationServices.pricingBullets` and ES equivalent

Replace vague "Per-document pricing available upon review" with:
> "Most personal letters and short documents: 1–2 hours. Longer documents are quoted before any work begins."

---

### 3.3 Founding client notes — make consistent

**File:** `src/lib/translations.ts` → `en.services.academic.foundingNote` and `en.services.business.foundingNote`

Both notes must use the same format. Options:
- Both with a number: "Founding client pricing — limited to [N] spots. Rate increases once spots are filled."
- Both without a number: "Founding client pricing — limited availability. Rate increases once spots are filled."

Choose one format before implementation. The number (if used) must be confirmed by the user.

---

### 3.4 Response time on contact page

**File:** `src/lib/translations.ts` → `en.contact` and `es.contact`

Add a new field: `responseTime: "We respond to all messages within 24 hours."`
Spanish: `"Respondemos a todos los mensajes en menos de 24 horas."`

Render this beneath the contact form CTA in `src/app/contact/page.tsx`.

---

### 3.5 Translation Services CTA — remove trailing period

**File:** `src/lib/translations.ts` → `en.translationServices.ctaButton`

Change: `"Book your translation session today."` → `"Book a Translation Session →"`

Spanish equivalent: `"Agenda tu sesión de traducción →"`

---

### 3.6 Business Startup — "109 steps" substantiation

**File:** `src/lib/translations.ts` → `en.businessStartup` and `en.home`

Two options:
- **Option A:** Add a collapsible section on the Business Startup page showing all 109 tasks organized by stage (similar to the academic à la carte section). High effort, high credibility.
- **Option B:** Change copy from "proven 109-step system" to "a comprehensive, stage-by-stage system" and remove the number until it can be backed up visually.

**Recommendation:** Option B for launch. Revisit Option A as a future enhancement.

---

### 3.7 Web Design disclaimer

**File:** `src/lib/translations.ts` → add `en.webDesign.disclaimer` and ES equivalent
**File:** `src/app/web-design/page.tsx`

Add a disclaimer section at the bottom of the web design page (matches the pattern used on other service pages):
> "All websites are built to the specifications agreed upon at project kickoff. Puente Bilingual Services does not guarantee specific business outcomes from web presence. Monthly maintenance covers routine updates and content changes; major redesigns are scoped separately."

---

## Files Affected Summary

| File | Changes |
|------|---------|
| `src/lib/translations.ts` | Major — touches nearly every section in both EN and ES |
| `src/app/page.tsx` | Home page: hero cards, snapshots section |
| `src/app/about/page.tsx` | Credentials, in-person, service area |
| `src/app/college-advising/page.tsx` | `lang` destructure, heroSubEs conditional render |
| `src/app/business-startup/page.tsx` | Full rewrite from generic ServicePage to bespoke page |
| `src/app/services/page.tsx` | Remove community credit block; add Translation + Web Design tabs |
| `src/app/web-design/page.tsx` | Add differentiator block, how-it-works, turnaround, disclaimer |
| `src/app/contact/page.tsx` | Calendly integration, response time label |
| `src/app/translation-services/page.tsx` | Pricing copy update, CTA button fix |
| `src/components/ContactForm.tsx` | Add missing service options to dropdown |

---

## Out of Scope

- No new routes or pages (all changes are to existing pages)
- No backend or API changes
- No Calendly account setup (user provides URL before implementation)
- Testimonials section is structured but empty — no real testimonials added
- The full 109-step checklist is deferred (Tier 3.6 Option B chosen for launch)
- No changes to the Cloudflare/Netlify deployment configuration

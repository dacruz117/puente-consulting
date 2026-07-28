# Nav Declutter + FAQ/Did You Know Merge — Design

**Goal:** Reduce desktop/mobile nav clutter and merge the "Did You Know?" and "FAQ" pages into a single page, since maintaining two separate nav items for closely related, low-traffic content pages was more than the site needs.

**Current state:** Desktop nav shows `Services ▾ | About | Pricing | Did You Know? | FAQ`, plus a "Book a Session" button and language toggle. Two problems:
1. "Services" (dropdown trigger) and "Pricing" ("Services & Pricing") both link to the same `/services` page — a leftover duplicate.
2. "Did You Know?" (fact cards, grouped by 4 service categories) and "FAQ" (flat Q&A list) are separate top-level nav items for content that can live on one page.

**Target state:** Desktop/mobile nav shows `Services ▾ | About | FAQ`. The `/faq` page contains both the Did You Know facts and the FAQ Q&A list. `/did-you-know` becomes a redirect to `/faq`.

---

## 1. Navbar (`src/components/Navbar.tsx`)

- Remove the standalone "Pricing" link (desktop `t.nav.pricing` link at line ~121, mobile equivalent ~line 231) — the Services dropdown already links to `/services` and its dropdown menu already has a "View All Plans & Pricing" link.
- Remove the "Did You Know?" link (desktop ~line 125, mobile ~line 241) and its `didYouKnowActive` variable.
- Result desktop order: Services ▾, About, FAQ.
- Result mobile order: Services (accordion), About, FAQ.
- `pricingActive` variable also becomes unused and should be removed along with its link.

## 2. `/faq` page (`src/app/faq/page.tsx`)

Keep the existing hero (eyebrow, `heroTitle`, `heroSubtitle` from `t.faq`) unchanged. Insert a new "Did You Know?" section immediately after the hero and before the Q&A list:

- Section heading/subheading: reuse `t.didYouKnow.heroTitle` / `t.didYouKnow.heroSubtitle` as an in-page section heading (not a second hero banner) — same visual treatment as the category headers used elsewhere on the page (e.g. a bold heading with a bottom border, consistent with existing page conventions).
- Fact cards: reuse the existing 4-category grid exactly as implemented in `src/app/did-you-know/page.tsx` today (category label heading + 3-column grid of fact cards per category, same Tailwind classes).
- Existing Q&A list section gets a small heading added above it for visual separation now that it's the second section on the page (e.g. reuse the `t.faq.eyebrow` text, "Frequently Asked Questions", as a section heading here).
- CTA banner at the bottom, unchanged.

No new translation copy is needed — `t.didYouKnow` and `t.faq` content are reused as-is, just composed onto one page.

## 3. `/did-you-know` route → redirect

The site builds with `output: 'export'` (static export), so `next.config.js` `redirects()` is not available (no server to run it). `/did-you-know` is currently listed in `public/sitemap.xml` and may already be indexed, so instead of deleting the route (→ 404), replace `src/app/did-you-know/page.tsx` with a small client component that redirects to `/faq` on mount via `next/navigation`'s `useRouter().replace('/faq')`.

Remove the `/did-you-know` entry from `public/sitemap.xml`.

## 4. Footer (`src/components/Footer.tsx`)

Swap the footer Quick Links entry that currently points to `/did-you-know` (using `t.footer.didYouKnow`) to instead point to `/faq` using a new `t.footer.faq` label ("FAQ" / "FAQ" — same in both languages, matching the nav label convention).

## 5. Translation cleanup (`src/lib/translations.ts`)

- Remove `nav.pricing` (EN + ES) — no longer referenced anywhere.
- Remove `footer.didYouKnow` (EN + ES) — replaced by `footer.faq`.
- Add `footer.faq: "FAQ"` (EN + ES).
- Remove `nav.didYouKnow` (EN + ES) — its nav link is being removed, so the label becomes unused.
- Keep `nav.faq` and the full `didYouKnow` / `faq` top-level content blocks (categories, Q&A items) — all still rendered, now both from the `/faq` page.

## Testing

- `npx tsc --noEmit` — no new type errors.
- `npm run lint` — passes.
- `npm run build` — static export succeeds; confirm `/faq` route renders both sections, `/did-you-know` route still exists in build output (as the redirect page) and redirects correctly when visited.
- Manual check in browser: nav shows 3 items on desktop and mobile, no dead links, language toggle still renders both sections' EN/ES copy correctly, footer FAQ link works.

## Out of scope

- No new copy/content is being written — this is a structural/nav change only.
- No changes to `/services`, `/about`, or any other page's content.

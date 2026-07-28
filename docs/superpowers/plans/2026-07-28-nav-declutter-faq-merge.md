# Nav Declutter + FAQ/Did You Know Merge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce nav clutter (drop the duplicate "Pricing" link and the standalone "Did You Know?" link) and merge the Did You Know facts into the FAQ page, so the site keeps one page instead of two for this content.

**Architecture:** Additive-first ordering so the build never breaks mid-plan: first merge Did You Know content into `/faq` (Task 1), then turn `/did-you-know` into a client-side redirect (Task 2), then remove the now-redundant Navbar links (Task 3), then update the Footer and clean up unused translation keys (Task 4). Every task ends with `npx tsc --noEmit` and `npm run build` passing.

**Tech Stack:** Next.js 14 App Router (static export via `output: 'export'`), TypeScript, Tailwind CSS, existing `useLanguage` context, existing `CTABanner` component.

## Global Constraints

- Static export (`output: 'export'` in `next.config.js`) — no server-side redirects available; any redirect must be a client component.
- No new copy/content — reuse existing `t.didYouKnow` and `t.faq` translation data verbatim (EN + ES).
- `npx tsc --noEmit` and `npm run build` must pass after every task.

---

### Task 1: Merge Did You Know facts into the FAQ page

**Files:**
- Modify: `src/app/faq/page.tsx`

**Interfaces:**
- Consumes: `t.didYouKnow.heroTitle`, `t.didYouKnow.heroSubtitle`, `t.didYouKnow.categories` (array of `{ label: string, facts: string[] }`) — already defined in `src/lib/translations.ts` (EN block lines 820-857, ES block lines 1723-1760). `t.faq.eyebrow`, `t.faq.heroTitle`, `t.faq.heroSubtitle`, `t.faq.items` (array of `{ question, answer }`) — already defined (EN lines 858-900, ES lines 1761-1803).
- Produces: no new exports — this is a page component, not a shared module.

- [ ] **Step 1: Replace the full contents of `src/app/faq/page.tsx`**

```tsx
"use client";

import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import { useLanguage } from "@/context/LanguageContext";

export default function FaqPage() {
  const { t } = useLanguage();
  const faq = t.faq;
  const dyk = t.didYouKnow;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary text-white py-20 overflow-hidden">
        <Image
          src="/austin-skyline.jpg"
          alt="Austin skyline"
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <p className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-light border border-accent-light/30 bg-white/5 px-4 py-1.5 rounded-full mb-6">
            {faq.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{faq.heroTitle}</h1>
          <p className="text-lg text-gray-300">{faq.heroSubtitle}</p>
        </div>
      </section>

      {/* Did You Know facts */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">{dyk.heroTitle}</h2>
            <p className="text-body max-w-2xl mx-auto">{dyk.heroSubtitle}</p>
          </div>
          <div className="space-y-16">
            {dyk.categories.map((category) => (
              <div key={category.label}>
                <h3 className="text-xl font-bold text-primary mb-6 pb-2 border-b border-gray-200">
                  {category.label}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {category.facts.map((fact, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col gap-4"
                    >
                      <p className="text-base text-primary leading-relaxed">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Q&A List */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
            {faq.eyebrow}
          </h2>
          <div className="space-y-6">
            {faq.items.map((item) => (
              <div key={item.question} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-primary mb-2">{item.question}</h3>
                <p className="text-body leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner heading={t.cta.defaultHeading} buttonText={t.cta.defaultButton} href="/contact" />
    </>
  );
}
```

Note: the Q&A section now sits on a `bg-gray-50` background (was transparent before) so it reads as visually distinct from the Did You Know section above it, matching the alternating-background pattern used elsewhere on the site.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd /home/dacruz117/puente-consulting && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Verify build succeeds**

Run: `cd /home/dacruz117/puente-consulting && npm run build`
Expected: build succeeds, `/faq` listed in route output.

- [ ] **Step 4: Manual check**

Run `npm run dev`, open `http://localhost:3000/faq` in a browser. Confirm: hero renders, "Did You Know?" section shows 4 categories × 3 fact cards, "Frequently Asked Questions" section shows all 9 Q&A items below it, CTA banner at the bottom. Toggle language and confirm the Spanish copy renders correctly in both sections.

- [ ] **Step 5: Commit**

```bash
git add src/app/faq/page.tsx
git commit -m "feat: merge Did You Know facts into the FAQ page"
```

---

### Task 2: Turn `/did-you-know` into a redirect to `/faq`

**Files:**
- Modify: `src/app/did-you-know/page.tsx`
- Modify: `public/sitemap.xml`

**Interfaces:**
- Consumes: `useRouter` from `next/navigation` (already used elsewhere in the app, e.g. `usePathname` in `src/components/Navbar.tsx`).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Replace the full contents of `src/app/did-you-know/page.tsx`**

```tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DidYouKnowRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/faq");
  }, [router]);

  return null;
}
```

- [ ] **Step 2: Remove the `/did-you-know` entry from `public/sitemap.xml`**

In `public/sitemap.xml`, delete this line:

```xml
  <url><loc>https://puenteconsulting.com/did-you-know</loc></url>
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd /home/dacruz117/puente-consulting && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Verify build succeeds**

Run: `cd /home/dacruz117/puente-consulting && npm run build`
Expected: build succeeds, `/did-you-know` still listed in route output (it's a real page, just one that redirects).

- [ ] **Step 5: Manual check**

Run `npm run dev`, open `http://localhost:3000/did-you-know` in a browser. Confirm it redirects to `/faq` immediately.

- [ ] **Step 6: Commit**

```bash
git add src/app/did-you-know/page.tsx public/sitemap.xml
git commit -m "feat: redirect /did-you-know to /faq"
```

---

### Task 3: Remove "Pricing" and "Did You Know?" links from the Navbar

**Files:**
- Modify: `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing consumed by later tasks (Task 4 touches `translations.ts` and `Footer.tsx`, not `Navbar.tsx`).

- [ ] **Step 1: Remove the unused active-state variables**

In `src/components/Navbar.tsx`, find (around line 24-27):

```typescript
  const aboutActive = pathname === "/about";
  const didYouKnowActive = pathname === "/did-you-know";
  const pricingActive = pathname === "/services";
  const faqActive = pathname === "/faq";
```

Replace with:

```typescript
  const aboutActive = pathname === "/about";
  const faqActive = pathname === "/faq";
```

- [ ] **Step 2: Remove the desktop "Pricing" and "Did You Know?" links**

Find (around line 117-131):

```tsx
          <Link href="/about" className={navLinkClass(aboutActive)}>
            {t.nav.about}
          </Link>

          <Link href="/services" className={navLinkClass(pricingActive)}>
            {t.nav.pricing}
          </Link>

          <Link href="/did-you-know" className={navLinkClass(didYouKnowActive)}>
            {t.nav.didYouKnow}
          </Link>

          <Link href="/faq" className={navLinkClass(faqActive)}>
            {t.nav.faq}
          </Link>
```

Replace with:

```tsx
          <Link href="/about" className={navLinkClass(aboutActive)}>
            {t.nav.about}
          </Link>

          <Link href="/faq" className={navLinkClass(faqActive)}>
            {t.nav.faq}
          </Link>
```

- [ ] **Step 3: Remove the mobile "Pricing" and "Did You Know?" links**

Find (around line 221-259):

```tsx
          <Link
            href="/about"
            className={`block text-sm transition-colors ${
              aboutActive ? "text-accent-light font-medium" : "hover:text-accent-light"
            }`}
            onClick={closeMobile}
          >
            {t.nav.about}
          </Link>

          <Link
            href="/services"
            className={`block text-sm transition-colors ${
              pricingActive ? "text-accent-light font-medium" : "hover:text-accent-light"
            }`}
            onClick={closeMobile}
          >
            {t.nav.pricing}
          </Link>

          <Link
            href="/did-you-know"
            className={`block text-sm transition-colors ${
              didYouKnowActive ? "text-accent-light font-medium" : "hover:text-accent-light"
            }`}
            onClick={closeMobile}
          >
            {t.nav.didYouKnow}
          </Link>

          <Link
            href="/faq"
            className={`block text-sm transition-colors ${
              faqActive ? "text-accent-light font-medium" : "hover:text-accent-light"
            }`}
            onClick={closeMobile}
          >
            {t.nav.faq}
          </Link>
```

Replace with:

```tsx
          <Link
            href="/about"
            className={`block text-sm transition-colors ${
              aboutActive ? "text-accent-light font-medium" : "hover:text-accent-light"
            }`}
            onClick={closeMobile}
          >
            {t.nav.about}
          </Link>

          <Link
            href="/faq"
            className={`block text-sm transition-colors ${
              faqActive ? "text-accent-light font-medium" : "hover:text-accent-light"
            }`}
            onClick={closeMobile}
          >
            {t.nav.faq}
          </Link>
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `cd /home/dacruz117/puente-consulting && npx tsc --noEmit`
Expected: no errors. (`t.nav.pricing` and `t.nav.didYouKnow` still exist in `translations.ts` at this point, just unreferenced — that's fine, they're removed in Task 4.)

- [ ] **Step 5: Verify lint and build**

Run: `cd /home/dacruz117/puente-consulting && npm run lint && npm run build`
Expected: both pass.

- [ ] **Step 6: Manual check**

Run `npm run dev`. Confirm the desktop nav shows exactly `Services ▾ | About | FAQ` (plus Book a Session + language toggle), and the mobile menu shows the same three entries in its accordion/list.

- [ ] **Step 7: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: remove duplicate Pricing and Did You Know links from nav"
```

---

### Task 4: Footer link swap + translation key cleanup

**Files:**
- Modify: `src/components/Footer.tsx`
- Modify: `src/lib/translations.ts`

**Interfaces:**
- Consumes: `t.footer.faq` (new key, added in this task).
- Produces: nothing consumed by later tasks (this is the last task).

- [ ] **Step 1: Add `footer.faq` and remove `footer.didYouKnow` in the English block**

In `src/lib/translations.ts`, find the `en.footer` block (around line 19-32):

```typescript
      disclaimer:
        "Puente Bilingual Services provides assistance and informational guidance only. We do not provide legal, financial, immigration, or medical advice. Clients are responsible for final decisions and submissions.",
      didYouKnow: "Did You Know?",
    },
```

Replace with:

```typescript
      disclaimer:
        "Puente Bilingual Services provides assistance and informational guidance only. We do not provide legal, financial, immigration, or medical advice. Clients are responsible for final decisions and submissions.",
      faq: "FAQ",
    },
```

- [ ] **Step 2: Add `footer.faq` and remove `footer.didYouKnow` in the Spanish block**

Find the `es.footer` block (around line 922-935):

```typescript
      disclaimer:
        "Puente Bilingual Services ofrece asistencia y orientación informativa únicamente. No brindamos asesoría legal, financiera, migratoria ni médica. Los clientes son responsables de decisiones y envíos finales.",
      didYouKnow: "¿Sabías que...?",
    },
```

Replace with:

```typescript
      disclaimer:
        "Puente Bilingual Services ofrece asistencia y orientación informativa únicamente. No brindamos asesoría legal, financiera, migratoria ni médica. Los clientes son responsables de decisiones y envíos finales.",
      faq: "FAQ",
    },
```

- [ ] **Step 3: Remove `nav.pricing` and `nav.didYouKnow` from the English nav block**

Find the `en.nav` block (around line 5-18):

```typescript
    nav: {
      services: "Services",
      viewAllPricing: "View All Plans & Pricing",
      collegeAdvising: "College Advising",
      businessStartup: "Business Start-Up",
      pricing: "Services & Pricing",
      translationServices: "Translations",
      about: "About",
      bookSession: "Book a Session",
      langButtonToEs: "Español",
      langButtonToEn: "English",
      didYouKnow: "Did You Know?",
      faq: "FAQ",
    },
```

Replace with:

```typescript
    nav: {
      services: "Services",
      viewAllPricing: "View All Plans & Pricing",
      collegeAdvising: "College Advising",
      businessStartup: "Business Start-Up",
      translationServices: "Translations",
      about: "About",
      bookSession: "Book a Session",
      langButtonToEs: "Español",
      langButtonToEn: "English",
      faq: "FAQ",
    },
```

- [ ] **Step 4: Remove `nav.pricing` and `nav.didYouKnow` from the Spanish nav block**

Find the `es.nav` block (around line 908-921):

```typescript
    nav: {
      services: "Servicios",
      viewAllPricing: "Ver Todos los Planes y Precios",
      collegeAdvising: "Asesoría Universitaria",
      businessStartup: "Inicio de Negocios",
      pricing: "Servicios y Precios",
      translationServices: "Traducciones",
      about: "Nosotros",
      bookSession: "Agenda una Sesión",
      langButtonToEs: "Español",
      langButtonToEn: "English",
      didYouKnow: "¿Sabías que...?",
      faq: "FAQ",
    },
```

Replace with:

```typescript
    nav: {
      services: "Servicios",
      viewAllPricing: "Ver Todos los Planes y Precios",
      collegeAdvising: "Asesoría Universitaria",
      businessStartup: "Inicio de Negocios",
      translationServices: "Traducciones",
      about: "Nosotros",
      bookSession: "Agenda una Sesión",
      langButtonToEs: "Español",
      langButtonToEn: "English",
      faq: "FAQ",
    },
```

- [ ] **Step 5: Update the Footer component**

In `src/components/Footer.tsx`, find (around line 49-53):

```tsx
              <li>
                <Link href="/did-you-know" className="hover:text-white transition-colors">
                  {t.footer.didYouKnow}
                </Link>
              </li>
```

Replace with:

```tsx
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  {t.footer.faq}
                </Link>
              </li>
```

- [ ] **Step 6: Verify TypeScript compiles**

Run: `cd /home/dacruz117/puente-consulting && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Verify lint and build**

Run: `cd /home/dacruz117/puente-consulting && npm run lint && npm run build`
Expected: both pass.

- [ ] **Step 8: Manual check**

Run `npm run dev`. Scroll to the footer, confirm the Quick Links list shows "FAQ" (or "FAQ" in Spanish too, per the translation) linking to `/faq` instead of "Did You Know?" linking to `/did-you-know`. Toggle language and re-check.

- [ ] **Step 9: Commit**

```bash
git add src/components/Footer.tsx src/lib/translations.ts
git commit -m "feat: swap footer Did You Know link for FAQ, clean up unused nav/footer translation keys"
```

---

## Final Check

After all four tasks are complete:

- [ ] Run `npx tsc --noEmit`, `npm run lint`, and `npm run build` one more time — all pass, no errors.
- [ ] Desktop nav shows `Services ▾ | About | FAQ` plus the Book a Session button and language toggle.
- [ ] Mobile nav menu shows the same three entries.
- [ ] `/faq` renders the Did You Know facts section followed by the Q&A list, in both languages.
- [ ] `/did-you-know` redirects to `/faq`.
- [ ] Footer Quick Links shows "FAQ" linking to `/faq`.
- [ ] `public/sitemap.xml` no longer lists `/did-you-know`.

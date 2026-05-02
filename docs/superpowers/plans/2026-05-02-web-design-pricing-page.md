# Web Design Pricing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a standalone bilingual Web Design Services pricing page at `/web-design` with three pricing tiers, an add-ons section, and nav/footer links.

**Architecture:** All user-facing text lives in `src/lib/translations.ts` under both `en` and `es` keys — the page reads `t.webDesign` via `useLanguage()`. The page is a self-contained `"use client"` Next.js component following the exact same patterns as `src/app/services/page.tsx`. Nav and footer are updated by adding a single entry each.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, `as const` translations pattern.

---

## File Map

| File | Action | What changes |
|------|--------|--------------|
| `src/lib/translations.ts` | Modify | Add `webDesign` to `en.nav`, `es.nav`, `en.footer`, `es.footer`; add full `en.webDesign` and `es.webDesign` top-level objects |
| `src/components/Navbar.tsx` | Modify | Insert Web Design link between Pricing and Translations |
| `src/components/Footer.tsx` | Modify | Add Web Design link to Quick Links |
| `src/app/web-design/page.tsx` | Create | New page: hero, 3 pricing cards, add-ons section, CTA |

---

## Task 1: Add `webDesign` to nav and footer translation namespaces

**Files:**
- Modify: `src/lib/translations.ts`

- [ ] **Step 1: Add `webDesign` to `en.nav` (after `pricing`)**

In `translations.ts`, find the `en.nav` block (~line 6) and insert after `pricing: "Pricing",`:

```typescript
      pricing: "Pricing",
      webDesign: "Web Design",
      translationServices: "Translations",
```

- [ ] **Step 2: Add `webDesign` to `en.footer` (after `translationServices`)**

Find the `en.footer` block (~line 17) and insert after `translationServices: "Translation Services",`:

```typescript
      translationServices: "Translation Services",
      webDesign: "Web Design Services",
```

- [ ] **Step 3: Add `webDesign` to `es.nav` (after `pricing`)**

Find the `es.nav` block (~line 715) and insert after `pricing: "Precios",`:

```typescript
      pricing: "Precios",
      webDesign: "Diseño Web",
      translationServices: "Traducciones",
```

- [ ] **Step 4: Add `webDesign` to `es.footer` (after `translationServices`)**

Find the `es.footer` block (~line 726) and insert after `translationServices: "Servicios de Traducción",`:

```typescript
      translationServices: "Servicios de Traducción",
      webDesign: "Diseño Web",
```

- [ ] **Step 5: Verify TypeScript**

```bash
cd /home/dacruz117/puente-consulting && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib/translations.ts
git commit -m "feat: add webDesign keys to nav and footer translation namespaces"
```

---

## Task 2: Add `en.webDesign` top-level object to translations

**Files:**
- Modify: `src/lib/translations.ts`

- [ ] **Step 1: Insert `en.webDesign` before the closing of the `en` block**

The `en` block closes just before `es: {` (~line 713). Insert the following block immediately before that closing `},`:

```typescript
    webDesign: {
      heroTitle: "Web Design for Local Businesses",
      heroSubtitle: "Professional websites for local businesses, starting at $300.",
      mostPopular: "Most Popular",
      packageCta: "Get Started",
      setupLabel: "setup",
      monthlyLabel: "/mo",
      addOnsTitle: "Add-Ons",
      addOnsSubtitle: "Optional upgrades available with any plan.",
      ctaHeading: "Not sure where to start?",
      ctaSub: "The intro call is free. We’ll figure out together what you need.",
      ctaButton: "Book a Free Intro Call →",
      packages: [
        {
          name: "Basic",
          setupPrice: "$300",
          monthlyPrice: "$75",
          features: [
            { en: "Single-page professional website", es: "Sitio web profesional de una página" },
            { en: "Logo, services list & photo gallery (up to 10 photos)", es: "Logo, lista de servicios y galería de fotos (hasta 10 fotos)" },
            { en: "Phone number, contact form & Google Maps embed", es: "Número de teléfono, formulario de contacto e integración de Google Maps" },
            { en: "Social media links", es: "Enlaces a redes sociales" },
            { en: "Mobile-friendly design", es: "Diseño adaptable a móviles" },
            { en: "Domain & hosting included", es: "Dominio y alojamiento incluidos" },
            { en: "Monthly maintenance included", es: "Mantenimiento mensual incluido" },
          ],
        },
        {
          name: "Standard",
          setupPrice: "$500",
          monthlyPrice: "$100",
          features: [
            { en: "Multi-page website (Home, Services, Gallery, Contact)", es: "Sitio web multipágina (Inicio, Servicios, Galería, Contacto)" },
            { en: "Testimonials & before/after photo section", es: "Sección de testimonios y fotos de antes/después" },
            { en: "FAQ page", es: "Página de preguntas frecuentes" },
            { en: "Quote request form", es: "Formulario de solicitud de cotización" },
            { en: "Mobile-friendly design", es: "Diseño adaptable a móviles" },
            { en: "Domain & hosting included", es: "Dominio y alojamiento incluidos" },
            { en: "Monthly maintenance included", es: "Mantenimiento mensual incluido" },
          ],
        },
        {
          name: "Premium",
          setupPrice: "$800",
          monthlyPrice: "$150",
          features: [
            { en: "Everything in Standard, plus:", es: "Todo lo del Estándar, más:" },
            { en: "Unlimited pages & project portfolio", es: "Páginas ilimitadas y portafolio de proyectos" },
            { en: "Blog/news section", es: "Sección de blog/noticias" },
            { en: "Appointment or quote scheduling system", es: "Sistema de citas o cotizaciones en línea" },
            { en: "Google Business Profile setup & optimization", es: "Configuración y optimización de Google Business" },
            { en: "Photo gallery with project filtering", es: "Galería de fotos con filtros por proyecto" },
            { en: "Priority support & faster updates", es: "Soporte prioritario y actualizaciones más rápidas" },
          ],
        },
      ],
      addOns: [
        {
          name: { en: "Google Business Profile Setup", es: "Configuración de Google Business" },
          price: { en: "$100 one-time", es: "$100 pago único" },
        },
        {
          name: { en: "Extra page after launch", es: "Página adicional después del lanzamiento" },
          price: { en: "$75/page", es: "$75/página" },
        },
        {
          name: { en: "Basic logo design", es: "Diseño básico de logo" },
          price: { en: "$150 one-time", es: "$150 pago único" },
        },
        {
          name: { en: "Rush delivery (48 hrs)", es: "Entrega urgente (48 hrs)" },
          price: { en: "+$150", es: "+$150" },
        },
        {
          name: { en: "Bilingual English/Spanish content", es: "Contenido bilingüe inglés/español" },
          price: { en: "Included", es: "Incluido" },
          highlight: true,
        },
      ],
    },
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /home/dacruz117/puente-consulting && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/translations.ts
git commit -m "feat: add en.webDesign translations"
```

---

## Task 3: Add `es.webDesign` top-level object to translations

**Files:**
- Modify: `src/lib/translations.ts`

- [ ] **Step 1: Insert `es.webDesign` before the closing of the `es` block**

The `es` block closes just before `} as const;` (~line 1421). Insert the following block immediately before that closing `},`:

```typescript
    webDesign: {
      heroTitle: "Diseño Web para Negocios Locales",
      heroSubtitle: "Sitios web profesionales para negocios locales, desde $300.",
      mostPopular: "Más Popular",
      packageCta: "Comenzar",
      setupLabel: "instalación",
      monthlyLabel: "/mes",
      addOnsTitle: "Servicios Adicionales",
      addOnsSubtitle: "Mejoras opcionales disponibles con cualquier plan.",
      ctaHeading: "¿No sabe por dónde empezar?",
      ctaSub: "La llamada inicial es gratis. Juntos descubriremos qué necesita.",
      ctaButton: "Agenda una Llamada Gratuita →",
      packages: [
        {
          name: "Basic",
          setupPrice: "$300",
          monthlyPrice: "$75",
          features: [
            { en: "Single-page professional website", es: "Sitio web profesional de una página" },
            { en: "Logo, services list & photo gallery (up to 10 photos)", es: "Logo, lista de servicios y galería de fotos (hasta 10 fotos)" },
            { en: "Phone number, contact form & Google Maps embed", es: "Número de teléfono, formulario de contacto e integración de Google Maps" },
            { en: "Social media links", es: "Enlaces a redes sociales" },
            { en: "Mobile-friendly design", es: "Diseño adaptable a móviles" },
            { en: "Domain & hosting included", es: "Dominio y alojamiento incluidos" },
            { en: "Monthly maintenance included", es: "Mantenimiento mensual incluido" },
          ],
        },
        {
          name: "Standard",
          setupPrice: "$500",
          monthlyPrice: "$100",
          features: [
            { en: "Multi-page website (Home, Services, Gallery, Contact)", es: "Sitio web multipágina (Inicio, Servicios, Galería, Contacto)" },
            { en: "Testimonials & before/after photo section", es: "Sección de testimonios y fotos de antes/después" },
            { en: "FAQ page", es: "Página de preguntas frecuentes" },
            { en: "Quote request form", es: "Formulario de solicitud de cotización" },
            { en: "Mobile-friendly design", es: "Diseño adaptable a móviles" },
            { en: "Domain & hosting included", es: "Dominio y alojamiento incluidos" },
            { en: "Monthly maintenance included", es: "Mantenimiento mensual incluido" },
          ],
        },
        {
          name: "Premium",
          setupPrice: "$800",
          monthlyPrice: "$150",
          features: [
            { en: "Everything in Standard, plus:", es: "Todo lo del Estándar, más:" },
            { en: "Unlimited pages & project portfolio", es: "Páginas ilimitadas y portafolio de proyectos" },
            { en: "Blog/news section", es: "Sección de blog/noticias" },
            { en: "Appointment or quote scheduling system", es: "Sistema de citas o cotizaciones en línea" },
            { en: "Google Business Profile setup & optimization", es: "Configuración y optimización de Google Business" },
            { en: "Photo gallery with project filtering", es: "Galería de fotos con filtros por proyecto" },
            { en: "Priority support & faster updates", es: "Soporte prioritario y actualizaciones más rápidas" },
          ],
        },
      ],
      addOns: [
        {
          name: { en: "Google Business Profile Setup", es: "Configuración de Google Business" },
          price: { en: "$100 one-time", es: "$100 pago único" },
        },
        {
          name: { en: "Extra page after launch", es: "Página adicional después del lanzamiento" },
          price: { en: "$75/page", es: "$75/página" },
        },
        {
          name: { en: "Basic logo design", es: "Diseño básico de logo" },
          price: { en: "$150 one-time", es: "$150 pago único" },
        },
        {
          name: { en: "Rush delivery (48 hrs)", es: "Entrega urgente (48 hrs)" },
          price: { en: "+$150", es: "+$150" },
        },
        {
          name: { en: "Bilingual English/Spanish content", es: "Contenido bilingüe inglés/español" },
          price: { en: "Included", es: "Incluido" },
          highlight: true,
        },
      ],
    },
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /home/dacruz117/puente-consulting && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/translations.ts
git commit -m "feat: add es.webDesign translations"
```

---

## Task 4: Update `Navbar.tsx`

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Insert Web Design nav link between Pricing and Translations**

In `src/components/Navbar.tsx`, find the `navLinks` array (~line 12) and insert after the `/services` entry:

```typescript
  const navLinks = [
    { href: "/college-advising", label: t.nav.collegeAdvising },
    { href: "/business-startup", label: t.nav.businessStartup },
    { href: "/services", label: t.nav.pricing },
    { href: "/web-design", label: t.nav.webDesign },
    { href: "/translation-services", label: t.nav.translationServices },
    { href: "/about", label: t.nav.about },
  ];
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /home/dacruz117/puente-consulting && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add Web Design link to navbar"
```

---

## Task 5: Update `Footer.tsx`

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Add Web Design link to Quick Links**

In `src/components/Footer.tsx`, find the Quick Links `<ul>` (~line 33). Add a new `<li>` as the first item (before Translation Services):

```tsx
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/web-design" className="hover:text-white transition-colors">
                  {t.footer.webDesign}
                </Link>
              </li>
              <li>
                <Link href="/translation-services" className="hover:text-white transition-colors">
                  {t.footer.translationServices}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t.footer.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t.footer.contact}
                </Link>
              </li>
            </ul>
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /home/dacruz117/puente-consulting && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Web Design link to footer quick links"
```

---

## Task 6: Create `src/app/web-design/page.tsx`

**Files:**
- Create: `src/app/web-design/page.tsx`

- [ ] **Step 1: Create the directory and page file**

Create `src/app/web-design/page.tsx` with the full content:

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function WebDesignPage() {
  const { t, lang } = useLanguage();
  const wd = t.webDesign;

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
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{wd.heroTitle}</h1>
          <p className="text-xl text-gray-300">{wd.heroSubtitle}</p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {wd.packages.map((pkg, i) => {
              const isPopular = i === 1;
              return (
                <div
                  key={pkg.name}
                  className={`rounded-2xl overflow-hidden flex flex-col relative shadow-sm ${
                    isPopular
                      ? "bg-accent text-white ring-2 ring-accent"
                      : "bg-white border border-gray-100"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                      {wd.mostPopular}
                    </span>
                  )}
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className={`text-xl font-bold mb-4 ${isPopular ? "text-white" : "text-primary"}`}>
                      {pkg.name}
                    </h3>
                    <p className={`text-4xl font-bold mb-1 ${isPopular ? "text-white" : "text-accent"}`}>
                      {pkg.setupPrice}
                    </p>
                    <p className={`text-sm mb-1 ${isPopular ? "text-white/60" : "text-gray-400"}`}>
                      {wd.setupLabel}
                    </p>
                    <p className={`text-lg font-semibold mb-6 ${isPopular ? "text-white/80" : "text-accent"}`}>
                      {pkg.monthlyPrice}{wd.monthlyLabel}
                    </p>
                    <ul className="space-y-3 flex-1 mb-8">
                      {pkg.features.map((f) => (
                        <li key={f.en} className="flex gap-2 items-start">
                          <svg
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isPopular ? "text-yellow-400" : "text-accent"}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className={`text-sm leading-snug ${isPopular ? "text-white" : "text-body"}`}>
                            {lang === "en" ? f.en : f.es}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className={`block text-center font-semibold px-6 py-3 rounded-lg transition-colors ${
                        isPopular
                          ? "bg-white text-accent hover:bg-cream"
                          : "bg-accent text-white hover:bg-accent-light"
                      }`}
                    >
                      {wd.packageCta}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-2">{wd.addOnsTitle}</h2>
          <p className="text-body text-center mb-8">{wd.addOnsSubtitle}</p>
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            {wd.addOns.map((addon, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-4 border-b border-gray-100 last:border-0"
              >
                <span className="text-sm text-body">
                  {lang === "en" ? addon.name.en : addon.name.es}
                </span>
                {"highlight" in addon && addon.highlight ? (
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    {lang === "en" ? addon.price.en : addon.price.es}
                  </span>
                ) : (
                  <span className="font-semibold text-accent text-sm">
                    {lang === "en" ? addon.price.en : addon.price.es}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream border-t border-gray-100 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary mb-3">{wd.ctaHeading}</h2>
          <p className="text-body mb-6">{wd.ctaSub}</p>
          <Link
            href="/contact"
            className="inline-block bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-light transition-colors"
          >
            {wd.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /home/dacruz117/puente-consulting && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/web-design/page.tsx
git commit -m "feat: add web design services pricing page"
```

---

## Task 7: Final build verification

- [ ] **Step 1: Run production build**

```bash
cd /home/dacruz117/puente-consulting && npm run build
```

Expected: build completes with no errors. You should see `/web-design` in the route list.

- [ ] **Step 2: Start dev server and verify visually**

```bash
npm run dev
```

Then open `http://localhost:3000/web-design` and verify:
- Hero shows "Web Design for Local Businesses" over the Austin skyline background
- Three pricing cards render: Basic, Standard (highlighted in accent blue with "Most Popular" badge), Premium
- Each card shows setup price large, monthly price smaller beneath
- Feature list renders with check icons, switches language when toggle is clicked
- Add-Ons section shows 5 rows; "Bilingual English/Spanish content" row shows a green "Included" badge
- CTA banner at bottom
- Navbar shows "Web Design" link between "Pricing" and "Translations"
- Footer Quick Links includes "Web Design Services"
- Toggle to Spanish: all text switches, nav shows "Diseño Web", hero shows "Diseño Web para Negocios Locales"

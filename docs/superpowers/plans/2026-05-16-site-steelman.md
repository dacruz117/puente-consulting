# Site Steelman Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply all pre-launch corrections from the steelman audit — critical fixes, content improvements, and polish — across all five services.

**Architecture:** Nearly all changes live in `src/lib/translations.ts` (single source of truth for all bilingual content) with corresponding component changes. The one structural exception is `src/app/business-startup/page.tsx`, which gets a full rewrite from a generic `ServicePage` wrapper to a bespoke page matching College Advising's depth.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, centralized `translations.ts`.

---

## File Map

| File | What changes |
|------|-------------|
| `src/lib/translations.ts` | Nearly every section — additions and corrections in EN + ES |
| `src/lib/constants.ts` | New file — Calendly URL constant |
| `src/app/page.tsx` | Hero cards grid, cardIcons map, snapshots |
| `src/app/about/page.tsx` | No structural change — driven by translations |
| `src/app/college-advising/page.tsx` | Add `lang` destructure, conditional `heroSubEs` |
| `src/app/business-startup/page.tsx` | Full rewrite (replaces ServicePage usage) |
| `src/app/services/page.tsx` | Remove community credit block; add Translation + Web Design tabs |
| `src/app/web-design/page.tsx` | Add differentiator, how-it-works, turnaround, disclaimer sections |
| `src/app/contact/page.tsx` | Swap column order (Calendly primary), add response time |
| `src/app/translation-services/page.tsx` | No structural change — driven by translations |
| `src/components/ContactForm.tsx` | Add 4 missing service options to dropdown |
| `src/components/ServicePage.tsx` | Delete (unused after business-startup rewrite) |

---

## Task 1: Critical copy corrections in translations.ts

**Files:** `src/lib/translations.ts`

- [ ] **Step 1: Remove community credit from EN**

In `src/lib/translations.ts`, find and delete the entire `communityCredit` block from `en.services.academic`:

```
communityCredit: {
  text: "Community Info Session credit applies",
  description: "If you attended a community session, your $15 fee is credited toward any package booked within 7 days.",
  descriptionEs: "Si asistió a una sesión comunitaria, su pago de $15 se aplica como crédito hacia cualquier paquete reservado dentro de 7 días.",
},
```

- [ ] **Step 2: Remove community credit from ES**

Delete the entire `communityCredit` block from `es.services.academic`:

```
communityCredit: {
  text: "Crédito de sesión comunitaria aplica",
  description: "Si asistió a una sesión comunitaria, su pago de $15 se aplica como crédito hacia cualquier paquete reservado dentro de 7 días.",
  descriptionEs: "If you attended a community session, your $15 fee is credited toward any package booked within 7 days.",
},
```

- [ ] **Step 3: Fix About page — EN credentials and delivery method**

Replace `en.about.paragraphs[2]`:
```
"With a bachelor's degree and professional experience in higher education and administration, I provide patient, bilingual guidance through screen-share or phone support.",
```
With:
```
"With a BBA from Texas A&M University – Central Texas and professional experience as an Enrollment Advisor at TAMUCT, I provide patient, bilingual guidance in person throughout the Austin metro area.",
```

- [ ] **Step 4: Fix About page — ES credentials and delivery method**

Replace `es.about.paragraphs[2]`:
```
"Con una licenciatura y experiencia profesional en educación superior y administración, ofrezco orientación bilingüe paciente a través de llamadas telefónicas o sesiones compartiendo pantalla.",
```
With:
```
"Con una Licenciatura en Administración de Empresas de Texas A&M University – Central Texas y experiencia profesional como Asesor de Inscripciones en TAMUCT, ofrezco orientación bilingüe paciente en persona en toda el área metropolitana de Austin.",
```

- [ ] **Step 5: Fix EN trust pills on home page**

Replace the `trustPills` array in `en.home`:
```
trustPills: [
  "Bachelor's Degree",
  "Higher Ed Administration",
```
With:
```
trustPills: [
  "BBA — Texas A&M Central Texas",
  "TAMUCT Enrollment Advisor",
```

- [ ] **Step 6: Fix ES trust pills on home page**

Replace the `trustPills` array in `es.home`:
```
trustPills: [
  "Licenciatura",
  "Administración de Educación Superior",
```
With:
```
trustPills: [
  "Licenciatura en Administración — TAMUCT",
  "Asesor de Inscripciones en TAMUCT",
```

- [ ] **Step 7: Fix web design Basic plan logo contradiction — EN**

In `en.webDesign.packages[0].features`, replace:
```
{ en: "Logo, services list & photo gallery (up to 10 photos)", es: "Logo, lista de servicios y galería de fotos (hasta 10 fotos)" },
```
With:
```
{ en: "Your logo placed, services list & photo gallery (up to 10 photos)", es: "Su logo colocado, lista de servicios y galería de fotos (hasta 10 fotos)" },
```

- [ ] **Step 8: Fix web design Basic plan logo contradiction — ES**

In `es.webDesign.packages[0].features`, replace:
```
{ en: "Logo, services list & photo gallery (up to 10 photos)", es: "Logo, lista de servicios y galería de fotos (hasta 10 fotos)" },
```
With:
```
{ en: "Your logo placed, services list & photo gallery (up to 10 photos)", es: "Su logo colocado, lista de servicios y galería de fotos (hasta 10 fotos)" },
```

- [ ] **Step 9: Build to verify no TypeScript errors**

```bash
npm run build
```
Expected: build completes with no errors. If you see "communityCredit" referenced anywhere in a component, remove that reference too (see Task 2 Step 1).

- [ ] **Step 10: Commit**

```bash
git add src/lib/translations.ts
git commit -m "fix: correct critical copy — credentials, delivery method, logo contradiction, remove community credit"
```

---

## Task 2: Remove community credit block from services page

**Files:** `src/app/services/page.tsx`

- [ ] **Step 1: Remove the Lightbulb community credit block**

In `src/app/services/page.tsx`, find and delete this block (approximately lines 180–188):

```tsx
{/* Community Credit */}
<div className="max-w-2xl mx-auto bg-white border border-gray-100 rounded-xl p-5 flex gap-4 items-start">
  <Lightbulb className="w-5 h-5 flex-shrink-0 text-accent-light mt-0.5" />
  <div>
    <p className="text-sm font-semibold text-primary mb-1">{s.academic.communityCredit.text}</p>
    <p className="text-xs text-gray-500 leading-relaxed">{s.academic.communityCredit.description}</p>
  </div>
</div>
```

- [ ] **Step 2: Remove unused Lightbulb import**

At the top of `src/app/services/page.tsx`, remove `Lightbulb` from the lucide-react import:
```tsx
// Before
import { Lightbulb } from "lucide-react";

// After — delete the entire import line (it's the only import from lucide-react on this page)
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```
Expected: no errors, no reference to `communityCredit`.

- [ ] **Step 4: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "fix: remove community info session credit block from services page"
```

---

## Task 3: Fix College Advising heroSubEs conditional render

**Files:** `src/app/college-advising/page.tsx`

- [ ] **Step 1: Add `lang` to the useLanguage destructure**

Find:
```tsx
const { t } = useLanguage();
```
Replace with:
```tsx
const { t, lang } = useLanguage();
```

- [ ] **Step 2: Make heroSubEs conditional**

Find:
```tsx
<p className="text-sm text-gray-500 italic mb-8">{ca.heroSubEs}</p>
```
Replace with:
```tsx
{lang === "es" && (
  <p className="text-sm text-gray-500 italic mb-8">{ca.heroSubEs}</p>
)}
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/college-advising/page.tsx
git commit -m "fix: only render heroSubEs in Spanish mode on college advising page"
```

---

## Task 4: Contact form — add missing services

**Files:** `src/lib/translations.ts`, `src/components/ContactForm.tsx`

- [ ] **Step 1: Update EN contactForm translations**

In `en.contactForm`, replace:
```
collegeAdvising: "College Advising",
businessStartup: "Business Start-Up",
both: "Both",
```
With:
```
generalAssistance: "General Assistance",
collegeAdvising: "College Advising",
businessStartup: "Business Start-Up",
translationServices: "Translation Services",
webDesign: "Web Design",
multipleServices: "Multiple Services",
```

- [ ] **Step 2: Update ES contactForm translations**

In `es.contactForm`, replace:
```
collegeAdvising: "Asesoría Universitaria",
businessStartup: "Inicio de Negocios",
both: "Ambos",
```
With:
```
generalAssistance: "Asistencia General",
collegeAdvising: "Asesoría Universitaria",
businessStartup: "Inicio de Negocios",
translationServices: "Servicios de Traducción",
webDesign: "Diseño Web",
multipleServices: "Múltiples Servicios",
```

- [ ] **Step 3: Update ContactForm.tsx select options**

In `src/components/ContactForm.tsx`, replace the entire `<select>` block content:
```tsx
<option value="">{t.contactForm.selectService}</option>
<option value="college-advising">{t.contactForm.collegeAdvising}</option>
<option value="business-startup">{t.contactForm.businessStartup}</option>
<option value="both">{t.contactForm.both}</option>
```
With:
```tsx
<option value="">{t.contactForm.selectService}</option>
<option value="general-assistance">{t.contactForm.generalAssistance}</option>
<option value="college-advising">{t.contactForm.collegeAdvising}</option>
<option value="business-startup">{t.contactForm.businessStartup}</option>
<option value="translation-services">{t.contactForm.translationServices}</option>
<option value="web-design">{t.contactForm.webDesign}</option>
<option value="multiple-services">{t.contactForm.multipleServices}</option>
```

- [ ] **Step 4: Build and verify**

```bash
npm run build
```
Expected: no TypeScript errors. Verify the old `t.contactForm.both` key is gone from the select and there are no remaining references to it.

- [ ] **Step 5: Commit**

```bash
git add src/lib/translations.ts src/components/ContactForm.tsx
git commit -m "fix: add missing services to contact form dropdown"
```

---

## Task 5: Contact page — Calendly constant + response time

**Files:** `src/lib/constants.ts` (new), `src/lib/translations.ts`, `src/app/contact/page.tsx`

- [ ] **Step 1: Create constants file**

Create `src/lib/constants.ts`:
```typescript
export const CALENDLY_URL = "YOUR_CALENDLY_URL";
```

- [ ] **Step 2: Add response time and form label to EN translations**

In `en.contact`, add two new keys:
```
responseTime: "We respond to all messages within 24 hours.",
preferMessage: "Prefer to send a message? Use the form below.",
```

- [ ] **Step 3: Add response time and form label to ES translations**

In `es.contact`, add:
```
responseTime: "Respondemos a todos los mensajes en menos de 24 horas.",
preferMessage: "¿Prefiere enviar un mensaje? Use el formulario a continuación.",
```

- [ ] **Step 4: Update contact/page.tsx — swap columns + add labels**

Replace the entire `src/app/contact/page.tsx` with:

```tsx
"use client";

import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";
import { CALENDLY_URL } from "@/lib/constants";

export default function ContactPage() {
  const { t } = useLanguage();

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.contact.heroTitle}</h1>
          <p className="text-lg text-gray-300">{t.contact.heroSubtitle}</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calendly — primary action */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                {t.contact.bookSession}
              </h2>
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="relative h-48 w-full">
                  <Image
                    src="/laptop-professional.jpg"
                    alt="Professional at laptop"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-8">
                  <p className="text-body mb-4">{t.contact.scheduleText}</p>
                  <div
                    className="calendly-inline-widget"
                    data-url={CALENDLY_URL}
                    style={{ minWidth: "320px", height: "700px" }}
                  />
                  <script
                    type="text/javascript"
                    src="https://assets.calendly.com/assets/external/widget.js"
                    async
                  />
                </div>
              </div>
            </div>

            {/* Contact Form — secondary action */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                {t.contact.sendMessage}
              </h2>
              <p className="text-sm text-gray-500 mb-4">{t.contact.preferMessage}</p>
              <p className="text-body mb-4">
                {t.contact.emailUs}{" "}
                <a
                  href="mailto:info@puenteco.org"
                  className="text-accent hover:underline font-medium"
                >
                  info@puenteco.org
                </a>
              </p>
              <ContactForm />
              <p className="text-xs text-gray-400 text-center mt-4">{t.contact.responseTime}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 5: Build and verify**

```bash
npm run build
```
Expected: no errors. The CALENDLY_URL constant is imported and used in the data-url attribute.

- [ ] **Step 6: Commit**

```bash
git add src/lib/constants.ts src/lib/translations.ts src/app/contact/page.tsx
git commit -m "feat: add Calendly constant, make booking primary action on contact page, add response time"
```

---

## Task 6: Nav rename + Services page new tabs

**Files:** `src/lib/translations.ts`, `src/app/services/page.tsx`

- [ ] **Step 1: Rename nav pricing label — EN**

In `en.nav`, replace:
```
pricing: "Pricing",
```
With:
```
pricing: "Services & Pricing",
```

- [ ] **Step 2: Rename nav pricing label — ES**

In `es.nav`, replace:
```
pricing: "Precios",
```
With:
```
pricing: "Servicios y Precios",
```

- [ ] **Step 3: Add Translation and Web Design tab labels — EN**

In `en.services.tabs`, replace:
```typescript
tabs: {
  general: "General Assistance",
  academic: "Academic Support",
  business: "Business Start-Up",
},
```
With:
```typescript
tabs: {
  general: "General Assistance",
  academic: "Academic Support",
  business: "Business Start-Up",
  translation: "Translation Services",
  webDesign: "Web Design",
},
```

- [ ] **Step 4: Add Translation and Web Design tab labels — ES**

In `es.services.tabs`, replace:
```typescript
tabs: {
  general: "Asistencia General",
  academic: "Apoyo Académico",
  business: "Inicio de Negocio",
},
```
With:
```typescript
tabs: {
  general: "Asistencia General",
  academic: "Apoyo Académico",
  business: "Inicio de Negocio",
  translation: "Servicios de Traducción",
  webDesign: "Diseño Web",
},
```

- [ ] **Step 5: Update Tab type and tabs array in services/page.tsx**

In `src/app/services/page.tsx`, replace:
```tsx
type Tab = "general" | "academic" | "business";
```
With:
```tsx
type Tab = "general" | "academic" | "business" | "translation" | "webDesign";
```

Replace the `tabs` array:
```tsx
const tabs: { key: Tab; label: string }[] = [
  { key: "general", label: s.tabs.general },
  { key: "academic", label: s.tabs.academic },
  { key: "business", label: s.tabs.business },
];
```
With:
```tsx
const tabs: { key: Tab; label: string }[] = [
  { key: "general", label: s.tabs.general },
  { key: "academic", label: s.tabs.academic },
  { key: "business", label: s.tabs.business },
  { key: "translation", label: s.tabs.translation },
  { key: "webDesign", label: s.tabs.webDesign },
];
```

- [ ] **Step 6: Add Translation tab content to services/page.tsx**

After the closing `</>` of the `{activeTab === "business" && ...}` block (before the final CTA section), add:

```tsx
{/* ── TRANSLATION SERVICES TAB ── */}
{activeTab === "translation" && (
  <section className="py-20 bg-cream">
    <div className="max-w-lg mx-auto px-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-accent px-8 py-6 text-center">
          <p className="text-5xl font-bold text-white">$25</p>
          <p className="text-white/70 text-sm mt-1">{s.tabs.general === t.services.tabs.general ? "per hour" : "por hora"}</p>
        </div>
        <div className="p-8">
          <ul className="space-y-3 mb-6">
            {t.translationServices.serviceBullets.map((item) => (
              <li key={item} className="flex gap-2 text-body text-sm">
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 italic mb-6">{t.translationServices.pricingBullets[0]}</p>
          <p className="text-xs text-gray-400 leading-relaxed">{t.translationServices.pricingEstimate}</p>
        </div>
      </div>
    </div>
  </section>
)}
```

Wait — the above has a logic error with the language check. Use `lang` instead. Replace the step above with:

```tsx
{/* ── TRANSLATION SERVICES TAB ── */}
{activeTab === "translation" && (
  <section className="py-20 bg-cream">
    <div className="max-w-lg mx-auto px-4">
      <div className="max-w-xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-primary mb-2">{t.translationServices.servicesTitle}</h2>
        <p className="text-body">{t.translationServices.overviewTagline}</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-accent px-8 py-6 text-center">
          <p className="text-5xl font-bold text-white">$25</p>
          <p className="text-white/70 text-sm mt-1">{lang === "en" ? "per hour" : "por hora"}</p>
        </div>
        <div className="p-8">
          <ul className="space-y-3 mb-6">
            {t.translationServices.serviceBullets.map((item) => (
              <li key={item} className="flex gap-2 text-body text-sm">
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-accent font-medium mb-2">{t.translationServices.pricingBullets[0]}</p>
          <p className="text-xs text-gray-400 leading-relaxed">{t.translationServices.pricingEstimate}</p>
        </div>
      </div>
    </div>
  </section>
)}
```

Verify `lang` is destructured in this file — add it: `const { t, lang } = useLanguage();`

- [ ] **Step 7: Add Web Design tab content to services/page.tsx**

After the Translation tab block, add:

```tsx
{/* ── WEB DESIGN TAB ── */}
{activeTab === "webDesign" && (
  <section className="py-20 bg-cream">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {t.webDesign.packages.map((pkg, i) => {
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
                  {t.webDesign.mostPopular}
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
                  {t.webDesign.setupLabel}
                </p>
                <p className={`text-lg font-semibold mb-6 ${isPopular ? "text-white/80" : "text-accent"}`}>
                  {pkg.monthlyPrice}{t.webDesign.monthlyLabel}
                </p>
                <ul className="space-y-3 flex-1 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f.en} className="flex gap-2 items-start">
                      <svg
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isPopular ? "text-yellow-400" : "text-accent"}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
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
                  href="/web-design"
                  className={`block text-center font-semibold px-6 py-3 rounded-lg transition-colors ${
                    isPopular
                      ? "bg-white text-accent hover:bg-cream"
                      : "bg-accent text-white hover:bg-accent-light"
                  }`}
                >
                  {lang === "en" ? "See Full Details →" : "Ver Detalles Completos →"}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
)}
```

- [ ] **Step 8: Build and verify**

```bash
npm run build
```
Expected: no TypeScript errors. All 5 tabs are in the `Tab` type.

- [ ] **Step 9: Commit**

```bash
git add src/lib/translations.ts src/app/services/page.tsx
git commit -m "feat: rename nav Pricing to Services & Pricing, add Translation and Web Design tabs"
```

---

## Task 7: Home page — Web Design as core pillar

**Files:** `src/lib/translations.ts`, `src/app/page.tsx`

- [ ] **Step 1: Add Web Design hero card — EN**

In `en.home.heroCards`, add a 4th entry after the Business Startup card:
```typescript
{
  name: "Web Design",
  description: "Custom-built websites for local businesses. Not a template — a real site, built for you.",
  priceLabel: "From $300 · See packages →",
  href: "/web-design",
},
```

- [ ] **Step 2: Add Web Design hero card — ES**

In `es.home.heroCards`, add a 4th entry:
```typescript
{
  name: "Diseño Web",
  description: "Sitios web hechos a medida para negocios locales. No una plantilla — un sitio real, construido para ti.",
  priceLabel: "Desde $300 · Ver paquetes →",
  href: "/web-design",
},
```

- [ ] **Step 3: Update snapshots title and add Web Design snapshot — EN**

In `en.home`, replace:
```
snapshotsTitle: "Three ways Puente can help",
```
With:
```
snapshotsTitle: "How Puente can help",
```

Add a Web Design entry to `en.home.snapshots`:
```typescript
{
  tag: "Web Design",
  title: "A Real Website, Not a Template",
  description: "Custom-built, professionally hosted, and maintained for you every month.",
  bullets: [
    "Custom design, not a Wix or Squarespace template",
    "Domain & hosting included",
    "Monthly maintenance included",
    "Bilingual content available",
  ],
  price: "From $300 setup + $75/mo",
  cta: "See packages →",
  href: "/web-design",
  featured: false,
},
```

- [ ] **Step 4: Update snapshots title and add Web Design snapshot — ES**

In `es.home`, replace:
```
snapshotsTitle: "Tres formas en que Puente puede ayudarte",
```
With:
```
snapshotsTitle: "Cómo Puente puede ayudarte",
```

Add to `es.home.snapshots`:
```typescript
{
  tag: "Diseño Web",
  title: "Un Sitio Web Real, No una Plantilla",
  description: "Hecho a medida, alojado profesionalmente y con mantenimiento mensual incluido.",
  bullets: [
    "Diseño personalizado, no una plantilla de Wix",
    "Dominio y alojamiento incluidos",
    "Mantenimiento mensual incluido",
    "Contenido bilingüe disponible",
  ],
  price: "Desde $300 instalación + $75/mes",
  cta: "Ver paquetes →",
  href: "/web-design",
  featured: false,
},
```

- [ ] **Step 5: Update page.tsx — hero card grid and icon**

In `src/app/page.tsx`, add `Monitor` to the lucide-react import:
```tsx
import { ClipboardList, GraduationCap, Briefcase, ChevronDown, Monitor } from "lucide-react";
```

Add Web Design to the `cardIcons` map:
```tsx
const cardIcons = {
  "/services":         <ClipboardList className="w-6 h-6 text-accent-light" />,
  "/college-advising": <GraduationCap className="w-6 h-6 text-accent-light" />,
  "/business-startup": <Briefcase     className="w-6 h-6 text-accent-light" />,
  "/web-design":       <Monitor       className="w-6 h-6 text-accent-light" />,
};
```

Update the hero cards grid from `md:grid-cols-3` to `md:grid-cols-2 lg:grid-cols-4`:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-white/10">
```

- [ ] **Step 6: Build and verify**

```bash
npm run build
```
Expected: no errors. 4 hero cards, Web Design snapshot renders.

- [ ] **Step 7: Commit**

```bash
git add src/lib/translations.ts src/app/page.tsx
git commit -m "feat: add Web Design as core pillar to home page hero cards and service snapshots"
```

---

## Task 8: Business Startup page rewrite

**Files:** `src/lib/translations.ts`, `src/app/business-startup/page.tsx`, `src/components/ServicePage.tsx` (delete)

- [ ] **Step 1: Add EN businessStartup new content to translations.ts**

In `src/lib/translations.ts`, find the `en.businessStartup` object and replace it entirely with:

```typescript
businessStartup: {
  heroTitle: "Business Start-Up",
  heroDescription: "Turn your business idea into reality with a comprehensive, stage-by-stage system covering every step: legal setup, branding, website, sales, finances, and growth.",
  eyebrow: "Business Start-Up Support",
  storyHeading: "Most people never launch. Not because of the idea.",
  storyP1: "Starting a business in the U.S. involves licenses, tax IDs, banking, branding, websites, and systems that no one explains in one place. Most aspiring owners get stuck on step two and never move forward.",
  storyP2: "Puente walks you through every step, in person, in English or Spanish, using a proven 8-stage system built from real startup experience.",
  storyQuote: "I want to open a business but I don't know how to make it official.",
  storyQuoteAttr: "The question Puente was built to answer.",
  stats: [
    { number: "8",     label: "Stages from idea to open for business" },
    { number: "1:1",   label: "Personalized guidance, every session" },
    { number: "EN/ES", label: "Fully bilingual sessions available" },
    { number: "$0",    label: "Intro call, no commitment to get started" },
  ],
  stagesEyebrow: "What We Cover",
  stagesHeading: "The 8-Stage Business Roadmap",
  stagesIntro: "Every business starts at a different point. We identify which stages apply to your situation and build from there. No wasted sessions, no generic checklists.",
  stages: [
    {
      num: "01",
      title: "Idea & Validation",
      description: "Before investing time or money, every business needs a clear concept and a real market. We help you define exactly what your business does, who it serves, and whether there is enough demand to make it worth building. We research competitors, talk through pricing models, and confirm that your idea is viable before you spend a dollar. Most people skip this stage — and it shows.",
      tags: ["Business concept", "Market research", "Feasibility check"],
    },
    {
      num: "02",
      title: "Legal & Structure",
      description: "Getting legal is not optional — it protects you, your customers, and your income. We walk through entity selection (LLC, sole proprietor, or corporation), help you obtain your EIN from the IRS, guide you through opening a dedicated business bank account, and identify any licenses or permits required for your specific industry and city. This stage turns an idea into a real, legitimate business.",
      tags: ["LLC formation", "EIN setup", "Business banking", "Licenses & permits"],
    },
    {
      num: "03",
      title: "Brand & Identity",
      description: "Your brand is how customers recognize and remember you. We help you define your business name, develop a tagline, establish brand colors and visual style, and create a brief elevator pitch you can use anywhere. If you need a logo, we help you brief a designer or connect you with a vendor. By the end of this stage, your business has a face and a voice.",
      tags: ["Business name", "Logo brief", "Brand style", "Elevator pitch"],
    },
    {
      num: "04",
      title: "Digital & Online Presence",
      description: "Customers search online before they call. If you are not findable, you are invisible. We set up your domain, coordinate website development, create a professional email address, establish your Google Business Profile, and configure your social media presence. This stage ensures that when someone in Austin searches for what you offer, they can find you and trust what they see.",
      tags: ["Domain & website", "Google Business", "Social media setup", "Professional email"],
    },
    {
      num: "05",
      title: "Operations & Systems",
      description: "A business that runs on sticky notes and memory does not scale. We set up the core systems that keep your business running smoothly: a CRM for tracking leads and clients, an invoicing tool for getting paid, contract and proposal templates, and the accounting software you will need come tax time. We also review your insurance needs and help you get the right coverage in place.",
      tags: ["CRM setup", "Invoicing & contracts", "Accounting software", "Insurance review"],
    },
    {
      num: "06",
      title: "Sales & Marketing",
      description: "Revenue does not come from having a website — it comes from a sales process. We build your sales workflow from first contact to closed deal, create an outreach sequence for your first prospects, and help you build a list of target customers. If you have never sold before, we walk through the conversation together. By the end of this stage, you are actively talking to potential clients.",
      tags: ["Sales process", "Outreach sequence", "Prospect list", "First clients"],
    },
    {
      num: "07",
      title: "Financial Controls",
      description: "Most small businesses fail because of cash flow problems, not bad products. We help you build a financial model, set your pricing so that you are actually profitable, activate bookkeeping, and create a 90-day cash flow forecast. We also make sure you are ready for quarterly taxes so there are no surprises at year end. This stage gives you the financial visibility to make real decisions.",
      tags: ["Pricing model", "Cash flow tracking", "Bookkeeping", "Tax prep"],
    },
    {
      num: "08",
      title: "Growth & Scale",
      description: "Once you have revenue, the work shifts from launching to growing. We help you document your core processes so the business can run without you doing everything yourself, build a referral strategy to bring in consistent leads, and review your first 90 days to identify what is working and what to change. This stage turns a running business into one that is built to last.",
      tags: ["SOPs", "Referral program", "90-day review", "Systems for growth"],
    },
  ],
  bilingualHeading: "For entrepreneurs who think in Spanish.",
  bilingualP1: "Many first-time business owners in the Austin area are more comfortable planning and thinking in Spanish, even when their business will operate in English. Puente works in both.",
  bilingualP2: "We explain what an LLC is. What an EIN does. What a registered agent means. What bookkeeping actually requires. In whatever language makes you feel confident, not confused.",
  bilingualCta: "Book a bilingual session →",
  bilingualCardLabel: "Terms we explain, in both languages",
  bilingualTerms: [
    { en: "LLC (Limited Liability Company)", es: "LLC (Compañía de Responsabilidad Limitada)" },
    { en: "EIN (Employer Identification Number)", es: "EIN (Número de Identificación del Empleador)" },
    { en: "Registered agent", es: "Agente registrado" },
    { en: "Sole proprietorship", es: "Negocio unipersonal" },
    { en: "Bookkeeping", es: "Contabilidad" },
    { en: "Cash flow", es: "Flujo de efectivo" },
  ],
  processEyebrow: "Our Process",
  processHeading: "How it works",
  processIntro: "Four steps. No guesswork. You always know where you stand and what comes next.",
  processSteps: [
    { num: "1", heading: "We start with a conversation", description: "Free intro call. What's the goal? Where are you now? What does the business need most?" },
    { num: "2", heading: "You get a personalized roadmap", description: "We identify which of the 8 stages apply to your situation and build a timeline around your business, not a generic checklist." },
    { num: "3", heading: "We work through it together", description: "Sessions, deliverables, and real progress at every stage. You are never left guessing what to do next." },
    { num: "4", heading: "You launch with confidence", description: "Not just a plan. A running business, fully set up and ready to generate revenue." },
  ],
  scenarios: [
    {
      label: "Real examples of how clients come to Puente",
      question: "I want to open a cleaning business. I have customers lined up but I don't know how to make it legal or take payments.",
      answer: "We start at Stage 2 (Legal & Structure): entity formation, EIN, business banking. Then Stage 5 (Operations): invoicing setup, contract templates, and payment processing. You go from informal to official in a few sessions.",
      stages: ["Stage 2: Legal & Structure", "Stage 5: Operations & Systems"],
    },
    {
      label: "Another common situation",
      question: "I have a business idea but I don't know if it's viable or how to research the market.",
      answer: "That's Stage 1: Idea & Validation. We define the concept, research the target market, and confirm feasibility before you spend a dollar. No guessing, no wasted money.",
      stages: ["Stage 1: Idea & Validation"],
    },
  ],
  ctaHeading: "Ready to build your business?",
  ctaSub: "The intro call is free. The conversation starts wherever you are.",
  ctaButton: "Book a Free Intro Call →",
  disclaimer: "Puente Bilingual Services provides business startup guidance and informational assistance only. We are not licensed attorneys, CPAs, or financial advisors. All guidance is informational in nature. Clients are responsible for all final decisions, submissions, and legal registrations.",
},
```

- [ ] **Step 2: Add ES businessStartup new content to translations.ts**

In `src/lib/translations.ts`, find the `es.businessStartup` object and replace it entirely with:

```typescript
businessStartup: {
  heroTitle: "Inicio de Negocios",
  heroDescription: "Convierte tu idea de negocio en realidad con un sistema completo, etapa por etapa, que cubre cada paso: estructura legal, marca, sitio web, ventas, finanzas y crecimiento.",
  eyebrow: "Apoyo para Inicio de Negocios",
  storyHeading: "La mayoría nunca lanza su negocio. No es por la idea.",
  storyP1: "Iniciar un negocio en los EE. UU. implica licencias, números de identificación fiscal, cuentas bancarias, marca, sitios web y sistemas que nadie explica en un solo lugar. La mayoría de los emprendedores se quedan atascados en el segundo paso y nunca avanzan.",
  storyP2: "Puente te guía paso a paso, en persona, en inglés o en español, usando un sistema probado de 8 etapas construido a partir de experiencia real en negocios.",
  storyQuote: "Quiero abrir un negocio pero no sé cómo hacerlo oficial.",
  storyQuoteAttr: "La pregunta que Puente nació para responder.",
  stats: [
    { number: "8",     label: "Etapas desde la idea hasta abrir el negocio" },
    { number: "1:1",   label: "Orientación personalizada en cada sesión" },
    { number: "EN/ES", label: "Sesiones completamente bilingües disponibles" },
    { number: "$0",    label: "Llamada inicial, sin compromiso" },
  ],
  stagesEyebrow: "Lo Que Cubrimos",
  stagesHeading: "El Mapa de 8 Etapas para tu Negocio",
  stagesIntro: "Cada negocio comienza en un punto diferente. Identificamos qué etapas aplican a tu situación y construimos desde ahí. Sin sesiones desperdiciadas, sin listas genéricas.",
  stages: [
    {
      num: "01",
      title: "Idea y Validación",
      description: "Antes de invertir tiempo o dinero, todo negocio necesita un concepto claro y un mercado real. Te ayudamos a definir exactamente qué hace tu negocio, a quién sirve y si hay suficiente demanda para que valga la pena construirlo. Investigamos a la competencia, analizamos modelos de precios y confirmamos que tu idea es viable antes de que gastes un peso. La mayoría se salta esta etapa — y se nota.",
      tags: ["Concepto de negocio", "Investigación de mercado", "Verificación de viabilidad"],
    },
    {
      num: "02",
      title: "Legal y Estructura",
      description: "Formalizarse no es opcional: te protege a ti, a tus clientes y a tus ingresos. Te guiamos a través de la selección de entidad (LLC, propietario único o corporación), te ayudamos a obtener tu EIN del IRS, te orientamos para abrir una cuenta bancaria dedicada al negocio e identificamos cualquier licencia o permiso requerido para tu industria y ciudad.",
      tags: ["Formación de LLC", "Trámite de EIN", "Cuenta bancaria", "Licencias y permisos"],
    },
    {
      num: "03",
      title: "Marca e Identidad",
      description: "Tu marca es como los clientes te reconocen y recuerdan. Te ayudamos a definir el nombre de tu negocio, desarrollar un eslogan, establecer colores y estilo visual, y crear un discurso de presentación breve. Si necesitas un logo, te ayudamos a orientar a un diseñador o te conectamos con un proveedor. Al final de esta etapa, tu negocio tiene cara y voz.",
      tags: ["Nombre del negocio", "Brief de logo", "Estilo de marca", "Discurso de presentación"],
    },
    {
      num: "04",
      title: "Presencia Digital y en Línea",
      description: "Los clientes buscan en línea antes de llamar. Si no te pueden encontrar, eres invisible. Configuramos tu dominio, coordinamos el desarrollo del sitio web, creamos un correo electrónico profesional, establecemos tu perfil de Google Business y configuramos tu presencia en redes sociales.",
      tags: ["Dominio y sitio web", "Google Business", "Redes sociales", "Correo profesional"],
    },
    {
      num: "05",
      title: "Operaciones y Sistemas",
      description: "Un negocio que funciona con notas adhesivas y memoria no crece. Configuramos los sistemas básicos: un CRM para rastrear prospectos y clientes, una herramienta de facturación para cobrar, plantillas de contratos y propuestas, y el software de contabilidad que necesitarás en temporada de impuestos.",
      tags: ["Configuración de CRM", "Facturación y contratos", "Software contable", "Revisión de seguros"],
    },
    {
      num: "06",
      title: "Ventas y Marketing",
      description: "Los ingresos no vienen por tener un sitio web — vienen de un proceso de ventas. Construimos tu flujo de ventas desde el primer contacto hasta el trato cerrado, creamos una secuencia de comunicación para tus primeros prospectos y te ayudamos a construir una lista de clientes objetivo.",
      tags: ["Proceso de ventas", "Secuencia de alcance", "Lista de prospectos", "Primeros clientes"],
    },
    {
      num: "07",
      title: "Control Financiero",
      description: "La mayoría de los negocios pequeños fracasan por problemas de flujo de efectivo, no por malos productos. Te ayudamos a construir un modelo financiero, establecer tus precios para que realmente seas rentable, activar la contabilidad y crear un pronóstico de flujo de efectivo de 90 días.",
      tags: ["Modelo de precios", "Seguimiento de flujo de caja", "Contabilidad", "Preparación fiscal"],
    },
    {
      num: "08",
      title: "Crecimiento y Escalabilidad",
      description: "Una vez que tienes ingresos, el trabajo cambia de lanzar a crecer. Te ayudamos a documentar tus procesos principales para que el negocio pueda funcionar sin que hagas todo tú mismo, construir una estrategia de referidos y revisar tus primeros 90 días.",
      tags: ["SOPs", "Programa de referidos", "Revisión a 90 días", "Sistemas para crecer"],
    },
  ],
  bilingualHeading: "Para emprendedores que piensan en español.",
  bilingualP1: "Muchos propietarios de negocios por primera vez en el área de Austin se sienten más cómodos planeando y pensando en español, aunque su negocio opere en inglés. Puente trabaja en ambos idiomas.",
  bilingualP2: "Explicamos qué es una LLC. Qué hace un EIN. Qué significa agente registrado. Qué requiere la contabilidad en realidad. En el idioma que te haga sentir seguro, no confundido.",
  bilingualCta: "Agenda una sesión bilingüe →",
  bilingualCardLabel: "Términos que explicamos, en ambos idiomas",
  bilingualTerms: [
    { en: "LLC (Limited Liability Company)", es: "LLC (Compañía de Responsabilidad Limitada)" },
    { en: "EIN (Employer Identification Number)", es: "EIN (Número de Identificación del Empleador)" },
    { en: "Registered agent", es: "Agente registrado" },
    { en: "Sole proprietorship", es: "Negocio unipersonal" },
    { en: "Bookkeeping", es: "Contabilidad" },
    { en: "Cash flow", es: "Flujo de efectivo" },
  ],
  processEyebrow: "Nuestro Proceso",
  processHeading: "Cómo funciona",
  processIntro: "Cuatro pasos. Sin adivinanzas. Siempre sabes dónde estás y qué viene después.",
  processSteps: [
    { num: "1", heading: "Comenzamos con una conversación", description: "Llamada inicial gratuita. ¿Cuál es la meta? ¿Dónde estás ahora? ¿Qué necesita más el negocio?" },
    { num: "2", heading: "Recibes un mapa personalizado", description: "Identificamos cuáles de las 8 etapas aplican a tu situación y construimos un cronograma alrededor de tu negocio, no una lista genérica." },
    { num: "3", heading: "Lo trabajamos juntos", description: "Sesiones, entregables y progreso real en cada etapa. Nunca te quedas sin saber qué hacer después." },
    { num: "4", heading: "Lanzas con confianza", description: "No solo un plan. Un negocio funcionando, completamente configurado y listo para generar ingresos." },
  ],
  scenarios: [
    {
      label: "Ejemplos reales de cómo los clientes llegan a Puente",
      question: "Quiero abrir un negocio de limpieza. Tengo clientes esperando, pero no sé cómo hacerlo legal ni cómo cobrar.",
      answer: "Empezamos en la Etapa 2 (Legal y Estructura): formación de entidad, EIN, cuenta bancaria. Luego la Etapa 5 (Operaciones): configuración de facturación, plantillas de contratos y procesamiento de pagos. Pasas de informal a oficial en pocas sesiones.",
      stages: ["Etapa 2: Legal y Estructura", "Etapa 5: Operaciones y Sistemas"],
    },
    {
      label: "Otra situación común",
      question: "Tengo una idea de negocio pero no sé si es viable ni cómo investigar el mercado.",
      answer: "Eso es la Etapa 1: Idea y Validación. Definimos el concepto, investigamos el mercado objetivo y confirmamos la viabilidad antes de que gastes un peso. Sin suposiciones, sin dinero malgastado.",
      stages: ["Etapa 1: Idea y Validación"],
    },
  ],
  ctaHeading: "¿Listo para construir tu negocio?",
  ctaSub: "La llamada inicial es gratis. La conversación comienza donde estás.",
  ctaButton: "Agenda una Llamada Gratuita →",
  disclaimer: "Puente Bilingual Services brinda orientación para inicio de negocios y asistencia informativa únicamente. No somos abogados, CPAs ni asesores financieros con licencia. Toda orientación es de carácter informativo. Los clientes son responsables de todas las decisiones, presentaciones y registros legales finales.",
},
```

- [ ] **Step 3: Rewrite src/app/business-startup/page.tsx**

Replace the entire file with:

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import { useLanguage } from "@/context/LanguageContext";

export default function BusinessStartupPage() {
  const { t } = useLanguage();
  const bs = t.businessStartup;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary text-white py-24 overflow-hidden">
        <Image
          src="/austin-skyline.jpg"
          alt="Austin skyline"
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <p className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-light border border-accent-light/30 bg-white/5 px-4 py-1.5 rounded-full mb-6">
            {bs.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{bs.heroTitle}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">{bs.heroDescription}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-cream transition-colors"
            >
              {bs.ctaButton}
            </Link>
            <Link
              href="/services"
              className="border border-white/30 text-white px-6 py-3 rounded-lg hover:border-white transition-colors"
            >
              {lang === "en" ? "See Pricing →" : "Ver Precios →"}
            </Link>
          </div>
        </div>
      </section>

      {/* Story Block */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4 leading-snug">{bs.storyHeading}</h2>
              <p className="text-body mb-4">{bs.storyP1}</p>
              <p className="text-body mb-6">{bs.storyP2}</p>
              <div className="border-l-4 border-accent bg-cream rounded-r-xl p-5">
                <p className="text-primary italic leading-relaxed mb-2">&#8220;{bs.storyQuote}&#8221;</p>
                <p className="text-sm text-gray-400">{bs.storyQuoteAttr}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {bs.stats.map((stat) => (
                <div key={stat.label} className="bg-cream border border-gray-100 rounded-xl p-5">
                  <p className="text-3xl font-bold text-primary mb-1 leading-none">{stat.number}</p>
                  <p className="text-xs text-gray-400 leading-snug mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-100" />

      {/* 8-Stage Roadmap */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
            {bs.stagesEyebrow}
          </p>
          <h2 className="text-3xl font-bold text-primary mb-3">{bs.stagesHeading}</h2>
          <p className="text-body mb-12 max-w-xl">{bs.stagesIntro}</p>

          <div className="divide-y divide-gray-100">
            {bs.stages.map((stage) => (
              <div key={stage.num} className="grid grid-cols-[64px_1fr] gap-6 py-8 items-start">
                <p className="text-5xl font-light text-accent-light leading-none pt-1">{stage.num}</p>
                <div>
                  <h3 className="text-base font-semibold text-primary mb-2">{stage.title}</h3>
                  <p className="text-sm text-body leading-relaxed mb-3">{stage.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {stage.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-accent bg-blue-50 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-gray-100" />

      {/* Bilingual Block */}
      <section className="bg-primary py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4 leading-snug">{bs.bilingualHeading}</h2>
              <p className="text-gray-400 mb-4">{bs.bilingualP1}</p>
              <p className="text-gray-400 mb-8">{bs.bilingualP2}</p>
              <Link
                href="/contact"
                className="inline-block bg-accent text-white font-semibold px-6 py-3 rounded-lg hover:bg-accent-light transition-colors"
              >
                {bs.bilingualCta}
              </Link>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xs font-semibold tracking-widest uppercase text-accent-light mb-4">
                {bs.bilingualCardLabel}
              </p>
              <div className="divide-y divide-white/10">
                {bs.bilingualTerms.map((term) => (
                  <div key={term.en} className="flex gap-4 py-3">
                    <span className="text-sm text-white/80 flex-1">{term.en}</span>
                    <span className="text-sm text-white/40 flex-1 italic">{term.es}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works + Scenarios */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
            {bs.processEyebrow}
          </p>
          <h2 className="text-3xl font-bold text-primary mb-3">{bs.processHeading}</h2>
          <p className="text-body mb-10 max-w-xl">{bs.processIntro}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden">
            {bs.processSteps.map((step) => (
              <div key={step.num} className="bg-white p-6">
                <p className="text-2xl font-bold text-accent mb-3">{step.num}</p>
                <h4 className="text-sm font-semibold text-primary mb-2">{step.heading}</h4>
                <p className="text-xs text-body leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {bs.scenarios.map((scenario, i) => (
            <div key={i} className="mt-6 bg-white border border-gray-100 rounded-2xl p-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
                {scenario.label}
              </p>
              <p className="text-lg italic text-primary mb-4 leading-relaxed">
                &#8220;{scenario.question}&#8221;
              </p>
              <p className="text-sm text-body leading-relaxed">{scenario.answer}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {scenario.stages.map((s) => (
                  <span key={s} className="text-xs text-body border border-gray-200 px-3 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABanner heading={bs.ctaHeading} buttonText={bs.ctaButton} href="/contact" />

      {/* Disclaimer */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
          {bs.disclaimer}
        </p>
      </div>
    </>
  );
}
```

Note: This page references `lang` — add it to the destructure:
```tsx
const { t, lang } = useLanguage();
```

- [ ] **Step 4: Delete ServicePage component**

Delete `src/components/ServicePage.tsx` — it is no longer used by any page after this rewrite.

```bash
rm src/components/ServicePage.tsx
```

- [ ] **Step 5: Build and verify**

```bash
npm run build
```
Expected: no errors, no references to ServicePage remaining. If any import of ServicePage exists elsewhere, remove it.

- [ ] **Step 6: Commit**

```bash
git add src/lib/translations.ts src/app/business-startup/page.tsx
git rm src/components/ServicePage.tsx
git commit -m "feat: rewrite Business Startup page with full stage detail, bilingual block, and customer scenarios"
```

---

## Task 9: Web Design page expansion

**Files:** `src/lib/translations.ts`, `src/app/web-design/page.tsx`

- [ ] **Step 1: Add differentiator + how-it-works content to EN webDesign**

In `en.webDesign`, add after `ctaButton`:
```typescript
differentiatorHeading: "Not a template. A real website.",
differentiatorP1: "Most budget website options give you a drag-and-drop template and leave you to figure out the rest. Puente builds your site from scratch — custom design, clean code, version-controlled, and hosted professionally.",
differentiatorP2: "You get a site that looks like your business, not like everyone else's.",
differentiatorBullets: [
  "Custom-built, not a Wix or Squarespace template",
  "Hosted on professional infrastructure",
  "Version-controlled — your site is never lost",
  "Monthly maintenance included in every plan",
],
howItWorksHeading: "How it works",
howItWorksSteps: [
  { num: "1", heading: "Kickoff meeting", description: "In person, Austin metro. We review your brand, gather content, and agree on the design direction." },
  { num: "2", heading: "Build", description: "Your site is built and shared for review within the agreed timeline." },
  { num: "3", heading: "Revisions", description: "We incorporate your feedback. Two rounds of revisions are included in all plans." },
  { num: "4", heading: "Launch & maintain", description: "We go live and handle ongoing updates every month." },
],
turnaroundNote: "Most Basic sites launch within 2 weeks. Standard and Premium projects typically run 3–4 weeks depending on content.",
disclaimer: "All websites are built to the specifications agreed upon at project kickoff. Puente Bilingual Services does not guarantee specific business outcomes from web presence. Monthly maintenance covers routine updates and content changes; major redesigns are scoped separately.",
```

- [ ] **Step 2: Add differentiator + how-it-works content to ES webDesign**

In `es.webDesign`, add after `ctaButton`:
```typescript
differentiatorHeading: "No una plantilla. Un sitio web real.",
differentiatorP1: "La mayoría de las opciones económicas te dan una plantilla de arrastrar y soltar y te dejan resolverlo solo. Puente construye tu sitio desde cero — diseño personalizado, código limpio, controlado por versión y alojado profesionalmente.",
differentiatorP2: "Obtienes un sitio que se parece a tu negocio, no al de todos los demás.",
differentiatorBullets: [
  "Hecho a medida, no una plantilla de Wix o Squarespace",
  "Alojado en infraestructura profesional",
  "Controlado por versión — tu sitio nunca se pierde",
  "Mantenimiento mensual incluido en todos los planes",
],
howItWorksHeading: "Cómo funciona",
howItWorksSteps: [
  { num: "1", heading: "Reunión inicial", description: "En persona, área metropolitana de Austin. Revisamos tu marca, recopilamos contenido y acordamos la dirección del diseño." },
  { num: "2", heading: "Construcción", description: "Tu sitio se construye y se comparte para revisión dentro del plazo acordado." },
  { num: "3", heading: "Revisiones", description: "Incorporamos tus comentarios. Dos rondas de revisiones están incluidas en todos los planes." },
  { num: "4", heading: "Lanzamiento y mantenimiento", description: "Salimos en vivo y gestionamos las actualizaciones continuas cada mes." },
],
turnaroundNote: "La mayoría de los sitios Basic se lanzan en 2 semanas. Los proyectos Standard y Premium suelen tomar 3 a 4 semanas según el contenido.",
disclaimer: "Todos los sitios web se construyen según las especificaciones acordadas en la reunión inicial. Puente Bilingual Services no garantiza resultados comerciales específicos derivados de la presencia web. El mantenimiento mensual cubre actualizaciones de rutina y cambios de contenido; los rediseños importantes se presupuestan por separado.",
```

- [ ] **Step 3: Update web-design/page.tsx to add new sections**

Replace the full `src/app/web-design/page.tsx` with:

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import CheckIcon from "@/components/CheckIcon";
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

      {/* Differentiator */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">{wd.differentiatorHeading}</h2>
              <p className="text-body mb-4">{wd.differentiatorP1}</p>
              <p className="text-body mb-6">{wd.differentiatorP2}</p>
            </div>
            <ul className="space-y-3">
              {wd.differentiatorBullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 items-start text-body">
                  <CheckIcon />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
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
          <p className="text-center text-xs text-gray-500 italic mt-8">{wd.turnaroundNote}</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-10">{wd.howItWorksHeading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden">
            {wd.howItWorksSteps.map((step) => (
              <div key={step.num} className="bg-white p-6">
                <p className="text-2xl font-bold text-accent mb-3">{step.num}</p>
                <h4 className="text-sm font-semibold text-primary mb-2">{step.heading}</h4>
                <p className="text-xs text-body leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-16 bg-cream">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-2">{wd.addOnsTitle}</h2>
          <p className="text-body text-center mb-8">{wd.addOnsSubtitle}</p>
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            {wd.addOns.map((addon) => (
              <div
                key={addon.name.en}
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
      <section className="py-16 bg-white border-t border-gray-100 text-center">
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

      {/* Disclaimer */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
          {wd.disclaimer}
        </p>
      </div>
    </>
  );
}
```

- [ ] **Step 4: Build and verify**

```bash
npm run build
```
Expected: no errors. `CheckIcon` is imported; verify it is already exported from `src/components/CheckIcon.tsx`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/translations.ts src/app/web-design/page.tsx
git commit -m "feat: add differentiator, how-it-works, and disclaimer to web design page"
```

---

## Task 10: College Advising + About copy fixes

**Files:** `src/lib/translations.ts`

- [ ] **Step 1: Fix College Advising stats[0] — EN**

In `en.collegeAdvising.stats`, replace:
```
{ number: "7", label: "Stages of support, from direction to graduation" },
```
With:
```
{ number: "7", label: "Stages of support, from first question to first day of class" },
```

- [ ] **Step 2: Fix College Advising stats[0] — ES**

In `es.collegeAdvising.stats`, replace:
```
{ number: "7", label: "Etapas de apoyo, desde la dirección hasta la graduación" },
```
With:
```
{ number: "7", label: "Etapas de apoyo, desde la primera pregunta hasta el primer día de clases" },
```

- [ ] **Step 3: Fix College Advising Stage 7 description — EN**

In `en.collegeAdvising.stages[6].description`, prepend:
```
"Already enrolled? This stage is for students navigating university from the inside. "
```

Full new value:
```
"Already enrolled? This stage is for students navigating university from the inside. For students already enrolled who need guidance navigating the university from the inside, communicating with professors, managing time, understanding financial aid issues, resolving holds, or dealing with the registrar. Universities are complex. We help students work them.",
```

- [ ] **Step 4: Fix College Advising Stage 7 description — ES**

In `es.collegeAdvising.stages[6].description`, prepend:
```
"¿Ya inscrito? Esta etapa es para estudiantes que navegan la universidad desde adentro. "
```

Full new value:
```
"¿Ya inscrito? Esta etapa es para estudiantes que navegan la universidad desde adentro. Para estudiantes ya inscritos que necesitan orientación para comunicarse con profesores, manejar el tiempo, entender problemas de ayuda financiera, resolver bloqueos o tratar con el registrador. Las universidades son complejas. Ayudamos a los estudiantes a trabajarlas.",
```

- [ ] **Step 5: Build and verify**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib/translations.ts
git commit -m "fix: correct college advising stats label and add Stage 7 enrollment clarification"
```

---

## Task 11: À la carte savings

**Files:** `src/lib/translations.ts`, `src/app/services/page.tsx`

- [ ] **Step 1: Add savings field to EN academic à la carte stages**

In `en.services.academic.alaCarte.stages`, add a `savings` field to each stage:

```typescript
// Stage 1 — Direction & Discovery
savings: "Save $19 vs. individual items",

// Stage 2 — College List & Research
savings: "Save $25 vs. individual items",

// Stage 3 — Applications & Documents
savings: "Save $19 vs. individual items",

// Stage 4 — Essays & Personal Statement
savings: "Save $42 vs. individual items",

// Stage 5 — Financial Aid & FAFSA
savings: "Save $50 vs. individual items",

// Stage 6 — Acceptance & Enrollment
savings: "Save $19 vs. individual items",

// Stage 7 — College Success
savings: "Save $19 vs. individual items",
```

- [ ] **Step 2: Add savings field to ES academic à la carte stages**

In `es.services.academic.alaCarte.stages`, add the same `savings` field to each stage (same EN text — savings labels are currency amounts, language-agnostic in this context, but provide ES versions):

```typescript
// All 7 stages — add the corresponding Spanish savings string:
// Stage 1: savings: "Ahorra $19 al comprar la etapa completa",
// Stage 2: savings: "Ahorra $25 al comprar la etapa completa",
// Stage 3: savings: "Ahorra $19 al comprar la etapa completa",
// Stage 4: savings: "Ahorra $42 al comprar la etapa completa",
// Stage 5: savings: "Ahorra $50 al comprar la etapa completa",
// Stage 6: savings: "Ahorra $19 al comprar la etapa completa",
// Stage 7: savings: "Ahorra $19 al comprar la etapa completa",
```

Note: The ES section's alaCarte.stages use the same object structure as EN. Add `savings` to each.

- [ ] **Step 3: Add savings field to EN business à la carte stages**

In `en.services.business.alaCarte.stages`:
```typescript
// Stage 1 — Idea & Validation:       savings: "Save $94 vs. individual items",
// Stage 2 — Legal & Structure:        savings: "Save $74 vs. individual items",
// Stage 3 — Brand & Identity:         savings: "Save $124 vs. individual items",
// Stage 4 — Digital & Online:         savings: "Save $194 vs. individual items",
// Stage 5 — Operations & Systems:     savings: "Save $144 vs. individual items",
// Stage 6 — Sales & Marketing:        savings: "Save $144 vs. individual items",
// Stage 7 — Financial Controls:       savings: "Save $164 vs. individual items",
// Stage 8 — Growth & Scale:           savings: "Save $294 vs. individual items",
```

- [ ] **Step 4: Add savings field to ES business à la carte stages**

In `es.services.business.alaCarte.stages`:
```typescript
// Stage 1: savings: "Ahorra $94 al comprar la etapa completa",
// Stage 2: savings: "Ahorra $74 al comprar la etapa completa",
// Stage 3: savings: "Ahorra $124 al comprar la etapa completa",
// Stage 4: savings: "Ahorra $194 al comprar la etapa completa",
// Stage 5: savings: "Ahorra $144 al comprar la etapa completa",
// Stage 6: savings: "Ahorra $144 al comprar la etapa completa",
// Stage 7: savings: "Ahorra $164 al comprar la etapa completa",
// Stage 8: savings: "Ahorra $294 al comprar la etapa completa",
```

- [ ] **Step 5: Render savings in academic à la carte cards**

In `src/app/services/page.tsx`, find the academic à la carte stage card's full-stage footer (the `border-t` block):

```tsx
<div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm font-bold">
  <span className="text-primary">{stage.fullLabel}</span>
  <span className="text-accent">{stage.fullPrice}</span>
</div>
```

Replace with:
```tsx
<div className="mt-4 pt-4 border-t border-gray-200">
  <div className="flex justify-between text-sm font-bold mb-1">
    <span className="text-primary">{stage.fullLabel}</span>
    <span className="text-accent">{stage.fullPrice}</span>
  </div>
  <p className="text-xs text-green-600 font-medium">{stage.savings}</p>
</div>
```

- [ ] **Step 6: Render savings in business à la carte cards**

The business à la carte renders the same pattern. Find the identical `border-t` block in the business section and apply the same replacement.

- [ ] **Step 7: Build and verify**

```bash
npm run build
```
Expected: TypeScript will surface if `savings` is not present on the type. Fix by ensuring all stage objects have the `savings` field added.

- [ ] **Step 8: Commit**

```bash
git add src/lib/translations.ts src/app/services/page.tsx
git commit -m "feat: show savings vs. individual items on all à la carte stage cards"
```

---

## Task 12: Tier 3 polish

**Files:** `src/lib/translations.ts`

- [ ] **Step 1: Fix founding notes — both EN and ES, both Academic and Business**

In `en.services.academic`, replace:
```
foundingNote: "Founding client pricing, limited spots. Rate increases once filled.",
```
With:
```
foundingNote: "Founding client pricing — limited to 5 spots. Rate increases once spots are filled.",
```

In `es.services.academic`, replace:
```
foundingNote: "Precios de cliente fundador, lugares limitados. La tarifa sube cuando se llenen.",
```
With:
```
foundingNote: "Precios de cliente fundador — limitado a 5 cupos. La tarifa sube cuando se llenen.",
```

In `en.services.business`, replace:
```
foundingNote: "Founding client pricing, limited to 3 spots. Rate increases once spots are filled.",
```
With:
```
foundingNote: "Founding client pricing — limited to 5 spots. Rate increases once spots are filled.",
```

In `es.services.business`, replace:
```
foundingNote: "Precios de cliente fundador, limitado a 3 cupos. El precio aumenta una vez que los cupos se llenen.",
```
With:
```
foundingNote: "Precios de cliente fundador — limitado a 5 cupos. El precio aumenta una vez que se llenen.",
```

- [ ] **Step 2: Fix Translation Services CTA button — EN and ES**

In `en.translationServices`, replace:
```
ctaButton: "Book your translation session today.",
```
With:
```
ctaButton: "Book a Translation Session →",
```

In `es.translationServices`, replace:
```
ctaButton: "Agende su sesión hoy mismo.",
```
With:
```
ctaButton: "Agenda tu sesión de traducción →",
```

- [ ] **Step 3: Fix Translation Services pricing bullets — EN and ES**

In `en.translationServices.pricingBullets`, replace:
```
"Per-document pricing available upon review",
```
With:
```
"Most personal letters and short documents: 1–2 hours. Longer documents are quoted before any work begins.",
```

In `es.translationServices.pricingBullets`, replace:
```
"Precio por documento disponible tras revisión",
```
With:
```
"La mayoría de las cartas personales y documentos cortos: 1–2 horas. Los documentos más largos se cotizan antes de comenzar cualquier trabajo.",
```

- [ ] **Step 4: Update "109-step system" copy — EN home and EN businessStartup**

In `en.home.snapshots` (Business Start-Up card description), replace:
```
"A proven 8-stage system covering everything from legal setup to first revenue.",
```
With:
```
"A comprehensive, stage-by-stage system covering everything from legal setup to first revenue.",
```

In `en.home.heroCards` (Business Start-Up card description), replace:
```
"Idea to open for business. Eight stages, 109 steps, done with you.",
```
With:
```
"Idea to open for business. Eight stages, done with you.",
```

In `es.home.heroCards` (Inicio de Negocio description), replace:
```
"De la idea a abrir el negocio. Ocho etapas, 109 pasos, contigo.",
```
With:
```
"De la idea a abrir el negocio. Ocho etapas, contigo.",
```

- [ ] **Step 5: Build and verify**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib/translations.ts
git commit -m "fix: polish — founding notes (5 spots), translation CTA, pricing ballpark, remove 109-step claim"
```

---

## Task 13: Testimonials placeholder structure

**Files:** `src/lib/translations.ts`, `src/app/page.tsx`, `src/app/college-advising/page.tsx`, `src/app/business-startup/page.tsx`, `src/app/web-design/page.tsx`

- [ ] **Step 1: Add testimonials data structure to EN translations**

Add a top-level `testimonials` key to `en`:
```typescript
testimonials: {
  heading: "What clients are saying",
  comingSoon: "Reviews coming soon — currently accepting founding clients.",
  items: [] as { name: string; quote: string; service: string }[],
},
```

- [ ] **Step 2: Add testimonials data structure to ES translations**

Add to `es`:
```typescript
testimonials: {
  heading: "Lo que dicen nuestros clientes",
  comingSoon: "Opiniones próximamente — actualmente aceptando clientes fundadores.",
  items: [] as { name: string; quote: string; service: string }[],
},
```

- [ ] **Step 3: Add testimonials section to home page**

In `src/app/page.tsx`, after the Trust Block section and before `<CTABanner />`, add:

```tsx
{/* ── TESTIMONIALS ── */}
<section className="bg-cream py-16">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold text-primary mb-6">{t.testimonials.heading}</h2>
    {t.testimonials.items.length === 0 ? (
      <p className="text-body italic">{t.testimonials.comingSoon}</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {t.testimonials.items.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 text-left">
            <p className="text-body italic mb-4">&#8220;{item.quote}&#8221;</p>
            <p className="text-sm font-semibold text-primary">{item.name}</p>
            <p className="text-xs text-gray-400">{item.service}</p>
          </div>
        ))}
      </div>
    )}
  </div>
</section>
```

- [ ] **Step 4: Add testimonials section to college-advising, business-startup, and web-design pages**

In each of `src/app/college-advising/page.tsx`, `src/app/business-startup/page.tsx`, and `src/app/web-design/page.tsx`, add the same testimonials section immediately before the final `<CTABanner />` or CTA section:

```tsx
{/* Testimonials */}
{t.testimonials.items.length === 0 ? null : (
  <section className="bg-cream py-16">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-primary mb-6">{t.testimonials.heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {t.testimonials.items.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 text-left">
            <p className="text-body italic mb-4">&#8220;{item.quote}&#8221;</p>
            <p className="text-sm font-semibold text-primary">{item.name}</p>
            <p className="text-xs text-gray-400">{item.service}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)}
```

Note: On the home page, show the "coming soon" message even when empty (it's a marketing signal). On individual service pages, hide the section entirely when empty — no coming-soon message needed there.

- [ ] **Step 5: Build and verify**

```bash
npm run build
```
Expected: no errors. The `items: []` empty array renders no cards on service pages and renders the coming-soon message on the home page.

- [ ] **Step 6: Commit**

```bash
git add src/lib/translations.ts src/app/page.tsx src/app/college-advising/page.tsx src/app/business-startup/page.tsx src/app/web-design/page.tsx
git commit -m "feat: add testimonials placeholder structure — shows coming soon on home, hides on service pages until populated"
```

---

## Self-Review Checklist

Spec section → Plan task mapping:

| Spec item | Task |
|-----------|------|
| 1.1 About page factual corrections | Task 1 (Steps 3–6) |
| 1.2 Contact form missing services | Task 4 |
| 1.3 Calendly integration | Task 5 |
| 1.4 Remove community credit | Tasks 1 + 2 |
| 1.5 Web design logo contradiction | Task 1 (Steps 7–8) |
| 1.6 heroSubEs conditional render | Task 3 |
| 2.1 Nav rename + services tabs | Task 6 |
| 2.2 Home page web design | Task 7 |
| 2.3 Business Startup rewrite | Task 8 |
| 2.4 Web Design page expansion | Task 9 |
| 2.5 College Advising Stage 7 + stats | Task 10 |
| 2.6 À la carte savings | Task 11 |
| 2.7 About page service area | Task 1 (Steps 3–4) |
| 3.1 Testimonials placeholder | Task 13 |
| 3.2 Translation pricing ballpark | Task 12 (Step 3) |
| 3.3 Founding notes consistent | Task 12 (Step 1) |
| 3.4 Response time on contact page | Task 5 |
| 3.5 Translation CTA button | Task 12 (Step 2) |
| 3.6 109 steps copy | Task 12 (Step 4) |
| 3.7 Web Design disclaimer | Task 9 |

All 18 spec items covered. ✓

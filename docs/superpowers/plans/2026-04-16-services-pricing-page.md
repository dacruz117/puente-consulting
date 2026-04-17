# Services & Pricing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fully bilingual `/services` pricing page and update the `/business-startup` page to reflect the 8-stage framework.

**Architecture:** Self-contained `src/app/services/page.tsx` page with all content sourced from `translations.ts`. The existing `ServicePage` component gets a minor extension (`ctaBannerProps`) so the Business Start-Up page can link to `/services`. Nav gets one new link. No new shared components.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, custom `LanguageContext` / `translations.ts` for bilingual content.

---

## File Map

| File | Action | What changes |
|------|--------|--------------|
| `src/lib/translations.ts` | Modify | Add `nav.pricing`/`nav.precios`; update `businessStartup` (stages, processSteps, heroDescription, seePricingHeading, seePricingButton); add full `services` section (EN + ES) |
| `src/components/Navbar.tsx` | Modify | Add Pricing link to `navLinks` array |
| `src/components/ServicePage.tsx` | Modify | Add optional `ctaBannerProps` prop, pass to `<CTABanner>` |
| `src/app/business-startup/page.tsx` | Modify | Use `t.businessStartup.stages` + pass `ctaBannerProps` to ServicePage |
| `src/app/services/page.tsx` | Create | Full pricing page: hero, package cards, à la carte grid, how it works, CTA |

---

## Task 1: Add nav translations + update Navbar

**Files:**
- Modify: `src/lib/translations.ts`
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Add `pricing` key to `en.nav` in translations.ts**

In `src/lib/translations.ts`, inside `en: { nav: { ... } }`, add after `contact`:
```typescript
      pricing: "Pricing",
```

- [ ] **Step 2: Add `precios` key to `es.nav` in translations.ts**

In `src/lib/translations.ts`, inside `es: { nav: { ... } }`, add after `contact`:
```typescript
      pricing: "Precios",
```

- [ ] **Step 3: Add Pricing link to Navbar**

In `src/components/Navbar.tsx`, inside the `navLinks` array, add after the `business-startup` entry:
```typescript
    { href: "/services", label: t.nav.pricing },
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /home/dacruz117/puente-consulting && npm run build 2>&1 | tail -20
```
Expected: build succeeds (or only pre-existing errors, none new).

- [ ] **Step 5: Commit**

```bash
git add src/lib/translations.ts src/components/Navbar.tsx
git commit -m "feat: add Pricing nav link (EN/ES)"
```

---

## Task 2: Update BusinessStartup translations (EN)

**Files:**
- Modify: `src/lib/translations.ts`

- [ ] **Step 1: Replace `en.businessStartup` with the updated content**

Replace the entire `businessStartup` block inside `en: { ... }` with:

```typescript
    businessStartup: {
      heroTitle: "Business Start-Up",
      heroDescription:
        "Turn your business idea into reality with a proven 109-step system covering every stage — from legal setup and branding to sales, finances, and growth.",
      seePricingHeading: "View our full services & packages",
      seePricingButton: "See Pricing →",
      stages: [
        {
          title: "Stage 1 — Idea & Validation",
          description:
            "Business concept defined, market researched, feasibility confirmed.",
        },
        {
          title: "Stage 2 — Legal & Structure",
          description:
            "Entity formed, EIN obtained, licenses secured, bank account open.",
        },
        {
          title: "Stage 3 — Brand & Identity",
          description:
            "Name, logo, tagline, brand colors, business cards, and elevator pitch done.",
        },
        {
          title: "Stage 4 — Digital & Online Presence",
          description:
            "Domain, website, email, social media profiles, and Google Business set up.",
        },
        {
          title: "Stage 5 — Operations & Systems",
          description:
            "Phone, CRM, invoicing, templates, insurance, and accounting software in place.",
        },
        {
          title: "Stage 6 — Sales & Marketing",
          description:
            "Sales process defined, outreach started, first prospects contacted.",
        },
        {
          title: "Stage 7 — Financial Controls",
          description:
            "Bookkeeping active, pricing set, cash flow tracked, tax prep started.",
        },
        {
          title: "Stage 8 — Growth & Scale",
          description:
            "First revenue earned, team or contractors hired, systems being optimized.",
        },
      ],
      processSteps: [
        {
          step: 1,
          title: "Assess Your Starting Point",
          description:
            "We review where you are and what you need to move forward.",
        },
        {
          step: 2,
          title: "Map the Stages You Need",
          description:
            "We identify which of the 8 stages apply to your situation and build your roadmap.",
        },
        {
          step: 3,
          title: "Execute Stage by Stage",
          description:
            "We work through each stage together with structured sessions and ongoing support.",
        },
        {
          step: 4,
          title: "Launch with Confidence",
          description:
            "You finish with a running business — not just a well-planned idea.",
        },
      ],
    },
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/dacruz117/puente-consulting && npm run build 2>&1 | tail -20
```
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/lib/translations.ts
git commit -m "feat: update business-startup translations with 8-stage framework (EN)"
```

---

## Task 3: Update BusinessStartup translations (ES)

**Files:**
- Modify: `src/lib/translations.ts`

- [ ] **Step 1: Replace `es.businessStartup` with the updated content**

Replace the entire `businessStartup` block inside `es: { ... }` with:

```typescript
    businessStartup: {
      heroTitle: "Inicio de Negocios",
      heroDescription:
        "Convierte tu idea de negocio en realidad con un sistema probado de 109 pasos que cubre cada etapa — desde la estructura legal y la marca hasta las ventas, las finanzas y el crecimiento.",
      seePricingHeading: "Ve nuestros servicios y paquetes completos",
      seePricingButton: "Ver Precios →",
      stages: [
        {
          title: "Etapa 1 — Idea y Validación",
          description:
            "Concepto de negocio definido, mercado investigado, factibilidad confirmada.",
        },
        {
          title: "Etapa 2 — Legal y Estructura",
          description:
            "Entidad formada, EIN obtenido, licencias aseguradas, cuenta bancaria abierta.",
        },
        {
          title: "Etapa 3 — Marca e Identidad",
          description:
            "Nombre, logo, eslogan, colores de marca, tarjetas de presentación y discurso de presentación listos.",
        },
        {
          title: "Etapa 4 — Presencia Digital y en Línea",
          description:
            "Dominio, sitio web, correo, perfiles de redes sociales y Google Business configurados.",
        },
        {
          title: "Etapa 5 — Operaciones y Sistemas",
          description:
            "Teléfono, CRM, facturación, plantillas, seguro y software contable en su lugar.",
        },
        {
          title: "Etapa 6 — Ventas y Marketing",
          description:
            "Proceso de ventas definido, difusión iniciada, primeros prospectos contactados.",
        },
        {
          title: "Etapa 7 — Control Financiero",
          description:
            "Contabilidad activa, precios establecidos, flujo de caja monitoreado, preparación fiscal iniciada.",
        },
        {
          title: "Etapa 8 — Crecimiento y Escalabilidad",
          description:
            "Primeros ingresos obtenidos, equipo o contratistas contratados, sistemas en optimización.",
        },
      ],
      processSteps: [
        {
          step: 1,
          title: "Evaluamos tu punto de partida",
          description:
            "Revisamos en qué etapa te encuentras y qué necesitas para avanzar.",
        },
        {
          step: 2,
          title: "Mapeamos las etapas que necesitas",
          description:
            "Identificamos cuáles de las 8 etapas aplican a tu situación y construimos tu hoja de ruta.",
        },
        {
          step: 3,
          title: "Lo ejecutamos etapa por etapa",
          description:
            "Trabajamos juntos a través de cada etapa con sesiones estructuradas y apoyo continuo.",
        },
        {
          step: 4,
          title: "Lanzas con confianza",
          description:
            "Terminas con un negocio operativo — no solo una idea bien planificada.",
        },
      ],
    },
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/dacruz117/puente-consulting && npm run build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/translations.ts
git commit -m "feat: update business-startup translations with 8-stage framework (ES)"
```

---

## Task 4: Extend ServicePage + update business-startup page

**Files:**
- Modify: `src/components/ServicePage.tsx`
- Modify: `src/app/business-startup/page.tsx`

- [ ] **Step 1: Add `ctaBannerProps` to ServicePage interface and component**

Replace the entire `ServicePage.tsx` file with:

```typescript
"use client";

import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import { useLanguage } from "@/context/LanguageContext";

interface Service {
  title: string;
  description: string;
}

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ServicePageProps {
  heroTitle: string;
  heroDescription: string;
  services: readonly Service[];
  processSteps: readonly ProcessStep[];
  ctaBannerProps?: {
    heading?: string;
    buttonText?: string;
    href?: string;
  };
}

export default function ServicePage({
  heroTitle,
  heroDescription,
  services,
  processSteps,
  ctaBannerProps,
}: ServicePageProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* Page Hero */}
      <section className="relative bg-primary text-white py-20 overflow-hidden">
        <Image
          src="/austin-skyline.jpg"
          alt="Austin skyline"
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{heroTitle}</h1>
          <p className="text-lg text-gray-300">{heroDescription}</p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            {t.servicePage.whatWeOffer}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-bold text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-body">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            {t.servicePage.ourProcess}
          </h2>
          <div className="space-y-8">
            {processSteps.map((step) => (
              <div key={step.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-1">
                    {step.title}
                  </h3>
                  <p className="text-body">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner {...(ctaBannerProps ?? {})} />
    </>
  );
}
```

- [ ] **Step 2: Update business-startup/page.tsx to use stages + ctaBannerProps**

Replace the entire `src/app/business-startup/page.tsx` with:

```typescript
"use client";

import ServicePage from "@/components/ServicePage";
import { useLanguage } from "@/context/LanguageContext";

export default function BusinessStartupPage() {
  const { t } = useLanguage();

  return (
    <ServicePage
      heroTitle={t.businessStartup.heroTitle}
      heroDescription={t.businessStartup.heroDescription}
      services={t.businessStartup.stages}
      processSteps={t.businessStartup.processSteps}
      ctaBannerProps={{
        heading: t.businessStartup.seePricingHeading,
        buttonText: t.businessStartup.seePricingButton,
        href: "/services",
      }}
    />
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /home/dacruz117/puente-consulting && npm run build 2>&1 | tail -20
```
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/ServicePage.tsx src/app/business-startup/page.tsx
git commit -m "feat: update business-startup page to show 8-stage roadmap with pricing CTA"
```

---

## Task 5: Add `services` translations (EN)

**Files:**
- Modify: `src/lib/translations.ts`

- [ ] **Step 1: Add the full `services` block inside `en: { ... }` before the closing brace**

Add after `cta: { ... }` in the `en` block:

```typescript
    services: {
      heroTitle: "Let\u2019s build your business the right way.",
      heroSubtitle:
        "I help first-time and aspiring business owners go from idea to open for business \u2014 with a proven 109-step system covering every stage: legal setup, branding, website, sales, finances, and growth.",
      packagesTitle: "Choose Your Package",
      mostPopular: "Most Popular",
      packageCta: "Get Started",
      foundingNote:
        "Founding client pricing \u2014 limited to 3 spots. Rate increases once spots are filled.",
      packages: [
        {
          name: "Inform Me",
          price: "$97",
          duration: "one-time",
          features: [
            "Full 109-task startup checklist",
            "All 8 launch stages",
            "Tool & vendor recommendations",
            "30-day email support",
            "Self-paced",
          ],
        },
        {
          name: "Walk Me Through It",
          price: "$297",
          duration: "3 sessions over 90 days",
          features: [
            "Everything in Inform Me",
            "3 \u00d7 60-min strategy sessions",
            "Personalized stage-by-stage plan",
            "Sales process + outreach help",
            "Priority email between sessions",
          ],
        },
        {
          name: "Done With You",
          price: "$750",
          duration: "60-day co-pilot program",
          features: [
            "Everything in Walk Me Through It",
            "Weekly 1:1 sessions (8 total)",
            "Brand + digital presence built",
            "Financial model & pricing setup",
            "First proposal reviewed & coached",
          ],
        },
      ],
      alaCarte: {
        title: "Only need help with one piece? Pick your stage.",
        bundleNote: "Bundle 3 or more stages and save 15%.",
        stages: [
          {
            name: "Idea & Validation",
            items: [
              { label: "Business concept + target market session", price: "$97" },
              { label: "Competitive landscape research report", price: "$147" },
              { label: "Customer discovery interview framework", price: "$97" },
            ],
            fullLabel: "Full Stage 1 advisory",
            fullPrice: "$247",
          },
          {
            name: "Legal & Structure",
            items: [
              { label: "Entity selection + formation walkthrough", price: "$147" },
              { label: "Business banking + EIN setup guide", price: "$97" },
              { label: "License & permit research", price: "$127" },
            ],
            fullLabel: "Full Stage 2 advisory",
            fullPrice: "$297",
          },
          {
            name: "Brand & Identity",
            items: [
              { label: "Brand positioning + audience persona", price: "$97" },
              { label: "Logo brief + vendor sourcing", price: "$127" },
              { label: "Brand style guide", price: "$147" },
            ],
            fullLabel: "Full Stage 3 advisory",
            fullPrice: "$247",
          },
          {
            name: "Digital & Online Presence",
            items: [
              { label: "Website copy framework (5 pages)", price: "$197" },
              { label: "Google Business + LinkedIn optimization", price: "$127" },
              { label: "Full digital presence audit + plan", price: "$167" },
            ],
            fullLabel: "Full Stage 4 advisory",
            fullPrice: "$297",
          },
          {
            name: "Operations & Systems",
            items: [
              { label: "CRM setup + email template kit", price: "$147" },
              { label: "Contract + invoice template build", price: "$127" },
              { label: "Operations systems audit + recommendations", price: "$167" },
            ],
            fullLabel: "Full Stage 5 advisory",
            fullPrice: "$297",
          },
          {
            name: "Sales & Marketing",
            items: [
              { label: "Sales process map + outreach sequence", price: "$197" },
              { label: "Prospect list build (50 targets)", price: "$147" },
              { label: "Proposal / pitch deck template", price: "$147" },
            ],
            fullLabel: "Full Stage 6 advisory",
            fullPrice: "$347",
          },
          {
            name: "Financial Controls",
            items: [
              { label: "Financial model + break-even analysis", price: "$197" },
              { label: "Cash flow tracker + 90-day forecast", price: "$167" },
              { label: "Bookkeeping system setup", price: "$147" },
            ],
            fullLabel: "Full Stage 7 advisory",
            fullPrice: "$347",
          },
          {
            name: "Growth & Scale",
            items: [
              { label: "SOP creation (5 core processes)", price: "$247" },
              { label: "Referral program + partner strategy", price: "$197" },
              { label: "90-day growth review session", price: "$197" },
            ],
            fullLabel: "Full Stage 8 advisory",
            fullPrice: "$347",
          },
        ],
      },
      howItWorks: {
        title: "How It Works",
        steps: [
          "We assess where you are",
          "You get your custom roadmap",
          "We work through it together",
          "You launch with confidence",
        ],
      },
      ctaHeading:
        "Ready to start? Contact us to claim your founding client spot.",
      ctaButton: "Book a Free Intro Call",
    },
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/dacruz117/puente-consulting && npm run build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/translations.ts
git commit -m "feat: add services page translations (EN)"
```

---

## Task 6: Add `services` translations (ES)

**Files:**
- Modify: `src/lib/translations.ts`

- [ ] **Step 1: Add the full `services` block inside `es: { ... }` before the closing brace**

Add after `cta: { ... }` in the `es` block:

```typescript
    services: {
      heroTitle: "Construyamos tu negocio de la manera correcta.",
      heroSubtitle:
        "Ayudo a emprendedores y aspirantes a due\u00f1os de negocios a pasar de la idea a la apertura \u2014 con un sistema probado de 109 pasos que cubre cada etapa: estructura legal, marca, sitio web, ventas, finanzas y crecimiento.",
      packagesTitle: "Elige Tu Paquete",
      mostPopular: "M\u00e1s Popular",
      packageCta: "Comenzar",
      foundingNote:
        "Precios de cliente fundador \u2014 limitado a 3 cupos. El precio aumenta una vez que los cupos se llenen.",
      packages: [
        {
          name: "Inf\u00f3rmame",
          price: "$97",
          duration: "pago \u00fanico",
          features: [
            "Lista completa de 109 tareas de inicio",
            "Las 8 etapas de lanzamiento",
            "Recomendaciones de herramientas y proveedores",
            "Apoyo por correo durante 30 d\u00edas",
            "A tu propio ritmo",
          ],
        },
        {
          name: "Gu\u00edame Paso a Paso",
          price: "$297",
          duration: "3 sesiones en 90 d\u00edas",
          features: [
            "Todo lo incluido en Inf\u00f3rmame",
            "3 sesiones de estrategia de 60 min",
            "Plan personalizado por etapa",
            "Ayuda con el proceso de ventas y difusi\u00f3n",
            "Correo prioritario entre sesiones",
          ],
        },
        {
          name: "Lo Hacemos Juntos",
          price: "$750",
          duration: "programa de 60 d\u00edas",
          features: [
            "Todo lo incluido en Gu\u00edame Paso a Paso",
            "Sesiones semanales 1:1 (8 en total)",
            "Marca y presencia digital constru\u00eddas",
            "Modelo financiero y estructura de precios",
            "Primera propuesta revisada y asesorada",
          ],
        },
      ],
      alaCarte: {
        title: "\u00bfSolo necesitas ayuda con una parte? Elige tu etapa.",
        bundleNote: "Al agrupar 3 o m\u00e1s etapas, ahorras un 15%.",
        stages: [
          {
            name: "Idea y Validaci\u00f3n",
            items: [
              { label: "Sesi\u00f3n de concepto de negocio + mercado objetivo", price: "$97" },
              { label: "Informe de an\u00e1lisis competitivo", price: "$147" },
              { label: "Marco de entrevista de descubrimiento de clientes", price: "$97" },
            ],
            fullLabel: "Asesor\u00eda completa Etapa 1",
            fullPrice: "$247",
          },
          {
            name: "Legal y Estructura",
            items: [
              { label: "Selecci\u00f3n de entidad + orientaci\u00f3n de formaci\u00f3n", price: "$147" },
              { label: "Gu\u00eda de banca empresarial + EIN", price: "$97" },
              { label: "Investigaci\u00f3n de licencias y permisos", price: "$127" },
            ],
            fullLabel: "Asesor\u00eda completa Etapa 2",
            fullPrice: "$297",
          },
          {
            name: "Marca e Identidad",
            items: [
              { label: "Posicionamiento de marca + perfil de audiencia", price: "$97" },
              { label: "Brief de logo + b\u00fasqueda de proveedores", price: "$127" },
              { label: "Gu\u00eda de estilo de marca", price: "$147" },
            ],
            fullLabel: "Asesor\u00eda completa Etapa 3",
            fullPrice: "$247",
          },
          {
            name: "Presencia Digital y en L\u00ednea",
            items: [
              { label: "Marco de contenido web (5 p\u00e1ginas)", price: "$197" },
              { label: "Optimizaci\u00f3n de Google Business + LinkedIn", price: "$127" },
              { label: "Auditor\u00eda y plan de presencia digital", price: "$167" },
            ],
            fullLabel: "Asesor\u00eda completa Etapa 4",
            fullPrice: "$297",
          },
          {
            name: "Operaciones y Sistemas",
            items: [
              { label: "Configuraci\u00f3n de CRM + kit de plantillas de correo", price: "$147" },
              { label: "Creaci\u00f3n de contratos y plantillas de factura", price: "$127" },
              { label: "Auditor\u00eda de sistemas operativos + recomendaciones", price: "$167" },
            ],
            fullLabel: "Asesor\u00eda completa Etapa 5",
            fullPrice: "$297",
          },
          {
            name: "Ventas y Marketing",
            items: [
              { label: "Mapa de proceso de ventas + secuencia de difusi\u00f3n", price: "$197" },
              { label: "Lista de 50 prospectos objetivo", price: "$147" },
              { label: "Plantilla de propuesta / presentaci\u00f3n", price: "$147" },
            ],
            fullLabel: "Asesor\u00eda completa Etapa 6",
            fullPrice: "$347",
          },
          {
            name: "Control Financiero",
            items: [
              { label: "Modelo financiero + an\u00e1lisis de punto de equilibrio", price: "$197" },
              { label: "Rastreador de flujo de caja + pron\u00f3stico a 90 d\u00edas", price: "$167" },
              { label: "Configuraci\u00f3n de sistema de contabilidad", price: "$147" },
            ],
            fullLabel: "Asesor\u00eda completa Etapa 7",
            fullPrice: "$347",
          },
          {
            name: "Crecimiento y Escalabilidad",
            items: [
              { label: "Creaci\u00f3n de SOPs (5 procesos principales)", price: "$247" },
              { label: "Programa de referidos + estrategia de socios", price: "$197" },
              { label: "Sesi\u00f3n de revisi\u00f3n de crecimiento a 90 d\u00edas", price: "$197" },
            ],
            fullLabel: "Asesor\u00eda completa Etapa 8",
            fullPrice: "$347",
          },
        ],
      },
      howItWorks: {
        title: "C\u00f3mo Funciona",
        steps: [
          "Evaluamos d\u00f3nde est\u00e1s",
          "Recibes tu hoja de ruta personalizada",
          "Lo trabajamos juntos",
          "Lanzas con confianza",
        ],
      },
      ctaHeading:
        "\u00bfListo para comenzar? Cont\u00e1ctanos para reservar tu cupo de cliente fundador.",
      ctaButton: "Agenda una Llamada Gratuita",
    },
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/dacruz117/puente-consulting && npm run build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/translations.ts
git commit -m "feat: add services page translations (ES)"
```

---

## Task 7: Create the `/services` page

**Files:**
- Create: `src/app/services/page.tsx`

- [ ] **Step 1: Create the file**

Create `src/app/services/page.tsx` with:

```typescript
"use client";

import Image from "next/image";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import CheckIcon from "@/components/CheckIcon";
import { useLanguage } from "@/context/LanguageContext";

const STAGE_COLORS = [
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#06B6D4",
  "#F59E0B",
  "#EF4444",
  "#6366F1",
  "#D97706",
];

export default function ServicesPage() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-accent text-white py-20 overflow-hidden">
        <Image
          src="/austin-skyline.jpg"
          alt="Austin skyline"
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{s.heroTitle}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{s.heroSubtitle}</p>
        </div>
      </section>

      {/* Package Cards */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            {s.packagesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8">
            {/* Inform Me */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col">
              <h3 className="text-xl font-bold text-primary mb-1">{s.packages[0].name}</h3>
              <p className="text-3xl font-bold text-accent mb-1">{s.packages[0].price}</p>
              <p className="text-sm text-gray-500 mb-6">{s.packages[0].duration}</p>
              <ul className="space-y-3 flex-1 mb-8">
                {s.packages[0].features.map((f) => (
                  <li key={f} className="flex gap-2 text-body text-sm">
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block text-center bg-accent text-white font-semibold px-6 py-3 rounded-lg hover:bg-accent-light transition-colors"
              >
                {s.packageCta}
              </Link>
            </div>

            {/* Walk Me Through It — Most Popular */}
            <div className="bg-accent rounded-xl p-8 shadow-lg flex flex-col relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                {s.mostPopular}
              </span>
              <h3 className="text-xl font-bold text-white mb-1">{s.packages[1].name}</h3>
              <p className="text-3xl font-bold text-white mb-1">{s.packages[1].price}</p>
              <p className="text-sm text-white/70 mb-6">{s.packages[1].duration}</p>
              <ul className="space-y-3 flex-1 mb-8">
                {s.packages[1].features.map((f) => (
                  <li key={f} className="flex gap-2 text-white text-sm">
                    <svg
                      className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block text-center bg-white text-accent font-semibold px-6 py-3 rounded-lg hover:bg-cream transition-colors"
              >
                {s.packageCta}
              </Link>
            </div>

            {/* Done With You */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col">
              <h3 className="text-xl font-bold text-primary mb-1">{s.packages[2].name}</h3>
              <p className="text-3xl font-bold text-accent mb-1">{s.packages[2].price}</p>
              <p className="text-sm text-gray-500 mb-6">{s.packages[2].duration}</p>
              <ul className="space-y-3 flex-1 mb-8">
                {s.packages[2].features.map((f) => (
                  <li key={f} className="flex gap-2 text-body text-sm">
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block text-center bg-accent text-white font-semibold px-6 py-3 rounded-lg hover:bg-accent-light transition-colors"
              >
                {s.packageCta}
              </Link>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 italic">{s.foundingNote}</p>
        </div>
      </section>

      {/* À la Carte */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-3">
            {s.alaCarte.title}
          </h2>
          <p className="text-center text-accent font-medium mb-12">{s.alaCarte.bundleNote}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {s.alaCarte.stages.map((stage, i) => (
              <div
                key={stage.name}
                className="bg-cream rounded-xl overflow-hidden shadow-sm"
                style={{ borderLeft: `4px solid ${STAGE_COLORS[i]}` }}
              >
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Stage {i + 1}
                  </p>
                  <h3 className="text-base font-bold text-primary mb-4">{stage.name}</h3>
                  <ul className="space-y-3">
                    {stage.items.map((item) => (
                      <li key={item.label} className="text-sm text-body">
                        <div className="flex justify-between gap-2">
                          <span className="leading-snug">{item.label}</span>
                          <span className="font-semibold text-accent whitespace-nowrap">{item.price}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm font-bold">
                    <span className="text-primary">{stage.fullLabel}</span>
                    <span className="text-accent">{stage.fullPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-cream py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            {s.howItWorks.title}
          </h2>
          <div className="space-y-8">
            {s.howItWorks.steps.map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {i + 1}
                </div>
                <div className="pt-2">
                  <p className="text-lg font-semibold text-primary">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner heading={s.ctaHeading} buttonText={s.ctaButton} href="/contact" />
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/dacruz117/puente-consulting && npm run build 2>&1 | tail -30
```
Expected: build succeeds with no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "feat: add /services pricing page with packages, a la carte, and how it works"
```

---

## Task 8: Add page metadata

**Files:**
- Modify: `src/app/services/page.tsx`

- [ ] **Step 1: Export metadata from the services page**

Next.js App Router pages that are `"use client"` cannot export `metadata` directly. Since the page uses `useLanguage` (a client hook), it must stay a client component. The layout's default metadata will apply. No action needed — the site-level `layout.tsx` metadata covers the page.

- [ ] **Step 2: Final build check**

```bash
cd /home/dacruz117/puente-consulting && npm run build 2>&1
```
Expected: `✓ Compiled successfully` with `/services` appearing in the route list.

- [ ] **Step 3: Final commit if any changes were needed**

```bash
git add -p
git commit -m "chore: final build verification for services pricing page"
```

---

## Self-Review Checklist

- [x] **Hero section** — covered in Task 7 Step 1 (`heroTitle`, `heroSubtitle` from translations)
- [x] **3 package cards** — covered in Task 7 (Inform Me, Walk Me Through It w/ Most Popular badge, Done With You)
- [x] **Founding client note** — `s.foundingNote` rendered below the cards grid
- [x] **À la carte 8 stages** — covered in Task 7 with color-coded left borders via `STAGE_COLORS`
- [x] **Bundle 3+ saves 15% note** — `s.alaCarte.bundleNote`
- [x] **How It Works (4 steps)** — covered in Task 7
- [x] **CTA footer bar** — `CTABanner` with custom heading + button + `/contact` href
- [x] **Nav link** — Task 1 adds Pricing link to Navbar
- [x] **Business Start-Up page updated** — Tasks 2, 3, 4 update translations + ServicePage + page component
- [x] **Fully bilingual** — Tasks 5 & 6 add EN + ES translations for everything
- [x] **No hardcoded contact info** — all CTAs link to `/contact` via the existing route
- [x] **Mobile responsive** — `grid-cols-1 md:grid-cols-3`, `sm:grid-cols-2 lg:grid-cols-4`, stacked on mobile
- [x] **Type consistency** — `t.services`, `s.packages[0..2]`, `s.alaCarte.stages[i].items`, `s.howItWorks.steps` all consistent across Tasks 5, 6, 7
- [x] **No placeholders** — all strings are fully written out in EN and ES

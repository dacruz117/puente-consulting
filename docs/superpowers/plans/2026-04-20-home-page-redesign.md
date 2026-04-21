# Home Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the home page into a 5-section service hub and upgrade the navbar language toggle from a muted text button to a prominent flag+label button.

**Architecture:** Three files change — `translations.ts` adds new `home.*` and `nav.langButton*` keys, `Navbar.tsx` swaps the toggle button, and `page.tsx` is a full rewrite with new section structure. No new components are introduced; the existing `CTABanner` is reused as-is.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, `useLanguage()` from `LanguageContext`

---

### Task 1: Add translation keys

**Files:**
- Modify: `src/lib/translations.ts`

Add all new keys under `en.nav`, `en.home`, `es.nav`, and `es.home`. Existing keys in those objects stay untouched.

- [ ] **Step 1: Add `langButtonToEs` and `langButtonToEn` to `en.nav`**

In `src/lib/translations.ts`, find the `en.nav` object (lines ~5-14). After `bookSession: "Book a Session",` add:

```typescript
      langButtonToEs: "Ver en Español",
      langButtonToEn: "View in English",
```

The `en.nav` block should now end with:
```typescript
    nav: {
      home: "Home",
      collegeAdvising: "College Advising",
      businessStartup: "Business Start-Up",
      pricing: "Pricing",
      translationServices: "Translation Services",
      about: "About",
      contact: "Contact",
      bookSession: "Book a Session",
      langButtonToEs: "Ver en Español",
      langButtonToEn: "View in English",
    },
```

- [ ] **Step 2: Replace `en.home` with new keys**

Find the entire `en.home` block (starts at `home: {` around line 27, ends at the closing `},` before `about:`). Replace it entirely with:

```typescript
    home: {
      heroEyebrow: "Bilingual · Austin, TX · EN / ES",
      heroTitle: "Guidance for college, business, and everyday life.",
      heroSubtitle:
        "Helping Spanish-speaking families navigate the systems that were never explained to them — in English, in Spanish, or both.",
      heroCards: [
        {
          icon: "📋",
          name: "General Assistance",
          description: "Forms, appointments, registrations, and everyday digital systems.",
          priceLabel: "$25/hr · See services →",
          href: "/services",
        },
        {
          icon: "🎓",
          name: "College Advising",
          description: "From first question to first day of class — the full 7-stage roadmap.",
          priceLabel: "From $79 · See packages →",
          href: "/college-advising",
        },
        {
          icon: "💼",
          name: "Business Start-Up",
          description: "Idea to open for business — 8 stages, 109 steps, done with you.",
          priceLabel: "From $97 · See packages →",
          href: "/business-startup",
        },
      ],
      whoEyebrow: "Who we help",
      whoTitle: "Sound familiar?",
      personas: [
        {
          quote: "\"My daughter got accepted. We have no idea what to do next.\"",
          link: "→ College Advising",
          href: "/college-advising",
        },
        {
          quote: "\"I want to start a business but I don't know how to make it official.\"",
          link: "→ Business Start-Up",
          href: "/business-startup",
        },
        {
          quote: "\"I need help with forms, appointments, and paperwork — in Spanish.\"",
          link: "→ General Assistance",
          href: "/services",
        },
      ],
      snapshotsEyebrow: "What we offer",
      snapshotsTitle: "Three ways Puente can help",
      snapshots: [
        {
          tag: "General Assistance",
          title: "Everyday Navigation",
          description: "Help with the forms, portals, and processes that feel impossible to do alone.",
          bullets: [
            "Toll tags & vehicle registration",
            "Appointments & online applications",
            "Official letters & notices explained",
            "Resume & email setup",
          ],
          price: "$25 / hour",
          cta: "Book a session →",
          href: "/contact",
          featured: false,
        },
        {
          tag: "College Advising",
          title: "The 7-Stage Academic Roadmap",
          description: "From choosing schools to enrolling — we guide every step, bilingually.",
          bullets: [
            "School list & research",
            "Essays & personal statement",
            "FAFSA & financial aid",
            "Acceptance & enrollment",
          ],
          price: "From $79 — packages available",
          cta: "See the roadmap →",
          href: "/college-advising",
          featured: true,
        },
        {
          tag: "Business Start-Up",
          title: "Idea to Open for Business",
          description: "A proven 8-stage system covering everything from legal setup to first revenue.",
          bullets: [
            "Legal structure & EIN",
            "Brand, website & digital presence",
            "Sales process & outreach",
            "Financial controls & growth",
          ],
          price: "From $97 — packages available",
          cta: "See the 8 stages →",
          href: "/business-startup",
          featured: false,
        },
      ],
      trustEyebrow: "Why Puente",
      trustTitle: "Experienced. Bilingual. On your side.",
      trustParagraph:
        "With a background in higher education administration and years of guiding families through complex systems, I bring both the knowledge and the patience to make these processes feel manageable.",
      trustPills: [
        "Bachelor's Degree",
        "Higher Ed Administration",
        "Bilingual EN / ES",
        "1:1 Sessions",
        "Confidential",
        "Transparent Pricing",
      ],
      trustGoal:
        "My goal is not just to complete the task — but to empower you to feel confident doing it next time.",
      ctaHeading: "Not sure where to start?",
      ctaSub: "The intro call is free. We'll figure out together what you need.",
      ctaButton: "Book a Free Intro Call →",
    },
```

- [ ] **Step 3: Add `langButtonToEs` and `langButtonToEn` to `es.nav`**

Find the `es.nav` block. After `bookSession:` (the Spanish value), add:

```typescript
      langButtonToEs: "Ver en Español",
      langButtonToEn: "View in English",
```

- [ ] **Step 4: Replace `es.home` with new keys (Spanish)**

Find the entire `es.home` block. Replace it with:

```typescript
    home: {
      heroEyebrow: "Bilingüe · Austin, TX · EN / ES",
      heroTitle: "Orientación para la universidad, los negocios y la vida cotidiana.",
      heroSubtitle:
        "Ayudamos a familias hispanohablantes a navegar los sistemas que nunca les fueron explicados — en inglés, en español, o en ambos.",
      heroCards: [
        {
          icon: "📋",
          name: "Asistencia General",
          description: "Formularios, citas, registros y sistemas digitales del día a día.",
          priceLabel: "$25/hr · Ver servicios →",
          href: "/services",
        },
        {
          icon: "🎓",
          name: "Asesoría Universitaria",
          description: "Desde la primera pregunta hasta el primer día de clases — la hoja de ruta completa de 7 etapas.",
          priceLabel: "Desde $79 · Ver paquetes →",
          href: "/college-advising",
        },
        {
          icon: "💼",
          name: "Inicio de Negocio",
          description: "De la idea a abrir el negocio — 8 etapas, 109 pasos, contigo.",
          priceLabel: "Desde $97 · Ver paquetes →",
          href: "/business-startup",
        },
      ],
      whoEyebrow: "A quién ayudamos",
      whoTitle: "¿Te suena familiar?",
      personas: [
        {
          quote: "\"Mi hija fue aceptada. No sabemos qué hacer ahora.\"",
          link: "→ Asesoría Universitaria",
          href: "/college-advising",
        },
        {
          quote: "\"Quiero iniciar un negocio pero no sé cómo hacerlo oficial.\"",
          link: "→ Inicio de Negocio",
          href: "/business-startup",
        },
        {
          quote: "\"Necesito ayuda con formularios, citas y trámites — en español.\"",
          link: "→ Asistencia General",
          href: "/services",
        },
      ],
      snapshotsEyebrow: "Lo que ofrecemos",
      snapshotsTitle: "Tres formas en que Puente puede ayudarte",
      snapshots: [
        {
          tag: "Asistencia General",
          title: "Navegación Cotidiana",
          description: "Ayuda con formularios, portales y procesos que parecen imposibles de hacer solo.",
          bullets: [
            "Tags de peaje y registro de vehículo",
            "Citas y solicitudes en línea",
            "Cartas y avisos oficiales explicados",
            "Currículum y configuración de correo",
          ],
          price: "$25 / hora",
          cta: "Reservar sesión →",
          href: "/contact",
          featured: false,
        },
        {
          tag: "Asesoría Universitaria",
          title: "La Hoja de Ruta Académica de 7 Etapas",
          description: "Desde elegir escuelas hasta inscribirte — te guiamos en cada paso, bilingüemente.",
          bullets: [
            "Lista e investigación de escuelas",
            "Ensayos y declaración personal",
            "FAFSA y ayuda financiera",
            "Aceptación e inscripción",
          ],
          price: "Desde $79 — paquetes disponibles",
          cta: "Ver la hoja de ruta →",
          href: "/college-advising",
          featured: true,
        },
        {
          tag: "Inicio de Negocio",
          title: "De la Idea a Abrir el Negocio",
          description: "Un sistema probado de 8 etapas que cubre todo, desde la estructura legal hasta los primeros ingresos.",
          bullets: [
            "Estructura legal y EIN",
            "Marca, sitio web y presencia digital",
            "Proceso de ventas y alcance",
            "Controles financieros y crecimiento",
          ],
          price: "Desde $97 — paquetes disponibles",
          cta: "Ver las 8 etapas →",
          href: "/business-startup",
          featured: false,
        },
      ],
      trustEyebrow: "Por qué Puente",
      trustTitle: "Con experiencia. Bilingüe. De tu lado.",
      trustParagraph:
        "Con formación en administración de educación superior y años de guiar a familias a través de sistemas complejos, traigo tanto el conocimiento como la paciencia para hacer que estos procesos se sientan manejables.",
      trustPills: [
        "Licenciatura",
        "Administración de Educación Superior",
        "Bilingüe EN / ES",
        "Sesiones 1:1",
        "Confidencial",
        "Precios Transparentes",
      ],
      trustGoal:
        "Mi meta no es solo completar la tarea — sino empoderarte para que te sientas seguro haciéndolo la próxima vez.",
      ctaHeading: "¿No sabes por dónde empezar?",
      ctaSub: "La llamada inicial es gratis. Juntos descubriremos qué necesitas.",
      ctaButton: "Reservar una Llamada Gratis →",
    },
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
cd /home/dacruz117/puente-consulting && npx tsc --noEmit
```

Expected: no errors. If errors appear, they will be in the translation object shape — fix the offending key.

- [ ] **Step 6: Commit**

```bash
git add src/lib/translations.ts
git commit -m "feat: add home page and nav lang-toggle translation keys (EN + ES)"
```

---

### Task 2: Upgrade the navbar language toggle

**Files:**
- Modify: `src/components/Navbar.tsx`

Replace both occurrences of the muted `text-white/60` toggle button (desktop and mobile) with a prominent white flag+label button. The mobile header toggle is replaced; the mobile *menu* gets the same button added inside the dropdown.

- [ ] **Step 1: Replace the desktop toggle button**

In `src/components/Navbar.tsx`, find the desktop toggle button (lines ~54-60):

```tsx
          <button
            onClick={toggle}
            className="text-sm font-semibold text-white/60 hover:text-white transition-colors tracking-widest"
            aria-label="Toggle language"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
```

Replace with:

```tsx
          <button
            onClick={toggle}
            className="bg-white text-primary text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
            aria-label="Toggle language"
          >
            <span>{lang === "en" ? "🇲🇽" : "🇺🇸"}</span>
            <span>{lang === "en" ? t.nav.langButtonToEs : t.nav.langButtonToEn}</span>
          </button>
```

- [ ] **Step 2: Replace the mobile header toggle button**

Find the mobile header toggle button (lines ~65-71):

```tsx
          <button
            onClick={toggle}
            className="text-sm font-semibold text-white/60 hover:text-white transition-colors tracking-widest"
            aria-label="Toggle language"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
```

Remove this button entirely (the mobile menu will have it instead — added in Step 3).

- [ ] **Step 3: Add toggle button inside the mobile menu dropdown**

Find the mobile menu `<div>` (starts with `{mobileOpen && (`). After the `Book a Session` link inside the dropdown and before the closing `</div>`, add:

```tsx
          <button
            onClick={() => { toggle(); setMobileOpen(false); }}
            className="w-full bg-white text-primary text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            aria-label="Toggle language"
          >
            <span>{lang === "en" ? "🇲🇽" : "🇺🇸"}</span>
            <span>{lang === "en" ? t.nav.langButtonToEs : t.nav.langButtonToEn}</span>
          </button>
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /home/dacruz117/puente-consulting && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: replace muted lang toggle with prominent flag+label button in navbar"
```

---

### Task 3: Rewrite the home page

**Files:**
- Modify: `src/app/page.tsx` (full rewrite)

Five sections in order: Hero → Who It's For → Service Snapshots → Trust Block → CTA Banner.

- [ ] **Step 1: Rewrite `src/app/page.tsx`**

Replace the entire file with:

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const h = t.home;

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-primary text-white pt-20 pb-0 overflow-hidden">
        <Image
          src="/austin-skyline.jpg"
          alt="Austin skyline"
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <p className="inline-block text-xs font-semibold uppercase tracking-widest text-accent-light border border-accent-light/30 px-4 py-1 rounded-full mb-6">
            {h.heroEyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
            {h.heroTitle}
          </h1>
          <p className="text-base text-white/60 max-w-xl mx-auto mb-10">
            {h.heroSubtitle}
          </p>

          {/* Hero service cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-white/10">
            {h.heroCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="bg-white/[0.04] hover:bg-white/[0.08] transition-colors p-6 text-left group"
              >
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 className="text-sm font-semibold text-white mb-1">{card.name}</h3>
                <p className="text-xs text-white/45 leading-relaxed mb-4">{card.description}</p>
                <span className="text-xs font-semibold text-accent-light uppercase tracking-wide">
                  {card.priceLabel}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* fade into next section */}
        <div className="relative z-10 h-16 bg-gradient-to-b from-transparent to-accent mt-6" />
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="bg-accent py-16">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">
            {h.whoEyebrow}
          </p>
          <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">
            {h.whoTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {h.personas.map((p) => (
              <div
                key={p.href}
                className="bg-white/[0.06] border border-white/10 rounded-xl p-6"
              >
                <p className="text-sm text-white/85 italic leading-relaxed border-l-2 border-accent-light pl-3 mb-4">
                  {p.quote}
                </p>
                <Link
                  href={p.href}
                  className="text-xs font-semibold text-accent-light uppercase tracking-wide hover:text-white transition-colors"
                >
                  {p.link}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE SNAPSHOTS ── */}
      <section className="bg-cream py-16">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            {h.snapshotsEyebrow}
          </p>
          <h2 className="text-3xl font-bold text-primary mb-8 tracking-tight">
            {h.snapshotsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {h.snapshots.map((snap) => (
              <div
                key={snap.href}
                className={`bg-white rounded-2xl border flex flex-col p-7 ${
                  snap.featured
                    ? "border-accent ring-1 ring-accent"
                    : "border-gray-200"
                }`}
              >
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-1 rounded-full mb-4 self-start">
                  {snap.tag}
                </span>
                <h3 className="text-base font-bold text-primary mb-1">{snap.title}</h3>
                <p className="text-xs text-body leading-relaxed mb-4">{snap.description}</p>
                <ul className="space-y-1 mb-4 flex-1">
                  {snap.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="text-accent font-bold mt-px">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="text-sm font-semibold text-accent mb-4">{snap.price}</p>
                <Link
                  href={snap.href}
                  className="self-start bg-accent text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-accent-light transition-colors"
                >
                  {snap.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BLOCK ── */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <Image
                src="/profile.png"
                alt="Puente founder"
                width={480}
                height={360}
                className="rounded-2xl shadow-lg object-cover w-full"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                {h.trustEyebrow}
              </p>
              <h2 className="text-3xl font-bold text-primary tracking-tight mb-4">
                {h.trustTitle}
              </h2>
              <p className="text-sm text-body leading-relaxed mb-6">{h.trustParagraph}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {h.trustPills.map((pill) => (
                  <span
                    key={pill}
                    className="text-xs font-medium text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full"
                  >
                    {pill}
                  </span>
                ))}
              </div>
              <p className="text-sm italic text-primary border-l-4 border-accent pl-4 leading-relaxed">
                {h.trustGoal}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <CTABanner />
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/dacruz117/puente-consulting && npx tsc --noEmit
```

Expected: no errors. Common issues to check:
- `h.heroCards`, `h.personas`, `h.snapshots` must match the shape added in Task 1
- `snap.featured` is a `boolean` — if TS complains, verify the `featured` field is present on all snapshot objects in both EN and ES translations

- [ ] **Step 3: Start the dev server and visually verify**

```bash
cd /home/dacruz117/puente-consulting && npm run dev
```

Open `http://localhost:3000` and verify:
- Hero: eyebrow pill, H1, subtitle, 3 service cards with icons/prices/links
- Who it's for: dark blue bg, 3 persona tiles with italic quotes and service links
- Service snapshots: cream bg, 3 cards — College Advising card has accent border/ring
- Trust: profile photo left, pills + pull-quote right
- CTA Banner: reused component renders correctly
- Toggle language (EN ↔ ES) and confirm all sections switch text

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: rewrite home page — 5-section service hub with hero cards, persona tiles, and trust block"
```

---

### Task 4: Push to remote

- [ ] **Step 1: Push all commits**

```bash
git push origin main
```

Expected: all 3 feature commits pushed cleanly. Verify on Cloudflare Pages that the deployment triggers.

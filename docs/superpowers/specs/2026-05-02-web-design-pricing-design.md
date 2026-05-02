# Web Design Services Pricing Page — Design Spec

**Date:** 2026-05-02
**Status:** Approved

---

## Overview

Add a new standalone Web Design Services pricing page at `/web-design` that matches the existing site's style, is fully bilingual (EN/ES), and is linked from the main navigation and footer.

---

## Files Changed

| File | Change |
|------|--------|
| `src/lib/translations.ts` | Add `webDesign` key to `en` and `es`; add `webDesign` to `nav` and `footer` namespaces |
| `src/components/Navbar.tsx` | Insert Web Design nav link between Pricing and Translations |
| `src/components/Footer.tsx` | Add Web Design link to Quick Links |
| `src/app/web-design/page.tsx` | New page (create) |

---

## Translations (`translations.ts`)

### Nav namespace (both `en` and `es`)
```
en.nav.webDesign = "Web Design"
es.nav.webDesign = "Diseño Web"
```

### Footer namespace (both `en` and `es`)
```
en.footer.webDesign = "Web Design Services"
es.footer.webDesign = "Diseño Web"
```

### New `webDesign` top-level key

Both `en` and `es` receive a `webDesign` object with:

- `heroTitle` — "Web Design for Local Businesses" / "Diseño Web para Negocios Locales"
- `heroSubtitle` — "Professional websites for local businesses, starting at $300." / "Sitios web profesionales para negocios locales, desde $300."
- `mostPopular` — "Most Popular" / "Más Popular"
- `packageCta` — "Get Started" / "Comenzar"
- `setupLabel` — "setup" / "instalación"
- `monthlyLabel` — "/mo" / "/mes"
- `addOnsTitle` — "Add-Ons" / "Servicios Adicionales"
- `addOnsSubtitle` — short line explaining add-ons are optional upgrades
- `ctaHeading` — "Not sure where to start?" / "¿No sabe por dónde empezar?"
- `ctaSub` — "The intro call is free. We'll figure out together what you need." / Spanish equivalent
- `ctaButton` — "Book a Free Intro Call →" / "Agenda una Llamada Gratuita →"
- `packages` — array of 3 package objects (see below)
- `addOns` — array of add-on objects (see below)

### Packages array (3 items)

Each package:
```typescript
{
  name: string,           // bilingual — en name / es name (same for proper nouns)
  setupPrice: string,     // e.g. "$300"
  monthlyPrice: string,   // e.g. "$75"
  features: { en: string; es: string }[]
}
```

**BASIC — $300 setup + $75/mo**
Features (bilingual):
- Single-page professional website / Sitio web profesional de una página
- Logo, services list & photo gallery (up to 10 photos) / Logo, lista de servicios y galería de fotos (hasta 10 fotos)
- Phone number, contact form & Google Maps embed / Número de teléfono, formulario de contacto e integración de Google Maps
- Social media links / Enlaces a redes sociales
- Mobile-friendly design / Diseño adaptable a móviles
- Domain & hosting included / Dominio y alojamiento incluidos
- Monthly maintenance included / Mantenimiento mensual incluido

**STANDARD — $500 setup + $100/mo** *(Most Popular — highlighted in accent)*
Features (bilingual):
- Multi-page website (Home, Services, Gallery, Contact) / Sitio web multipágina (Inicio, Servicios, Galería, Contacto)
- Testimonials & before/after photo section / Sección de testimonios y fotos de antes/después
- FAQ page / Página de preguntas frecuentes
- Quote request form / Formulario de solicitud de cotización
- Mobile-friendly design / Diseño adaptable a móviles
- Domain & hosting included / Dominio y alojamiento incluidos
- Monthly maintenance included / Mantenimiento mensual incluido

**PREMIUM — $800 setup + $150/mo**
Features (bilingual):
- Everything in Standard, plus: / Todo lo del Estándar, más:
- Unlimited pages & project portfolio / Páginas ilimitadas y portafolio de proyectos
- Blog/news section / Sección de blog/noticias
- Appointment or quote scheduling system / Sistema de citas o cotizaciones en línea
- Google Business Profile setup & optimization / Configuración y optimización de Google Business
- Photo gallery with project filtering / Galería de fotos con filtros por proyecto
- Priority support & faster updates / Soporte prioritario y actualizaciones más rápidas

### Add-Ons array

Each add-on:
```typescript
{
  name: { en: string; es: string },
  price: { en: string; es: string },
  highlight?: boolean   // true for the "Included" item
}
```

| Add-On (EN) | Add-On (ES) | Price |
|-------------|-------------|-------|
| Google Business Profile Setup | Configuración de Google Business | $100 one-time / $100 pago único |
| Extra page after launch | Página adicional después del lanzamiento | $75/page / $75/página |
| Basic logo design | Diseño básico de logo | $150 one-time / $150 pago único |
| Rush delivery (48 hrs) | Entrega urgente (48 hrs) | +$150 |
| Bilingual English/Spanish content | Contenido bilingüe inglés/español | Included / Incluido *(highlight)* |

---

## Page Structure (`/web-design/page.tsx`)

`"use client"` component using `useLanguage()`.

### 1. Hero
```
<section className="relative bg-primary text-white py-20 overflow-hidden">
  <Image src="/austin-skyline.jpg" fill className="object-cover object-center opacity-20" />
  <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-3">{wd.heroTitle}</h1>
    <p className="text-xl text-gray-300">{wd.heroSubtitle}</p>
  </div>
</section>
```

### 2. Pricing Tiers
```
<section className="py-20 bg-cream">
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      {wd.packages.map((pkg, i) => {
        const isPopular = i === 1;  // STANDARD is index 1
        // Card: isPopular → bg-accent text-white ring-2 ring-accent
        //       else      → bg-white border border-gray-100
        // Yellow "Most Popular" badge on isPopular
        // Price: large setupPrice + smaller "+monthlyPrice/mo" beneath
        // Features: check SVG + lang === "en" ? f.en : f.es
        // CTA button → /contact
      })}
    </div>
  </div>
</section>
```

Price display pattern (two-part pricing):
```jsx
<p className="text-4xl font-bold">{pkg.setupPrice}</p>
<p className="text-sm">{wd.setupLabel}</p>
<p className="text-lg font-semibold mt-1">{pkg.monthlyPrice}{wd.monthlyLabel}</p>
```

### 3. Add-Ons Section
```
<section className="py-16 bg-white">
  <div className="max-w-2xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-primary text-center mb-2">{wd.addOnsTitle}</h2>
    <p className="text-body text-center mb-8">{wd.addOnsSubtitle}</p>
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      {wd.addOns.map((addon, i) => (
        <div key={i} className="flex items-center justify-between px-6 py-4 border-b border-gray-100 last:border-0">
          <span className="text-sm text-body">{lang === "en" ? addon.name.en : addon.name.es}</span>
          {addon.highlight
            ? <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                {lang === "en" ? addon.price.en : addon.price.es}
              </span>
            : <span className="font-semibold text-accent text-sm">
                {lang === "en" ? addon.price.en : addon.price.es}
              </span>
          }
        </div>
      ))}
    </div>
  </div>
</section>
```

### 4. CTA Banner
Identical markup to the services page CTA section:
```
<section className="py-16 bg-cream border-t border-gray-100 text-center">
  <div className="max-w-xl mx-auto px-4">
    <h2 className="text-2xl font-bold text-primary mb-3">{wd.ctaHeading}</h2>
    <p className="text-body mb-6">{wd.ctaSub}</p>
    <Link href="/contact" className="inline-block bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-light transition-colors">
      {wd.ctaButton}
    </Link>
  </div>
</section>
```

---

## Navbar Change

In `src/components/Navbar.tsx`, insert between `/services` and `/translation-services`:
```typescript
{ href: "/web-design", label: t.nav.webDesign },
```

---

## Footer Change

In `src/components/Footer.tsx`, add to the Quick Links `<ul>`:
```jsx
<li>
  <Link href="/web-design" className="hover:text-white transition-colors">
    {t.footer.webDesign}
  </Link>
</li>
```

---

## What is NOT in scope

- No disclaimer section (web design services don't carry the legal advisory disclaimer needed for other services)
- No à la carte / collapsible section
- No "Founding client" note
- No tab bar (this is a single-focus page)

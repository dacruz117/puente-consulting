# Site Content & Navigation Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align `/college-advising` and `/services` with the new pricing ladder, simplify the contact page, merge Web Design into Business Start-Up, add Pricing/FAQ nav links, and publish a new FAQ page.

**Architecture:** All bilingual content changes flow through `src/lib/translations.ts` (parallel `en`/`es` blocks); page/component JSX consumes it via `useLanguage()`. No new dependencies, no backend/API work, no new shared components beyond one new page (`/faq`) that follows the existing `/about` page's simple hero+content pattern.

**Tech Stack:** Next.js 14 (App Router, static export via `output: 'export'`), TypeScript, Tailwind CSS, custom `LanguageContext`/`translations.ts`.

## Global Constraints

- Every new or changed user-visible string must be added to **both** `en` and `es` blocks in `translations.ts` — `type T = typeof translations[Language]` in `src/context/LanguageContext.tsx` requires matching key shapes between languages, or the code that reads `t.X` will fail to type-check.
- This is a static-export site (`next.config.js` has `output: 'export'`) — server-side `redirects()` config does **not** work; the `/web-design` → `/business-startup` redirect must be a client-side `router.replace()`.
- No real booking/calendar system — all CTAs continue to route to `/contact`; the new date/time fields on the contact form are informational only (you reply manually by email), not a scheduling integration.
- Do not touch `businessStartup.scenarios` (a separate, unrelated translation block with its own `.stages` field) when editing `collegeAdvising.scenarios` in Task 1 — the two are easy to confuse and this project has previously shipped an out-of-scope cross-contamination bug between similarly-named blocks. Verify with `grep` which block you're inside before editing.
- Only pricing/copy already decided in the spec — do not invent new numbers, policies, or claims not already present on the site.
- When a field becomes unused as a result of a change in this plan, remove it (verify with `grep` before removing, and paste the grep output in your report) rather than leaving dead code — this project's convention, and prior tasks have shipped false "nothing is unused" claims that review had to catch.

---

## File Map

| File | Action | What changes |
|------|--------|--------------|
| `src/lib/translations.ts` | Modify | `collegeAdvising` (EN+ES): rewrite `processSteps`/`scenarios`, rename `scenarios[].stages`→`.tags`; `services.academic` (EN+ES): move `note` field from `askAnything` to `presentation`, rename ES `askAnything.name`; `contact`/`contactForm` (EN+ES): remove dead Calendly copy, add preferred-date/time labels; `webDesign` (EN+ES): remove dead `ctaHeading`/`ctaSub`/`ctaButton`; `nav` (EN+ES): remove dead `webDesign` key, add `faq` key; `services.tabs` (EN+ES): remove dead `webDesign` key; add new `faq` block (EN+ES) |
| `src/app/college-advising/page.tsx` | Modify | Reorder cost-comparison section above Story Block; rename `scenario.stages`→`scenario.tags` in JSX |
| `src/app/services/page.tsx` | Modify | Academic tab: swap Presentation/Ask-Anything card positions; Business tab: absorb Web Design content, drop separate Web Design tab; `Tab` type and `tabs` array shrink from 5 to 4 entries |
| `src/app/contact/page.tsx` | Modify | Remove Calendly column; single-column layout with `ContactForm` only |
| `src/components/ContactForm.tsx` | Modify | Add preferred-date and preferred-time optional fields |
| `src/lib/constants.ts` | Modify | Remove now-unused `CALENDLY_URL` |
| `src/app/business-startup/page.tsx` | Modify | Add Web Design section (reusing `t.webDesign.*` content) |
| `src/app/web-design/page.tsx` | Modify | Replace entire page with a client-side redirect to `/business-startup` |
| `src/app/faq/page.tsx` | Create | New FAQ page following the `/about` page's hero+content pattern |
| `src/components/Navbar.tsx` | Modify | Remove Web Design from `serviceLinks`; add top-level Pricing and FAQ links (desktop + mobile) |

---

## Task 1: Realign `/college-advising` with the new pricing ladder

**Files:**
- Modify: `src/lib/translations.ts:182-295` (EN `collegeAdvising` block)
- Modify: `src/lib/translations.ts:1046-1159` (ES `collegeAdvising` block)
- Modify: `src/app/college-advising/page.tsx`

**Interfaces:**
- Produces: `ca.scenarios[].tags` (renamed from `.stages` — `string[]`), identical shape in EN/ES.
- Consumes: nothing from other tasks. Does **not** touch `businessStartup.scenarios` (a different block, still using `.stages` — leave it alone).

- [ ] **Step 1: Replace the EN `collegeAdvising` block**

In `src/lib/translations.ts`, find the block starting at line 182 (`    collegeAdvising: {`) and ending at line 295 (the `},` immediately before `    businessStartup: {`). Replace it with:

```typescript
    collegeAdvising: {
      eyebrow: "Academic & University Support",
      heroTitle: "Your bridge to college, from first question to first day of class.",
      heroSub: "We help students and families navigate college admissions, financial aid, and university systems, with someone who has been inside these institutions and knows exactly how they work.",
      heroSubEs: "Tu puente hacia la universidad, desde la primera pregunta hasta el primer día de clases.",
      heroCta: "See How to Get Started",
      heroPricing: "See Pricing →",
      storyHeading: "Most families don't know what they don't know.",
      storyP1: "The college process has deadlines, documents, financial forms, portals, and unwritten rules that no one explains to first-generation families. Students miss opportunities, not because of talent, but because of information.",
      storyP2: "Puente exists to close that gap. With someone who has been inside these systems as a student, as a staff member, and now as your guide.",
      storyQuote: "My daughter got accepted, but we don't understand what to do next.",
      storyQuoteAttr: "The question Puente was built to answer.",
      stats: [
        { number: "7", label: "Stages of support, from first question to first day of class" },
        { number: "EN / ES", label: "Fully bilingual sessions for students and families" },
        { number: "1:1", label: "Personalized guidance, never cookie-cutter" },
        { number: "$20", label: "Where every family starts — a live community presentation" },
      ],
      costComparison: {
        heading: "One Wrong Turn Can Cost More Than College Itself",
        points: [
          "The average bachelor's degree costs about $146,795 total. A for-profit school, non-transferring credits, or a bad loan can waste years and tens of thousands of dollars of that.",
          "31% of Latino students at 4-year Texas universities never finish — often because of missing information, not missing money.",
        ],
        closingLine: "A misstep can cost thousands. Getting it right starts at $20.",
      },
      stagesEyebrow: "What We Cover",
      stagesHeading: "The 7-Stage Academic Roadmap",
      stagesIntro: "Every student enters at a different point. We start wherever you are and build forward from there. No wasted sessions, no generic checklists.",
      stages: [
        {
          num: "01",
          title: "Direction & Discovery",
          description: "Before applications, students need clarity. We help identify real goals, explore pathway options, including trade school, community college, and four-year university, and connect career interests to academic directions. Parents are part of this conversation from day one.",
          tags: ["Goal setting", "Pathway planning", "Career exploration"],
        },
        {
          num: "02",
          title: "College List & Research",
          description: "Building the right list matters more than applying to the most schools. We research fit vs. reach schools, in-state vs. out-of-state options, and build a personalized list of 8–12 schools with deadlines, requirements, and financial context mapped out.",
          tags: ["School research", "Deadline tracker", "In-state vs out-of-state"],
        },
        {
          num: "03",
          title: "Applications & Documents",
          description: "Applications have moving parts, and missing one can cost a student their spot. We track every required document, organize the application process, and build a letters of recommendation strategy so nothing falls through the cracks.",
          tags: ["Application checklist", "Document tracker", "Recommendation strategy"],
        },
        {
          num: "04",
          title: "Essays & Personal Statement",
          description: "The essay is where a student's story gets told, and most students don't know how to tell it. We work one-on-one to brainstorm, outline, draft, and refine personal statements and supplemental essays. The student's voice stays the student's voice.",
          tags: ["Personal statement", "Essay coaching", "2-round review"],
        },
        {
          num: "05",
          title: "Financial Aid & FAFSA",
          description: "This is where most families lose thousands of dollars without realizing it. We walk through the complete FAFSA process, identify scholarships and grants, explain cost of attendance in plain language, and help families compare aid offers so they can make informed decisions, not guesses.",
          tags: ["FAFSA walkthrough", "Scholarships", "Aid offer comparison", "Grants & loans explained"],
        },
        {
          num: "06",
          title: "Acceptance & Enrollment",
          description: "Getting accepted is step one. What comes next, from orientation and class registration to housing, immunization records, holds, and student portals, can overwhelm any family. We decode every step so a student arrives on campus prepared, not panicked.",
          tags: ["Enrollment checklist", "Portal walkthrough", "Housing steps", "Holds & requirements"],
        },
        {
          num: "07",
          title: "College Success & Ongoing Support",
          description: "Already enrolled? This stage is for students navigating university from the inside. For students already enrolled who need guidance navigating the university from the inside, communicating with professors, managing time, understanding financial aid issues, resolving holds, or dealing with the registrar. Universities are complex. We help students work them.",
          tags: ["Academic success coaching", "Admin problem-solving", "Registrar support"],
        },
      ],
      bilingualHeading: "For families who want to help, but don't know the system.",
      bilingualP1: "Many parents are fully invested in their child's future but have never navigated a U.S. university themselves. Puente translates, not just language, but the entire system.",
      bilingualP2: "We explain what credits mean. How semesters work. What a major is. What FAFSA actually asks. Why a scholarship is different from a loan. We do it in English, in Spanish, or both, in whatever way makes the family feel confident, not confused.",
      bilingualCta: "Book a bilingual session →",
      bilingualCardLabel: "Terms we explain, in both languages",
      bilingualTerms: [
        { en: "Credit hours", es: "Horas de crédito" },
        { en: "Financial aid package", es: "Paquete de ayuda financiera" },
        { en: "Expected Family Contribution", es: "Contribución familiar esperada" },
        { en: "Academic probation", es: "Probación académica" },
        { en: "Demonstrated interest", es: "Interés demostrado" },
        { en: "Cost of attendance", es: "Costo de asistencia" },
      ],
      processEyebrow: "Our Process",
      processHeading: "How it works",
      processIntro: "Four steps. No guesswork. You always know where you stand and what comes next.",
      processSteps: [
        { num: "1", heading: "Start wherever makes sense", description: "Attend a $20 community presentation, book a private family session, or just ask us a question — there's no wrong place to begin." },
        { num: "2", heading: "Get a plan built around your student", description: "In a Private Family Session, we look at your student's grade, GPA, and goals, and hand you a written roadmap — not a generic checklist." },
        { num: "3", heading: "Go as deep as you need", description: "Need more than a plan? Done-With-You puts us alongside you for 8 weekly sessions handling applications, FAFSA, and enrollment together." },
        { num: "4", heading: "Your student arrives ready", description: "Not just accepted. Enrolled, informed, and actually prepared for what comes next." },
      ],
      scenarios: [
        {
          label: "Real examples of how families come to Puente",
          question: "My daughter got accepted to three schools. We have no idea how to compare the financial aid offers or which one is actually affordable.",
          answer: "In a Private Family Session, we sit down with both offers, walk through the real cost of attendance at each school, and explain what is a grant vs. a loan — so the family makes a confident decision, not a panicked one.",
          tags: ["Financial aid comparison", "Private Family Session"],
        },
        {
          label: "Another common situation",
          question: "My son is in 10th grade and has no idea what he wants to do. We don't even know when to start thinking about college.",
          answer: "A Private Family Session starts with a conversation about interests, goals, and options, and gives you a 2-year timeline so the family knows exactly what to do and when — no more wondering where to start.",
          tags: ["Direction & goal-setting", "Private Family Session"],
        },
      ],
      ctaHeading: "Ready to build your bridge?",
      ctaSub: "Every family starts somewhere different — from a $20 community presentation to full hands-on support.",
      ctaButton: "See How to Get Started →",
      disclaimer: "Puente Bilingual Services provides academic navigation assistance and informational guidance only. We are not licensed school counselors, college advisors, or financial aid officers. Clients are responsible for all final decisions and submissions. All advice is informational in nature.",
    },
```

- [ ] **Step 2: Replace the ES `collegeAdvising` block**

In the same file, find the block starting at line 1046 (`    collegeAdvising: {`) and ending at line 1159 (the `},` immediately before `    businessStartup: {`). Replace it with:

```typescript
    collegeAdvising: {
      eyebrow: "Apoyo Académico y Universitario",
      heroTitle: "Tu puente hacia la universidad, desde la primera pregunta hasta el primer día de clases.",
      heroSub: "Ayudamos a estudiantes y familias a navegar las admisiones universitarias, la ayuda financiera y los sistemas universitarios, con alguien que ha estado dentro de estas instituciones y sabe exactamente cómo funcionan.",
      heroSubEs: "Your bridge to college, from first question to first day of class.",
      heroCta: "Mira Cómo Empezar",
      heroPricing: "Ver Precios →",
      storyHeading: "La mayoría de las familias no saben lo que no saben.",
      storyP1: "El proceso universitario tiene plazos, documentos, formularios financieros, portales y reglas no escritas que nadie le explica a las familias de primera generación. Los estudiantes pierden oportunidades, no por falta de talento, sino por falta de información.",
      storyP2: "Puente existe para cerrar esa brecha. Con alguien que ha estado dentro de estos sistemas como estudiante, como personal administrativo, y ahora como tu guía.",
      storyQuote: "Mi hija fue aceptada, pero no entendemos qué hacer ahora.",
      storyQuoteAttr: "La pregunta que Puente fue creado para responder.",
      stats: [
        { number: "7", label: "Etapas de apoyo, desde la primera pregunta hasta el primer día de clases" },
        { number: "EN / ES", label: "Sesiones completamente bilingües para estudiantes y familias" },
        { number: "1:1", label: "Orientación personalizada, nunca genérica" },
        { number: "$20", label: "Donde comienza cada familia — una presentación comunitaria en vivo" },
      ],
      costComparison: {
        heading: "Un Solo Error Puede Costar Más Que la Universidad Misma",
        points: [
          "El costo total promedio de un título de licenciatura es de aproximadamente $146,795. Una escuela con fines de lucro, créditos que no se transfieren, o un mal préstamo pueden desperdiciar años y decenas de miles de dólares de eso.",
          "El 31% de los estudiantes latinos en universidades públicas de 4 años en Texas nunca se gradúan — muchas veces por falta de información, no de dinero.",
        ],
        closingLine: "Un error puede costar miles. Hacerlo bien comienza en $20.",
      },
      stagesEyebrow: "Lo Que Cubrimos",
      stagesHeading: "El Mapa Académico de 7 Etapas",
      stagesIntro: "Cada estudiante entra en un punto diferente. Comenzamos donde estás y avanzamos desde ahí. Sin sesiones desperdiciadas, sin listas genéricas.",
      stages: [
        {
          num: "01",
          title: "Dirección y Descubrimiento",
          description: "Antes de las solicitudes, los estudiantes necesitan claridad. Ayudamos a identificar metas reales, explorar opciones de camino, incluyendo escuela técnica, colegio comunitario y universidad de cuatro años, y conectar los intereses profesionales con las direcciones académicas. Los padres son parte de esta conversación desde el primer día.",
          tags: ["Establecimiento de metas", "Planificación de caminos", "Exploración de carreras"],
        },
        {
          num: "02",
          title: "Lista de Universidades e Investigación",
          description: "Construir la lista correcta importa más que aplicar a la mayoría de las escuelas. Investigamos escuelas que encajan vs. las de mayor alcance, opciones dentro y fuera del estado, y construimos una lista personalizada de 8–12 escuelas con fechas límite, requisitos y contexto financiero.",
          tags: ["Investigación de escuelas", "Rastreador de fechas límite", "Dentro vs. fuera del estado"],
        },
        {
          num: "03",
          title: "Solicitudes y Documentos",
          description: "Las solicitudes tienen muchas partes, y omitir una puede costarle al estudiante su lugar. Rastreamos cada documento requerido, organizamos el proceso de solicitud y desarrollamos una estrategia para las cartas de recomendación.",
          tags: ["Lista de verificación", "Rastreador de documentos", "Estrategia de recomendaciones"],
        },
        {
          num: "04",
          title: "Ensayos y Declaración Personal",
          description: "El ensayo es donde se cuenta la historia del estudiante, y la mayoría no sabe cómo contarla. Trabajamos uno a uno para hacer lluvia de ideas, delinear, redactar y refinar declaraciones personales y ensayos suplementarios. La voz del estudiante permanece siendo la del estudiante.",
          tags: ["Declaración personal", "Asesoría de ensayos", "Revisión en 2 rondas"],
        },
        {
          num: "05",
          title: "Ayuda Financiera y FAFSA",
          description: "Aquí es donde la mayoría de las familias pierden miles de dólares sin darse cuenta. Recorremos el proceso completo del FAFSA, identificamos becas y subsidios, explicamos el costo de asistencia en lenguaje sencillo y ayudamos a las familias a comparar las ofertas de ayuda.",
          tags: ["Guía del FAFSA", "Becas", "Comparación de ofertas", "Becas y préstamos explicados"],
        },
        {
          num: "06",
          title: "Aceptación e Inscripción",
          description: "Ser aceptado es el primer paso. Lo que sigue, desde la orientación y el registro de clases hasta la residencia, los registros de vacunación, los bloqueos y los portales estudiantiles, puede abrumar a cualquier familia. Decodificamos cada paso para que el estudiante llegue al campus preparado, no en pánico.",
          tags: ["Lista de inscripción", "Guía del portal", "Pasos de residencia", "Bloqueos y requisitos"],
        },
        {
          num: "07",
          title: "Éxito Universitario y Apoyo Continuo",
          description: "¿Ya inscrito? Esta etapa es para estudiantes que navegan la universidad desde adentro. Para estudiantes ya inscritos que necesitan orientación para comunicarse con profesores, manejar el tiempo, entender problemas de ayuda financiera, resolver bloqueos o tratar con el registrador. Las universidades son complejas. Ayudamos a los estudiantes a trabajarlas.",
          tags: ["Asesoría de éxito académico", "Resolución de trámites", "Apoyo con el registrador"],
        },
      ],
      bilingualHeading: "Para familias que quieren ayudar, pero no conocen el sistema.",
      bilingualP1: "Muchos padres están completamente comprometidos con el futuro de su hijo pero nunca han navegado una universidad estadounidense. Puente traduce, no solo el idioma, sino todo el sistema.",
      bilingualP2: "Explicamos qué significan los créditos. Cómo funcionan los semestres. Qué es una carrera. Qué pregunta realmente el FAFSA. Por qué una beca es diferente a un préstamo. Lo hacemos en inglés, en español, o en ambos, de la manera que haga que la familia se sienta segura, no confundida.",
      bilingualCta: "Agenda una sesión bilingüe →",
      bilingualCardLabel: "Términos que explicamos, en ambos idiomas",
      bilingualTerms: [
        { en: "Credit hours", es: "Horas de crédito" },
        { en: "Financial aid package", es: "Paquete de ayuda financiera" },
        { en: "Expected Family Contribution", es: "Contribución familiar esperada" },
        { en: "Academic probation", es: "Probación académica" },
        { en: "Demonstrated interest", es: "Interés demostrado" },
        { en: "Cost of attendance", es: "Costo de asistencia" },
      ],
      processEyebrow: "Nuestro Proceso",
      processHeading: "Cómo funciona",
      processIntro: "Cuatro pasos. Sin adivinanzas. Siempre sabes dónde estás y qué viene después.",
      processSteps: [
        { num: "1", heading: "Empieza donde tenga sentido", description: "Asiste a una presentación comunitaria de $20, agenda una sesión privada para tu familia, o simplemente haznos una pregunta — no hay un lugar incorrecto para comenzar." },
        { num: "2", heading: "Obtén un plan hecho para tu estudiante", description: "En una Sesión Privada para tu Familia, revisamos el grado, el GPA y las metas de tu estudiante, y te entregamos una hoja de ruta por escrito — no una lista genérica." },
        { num: "3", heading: "Profundiza tanto como necesites", description: "¿Necesitas más que un plan? Lo Hacemos Juntos te acompaña durante 8 sesiones semanales manejando solicitudes, FAFSA e inscripción en conjunto." },
        { num: "4", heading: "Tu estudiante llega listo", description: "No solo aceptado. Inscrito, informado y realmente preparado para lo que viene." },
      ],
      scenarios: [
        {
          label: "Ejemplos reales de cómo las familias llegan a Puente",
          question: "Mi hija fue aceptada en tres universidades. No tenemos idea de cómo comparar las ofertas de ayuda financiera o cuál es realmente accesible.",
          answer: "En una Sesión Privada para tu Familia, nos sentamos con ambas ofertas, revisamos el costo de asistencia real en cada escuela, y explicamos qué es una beca versus un préstamo — para que la familia tome una decisión con confianza, no en pánico.",
          tags: ["Comparación de ayuda financiera", "Sesión Privada para tu Familia"],
        },
        {
          label: "Otra situación común",
          question: "Mi hijo está en décimo grado y no sabe qué quiere hacer. Ni siquiera sabemos cuándo empezar a pensar en la universidad.",
          answer: "Una Sesión Privada para tu Familia comienza con una conversación sobre intereses, metas y opciones, y te da un cronograma de 2 años para que la familia sepa exactamente qué hacer y cuándo — sin más dudas sobre por dónde empezar.",
          tags: ["Dirección y definición de metas", "Sesión Privada para tu Familia"],
        },
      ],
      ctaHeading: "¿Listo para construir tu puente?",
      ctaSub: "Cada familia comienza en un punto diferente — desde una presentación comunitaria de $20 hasta apoyo completo paso a paso.",
      ctaButton: "Mira Cómo Empezar →",
      disclaimer: "Puente Bilingual Services proporciona asistencia de navegación académica y orientación informativa únicamente. No somos consejeros escolares con licencia, asesores universitarios ni funcionarios de ayuda financiera. Los clientes son responsables de todas las decisiones y presentaciones finales. Todo el asesoramiento es de carácter informativo.",
    },
```

- [ ] **Step 3: Reorder the cost-comparison section and rename `stages`→`tags` in `college-advising/page.tsx`**

Replace the entire file `src/app/college-advising/page.tsx` with:

```typescript
"use client";

import Image from "next/image";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import { useLanguage } from "@/context/LanguageContext";

export default function CollegeAdvisingPage() {
  const { t, lang } = useLanguage();
  const ca = t.collegeAdvising;

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
            {ca.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{ca.heroTitle}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-2">{ca.heroSub}</p>
          {lang === "es" && (
            <p className="text-sm text-gray-500 italic mb-8">{ca.heroSubEs}</p>
          )}
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-cream transition-colors"
            >
              {ca.heroCta}
            </Link>
            <Link
              href="/services"
              className="border border-white/30 text-white px-6 py-3 rounded-lg hover:border-white transition-colors"
            >
              {ca.heroPricing}
            </Link>
          </div>
        </div>
      </section>

      {/* Cost Comparison — leads right after the hero */}
      <section className="bg-cream py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary text-center mb-6">
            {ca.costComparison.heading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {ca.costComparison.points.map((point) => (
              <div key={point} className="bg-white border border-gray-100 rounded-xl p-5">
                <p className="text-sm text-body leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
          <p className="text-center font-bold text-primary">{ca.costComparison.closingLine}</p>
        </div>
      </section>

      {/* Story Block */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4 leading-snug">{ca.storyHeading}</h2>
              <p className="text-body mb-4">{ca.storyP1}</p>
              <p className="text-body mb-6">{ca.storyP2}</p>
              <div className="border-l-4 border-accent bg-cream rounded-r-xl p-5">
                <p className="text-primary italic leading-relaxed mb-2">&#8220;{ca.storyQuote}&#8221;</p>
                <p className="text-sm text-gray-400">{ca.storyQuoteAttr}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {ca.stats.map((stat) => (
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

      {/* 7-Stage Roadmap */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
            {ca.stagesEyebrow}
          </p>
          <h2 className="text-3xl font-bold text-primary mb-3">{ca.stagesHeading}</h2>
          <p className="text-body mb-12 max-w-xl">{ca.stagesIntro}</p>

          <div className="divide-y divide-gray-100">
            {ca.stages.map((stage) => (
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
              <h2 className="text-3xl font-bold text-white mb-4 leading-snug">{ca.bilingualHeading}</h2>
              <p className="text-gray-400 mb-4">{ca.bilingualP1}</p>
              <p className="text-gray-400 mb-8">{ca.bilingualP2}</p>
              <Link
                href="/contact"
                className="inline-block bg-accent text-white font-semibold px-6 py-3 rounded-lg hover:bg-accent-light transition-colors"
              >
                {ca.bilingualCta}
              </Link>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xs font-semibold tracking-widest uppercase text-accent-light mb-4">
                {ca.bilingualCardLabel}
              </p>
              <div className="divide-y divide-white/10">
                {ca.bilingualTerms.map((term) => (
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
            {ca.processEyebrow}
          </p>
          <h2 className="text-3xl font-bold text-primary mb-3">{ca.processHeading}</h2>
          <p className="text-body mb-10 max-w-xl">{ca.processIntro}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden">
            {ca.processSteps.map((step) => (
              <div key={step.num} className="bg-white p-6">
                <p className="text-2xl font-bold text-accent mb-3">{step.num}</p>
                <h4 className="text-sm font-semibold text-primary mb-2">{step.heading}</h4>
                <p className="text-xs text-body leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {ca.scenarios.map((scenario, i) => (
            <div key={i} className="mt-6 bg-white border border-gray-100 rounded-2xl p-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
                {scenario.label}
              </p>
              <p className="text-lg italic text-primary mb-4 leading-relaxed">
                &#8220;{scenario.question}&#8221;
              </p>
              <p className="text-sm text-body leading-relaxed">{scenario.answer}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {scenario.tags.map((tag) => (
                  <span key={tag} className="text-xs text-body border border-gray-200 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      {t.testimonials.items.length > 0 && (
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

      {/* CTA */}
      <CTABanner heading={ca.ctaHeading} buttonText={ca.ctaButton} href="/contact" />

      {/* Disclaimer */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
          {ca.disclaimer}
        </p>
      </div>
    </>
  );
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /home/dacruz117/puente-consulting && npm run build 2>&1 | tail -40
```
Expected: `✓ Compiled successfully`. (A pre-existing ESLint plugin warning about `@next/next` conflict is expected/harmless — ignore it.)

- [ ] **Step 5: Verify `businessStartup.scenarios` was not touched**

```bash
git diff src/lib/translations.ts | grep -n "businessStartup" 
```
Expected: no output (the diff should contain zero hunks inside the `businessStartup` block).

- [ ] **Step 6: Commit**

```bash
git add src/lib/translations.ts src/app/college-advising/page.tsx
git commit -m "$(cat <<'EOF'
feat: realign college-advising content with the new pricing ladder

Moves the cost-comparison section to lead right after the hero, and
rewrites "How It Works" and the example scenarios to describe the
4-item ladder (Presentation/Ask-Anything/Private Session/Done-With-You)
instead of the old "work through 7 stages" sales framing. The 7-stage
roadmap itself is untouched — it stays as methodology content.
EOF
)"
```

---

## Task 2: Swap ladder card positions and rename Ask-Anything Hour (ES)

**Files:**
- Modify: `src/lib/translations.ts:522-583` (EN `services.academic` block)
- Modify: `src/lib/translations.ts:1386-1447` (ES `services.academic` block)
- Modify: `src/app/services/page.tsx` (Academic Support tab section only)

**Interfaces:**
- Produces: `s.academic.presentation.note` (new field, `string`), `s.academic.askAnything` (no longer has a `note` field). Both languages have identical shape.
- Consumes: nothing from other tasks.

- [ ] **Step 1: Replace the EN `services.academic` block**

In `src/lib/translations.ts`, find the block starting at line 522 (`      academic: {`) and ending at line 583 (the `},` immediately before `      business: {`). Replace it with:

```typescript
      academic: {
        costComparison: {
          eyebrow: "Why These Prices Make Sense",
          heading: "The Real Cost of Getting This Wrong",
          intro: "A bad college decision costs a lot more than a Puente session ever will.",
          points: [
            "The average bachelor's degree costs about $146,795 total — one wrong turn (the wrong major, the wrong school, a program that doesn't transfer) can waste years and tens of thousands of dollars of that.",
            "Credits that don't transfer mean paying twice for a class you already passed.",
            "Private loans carry variable, high interest with no federal borrower protections — a last resort, not a plan.",
            "31% of Latino students at 4-year Texas universities, and 45% at community colleges, never finish — often because of missing information, not missing money.",
          ],
          closingLine: "A single misstep can cost thousands. Getting it right, with Puente, costs $20 to $375.",
        },
        presentation: {
          name: "Understanding the College Path",
          price: "$20",
          duration: "Live group session, about 75 minutes — per family",
          features: [
            "The full bilingual presentation: the college process, financial-aid traps, and the 9th–12th grade roadmap",
            "Delivered at your church, school, or community group — or book one just for your family",
            "Includes a take-home roadmap, planning checklist, and FAFSA prep guide",
          ],
          cta: "Request a Presentation",
          note: "Prefer a live group session? Request one for your church, school, or community group — or book one just for your family.",
        },
        privateSession: {
          name: "Your Family's Plan",
          price: "$97",
          duration: "One private session, 90–120 minutes",
          features: [
            "Personalized to your student — grade level, GPA, financial-aid situation, and target majors/schools",
            "One deep 1:1 working session, not a canned script",
            "You leave with a written, personalized roadmap to follow",
          ],
          cta: "Book Your Private Session",
        },
        doneWithYou: {
          name: "Done-With-You",
          price: "$375",
          duration: "8 weekly 1:1 sessions over 60 days",
          features: [
            "Full application built together",
            "FAFSA completed together",
            "Enrollment steps handled together",
            "Bilingual family sessions included",
          ],
          valueNote: "8 dedicated working sessions at our standard $75/session rate would run $600. Bundled, it's $375 — you save $225 (37%), plus FAFSA and enrollment support included at no extra charge.",
          cta: "Start Done-With-You",
        },
        askAnything: {
          name: "Ask-Anything Hour",
          price: "$49",
          duration: "1:1, 60 minutes",
          features: [
            "No agenda, no prep required — bring whatever question you have",
            "A specific school, a confusing financial-aid letter, “is this offer legit” — anything",
            "Book any time, whether or not you've done anything else with us",
          ],
          cta: "Book Your Ask-Anything Hour",
        },
        foundingNote: "Founding client pricing — limited to 5 spots. Rate increases once spots are filled.",
      },
```

- [ ] **Step 2: Replace the ES `services.academic` block**

In the same file, find the block starting at line 1386 (`      academic: {`) and ending at line 1447 (the `},` immediately before `      business: {`). Replace it with:

```typescript
      academic: {
        costComparison: {
          eyebrow: "Por Qué Estos Precios Tienen Sentido",
          heading: "El Verdadero Costo de Equivocarse",
          intro: "Una mala decisión universitaria cuesta mucho más que cualquier sesión con Puente.",
          points: [
            "El costo total promedio de un título de licenciatura es de aproximadamente $146,795 — un solo paso en falso (la carrera equivocada, la escuela equivocada, un programa cuyos créditos no se transfieren) puede desperdiciar años y decenas de miles de dólares de eso.",
            "Los créditos que no se transfieren significan pagar dos veces por una clase que ya aprobaste.",
            "Los préstamos privados tienen tasas de interés variables y altas, sin protecciones federales — un último recurso, no un plan.",
            "El 31% de los estudiantes latinos en universidades públicas de 4 años en Texas, y el 45% en colegios comunitarios, nunca se gradúan — muchas veces por falta de información, no de dinero.",
          ],
          closingLine: "Un solo error puede costar miles. Hacerlo bien, con Puente, cuesta entre $20 y $375.",
        },
        presentation: {
          name: "Entendiendo el Camino Universitario",
          price: "$20",
          duration: "Sesión grupal en vivo, aproximadamente 75 minutos — por familia",
          features: [
            "La presentación bilingüe completa: el proceso universitario, las trampas de la ayuda financiera y el mapa de 9° a 12° grado",
            "La presentamos en tu iglesia, escuela o grupo comunitario — o agenda una solo para tu familia",
            "Incluye una hoja de ruta, lista de verificación y guía de preparación del FAFSA para llevar a casa",
          ],
          cta: "Solicitar una Presentación",
          note: "¿Prefieres una sesión grupal en vivo? Solicita una para tu iglesia, escuela o grupo comunitario — o agenda una solo para tu familia.",
        },
        privateSession: {
          name: "El Plan Para Tu Familia",
          price: "$97",
          duration: "Una sesión privada, de 90 a 120 minutos",
          features: [
            "Personalizada para tu estudiante — grado escolar, GPA, situación de ayuda financiera y carreras/escuelas de interés",
            "Una sesión de trabajo profunda 1:1, no un guion genérico",
            "Te vas con una hoja de ruta personalizada y por escrito para seguir",
          ],
          cta: "Agenda Tu Sesión Privada",
        },
        doneWithYou: {
          name: "Lo Hacemos Juntos",
          price: "$375",
          duration: "8 sesiones semanales 1:1 durante 60 días",
          features: [
            "Solicitud completa construida juntos",
            "FAFSA completado juntos",
            "Pasos de inscripción manejados juntos",
            "Sesiones familiares bilingües incluidas",
          ],
          valueNote: "8 sesiones de trabajo dedicadas a nuestra tarifa estándar de $75/sesión costarían $600. En paquete, son $375 — ahorras $225 (37%), además de apoyo con el FAFSA y la inscripción incluido sin costo adicional.",
          cta: "Comienza Lo Hacemos Juntos",
        },
        askAnything: {
          name: "Consulta Abierta",
          price: "$49",
          duration: "1:1, 60 minutos",
          features: [
            "Sin agenda, sin preparación necesaria — trae la pregunta que tengas",
            "Una escuela específica, una carta de ayuda financiera confusa, «¿esta oferta es legítima?» — lo que sea",
            "Agenda en cualquier momento, hayas usado o no otro de nuestros servicios",
          ],
          cta: "Agenda Tu Hora de Preguntas",
        },
        foundingNote: "Precios de cliente fundador — limitado a 5 cupos. La tarifa sube cuando se llenen.",
      },
```

- [ ] **Step 3: Swap card positions in the Academic Support tab JSX**

In `src/app/services/page.tsx`, find the "Ladder: Presentation, Private Session, Done-With-You" section and the "Ask-Anything Hour — standalone" section. Replace **both** sections (from `{/* Ladder: Presentation, Private Session, Done-With-You */}` through the end of the standalone Ask-Anything section, i.e. everything between the cost-comparison `</section>` and the closing `</>`/`)}` of the Academic tab) with:

```typescript
          {/* Ladder: Ask-Anything, Private Session, Done-With-You */}
          <section className="py-20 bg-cream">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-primary text-center mb-12">
                {s.packagesTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-6">
                {[s.academic.askAnything, s.academic.privateSession, s.academic.doneWithYou].map(
                  (pkg, i) => {
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
                            {s.mostPopular}
                          </span>
                        )}
                        <div className="p-8 flex flex-col flex-1">
                          <h3 className={`text-xl font-bold ${isPopular ? "text-white" : "text-primary"}`}>
                            {pkg.name}
                          </h3>
                          <p className={`text-4xl font-bold mt-3 mb-1 ${isPopular ? "text-white" : "text-accent"}`}>
                            {pkg.price}
                          </p>
                          <p className={`text-sm mb-6 ${isPopular ? "text-white/60" : "text-gray-400"}`}>
                            {pkg.duration}
                          </p>
                          <ul className="space-y-3 flex-1 mb-6">
                            {pkg.features.map((f) => (
                              <li key={f} className="flex gap-2 items-start">
                                <svg
                                  className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isPopular ? "text-yellow-400" : "text-accent"}`}
                                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className={`text-sm leading-snug ${isPopular ? "text-white" : "text-body"}`}>
                                  {f}
                                </span>
                              </li>
                            ))}
                          </ul>
                          {i === 2 && (
                            <p className={`text-xs mb-6 leading-relaxed ${isPopular ? "text-white/80" : "text-green-600"}`}>
                              {s.academic.doneWithYou.valueNote}
                            </p>
                          )}
                          <Link
                            href="/contact"
                            className={`block text-center font-semibold px-6 py-3 rounded-lg transition-colors ${
                              isPopular
                                ? "bg-white text-accent hover:bg-cream"
                                : "bg-accent text-white hover:bg-accent-light"
                            }`}
                          >
                            {pkg.cta}
                          </Link>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
              <p className="text-center text-sm text-gray-500 italic">{s.academic.foundingNote}</p>
            </div>
          </section>

          {/* Community Presentation — standalone, live group session */}
          <section className="py-16 bg-white border-t border-gray-100">
            <div className="max-w-lg mx-auto px-4">
              <p className="text-center text-sm text-gray-400 mb-6">{s.academic.presentation.note}</p>
              <div className="bg-cream rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-accent px-8 py-6 text-center">
                  <p className="text-5xl font-bold text-white">{s.academic.presentation.price}</p>
                  <p className="text-white/70 text-sm mt-1">{s.academic.presentation.duration}</p>
                </div>
                <div className="p-8">
                  <h3 className="text-lg font-bold text-primary mb-4 text-center">
                    {s.academic.presentation.name}
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {s.academic.presentation.features.map((f) => (
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
                    {s.academic.presentation.cta}
                  </Link>
                </div>
              </div>
            </div>
          </section>
```

Note: the `note` field moved from `askAnything` to `presentation` — the JSX must read `s.academic.presentation.note` (not `s.academic.askAnything.note`, which no longer exists).

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /home/dacruz117/puente-consulting && npm run build 2>&1 | tail -40
```
Expected: `✓ Compiled successfully`, no reference errors to a `note` field on `askAnything`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/translations.ts src/app/services/page.tsx
git commit -m "$(cat <<'EOF'
feat: swap Ask-Anything/Presentation card positions, rename ES Ask-Anything Hour

Ask-Anything Hour now sits in the main 3-card comparison row;
Community Presentation moves to the standalone spot. Only card
positions change — no pricing or feature changes. ES name for
Ask-Anything Hour changes to "Consulta Abierta".
EOF
)"
```

---

## Task 3: Simplify the contact page and add preferred date/time fields

**Files:**
- Modify: `src/lib/translations.ts` (EN `contact`/`contactForm` blocks, ES `contact`/`contactForm` blocks)
- Modify: `src/app/contact/page.tsx`
- Modify: `src/components/ContactForm.tsx`
- Modify: `src/lib/constants.ts`

**Interfaces:**
- Produces: `contactForm.preferredDate` / `contactForm.preferredTime` (`string` labels, both languages). `contact.bookSession` / `contact.scheduleText` are removed (were Calendly-only copy).
- Consumes: nothing from other tasks.

- [ ] **Step 1: Update the EN `contact` block**

In `src/lib/translations.ts`, find the `contact` block (`    contact: {` — currently around line 452) and replace it with:

```typescript
    contact: {
      heroTitle: "Get in Touch",
      heroSubtitle:
        "Ready to take the next step? Send us a message with your preferred date and time.",
      sendMessage: "Send a Message",
      emailUs: "Or email us directly at",
      responseTime: "We respond to all messages within 24 hours.",
      preferMessage: "Use the form below — we reply personally to every message.",
    },
```

(Removed: `bookSession`, `scheduleText` — Calendly-only copy no longer used anywhere.)

- [ ] **Step 2: Update the ES `contact` block**

Find the ES `contact` block (currently around line 1316) and replace it with:

```typescript
    contact: {
      heroTitle: "Contáctanos",
      heroSubtitle:
        "¿Listo para dar el siguiente paso? Envíanos un mensaje con tu fecha y hora preferidas.",
      sendMessage: "Enviar un Mensaje",
      emailUs: "O escríbenos directamente a",
      responseTime: "Respondemos a todos los mensajes en menos de 24 horas.",
      preferMessage: "Usa el formulario a continuación — respondemos personalmente a cada mensaje.",
    },
```

- [ ] **Step 3: Add preferred-date/time labels to the EN `contactForm` block**

Find the EN `contactForm` block (currently around line 463) and add two new keys after `serviceInterest`/`selectService`/service options, before `message`:

```typescript
      preferredDate: "Preferred date (optional)",
      preferredTime: "Preferred time (optional)",
```

The full block should read:

```typescript
    contactForm: {
      name: "Name",
      email: "Email",
      serviceInterest: "Service Interest",
      selectService: "Select a service...",
      generalAssistance: "General Assistance",
      collegeAdvising: "College Advising",
      businessStartup: "Business Start-Up",
      translationServices: "Translation Services",
      webDesign: "Web Design",
      multipleServices: "Multiple Services",
      preferredDate: "Preferred date (optional)",
      preferredTime: "Preferred time (optional)",
      message: "Message",
      sendMessage: "Send Message",
      thankYou: "Thank you!",
      receivedMessage: "We've received your message and will get back to you soon.",
      errorMessage: "Something went wrong. Please try again.",
    },
```

- [ ] **Step 4: Add preferred-date/time labels to the ES `contactForm` block**

Find the ES `contactForm` block (currently around line 1327) and add the equivalent keys:

```typescript
    contactForm: {
      name: "Nombre",
      email: "Correo electrónico",
      serviceInterest: "Servicio de Interés",
      selectService: "Selecciona un servicio...",
      generalAssistance: "Asistencia General",
      collegeAdvising: "Asesoría Universitaria",
      businessStartup: "Inicio de Negocios",
      translationServices: "Servicios de Traducción",
      webDesign: "Diseño Web",
      multipleServices: "Múltiples Servicios",
      preferredDate: "Fecha preferida (opcional)",
      preferredTime: "Hora preferida (opcional)",
      message: "Mensaje",
      sendMessage: "Enviar Mensaje",
      thankYou: "¡Gracias!",
      receivedMessage: "Hemos recibido tu mensaje y nos pondremos en contacto pronto.",
      errorMessage: "Algo salió mal. Por favor intenta de nuevo.",
    },
```

- [ ] **Step 5: Remove the Calendly column from `contact/page.tsx`**

Replace the entire file `src/app/contact/page.tsx` with:

```typescript
"use client";

import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";

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
        <div className="max-w-2xl mx-auto px-4">
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
      </section>
    </>
  );
}
```

- [ ] **Step 6: Add preferred-date/time fields to `ContactForm.tsx`**

In `src/components/ContactForm.tsx`, find the `<div>` block for the `service` select field (the one containing `<select id="service" name="service" ...>`) and add two new fields immediately after it, before the `message` textarea block:

```typescript
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="preferred_date" className="block text-sm font-medium text-primary mb-1">
            {t.contactForm.preferredDate}
          </label>
          <input
            type="date"
            id="preferred_date"
            name="preferred_date"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-body focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="preferred_time" className="block text-sm font-medium text-primary mb-1">
            {t.contactForm.preferredTime}
          </label>
          <input
            type="time"
            id="preferred_time"
            name="preferred_time"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-body focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>
```

Neither field has `required` — they're optional preferences. Since the form already submits via `FormData(form)` to Web3Forms, these new named inputs are automatically included in the submission with no changes needed to `handleSubmit`.

- [ ] **Step 7: Remove the now-unused `CALENDLY_URL` constant**

```bash
grep -rn "CALENDLY_URL" src/ 
```
Expected: no matches (the only usage was in `contact/page.tsx`, just removed in Step 5).

Replace the entire file `src/lib/constants.ts` with an empty export removed — since this was the file's only constant, delete the file entirely:

```bash
rm src/lib/constants.ts
```

- [ ] **Step 8: Verify TypeScript compiles**

```bash
cd /home/dacruz117/puente-consulting && npm run build 2>&1 | tail -40
```
Expected: `✓ Compiled successfully`, no error about a missing `CALENDLY_URL` import (confirms Step 5's removal of the import was complete) and no error about `src/lib/constants.ts` being imported anywhere else.

- [ ] **Step 9: Commit**

```bash
git add -A src/lib/translations.ts src/app/contact/page.tsx src/components/ContactForm.tsx src/lib/constants.ts
git commit -m "$(cat <<'EOF'
feat: simplify contact page to a single message form with date/time fields

Removes the embedded Calendly widget — the message form is now the
only way to reach out, with new optional preferred-date and
preferred-time fields so requests can be confirmed manually by email.
No booking/calendar system is introduced.
EOF
)"
```

---

## Task 4: Merge Web Design content into Business Start-Up

**Files:**
- Modify: `src/app/business-startup/page.tsx`
- Modify: `src/app/web-design/page.tsx`
- Modify: `src/lib/translations.ts` (EN + ES `webDesign` blocks — remove dead `ctaHeading`/`ctaSub`/`ctaButton`)

**Interfaces:**
- Consumes: `t.webDesign.*` (unchanged shape except three removed keys), rendered from within `business-startup/page.tsx` instead of its own page.
- Produces: nothing new consumed by later tasks. Task 6 (Navbar + services tab merge) depends on this task being done first only in the sense that both reference the same underlying `t.webDesign.*` data — there's no code dependency between the files themselves.

- [ ] **Step 1: Remove dead `ctaHeading`/`ctaSub`/`ctaButton` from the EN `webDesign` block**

In `src/lib/translations.ts`, find the EN `webDesign` block (`    webDesign: {` — currently around line 726) and remove these three lines:

```typescript
      ctaHeading: "Not sure where to start?",
      ctaSub: "The intro call is free. We'll figure out together what you need.",
      ctaButton: "Book a Free Intro Call →",
```

These become unused once `web-design/page.tsx` (Step 3 below) no longer renders its own CTA section — the merged content on `/business-startup` reuses that page's existing shared CTA banner instead.

- [ ] **Step 2: Remove the same three dead keys from the ES `webDesign` block**

Find the ES `webDesign` block (currently around line 1590) and remove:

```typescript
      ctaHeading: "¿No sabe por dónde empezar?",
      ctaSub: "La llamada inicial es gratis. Juntos descubriremos qué necesita.",
      ctaButton: "Agenda una Llamada Gratuita →",
```

- [ ] **Step 3: Replace `web-design/page.tsx` with a client-side redirect**

This is a static-export site (`output: 'export'` in `next.config.js`), so server-side `redirects()` config doesn't apply. Replace the entire file `src/app/web-design/page.tsx` with:

```typescript
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WebDesignRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/business-startup");
  }, [router]);

  return null;
}
```

- [ ] **Step 4: Add a Web Design section to `business-startup/page.tsx`**

In `src/app/business-startup/page.tsx`:

1. Add `CheckIcon` to the existing imports:

```typescript
import CheckIcon from "@/components/CheckIcon";
```

2. Add a `wd` alias next to the existing `bs` alias:

```typescript
  const { t, lang } = useLanguage();
  const bs = t.businessStartup;
  const wd = t.webDesign;
```

3. Insert a new section immediately after the "How It Works + Scenarios" section's closing `</section>` (the one containing `{ca.scenarios...}`... i.e. the section that maps `bs.processSteps` and `bs.scenarios`) and before the `{/* Testimonials */}` block:

```typescript
      <hr className="border-gray-100" />

      {/* Web Design Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
              {lang === "en" ? "Also Available" : "También Disponible"}
            </p>
            <h2 className="text-3xl font-bold text-primary mb-3">{wd.heroTitle}</h2>
            <p className="text-body">{wd.heroSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">{wd.differentiatorHeading}</h3>
              <p className="text-body mb-4">{wd.differentiatorP1}</p>
              <p className="text-body">{wd.differentiatorP2}</p>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-6">
            {wd.packages.map((pkg, i) => {
              const isPopular = i === 1;
              return (
                <div
                  key={pkg.name}
                  className={`rounded-2xl overflow-hidden flex flex-col relative shadow-sm ${
                    isPopular ? "bg-accent text-white ring-2 ring-accent" : "bg-cream border border-gray-100"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                      {wd.mostPopular}
                    </span>
                  )}
                  <div className="p-8 flex flex-col flex-1">
                    <h4 className={`text-xl font-bold mb-4 ${isPopular ? "text-white" : "text-primary"}`}>
                      {pkg.name}
                    </h4>
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
                      href="/contact"
                      className={`block text-center font-semibold px-6 py-3 rounded-lg transition-colors ${
                        isPopular ? "bg-white text-accent hover:bg-cream" : "bg-accent text-white hover:bg-accent-light"
                      }`}
                    >
                      {wd.packageCta}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs text-gray-500 italic mb-16">{wd.turnaroundNote}</p>

          <h3 className="text-2xl font-bold text-primary text-center mb-10">{wd.howItWorksHeading}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden mb-16">
            {wd.howItWorksSteps.map((step) => (
              <div key={step.num} className="bg-white p-6">
                <p className="text-2xl font-bold text-accent mb-3">{step.num}</p>
                <h4 className="text-sm font-semibold text-primary mb-2">{step.heading}</h4>
                <p className="text-xs text-body leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-primary text-center mb-2">{wd.addOnsTitle}</h3>
            <p className="text-body text-center mb-8">{wd.addOnsSubtitle}</p>
            <div className="bg-cream border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
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

          <p className="max-w-6xl mx-auto text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
            {wd.disclaimer}
          </p>
        </div>
      </section>

      <hr className="border-gray-100" />
```

This section keeps `wd.disclaimer` visible (Web Design has its own, legally distinct disclaimer from `bs.disclaimer` at the bottom of the page — both are shown, neither is dropped).

- [ ] **Step 5: Verify TypeScript compiles**

```bash
cd /home/dacruz117/puente-consulting && npm run build 2>&1 | tail -40
```
Expected: `✓ Compiled successfully`, with `/web-design` and `/business-startup` both still listed as routes.

- [ ] **Step 6: Verify no leftover references to the removed `webDesign.ctaHeading`/`ctaSub`/`ctaButton`**

```bash
grep -rn "wd.ctaHeading\|wd.ctaSub\|wd.ctaButton\|webDesign.ctaHeading\|webDesign.ctaSub\|webDesign.ctaButton" src/
```
Expected: no matches.

- [ ] **Step 7: Commit**

```bash
git add src/app/business-startup/page.tsx src/app/web-design/page.tsx src/lib/translations.ts
git commit -m "$(cat <<'EOF'
feat: merge Web Design content into Business Start-Up page

/web-design becomes a client-side redirect to /business-startup,
which now includes a full Web Design section (differentiators,
pricing tiers, how it works, add-ons, disclaimer) below the existing
Business Start-Up content. Removes three now-dead webDesign CTA
translation keys that were only used by the standalone page's own
CTA banner.
EOF
)"
```

---

## Task 5: New FAQ page and content

**Files:**
- Create: `src/app/faq/page.tsx`
- Modify: `src/lib/translations.ts` (add `faq` block to EN + ES)

**Interfaces:**
- Produces: `t.faq.{eyebrow,heroTitle,heroSubtitle,items[]}` where `items[]` is `{question: string, answer: string}[]`, identical shape in EN/ES.
- Consumes: `t.cta.defaultHeading`/`t.cta.defaultButton` (existing shared keys) for the bottom CTA banner — no new CTA copy needed.

- [ ] **Step 1: Add the `faq` block to the EN translations**

In `src/lib/translations.ts`, inside the `en: { ... }` root object, add a new `faq` key. Insert it directly after the `didYouKnow: { ... }` block (or any other top-level content block inside `en`) — exact position among siblings doesn't matter, only that it's a direct child of `en`:

```typescript
    faq: {
      eyebrow: "Frequently Asked Questions",
      heroTitle: "Questions? We've Got Answers.",
      heroSubtitle: "Everything you need to know about how Puente works, in plain language.",
      items: [
        {
          question: "What is Puente?",
          answer: "Puente is a bilingual consulting practice based in Central Texas. We help first-generation families navigate college admissions, help aspiring entrepreneurs start their businesses, and offer translation and web design support — all in English and Spanish.",
        },
        {
          question: "Who is college advising for?",
          answer: "Families of students from middle school through college, especially first-generation, Spanish-speaking families who want a personalized guide through admissions, financial aid, and enrollment — not a generic checklist.",
        },
        {
          question: "What's the difference between the Community Presentation, Ask-Anything Hour, Private Family Session, and Done-With-You?",
          answer: "The Community Presentation ($20) is a live group session covering the full college-process overview. The Ask-Anything Hour ($49) is a flexible 1:1 hour for any specific question, no prep needed. The Private Family Session ($97) is a deep, personalized 1:1 session that ends with a written roadmap for your student. Done-With-You ($375) is 8 weekly sessions where we handle applications, FAFSA, and enrollment together.",
        },
        {
          question: "Do I have to attend the Community Presentation before booking anything else?",
          answer: "No — you can start wherever makes sense for you. The presentation is a good low-cost starting point, but you're welcome to book a Private Family Session or Ask-Anything Hour directly.",
        },
        {
          question: "Are your services offered in Spanish?",
          answer: "Yes. Every session, document, and page on this site is available in both English and Spanish — pick whichever language works best for your family, or mix both.",
        },
        {
          question: "How do I book a session?",
          answer: "Send a message through the Contact page with your preferred date and time, and we'll follow up by email to confirm. There's no online booking system — every request gets a personal reply.",
        },
        {
          question: "What if I only need help with business start-up or a website, not both?",
          answer: "Business Start-Up and Web Design are shown together because many clients need both, but you can work with us on just one — mention what you need in your message.",
        },
        {
          question: "What grade or age should my student be to start?",
          answer: "We work with students from middle school through college, but the earlier you start — ideally 9th grade — the more we can help you plan proactively. The 7-stage roadmap on the College Advising page explains what to expect at each grade level.",
        },
        {
          question: "Do you offer translation services on their own?",
          answer: "Yes — Translation Services is its own line, independent of college advising or business consulting. See the Services & Pricing page for details.",
        },
      ],
    },
```

- [ ] **Step 2: Add the `faq` block to the ES translations**

Inside the `es: { ... }` root object (add as a sibling near the ES `didYouKnow` block, matching where you inserted the EN version):

```typescript
    faq: {
      eyebrow: "Preguntas Frecuentes",
      heroTitle: "¿Preguntas? Tenemos Respuestas.",
      heroSubtitle: "Todo lo que necesitas saber sobre cómo funciona Puente, en lenguaje sencillo.",
      items: [
        {
          question: "¿Qué es Puente?",
          answer: "Puente es una consultoría bilingüe con sede en el centro de Texas. Ayudamos a familias de primera generación a navegar las admisiones universitarias, ayudamos a futuros emprendedores a iniciar sus negocios, y ofrecemos apoyo de traducción y diseño web — todo en inglés y español.",
        },
        {
          question: "¿Para quién es la asesoría universitaria?",
          answer: "Para familias de estudiantes desde la escuela secundaria hasta la universidad, especialmente familias de primera generación que hablan español y quieren una guía personalizada en admisiones, ayuda financiera e inscripción — no una lista genérica.",
        },
        {
          question: "¿Cuál es la diferencia entre la Presentación Comunitaria, la Consulta Abierta, la Sesión Privada para tu Familia y Lo Hacemos Juntos?",
          answer: "La Presentación Comunitaria ($20) es una sesión grupal en vivo que cubre todo el proceso universitario. La Consulta Abierta ($49) es una hora flexible 1:1 para cualquier pregunta específica, sin preparación necesaria. La Sesión Privada para tu Familia ($97) es una sesión profunda y personalizada 1:1 que termina con una hoja de ruta por escrito para tu estudiante. Lo Hacemos Juntos ($375) son 8 sesiones semanales donde manejamos juntos las solicitudes, el FAFSA y la inscripción.",
        },
        {
          question: "¿Tengo que asistir a la Presentación Comunitaria antes de reservar algo más?",
          answer: "No — puedes comenzar donde tenga sentido para ti. La presentación es un buen punto de partida de bajo costo, pero también puedes reservar una Sesión Privada para tu Familia o una Consulta Abierta directamente.",
        },
        {
          question: "¿Sus servicios están disponibles en español?",
          answer: "Sí. Cada sesión, documento y página de este sitio está disponible en inglés y español — elige el idioma que mejor funcione para tu familia, o combina ambos.",
        },
        {
          question: "¿Cómo reservo una sesión?",
          answer: "Envía un mensaje a través de la página de Contacto con tu fecha y hora preferidas, y te responderemos por correo electrónico para confirmar. No hay un sistema de reservas automático — cada solicitud recibe una respuesta personal.",
        },
        {
          question: "¿Qué pasa si solo necesito ayuda con el inicio de negocio o con un sitio web, no ambos?",
          answer: "Inicio de Negocios y Diseño Web se presentan juntos porque muchos clientes necesitan ambos, pero puedes trabajar con nosotros en solo uno — menciónalo en tu mensaje.",
        },
        {
          question: "¿En qué grado o edad debería estar mi estudiante para comenzar?",
          answer: "Trabajamos con estudiantes desde la escuela secundaria hasta la universidad, pero mientras antes empieces — idealmente en 9° grado — más podemos ayudarte a planificar de forma proactiva. El mapa de 7 etapas en la página de Asesoría Universitaria explica qué esperar en cada grado.",
        },
        {
          question: "¿Ofrecen servicios de traducción por separado?",
          answer: "Sí — Servicios de Traducción es su propia línea, independiente de la asesoría universitaria o la consultoría de negocios. Consulta la página de Servicios y Precios para más detalles.",
        },
      ],
    },
```

- [ ] **Step 3: Create the FAQ page**

Create `src/app/faq/page.tsx`:

```typescript
"use client";

import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import { useLanguage } from "@/context/LanguageContext";

export default function FaqPage() {
  const { t } = useLanguage();
  const faq = t.faq;

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

      {/* Q&A List */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          {faq.items.map((item) => (
            <div key={item.question} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-primary mb-2">{item.question}</h3>
              <p className="text-body leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CTABanner heading={t.cta.defaultHeading} buttonText={t.cta.defaultButton} href="/contact" />
    </>
  );
}
```

This follows the same hero+content pattern as `src/app/about/page.tsx`, using the existing `CTABanner` component and the already-shared `t.cta.defaultHeading`/`defaultButton` keys (no new CTA copy needed).

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /home/dacruz117/puente-consulting && npm run build 2>&1 | tail -40
```
Expected: `✓ Compiled successfully`, with `/faq` listed as a new route.

- [ ] **Step 5: Commit**

```bash
git add src/app/faq/page.tsx src/lib/translations.ts
git commit -m "$(cat <<'EOF'
feat: add FAQ page with 9 bilingual Q&A pairs

Covers what Puente does, who college advising is for, how the
4-item pricing ladder works, bilingual support, booking, the
Business Start-Up/Web Design merge, student age/grade guidance, and
standalone translation services. Follows the existing /about page's
hero+content layout pattern.
EOF
)"
```

---

## Task 6: Navbar updates and services-page tab merge

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/app/services/page.tsx` (Business Start-Up tab + tab list — separate section from Task 2's Academic tab changes)
- Modify: `src/lib/translations.ts` (EN + ES `nav` blocks: remove dead `webDesign` key, add nothing new — `pricing`/`precios` already exist unused; EN + ES `services.tabs` blocks: remove dead `webDesign` key)

**Interfaces:**
- Consumes: `/faq` page (created in Task 5) and the merged Web Design content already living on `/business-startup` (Task 4) — this task only changes navigation and the services-page tab structure, not the underlying pages' content.
- Produces: nothing consumed by later tasks (this is the last task).

- [ ] **Step 1: Remove the dead `nav.webDesign` key (EN)**

In `src/lib/translations.ts`, find the EN `nav` block (`    nav: {` — currently around line 5) and remove the line:

```typescript
      webDesign: "Web Design",
```

The block should read:

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

(Also adds the new `faq` key here.)

- [ ] **Step 2: Remove the dead `nav.webDesign` key (ES), add `nav.faq`**

Find the ES `nav` block (currently around line 869) and update it to:

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

- [ ] **Step 3: Update `Navbar.tsx` — drop Web Design from `serviceLinks`, add Pricing and FAQ links**

In `src/components/Navbar.tsx`:

1. Update the `serviceLinks` array (remove the Web Design entry):

```typescript
  const serviceLinks = [
    { href: "/college-advising", label: t.nav.collegeAdvising },
    { href: "/business-startup", label: t.nav.businessStartup },
    { href: "/translation-services", label: t.nav.translationServices },
  ];
```

2. Add `pricingActive` and `faqActive` next to the existing `aboutActive`/`didYouKnowActive` computed values:

```typescript
  const aboutActive = pathname === "/about";
  const didYouKnowActive = pathname === "/did-you-know";
  const pricingActive = pathname === "/services";
  const faqActive = pathname === "/faq";
```

Note: `serviceHrefs`/`servicesActive` already includes `/services` (see the existing `serviceHrefs = serviceLinks.map((l) => l.href).concat("/services")` line) — that's fine, it just means the "Services" dropdown trigger and the new standalone "Pricing" link can both be visually active at the same time when on `/services`. This is expected: two different nav entries point to the same page.

3. In the desktop nav (inside `<div className="hidden md:flex items-center justify-center gap-6">`), replace the existing `<Link href="/about">` and `<Link href="/did-you-know">` block with this expanded 4-link block (About, Pricing, Did You Know, FAQ, in that order):

```typescript
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

4. In the mobile menu (inside the `{mobileOpen && (...)}` block), replace the existing `<Link href="/about">` and `<Link href="/did-you-know">` mobile entries with this expanded 4-link block (About, Pricing, Did You Know, FAQ, in that order):

```typescript
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

- [ ] **Step 4: Remove the dead `services.tabs.webDesign` key and merge tabs in `services/page.tsx`**

In `src/lib/translations.ts`, find the EN `services.tabs` object (inside `services: { ... tabs: { ... } }`, currently around line 492) and remove the `webDesign` line:

```typescript
      tabs: {
        general: "General Assistance",
        academic: "Academic Support",
        business: "Business Start-Up",
        translation: "Translation Services",
      },
```

Find the ES equivalent (currently around line 1356) and make the same change:

```typescript
      tabs: {
        general: "Asistencia General",
        academic: "Apoyo Académico",
        business: "Inicio de Negocio",
        translation: "Servicios de Traducción",
      },
```

- [ ] **Step 5: Merge the Business and Web Design tabs in `services/page.tsx`**

In `src/app/services/page.tsx`:

1. Update the `Tab` type (remove `"webDesign"`):

```typescript
type Tab = "general" | "academic" | "business" | "translation";
```

2. Update the `tabs` array (remove the Web Design entry):

```typescript
  const tabs: { key: Tab; label: string }[] = [
    { key: "general", label: s.tabs.general },
    { key: "academic", label: s.tabs.academic },
    { key: "business", label: s.tabs.business },
    { key: "translation", label: s.tabs.translation },
  ];
```

3. Find the entire `{/* ── WEB DESIGN TAB ── */}` block (`{activeTab === "webDesign" && ( ... )}`). Cut its inner content (the `<section>...</section>` containing the `t.webDesign.packages.map(...)` grid) and remove the block's own `{activeTab === "webDesign" && ( ... )}` wrapper entirely — this tab no longer exists as a separate selectable tab.

4. Inside the existing `{/* ── BUSINESS START-UP TAB ── */}` block (`{activeTab === "business" && ( <> ... </> )}`), add a new section for Web Design packages immediately after the existing "Business À la carte" `</section>` and before the closing `</>`:

```typescript
          {/* Web Design (merged into Business tab) */}
          <section className="py-20 bg-cream border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
                  {lang === "en" ? "Also Available" : "También Disponible"}
                </p>
                <h2 className="text-3xl font-bold text-primary">{t.webDesign.heroTitle}</h2>
              </div>
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
                          href="/business-startup"
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
```

Note the CTA link changed from `/web-design` to `/business-startup` (the old target page no longer exists as a standalone page — it now redirects there anyway, but linking directly avoids the redirect hop).

- [ ] **Step 6: Verify TypeScript compiles**

```bash
cd /home/dacruz117/puente-consulting && npm run build 2>&1 | tail -40
```
Expected: `✓ Compiled successfully`, with `/faq` and all existing routes present, and no reference to a `"webDesign"` tab value anywhere.

- [ ] **Step 7: Verify no leftover references to the removed tab/nav keys**

```bash
grep -rn '"webDesign"' src/app/services/page.tsx
grep -n "nav.webDesign\|tabs.webDesign\|tabs\.webDesign" -r src/
```
Expected: the first command shows no matches for the tab-value string `"webDesign"` (the `t.webDesign.*` content object references are fine and expected — only the removed *tab key* string should be gone). The second command shows no matches.

- [ ] **Step 8: Commit**

```bash
git add src/components/Navbar.tsx src/app/services/page.tsx src/lib/translations.ts
git commit -m "$(cat <<'EOF'
feat: merge Web Design tab into Business tab, add Pricing/FAQ nav links

/services now has 4 tabs instead of 5 (Web Design content moved into
the Business Start-Up tab). Navbar gains top-level Pricing and FAQ
links (desktop + mobile), and the now-unused Web Design nav/tab
translation keys are removed.
EOF
)"
```

---

## Self-Review Checklist

- [x] **Cost-comparison repositioned above Story Block on `/college-advising`** — Task 1, Step 3
- [x] **"How It Works" + scenarios rewritten to match the 4-item ladder, `stages`→`tags` rename** — Task 1, Steps 1–3
- [x] **`businessStartup.scenarios` left untouched** — Task 1, Global Constraints + Step 5 verification
- [x] **Ask-Anything Hour swapped into the 3-card row, Presentation moved to standalone spot** — Task 2, Step 3
- [x] **ES Ask-Anything Hour renamed to "Consulta Abierta"** — Task 2, Steps 1–2
- [x] **`note` field moved from `askAnything` to `presentation`** — Task 2, Steps 1–3 (consistent field references)
- [x] **Calendly widget removed, single-column contact form** — Task 3, Step 5
- [x] **Preferred date/time fields added, optional, wired into existing submit flow** — Task 3, Step 6
- [x] **`CALENDLY_URL` and its file removed after confirming no other usage** — Task 3, Step 7
- [x] **Web Design content merged into Business Start-Up page** — Task 4, Step 4
- [x] **`/web-design` becomes a client-side redirect (static-export compatible)** — Task 4, Step 3
- [x] **Dead `webDesign.ctaHeading`/`ctaSub`/`ctaButton` removed** — Task 4, Steps 1–2, verified Step 6
- [x] **New FAQ page with 9 bilingual Q&A pairs** — Task 5
- [x] **Nav: Web Design entry removed from services dropdown; Pricing and FAQ links added (desktop + mobile)** — Task 6, Steps 1–3
- [x] **`services.tabs.webDesign` removed, Business+Web Design tabs merged into one** — Task 6, Steps 4–5
- [x] **Type consistency:** `s.academic.presentation.note` (Task 2) matches between EN/ES and the JSX that reads it; `ca.scenarios[].tags` (Task 1) matches between EN/ES and the JSX; `t.faq.items[]` shape (Task 5) matches between EN/ES and the JSX; `Tab` type (Task 6) matches the `tabs` array and the `activeTab === ...` checks throughout `services/page.tsx`
- [x] **No placeholders** — all copy fully written out in both languages across all tasks

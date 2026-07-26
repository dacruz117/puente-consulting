# College Advising Services Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Academic Support tab's 3-tier + 7-stage à la carte pricing with a 4-item ladder (Community Presentation, Ask-Anything Hour, Private Family Session, Done-With-You) and add a "cost of getting it wrong" comparison section to both `/services` and `/college-advising`.

**Architecture:** All content changes flow through `src/lib/translations.ts` (bilingual `en`/`es` blocks), consumed by `src/app/services/page.tsx` (Academic Support tab) and `src/app/college-advising/page.tsx` (Story Block area). No new files, no new shared components, no backend/API work — this is a content and layout redesign of existing pages, matching the codebase's established pattern of whole-block translation replacement plus inline JSX per page.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, custom `LanguageContext` / `translations.ts` for bilingual content. No test framework exists in this repo — verification is `npm run build` (type-check) plus manual dev-server visual checks, matching every prior plan in `docs/superpowers/plans/`.

## Global Constraints

- Every new user-visible string must be added to **both** `en` and `es` blocks in `translations.ts` — the site has no fallback language.
- `type T = typeof translations[Language]` in `src/context/LanguageContext.tsx` means `en.services.academic` and `es.services.academic` (and `en.collegeAdvising` / `es.collegeAdvising`) must have **matching key shapes** — accessing a key that exists in only one language's object will fail to type-check wherever a page reads it through `t`. Always land both languages' edits together with the page code that reads them, in the same task.
- All new CTAs route to `/contact` (existing site-wide pattern) — no booking/calendar system, per the spec's "Out of Scope."
- The existing 7-stage roadmap content on `/college-advising` (`ca.stagesHeading`, `ca.stages`, etc.) is **not modified** — it stays as the methodology explainer.
- Nothing in the new Academic Support ladder is free — all four items are paid ($20 / $49 / $97 / $375).
- Business Start-Up, Translation Services, and Web Design tabs/pages are **not touched**.

---

## File Map

| File | Action | What changes |
|------|--------|--------------|
| `src/lib/translations.ts` | Modify | Replace `en.services.academic` and `es.services.academic` (drop `packages`/`alaCarte`, add the 4-item ladder + cost comparison); update `en.collegeAdvising` and `es.collegeAdvising` (fix "free intro call" language, add short cost comparison) |
| `src/app/services/page.tsx` | Modify | Replace the "ACADEMIC SUPPORT TAB" JSX block (currently lines 111–247) with the new cost-comparison section + 3-card ladder + standalone Ask-Anything card |
| `src/app/college-advising/page.tsx` | Modify | Insert a new cost-comparison section after the existing Story Block (after line 72, before the `<hr />` at line 74) |

---

## Task 1: Rebuild the Academic Support tab (translations + page)

Translations and the page component must land together: `services/page.tsx` reads `s.academic.presentation`, `s.academic.privateSession`, `s.academic.doneWithYou`, `s.academic.askAnything`, and `s.academic.costComparison` — none of which exist until this task's translation changes are in place, and the old `s.academic.packages` / `s.academic.alaCarte` reads must be removed from the page in the same step or the build breaks.

**Files:**
- Modify: `src/lib/translations.ts:514-646` (EN `academic` block)
- Modify: `src/lib/translations.ts:1441-1573` (ES `academic` block)
- Modify: `src/app/services/page.tsx:111-247` (Academic Support tab JSX)

**Interfaces:**
- Produces: `t.services.academic.costComparison.{eyebrow,heading,intro,points[],closingLine}`, `t.services.academic.presentation.{name,price,duration,features[],cta}`, `t.services.academic.privateSession.{name,price,duration,features[],cta}`, `t.services.academic.doneWithYou.{name,price,duration,features[],valueNote,cta}`, `t.services.academic.askAnything.{name,price,duration,features[],cta,note}`, `t.services.academic.foundingNote` — all `string` or `string[]` leaves, identical shape in `en` and `es`.
- Consumes: existing shared `t.services.packagesTitle` ("Choose a Package"/"Elige un Paquete"), `t.services.mostPopular`, and `CheckIcon`, `CTABanner`-style patterns already in the file. Does not touch `t.services.business`, `t.translationServices`, or `t.webDesign`.

- [ ] **Step 1: Replace the EN `academic` block in `translations.ts`**

In `src/lib/translations.ts`, find the block starting at line 514 (`      academic: {`) and ending at line 646 (the `},` immediately before `      business: {`). Replace that entire block with:

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
          note: "Not a step in a ladder — just a flexible hour whenever you need one.",
        },
        foundingNote: "Founding client pricing — limited to 5 spots. Rate increases once spots are filled.",
      },
```

- [ ] **Step 2: Replace the ES `academic` block in `translations.ts`**

In the same file, find the block starting at line 1441 (`      academic: {`) and ending at line 1573 (the `},` immediately before `      business: {`). Replace that entire block with:

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
          name: "La Hora de Preguntas",
          price: "$49",
          duration: "1:1, 60 minutos",
          features: [
            "Sin agenda, sin preparación necesaria — trae la pregunta que tengas",
            "Una escuela específica, una carta de ayuda financiera confusa, «¿esta oferta es legítima?» — lo que sea",
            "Agenda en cualquier momento, hayas usado o no otro de nuestros servicios",
          ],
          cta: "Agenda Tu Hora de Preguntas",
          note: "No es un escalón de la escalera — solo una hora flexible cuando la necesites.",
        },
        foundingNote: "Precios de cliente fundador — limitado a 5 cupos. La tarifa sube cuando se llenen.",
      },
```

- [ ] **Step 3: Replace the Academic Support tab JSX in `services/page.tsx`**

In `src/app/services/page.tsx`, find the block starting at line 111 (`      {/* ── ACADEMIC SUPPORT TAB ── */}`) and ending at line 247 (`      )}`, immediately before `      {/* ── BUSINESS START-UP TAB ── */}`). Replace that entire block with:

```typescript
      {/* ── ACADEMIC SUPPORT TAB ── */}
      {activeTab === "academic" && (
        <>
          {/* Cost Comparison */}
          <section className="py-20 bg-primary text-white">
            <div className="max-w-5xl mx-auto px-4">
              <p className="text-xs font-semibold tracking-widest uppercase text-accent-light mb-3 text-center">
                {s.academic.costComparison.eyebrow}
              </p>
              <h2 className="text-3xl font-bold text-center mb-4">
                {s.academic.costComparison.heading}
              </h2>
              <p className="text-gray-300 text-center max-w-2xl mx-auto mb-10">
                {s.academic.costComparison.intro}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {s.academic.costComparison.points.map((point) => (
                  <div key={point} className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <p className="text-sm text-gray-300 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
              <div className="bg-accent rounded-xl px-6 py-5 text-center">
                <p className="font-bold">{s.academic.costComparison.closingLine}</p>
              </div>
            </div>
          </section>

          {/* Ladder: Presentation, Private Session, Done-With-You */}
          <section className="py-20 bg-cream">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-primary text-center mb-12">
                {s.packagesTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-6">
                {[s.academic.presentation, s.academic.privateSession, s.academic.doneWithYou].map(
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

          {/* Ask-Anything Hour — standalone, not part of the ladder comparison */}
          <section className="py-16 bg-white border-t border-gray-100">
            <div className="max-w-lg mx-auto px-4">
              <p className="text-center text-sm text-gray-400 mb-6">{s.academic.askAnything.note}</p>
              <div className="bg-cream rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-accent px-8 py-6 text-center">
                  <p className="text-5xl font-bold text-white">{s.academic.askAnything.price}</p>
                  <p className="text-white/70 text-sm mt-1">{s.academic.askAnything.duration}</p>
                </div>
                <div className="p-8">
                  <h3 className="text-lg font-bold text-primary mb-4 text-center">
                    {s.academic.askAnything.name}
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {s.academic.askAnything.features.map((f) => (
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
                    {s.academic.askAnything.cta}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /home/dacruz117/puente-consulting && npm run build 2>&1 | tail -40
```
Expected: `✓ Compiled successfully` with no TypeScript errors referencing `academic`, `packages`, `alaCarte`, `presentation`, `privateSession`, `doneWithYou`, or `askAnything`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/translations.ts src/app/services/page.tsx
git commit -m "$(cat <<'EOF'
feat: replace academic support pricing with 4-item ladder

Removes the 3-tier + 7-stage à la carte pricing system in favor of
a simpler Community Presentation ($20) / Ask-Anything Hour ($49) /
Private Family Session ($97) / Done-With-You ($375) lineup, plus a
cost-comparison section justifying the pricing against the far
larger cost of a bad college decision.
EOF
)"
```

---

## Task 2: Add cost comparison + remove "free" language on `/college-advising`

The existing `/college-advising` page advertises a "$0" intro call and "Book a Free Intro Call" CTAs in three places — this directly contradicts the new pricing philosophy where every academic offering (starting at the $20 presentation) is paid. This task fixes that language and adds a shorter version of the cost-comparison argument near the existing stats block, reinforcing the "why these prices are worth it" narrative earlier in the funnel.

**Files:**
- Modify: `src/lib/translations.ts:182-287` (EN `collegeAdvising` block)
- Modify: `src/lib/translations.ts:1109-1214` (ES `collegeAdvising` block)
- Modify: `src/app/college-advising/page.tsx:49-74` (insert new section after the Story Block)

**Interfaces:**
- Produces: `t.collegeAdvising.costComparison.{heading,points[],closingLine}` (`string`/`string[]`, identical shape in `en` and `es`). Also changes existing `t.collegeAdvising.stats[3]`, `t.collegeAdvising.heroCta`, `t.collegeAdvising.ctaSub`, `t.collegeAdvising.ctaButton` (same keys, new copy — no shape change).
- Consumes: nothing new from Task 1. Fully independent of the `/services` page.

- [ ] **Step 1: Replace the EN `collegeAdvising` block in `translations.ts`**

In `src/lib/translations.ts`, find the block starting at line 182 (`    collegeAdvising: {`) and ending at line 287 (the `},` immediately before `    businessStartup: {`). Replace that entire block with:

```typescript
    collegeAdvising: {
      eyebrow: "Academic & University Support",
      heroTitle: "Your bridge to college, from first question to first day of class.",
      heroSub: "We help students and families navigate college admissions, financial aid, and university systems, with someone who has been inside these institutions and knows exactly how they work.",
      heroSubEs: "Tu puente hacia la universidad, desde la primera pregunta hasta el primer día de clases.",
      heroCta: "See How to Get Started",
      heroPricing: "See Pricing →",
      storyHeading: "Most families don’t know what they don’t know.",
      storyP1: "The college process has deadlines, documents, financial forms, portals, and unwritten rules that no one explains to first-generation families. Students miss opportunities, not because of talent, but because of information.",
      storyP2: "Puente exists to close that gap. With someone who has been inside these systems as a student, as a staff member, and now as your guide.",
      storyQuote: "My daughter got accepted, but we don’t understand what to do next.",
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
          description: "The essay is where a student’s story gets told, and most students don’t know how to tell it. We work one-on-one to brainstorm, outline, draft, and refine personal statements and supplemental essays. The student’s voice stays the student’s voice.",
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
      bilingualHeading: "For families who want to help, but don’t know the system.",
      bilingualP1: "Many parents are fully invested in their child’s future but have never navigated a U.S. university themselves. Puente translates, not just language, but the entire system.",
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
        { num: "1", heading: "We start with a conversation", description: "What’s the goal? Where is the student now? What does the family need most?" },
        { num: "2", heading: "You get a personalized roadmap", description: "We identify which of the 7 stages apply, build your timeline, and create a plan built around your student, not a generic checklist." },
        { num: "3", heading: "We work through it together", description: "Sessions, documents, and real deliverables at every stage. You are never left guessing what to do next." },
        { num: "4", heading: "Your student arrives ready", description: "Not just accepted. Enrolled, informed, and actually prepared for what comes next." },
      ],
      scenarios: [
        {
          label: "Real examples of how families come to Puente",
          question: "My daughter got accepted to three schools. We have no idea how to compare the financial aid offers or which one is actually affordable.",
          answer: "We sit down with both offers, walk through the real cost of attendance at each school, explain what is a grant vs. a loan, and help the family make a confident decision, not a panicked one. This is Stage 5 work, and it is exactly what we are here for.",
          stages: ["Stage 5: Financial Aid", "Aid offer comparison"],
        },
        {
          label: "Another common situation",
          question: "My son is in 10th grade and has no idea what he wants to do. We don’t even know when to start thinking about college.",
          answer: "We start at Stage 1. A conversation about interests, goals, and options. We build a 2-year timeline so the family knows exactly what to do and when, and the student arrives at application season prepared instead of overwhelmed.",
          stages: ["Stage 1: Direction & Discovery", "Stage 2: College List"],
        },
      ],
      ctaHeading: "Ready to build your bridge?",
      ctaSub: "Every family starts somewhere different — from a $20 community presentation to full hands-on support.",
      ctaButton: "See How to Get Started →",
      disclaimer: "Puente Bilingual Services provides academic navigation assistance and informational guidance only. We are not licensed school counselors, college advisors, or financial aid officers. Clients are responsible for all final decisions and submissions. All advice is informational in nature.",
    },
```

- [ ] **Step 2: Replace the ES `collegeAdvising` block in `translations.ts`**

In the same file, find the block starting at line 1109 (`    collegeAdvising: {`) and ending at line 1214 (the `},` immediately before `    businessStartup: {`). Replace that entire block with:

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
        { num: "1", heading: "Comenzamos con una conversación", description: "¿Cuál es la meta? ¿Dónde está el estudiante ahora? ¿Qué necesita más la familia?" },
        { num: "2", heading: "Recibes un mapa personalizado", description: "Identificamos cuáles de las 7 etapas aplican, construimos tu cronograma y creamos un plan diseñado para tu estudiante, no una lista genérica." },
        { num: "3", heading: "Lo trabajamos juntos", description: "Sesiones, documentos y resultados reales en cada etapa. Nunca te quedas sin saber qué hacer después." },
        { num: "4", heading: "Tu estudiante llega listo", description: "No solo aceptado. Inscrito, informado y realmente preparado para lo que viene." },
      ],
      scenarios: [
        {
          label: "Ejemplos reales de cómo las familias llegan a Puente",
          question: "Mi hija fue aceptada en tres universidades. No tenemos idea de cómo comparar las ofertas de ayuda financiera o cuál es realmente accesible.",
          answer: "Nos sentamos con ambas ofertas, revisamos el costo de asistencia real en cada escuela, explicamos qué es una beca versus un préstamo y ayudamos a la familia a tomar una decisión con confianza, no en pánico. Esto es trabajo de la Etapa 5, y es exactamente para lo que estamos aquí.",
          stages: ["Etapa 5: Ayuda Financiera", "Comparación de ofertas"],
        },
        {
          label: "Otra situación común",
          question: "Mi hijo está en décimo grado y no sabe qué quiere hacer. Ni siquiera sabemos cuándo empezar a pensar en la universidad.",
          answer: "Comenzamos en la Etapa 1. Una conversación sobre intereses, metas y opciones. Construimos un cronograma de 2 años para que la familia sepa exactamente qué hacer y cuándo, y el estudiante llega a la temporada de solicitudes preparado en lugar de abrumado.",
          stages: ["Etapa 1: Dirección y Descubrimiento", "Etapa 2: Lista de Universidades"],
        },
      ],
      ctaHeading: "¿Listo para construir tu puente?",
      ctaSub: "Cada familia comienza en un punto diferente — desde una presentación comunitaria de $20 hasta apoyo completo paso a paso.",
      ctaButton: "Mira Cómo Empezar →",
      disclaimer: "Puente Bilingual Services proporciona asistencia de navegación académica y orientación informativa únicamente. No somos consejeros escolares con licencia, asesores universitarios ni funcionarios de ayuda financiera. Los clientes son responsables de todas las decisiones y presentaciones finales. Todo el asesoramiento es de carácter informativo.",
    },
```

- [ ] **Step 3: Insert the cost-comparison section into `college-advising/page.tsx`**

In `src/app/college-advising/page.tsx`, find the closing `</section>` of the Story Block (line 72) and the `<hr className="border-gray-100" />` that follows it (line 74). Insert the new section between them, so the result reads:

```typescript
      </section>

      {/* Cost Comparison */}
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

      <hr className="border-gray-100" />
```

(Only the new `{/* Cost Comparison */}` section is new content — the surrounding `</section>` and `<hr />` already exist in the file and are shown here only to make the insertion point unambiguous.)

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /home/dacruz117/puente-consulting && npm run build 2>&1 | tail -40
```
Expected: `✓ Compiled successfully` with no TypeScript errors referencing `costComparison`, `heroCta`, `ctaSub`, or `ctaButton`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/translations.ts src/app/college-advising/page.tsx
git commit -m "$(cat <<'EOF'
feat: add cost-comparison section and remove free-intro-call language

/college-advising previously advertised a "$0 intro call" and "Book
a Free Intro Call" CTAs, which contradicted the new academic pricing
(nothing is free — every offering starts at $20). Updates that copy
and adds a short cost-of-getting-it-wrong comparison near the
existing Texas stats block.
EOF
)"
```

---

## Task 3: End-to-end verification

**Files:** none (verification only)

- [ ] **Step 1: Final build check**

```bash
cd /home/dacruz117/puente-consulting && npm run build 2>&1
```
Expected: `✓ Compiled successfully`, with `/services` and `/college-advising` both listed in the route output and no TypeScript or lint errors.

- [ ] **Step 2: Start the dev server**

```bash
cd /home/dacruz117/puente-consulting && npm run dev
```
Expected: server starts on `http://localhost:3000` (or the next available port) with no console errors.

- [ ] **Step 3: Visually verify `/services` (Academic Support tab), English**

Open `http://localhost:3000/services` in a browser, ensure the "Academic Support" tab is active, and confirm:
- The navy cost-comparison section renders above the pricing cards with the "Why These Prices Make Sense" eyebrow, heading, 4 points, and the bold "$20 to $375" closing line.
- Three cards render: Understanding the College Path ($20), Your Family's Plan ($97, marked "Most Popular"), Done-With-You ($375, showing the "$600 value... save $225 (37%)" note).
- Below the cards, the founding-client note appears.
- Below that, a visually separate single card for the Ask-Anything Hour ($49) appears with its own "not a step in a ladder" note above it.
- No references to "Show Me the Map," "Walk Me Through It," or the old à la carte stage grid remain anywhere on the tab.

- [ ] **Step 4: Toggle to Spanish and repeat the check**

Use the site's language toggle, reload the Academic Support tab, and confirm all of the above renders correctly in Spanish (Entendiendo el Camino Universitario, El Plan Para Tu Familia, Lo Hacemos Juntos, La Hora de Preguntas) with no English text left over except the intentionally bilingual glossary content elsewhere on the site.

- [ ] **Step 5: Visually verify `/college-advising`, both languages**

Open `http://localhost:3000/college-advising`, confirm:
- The 4th stat now reads "$20 — Where every family starts..." instead of "$0 — Intro call, no commitment."
- The hero and bottom CTA buttons no longer say "Free Intro Call" (English: "See How to Get Started"; Spanish: "Mira Cómo Empezar").
- The new cost-comparison section appears between the Story Block and the 7-Stage Roadmap section, with its heading, 2 points, and bold closing line.
- Toggle to Spanish and confirm the same section renders correctly in Spanish.

- [ ] **Step 6: Check mobile layout**

Resize the browser (or use dev tools device emulation) to a mobile width (~375px) on both pages and confirm the cost-comparison point grids stack to a single column and the 3-card ladder stacks vertically without horizontal overflow.

- [ ] **Step 7: Stop the dev server**

```bash
# Ctrl+C in the terminal running `npm run dev`
```

- [ ] **Step 8: Fix and commit any issues found**

If Steps 3–6 surface any visual bugs, fix them in `src/app/services/page.tsx` or `src/app/college-advising/page.tsx`, re-run Step 1's build check, and commit:

```bash
git add -p
git commit -m "fix: address visual issues found in college advising redesign verification"
```

If no issues are found, no commit is needed for this task.

---

## Self-Review Checklist

- [x] **4-item ladder (Community Presentation $20, Ask-Anything Hour $49, Private Family Session $97, Done-With-You $375)** — Task 1, Steps 1–3
- [x] **Ask-Anything Hour visually standalone, not a 4th comparison card** — Task 1 Step 3 renders it in its own section below the 3-card ladder grid
- [x] **7-stage à la carte grid removed entirely** — Task 1 Step 1/2 replace `academic` with no `alaCarte` key; Task 1 Step 3 removes all JSX referencing it
- [x] **Done-With-You $600-value / $225-savings (37%) framing** — Task 1 Steps 1–3 (`valueNote`, rendered for `i === 2`)
- [x] **7-stage roadmap on `/college-advising` untouched** — Task 2 Step 1/2 preserve `stages` verbatim; only `stats`, `heroCta`, `ctaSub`, `ctaButton`, and the new `costComparison` key change
- [x] **Cost-comparison content on both `/services` (full) and `/college-advising` (short)** — Task 1 Step 3, Task 2 Step 3
- [x] **"Nothing is free" — $0/free-intro-call language removed** — Task 2 Steps 1–2
- [x] **Business Start-Up, Translation Services, Web Design untouched** — no task modifies `s.business`, `t.translationServices`, or `t.webDesign`
- [x] **Bilingual (EN + ES) for every new string** — Task 1 Steps 1–2, Task 2 Steps 1–2
- [x] **All CTAs route to `/contact`** — Task 1 Step 3, matching existing `Link href="/contact"` pattern
- [x] **Type consistency** — `s.academic.{costComparison,presentation,privateSession,doneWithYou,askAnything,foundingNote}` referenced identically in Task 1 Steps 1, 2, and 3; `ca.costComparison.{heading,points,closingLine}` referenced identically in Task 2 Steps 1, 2, and 3
- [x] **No placeholders** — all copy is fully written out in both languages across all tasks

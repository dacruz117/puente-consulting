# Founder Bio Rewrite + Cost-Comparison Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the founder trust/bio block to lead with lived first-generation experience instead of credentials, surface it on the College Advising page (not just Home), and consolidate the two near-duplicate cost-comparison sections (College Advising's short version and `/services`' fuller Academic-tab version) into one fuller section living only on College Advising.

**Architecture:** Ordered so the build never breaks mid-plan: first remove the JSX that reads `services.academic.costComparison` (Task 1, leaves the translation key temporarily unused — harmless), then update all translation content in one pass including removing that now-unused key (Task 2), then add the new JSX on College Advising that reads the newly-added fields (Task 3). Every task ends with `npx tsc --noEmit` and `npm run build` passing.

**Tech Stack:** Next.js 14 App Router (static export via `output: 'export'`), TypeScript, Tailwind CSS, existing `useLanguage` context. Note: `t: T` in `LanguageContext.tsx` is typed as `typeof translations["en"] | typeof translations["es"]` — a union. Accessing a field on `t.xxx.yyy` only type-checks if that field exists on **both** the `en` and `es` branches. Any translation field referenced by JSX must be added to both languages in the same task as each other (not necessarily the same task as the JSX that reads it, as long as ordering keeps the build green — see Architecture above).

## Global Constraints

- `npx tsc --noEmit` and `npm run build` must pass after every task.
- No changes to `/services`' non-Academic tabs (General, Business, Translation).
- No changes to the founder photo (`profile.png`) or any other page's content.
- The College Advising bio section must reuse `t.home.trust*` directly — no new translation keys are created for it (single source of truth, avoids duplicating copy in two places).

---

### Task 1: Remove the Cost Comparison section from `/services`' Academic tab

**Files:**
- Modify: `src/app/services/page.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing consumed by later tasks. (The translation key `s.academic.costComparison` becomes unused after this task — that's expected and fine; Task 2 removes it from `translations.ts`.)

- [ ] **Step 1: Remove the Cost Comparison sub-section**

In `src/app/services/page.tsx`, find (starting at line 104):

```tsx
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

          {/* Ladder: Ask-Anything, Private Session, Done-With-You */}
```

Replace with:

```tsx
      {/* ── ACADEMIC SUPPORT TAB ── */}
      {activeTab === "academic" && (
        <>
          {/* Ladder: Ask-Anything, Private Session, Done-With-You */}
```

(This deletes the entire "Cost Comparison" `<section>` block — everything between the tab's opening `<>` and the "Ladder" comment — while leaving the "Ladder" section and everything after it untouched.)

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd /home/dacruz117/puente-consulting && npx tsc --noEmit`
Expected: no errors. (`s.academic.costComparison` is no longer referenced in this file; it still exists in `translations.ts` at this point, just unused — that's fine, unused object properties are not a TypeScript error.)

- [ ] **Step 3: Verify build succeeds**

Run: `cd /home/dacruz117/puente-consulting && npm run build`
Expected: build succeeds.

- [ ] **Step 4: Manual check**

Run `npm run dev`, open `http://localhost:3000/services`, click the "Academic" tab. Confirm it goes straight from the tab bar to the "Ask-Anything / Private Session / Done-With-You" pricing cards, with no cost-comparison section above them. Check both languages.

- [ ] **Step 5: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "feat: remove cost-comparison section from services Academic tab"
```

---

### Task 2: Rewrite Home's trust/bio content and consolidate College Advising's cost-comparison content

**Files:**
- Modify: `src/lib/translations.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `en.collegeAdvising.costComparison.eyebrow`, `.intro` (new fields, both languages) — consumed by Task 3's JSX. `en.home.trust*` / `es.home.trust*` updated content — consumed automatically by the already-existing Home page JSX (no code change needed there) and by Task 3's new College Advising bio section (which reads the same keys).

- [ ] **Step 1: Rewrite the English Home trust block**

In `src/lib/translations.ts`, find (around line 145-158):

```typescript
      trustEyebrow: "Why Puente",
      trustTitle: "Experienced. Bilingual. On your side.",
      trustParagraph:
        "With a background in higher education administration and years of guiding families through complex systems, I bring both the knowledge and the patience to make these processes feel manageable.",
      trustPills: [
        "BBA — Texas A&M Central Texas",
        "TAMUCT Enrollment Advisor",
        "Bilingual EN / ES",
        "1:1 Sessions",
        "Confidential",
        "Transparent Pricing",
      ],
      trustGoal:
        "My goal is not just to complete the task, but to empower you to feel confident doing it next time.",
```

Replace with:

```typescript
      trustEyebrow: "Why Puente",
      trustTitle: "With personal experience. Bilingual. On your side.",
      trustParagraph:
        "I was a first-generation student myself, and I lived firsthand the confusion, paperwork, and uncertainty so many families face. That path, not a degree, is what brought me here. I bring real understanding of what this feels like, along with the patience to make these processes feel manageable.",
      trustPills: [
        "First-Gen College Grad",
        "Bilingual EN / ES",
        "1:1 Sessions",
        "Confidential",
        "Transparent Pricing",
      ],
      trustGoal:
        "My goal is not just to complete the task, but to empower you to feel confident doing it next time.",
```

- [ ] **Step 2: Rewrite the Spanish Home trust block**

Find (around line 1046-1059):

```typescript
      trustEyebrow: "Por qué Puente",
      trustTitle: "Con experiencia. Bilingüe. De tu lado.",
      trustParagraph:
        "Con formación en administración de educación superior y años de guiar a familias a través de sistemas complejos, traigo tanto el conocimiento como la paciencia para hacer que estos procesos se sientan manejables.",
      trustPills: [
        "Licenciatura en Administración — TAMUCT",
        "Asesor de Inscripciones en TAMUCT",
        "Bilingüe EN / ES",
        "Sesiones 1:1",
        "Confidencial",
        "Precios Transparentes",
      ],
      trustGoal:
        "Mi meta no es solo completar la tarea, sino empoderarte para que te sientas seguro haciéndolo la próxima vez.",
```

Replace with:

```typescript
      trustEyebrow: "Por qué Puente",
      trustTitle: "Con experiencia personal. Bilingüe. De tu lado.",
      trustParagraph:
        "Fui estudiante de primera generación, y viví de primera mano la confusión, el papeleo y la incertidumbre que muchas familias enfrentan. Ese camino, no un título, es lo que me trae aquí. Traigo la comprensión real de lo que se siente, además de la paciencia para hacer que estos procesos se sientan manejables.",
      trustPills: [
        "Primera Generación Universitaria",
        "Bilingüe EN / ES",
        "Sesiones 1:1",
        "Confidencial",
        "Precios Transparentes",
      ],
      trustGoal:
        "Mi meta no es solo completar la tarea, sino empoderarte para que te sientas seguro haciéndolo la próxima vez.",
```

- [ ] **Step 3: Replace the English College Advising costComparison**

Find (around line 198-205):

```typescript
      costComparison: {
        heading: "One Wrong Turn Can Cost More Than College Itself",
        points: [
          "The average bachelor's degree costs about $146,795 total. A for-profit school, non-transferring credits, or a bad loan can waste years and tens of thousands of dollars of that.",
          "31% of Latino students at 4-year Texas universities never finish — often because of missing information, not missing money.",
        ],
        closingLine: "A misstep can cost thousands. Getting it right starts at $20.",
      },
```

Replace with:

```typescript
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
```

- [ ] **Step 4: Replace the Spanish College Advising costComparison**

Find (around line 1099-1106):

```typescript
      costComparison: {
        heading: "Un Solo Error Puede Costar Más Que la Universidad Misma",
        points: [
          "El costo total promedio de un título de licenciatura es de aproximadamente $146,795. Una escuela con fines de lucro, créditos que no se transfieren, o un mal préstamo pueden desperdiciar años y decenas de miles de dólares de eso.",
          "El 31% de los estudiantes latinos en universidades públicas de 4 años en Texas nunca se gradúan — muchas veces por falta de información, no de dinero.",
        ],
        closingLine: "Un error puede costar miles. Hacerlo bien comienza en $20.",
      },
```

Replace with:

```typescript
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
```

- [ ] **Step 5: Remove the English `services.academic.costComparison` key**

Find (around line 519-531):

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
```

Replace with:

```typescript
      academic: {
        presentation: {
```

(This deletes the `costComparison` key entirely, leaving `academic` starting directly with `presentation`.)

- [ ] **Step 6: Remove the Spanish `services.academic.costComparison` key**

Find (around line 1420-1433):

```typescript
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
```

Replace with:

```typescript
        presentation: {
          name: "Entendiendo el Camino Universitario",
```

(This deletes the ES `costComparison` key entirely, leaving this `academic` block starting directly with `presentation`.)

- [ ] **Step 7: Verify TypeScript compiles**

Run: `cd /home/dacruz117/puente-consulting && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 8: Verify build succeeds**

Run: `cd /home/dacruz117/puente-consulting && npm run build`
Expected: build succeeds.

- [ ] **Step 9: Manual check**

Run `npm run dev`, open `http://localhost:3000` (Home). Confirm the Trust Block now shows the new title, paragraph, and 5 badges (no more "BBA — Texas A&M Central Texas" / "TAMUCT Enrollment Advisor"). Check both languages. (College Advising's page won't visually show the new `eyebrow`/`intro` fields yet — that's Task 3.)

- [ ] **Step 10: Commit**

```bash
git add src/lib/translations.ts
git commit -m "feat: rewrite founder trust bio copy and consolidate cost-comparison content"
```

---

### Task 3: Add the fuller cost-comparison markup and new bio section to College Advising

**Files:**
- Modify: `src/app/college-advising/page.tsx`

**Interfaces:**
- Consumes: `ca.costComparison.eyebrow`, `.intro` (added in Task 2), `t.home.trust*` (rewritten in Task 2) — all already exist in `translations.ts` by the time this task runs.
- Produces: nothing consumed by later tasks (last task in this plan).

- [ ] **Step 1: Add eyebrow and intro markup to the Cost Comparison section**

In `src/app/college-advising/page.tsx`, find (around line 49-64):

```tsx
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
```

Replace with:

```tsx
      {/* Cost Comparison — leads right after the hero */}
      <section className="bg-cream py-16">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3 text-center">
            {ca.costComparison.eyebrow}
          </p>
          <h2 className="text-2xl font-bold text-primary text-center mb-4">
            {ca.costComparison.heading}
          </h2>
          <p className="text-body text-center max-w-2xl mx-auto mb-6">
            {ca.costComparison.intro}
          </p>
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
```

- [ ] **Step 2: Insert the new Bio section after the Story Block, and relocate the `<hr>`**

Find (around line 87-93):

```tsx
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-100" />

      {/* 7-Stage Roadmap */}
```

Replace with:

```tsx
            </div>
          </div>
        </div>
      </section>

      {/* Founder Bio */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-4">
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
                {t.home.trustEyebrow}
              </p>
              <h2 className="text-3xl font-bold text-primary tracking-tight mb-4">
                {t.home.trustTitle}
              </h2>
              <p className="text-sm text-body leading-relaxed mb-6">{t.home.trustParagraph}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {t.home.trustPills.map((pill) => (
                  <span
                    key={pill}
                    className="text-xs font-medium text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full"
                  >
                    {pill}
                  </span>
                ))}
              </div>
              <p className="text-sm italic text-primary border-l-4 border-accent pl-4 leading-relaxed">
                {t.home.trustGoal}
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-100" />

      {/* 7-Stage Roadmap */}
```

(The `Image` component and `t` variable are both already imported/destructured at the top of this file — no new imports needed. This inserts the Bio section using `t.home.trust*` directly, matching Home's Trust Block markup exactly, and moves the existing `<hr>` from before this new section to after it.)

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd /home/dacruz117/puente-consulting && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Verify lint and build**

Run: `cd /home/dacruz117/puente-consulting && npm run lint && npm run build`
Expected: both pass.

- [ ] **Step 5: Manual check**

Run `npm run dev`, open `http://localhost:3000/college-advising`. Confirm: the Cost Comparison section right after the hero now shows an eyebrow line and intro paragraph, plus all 4 points and the updated closing line. Scroll down — confirm a new "Founder Bio" section appears right after the Story Block (founder photo, title, paragraph, 5 badges, italic goal line — identical content to Home's Trust Block), followed by the 7-Stage Roadmap. Check both languages.

- [ ] **Step 6: Commit**

```bash
git add src/app/college-advising/page.tsx
git commit -m "feat: add founder bio section and fuller cost-comparison copy to College Advising"
```

---

## Final Check

After all three tasks are complete:

- [ ] Run `npx tsc --noEmit`, `npm run lint`, and `npm run build` one more time — all pass, no errors.
- [ ] Home page: Trust Block shows the new personal-experience copy and 5 badges (EN + ES).
- [ ] College Advising page: Cost Comparison section (right after hero) shows eyebrow, heading, intro, 4 points, and the updated closing line (EN + ES).
- [ ] College Advising page: new Founder Bio section appears right after the Story Block, before the 7-Stage Roadmap, with the same content as Home's Trust Block (EN + ES).
- [ ] `/services` Academic tab: goes straight from the tab bar to the pricing-tier cards, no cost-comparison section.
- [ ] No other `/services` tabs (General, Business, Translation) changed.

# Founder Bio Rewrite + Cost-Comparison Consolidation — Design

**Goal:** Rewrite the founder trust/bio block to lead with lived first-generation experience instead of credentials, surface it on the College Advising page (not just Home), and consolidate the two near-duplicate "why these prices make sense" cost-comparison sections (currently split between College Advising and the /services Academic tab) into one fuller section living only on College Advising.

**Current state:**
- Home page (`src/app/page.tsx`) has a "Trust Block" section reading `t.home.trust*`: eyebrow, title, paragraph, a list of badge pills, and an italicized goal line. Copy currently frames the founder via credentials (degree, enrollment-advisor job title at TAMUCT).
- College Advising page (`src/app/college-advising/page.tsx`) has its own short cost-comparison section right after the hero (`t.collegeAdvising.costComparison`: heading, 2 points, closing line — no eyebrow or intro).
- `/services` page's Academic tab (`src/app/services/page.tsx`) has a fuller cost-comparison section (`t.services.academic.costComparison`: eyebrow, heading, intro, 4 points, closing line) rendered on a dark (`bg-primary`) background, directly above the pricing-tier cards.

**Target state:**
- Home's trust block keeps its exact layout but gets new copy (EN + ES) reframing around personal first-gen experience.
- College Advising gains a new section, right after its existing "Story Block," reusing the same `t.home.trust*` content (single source of truth — not duplicated) with the same visual treatment (image + text + badges + goal quote), on a `bg-cream` background.
- College Advising's cost-comparison section (right after its hero) is replaced by the fuller version currently on `/services`, adapted to College Advising's light-theme card styling (not the dark `bg-primary` treatment).
- `/services`' Academic tab loses its cost-comparison section entirely — that tab goes straight from the tab bar to the pricing-tier cards.

---

## 1. Translation content changes (`src/lib/translations.ts`)

**`en.home` / `es.home`** — update in place, no key additions/removals:
- `trustTitle`:
  - EN: "With personal experience. Bilingual. On your side."
  - ES: "Con experiencia personal. Bilingüe. De tu lado."
- `trustParagraph`:
  - EN: "I was a first-generation student myself, and I lived firsthand the confusion, paperwork, and uncertainty so many families face. That path, not a degree, is what brought me here. I bring real understanding of what this feels like, along with the patience to make these processes feel manageable."
  - ES: "Fui estudiante de primera generación, y viví de primera mano la confusión, el papeleo y la incertidumbre que muchas familias enfrentan. Ese camino, no un título, es lo que me trae aquí. Traigo la comprensión real de lo que se siente, además de la paciencia para hacer que estos procesos se sientan manejables."
- `trustPills` (6 items → 5 items each):
  - EN: `["First-Gen College Grad", "Bilingual EN / ES", "1:1 Sessions", "Confidential", "Transparent Pricing"]`
  - ES: `["Primera Generación Universitaria", "Bilingüe EN / ES", "Sesiones 1:1", "Confidencial", "Precios Transparentes"]`
- `trustEyebrow` and `trustGoal`: unchanged in both languages (already fit the new framing).

**`en.collegeAdvising` / `es.collegeAdvising`** — `costComparison` object gains two new fields and its content is replaced with the fuller version migrated from `services.academic.costComparison`:
- Add `eyebrow` field: EN "Why These Prices Make Sense" / ES "Por Qué Estos Precios Tienen Sentido"
- Add `intro` field: EN "A bad college decision costs a lot more than a Puente session ever will." / ES "Una mala decisión universitaria cuesta mucho más que cualquier sesión con Puente."
- `heading` changes from "One Wrong Turn Can Cost More Than College Itself" / "Un Solo Error Puede Costar Más Que la Universidad Misma" to "The Real Cost of Getting This Wrong" / "El Verdadero Costo de Equivocarse"
- `points` grows from 2 to 4 items, replaced with this exact text (migrated from `services.academic.costComparison`, which is removed in the same change — see below):
  - EN:
    1. "The average bachelor's degree costs about $146,795 total — one wrong turn (the wrong major, the wrong school, a program that doesn't transfer) can waste years and tens of thousands of dollars of that."
    2. "Credits that don't transfer mean paying twice for a class you already passed."
    3. "Private loans carry variable, high interest with no federal borrower protections — a last resort, not a plan."
    4. "31% of Latino students at 4-year Texas universities, and 45% at community colleges, never finish — often because of missing information, not missing money."
  - ES:
    1. "El costo total promedio de un título de licenciatura es de aproximadamente $146,795 — un solo paso en falso (la carrera equivocada, la escuela equivocada, un programa cuyos créditos no se transfieren) puede desperdiciar años y decenas de miles de dólares de eso."
    2. "Los créditos que no se transfieren significan pagar dos veces por una clase que ya aprobaste."
    3. "Los préstamos privados tienen tasas de interés variables y altas, sin protecciones federales — un último recurso, no un plan."
    4. "El 31% de los estudiantes latinos en universidades públicas de 4 años en Texas, y el 45% en colegios comunitarios, nunca se gradúan — muchas veces por falta de información, no de dinero."
- `closingLine` changes from "A misstep can cost thousands. Getting it right starts at $20." / "Un error puede costar miles. Hacerlo bien comienza en $20." to "A single misstep can cost thousands. Getting it right, with Puente, costs $20 to $375." / "Un solo error puede costar miles. Hacerlo bien, con Puente, cuesta entre $20 y $375."

**`en.services.academic` / `es.services.academic`** — remove the `costComparison` key entirely (both languages). No other key in `academic` depends on it.

## 2. `src/app/page.tsx` (Home)

No structural changes. The Trust Block JSX already renders `h.trustEyebrow`/`trustTitle`/`trustParagraph`/`trustPills`/`trustGoal` dynamically — the pill list already maps over an array, so going from 6 to 5 items requires no code change.

## 3. `src/app/college-advising/page.tsx`

**Cost Comparison section** (currently lines 49-64): add markup for the new `eyebrow` and `intro` fields, matching the page's existing light-theme card style (not copying `/services`' dark `bg-primary` treatment):
- Add a small uppercase/tracking-widest eyebrow line (`text-xs font-semibold tracking-widest uppercase text-accent`, consistent with how other eyebrows render elsewhere on this same page, e.g. `ca.stagesEyebrow` at line 96-98) above the existing heading.
- Add an intro paragraph (`text-body`, centered, `max-w-2xl mx-auto`) between the heading and the points grid.
- Points grid stays `grid grid-cols-1 sm:grid-cols-2 gap-4` — 4 items fit the same 2-column layout the 2-item version used.
- Closing line stays as-is structurally.

**New Bio section**: insert immediately after the existing Story Block section closes (after line 89), reusing `t.home.trust*` (imported via the same `t` the page already destructures — no new prop drilling needed, just reference `t.home.trust*` instead of a `collegeAdvising`-scoped key). Visual structure mirrors Home's Trust Block exactly (founder image left, text/badges/goal right, on `md:grid-cols-2`), wrapped in `<section className="bg-cream py-20">` for contrast against the plain-background Story Block above it. The page's existing `<hr className="border-gray-100" />` (currently at line 91, between Story Block and the 7-Stage Roadmap) moves to sit after this new Bio section instead of before it — net effect: one `<hr>`, relocated, not duplicated.

## 4. `src/app/services/page.tsx`

Remove the entire "Cost Comparison" sub-section (currently lines 107-130) from the Academic tab's fragment. The tab's fragment then starts directly with the "Ladder: Ask-Anything, Private Session, Done-With-You" section, which already has its own `s.packagesTitle` heading and doesn't reference the removed content.

## Testing

- `npx tsc --noEmit` — no errors (translation shape changes must stay consistent between EN/ES, and `collegeAdvising.costComparison`'s new `eyebrow`/`intro` fields must be added to both language objects so the shared type stays satisfied).
- `npm run build` — static export succeeds; all existing routes still generate.
- Manual check in browser (both languages): Home's trust block shows new copy and 5 badges; College Advising shows the fuller cost-comparison section right after its hero and the new bio section right after the Story Block; `/services` Academic tab goes straight from tab bar to pricing cards with no cost-comparison section.

## Out of scope

- No changes to `/services`' non-Academic tabs (General, Business, Translation).
- No changes to the founder photo (`profile.png`) or any other page's content.
- No new translation keys are created for the College Advising bio section — it reuses `t.home.trust*` directly to keep the copy single-sourced.

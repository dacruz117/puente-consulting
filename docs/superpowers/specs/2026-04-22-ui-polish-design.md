# UI Polish — Em Dashes, Scroll Indicator, Tagline, SVG Icons

Date: 2026-04-22

## Overview

Four targeted visual and copy improvements to the Puente Consulting site. No new pages, no structural changes.

---

## Change 1 — Em Dash Elimination

Remove all em dashes (—) from source files. Apply one of three rules per instance:

| Context | Rule | Example |
|---|---|---|
| Mid-sentence continuation | Replace with comma | `navigate the systems, in English, in Spanish, or both.` |
| Elaborating clause that can stand alone | Replace with period, capitalize next word | `done with you. Eight stages, 109 steps.` |
| Stage label separator | Replace with colon | `Stage 1: Idea & Validation` |

**Files affected:**
- `src/lib/translations.ts` (~35 instances, both EN and ES)
- `src/app/page.tsx` (comment only)
- `src/app/services/page.tsx` (comment only)
- `src/components/ContactForm.tsx` (email subject field)

The `icon` fields in `translations.ts` heroCards are removed as part of Change 4 — no separate pass needed.

---

## Change 2 — Hero Scroll Indicator

Add a visually animated scroll cue to the bottom of the hero section in `src/app/page.tsx`.

**Placement:** Between the hero card grid and the existing fade gradient div.

**Implementation:**
- Install `lucide-react` (covers Change 4 too)
- Render `<ChevronDown>` from `lucide-react`, centered, with Tailwind class `animate-bounce`
- Styling: `text-white/50`, size `w-6 h-6`, wrapped in a `flex justify-center py-4`
- No JS, no scroll event listener — pure CSS animation

---

## Change 3 — Hero Tagline

**English** `translations.ts` line 29:
```
"Guidance for college, business, and everyday life."
→ "A Bridge to Progress"
```

**Spanish** (`translations.ts` line 741):
```
"Orientación para la universidad, los negocios y la vida cotidiana."
→ "Un Puente al Progreso"
```

No other files reference this string directly.

---

## Change 4 — SVG Icons Replace Emojis

**Problem:** Three emoji strings (`📋`, `🎓`, `💼`) are stored as `icon` fields in `translations.ts` heroCards and rendered at `page.tsx:42`. One hardcoded emoji (`💡`) appears in `services/page.tsx:180`.

**Solution:**

1. Install `lucide-react`
2. Remove `icon` field from all heroCard objects in `translations.ts` (EN and ES)
3. In `page.tsx`, add a local icon map keyed by `href`:
   ```ts
   import { ClipboardList, GraduationCap, Briefcase } from "lucide-react";
   const cardIcons: Record<string, React.ReactNode> = {
     "/services":         <ClipboardList className="w-6 h-6 text-accent-light" />,
     "/college-advising": <GraduationCap className="w-6 h-6 text-accent-light" />,
     "/business-startup": <Briefcase     className="w-6 h-6 text-accent-light" />,
   };
   ```
4. Replace `{card.icon}` render with `{cardIcons[card.href]}`
5. Keep the wrapping `div` but adjust sizing from `text-2xl` to a fixed `mb-3` container — the SVG carries its own size
6. In `services/page.tsx:180`, replace `💡` with `<Lightbulb className="w-5 h-5 flex-shrink-0 text-accent-light" />`

**Type change:** No named `HeroCard` type exists — simply remove the `icon` property from each heroCard object literal in `translations.ts` (EN and ES).

---

## Out of Scope

- No new pages or routes
- No layout changes beyond the scroll indicator placement
- No icon changes on service detail pages beyond the `💡` in `services/page.tsx`

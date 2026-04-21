# Navbar Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove two redundant nav links and shorten two labels so the desktop navbar fits on one row without wrapping.

**Architecture:** Two files change — `translations.ts` gets shorter label values for `translationServices` and the lang-button keys; `Navbar.tsx` has two entries removed from the `navLinks` array. No new components, no logic changes.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, `useLanguage()` from `LanguageContext`

---

### Task 1: Shorten translation labels

**Files:**
- Modify: `src/lib/translations.ts`

- [ ] **Step 1: Update `en.nav.translationServices`**

Find the line (around line 11):
```typescript
      translationServices: "Translation Services",
```
Change to:
```typescript
      translationServices: "Translations",
```

- [ ] **Step 2: Update `en.nav.langButtonToEs` and `en.nav.langButtonToEn`**

Find (around lines 15–16):
```typescript
      langButtonToEs: "Ver en Español",
      langButtonToEn: "View in English",
```
Change to:
```typescript
      langButtonToEs: "Español",
      langButtonToEn: "English",
```

- [ ] **Step 3: Update `es.nav.translationServices`**

Find the ES nav block (search for `Servicios de Traducci`):
```typescript
      translationServices: "Servicios de Traducci\u00f3n",
```
Change to:
```typescript
      translationServices: "Traducciones",
```

- [ ] **Step 4: Update `es.nav.langButtonToEs` and `es.nav.langButtonToEn`**

Find the ES nav lang-button keys (just below `es.nav.bookSession`):
```typescript
      langButtonToEs: "Ver en Español",
      langButtonToEn: "View in English",
```
Change to:
```typescript
      langButtonToEs: "Español",
      langButtonToEn: "English",
```

- [ ] **Step 5: Type-check**

```bash
npx tsc --noEmit
```
Expected: no output (clean).

- [ ] **Step 6: Commit**

```bash
git add src/lib/translations.ts
git commit -m "feat: shorten nav labels — Translations, Español/English"
```

---

### Task 2: Remove redundant nav links

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Remove `Home` and `Contact` from `navLinks`**

Find the `navLinks` array (around lines 12–20):
```typescript
  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/college-advising", label: t.nav.collegeAdvising },
    { href: "/business-startup", label: t.nav.businessStartup },
    { href: "/services", label: t.nav.pricing },
    { href: "/translation-services", label: t.nav.translationServices },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];
```
Replace with:
```typescript
  const navLinks = [
    { href: "/college-advising", label: t.nav.collegeAdvising },
    { href: "/business-startup", label: t.nav.businessStartup },
    { href: "/services", label: t.nav.pricing },
    { href: "/translation-services", label: t.nav.translationServices },
    { href: "/about", label: t.nav.about },
  ];
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```
Expected: no output (clean).

- [ ] **Step 3: Start dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000` and confirm:
- Desktop navbar: 5 links (College Advising, Business Start-Up, Pricing, Translations, About) + "Book a Session" + "🇲🇽 Español" — all on one row, no wrapping
- Mobile menu: same 5 links + Book a Session + flag button — all present
- Clicking the flag button toggles language correctly; button shows "🇺🇸 English" in ES mode
- The logo still navigates to `/` — no regression from removing the Home link

- [ ] **Step 4: Commit and push**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: remove redundant Home and Contact nav links"
git push origin main
```

# Navbar Cleanup — Design Spec
**Date:** 2026-04-20
**Status:** Approved for implementation

---

## Problem

The desktop navbar has 9 items after the logo (7 nav links + 2 buttons), causing it to wrap to a second line and look cluttered and unprofessional.

---

## Solution

Remove two redundant links and shorten two labels. No structural changes.

### Changes

| What | Before | After |
|---|---|---|
| Nav link | `Home` (href: `/`) | **Removed** — logo already navigates home |
| Nav link | `Contact` (href: `/contact`) | **Removed** — "Book a Session" already goes to `/contact` |
| Nav label EN | `Translation Services` | `Translations` |
| Nav label ES | `Servicios de Traducción` | `Traducciones` |
| Lang button EN mode | `🇲🇽 Ver en Español` | `🇲🇽 Español` |
| Lang button ES mode | `🇺🇸 View in English` | `🇺🇸 English` |

Result: 5 nav links + 2 buttons — fits on one row at normal desktop widths.

---

## Files to Change

| File | What changes |
|---|---|
| `src/components/Navbar.tsx` | Remove `home` and `contact` entries from `navLinks` array; update lang button text inline |
| `src/lib/translations.ts` | Update `en.nav.translationServices` and `es.nav.translationServices`; update `en.nav.langButtonToEs`, `en.nav.langButtonToEn`, `es.nav.langButtonToEs`, `es.nav.langButtonToEn` to shorter values |

---

## What Does NOT Change

- Nav link order for remaining links
- Mobile menu behavior
- All other pages, components, and styles

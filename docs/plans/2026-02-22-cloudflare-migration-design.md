# Cloudflare Migration Design

**Date:** 2026-02-22
**Topic:** Netlify → Cloudflare Pages migration

## Summary

Migrate hosting from Netlify to Cloudflare Pages. GitHub repo stays the same. Domain registered fresh on Cloudflare.

## Architecture

Static Next.js site (output: 'export') deployed to Cloudflare Pages. GitHub is the source of truth. Every push to `main` triggers an automatic Cloudflare Pages build and deploy. Domain registered on Cloudflare Registrar and pointed at the Pages project.

## Code Changes

**Remove:** `netlify.toml`

**Add:** `public/_headers` — Cloudflare Pages equivalent for HTTP response headers.

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

No changes to `next.config.js`, source code, build command, or output directory.

## Cloudflare Dashboard Steps (manual)

1. Register domain on Cloudflare Registrar
2. Create Cloudflare Pages project connected to the GitHub repo
   - Build command: `npm run build`
   - Output directory: `out`
3. Attach custom domain to the Pages project (Cloudflare handles DNS automatically)

## What Stays the Same

- GitHub repo, branch structure, and workflow
- `next.config.js` and all source code
- Build command (`npm run build`) and output directory (`out`)

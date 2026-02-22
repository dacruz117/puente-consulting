# Cloudflare Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate hosting from Netlify to Cloudflare Pages with auto-deploy from GitHub and domain registered on Cloudflare.

**Architecture:** Remove Netlify config, add Cloudflare Pages `_headers` file for security headers, then wire up Cloudflare Pages to the GitHub repo via the dashboard. Domain is registered fresh on Cloudflare Registrar and attached to the Pages project.

**Tech Stack:** Next.js 14 (static export), Cloudflare Pages, Cloudflare Registrar

---

### Task 1: Replace netlify.toml with Cloudflare _headers

**Files:**
- Delete: `netlify.toml`
- Create: `public/_headers`

**Step 1: Create `public/_headers`**

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

Save to `public/_headers`. No quotes, no trailing spaces.

**Step 2: Verify the file looks correct**

Run:
```bash
cat public/_headers
```

Expected output:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

**Step 3: Delete netlify.toml**

```bash
rm netlify.toml
```

**Step 4: Verify netlify.toml is gone**

```bash
ls netlify.toml
```

Expected: `No such file or directory`

**Step 5: Run a local build to confirm nothing is broken**

```bash
npm run build
```

Expected: Build completes with no errors. The `out/` directory is produced. Inside `out/`, there should be a `_headers` file (Next.js copies `public/` contents into `out/` on static export).

Verify:
```bash
cat out/_headers
```

Expected: same three security headers as above.

**Step 6: Commit**

```bash
git add public/_headers
git rm netlify.toml
git commit -m "feat: migrate from Netlify to Cloudflare Pages

Replace netlify.toml with public/_headers for Cloudflare Pages.
Security headers are equivalent."
```

---

### Task 2: Cloudflare Pages — Create project (manual, dashboard)

> These steps are performed in the Cloudflare dashboard at https://dash.cloudflare.com. No code changes required.

**Step 1: Log in to Cloudflare dashboard**

Go to https://dash.cloudflare.com and sign in (or create an account).

**Step 2: Open Pages**

In the left sidebar click **Workers & Pages** → **Pages** tab → **Create a project**.

**Step 3: Connect GitHub**

Choose **Connect to Git** → authorize Cloudflare to access your GitHub account → select the `puente-consulting` repository.

**Step 4: Configure build settings**

| Setting | Value |
|---|---|
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | *(leave blank)* |

**Step 5: Save and deploy**

Click **Save and Deploy**. Cloudflare will run the first build. Wait for it to complete (usually 1-2 minutes).

**Step 6: Verify the deployment**

Cloudflare gives you a URL like `puente-consulting.pages.dev`. Open it in a browser and confirm the site loads correctly.

**Step 7: Verify headers are applied**

Run:
```bash
curl -I https://puente-consulting.pages.dev
```

Expected response includes:
```
x-frame-options: DENY
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
```

---

### Task 3: Register domain on Cloudflare (manual, dashboard)

> Performed in the Cloudflare dashboard. No code changes.

**Step 1: Go to domain registration**

In the Cloudflare dashboard left sidebar: **Domain Registration** → **Register Domains**.

**Step 2: Search for your domain**

Type your desired domain name and search. Select it and complete the purchase.

**Step 3: Confirm domain is active**

After registration, the domain appears under **Domain Registration** → **Manage Domains** with status **Active**.

---

### Task 4: Attach custom domain to Cloudflare Pages (manual, dashboard)

> Performed in the Cloudflare dashboard. No code changes.

**Step 1: Open your Pages project**

**Workers & Pages** → **Pages** → click `puente-consulting`.

**Step 2: Add custom domain**

Go to **Custom domains** tab → **Set up a custom domain** → enter your domain (e.g. `puenteconsulting.com`) → **Continue**.

**Step 3: Confirm DNS setup**

Since the domain is registered on Cloudflare, DNS is configured automatically. Click **Activate domain**.

**Step 4: Wait for propagation**

SSL certificate provisioning takes 1-5 minutes. The custom domain tab will show **Active** when ready.

**Step 5: Verify**

Open your domain in a browser. Site should load over HTTPS. Verify headers:

```bash
curl -I https://yourdomain.com
```

Expected: Same three security headers as in Task 2 Step 7.

---

### Task 5: Remove Netlify from the project (cleanup, manual)

**Step 1: Delete the Netlify site**

Log in to Netlify → open the site → **Site settings** → scroll to bottom → **Delete this site**. Confirm deletion.

This prevents any confusion about where the live site is hosted going forward.

**Step 2: Confirm live site is fully on Cloudflare**

Visit your domain. Confirm it loads. Run:

```bash
curl -I https://yourdomain.com
```

Check response headers include `cf-ray:` — this confirms traffic is going through Cloudflare.

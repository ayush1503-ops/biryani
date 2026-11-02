# Deployment — DUM on Vercel

## What's deployed

| Part | Location | How it's served |
|------|----------|-----------------|
| Static frontend | `index.html` + `assets/img/` | Vercel static site |
| SPA fallback | `vercel.json` catch-all | Every non-asset path → `index.html` |
| API routes | `api/*.js` | Vercel serverless functions (`/api/*`) |

## One-click deploy

1. Push this repo to GitHub.
2. In the Vercel dashboard, **Add New Project** → import the repository.
3. Framework preset: **Vercel Static Sites** (auto-detected from `index.html`).
4. Build command: leave blank (no build step).
5. Output directory: leave blank (root).
6. Click **Deploy**.

## Environment variables (Vercel project settings)

Add these under **Settings → Environment Variables** (production + preview):

| Variable | Value | Required for |
|----------|-------|--------------|
| `SUPABASE_URL` | `https://<project>.supabase.co` | API routes |
| `SUPABASE_ANON_KEY` | Supabase anon (public) key | API routes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | `POST /api/orders` |

> The frontend (`index.html`) makes **no API calls**, so the site works without any env vars.  
> The backend API routes return `503` with a clear message if Supabase isn't configured.

## Routes

```
GET  /                        → index.html (home)
GET  /assets/*                → static files (1y cache)
GET  /api/health              → health check
GET  /api/menu                → list menu items (?category=..., ?isAvailable=...)
GET  /api/menu/:id            → single menu item
POST /api/auth/login          → verify Supabase JWT
POST /api/auth/register       → create Supabase Auth user
POST /api/orders              → create an order (authenticated)
GET  /(* anything else)       → index.html (SPA fallback)
```

## Local development

```bash
# Install the Vercel CLI (one time)
npm i -g vercel

# Run locally (serves index.html + api functions)
vercel dev
```

Then open `http://localhost:3000`.

## Notes

- `backend/` — the original Express app. Kept for reference / alternative hosting (Render, Railway, etc.). It is **not** part of the Vercel deployment; the equivalent endpoints live in `api/`.
- `node_modules/`, `.env`, `.vercel/`, and `shots/` are gitignored and never deployed.
- Images live in `assets/img/` and are referenced by relative path from `index.html` — they deploy alongside the HTML automatically.

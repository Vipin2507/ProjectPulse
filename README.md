# Buildesk ProjectPulse

Frontend-only per-project real estate dashboard for Buildesk CRM. Inventory, parking, area, sales, collections, outstanding dues, and construction progress — powered by typed mock data that can be swapped for a real API.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui primitives
- Recharts, TanStack Query v5, Zustand
- lucide-react, date-fns

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/projects`.

## Environment

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_USE_MOCK=true
NEXT_PUBLIC_API_BASE_URL=
```

- `NEXT_PUBLIC_USE_MOCK=true` — use the local mock service (default).
- `NEXT_PUBLIC_USE_MOCK=false` — every call goes through `src/lib/api/client.ts` to `NEXT_PUBLIC_API_BASE_URL`.

Force a mock failure for error-state testing: append `?fail=1` to any page URL.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

## API swap

Components and hooks only import from `src/lib/api/projectService.ts`. When the backend is ready, set the env vars above. Endpoint path builders live in `src/lib/api/endpoints.ts`.

## Deploy on Render

This repo includes `render.yaml` (Blueprint) and is configured for a Node web service:

| Setting | Value |
|---|---|
| Runtime | Node |
| Build | `npm ci && npm run build` |
| Start | `npm start` (`next start --hostname 0.0.0.0`, uses Render’s `PORT`) |
| Health check | `/projects` |
| Node | `20.18.1` (`.node-version` / `NODE_VERSION`) |

### Option A — Blueprint (recommended)

1. Push this repo to GitHub (already linked as `origin` if you use the existing remote).
2. Open [https://dashboard.render.com](https://dashboard.render.com) → **New** → **Blueprint**.
3. Connect the GitHub repo and select the branch (`main`).
4. Render reads `render.yaml` and creates **buildesk-projectpulse**.
5. Set `NEXT_PUBLIC_API_BASE_URL` if prompted (leave blank while using mocks).
6. Click **Apply** and wait for the first deploy.
7. Open the service URL (e.g. `https://buildesk-projectpulse.onrender.com`).

### Option B — Manual Web Service

1. Push the latest code to GitHub.
2. Dashboard → **New** → **Web Service** → select the repo.
3. Configure:
   - **Name:** `buildesk-projectpulse`
   - **Runtime:** Node
   - **Build Command:** `npm ci && npm run build`
   - **Start Command:** `npm start`
   - **Instance type:** Free (or paid)
4. **Environment** tab — add:
   - `NODE_VERSION` = `20.18.1`
   - `NEXT_PUBLIC_USE_MOCK` = `true`
   - `NEXT_PUBLIC_API_BASE_URL` = _(empty for now)_
   - `NEXT_TELEMETRY_DISABLED` = `1`
5. Deploy. After it goes live, visit `/projects`.

### Notes

- Free tier spins down after idle; the first request can take ~30–60s.
- Change any `NEXT_PUBLIC_*` var → **Manual Deploy** (they are baked in at build time).
- When the real API exists: set `NEXT_PUBLIC_USE_MOCK=false` and `NEXT_PUBLIC_API_BASE_URL` to your API origin, then redeploy.

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

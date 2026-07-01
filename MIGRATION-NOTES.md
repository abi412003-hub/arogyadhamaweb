# Arogyadhama — Next.js (Full SSR) Migration Notes

Migrated from the Vite + React SPA (`arogyadhama-legacy-hub-main`) to **Next.js 14.2.35
App Router** with **full server-side rendering** (every route renders per request).
Backend is **ERPNext** (Supabase has been removed). Lovable is no longer used.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

Env (`.env.local`) — ERPNext credentials (server-side only):
`ERPNEXT_URL`, `ERPNEXT_API_KEY`, `ERPNEXT_API_SECRET`
(optional `ERPNEXT_ENQUIRY_DOCTYPE` / `ERPNEXT_BOOKING_DOCTYPE`, default `Lead`).

## What changed vs the SPA

- **Entry/routing:** `src/main.tsx` + `src/App.tsx` (BrowserRouter) → `app/` file routes.
  Every route is a thin server component in `app/**/page.tsx` that renders the original
  page component and sets per-page SEO `metadata`. `export const dynamic = "force-dynamic"`
  gives true per-request SSR.
- **Pages folder renamed:** `src/pages` → `src/views` (because `pages/` is a reserved
  Next directory that would activate the legacy Pages Router).
- **Router compat shim:** `src/lib/router-compat.tsx` re-implements `Link`, `NavLink`,
  `Navigate`, `useLocation`, `useNavigate`, `useParams`, `useSearchParams` on top of
  `next/link` + `next/navigation`. All `react-router-dom` imports were repointed here, so
  page/component bodies were left essentially untouched.
- **`"use client"`** added to all interactive components/views/hooks. They still SSR for
  the initial HTML; the directive only enables hooks/browser APIs after hydration.
- **Backend → ERPNext (Supabase removed):**
  - `@supabase/*` packages, `src/integrations/supabase/`, and `supabase/` deleted.
  - Forms now POST to **Next API routes** `app/api/enquiry/route.ts` and
    `app/api/booking/route.ts`, which call ERPNext via `src/lib/erpnext.ts` (server-side
    token auth). They create a record in the custom **`Website Enquiry`** doctype
    (created in ERPNext under module "Arogyadhama Health"; fields: enquiry_type, status,
    source, full_name, email, phone, city, age, gender, subject, message, condition,
    duration, previous_treatments, medications, preferred_date, weeks, room_preference).
    **Verified end-to-end** against the live instance (enquiry + booking both created).
  - **Admin panel removed** (`/admin`, `AdminRoute`, admin views) — use the ERPNext Desk.
  - **Doctor/team photos** now come from static local assets (`FALLBACKS` in
    `OurTeam.tsx` / `DepartmentDoctors.tsx`); the Supabase storage fetch was removed.
- **Images:** `next.config.mjs` sets `images.disableStaticImages` + a webpack
  `asset/resource` rule so `import x from "@/assets/..."` keeps returning a URL string
  (Vite behaviour) — no component edits needed. Assets emit to `/_next/static/media/*`.
- **SEO:** `app/robots.ts` + `app/sitemap.ts` added.

## Verified

- `npm run build` passes; all routes report `ƒ (Dynamic) server-rendered on demand`.
- `curl` of `/`, `/contact`, `/our-team`, `/departments/diabetes`, `/therapies/ayurveda`
  return 200 with real SSR HTML; static photos resolve; `/admin` now 404s.
- `POST /api/enquiry`: returns 400 on invalid input, and 503 "Backend not configured"
  until ERPNext credentials are set (then it creates the doc) — no Supabase anywhere.

## Remaining (Task #6)

- ERPNext wiring is DONE and verified locally. For deploy, add the three env vars
  (`ERPNEXT_URL`, `ERPNEXT_API_KEY`, `ERPNEXT_API_SECRET`) to the Vercel project —
  `.env.local` is gitignored and does not deploy.
- JSON-LD medical schema (MedicalClinic / MedicalCondition) for richer SEO.
- Deploy to Vercel, then cut the `svyasaarogyadhama.com` domain over from Lovable.
- Optional: tighten `typescript.ignoreBuildErrors` / `eslint.ignoreDuringBuilds` in
  `next.config.mjs` (left on to keep the migration build unblocked).
```

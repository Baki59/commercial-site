/* ===========================================================================
   >>> THE SWITCH <<<
   This is the ONLY place the API origin is defined. Put the live URL in
   .env as NEXT_PUBLIC_API_BASE_URL and the entire site talks to the live
   backend — no other file changes.

   Local    NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api/v1
   Live     NEXT_PUBLIC_API_BASE_URL=https://api.sazin.com/api/v1

   While the value is empty the site serves the bundled demo dataset, so the
   design can be reviewed and approved before the backend exists.
   =========================================================================== */

export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(/\/+$/, '');

function normalizeSiteUrl(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;

  const candidate = /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(candidate);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.origin : undefined;
  } catch {
    return undefined;
  }
}

export const SITE_URL =
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  normalizeSiteUrl(process.env.VERCEL_URL) ??
  'http://localhost:3000';

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

/** True while no backend is wired up. Drives the demo-data fallback. */
export const USE_DEMO_DATA = API_BASE_URL === '';

export const API_TIMEOUT_MS = 15000;

/** How long a server-rendered response stays cached, in seconds. */
export const REVALIDATE = {
  settings: 3600,
  home: 300,
  catalogue: 300,
  detail: 600,
  news: 300,
} as const;

export const PAGE_SIZE = {
  products: 12,
  resources: 15,
  news: 9,
  search: 12,
} as const;

# Sazin Innovative Industries Ltd. — Corporate & Product Website

Phase-1 frontend for quotation **DW-WEB-2026-001**.

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Zustand · server-rendered for SEO.

---

## 1. Run it

```bash
npm install
cp .env.example .env
npm run dev          # http://localhost:3000
```

With `NEXT_PUBLIC_API_BASE_URL` left empty the site serves a bundled demo
dataset, so the design is fully reviewable before the backend exists.

```bash
npm run build        # production build
npm start            # serve the build
npm run typecheck    # tsc --noEmit
```

---

## 2. Connecting the backend — one line

`.env`:

```
NEXT_PUBLIC_API_BASE_URL=https://api.sazin.com/api/v1
```

That is the whole switch. It is read in exactly one place,
`src/lib/api/config.ts`, and every request in the application flows through it.
No component, page or hook contains a URL.

Priority of what to build first: `/site/settings/`, `/site/home/`,
`/catalogue/products/`, `/catalogue/products/{slug}/`. Those four make the
homepage and the catalogue live; the rest can follow.

### The contract

| File | What it is |
|---|---|
| `src/types/index.ts` | Response shapes. Django serializer keys must match these names. |
| `src/lib/api/endpoints.ts` | Every URL the frontend will call. |
| `src/lib/api/http.ts` | Fetch wrapper: timeout, JSON, errors, ISR cache tags. |
| `src/lib/api/index.ts` | `api.products.list()`, `api.site.home()` … the only thing pages import. |
| `src/lib/api/mock/` | Demo dataset. Delete once the API is live, or keep it for local work. |

Conventions the backend should follow:

- List endpoints return DRF `PageNumberPagination`: `{count, next, previous, results}`.
- Query parameters on `/catalogue/products/`: `search`, `category`, `family`,
  `industry`, `application`, `featured`, `ordering`, `page`, `page_size`.
- Keys are camelCase in JSON (`specGroups`, `fileUrl`, `publishedAt`). Use
  `djangorestframework-camel-case` if the models stay snake_case.
- Detail lookups are by `slug`, not by numeric id.
- `POST /enquiries/` takes the `EnquiryPayload` shape and returns
  `{success, reference, message}`.

### Cache invalidation

Every GET is tagged (`product:{slug}`, `home`, `settings`, …). When content is
published in the Django admin, call the Next.js revalidation endpoint with the
matching tag and only that page rebuilds. Until that is wired, pages refresh on
the interval set in `src/lib/api/config.ts` → `REVALIDATE`.

---

## 3. Structure

```
src/
  app/                 routes — one folder per URL, thin files
  components/
    ui/                primitives: Button, Section, Field, Pagination …
    layout/            Header, MobileNav, Footer  (master layout)
    home/              homepage sections
    product/           cards, spec table, gallery, filters, resource list
    collections/       shared templates for industries/applications/solutions/services
    common/            Logo, EnquiryForm
  lib/
    api/               the whole data layer (see above)
    hooks/             feature-wise state: useCatalogueFilters, useEnquiryForm, useUi
    store/             one generic Zustand store, one slice per feature
    utils/             cn(), formatters, the icon set
  types/               API contract
```

Rules that keep it scalable:

- Header and footer are rendered once in `src/app/layout.tsx` and persist across
  navigation. Only the page body changes.
- Industries, applications, solutions and services share one landing template
  and one detail template. A fifth collection is a route file plus an endpoint
  entry — no new components.
- Catalogue filters live in the URL, not in React state, so a filtered view is
  bookmarkable, shareable and indexable.
- Icons live only in `src/lib/utils/icons.tsx`. No inline SVG in components.
- Design tokens live only in `src/app/globals.css` under `@theme`. Changing a
  colour there re-themes the whole site.

---

## 4. Page inventory (quotation §7)

Homepage · Products landing · Category/family · Product detail · Search results ·
Industries landing + detail · Applications landing + detail · Solutions landing +
detail · Services landing + detail · Engineering resources · About ·
Manufacturing · Quality · Technology & R&D · Sustainability · Partners &
brands · Locations · Careers · News listing + detail · Contact + enquiry form ·
404 · `sitemap.xml` · `robots.txt`.

---

## 5. SEO

Per-page `<title>` and meta description from the API (`seo` object on every
record), canonical URLs, Open Graph tags, JSON-LD `Product` structured data on
product pages, a generated sitemap covering every published record, and
`robots.txt`. Product, category and collection pages are statically generated at
build time and revalidated on an interval.

Set `NEXT_PUBLIC_GA_ID` when the client provides the Analytics property.

---

## 6. Media

Demo images are schematic SVGs in `public/media/`. Once real product photography
is supplied, the API returns absolute URLs and `next.config.mjs` →
`images.remotePatterns` needs the media host added.

---

## 7. Accessibility & quality floor

Skip-to-content link, visible keyboard focus on every interactive element,
labelled form fields with inline error messages, `aria-expanded` on menus,
`prefers-reduced-motion` respected, responsive from 360 px upward.

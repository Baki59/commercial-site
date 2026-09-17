/* ===========================================================================
   API SERVICE LAYER
   The only module the rest of the application imports for data. Pages and
   hooks call api.products.list(...) and never touch fetch or URLs directly.

   While NEXT_PUBLIC_API_BASE_URL is empty the bundled demo dataset is served,
   so the site is fully reviewable before the backend exists. Set the live URL
   in .env and every call below switches to the real API automatically.
   =========================================================================== */

import type {
  Article,
  CollectionItem,
  ContentPage,
  EnquiryPayload,
  EnquiryResponse,
  HomePage,
  Location,
  Paginated,
  Partner,
  Product,
  ProductCategory,
  ProductQuery,
  ProductSummary,
  ResourceQuery,
  SiteSettings,
  TechnicalResource,
} from '@/types';

import { PAGE_SIZE, REVALIDATE, USE_DEMO_DATA } from './config';
import { type CollectionKey, endpoints } from './endpoints';
import { ApiError, request } from './http';
import * as demo from './mock';

export { ApiError } from './http';
export { API_BASE_URL, SITE_URL, USE_DEMO_DATA, PAGE_SIZE } from './config';
export { endpoints } from './endpoints';
export type { CollectionKey } from './endpoints';

/**
 * Runs the live request, or the bundled demo equivalent when no backend is
 * configured. In development a failed live call also falls back, so the UI
 * keeps working while the API is being built. In production the error is
 * rethrown and handled by the route's error boundary.
 */
async function resolve<T>(live: () => Promise<T>, fallback: () => T | Promise<T>): Promise<T> {
  if (USE_DEMO_DATA) return fallback();
  try {
    return await live();
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      const detail = error instanceof ApiError ? `${error.status} ${error.path}` : String(error);
      console.warn(`[api] live request failed (${detail}) — serving demo data`);
      return fallback();
    }
    throw error;
  }
}

const notFound = (what: string, slug: string): never => {
  throw new ApiError(`${what} "${slug}" was not found`, 404, slug);
};

/* --- Site ------------------------------------------------------------------ */

export const siteApi = {
  settings: () =>
    resolve<SiteSettings>(
      () => request(endpoints.settings(), { revalidate: REVALIDATE.settings, tags: ['settings'] }),
      () => demo.settings,
    ),

  home: () =>
    resolve<HomePage>(
      () => request(endpoints.home(), { revalidate: REVALIDATE.home, tags: ['home'] }),
      () => demo.home,
    ),
};

/* --- Catalogue ------------------------------------------------------------- */

export const productApi = {
  categories: () =>
    resolve<ProductCategory[]>(
      () => request(endpoints.categories(), { revalidate: REVALIDATE.catalogue, tags: ['categories'] }),
      () => demo.categories,
    ),

  category: (slug: string) =>
    resolve<ProductCategory>(
      () => request(endpoints.category(slug), { revalidate: REVALIDATE.detail, tags: [`category:${slug}`] }),
      () => {
        const flat = demo.categories.flatMap((c) => [c, ...(c.children ?? [])]);
        return flat.find((c) => c.slug === slug) ?? notFound('Category', slug);
      },
    ),

  list: (query: ProductQuery = {}) =>
    resolve<Paginated<ProductSummary>>(
      () =>
        request(endpoints.products(), {
          revalidate: REVALIDATE.catalogue,
          tags: ['products'],
          params: {
            search: query.search,
            category: query.category,
            family: query.family,
            industry: query.industry,
            application: query.application,
            featured: query.featured,
            ordering: query.ordering,
            page: query.page ?? 1,
            page_size: query.pageSize ?? PAGE_SIZE.products,
          },
        }),
      () => demo.filterProducts({ ...query, pageSize: query.pageSize ?? PAGE_SIZE.products }),
    ),

  detail: (slug: string) =>
    resolve<Product>(
      () => request(endpoints.product(slug), { revalidate: REVALIDATE.detail, tags: [`product:${slug}`] }),
      () => demo.products.find((p) => p.slug === slug) ?? notFound('Product', slug),
    ),

  search: (term: string, page = 1) =>
    resolve<Paginated<ProductSummary>>(
      () =>
        request(endpoints.search(), {
          revalidate: 60,
          params: { q: term, page, page_size: PAGE_SIZE.search },
        }),
      () => demo.filterProducts({ search: term, page, pageSize: PAGE_SIZE.search }),
    ),
};

/* --- Technical resources --------------------------------------------------- */

export const resourceApi = {
  list: (query: ResourceQuery = {}) =>
    resolve<Paginated<TechnicalResource>>(
      () =>
        request(endpoints.resources(), {
          revalidate: REVALIDATE.catalogue,
          tags: ['resources'],
          params: {
            search: query.search,
            type: query.type,
            product: query.product,
            page: query.page ?? 1,
            page_size: query.pageSize ?? PAGE_SIZE.resources,
          },
        }),
      () => demo.filterResources({ ...query, pageSize: query.pageSize ?? PAGE_SIZE.resources }),
    ),
};

/* --- Collections (industries / applications / solutions / services) --------- */

const collectionDetailPath: Record<CollectionKey, (slug: string) => string> = {
  industries: endpoints.industry,
  applications: endpoints.application,
  solutions: endpoints.solution,
  services: endpoints.service,
};

export const collectionApi = {
  list: (key: CollectionKey) =>
    resolve<CollectionItem[]>(
      () => request(endpoints[key](), { revalidate: REVALIDATE.catalogue, tags: [key] }),
      () => demo.collections[key] ?? [],
    ),

  detail: (key: CollectionKey, slug: string) =>
    resolve<CollectionItem>(
      () => request(collectionDetailPath[key](slug), { revalidate: REVALIDATE.detail, tags: [`${key}:${slug}`] }),
      () => (demo.collections[key] ?? []).find((item) => item.slug === slug) ?? notFound(key, slug),
    ),
};

/* --- News ------------------------------------------------------------------ */

export const newsApi = {
  list: (page = 1) =>
    resolve<Paginated<Article>>(
      () =>
        request(endpoints.articles(), {
          revalidate: REVALIDATE.news,
          tags: ['news'],
          params: { page, page_size: PAGE_SIZE.news },
        }),
      () => demo.filterArticles(page, PAGE_SIZE.news),
    ),

  detail: (slug: string) =>
    resolve<Article>(
      () => request(endpoints.article(slug), { revalidate: REVALIDATE.detail, tags: [`news:${slug}`] }),
      () => demo.articles.find((a) => a.slug === slug) ?? notFound('Article', slug),
    ),
};

/* --- Corporate ------------------------------------------------------------- */

export const contentApi = {
  page: (slug: string) =>
    resolve<ContentPage>(
      () => request(endpoints.page(slug), { revalidate: REVALIDATE.detail, tags: [`page:${slug}`] }),
      () => demo.pages.find((p) => p.slug === slug) ?? notFound('Page', slug),
    ),

  partners: () =>
    resolve<Partner[]>(
      () => request(endpoints.partners(), { revalidate: REVALIDATE.catalogue, tags: ['partners'] }),
      () => demo.partners,
    ),

  locations: () =>
    resolve<Location[]>(
      () => request(endpoints.locations(), { revalidate: REVALIDATE.catalogue, tags: ['locations'] }),
      () => demo.locations,
    ),
};

/* --- Forms ----------------------------------------------------------------- */

export const formApi = {
  enquiry: async (payload: EnquiryPayload): Promise<EnquiryResponse> => {
    if (USE_DEMO_DATA) {
      await new Promise((r) => setTimeout(r, 700));
      return {
        success: true,
        reference: `DEMO-${Date.now().toString().slice(-6)}`,
        message: 'Demo mode: the enquiry was validated but not sent. Connect the API to deliver it.',
      };
    }
    return request<EnquiryResponse>(endpoints.enquiry(), { method: 'POST', body: payload });
  },
};

/** Single entry point — import this and nothing else. */
export const api = {
  site: siteApi,
  products: productApi,
  resources: resourceApi,
  collections: collectionApi,
  news: newsApi,
  content: contentApi,
  forms: formApi,
};

export default api;

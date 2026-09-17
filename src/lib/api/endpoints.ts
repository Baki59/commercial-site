/* ===========================================================================
   ENDPOINT MAP — the agreed URL surface of the Django REST API.
   Backend team: implement these paths, keep the response shapes in
   src/types/index.ts, and the frontend needs no changes.
   All paths are relative to NEXT_PUBLIC_API_BASE_URL.
   =========================================================================== */

export const endpoints = {
  /* Global -------------------------------------------------------------- */
  settings: () => '/site/settings/',
  navigation: () => '/site/navigation/',
  home: () => '/site/home/',

  /* Products ------------------------------------------------------------ */
  categories: () => '/catalogue/categories/',
  category: (slug: string) => `/catalogue/categories/${slug}/`,
  products: () => '/catalogue/products/',
  product: (slug: string) => `/catalogue/products/${slug}/`,
  productFilters: () => '/catalogue/filters/',
  search: () => '/catalogue/search/',

  /* Technical resources ------------------------------------------------- */
  resources: () => '/resources/',
  resource: (slug: string) => `/resources/${slug}/`,
  resourceTypes: () => '/resources/types/',

  /* Editorial collections ----------------------------------------------- */
  industries: () => '/industries/',
  industry: (slug: string) => `/industries/${slug}/`,
  applications: () => '/applications/',
  application: (slug: string) => `/applications/${slug}/`,
  solutions: () => '/solutions/',
  solution: (slug: string) => `/solutions/${slug}/`,
  services: () => '/services/',
  service: (slug: string) => `/services/${slug}/`,

  /* News & case studies -------------------------------------------------- */
  articles: () => '/news/',
  article: (slug: string) => `/news/${slug}/`,

  /* Corporate ------------------------------------------------------------ */
  pages: () => '/pages/',
  page: (slug: string) => `/pages/${slug}/`,
  partners: () => '/partners/',
  locations: () => '/locations/',

  /* Forms ---------------------------------------------------------------- */
  enquiry: () => '/enquiries/',
} as const;

/** Route segments used for the four structurally identical collections. */
export type CollectionKey = 'industries' | 'applications' | 'solutions' | 'services';

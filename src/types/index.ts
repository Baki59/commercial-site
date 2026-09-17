/* ===========================================================================
   API CONTRACT — shared between this frontend and the Django REST backend.
   Every field below maps 1:1 to a Django serializer key. Build serializers to
   match these shapes and the whole site works without a component change.
   =========================================================================== */

export type ID = string | number;

/** Django REST Framework PageNumberPagination envelope. */
export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface MediaAsset {
  id: ID;
  url: string;
  alt?: string;
  caption?: string;
}

export interface SeoMeta {
  title?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export type PublishStatus = 'published' | 'draft' | 'archived';

/* --- Taxonomy -------------------------------------------------------------- */

/** Lightweight reference used wherever a full object is not needed. */
export interface TaxonomyRef {
  id: ID;
  name: string;
  slug: string;
}

export interface ProductCategory extends TaxonomyRef {
  description?: string;
  image?: MediaAsset | null;
  parent?: string | null;
  children?: ProductCategory[];
  productCount?: number;
  order?: number;
  seo?: SeoMeta;
}

/* --- Products -------------------------------------------------------------- */

export interface SpecItem {
  label: string;
  value: string;
  unit?: string;
}

/** Specifications are grouped: Hydraulic, Materials, Connections, ... */
export interface SpecGroup {
  title: string;
  items: SpecItem[];
}

export type ResourceType =
  | 'catalogue'
  | 'datasheet'
  | 'manual'
  | 'certificate'
  | 'drawing'
  | 'cad'
  | 'other';

export interface TechnicalResource {
  id: ID;
  title: string;
  slug: string;
  type: ResourceType;
  fileUrl: string;
  fileSize?: string;
  fileFormat?: string;
  revision?: string;
  language?: string;
  updatedAt?: string;
  product?: TaxonomyRef | null;
  description?: string;
}

export interface ProductSummary {
  id: ID;
  name: string;
  slug: string;
  model?: string;
  code?: string;
  summary?: string;
  image?: MediaAsset | null;
  category?: TaxonomyRef;
  family?: TaxonomyRef | null;
  isFeatured?: boolean;
  /** Headline duty figures shown on the card, e.g. "Flow to 1,200 m³/h". */
  highlights?: string[];
}

export interface Product extends ProductSummary {
  description?: string;
  images: MediaAsset[];
  features: string[];
  specGroups: SpecGroup[];
  industries: TaxonomyRef[];
  applications: TaxonomyRef[];
  standards?: string[];
  notes?: string;
  resources: TechnicalResource[];
  related: ProductSummary[];
  status: PublishStatus;
  seo?: SeoMeta;
}

/* --- Editorial collections (industries, applications, solutions, services) -- */

export interface CollectionItem extends TaxonomyRef {
  summary?: string;
  body?: string;
  image?: MediaAsset | null;
  order?: number;
  isFeatured?: boolean;
  products?: ProductSummary[];
  applications?: TaxonomyRef[];
  services?: TaxonomyRef[];
  resources?: TechnicalResource[];
  seo?: SeoMeta;
}

/* --- News & case studies --------------------------------------------------- */

export interface Article {
  id: ID;
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  image?: MediaAsset | null;
  category?: string;
  tags?: string[];
  publishedAt: string;
  isFeatured?: boolean;
  seo?: SeoMeta;
}

/* --- Corporate ------------------------------------------------------------- */

export interface ContentSection {
  title?: string;
  body?: string;
  bullets?: string[];
}

export interface ContentPage {
  id: ID;
  title: string;
  slug: string;
  subtitle?: string;
  body?: string;
  sections?: ContentSection[];
  seo?: SeoMeta;
}

export interface Partner extends TaxonomyRef {
  logo?: MediaAsset | null;
  country?: string;
  summary?: string;
  website?: string;
  categories?: string[];
}

export interface Location {
  id: ID;
  name: string;
  type?: 'head-office' | 'factory' | 'warehouse' | 'partner' | 'sales-office';
  addressLines: string[];
  city?: string;
  country?: string;
  region?: string;
  phone?: string;
  email?: string;
  mapEmbedUrl?: string;
  isPrimary?: boolean;
}

/* --- Global site configuration (admin-managed) ------------------------------ */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  /** Renders as a wide mega-panel instead of a plain dropdown. */
  mega?: boolean;
  description?: string;
}

export interface SiteSettings {
  companyName: string;
  legalName: string;
  tagline: string;
  logo?: MediaAsset | null;
  email: string;
  phone: string;
  whatsapp?: string;
  addressLines: string[];
  socials: { label: string; href: string }[];
  navigation: NavItem[];
  footerNote?: string;
  defaultSeo: SeoMeta;
}

/* --- Homepage (fully admin-composed) --------------------------------------- */

export interface HomeHero {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  quickLinks?: { label: string; href: string }[];
}

export interface CapabilityBlock {
  title: string;
  body: string;
  metric?: string;
  metricLabel?: string;
  href?: string;
}

export interface HomePage {
  hero: HomeHero;
  featuredCategories: ProductCategory[];
  featuredProducts: ProductSummary[];
  industries: CollectionItem[];
  services: CollectionItem[];
  capabilities: CapabilityBlock[];
  partners: Partner[];
  featuredResources: TechnicalResource[];
  latestNews: Article[];
}

/* --- Forms ----------------------------------------------------------------- */

export interface EnquiryPayload {
  name: string;
  email: string;
  company?: string;
  country?: string;
  phone?: string;
  subject?: string;
  productSlug?: string;
  message: string;
}

export interface EnquiryResponse {
  success: boolean;
  reference?: string;
  message?: string;
}

/* --- Query parameters ------------------------------------------------------ */

export interface ProductQuery {
  search?: string;
  category?: string;
  family?: string;
  industry?: string;
  application?: string;
  featured?: boolean;
  ordering?: string;
  page?: number;
  pageSize?: number;
}

export interface ResourceQuery {
  search?: string;
  type?: ResourceType | '';
  product?: string;
  page?: number;
  pageSize?: number;
}

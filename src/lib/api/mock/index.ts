import type {
  Article,
  CollectionItem,
  HomePage,
  Paginated,
  Product,
  ProductQuery,
  ProductSummary,
  ResourceQuery,
  TechnicalResource,
} from '@/types';
import { categories, products, resources } from './catalogue';
import { applications, industries, services, solutions } from './collections';
import { articles, locations, pages, partners, settings } from './corporate';

export { categories, products, resources, applications, industries, services, solutions, articles, locations, pages, partners, settings };

export const collections: Record<string, CollectionItem[]> = {
  industries,
  applications,
  solutions,
  services,
};

export function toSummary(product: Product): ProductSummary {
  const { id, name, slug, model, code, summary, image, category, family, isFeatured, highlights } = product;
  return { id, name, slug, model, code, summary, image, category, family, isFeatured, highlights };
}

function paginate<T>(items: T[], page = 1, pageSize = 12): Paginated<T> {
  const start = (page - 1) * pageSize;
  const results = items.slice(start, start + pageSize);
  return {
    count: items.length,
    next: start + pageSize < items.length ? `?page=${page + 1}` : null,
    previous: page > 1 ? `?page=${page - 1}` : null,
    results,
  };
}

export function filterProducts(query: ProductQuery = {}): Paginated<ProductSummary> {
  const { search = '', category, family, industry, application, featured, ordering, page = 1, pageSize = 12 } = query;
  const term = search.trim().toLowerCase();

  let list = products.filter((product) => product.status === 'published');

  if (term) {
    list = list.filter((product) =>
      [product.name, product.model, product.code, product.summary, product.category?.name, product.family?.name]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(term),
    );
  }
  if (category) list = list.filter((p) => p.category?.slug === category || p.family?.slug === category);
  if (family) list = list.filter((p) => p.family?.slug === family);
  if (industry) list = list.filter((p) => p.industries.some((i) => i.slug === industry));
  if (application) list = list.filter((p) => p.applications.some((a) => a.slug === application));
  if (featured) list = list.filter((p) => p.isFeatured);

  if (ordering === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  if (ordering === '-name') list = [...list].sort((a, b) => b.name.localeCompare(a.name));

  return paginate(list.map(toSummary), page, pageSize);
}

export function filterResources(query: ResourceQuery = {}): Paginated<TechnicalResource> {
  const { search = '', type, product, page = 1, pageSize = 15 } = query;
  const term = search.trim().toLowerCase();

  let list = [...resources];
  if (term) {
    list = list.filter((item) => `${item.title} ${item.product?.name ?? ''}`.toLowerCase().includes(term));
  }
  if (type) list = list.filter((item) => item.type === type);
  if (product) list = list.filter((item) => item.product?.slug === product);

  return paginate(list, page, pageSize);
}

export function filterArticles(page = 1, pageSize = 9): Paginated<Article> {
  const sorted = [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return paginate(sorted, page, pageSize);
}

export const home: HomePage = {
  hero: {
    eyebrow: 'Sazin Innovative Industries Ltd.',
    headline: 'Flow equipment selected for the duty, not the catalogue page.',
    subheadline:
      'Pumps, valves, strainers and fabricated pipework for water networks, power plants, process industry and commercial buildings — supplied with the engineering and documentation the project actually needs.',
    primaryCta: { label: 'Browse the catalogue', href: '/products' },
    secondaryCta: { label: 'Talk to an engineer', href: '/contact' },
    quickLinks: [
      { label: 'Datasheets & manuals', href: '/resources' },
      { label: 'Industries we serve', href: '/industries' },
      { label: 'Service & spare parts', href: '/services' },
    ],
  },
  featuredCategories: categories,
  featuredProducts: products.filter((p) => p.isFeatured).map(toSummary),
  industries: industries.filter((i) => i.isFeatured),
  services: services.filter((s) => s.isFeatured),
  capabilities: [
    {
      title: 'Selection against real duty data',
      body: 'Curves, NPSH margin and material schedules prepared from your system data, written to be checked by your consultant.',
      metric: 'DN 15–1200',
      metricLabel: 'Size range supplied',
      href: '/services/application-engineering-selection',
    },
    {
      title: 'Assembly and testing in-house',
      body: 'Packaged sets are built, coated and wet tested at our facility before despatch, with the signed test record shipped alongside.',
      metric: 'Wet tested',
      metricLabel: 'Before every despatch',
      href: '/company/manufacturing',
    },
    {
      title: 'Documentation from order, not handover',
      body: 'Material certificates, welding records, inspection reports and test certificates assembled as the work proceeds.',
      metric: 'ISO 9001',
      metricLabel: 'Certified quality system',
      href: '/company/quality',
    },
    {
      title: 'Parts held against the installed base',
      body: 'Recommended spares lists built from what is actually installed on your site, with critical items stocked locally.',
      metric: '3 locations',
      metricLabel: 'Service coverage in Bangladesh',
      href: '/services/spare-parts-inventory-support',
    },
  ],
  partners,
  featuredResources: resources.slice(0, 4),
  latestNews: [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3),
};

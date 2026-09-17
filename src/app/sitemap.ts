import type { MetadataRoute } from 'next';
import { api, SITE_URL } from '@/lib/api';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products, industries, applications, solutions, services, news] = await Promise.all([
    api.products.categories(),
    api.products.list({ pageSize: 500 }),
    api.collections.list('industries'),
    api.collections.list('applications'),
    api.collections.list('solutions'),
    api.collections.list('services'),
    api.news.list(1),
  ]);

  const url = (path: string, priority = 0.6): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    priority,
  });

  return [
    url('/', 1),
    url('/products', 0.9),
    url('/industries', 0.8),
    url('/applications', 0.7),
    url('/solutions', 0.8),
    url('/services', 0.8),
    url('/resources', 0.8),
    url('/partners', 0.5),
    url('/locations', 0.5),
    url('/news', 0.6),
    url('/careers', 0.4),
    url('/contact', 0.7),
    ...['about', 'manufacturing', 'quality', 'technology', 'sustainability'].map((slug) =>
      url(`/company/${slug}`, 0.6),
    ),
    ...categories.map((item) => url(`/categories/${item.slug}`, 0.8)),
    ...products.results.map((item) => url(`/products/${item.slug}`, 0.9)),
    ...industries.map((item) => url(`/industries/${item.slug}`, 0.7)),
    ...applications.map((item) => url(`/applications/${item.slug}`, 0.6)),
    ...solutions.map((item) => url(`/solutions/${item.slug}`, 0.7)),
    ...services.map((item) => url(`/services/${item.slug}`, 0.7)),
    ...news.results.map((item) => url(`/news/${item.slug}`, 0.5)),
  ];
}

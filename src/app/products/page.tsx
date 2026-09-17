import type { Metadata } from 'next';
import { Suspense } from 'react';
import { api, PAGE_SIZE } from '@/lib/api';
import { ButtonLink, Container, EmptyState, PageHeader, Pagination } from '@/components/ui';
import { CatalogueFilters, CatalogueSearch } from '@/components/product/CatalogueFilters';
import { ProductGrid } from '@/components/product/ProductCard';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Industrial pumps, valves, strainers and fabricated pipework. Filter by category, industry or application, and download specifications from any product page.',
};

type Props = {
  searchParams: Promise<{ q?: string; category?: string; industry?: string; application?: string; page?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);

  const [categories, industries, applications, results] = await Promise.all([
    api.products.categories(),
    api.collections.list('industries'),
    api.collections.list('applications'),
    api.products.list({
      search: params.q,
      category: params.category,
      industry: params.industry,
      application: params.application,
      page,
    }),
  ]);

  return (
    <>
      <PageHeader
        title="Product catalogue"
        description="Every record carries its model code, grouped technical specifications and downloadable documents."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
        aside={<ButtonLink href="/resources" variant="secondary">Document library</ButtonLink>}
      />

      <Container className="py-10 sm:py-14">
        <Suspense fallback={<div className="h-12 rounded-sm border border-line bg-surface" />}>
          <CatalogueSearch />
        </Suspense>

        <div className="mt-8 grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-10">
          <aside>
            <Suspense fallback={<div className="h-96 rounded-sm border border-line bg-surface" />}>
              <CatalogueFilters categories={categories} industries={industries} applications={applications} />
            </Suspense>
          </aside>

          <div>
            <p className="mb-5 text-[0.88rem] text-muted">
              {results.count} {results.count === 1 ? 'product' : 'products'}
              {params.q ? ` matching “${params.q}”` : ''}
            </p>

            {results.results.length ? (
              <ProductGrid products={results.results} />
            ) : (
              <EmptyState
                title="No products match these filters"
                description="Clear a filter, or send us the duty conditions and we will confirm what fits."
                action={<ButtonLink href="/contact">Ask an engineer</ButtonLink>}
              />
            )}

            <Pagination
              page={page}
              count={results.count}
              pageSize={PAGE_SIZE.products}
              basePath="/products"
              params={{
                q: params.q,
                category: params.category,
                industry: params.industry,
                application: params.application,
              }}
            />
          </div>
        </div>
      </Container>
    </>
  );
}

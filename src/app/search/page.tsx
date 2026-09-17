import type { Metadata } from 'next';
import { Suspense } from 'react';
import { api, PAGE_SIZE } from '@/lib/api';
import { ButtonLink, Container, EmptyState, PageHeader, Pagination } from '@/components/ui';
import { CatalogueSearch } from '@/components/product/CatalogueFilters';
import { ProductGrid } from '@/components/product/ProductCard';
import { ResourceList } from '@/components/product/ResourceList';

export const metadata: Metadata = { title: 'Search', robots: { index: false } };

type Props = { searchParams: Promise<{ q?: string; page?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const term = params.q?.trim() ?? '';
  const page = Number(params.page ?? 1);

  const [products, resources] = term
    ? await Promise.all([api.products.search(term, page), api.resources.list({ search: term, pageSize: 6 })])
    : [null, null];

  return (
    <>
      <PageHeader
        title={term ? `Search results for “${term}”` : 'Search'}
        description="Products are matched on name, model and code. Documents are matched on title and the product they belong to."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Search' }]}
      />

      <Container className="py-10 sm:py-14">
        <Suspense fallback={<div className="h-12 rounded-sm border border-line bg-surface" />}>
          <CatalogueSearch />
        </Suspense>

        {!term ? (
          <div className="mt-10">
            <EmptyState
              title="Type a model number or a product name"
              description="Try SIN-EC, butterfly valve, or a size such as DN 200."
              action={<ButtonLink href="/products">Browse the catalogue instead</ButtonLink>}
            />
          </div>
        ) : (
          <div className="mt-10 space-y-14">
            <div>
              <h2 className="mb-5 text-[1.25rem]">
                Products <span className="text-[0.9rem] font-normal text-muted">({products?.count ?? 0})</span>
              </h2>
              {products?.results.length ? (
                <>
                  <ProductGrid products={products.results} />
                  <Pagination
                    page={page}
                    count={products.count}
                    pageSize={PAGE_SIZE.search}
                    basePath="/search"
                    params={{ q: term }}
                  />
                </>
              ) : (
                <EmptyState
                  title="No products matched that term"
                  description="Check the model spelling, or send us the duty conditions and we will identify the right range."
                  action={<ButtonLink href="/contact">Ask an engineer</ButtonLink>}
                />
              )}
            </div>

            {resources?.results.length ? (
              <div>
                <h2 className="mb-5 text-[1.25rem]">
                  Documents <span className="text-[0.9rem] font-normal text-muted">({resources.count})</span>
                </h2>
                <ResourceList resources={resources.results} />
              </div>
            ) : null}
          </div>
        )}
      </Container>
    </>
  );
}

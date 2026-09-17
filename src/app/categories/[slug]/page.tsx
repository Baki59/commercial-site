import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api, PAGE_SIZE } from '@/lib/api';
import { ButtonLink, Container, EmptyState, PageHeader, Pagination, Tag } from '@/components/ui';
import { ProductGrid } from '@/components/product/ProductCard';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateStaticParams() {
  const categories = await api.products.categories();
  return categories.flatMap((category) => [
    { slug: category.slug },
    ...(category.children ?? []).map((child) => ({ slug: child.slug })),
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const category = await api.products.category(slug);
    return { title: category.seo?.title ?? category.name, description: category.seo?.description ?? category.description };
  } catch {
    return { title: 'Not found' };
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const page = Number((await searchParams).page ?? 1);

  let category;
  try {
    category = await api.products.category(slug);
  } catch {
    notFound();
  }

  const results = await api.products.list({ category: slug, page });

  return (
    <>
      <PageHeader
        title={category.name}
        description={category.description}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: category.name }]}
        aside={<ButtonLink href="/contact">Request a selection</ButtonLink>}
      />

      <Container className="py-10 sm:py-14">
        {category.children?.length ? (
          <div className="mb-8 flex flex-wrap gap-2.5">
            {category.children.map((child) => (
              <Tag key={child.slug} href={`/categories/${child.slug}`} className="px-3.5 py-2">
                {child.name}
              </Tag>
            ))}
          </div>
        ) : null}

        {results.results.length ? (
          <ProductGrid products={results.results} />
        ) : (
          <EmptyState
            title="No products published in this family yet"
            description="Tell us what you are looking for and we will confirm availability and lead time."
            action={<ButtonLink href="/contact">Contact us</ButtonLink>}
          />
        )}

        <Pagination page={page} count={results.count} pageSize={PAGE_SIZE.products} basePath={`/categories/${slug}`} />
      </Container>
    </>
  );
}

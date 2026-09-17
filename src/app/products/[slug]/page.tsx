import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api, SITE_URL } from '@/lib/api';
import { ButtonLink, Container, PageHeader, Section, SectionHead, Tag } from '@/components/ui';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductGrid } from '@/components/product/ProductCard';
import { ResourceList } from '@/components/product/ResourceList';
import { SpecTable } from '@/components/product/SpecTable';
import { Icon } from '@/lib/utils';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await api.products.list({ pageSize: 500 });
  return products.results.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await api.products.detail(slug);
    return {
      title: product.seo?.title ?? product.name,
      description: product.seo?.description ?? product.summary,
      alternates: { canonical: `${SITE_URL}/products/${product.slug}` },
      openGraph: { title: product.name, description: product.summary, images: product.image ? [product.image.url] : [] },
    };
  } catch {
    return { title: 'Not found' };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  let product;
  try {
    product = await api.products.detail(slug);
  } catch {
    notFound();
  }

  /* Structured data so search engines can read the product record properly. */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.code,
    model: product.model,
    description: product.summary,
    category: product.category?.name,
    brand: { '@type': 'Brand', name: 'Sazin Innovative Industries' },
    url: `${SITE_URL}/products/${product.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        title={product.name}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          ...(product.category ? [{ label: product.category.name, href: `/categories/${product.category.slug}` }] : []),
          { label: product.model ?? product.name },
        ]}
      />

      <Container className="py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <ProductGallery images={product.images} name={product.name} />

          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              {product.model ? (
                <span className="rounded-xs bg-marine px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.78rem] text-white">
                  {product.model}
                </span>
              ) : null}
              {product.code ? <span className="text-[0.82rem] text-muted">Sizes {product.code}</span> : null}
            </div>

            {product.summary ? <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-soft">{product.summary}</p> : null}
            {product.description ? <p className="mt-4 leading-relaxed text-ink-soft">{product.description}</p> : null}

            {product.highlights?.length ? (
              <dl className="mt-7 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
                {product.highlights.map((item) => (
                  <div key={item} className="bg-surface px-4 py-3.5 text-[0.88rem] text-ink">
                    {item}
                  </div>
                ))}
              </dl>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/contact?product=${product.slug}`} size="lg">
                Request a quotation
              </ButtonLink>
              {product.resources.length ? (
                <ButtonLink href="#documents" variant="secondary" size="lg">
                  <Icon.download size={17} />
                  Documents ({product.resources.length})
                </ButtonLink>
              ) : null}
            </div>

            {product.standards?.length ? (
              <div className="mt-8 border-t border-line pt-5">
                <p className="mb-2.5 text-[0.85rem] text-muted">Designed and tested to</p>
                <div className="flex flex-wrap gap-2">
                  {product.standards.map((standard) => (
                    <Tag key={standard}>{standard}</Tag>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Container>

      {product.features.length ? (
        <Section tone="surface" spacing="tight">
          <SectionHead title="Design features" />
          <ul className="grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
            {product.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-soft">
                <Icon.check size={18} className="mt-0.5 shrink-0 text-accent" />
                {feature}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section tone="paper" spacing="tight">
        <SectionHead
          title="Technical specifications"
          description={product.notes}
        />
        <SpecTable groups={product.specGroups} />
      </Section>

      {product.industries.length || product.applications.length ? (
        <Section tone="surface" spacing="tight">
          <div className="grid gap-10 sm:grid-cols-2">
            {product.industries.length ? (
              <div>
                <h2 className="text-[1.15rem]">Industries</h2>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {product.industries.map((item) => (
                    <Tag key={item.slug} href={`/industries/${item.slug}`} className="px-3.5 py-2">
                      {item.name}
                    </Tag>
                  ))}
                </div>
              </div>
            ) : null}
            {product.applications.length ? (
              <div>
                <h2 className="text-[1.15rem]">Applications</h2>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {product.applications.map((item) => (
                    <Tag key={item.slug} href={`/applications/${item.slug}`} className="px-3.5 py-2">
                      {item.name}
                    </Tag>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {product.resources.length ? (
        <Section tone="sunk" spacing="tight" id="documents">
          <SectionHead
            title="Technical documents"
            description="Datasheets, manuals, certificates and drawings for this range."
            action={
              <Link href="/resources" className="text-[0.88rem] text-accent-deep underline underline-offset-4">
                All documents
              </Link>
            }
          />
          <ResourceList resources={product.resources} />
        </Section>
      ) : null}

      {product.related.length ? (
        <Section tone="paper" spacing="tight">
          <SectionHead title="Related products" />
          <ProductGrid products={product.related} compact />
        </Section>
      ) : null}
    </>
  );
}

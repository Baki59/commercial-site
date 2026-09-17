import type { Metadata } from 'next';
import Link from 'next/link';
import { api, PAGE_SIZE } from '@/lib/api';
import type { ResourceType } from '@/types';
import { ButtonLink, Container, EmptyState, PageHeader, Pagination } from '@/components/ui';
import { ResourceList } from '@/components/product/ResourceList';
import { cn, RESOURCE_LABELS } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Engineering resources',
  description:
    'Catalogues, datasheets, installation manuals, certificates, dimensional drawings and CAD files for Sazin products.',
};

type Props = { searchParams: Promise<{ type?: string; q?: string; page?: string }> };

const TYPES: (ResourceType | '')[] = ['', 'catalogue', 'datasheet', 'manual', 'certificate', 'drawing', 'cad'];

export default async function ResourcesPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const type = (params.type ?? '') as ResourceType | '';

  const results = await api.resources.list({ type, search: params.q, page });

  const href = (value: ResourceType | '') => {
    const search = new URLSearchParams();
    if (value) search.set('type', value);
    if (params.q) search.set('q', params.q);
    const qs = search.toString();
    return qs ? `/resources?${qs}` : '/resources';
  };

  return (
    <>
      <PageHeader
        title="Engineering resources"
        description="Every document is version-marked and tied to the product it belongs to, so you can check you are working from the current revision."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Engineering' }]}
        aside={<ButtonLink href="/contact" variant="secondary">Request a document</ButtonLink>}
      />

      <Container className="py-10 sm:py-14">
        <div className="mb-8 flex flex-wrap gap-2">
          {TYPES.map((value) => (
            <Link
              key={value || 'all'}
              href={href(value)}
              aria-current={type === value ? 'page' : undefined}
              className={cn(
                'rounded-xs border px-3.5 py-2 text-[0.87rem] transition-colors',
                type === value
                  ? 'border-marine bg-marine text-white'
                  : 'border-line-strong bg-surface text-ink-soft hover:border-accent hover:text-accent-deep',
              )}
            >
              {value ? RESOURCE_LABELS[value] : 'All documents'}
            </Link>
          ))}
        </div>

        <p className="mb-5 text-[0.88rem] text-muted">
          {results.count} {results.count === 1 ? 'document' : 'documents'}
        </p>

        {results.results.length ? (
          <ResourceList resources={results.results} />
        ) : (
          <EmptyState
            title="No documents of this type yet"
            description="Tell us which product and document you need and we will send the current revision."
            action={<ButtonLink href="/contact">Request a document</ButtonLink>}
          />
        )}

        <Pagination
          page={page}
          count={results.count}
          pageSize={PAGE_SIZE.resources}
          basePath="/resources"
          params={{ type: type || undefined, q: params.q }}
        />
      </Container>
    </>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import type { CollectionItem } from '@/types';
import type { CollectionKey } from '@/lib/api';
import { ButtonLink, PageHeader, Section, SectionHead } from '@/components/ui';
import { ProductGrid } from '@/components/product/ProductCard';
import { ResourceList } from '@/components/product/ResourceList';
import { Icon } from '@/lib/utils';

/* Industries, applications, solutions and services share one structure, so they
   share one pair of templates. Adding a fifth collection is a route file and an
   entry in the endpoint map, not a new set of components. */

const LABELS: Record<CollectionKey, { title: string; description: string; noun: string }> = {
  industries: {
    title: 'Industries',
    description:
      'The sectors we supply, and what changes about equipment selection in each of them.',
    noun: 'industry',
  },
  applications: {
    title: 'Applications',
    description: 'Duty types we select equipment for, from pressure boosting to dewatering.',
    noun: 'application',
  },
  solutions: {
    title: 'Solutions',
    description: 'Packaged systems supplied as complete, tested assemblies rather than loose equipment.',
    noun: 'solution',
  },
  services: {
    title: 'Services',
    description: 'Engineering, commissioning and support that keep installed equipment performing.',
    noun: 'service',
  },
};

export function CollectionLanding({ collection, items }: { collection: CollectionKey; items: CollectionItem[] }) {
  const meta = LABELS[collection];

  return (
    <>
      <PageHeader
        title={meta.title}
        description={meta.description}
        crumbs={[{ label: 'Home', href: '/' }, { label: meta.title }]}
      />
      <Section tone="paper">
        <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/${collection}/${item.slug}`}
              className="group flex flex-col bg-surface p-6 transition-colors hover:bg-accent-wash/45"
            >
              <h2 className="text-[1.08rem] transition-colors group-hover:text-accent-deep">{item.name}</h2>
              <p className="mt-2.5 flex-1 text-[0.89rem] leading-relaxed text-ink-soft">{item.summary}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-[0.85rem] text-accent-deep">
                Read more
                <Icon.arrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

export function CollectionDetail({ collection, item }: { collection: CollectionKey; item: CollectionItem }) {
  const meta = LABELS[collection];

  return (
    <>
      <PageHeader
        title={item.name}
        description={item.summary}
        crumbs={[{ label: 'Home', href: '/' }, { label: meta.title, href: `/${collection}` }, { label: item.name }]}
        aside={<ButtonLink href="/contact">Discuss a requirement</ButtonLink>}
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="prose-doc">
            {item.body?.split('\n\n').map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
          </div>

          {item.image ? (
            <div className="relative aspect-4/3 overflow-hidden rounded-sm border border-line bg-surface-sunk">
              <Image
                src={item.image.url}
                alt={item.image.alt ?? item.name}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </Section>

      {item.products?.length ? (
        <Section tone="surface">
          <SectionHead
            title="Equipment for this duty"
            description={`Products regularly specified for this ${meta.noun}.`}
            action={<ButtonLink href="/products" variant="secondary" size="sm">All products</ButtonLink>}
          />
          <ProductGrid products={item.products} />
        </Section>
      ) : null}

      {item.applications?.length ? (
        <Section tone="paper" spacing="tight">
          <SectionHead title="Related applications" />
          <div className="flex flex-wrap gap-2.5">
            {item.applications.map((application) => (
              <Link
                key={application.slug}
                href={`/applications/${application.slug}`}
                className="rounded-xs border border-line-strong bg-surface px-4 py-2.5 text-[0.9rem] transition-colors hover:border-accent hover:text-accent-deep"
              >
                {application.name}
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      {item.resources?.length ? (
        <Section tone="sunk" spacing="tight">
          <SectionHead title="Related documents" />
          <ResourceList resources={item.resources} />
        </Section>
      ) : null}
    </>
  );
}

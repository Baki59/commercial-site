import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { ButtonLink, Container, PageHeader, Tag } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Partners & brands',
  description: 'Manufacturing and technology partners represented and supported by Sazin Innovative Industries.',
};

export default async function PartnersPage() {
  const partners = await api.content.partners();

  return (
    <>
      <PageHeader
        title="Partners and brands"
        description="Ranges we represent, and the technology partners we work with on engineered packages. Every partner product is supported locally with parts and service."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Partners' }]}
        aside={<ButtonLink href="/contact" variant="secondary">Become a partner</ButtonLink>}
      />

      <Container className="py-10 sm:py-14">
        <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <div key={partner.slug} className="flex flex-col bg-surface p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-[1.05rem]">{partner.name}</h2>
                <span className="shrink-0 text-2xs text-muted">{partner.country}</span>
              </div>
              <p className="mt-2.5 flex-1 text-[0.89rem] leading-relaxed text-ink-soft">{partner.summary}</p>
              {partner.categories?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {partner.categories.map((category) => (
                    <Tag key={category}>{category}</Tag>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

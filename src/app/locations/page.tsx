import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { ButtonLink, Container, PageHeader } from '@/components/ui';
import { Icon } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Global presence',
  description: 'Offices, manufacturing facility, service centres and regional partners.',
};

export default async function LocationsPage() {
  const locations = await api.content.locations();
  const regions = [...new Set(locations.map((location) => location.region ?? 'Other'))];

  return (
    <>
      <PageHeader
        title="Global presence"
        description="Head office, manufacturing and service in Bangladesh, with partner representation across the Middle East and South East Asia."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Locations' }]}
        aside={<ButtonLink href="/contact">Contact the right office</ButtonLink>}
      />

      <Container className="py-10 sm:py-14">
        <div className="space-y-12">
          {regions.map((region) => (
            <div key={region}>
              <h2 className="mb-5 flex items-center gap-2.5 text-[1.2rem]">
                <Icon.globe size={19} className="text-accent" />
                {region}
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {locations
                  .filter((location) => (location.region ?? 'Other') === region)
                  .map((location) => (
                    <div key={location.id} className="rounded-sm border border-line bg-surface p-6">
                      <h3 className="text-[1.02rem]">{location.name}</h3>
                      <address className="mt-3 space-y-2.5 text-[0.89rem] not-italic text-ink-soft">
                        <span className="flex items-start gap-2.5">
                          <Icon.pin size={16} className="mt-0.5 shrink-0 text-muted" />
                          <span>{location.addressLines.join(', ')}</span>
                        </span>
                        {location.phone ? (
                          <a
                            href={`tel:${location.phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-2.5 transition-colors hover:text-accent-deep"
                          >
                            <Icon.phone size={16} className="text-muted" />
                            {location.phone}
                          </a>
                        ) : null}
                        {location.email ? (
                          <a
                            href={`mailto:${location.email}`}
                            className="flex items-center gap-2.5 transition-colors hover:text-accent-deep"
                          >
                            <Icon.mail size={16} className="text-muted" />
                            {location.email}
                          </a>
                        ) : null}
                      </address>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

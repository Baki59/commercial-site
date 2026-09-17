import type { Metadata } from 'next';
import { Suspense } from 'react';
import { api } from '@/lib/api';
import { Container, PageHeader } from '@/components/ui';
import { EnquiryForm } from '@/components/common/EnquiryForm';
import { Icon } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Send your duty conditions or drawings and an engineer will reply within one working day.',
};

export default async function ContactPage() {
  const [settings, locations] = await Promise.all([api.site.settings(), api.content.locations()]);
  const head = locations.find((location) => location.isPrimary) ?? locations[0];

  return (
    <>
      <PageHeader
        title="Contact us"
        description="Send the duty conditions, a drawing or a model number. An engineer replies — not an autoresponder."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <Container className="py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <Suspense fallback={<div className="h-[36rem] rounded-sm border border-line bg-surface" />}>
            <EnquiryForm />
          </Suspense>

          <aside className="space-y-8">
            <div className="rounded-sm border border-line bg-surface p-6">
              <h2 className="text-[1.1rem]">Direct lines</h2>
              <div className="mt-4 space-y-3 text-[0.92rem]">
                <a
                  href={`tel:${settings.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-ink-soft transition-colors hover:text-accent-deep"
                >
                  <Icon.phone size={17} className="text-muted" />
                  {settings.phone}
                </a>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 text-ink-soft transition-colors hover:text-accent-deep"
                >
                  <Icon.mail size={17} className="text-muted" />
                  {settings.email}
                </a>
              </div>
            </div>

            {head ? (
              <div className="rounded-sm border border-line bg-surface p-6">
                <h2 className="text-[1.1rem]">{head.name}</h2>
                <address className="mt-3 text-[0.92rem] not-italic leading-relaxed text-ink-soft">
                  {head.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            ) : null}

            <div className="rounded-sm border border-line bg-surface p-6">
              <h2 className="text-[1.1rem]">What helps us reply faster</h2>
              <ul className="mt-4 space-y-2.5 text-[0.9rem] text-ink-soft">
                {[
                  'Flow rate and head, or inlet and outlet pressure',
                  'Liquid, temperature and any solids content',
                  'Line size and flange standard',
                  'Power supply and control requirement',
                  'Quantity and required delivery date',
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Icon.check size={17} className="mt-0.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}

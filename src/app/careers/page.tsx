import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { ButtonLink, Container, PageHeader, Section } from '@/components/ui';
import { Icon } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Engineering, service and commercial roles at Sazin Innovative Industries Ltd.',
};

export default async function CareersPage() {
  const page = await api.content.page('careers');

  return (
    <>
      <PageHeader
        title={page.title}
        description={page.subtitle}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Careers' }]}
      />

      <Container width="narrow" className="py-10 sm:py-14">
        <p className="text-[1.05rem] leading-relaxed text-ink">{page.body}</p>
      </Container>

      {page.sections?.map((section) => (
        <Section key={section.title} tone="surface" spacing="tight">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-[1.45rem]">{section.title}</h2>
            <ul className="mt-5 space-y-3">
              {section.bullets?.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-[0.95rem] text-ink-soft">
                  <Icon.check size={18} className="mt-0.5 shrink-0 text-accent" />
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink href="/contact">Send your CV</ButtonLink>
            </div>
          </div>
        </Section>
      ))}
    </>
  );
}

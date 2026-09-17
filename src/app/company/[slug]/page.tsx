import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { ButtonLink, Container, PageHeader, Section } from '@/components/ui';
import { Icon } from '@/lib/utils';

/* One managed-content template serves About, Manufacturing, Quality,
   Technology, Sustainability and any further page the admin creates. */

const SLUGS = ['about', 'manufacturing', 'quality', 'technology', 'sustainability'];

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const page = await api.content.page(slug);
    return { title: page.seo?.title ?? page.title, description: page.seo?.description ?? page.subtitle };
  } catch {
    return { title: 'Not found' };
  }
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;

  let page;
  try {
    page = await api.content.page(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={page.title}
        description={page.subtitle}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Company', href: '/company/about' }, { label: page.title }]}
        aside={<ButtonLink href="/contact" variant="secondary">Contact us</ButtonLink>}
      />

      <Container width="narrow" className="py-10 sm:py-14">
        {page.body ? <p className="text-[1.08rem] leading-relaxed text-ink">{page.body}</p> : null}
      </Container>

      {page.sections?.map((section, index) => (
        <Section key={section.title ?? index} tone={index % 2 ? 'paper' : 'surface'} spacing="tight">
          <div className="mx-auto max-w-4xl">
            {section.title ? <h2 className="text-[1.5rem]">{section.title}</h2> : null}
            {section.body ? <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">{section.body}</p> : null}
            {section.bullets?.length ? (
              <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-[0.94rem] leading-relaxed text-ink-soft">
                    <Icon.check size={18} className="mt-0.5 shrink-0 text-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Section>
      ))}
    </>
  );
}

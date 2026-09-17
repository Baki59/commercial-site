import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { ButtonLink, Container, PageHeader, Tag } from '@/components/ui';
import { formatDate } from '@/lib/utils';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await api.news.list(1);
  return articles.results.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await api.news.detail(slug);
    return {
      title: article.seo?.title ?? article.title,
      description: article.seo?.description ?? article.excerpt,
      openGraph: { type: 'article', publishedTime: article.publishedAt, images: article.image ? [article.image.url] : [] },
    };
  } catch {
    return { title: 'Not found' };
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  let article;
  try {
    article = await api.news.detail(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={article.title}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'News', href: '/news' }, { label: article.category ?? 'Article' }]}
      />

      <Container width="narrow" className="py-10 sm:py-14">
        <div className="flex items-center gap-3">
          {article.category ? <Tag tone="accent">{article.category}</Tag> : null}
          <span className="text-[0.85rem] text-muted">{formatDate(article.publishedAt)}</span>
        </div>

        {article.image ? (
          <div className="relative mt-7 aspect-16/9 overflow-hidden rounded-sm border border-line bg-surface-sunk">
            <Image
              src={article.image.url}
              alt={article.image.alt ?? article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 56rem"
              className="object-cover"
            />
          </div>
        ) : null}

        {article.excerpt ? <p className="mt-8 text-[1.1rem] leading-relaxed text-ink">{article.excerpt}</p> : null}

        <div className="prose-doc mt-6">
          {article.body?.split('\n\n').map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
        </div>

        {article.tags?.length ? (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
            {article.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        ) : null}

        <div className="mt-10 rounded-sm border border-line bg-surface p-7">
          <h2 className="text-[1.2rem]">Working on something similar?</h2>
          <p className="mt-2.5 text-[0.94rem] leading-relaxed text-ink-soft">
            Send the duty conditions or the drawings and we will come back with a selection you can review.
          </p>
          <div className="mt-5">
            <ButtonLink href="/contact">Talk to an engineer</ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}

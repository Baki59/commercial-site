import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { api, PAGE_SIZE } from '@/lib/api';
import { Container, PageHeader, Pagination, Tag } from '@/components/ui';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'News & case studies',
  description: 'Project case studies, product updates and company news from Sazin Innovative Industries.',
};

type Props = { searchParams: Promise<{ page?: string }> };

export default async function NewsPage({ searchParams }: Props) {
  const page = Number((await searchParams).page ?? 1);
  const results = await api.news.list(page);

  return (
    <>
      <PageHeader
        title="News and case studies"
        description="What we have been working on, and what changed in the product ranges."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'News' }]}
      />

      <Container className="py-10 sm:py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.results.map((article) => (
            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-sm border border-line bg-surface transition-colors hover:border-accent"
            >
              <div className="relative aspect-16/9 bg-surface-sunk">
                {article.image ? (
                  <Image
                    src={article.image.url}
                    alt={article.image.alt ?? article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-3">
                  {article.category ? <Tag tone="accent">{article.category}</Tag> : null}
                  <span className="text-2xs text-muted">{formatDate(article.publishedAt)}</span>
                </div>
                <h2 className="mt-3 text-[1.05rem] leading-snug transition-colors group-hover:text-accent-deep">
                  {article.title}
                </h2>
                <p className="mt-2.5 line-clamp-3 text-[0.88rem] leading-relaxed text-ink-soft">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        <Pagination page={page} count={results.count} pageSize={PAGE_SIZE.news} basePath="/news" />
      </Container>
    </>
  );
}

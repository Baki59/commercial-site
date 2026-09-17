import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { CollectionDetail } from '@/components/collections/CollectionViews';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const items = await api.collections.list('solutions');
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const item = await api.collections.detail('solutions', slug);
    return { title: item.seo?.title ?? item.name, description: item.seo?.description ?? item.summary };
  } catch {
    return { title: 'Not found' };
  }
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  try {
    const item = await api.collections.detail('solutions', slug);
    return <CollectionDetail collection="solutions" item={item} />;
  } catch {
    notFound();
  }
}

import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { CollectionLanding } from '@/components/collections/CollectionViews';

export const metadata: Metadata = { title: 'Solutions' };

export default async function SolutionsPage() {
  const items = await api.collections.list('solutions');
  return <CollectionLanding collection="solutions" items={items} />;
}

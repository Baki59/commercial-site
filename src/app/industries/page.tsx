import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { CollectionLanding } from '@/components/collections/CollectionViews';

export const metadata: Metadata = { title: 'Industries' };

export default async function IndustriesPage() {
  const items = await api.collections.list('industries');
  return <CollectionLanding collection="industries" items={items} />;
}

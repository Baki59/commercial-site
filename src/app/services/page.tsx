import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { CollectionLanding } from '@/components/collections/CollectionViews';

export const metadata: Metadata = { title: 'Services' };

export default async function ServicesPage() {
  const items = await api.collections.list('services');
  return <CollectionLanding collection="services" items={items} />;
}

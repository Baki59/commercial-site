import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { CollectionLanding } from '@/components/collections/CollectionViews';

export const metadata: Metadata = { title: 'Applications' };

export default async function ApplicationsPage() {
  const items = await api.collections.list('applications');
  return <CollectionLanding collection="applications" items={items} />;
}

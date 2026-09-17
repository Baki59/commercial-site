import type { ResourceType, SpecItem } from '@/types';

export const RESOURCE_LABELS: Record<ResourceType, string> = {
  catalogue: 'Catalogue',
  datasheet: 'Datasheet',
  manual: 'Manual',
  certificate: 'Certificate',
  drawing: 'Drawing',
  cad: 'CAD file',
  other: 'Document',
};

export function formatDate(value?: string): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function specValue(item: SpecItem): string {
  return item.unit ? `${item.value} ${item.unit}` : item.value;
}

export function truncate(text: string, max = 160): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

/** Strips a slug back to readable text, for breadcrumbs on unknown segments. */
export function humanise(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

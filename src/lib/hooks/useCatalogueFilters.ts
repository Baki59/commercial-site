'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ProductQuery } from '@/types';

/**
 * Catalogue filter state lives in the URL, not in React state, so a filtered
 * view can be bookmarked, shared with a colleague and indexed. The store keeps
 * only transient UI state such as the open filter drawer.
 */
export function useCatalogueFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const filters: ProductQuery = useMemo(
    () => ({
      search: params.get('q') ?? '',
      category: params.get('category') ?? '',
      industry: params.get('industry') ?? '',
      application: params.get('application') ?? '',
      page: Number(params.get('page') ?? 1),
    }),
    [params],
  );

  const apply = useCallback(
    (next: Partial<Record<'q' | 'category' | 'industry' | 'application' | 'page', string | number | undefined>>) => {
      const search = new URLSearchParams(params.toString());
      for (const [key, value] of Object.entries(next)) {
        if (value === undefined || value === '' || value === 0) search.delete(key);
        else search.set(key, String(value));
      }
      // Any filter change other than paging returns to page one.
      if (!('page' in next)) search.delete('page');
      const qs = search.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const clear = useCallback(() => router.push(pathname, { scroll: false }), [pathname, router]);

  const activeCount = useMemo(
    () => ['q', 'category', 'industry', 'application'].filter((key) => params.get(key)).length,
    [params],
  );

  return { filters, apply, clear, activeCount };
}

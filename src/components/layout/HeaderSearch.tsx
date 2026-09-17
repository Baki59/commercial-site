'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Icon } from '@/lib/utils';

/** Compact model-number search in the header — the way most buyers arrive. */
export function HeaderSearch() {
  const router = useRouter();
  const [term, setTerm] = useState('');

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        if (term.trim()) router.push(`/search?q=${encodeURIComponent(term.trim())}`);
      }}
      className="relative"
    >
      <label htmlFor="header-search" className="sr-only">
        Search products by name or model
      </label>
      <Icon.search size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
      <input
        id="header-search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Search model or product"
        className="h-10 w-56 rounded-xs border border-line-strong bg-paper pr-3 pl-9 text-[0.87rem] transition-colors focus:border-accent focus:bg-surface focus:outline-none"
      />
    </form>
  );
}

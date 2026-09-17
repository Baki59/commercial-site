'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ProductCategory } from '@/types';
import { Icon } from '@/lib/utils';

export function HeroFinder({ categories }: { categories: ProductCategory[] }) {
  const router = useRouter();
  const [term, setTerm] = useState('');
  const [category, setCategory] = useState('');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (term.trim()) params.set('q', term.trim());
    if (category) params.set('category', category);
    router.push(params.toString() ? `/products?${params}` : '/products');
  };

  return (
    <div className="rounded-sm bg-surface p-6 text-ink shadow-panel sm:p-7">
      <h2 className="text-[1.15rem]">Find a product</h2>
      <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-soft">
        Search by model or code, or start from a product family. Every product page carries its specifications and
        downloadable documents.
      </p>

      <form onSubmit={submit} className="mt-5 space-y-3" role="search">
        <div className="relative">
          <label htmlFor="hero-term" className="sr-only">
            Product name, model or code
          </label>
          <Icon.search size={18} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" />
          <input
            id="hero-term"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="e.g. SIN-EC, butterfly valve, DN 200"
            className="h-12 w-full rounded-xs border border-line-strong bg-paper pr-3 pl-11 text-[0.95rem] focus:border-accent focus:bg-surface focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="hero-category" className="sr-only">
            Product family
          </label>
          <select
            id="hero-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-12 w-full appearance-none rounded-xs border border-line-strong bg-paper px-3.5 text-[0.95rem] focus:border-accent focus:bg-surface focus:outline-none"
          >
            <option value="">All product families</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="h-12 w-full rounded-xs bg-marine font-medium text-white transition-colors hover:bg-marine-soft"
        >
          Show products
        </button>
      </form>

      <div className="mt-5 border-t border-line pt-4">
        <p className="text-[0.82rem] text-muted">Looking for documents?</p>
        <Link
          href="/resources"
          className="mt-1.5 inline-flex items-center gap-2 text-[0.9rem] text-accent-deep transition-colors hover:text-marine"
        >
          <Icon.download size={16} />
          Catalogues, datasheets, manuals and CAD files
        </Link>
      </div>
    </div>
  );
}

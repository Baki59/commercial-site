'use client';

import { useState } from 'react';
import type { CollectionItem, ProductCategory } from '@/types';
import { useCatalogueFilters } from '@/lib/hooks';
import { cn, Icon } from '@/lib/utils';

interface Props {
  categories: ProductCategory[];
  industries: CollectionItem[];
  applications: CollectionItem[];
}

function Group({
  title,
  options,
  value,
  onSelect,
}: {
  title: string;
  options: { label: string; value: string; count?: number }[];
  value: string;
  onSelect: (next: string) => void;
}) {
  return (
    <div className="border-b border-line py-5 first:pt-0 last:border-b-0">
      <h3 className="mb-3 text-[0.92rem] font-semibold">{title}</h3>
      <ul className="space-y-0.5">
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => onSelect(selected ? '' : option.value)}
                aria-pressed={selected}
                className={cn(
                  'flex w-full items-center justify-between rounded-xs px-2.5 py-1.5 text-left text-[0.88rem] transition-colors',
                  selected ? 'bg-accent-wash text-accent-deep' : 'text-ink-soft hover:bg-surface-sunk',
                )}
              >
                <span className="flex items-center gap-2">
                  {selected ? <Icon.check size={14} /> : null}
                  {option.label}
                </span>
                {option.count !== undefined ? <span className="text-2xs text-muted">{option.count}</span> : null}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function CatalogueFilters({ categories, industries, applications }: Props) {
  const { filters, apply, clear, activeCount } = useCatalogueFilters();
  const [open, setOpen] = useState(false);

  const categoryOptions = categories.flatMap((category) => [
    { label: category.name, value: category.slug, count: category.productCount },
    ...(category.children ?? []).map((child) => ({
      label: `— ${child.name}`,
      value: child.slug,
      count: child.productCount,
    })),
  ]);

  const body = (
    <div className="rounded-sm border border-line bg-surface p-5">
      <div className="mb-4 flex items-center justify-between border-b border-line pb-4">
        <h2 className="text-[0.95rem] font-semibold">Refine</h2>
        {activeCount > 0 ? (
          <button type="button" onClick={clear} className="text-[0.82rem] text-accent-deep underline underline-offset-3">
            Clear {activeCount}
          </button>
        ) : null}
      </div>

      <Group
        title="Category"
        options={categoryOptions}
        value={filters.category ?? ''}
        onSelect={(next) => apply({ category: next })}
      />
      <Group
        title="Industry"
        options={industries.map((item) => ({ label: item.name, value: item.slug }))}
        value={filters.industry ?? ''}
        onSelect={(next) => apply({ industry: next })}
      />
      <Group
        title="Application"
        options={applications.map((item) => ({ label: item.name, value: item.slug }))}
        value={filters.application ?? ''}
        onSelect={(next) => apply({ application: next })}
      />
    </div>
  );

  return (
    <>
      {/* Mobile: filters open in a drawer so the results stay in view. */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-sm border border-line-strong bg-surface px-4 py-3 text-[0.92rem]"
        >
          <span className="flex items-center gap-2">
            <Icon.filter size={18} />
            Filters
            {activeCount > 0 ? (
              <span className="rounded-xs bg-accent-wash px-1.5 py-0.5 text-2xs text-accent-deep">{activeCount}</span>
            ) : null}
          </span>
          <Icon.chevronDown size={16} className={cn('transition-transform', open && 'rotate-180')} />
        </button>
        {open ? <div className="mt-3">{body}</div> : null}
      </div>

      <div className="hidden lg:block">{body}</div>
    </>
  );
}

/** Search box shown above the catalogue results. */
export function CatalogueSearch({ placeholder = 'Search by product name, model or code' }: { placeholder?: string }) {
  const { filters, apply } = useCatalogueFilters();
  const [term, setTerm] = useState(filters.search ?? '');

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        apply({ q: term.trim() });
      }}
      className="relative"
    >
      <label htmlFor="catalogue-search" className="sr-only">
        {placeholder}
      </label>
      <Icon.search size={18} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" />
      <input
        id="catalogue-search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-sm border border-line-strong bg-surface pr-24 pl-11 text-[0.95rem] focus:border-accent focus:outline-none"
      />
      <button
        type="submit"
        className="absolute top-1.5 right-1.5 h-9 rounded-xs bg-marine px-4 text-[0.85rem] font-medium text-white transition-colors hover:bg-marine-soft"
      >
        Search
      </button>
    </form>
  );
}

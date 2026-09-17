'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { SiteSettings } from '@/types';
import { useUi } from '@/lib/hooks';
import { cn, Icon } from '@/lib/utils';

export function MobileNav({ settings }: { settings: SiteSettings }) {
  const { mobileNavOpen, setMobileNavOpen } = useUi();
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!mobileNavOpen) return null;

  return (
    <div className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-b border-line bg-surface lg:hidden">
      <div className="px-5 py-4">
        <form
          action="/search"
          role="search"
          className="relative mb-4"
          onSubmit={() => setMobileNavOpen(false)}
        >
          <label htmlFor="mobile-search" className="sr-only">
            Search products
          </label>
          <Icon.search size={17} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
          <input
            id="mobile-search"
            name="q"
            placeholder="Search model or product"
            className="h-11 w-full rounded-xs border border-line-strong bg-paper pr-3 pl-10 text-[0.92rem] focus:border-accent focus:outline-none"
          />
        </form>

        <nav aria-label="Mobile">
          <ul className="divide-y divide-line">
            {settings.navigation.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const open = expanded === item.label;
              return (
                <li key={item.label}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className="flex-1 py-3.5 text-[0.98rem] text-ink"
                    >
                      {item.label}
                    </Link>
                    {hasChildren ? (
                      <button
                        type="button"
                        onClick={() => setExpanded(open ? null : item.label)}
                        aria-label={open ? `Collapse ${item.label}` : `Expand ${item.label}`}
                        aria-expanded={open}
                        className="p-3 text-muted"
                      >
                        <Icon.chevronDown size={18} className={cn('transition-transform', open && 'rotate-180')} />
                      </button>
                    ) : null}
                  </div>
                  {hasChildren && open ? (
                    <ul className="mb-3 ml-3 border-l border-line pl-4">
                      {item.children?.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setMobileNavOpen(false)}
                            className="block py-2.5 text-[0.92rem] text-ink-soft"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-5 flex flex-col gap-2">
          <Link
            href="/contact"
            onClick={() => setMobileNavOpen(false)}
            className="rounded-xs bg-marine px-4 py-3 text-center text-[0.92rem] font-medium text-white"
          >
            Request a quotation
          </Link>
          <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="py-2 text-center text-[0.88rem] text-ink-soft">
            {settings.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

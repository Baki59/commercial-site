'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import type { SiteSettings } from '@/types';
import { Container } from '@/components/ui';
import { Logo } from '@/components/common/Logo';
import { useUi } from '@/lib/hooks';
import { cn, Icon } from '@/lib/utils';
import { HeaderSearch } from './HeaderSearch';
import { MobileNav } from './MobileNav';

export function Header({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const { openMenu, setOpenMenu, closeAll, mobileNavOpen, toggleMobileNav } = useUi();
  const navRef = useRef<HTMLDivElement>(null);

  // Route change closes every overlay.
  useEffect(() => closeAll(), [pathname, closeAll]);

  // Escape closes the open dropdown; a click outside the nav does the same.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenu(null);
    };
    const onClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [setOpenMenu]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar — the details a buyer needs before anything else. */}
      <div className="hidden bg-marine-deep text-white/70 lg:block">
        <Container>
          <div className="flex h-10 items-center justify-between text-[0.8rem]">
            <p className="text-white/55">{settings.tagline}</p>
            <div className="flex items-center gap-6">
              <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
                <Icon.phone size={14} />
                {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
                <Icon.mail size={14} />
                {settings.email}
              </a>
              <Link href="/resources" className="flex items-center gap-1.5 transition-colors hover:text-white">
                <Icon.download size={14} />
                Downloads
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <div className="border-b border-line bg-surface/95 backdrop-blur-sm">
        <Container>
          <div ref={navRef} className="flex h-[4.5rem] items-center justify-between gap-6">
            <Logo />

            <nav aria-label="Main" className="hidden h-full items-stretch lg:flex">
              {settings.navigation.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const open = openMenu === item.label;
                return (
                  <div key={item.label} className="relative flex items-stretch">
                    <Link
                      href={item.href}
                      onMouseEnter={() => setOpenMenu(hasChildren ? item.label : null)}
                      onFocus={() => setOpenMenu(hasChildren ? item.label : null)}
                      aria-expanded={hasChildren ? open : undefined}
                      className={cn(
                        'flex items-center gap-1 border-b-2 px-4 text-[0.92rem] transition-colors',
                        isActive(item.href)
                          ? 'border-accent text-marine'
                          : 'border-transparent text-ink-soft hover:text-marine',
                      )}
                    >
                      {item.label}
                      {hasChildren ? (
                        <Icon.chevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
                      ) : null}
                    </Link>

                    {hasChildren && open ? (
                      <div
                        onMouseLeave={() => setOpenMenu(null)}
                        className={cn(
                          'absolute top-full left-0 rounded-b-sm border border-t-0 border-line bg-surface shadow-panel',
                          item.mega ? 'w-[34rem] p-3' : 'w-64 p-2',
                        )}
                      >
                        <div className={cn(item.mega && 'grid grid-cols-2 gap-1')}>
                          {item.children?.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block rounded-xs px-3 py-2.5 transition-colors hover:bg-accent-wash"
                            >
                              <span className="block text-[0.92rem] text-ink">{child.label}</span>
                              {child.description ? (
                                <span className="mt-0.5 block text-[0.8rem] leading-snug text-muted">
                                  {child.description}
                                </span>
                              ) : null}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-2.5">
              <div className="hidden xl:block">
                <HeaderSearch />
              </div>
              <Link
                href="/contact"
                className="hidden h-10 shrink-0 items-center rounded-xs bg-marine px-4 text-[0.88rem] font-medium whitespace-nowrap text-white transition-colors hover:bg-marine-soft sm:inline-flex"
              >
                Request a quotation
              </Link>
              <button
                type="button"
                onClick={toggleMobileNav}
                aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileNavOpen}
                className="rounded-xs border border-line-strong p-2.5 text-ink transition-colors hover:border-accent lg:hidden"
              >
                {mobileNavOpen ? <Icon.close size={20} /> : <Icon.menu size={20} />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      <MobileNav settings={settings} />
    </header>
  );
}

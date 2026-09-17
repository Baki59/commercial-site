import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Tag({
  children,
  href,
  tone = 'default',
  className,
}: {
  children: ReactNode;
  href?: string;
  tone?: 'default' | 'accent' | 'signal' | 'dark';
  className?: string;
}) {
  const tones = {
    default: 'border-line-strong bg-surface text-ink-soft',
    accent: 'border-transparent bg-accent-wash text-accent-deep',
    signal: 'border-transparent bg-signal/12 text-signal',
    dark: 'border-white/20 bg-white/8 text-white/80',
  } as const;

  const classes = cn(
    'inline-flex items-center rounded-xs border px-2.5 py-1 text-[0.78rem] leading-tight',
    tones[tone],
    href && 'transition-colors hover:border-accent hover:text-accent-deep',
    className,
  );

  return href ? (
    <Link href={href} className={classes}>
      {children}
    </Link>
  ) : (
    <span className={classes}>{children}</span>
  );
}

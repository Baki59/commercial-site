import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Wordmark. The mark is a valve aperture seen end-on: an outer body, an inner
 * bore and a disc across it — the shape a buyer in this trade reads instantly.
 */
export function Logo({ invert = false, className }: { invert?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn('inline-flex items-center gap-2.5', className)} aria-label="Sazin Innovative Industries — home">
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true" className="shrink-0">
        <circle cx="17" cy="17" r="15.2" fill="none" stroke={invert ? '#ffffff' : '#0f3c4c'} strokeWidth="1.8" />
        <circle cx="17" cy="17" r="9.4" fill="none" stroke={invert ? 'rgba(255,255,255,.5)' : '#1b7f9e'} strokeWidth="1.5" />
        <path d="M17 7.6v18.8" stroke={invert ? '#ffffff' : '#0f3c4c'} strokeWidth="1.8" strokeLinecap="round" />
        <ellipse cx="17" cy="17" rx="3.4" ry="9.4" fill="none" stroke={invert ? '#ffffff' : '#0f3c4c'} strokeWidth="1.8" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-[family-name:var(--font-display)] text-[1.16rem] font-bold tracking-[0.13em]',
            invert ? 'text-white' : 'text-marine',
          )}
        >
          SAZIN
        </span>
        <span className={cn('mt-1 text-2xs tracking-[0.055em]', invert ? 'text-white/55' : 'text-muted')}>
          Innovative Industries
        </span>
      </span>
    </Link>
  );
}

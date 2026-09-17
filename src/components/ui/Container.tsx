import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Container({
  children,
  className,
  width = 'default',
}: {
  children: ReactNode;
  className?: string;
  width?: 'default' | 'narrow' | 'wide';
}) {
  const widths = {
    narrow: 'max-w-4xl',
    default: 'max-w-[82rem]',
    wide: 'max-w-[92rem]',
  } as const;
  return <div className={cn('mx-auto w-full px-5 sm:px-8', widths[width], className)}>{children}</div>;
}

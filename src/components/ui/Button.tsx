import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xs font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-55';

const variants: Record<Variant, string> = {
  primary: 'bg-marine text-white hover:bg-marine-soft',
  secondary: 'border border-line-strong bg-surface text-ink hover:border-accent hover:text-accent-deep',
  ghost: 'text-accent-deep hover:text-marine underline underline-offset-4 decoration-line-strong hover:decoration-accent',
  onDark: 'bg-white/10 text-white ring-1 ring-inset ring-white/25 hover:bg-white/18',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[0.85rem]',
  md: 'h-11 px-5 text-[0.92rem]',
  lg: 'h-[3.25rem] px-7 text-[0.98rem]',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & { href: string; target?: string; rel?: string; download?: boolean }) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (href.startsWith('http') || href.startsWith('#') || rest.download) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

export function Section({
  children,
  className,
  tone = 'paper',
  spacing = 'default',
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: 'paper' | 'surface' | 'sunk' | 'marine';
  spacing?: 'default' | 'tight' | 'loose';
  id?: string;
}) {
  const tones = {
    paper: 'bg-paper text-ink',
    surface: 'bg-surface text-ink',
    sunk: 'bg-surface-sunk text-ink',
    marine: 'bg-marine-deep text-white',
  } as const;
  const spacings = {
    tight: 'py-10 sm:py-14',
    default: 'py-14 sm:py-20',
    loose: 'py-20 sm:py-28',
  } as const;

  return (
    <section id={id} className={cn(tones[tone], spacings[spacing], className)}>
      <Container>{children}</Container>
    </section>
  );
}

/** Section heading with an optional description and a trailing link slot. */
export function SectionHead({
  title,
  description,
  action,
  invert = false,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('mb-9 flex flex-col gap-4 sm:mb-11 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="max-w-2xl">
        <h2 className={cn('text-[1.7rem] sm:text-[2.1rem]', invert && 'text-white')}>{title}</h2>
        {description ? (
          <p className={cn('mt-3 text-[0.98rem] leading-relaxed', invert ? 'text-white/70' : 'text-ink-soft')}>
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

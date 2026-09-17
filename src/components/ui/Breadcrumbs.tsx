import Link from 'next/link';
import { Container } from './Container';

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, invert = false }: { items: Crumb[]; invert?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={invert ? 'text-white/60' : 'text-muted'}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.82rem]">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-accent">
                {item.label}
              </Link>
            ) : (
              <span className={invert ? 'text-white' : 'text-ink'}>{item.label}</span>
            )}
            {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Standard page banner used by every inner page. */
export function PageHeader({
  title,
  description,
  crumbs,
  aside,
}: {
  title: string;
  description?: string;
  crumbs: Crumb[];
  aside?: React.ReactNode;
}) {
  return (
    <div className="border-b border-line bg-surface">
      <Container className="py-8 sm:py-11">
        <Breadcrumbs items={crumbs} />
        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-[2rem] sm:text-[2.6rem]">{title}</h1>
            {description ? <p className="mt-4 max-w-2xl text-ink-soft">{description}</p> : null}
          </div>
          {aside ? <div className="shrink-0">{aside}</div> : null}
        </div>
      </Container>
    </div>
  );
}

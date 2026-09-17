import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Pagination({
  page,
  count,
  pageSize,
  basePath,
  params = {},
}: {
  page: number;
  count: number;
  pageSize: number;
  basePath: string;
  params?: Record<string, string | undefined>;
}) {
  const pages = Math.ceil(count / pageSize);
  if (pages <= 1) return null;

  const href = (target: number) => {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) if (value) search.set(key, value);
    if (target > 1) search.set('page', String(target));
    const qs = search.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const numbers = Array.from({ length: pages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === pages || Math.abs(n - page) <= 1,
  );

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-between border-t border-line pt-6">
      <p className="text-[0.85rem] text-muted">
        Page {page} of {pages} · {count} items
      </p>
      <div className="flex items-center gap-1.5">
        {page > 1 ? (
          <Link
            href={href(page - 1)}
            className="rounded-xs border border-line-strong px-3 py-1.5 text-[0.85rem] transition-colors hover:border-accent hover:text-accent-deep"
          >
            Previous
          </Link>
        ) : null}
        {numbers.map((n, index) => (
          <span key={n} className="flex items-center gap-1.5">
            {index > 0 && n - numbers[index - 1] > 1 ? <span className="px-1 text-muted">…</span> : null}
            <Link
              href={href(n)}
              aria-current={n === page ? 'page' : undefined}
              className={cn(
                'min-w-9 rounded-xs border px-2.5 py-1.5 text-center text-[0.85rem] transition-colors',
                n === page
                  ? 'border-marine bg-marine text-white'
                  : 'border-line-strong hover:border-accent hover:text-accent-deep',
              )}
            >
              {n}
            </Link>
          </span>
        ))}
        {page < pages ? (
          <Link
            href={href(page + 1)}
            className="rounded-xs border border-line-strong px-3 py-1.5 text-[0.85rem] transition-colors hover:border-accent hover:text-accent-deep"
          >
            Next
          </Link>
        ) : null}
      </div>
    </nav>
  );
}

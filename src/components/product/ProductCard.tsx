import Image from 'next/image';
import Link from 'next/link';
import type { ProductSummary } from '@/types';
import { cn } from '@/lib/utils';

export function ProductCard({ product, compact = false }: { product: ProductSummary; compact?: boolean }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface transition-colors hover:border-accent"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-surface-sunk">
        {product.image ? (
          <Image
            src={product.image.url}
            alt={product.image.alt ?? product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        ) : null}
        {product.model ? (
          <span className="absolute top-3 left-3 rounded-xs bg-surface/92 px-2 py-1 font-[family-name:var(--font-mono)] text-2xs text-marine">
            {product.model}
          </span>
        ) : null}
      </div>

      <div className={cn('flex flex-1 flex-col p-4', compact ? 'gap-2' : 'gap-3 sm:p-5')}>
        {product.category ? (
          <span className="text-2xs text-muted">{product.category.name}</span>
        ) : null}
        <h3 className="text-[1.02rem] leading-snug transition-colors group-hover:text-accent-deep">{product.name}</h3>
        {!compact && product.summary ? (
          <p className="line-clamp-2 text-[0.88rem] leading-relaxed text-ink-soft">{product.summary}</p>
        ) : null}

        {product.highlights?.length ? (
          <dl className="mt-auto space-y-1 border-t border-line pt-3">
            {product.highlights.slice(0, 3).map((item) => (
              <div key={item} className="text-[0.82rem] text-ink-soft">
                {item}
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </Link>
  );
}

export function ProductGrid({ products, compact }: { products: ProductSummary[]; compact?: boolean }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} compact={compact} />
      ))}
    </div>
  );
}

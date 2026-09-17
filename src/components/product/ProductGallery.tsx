'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { MediaAsset } from '@/types';
import { cn } from '@/lib/utils';

export function ProductGallery({ images, name }: { images: MediaAsset[]; name: string }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div>
      <div className="relative aspect-4/3 overflow-hidden rounded-sm border border-line bg-surface-sunk">
        {current ? (
          <Image
            src={current.url}
            alt={current.alt ?? name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="mt-3 flex gap-2.5">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1} of ${images.length}`}
              aria-current={index === active}
              className={cn(
                'relative h-18 w-22 overflow-hidden rounded-xs border transition-colors',
                index === active ? 'border-accent' : 'border-line hover:border-line-strong',
              )}
            >
              <Image src={image.url} alt="" fill sizes="88px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

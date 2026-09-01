'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const hasImages = images && images.length > 0;
  const main = hasImages ? images[active] : null;

  const next = () => setActive((i) => (i + 1) % images.length);
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-crema-200/60 sm:aspect-[16/10]">
        {main ? (
          <Image
            src={main}
            alt={`${title} — foto ${active + 1}`}
            fill
            priority
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-noche/40">
            Sin imágenes disponibles
          </div>
        )}

        {hasImages && images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-noche/60 text-white backdrop-blur-sm transition-colors hover:bg-noche/80"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Foto siguiente"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-noche/60 text-white backdrop-blur-sm transition-colors hover:bg-noche/80"
            >
              <ChevronRight size={20} />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-noche/70 px-3 py-1 text-xs font-medium text-white">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {hasImages && images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg transition-all ${
                i === active
                  ? 'ring-2 ring-verde ring-offset-2 ring-offset-crema'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={img} alt="" fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

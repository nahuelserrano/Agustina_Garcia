import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, Bath, CarFront, MapPin } from 'lucide-react';
import type { PublicPropertyDto } from '@/types/property';
import { formatPrice, operationLabel, formatLocation } from '@/lib/format';

export default function PropertyCard({ property }: { property: PublicPropertyDto }) {
  const cover = property.images?.[0];
  const location = formatLocation(property.location ?? { city: '' });
  const hasGarage =
    (property.features?.garage ?? 0) > 0 || property.features?.garage === 1;

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-arena bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-crema-200/60">
        {cover ? (
          <Image
            src={cover}
            alt={property.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-verde/50">
            <MapPin size={44} strokeWidth={1.4} aria-hidden />
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-lg bg-verde px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-widecaps text-white">
          {operationLabel(property.operation)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-sans text-xl leading-snug text-noche transition-colors group-hover:text-verde">
          {property.title}
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-noche/60">
          <MapPin size={15} className="shrink-0 text-verde" aria-hidden />
          <span className="truncate">
            {location.primary}
            {location.secondary ? `, ${location.secondary}` : ''}
          </span>
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          {typeof property.features?.bedrooms === 'number' && property.features.bedrooms > 0 && (
            <span className="flex items-center gap-1.5 text-sm text-noche/80">
              <BedDouble size={17} className="text-verde" aria-hidden />
              {property.features.bedrooms}
            </span>
          )}
          {typeof property.features?.bathrooms === 'number' && property.features.bathrooms > 0 && (
            <span className="flex items-center gap-1.5 text-sm text-noche/80">
              <Bath size={17} className="text-verde" aria-hidden />
              {property.features.bathrooms}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-sm text-noche/80">
            <CarFront size={17} className="text-verde" aria-hidden />
            {hasGarage ? 'Con cochera' : 'Sin cochera'}
          </span>
        </div>

        {property.price?.hidden === false && (
          <div className="mt-4 border-t border-arena pt-4">
            <p className="font-sans text-xl font-semibold text-noche">
              {formatPrice(property.price)}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

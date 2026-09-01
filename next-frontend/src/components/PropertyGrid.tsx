import Link from 'next/link';
import { SearchX } from 'lucide-react';
import type { PublicPropertyDto, PaginatedPropertiesResponse } from '@/types/property';
import PropertyCard from '@/components/PropertyCard';

interface PropertyGridProps {
  properties: PublicPropertyDto[];
  pagination?: PaginatedPropertiesResponse['pagination'];
  basePath?: string;
  preserveParams?: URLSearchParams;
  cols?: 3 | 4;
  emptyMessage?: string;
}

export default function PropertyGrid({
  properties,
  pagination,
  basePath = '/properties',
  preserveParams,
  cols = 3,
  emptyMessage = 'No encontramos propiedades con esos criterios. Ajustá los filtros y probá de nuevo.',
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-arena bg-crema-50 px-6 py-20 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-verde/10 text-verde">
          <SearchX size={27} strokeWidth={1.6} aria-hidden />
        </span>
        <p className="mt-5 max-w-sm font-sans text-sm leading-relaxed text-noche/70">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`grid grid-cols-1 gap-6 ${
          cols === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <Pagination pagination={pagination} basePath={basePath} preserveParams={preserveParams} />
      )}
    </div>
  );
}

function Pagination({
  pagination,
  basePath,
  preserveParams,
}: {
  pagination: PaginatedPropertiesResponse['pagination'];
  basePath: string;
  preserveParams?: URLSearchParams;
}) {
  const { page, totalPages, total } = pagination;

  const pageHref = (target: number) => {
    const params = preserveParams ? new URLSearchParams(preserveParams) : new URLSearchParams();
    params.set('page', String(target));
    return `${basePath}?${params.toString()}`;
  };

  return (
    <nav
      aria-label="Paginación"
      className="mt-12 flex flex-col items-center justify-between gap-4 sm:flex-row"
    >
      <p className="text-sm text-noche/60">
        Página <strong className="font-semibold text-noche">{page}</strong> de {totalPages} ·{' '}
        {total} propiedades
      </p>

      <div className="flex items-center gap-2">
        <Link
          href={pageHref(page - 1)}
          aria-disabled={page <= 1}
          className={`btn border border-arena bg-crema-50 px-4 py-2 text-noche ${
            page <= 1
              ? 'pointer-events-none opacity-40'
              : 'hover:border-verde hover:text-verde'
          }`}
        >
          Anterior
        </Link>
        <Link
          href={pageHref(page + 1)}
          aria-disabled={page >= totalPages}
          className={`btn border border-arena bg-crema-50 px-4 py-2 text-noche ${
            page >= totalPages
              ? 'pointer-events-none opacity-40'
              : 'hover:border-verde hover:text-verde'
          }`}
        >
          Siguiente
        </Link>
      </div>
    </nav>
  );
}

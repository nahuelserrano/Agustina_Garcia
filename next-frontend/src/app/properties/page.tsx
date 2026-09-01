import type { Metadata } from 'next';
import { Suspense } from 'react';
import FilterBar from '@/components/FilterBar';
import PropertyGrid from '@/components/PropertyGrid';
import { fetchProperties } from '@/lib/api/properties';
import { parsePropertyQuery, buildPropertySearchParams } from '@/lib/validations/property';

export const metadata: Metadata = {
  title: 'Propiedades disponibles',
};

const PAGE_SIZE = 12;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { parsed } = parsePropertyQuery(searchParams);
  const data = await fetchProperties({ ...parsed, pageSize: PAGE_SIZE });
  const preserveParams = buildPropertySearchParams({ ...parsed, page: parsed.page });

  return (
    <div className="px-5 pb-24 pt-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="eyebrow">Listado completo</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            Propiedades en Tandil
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-noche/70">
            {data.pagination.total} propiedad{data.pagination.total === 1 ? '' : 'es'}
            {data.pagination.total !== 1 ? 's disponibles' : ' disponible'} en los
            cerros de Tandil, Buenos Aires.
          </p>
        </header>

        <div className="mb-10">
          <Suspense fallback={<div className="h-56 rounded-2xl bg-cream-200/50" />}>
            <FilterBar variant="full" />
          </Suspense>
        </div>

        <PropertyGrid
          properties={data.items}
          pagination={data.pagination}
          preserveParams={preserveParams}
        />
      </div>
    </div>
  );
}

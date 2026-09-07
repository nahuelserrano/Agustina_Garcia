import type { Metadata } from 'next';
import { Suspense } from 'react';
import FilterBar from '@/components/FilterBar';
import PropertyGrid from '@/components/PropertyGrid';
import { fetchProperties, fetchPropertyTypes } from '@/lib/api/properties';
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
  const propertyTypes = await fetchPropertyTypes().catch(() => []);
  const preserveParams = buildPropertySearchParams({ ...parsed, page: parsed.page });

  return (
    <div className="px-5 pb-24 pt-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="eyebrow">Listado completo</p>
          <h1 className="mt-3 font-sans text-4xl leading-tight sm:text-5xl">
            Propiedades en Tandil
          </h1>
        </header>

        <div className="mb-10">
          <Suspense fallback={<div className="h-56 rounded-2xl bg-cream-200/50" />}>
            <FilterBar variant="full" propertyTypes={propertyTypes} />
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

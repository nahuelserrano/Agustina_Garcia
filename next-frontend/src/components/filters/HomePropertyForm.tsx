'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { buildPropertySearchParams } from '@/lib/validations/property';
import { propertyTypeLabel } from '@/lib/format';
import {
  DEFAULT_FILTER_VALUES,
  filterSchema,
  toPropertyQuery,
  type FilterValues,
} from '@/components/filters/filter-query';
import { selectClass } from '@/components/filters/filter-styles';

export default function HomePropertyForm({ propertyTypes }: { propertyTypes: string[] }) {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: DEFAULT_FILTER_VALUES,
  });

  const onSubmit = (values: FilterValues) => {
    const params = buildPropertySearchParams(toPropertyQuery(values));
    const queryString = params.size > 0 ? `?${params.toString()}` : '';
    router.push(`/propiedades${queryString}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-4xl rounded-2xl border border-arena bg-white p-5 shadow-card sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end">
        <div>
          <label htmlFor="f-operacion" className="field-label">Operación</label>
          <select id="f-operacion" className={selectClass} {...register('operacion')}>
            <option value="">Todas</option>
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
          </select>
        </div>

        <div>
          <label htmlFor="f-tipo" className="field-label">Tipo de propiedad</label>
          <select id="f-tipo" className={selectClass} {...register('tipo')}>
            <option value="">Todos</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>{propertyTypeLabel(type)}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="f-maxValue" className="field-label">Precio máximo</label>
          <input
            id="f-maxValue"
            type="number"
            min="0"
            placeholder="Sin límite"
            className={selectClass}
            {...register('maxValue')}
          />
        </div>

        <button type="submit" className="btn btn-primary gap-2 px-6 py-2.5 sm:shrink-0">
          <Search size={17} />
          Buscar
        </button>
      </div>
    </form>
  );
}

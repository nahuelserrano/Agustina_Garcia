'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowRightLeft,
  Bath,
  BedDouble,
  Building2,
  Car,
  Check,
  DollarSign,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Wallet,
} from 'lucide-react';
import { buildPropertySearchParams } from '@/lib/validations/property';
import { propertyTypeLabel } from '@/lib/format';
import {
  DEFAULT_FILTER_VALUES,
  filterSchema,
  toPropertyQuery,
  type FilterValues,
} from '@/components/filters/filter-query';
import { BATHROOM_OPTIONS, BEDROOM_OPTIONS } from '@/components/filters/filter-options';
import SegmentedField from '@/components/filters/SegmentedField';
import { filterLabelClass, LabelIcon, selectClass } from '@/components/filters/filter-styles';

export default function PropertyFiltersForm({ propertyTypes }: { propertyTypes: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: DEFAULT_FILTER_VALUES,
  });

  useEffect(() => {
    const initial: FilterValues = { ...DEFAULT_FILTER_VALUES };
    for (const key of Object.keys(DEFAULT_FILTER_VALUES) as (keyof FilterValues)[]) {
      const value = searchParams.get(key);
      if (value) initial[key] = value;
    }
    reset(initial);
  }, [reset, searchParams]);

  const onSubmit = (values: FilterValues) => {
    const params = buildPropertySearchParams(toPropertyQuery(values));
    const queryString = params.size > 0 ? `?${params.toString()}` : '';
    router.push(`/propiedades${queryString}`);
  };

  const clearAll = () => {
    reset(DEFAULT_FILTER_VALUES);
    router.push('/propiedades');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-arena bg-white p-5 shadow-card sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-sans text-sm font-semibold text-noche/80">
          <SlidersHorizontal size={16} className="text-verde" />
          Filtrar resultados
        </h2>
        <button type="button" onClick={clearAll} className="flex items-center gap-1.5 text-xs font-medium text-noche/50 transition-colors hover:text-verde">
          <RotateCcw size={13} />
          Limpiar
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-4">
        <div className="col-span-2">
          <label htmlFor="f-operacion" className={filterLabelClass}>
            <LabelIcon icon={<ArrowRightLeft size={15} />} />
            Operación
          </label>
          <select id="f-operacion" className={selectClass} {...register('operacion')}>
            <option value="">Todas</option>
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
          </select>
        </div>

        <div className="col-span-2">
          <label htmlFor="f-tipo" className={filterLabelClass}>
            <LabelIcon icon={<Building2 size={15} />} />
            Tipo de propiedad
          </label>
          <select id="f-tipo" className={selectClass} {...register('tipo')}>
            <option value="">Todos</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>{propertyTypeLabel(type)}</option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <SegmentedField label="Dormitorios" icon={<BedDouble size={15} />} options={BEDROOM_OPTIONS} reg={register('bedrooms')} value={watch('bedrooms')} />
        </div>
        <div className="col-span-1">
          <SegmentedField label="Baños" icon={<Bath size={15} />} options={BATHROOM_OPTIONS} reg={register('bathrooms')} value={watch('bathrooms')} />
        </div>

        <div className="col-span-1">
          <span className={filterLabelClass}><LabelIcon icon={<Car size={15} />} />Cochera</span>
          <label className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-2.5 font-sans text-sm font-medium transition-colors ${watch('garage') === 'true' ? 'border-verde bg-verde text-white' : 'border-arena bg-white text-noche hover:border-verde/50'}`}>
            <input type="checkbox" className="sr-only" checked={watch('garage') === 'true'} onChange={(event) => setValue('garage', event.target.checked ? 'true' : '')} />
            <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${watch('garage') === 'true' ? 'border-white/60 bg-white/20' : 'border-noche/30 bg-white'}`}>
              {watch('garage') === 'true' && <Check size={12} strokeWidth={3} />}
            </span>
            Con cochera
          </label>
        </div>

        <div className="col-span-2 grid gap-x-4 gap-y-4 sm:grid-cols-[auto_1fr] sm:items-end lg:col-span-4">
          <div>
            <span className={filterLabelClass}><LabelIcon icon={<DollarSign size={15} />} />Moneda</span>
            <div className="flex rounded-lg border border-arena bg-white p-0.5">
              {(['USD', 'ARS'] as const).map((currency) => (
                <button key={currency} type="button" onClick={() => setValue('currency', watch('currency') === currency ? '' : currency)} className={`min-w-28 flex-1 rounded-md px-6 py-2 font-sans text-sm font-medium transition-colors ${watch('currency') === currency ? 'bg-verde text-white' : 'text-noche/60 hover:text-noche'}`}>
                  {currency}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className={filterLabelClass}><LabelIcon icon={<Wallet size={15} />} />Precio</span>
            <div className="flex items-center gap-2">
              <input id="f-minValue" type="number" min="0" placeholder="Mínimo" className={selectClass} {...register('minValue')} />
              <span className="shrink-0 text-noche/40">—</span>
              <input id="f-maxValue" type="number" min="0" placeholder="Máximo" className={selectClass} {...register('maxValue')} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button type="submit" className="btn btn-primary gap-2 px-6 py-2.5" disabled={isSubmitting}>
          <Search size={17} />
          Ver resultados
        </button>
      </div>
    </form>
  );
}

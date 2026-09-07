'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Search,
  RotateCcw,
  SlidersHorizontal,
  ArrowRightLeft,
  Building2,
  BedDouble,
  Bath,
  Car,
  Wallet,
  Check,
  DollarSign,
} from 'lucide-react';
import { buildPropertySearchParams } from '@/lib/validations/property';
import type { PropertyQuery } from '@/lib/validations/property';
import { propertyTypeLabel } from '@/lib/format';

const filterSchema = z.object({
  operacion: z.string().optional(),
  tipo: z.string().optional(),
  minValue: z.string().optional(),
  maxValue: z.string().optional(),
  currency: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  garage: z.string().optional(),
});

type FilterValues = z.infer<typeof filterSchema>;

const DEFAULT_VALUES: FilterValues = {
  operacion: '',
  tipo: '',
  minValue: '',
  maxValue: '',
  currency: '',
  bedrooms: '',
  bathrooms: '',
  garage: '',
};

const selectClass =
  'w-full rounded-lg border border-arena bg-white px-3.5 py-2.5 text-sm text-noche transition-colors focus:border-verde focus:outline-none focus:ring-2 focus:ring-verde/25';

const filterLabelClass =
  'mb-1.5 flex items-center gap-1.5 font-sans text-[0.8rem] font-medium text-noche/80';

function LabelIcon({ icon }: { icon: ReactNode }) {
  return <span className="flex shrink-0 text-verde">{icon}</span>;
}

const BEDROOM_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3plus', label: '3+' },
];

const BATHROOM_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3plus', label: '3+' },
];

function SegmentedField({
  label,
  icon,
  options,
  reg,
  value,
}: {
  label: string;
  icon: ReactNode;
  options: { value: string; label: string }[];
  reg: UseFormRegisterReturn;
  value: string | undefined;
}) {
  return (
    <div>
      <span className={filterLabelClass}>
        <LabelIcon icon={icon} />
        {label}
      </span>
      <div className="flex gap-1.5">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <label
              key={opt.value}
              className={`flex-1 cursor-pointer rounded-lg border py-2.5 text-center font-sans text-sm font-medium transition-colors ${
                active
                  ? 'border-verde bg-verde text-white'
                  : 'border-arena bg-white text-noche hover:border-verde/50'
              }`}
            >
              <input type="radio" className="sr-only" value={opt.value} {...reg} />
              {opt.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function toQuery(values: FilterValues): PropertyQuery {
  return {
    page: 1,
    pageSize: 12,
    operacion: values.operacion || undefined,
    tipo: values.tipo || undefined,
    minValue: values.minValue ? Number(values.minValue) : undefined,
    maxValue: values.maxValue ? Number(values.maxValue) : undefined,
    currency: (values.currency || undefined) as PropertyQuery['currency'],
    bedrooms: (values.bedrooms || undefined) as PropertyQuery['bedrooms'],
    bathrooms: (values.bathrooms || undefined) as PropertyQuery['bathrooms'],
    garage: (values.garage || undefined) as PropertyQuery['garage'],
  };
}

interface FilterBarProps {
  variant?: 'home' | 'full';
  propertyTypes: string[];
}

export default function FilterBar({ variant = 'full', propertyTypes }: FilterBarProps) {
  if (variant === 'home') {
    return <HomeForm propertyTypes={propertyTypes} />;
  }
  return <FullForm propertyTypes={propertyTypes} />;
}

/* ------------------------------------------------------------------ Home (fila)
   No lee la URL: es el punto de entrada desde el inicio. Se renderiza en el
   servidor (sin destello) y empuja la búsqueda a /propiedades. */
function HomeForm({ propertyTypes }: { propertyTypes: string[] }) {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = (values: FilterValues) => {
    const params = buildPropertySearchParams(toQuery(values));
    const qs = params.size > 0 ? `?${params.toString()}` : '';
    router.push(`/propiedades${qs}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-4xl rounded-2xl border border-arena bg-white p-5 shadow-card sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end">
        <div>
          <label htmlFor="f-operacion" className="field-label">
            Operación
          </label>
          <select id="f-operacion" className={selectClass} {...register('operacion')}>
            <option value="">Todas</option>
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
          </select>
        </div>

        <div>
          <label htmlFor="f-tipo" className="field-label">
            Tipo de propiedad
          </label>
          <select id="f-tipo" className={selectClass} {...register('tipo')}>
            <option value="">Todos</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {propertyTypeLabel(type)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="f-maxValue" className="field-label">
            Precio máximo
          </label>
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

/* -------------------------------------------------------------- Full (filtros)
   Lee la URL para mantener el estado inicial y empuja cambios a la barra de
   direcciones (URL-first). Requiere estar dentro de <Suspense> en la vista. */
function FullForm({ propertyTypes }: { propertyTypes: string[] }) {
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
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    const initial: FilterValues = { ...DEFAULT_VALUES };
    for (const key of Object.keys(DEFAULT_VALUES) as (keyof FilterValues)[]) {
      const value = searchParams.get(key);
      if (value) initial[key] = value as string;
    }
    reset(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values: FilterValues) => {
    const params = buildPropertySearchParams(toQuery(values));
    const qs = params.size > 0 ? `?${params.toString()}` : '';
    router.push(`/propiedades${qs}`);
  };

  const clearAll = () => {
    reset(DEFAULT_VALUES);
    router.push('/propiedades');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-arena bg-white p-5 shadow-card sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-sans text-sm font-semibold text-noche/80">
          <SlidersHorizontal size={16} className="text-verde" />
          Filtrar resultados
        </h2>
        <button
          type="button"
          onClick={clearAll}
          className="flex items-center gap-1.5 text-xs font-medium text-noche/50 transition-colors hover:text-verde"
        >
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
              <option key={type} value={type}>
                {propertyTypeLabel(type)}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <SegmentedField
            label="Dormitorios"
            icon={<BedDouble size={15} />}
            options={BEDROOM_OPTIONS}
            reg={register('bedrooms')}
            value={watch('bedrooms')}
          />
        </div>

        <div className="col-span-1">
          <SegmentedField
            label="Baños"
            icon={<Bath size={15} />}
            options={BATHROOM_OPTIONS}
            reg={register('bathrooms')}
            value={watch('bathrooms')}
          />
        </div>

        <div className="col-span-1">
          <span className={filterLabelClass}>
            <LabelIcon icon={<Car size={15} />} />
            Cochera
          </span>
          <label
            className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-2.5 font-sans text-sm font-medium transition-colors ${
              watch('garage') === 'true'
                ? 'border-verde bg-verde text-white'
                : 'border-arena bg-white text-noche hover:border-verde/50'
            }`}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={watch('garage') === 'true'}
              onChange={(e) => setValue('garage', e.target.checked ? 'true' : '')}
            />
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                watch('garage') === 'true'
                  ? 'border-white/60 bg-white/20'
                  : 'border-noche/30 bg-white'
              }`}
            >
              {watch('garage') === 'true' && <Check size={12} strokeWidth={3} />}
            </span>
            Con cochera
          </label>
        </div>

        <div className="col-span-2 grid gap-x-4 gap-y-4 sm:grid-cols-[auto_1fr] sm:items-end lg:col-span-4">
          <div>
            <span className={filterLabelClass}>
              <LabelIcon icon={<DollarSign size={15} />} />
              Moneda
            </span>
            <div className="flex rounded-lg border border-arena bg-white p-0.5">
              {(['USD', 'ARS'] as const).map((cur) => (
                <button
                  key={cur}
                  type="button"
                  onClick={() => setValue('currency', watch('currency') === cur ? '' : cur)}
                  className={`min-w-28 flex-1 rounded-md px-6 py-2 font-sans text-sm font-medium transition-colors ${
                    watch('currency') === cur
                      ? 'bg-verde text-white'
                      : 'text-noche/60 hover:text-noche'
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className={filterLabelClass}>
              <LabelIcon icon={<Wallet size={15} />} />
              Precio
            </span>
            <div className="flex items-center gap-2">
              <input
                id="f-minValue"
                type="number"
                min="0"
                placeholder="Mínimo"
                className={selectClass}
                {...register('minValue')}
              />
              <span className="shrink-0 text-noche/40">—</span>
              <input
                id="f-maxValue"
                type="number"
                min="0"
                placeholder="Máximo"
                className={selectClass}
                {...register('maxValue')}
              />
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

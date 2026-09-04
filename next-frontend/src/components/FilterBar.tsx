'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { buildPropertySearchParams } from '@/lib/validations/property';
import type { PropertyQuery } from '@/lib/validations/property';

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

const TIPOS = [
  { value: 'casa', label: 'Casa' },
  { value: 'departamento', label: 'Departamento' },
  { value: 'cochera', label: 'Cochera' },
  { value: 'local', label: 'Local' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'cabaña', label: 'Cabaña' },
];

const selectClass =
  'w-full rounded-lg border border-arena bg-white px-3.5 py-2.5 text-sm text-noche transition-colors focus:border-verde focus:outline-none focus:ring-2 focus:ring-verde/25';

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
}

export default function FilterBar({ variant = 'full' }: FilterBarProps) {
  if (variant === 'home') {
    return <HomeForm />;
  }
  return <FullForm />;
}

/* ------------------------------------------------------------------ Home (fila)
   No lee la URL: es el punto de entrada desde el inicio. Se renderiza en el
   servidor (sin destello) y empuja la búsqueda a /properties. */
function HomeForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = (values: FilterValues) => {
    const params = buildPropertySearchParams(toQuery(values));
    const qs = params.size > 0 ? `?${params.toString()}` : '';
    router.push(`/properties${qs}`);
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
            {TIPOS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="f-maxValue" className="field-label">
            Precio hasta
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
function FullForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    reset,
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
    router.push(`/properties${qs}`);
  };

  const clearAll = () => {
    reset(DEFAULT_VALUES);
    router.push('/properties');
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

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <div className="col-span-2">
          <label htmlFor="f-operacion" className="field-label">
            Operación
          </label>
          <select id="f-operacion" className={selectClass} {...register('operacion')}>
            <option value="">Toda operación</option>
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
          </select>
        </div>

        <div className="col-span-2">
          <label htmlFor="f-tipo" className="field-label">
            Tipo de propiedad
          </label>
          <select id="f-tipo" className={selectClass} {...register('tipo')}>
            <option value="">Cualquier tipo</option>
            {TIPOS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="f-bedrooms" className="field-label">
            Dormitorios
          </label>
          <select id="f-bedrooms" className={selectClass} {...register('bedrooms')}>
            <option value="">Cualquiera</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3plus">3+</option>
          </select>
        </div>

        <div>
          <label htmlFor="f-bathrooms" className="field-label">
            Baños
          </label>
          <select id="f-bathrooms" className={selectClass} {...register('bathrooms')}>
            <option value="">Cualquiera</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3plus">3+</option>
          </select>
        </div>

        <div>
          <label htmlFor="f-garage" className="field-label">
            Cochera
          </label>
          <select id="f-garage" className={selectClass} {...register('garage')}>
            <option value="">Cualquiera</option>
            <option value="true">Con cochera</option>
            <option value="false">Sin cochera</option>
          </select>
        </div>

        <div>
          <label htmlFor="f-currency" className="field-label">
            Moneda
          </label>
          <select id="f-currency" className={selectClass} {...register('currency')}>
            <option value="">Cualquiera</option>
            <option value="USD">USD</option>
            <option value="ARS">ARS</option>
          </select>
        </div>

        <div>
          <label htmlFor="f-minValue" className="field-label">
            Precio mínimo
          </label>
          <input
            id="f-minValue"
            type="number"
            min="0"
            placeholder="0"
            className={selectClass}
            {...register('minValue')}
          />
        </div>

        <div>
          <label htmlFor="f-maxValue" className="field-label">
            Precio máximo
          </label>
          <input
            id="f-maxValue"
            type="number"
            min="0"
            placeholder="Sin tope"
            className={selectClass}
            {...register('maxValue')}
          />
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

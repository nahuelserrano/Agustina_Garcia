import { z } from 'zod';
import type { PropertyQuery } from '@/lib/validations/property';

export const filterSchema = z.object({
  operacion: z.string().optional(),
  tipo: z.string().optional(),
  minValue: z.string().optional(),
  maxValue: z.string().optional(),
  currency: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  garage: z.string().optional(),
});

export type FilterValues = z.infer<typeof filterSchema>;

export const DEFAULT_FILTER_VALUES: FilterValues = {
  operacion: '',
  tipo: '',
  minValue: '',
  maxValue: '',
  currency: '',
  bedrooms: '',
  bathrooms: '',
  garage: '',
};

export function toPropertyQuery(values: FilterValues): PropertyQuery {
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

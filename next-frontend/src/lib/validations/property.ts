import { z } from 'zod';

/** Enums compartidos con el backend (ver dto/properties.dto.ts). */
const currencyEnum = z.enum(['USD', 'ARS']);
const bedroomsEnum = z.enum(['1', '2', '3plus']);
const bathroomsEnum = z.enum(['1', '2', '3plus']);
const garageEnum = z.enum(['true', 'false']);

/**
 * Esquema para sanitizar/acotar los parámetros de búsqueda leídos de la URL.
 * page y pageSize se coercionan a número; solo pageSize tiene tope (50, igual
 * que el backend). Los campos string opcionales vacíos se limpian antes.
 */
export const propertyQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(12),
  operacion: z.string().min(1).optional(),
  tipo: z.string().min(1).optional(),
  minValue: z.coerce.number().min(0).optional(),
  maxValue: z.coerce.number().min(0).optional(),
  currency: currencyEnum.optional(),
  bedrooms: bedroomsEnum.optional(),
  bathrooms: bathroomsEnum.optional(),
  garage: garageEnum.optional(),
});

export type PropertyQuery = z.infer<typeof propertyQuerySchema>;

/** Resultado seguro: parámetros parseados + flag de si la URL estaba "sucia". */
export interface ParseQueryResult {
  parsed: PropertyQuery;
  raw: Record<string, string | undefined>;
}

/**
 * Toma los searchParams (o un objeto crudo) y devuelve los parámetros
 * saneados para armar tanto la consulta HTTP como la URL de filtros.
 */
export function parsePropertyQuery(searchParams: {
  [key: string]: string | string[] | undefined;
}): ParseQueryResult {
  const raw: Record<string, string | undefined> = {};

  for (const [key, value] of Object.entries(searchParams)) {
    const normalized = Array.isArray(value) ? value[0] : value;
    if (normalized && normalized.trim().length > 0) {
      raw[key] = normalized;
    }
  }

  const result = propertyQuerySchema.safeParse(raw);
  if (!result.success) {
    return { parsed: propertyQuerySchema.parse({}), raw };
  }

  return { parsed: result.data, raw };
}

/**
 * Construye la cadena de query para el backend a partir de los parámetros
 * ya parseados. Omite claves indefinidas.
 */
export function buildPropertySearchParams(query: PropertyQuery): URLSearchParams {
  const params = new URLSearchParams();

  if (query.page > 1) params.set('page', String(query.page));
  if (query.pageSize !== 12) params.set('pageSize', String(query.pageSize));
  if (query.operacion) params.set('operacion', query.operacion);
  if (query.tipo) params.set('tipo', query.tipo);
  if (query.minValue !== undefined) params.set('minValue', String(query.minValue));
  if (query.maxValue !== undefined) params.set('maxValue', String(query.maxValue));
  if (query.currency) params.set('currency', query.currency);
  if (query.bedrooms) params.set('bedrooms', query.bedrooms);
  if (query.bathrooms) params.set('bathrooms', query.bathrooms);
  if (query.garage) params.set('garage', query.garage);

  return params;
}

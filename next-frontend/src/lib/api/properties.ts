import type {
  PaginatedPropertiesResponse,
  PublicPropertyDto,
} from '@/types/property';
import type { PropertyQuery } from '@/lib/validations/property';
import { buildPropertySearchParams } from '@/lib/validations/property';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
const REVALIDATE_SECONDS = 60;

/**
 * Listado paginado de propiedades. La regla `next: { revalidate: 60 }`
 * cachea la respuesta en el servidor durante 60 segundos (mejor rendimiento
 * y SEO) y revalida en segundo plano.
 */
export async function fetchProperties(query: PropertyQuery): Promise<PaginatedPropertiesResponse> {
  const params = buildPropertySearchParams(query);
  const url = `${API_URL}/properties${params.size > 0 ? `?${params.toString()}` : ''}`;

  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`No se pudieron cargar las propiedades (${response.status})`);
  }

  return response.json() as Promise<PaginatedPropertiesResponse>;
}

/** Detalle individual de una propiedad por ID. */
export async function fetchProperty(id: string): Promise<PublicPropertyDto> {
  const response = await fetch(`${API_URL}/properties/${encodeURIComponent(id)}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Propiedad no encontrada');
    }
    throw new Error(`No se pudo cargar la propiedad (${response.status})`);
  }

  return response.json() as Promise<PublicPropertyDto>;
}


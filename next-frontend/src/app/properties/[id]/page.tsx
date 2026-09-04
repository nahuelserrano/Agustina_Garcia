import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  BedDouble,
  Bath,
  CarFront,
  Ruler,
  Maximize,
  Home,
  Compass,
  Calendar,
  Banknote,
  Info,
} from 'lucide-react';
import Gallery from '@/components/Gallery';
import ContactForm from '@/components/ContactForm';
import { fetchProperty } from '@/lib/api/properties';
import { formatPrice, operationLabel, isRent, formatLocation, propertyTypeLabel } from '@/lib/format';

interface DetailProps {
  params: { id: string };
}

export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
  try {
    const property = await fetchProperty(params.id);
    return { title: property.title };
  } catch {
    return { title: 'Propiedad no encontrada' };
  }
}

export default async function PropertyDetailPage({ params }: DetailProps) {
  let property;
  try {
    property = await fetchProperty(params.id);
  } catch {
    notFound();
  }

  const rent = isRent(property.operation);
  const location = formatLocation(property.location ?? { city: '' });

  const features = [
    { label: 'Dormitorios', value: property.features?.bedrooms, Icon: BedDouble, suffix: '' },
    { label: 'Baños', value: property.features?.bathrooms, Icon: Bath, suffix: '' },
    { label: 'Garage', value: property.features?.garage, Icon: CarFront, suffix: '' },
    {
      label: 'Superficie cubierta',
      value: property.features?.coveredSurface,
      Icon: Ruler,
      suffix: 'm²',
    },
    {
      label: 'Superficie total',
      value: property.features?.totalSurface,
      Icon: Maximize,
      suffix: 'm²',
    },
    { label: 'Ambientes', value: property.features?.rooms, Icon: Home, suffix: '' },
  ].filter((f) => f.value !== undefined && f.value !== null && f.value > 0);
  [
    property.condition && { label: 'Estado', value: property.condition, Icon: Info },
    property.antiquityYears !== undefined && {
      label: 'Antigüedad',
      value: `${property.antiquityYears} años`,
      Icon: Calendar,
    },
    property.orientation && { label: 'Orientación', value: property.orientation, Icon: Compass },
    property.isMortgageEligible && {
      label: 'Apto crédito hipotecario',
      value: 'Sí',
      Icon: Banknote,
    },
  ].filter(Boolean) as { label: string; value: string; Icon: typeof Info }[];
  return (
    <div className="px-5 pb-24 pt-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/properties"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-noche/70 transition-colors hover:text-verde"
        >
          <ArrowLeft size={16} />
          Volver a propiedades
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Columna izquierda: galería + descripción (pegada a las imágenes) */}
          <div className="flex flex-col gap-12">
            <Gallery images={property.images} title={property.title} />

            <section>
              <h2 className="font-sans text-3xl leading-tight">Acerca de esta propiedad</h2>
              <div className="mt-5 space-y-4 text-[0.975rem] leading-relaxed text-noche/85">
                {property.description.split(/\r?\n/).filter(Boolean).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {property.services && property.services.length > 0 && (
                <div className="mt-8">
                  <h3 className="eyebrow">Servicios</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {property.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-full border border-arena bg-crema-50 px-3 py-1.5 text-xs font-medium text-noche/80"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Columna derecha: resumen + contacto + datos clave */}
          <aside className="flex flex-col gap-8">
            <div className="flex flex-col">
              <span
                className={`self-start rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-widecaps ${
                  rent ? 'bg-noche text-white' : 'bg-verde text-white'
                }`}
              >
                {operationLabel(property.operation)} · {propertyTypeLabel(property.propertyType)}
              </span>

              <h1 className="mt-5 font-sans text-4xl leading-[1.05] sm:text-5xl">
                {property.title}
              </h1>

              <p className="mt-4 flex items-center gap-2 text-sm text-noche/70">
                <MapPin size={16} className="shrink-0 text-verde" aria-hidden />
                <span>
                  {location.primary}
                  {location.secondary ? ` · ${location.secondary}` : ''}
                </span>
              </p>

              <div className="mt-6 border-y border-arena py-5">
                <p className="eyebrow">Precio</p>
                <p className="mt-2 font-sans text-4xl tracking-tight text-noche">
                  {property.price?.hidden ? 'Consultar' : formatPrice(property.price)}
                </p>
                {property.expensas && (
                  <p className="mt-1 text-xs text-noche/60">+ Expensas {property.expensas}</p>
                )}
              </div>

              {features.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {features.map((f) => (
                    <div key={f.label} className="flex items-center gap-2.5 rounded-xl bg-crema-50 p-3">
                      <f.Icon size={18} className="shrink-0 text-verde" aria-hidden />
                      <div className="min-w-0">
                        <p className="truncate text-xs text-noche/60">{f.label}</p>
                        <p className="truncate font-semibold text-noche">
                          {f.value}
                          {f.suffix ? ` ${f.suffix}` : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-arena bg-crema-50 p-5">
              <ContactForm propertyId={property.id} listingTitle={property.title} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

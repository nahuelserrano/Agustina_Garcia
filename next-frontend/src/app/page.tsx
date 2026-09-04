import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  MessageSquareText,
  Handshake,
  Users,
  Home,
  Mail,
} from 'lucide-react';
import FilterBar from '@/components/FilterBar';
import PropertyGrid from '@/components/PropertyGrid';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { fetchProperties, fetchPropertyTypes } from '@/lib/api/properties';
import { PHONE_DISPLAY, CONTACT_EMAIL, waLink } from '@/constants/contact';

export const metadata: Metadata = {
  title: 'Inmobiliaria Agustina García',
};

const STEPS = [
  {
    Icon: MessageSquareText,
    title: 'Nos contás lo que buscás',
    number: '1',
  },
  {
    Icon: Handshake,
    title: 'Te asesoramos y mostramos seguros',
    number: '2',
  },
  {
    Icon: Users,
    title: 'Te acompañamos en todo el proceso',
    number: '3',
  },
  {
    Icon: Home,
    title: 'Cerrás con tranquilidad',
    number: '4',
  },
];

export default async function HomePage() {
  const response = await fetchProperties({ page: 1, pageSize: 12 });
  const propertyTypes = await fetchPropertyTypes().catch(() => []);

  return (
    <div className="bg-crema">
      {/* ------------------------------------------------------------------ Hero */}
      <section className="hero-bg relative overflow-hidden">
        <div className="container relative pb-40 pt-14 sm:pt-20">
          <div className="max-w-3xl pl-4 text-center sm:text-left">
            <h1 className="font-sans text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Te ayudo a
              <br />
              <span className="text-verde">encontrar tu lugar</span>
              <br />
              en Tandil
            </h1>
            <p className="mt-5 max-w-lg font-sans text-lg leading-relaxed text-noche/80">
              Asesoramiento personalizado para comprar, vender o alquilar con
              confianza.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <Link href="/properties" className="btn btn-primary gap-2.5 px-7 py-3.5 text-base">
                <Home size={20} aria-hidden />
                Ver propiedades
              </Link>
              <Link href="/#nosotros" className="btn btn-outline px-7 py-3.5 text-base">
               Quiero saber más
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- Filtros */}
      <section className="px-5 sm:px-8">
        <div className="container -mt-20 relative z-10">
          <FilterBar variant="home" propertyTypes={propertyTypes} />
        </div>
      </section>

      {/* -------------------------------------------------- Propiedades destacadas */}
      <section className="px-5 pt-16 sm:px-8">
        <div className="container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Últimos ingresos</p>
              <h2 className="mt-2 font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
                Encontrá tu próxima propiedad
              </h2>
            </div>
            <Link
              href="/properties"
              className="group inline-flex items-center gap-2 font-sans text-base font-medium text-verde transition-colors hover:text-verde-800"
            >
              Ver todas las propiedades
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-8">
            <PropertyGrid properties={response.items.slice(0, 4)} cols={4} />
          </div>
        </div>
      </section>

      {/* -------------------------------------- Cómo trabajamos + contacto rápido */}
      <section id="trabajamos" className="px-5 py-20 sm:px-8">
        <div className="container grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-stretch">
          <div id="nosotros" className="rounded-3xl border border-arena bg-white p-8 sm:p-10">
            <p className="eyebrow">Cómo trabajamos?</p>
            <h2 className="mt-2 max-w-md font-sans text-3xl font-semibold tracking-tight">
              Un proceso claro y acompañado
            </h2>

            <ol className="mt-10 grid gap-8 sm:grid-cols-4 sm:gap-4">
              {STEPS.map((step, i) => (
                <li key={step.number} className="relative flex flex-col">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-verde/30 bg-crema-50 text-verde">
                    <step.Icon size={22} strokeWidth={1.6} aria-hidden />
                  </span>
                  <p className="mt-4 font-sans text-sm font-medium leading-snug text-noche">
                    {step.title}
                  </p>
                  <span className="mt-4 font-sans text-3xl font-semibold text-noche/20">
                    {step.number}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span className="absolute -right-2 top-6 hidden h-px w-4 border-t border-dashed border-arena sm:block" />
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* Contacto rápido */}
          <div className="flex flex-col justify-between rounded-3xl bg-noche p-8 text-white sm:p-10">
            <div>
              <h2 className="font-sans text-3xl font-semibold tracking-tight">
                ¿Tenés dudas?
              </h2>
              <p className="mt-2 font-sans text-white/70">
                Escribime y te respondemos a la brevedad.
              </p>
            </div>

            <div className="mt-10 space-y-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-full bg-verde px-5 py-3.5 font-sans text-sm font-medium transition-colors hover:bg-verde-800"
              >
                <WhatsAppIcon size={19} />
                {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 font-sans text-sm text-white/85 transition-colors hover:text-white"
              >
                <Mail size={17} className="shrink-0 text-white/70" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

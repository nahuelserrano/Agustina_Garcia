'use client';

import { useId, useState, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { BrandLogo } from '@/components/BrandLogo';
import { Collapse } from '@/components/ui/Collapse';
import { PHONE_DISPLAY, CONTACT_EMAIL, CONTACT_ADDRESS, waLink } from '@/constants/contact';

const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Propiedades', href: '/properties' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
];

const SERVICIOS = ['Tasaciones', 'Asesoramiento legal', 'Administración', 'Comercialización'];

export default function Footer() {
  return (
    <footer id="contacto" className="border-t border-arena bg-crema">
      <div className="container-max py-14">
        <div className="hidden gap-10 xl:grid xl:grid-cols-4">
          <div>
            <Link href="/" aria-label="Ir al inicio">
              <BrandLogo />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-noche/70">
              Inmobiliaria en Tandil. Te ayudamos a comprar, vender o alquilar que
              confianza y cercanía.
            </p>
          </div>

          <FooterColumn title="Navegación">
            <NavBody />
          </FooterColumn>

          <FooterColumn title="Servicios">
            <ServicesBody />
          </FooterColumn>

          <FooterColumn title="Contacto">
            <ContactBody />
          </FooterColumn>
        </div>

        <div className="xl:hidden">
          <div className="border-b border-arena pb-6 text-center">
            <Link href="/" aria-label="Ir al inicio" className="inline-flex">
              <BrandLogo />
            </Link>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-noche/70">
              Inmobiliaria en Tandil. Te ayudamos a comprar, vender o alquilar que
              confianza y cercanía.
            </p>
          </div>

          <MobileSection title="Navegación">
            <NavBody />
          </MobileSection>
          <MobileSection title="Servicios">
            <ServicesBody />
          </MobileSection>
          <MobileSection title="Contacto">
            <ContactBody />
          </MobileSection>
        </div>
      </div>

      <div className="border-t border-arena">
        <div className="relative py-5">
          <div className="container-max text-center font-sans text-xs text-noche/50">
            © {new Date().getFullYear()} Agustina García Inmobiliaria. Todos los derechos
            reservados.
          </div>
          <div className="absolute bottom-full left-0 right-0 mb-3 flex items-center justify-center gap-3 pr-0 sm:pr-6 lg:justify-end">
            <span className="hidden font-sans text-lg text-noche/50 lg:inline">Forma parte de</span>
            <a href="https://tandilprop.com.ar" target="_blank" rel="noopener noreferrer" aria-label="TandilProp">
              <Image
                src="/logo-tandilprop.png"
                alt="TandilProp"
                width={888}
                height={239}
                className="h-10 w-auto lg:h-12"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 font-sans text-[0.8rem] font-semibold uppercase tracking-widecaps text-noche/50">
        {title}
      </h3>
      {children}
    </div>
  );
}

function MobileSection({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-arena">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between py-4 text-left font-sans text-sm font-semibold uppercase tracking-widecaps text-noche/60"
      >
        {title}
        <ChevronDown
          size={18}
          className={cn('shrink-0 text-noche/40 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      <Collapse open={open}>
        <div id={panelId} className="pb-4">
          {children}
        </div>
      </Collapse>
    </div>
  );
}

function NavBody() {
  return (
    <ul className="space-y-2.5 text-sm">
      {NAV_LINKS.map((link) => (
        <li key={link.label}>
          <Link href={link.href} className="text-noche/80 transition-colors hover:text-verde">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ServicesBody() {
  return (
    <ul className="space-y-2.5 text-sm">
      {SERVICIOS.map((s) => (
        <li key={s} className="text-noche/80">
          {s}
        </li>
      ))}
    </ul>
  );
}

function ContactBody() {
  return (
    <ul className="space-y-2.5 text-sm">
      <li>
        <a
          href={waLink()}
          className="flex items-center gap-2 text-noche/80 transition-colors hover:text-verde"
        >
          <Phone size={15} className="shrink-0 text-verde" />
          {PHONE_DISPLAY}
        </a>
      </li>
      <li>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="flex items-center gap-2 whitespace-nowrap text-noche/80 transition-colors hover:text-verde"
        >
          <Mail size={15} className="shrink-0 text-verde" />
          {CONTACT_EMAIL}
        </a>
      </li>
      <li className="flex items-center gap-2 text-noche/80">
        <MapPin size={15} className="shrink-0 text-verde" />
        {CONTACT_ADDRESS}
      </li>
    </ul>
  );
}

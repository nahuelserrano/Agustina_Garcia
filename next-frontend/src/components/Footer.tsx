import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Linkedin } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { PHONE_DISPLAY, PHONE_WA } from '@/components/Header';

const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Propiedades', href: '/properties' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Servicios', href: '/#trabajamos' },
  { label: 'Contacto', href: '/#contacto' },
];

const SERVICIOS = ['Tasaciones', 'Asesoramiento legal', 'Administración', 'Comercialización'];

export default function Footer() {
  return (
    <footer id="contacto" className="border-t border-arena bg-crema">
      <div className="container-max grid gap-10 py-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr_0.8fr]">
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
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="text-noche/80 transition-colors hover:text-verde">
                {link.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Servicios">
          {SERVICIOS.map((s) => (
            <li key={s} className="text-noche/80">
              {s}
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Contacto">
          <li>
            <a
              href={`https://wa.me/${PHONE_WA}`}
              className="flex items-center gap-2 text-noche/80 transition-colors hover:text-verde"
            >
              <Phone size={15} className="shrink-0 text-verde" />
              {PHONE_DISPLAY}
            </a>
          </li>
          <li>
            <a
              href="mailto:agmartillera@gmail.com"
              className="flex items-center gap-2 break-all text-noche/80 transition-colors hover:text-verde"
            >
              <Mail size={15} className="shrink-0 text-verde" />
              agmartillera@gmail.com
            </a>
          </li>
          <li className="flex items-center gap-2 text-noche/80">
            <MapPin size={15} className="shrink-0 text-verde" />
            Tandil, Buenos Aires
          </li>
        </FooterColumn>

        <FooterColumn title="Seguinos">
          <li className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-arena text-noche/70 transition-colors hover:border-verde hover:text-verde"
            >
              <Instagram size={17} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-arena text-noche/70 transition-colors hover:border-verde hover:text-verde"
            >
              <Linkedin size={17} />
            </a>
          </li>
        </FooterColumn>
      </div>

      <div className="border-t border-arena">
        <div className="container-max py-5 text-center font-sans text-xs text-noche/50">
          © {new Date().getFullYear()} © Agustina García Inmobiliaria. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 font-display text-[0.8rem] font-semibold uppercase tracking-widecaps text-noche/50">
        {title}
      </h3>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

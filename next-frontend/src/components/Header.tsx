'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/BrandLogo';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export const PHONE_DISPLAY = '2494 28-9902';
export const PHONE_WA = '542494289902';

export const NAV = [
  { href: '/', label: 'Inicio', anchor: false },
  { href: '/properties', label: 'Propiedades', anchor: false },
  { href: '/#nosotros', label: 'Nosotros', anchor: true },
  { href: '/#contacto', label: 'Contacto', anchor: true },
];

export function WhatsAppLink({ label }: { label: string }) {
  return (
    <a
      href={`https://wa.me/${PHONE_WA}`}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary gap-2 px-4 py-2.5 text-sm"
    >
      <WhatsAppIcon size={17} />
      {label}
    </a>
  );
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-crema">
      <div className="container-max flex h-[72px] items-center justify-between gap-4">
        <Link href="/" aria-label="Agustina García Inmobiliaria — inicio">
          <BrandLogo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => {
            const active = !item.anchor && pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative pb-1 font-display text-[0.95rem] font-medium transition-colors ${
                  active ? 'text-verde' : 'text-noche hover:text-verde'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-verde transition-opacity ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div>
          <WhatsAppLink label={PHONE_DISPLAY} />
        </div>
      </div>
    </header>
  );
}

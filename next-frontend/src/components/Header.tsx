'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { Collapse } from '@/components/ui/Collapse';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { PHONE_DISPLAY, waLink } from '@/constants/contact';

export const NAV = [
  { href: '/', label: 'Inicio', anchor: false },
  { href: '/properties', label: 'Propiedades', anchor: false },
  { href: '/#nosotros', label: 'Nosotros', anchor: true },
  { href: '/#contacto', label: 'Contacto', anchor: true },
];

function WhatsAppLink({ label }: { label: string }) {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary gap-2.5 px-7 py-3.5 text-base"
    >
      <WhatsAppIcon size={22} />
      {label}
    </a>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex h-[96px] w-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-8">
        <Link href="/" aria-label="Agustina García Inmobiliaria — inicio">
          <BrandLogo />
        </Link>

        <nav className="hidden items-center gap-14 lg:flex">
          {NAV.map((item) => {
            const active = !item.anchor && pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative pb-1 font-sans text-lg font-medium transition-colors ${
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

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <WhatsAppLink label={PHONE_DISPLAY} />
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-md text-noche transition-colors hover:text-verde lg:hidden"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <div className="lg:hidden" ref={menuRef}>
        <Collapse open={open}>
          <div className="border-t border-arena bg-white">
            <div className="container-max flex flex-col gap-1 py-4">
              {NAV.map((item) => {
                const active = !item.anchor && pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`px-2 py-3 font-sans text-lg font-medium transition-colors ${
                      active ? 'text-verde' : 'text-noche hover:text-verde'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </Collapse>
      </div>
    </header>
  );
}

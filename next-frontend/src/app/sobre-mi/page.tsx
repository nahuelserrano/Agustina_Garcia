import type { Metadata } from 'next';
import Link from 'next/link';
import { Home } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { waLink } from '@/constants/contact';

export const metadata: Metadata = {
  title: 'Sobre mí — Agustina García Inmobiliaria',
};

export default function SobreMiPage() {
  return (
    <div className="bg-crema">
      {/* ------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="flex justify-center">
          <div className="w-full max-w-6xl px-5 sm:px-8 py-10 sm:py-14 flex items-center gap-8">
            <div className="relative w-full overflow-hidden rounded-3xl bg-crema-200 max-w-lg">
               <img
                src="/agustina.jpeg"
                alt="Agustina García"
                width={854}
                height={1280}
                className="w-full object-cover object-center brightness-110"
              />
            </div>
            <div className="flex-1">
              <p className="eyebrow">Sobre mí</p>
              <h1 className="mt-2 font-sans text-5xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
                Conocé a
                <span className="text-verde"> Agustina</span>
              </h1>
              <p className="mt-5 font-sans text-xl leading-relaxed text-noche/80">
                 Soy Agustina García, martillera y corredora pública, y la persona detrás de esta inmobiliaria. Vivo en Tandil, y hace años acompaño a personas y familias en la búsqueda de su próximo hogar, con un enfoque cercano, honesto y profesional.
               </p>
               <p className="mt-5 font-sans text-xl leading-relaxed text-noche/80"> Creo en el valor de las buenas decisiones y oportunidades, en el trato humano y en el poder de un lugar que se siente como hogar.</p>
               <div className="mt-6 flex flex-wrap items-center gap-3">
                 <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary gap-2.5 px-7 py-3.5 text-base">
                   <WhatsAppIcon size={20} />
                   Hablemos
                 </a>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
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
          <div className="w-full max-w-7xl px-3 sm:px-6 py-10 sm:py-14 flex flex-col lg:flex-row lg:items-center lg:gap-8 gap-12">
            <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-crema-200">
               <Image
                 src="/agustina.jpeg"
                 alt="Agustina García"
                 width={849}
                 height={1102}
                 sizes="(max-width: 1023px) 100vw, 32rem"
                 className="w-full object-cover object-center brightness-110"
               />
            </div>
            <div className="flex-1">
              <p className="eyebrow">Sobre mí</p>
              <h1 className="mt-2 font-sans text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
                Conocé a
                <span className="text-verde"> Agustina</span>
              </h1>
              <p className="mt-5 font-sans text-lg leading-relaxed text-noche/80">Soy Agustina García, Martillera y Corredora Pública, y desarrollo mi actividad profesional en la ciudad de Tandil.</p>
                <p className="mt-5 font-sans text-lg leading-relaxed text-noche/80"> Entiendo mi profesión como mucho más que una intermediación: se trata de acompañar a las personas en decisiones importantes, brindando asesoramiento, claridad y seguridad en cada etapa del proceso. Trabajo de manera directa y personalizada, involucrándome en cada operación y ofreciendo el asesoramiento profesional necesario para que cada decisión se tome con información y confianza.</p>
                <p className="mt-5 font-sans text-lg leading-relaxed text-noche/80"> Cada propiedad y cada operación requieren análisis, estrategia, seguimiento y dedicación. Mi objetivo es que cada persona que me elige encuentre no solo una profesional que la asesore, sino alguien que esté verdaderamente presente durante todo el camino.</p>
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
      <section className="pb-10 sm:pb-14">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-6">
           <div className="relative isolate overflow-hidden rounded-3xl border border-crema-200 bg-crema-50 px-5 py-5 text-noche shadow-lift sm:px-10 sm:py-7 lg:px-14 lg:py-8">
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div className="relative z-10 max-w-2xl">
                <span className="absolute -left-1 -top-2 font-serif text-8xl leading-none text-verde/80" aria-hidden="true">
                  “
                </span>
                <blockquote className="pl-14 font-sans text-2xl font-medium leading-tight sm:pl-16 sm:text-3xl lg:pl-20 lg:text-[2.25rem]">
                  Las mejores operaciones inmobiliarias nacen de la confianza.
                </blockquote>
                <p className="mt-3 max-w-xl pl-14 font-sans text-base leading-relaxed text-noche/70 sm:pl-16 sm:text-lg lg:pl-20">
                  Trabajamos con cercanía, compromiso y profesionalismo, construyendo
                  relaciones duraderas con cada cliente.
                </p>
              </div>

              <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center lg:relative lg:inset-auto lg:flex lg:justify-end">
                <Image
                  src="/logo-about-me.webp"
                  alt=""
                  width={611}
                  height={408}
                  sizes="(max-width: 1023px) 78vw, (max-width: 1279px) 58vw, 27rem"
                  className="h-auto w-[min(78vw,21rem)] object-contain opacity-30 sm:w-[min(58vw,25rem)] lg:w-full lg:max-w-[27rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

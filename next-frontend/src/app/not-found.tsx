import Link from 'next/link';
import { Mountain, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center px-5 pt-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-verde/10 text-verde">
        <Mountain size={30} strokeWidth={1.5} aria-hidden />
      </span>
      <p className="mt-6 font-sans text-6xl leading-none">404</p>
      <h1 className="mt-4 font-sans text-3xl leading-tight">
        No encontramos lo que buscás
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-noche/70">
        Esa propiedad no existe o ya dejó de publicarse. Volvé al listado para
        seguir explorando los cerros de Tandil.
      </p>
      <Link href="/properties" className="btn btn-primary mt-8 px-6 py-3">
        <ArrowLeft size={16} />
        Ver propiedades
      </Link>
    </div>
  );
}

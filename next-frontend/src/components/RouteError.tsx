'use client';

interface RouteErrorProps {
  reset: () => void;
}

export default function RouteError({ reset }: RouteErrorProps) {
  return (
    <div className="container-max flex min-h-[24rem] flex-col items-center justify-center text-center">
      <p className="eyebrow">Algo salió mal</p>
      <h1 className="mt-3 font-sans text-3xl font-semibold">No pudimos cargar esta página</h1>
      <p className="mt-3 max-w-md text-noche/70">
        Revisá tu conexión e intentá nuevamente en unos instantes.
      </p>
      <button type="button" onClick={reset} className="btn btn-primary mt-6 px-6 py-3">
        Intentar nuevamente
      </button>
    </div>
  );
}

export default function PropertyLoading() {
  return (
    <div className="container-max py-12" aria-label="Cargando propiedades" role="status">
      <div className="h-8 w-64 animate-pulse rounded bg-crema-200" />
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="overflow-hidden rounded-2xl bg-white shadow-card">
            <div className="aspect-[4/3] animate-pulse bg-crema-200" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-3/4 animate-pulse rounded bg-crema-200" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-crema-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

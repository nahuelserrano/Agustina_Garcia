'use client';

import dynamic from 'next/dynamic';

const MapLibreMap = dynamic(() => import('./MapLibreMap'), { ssr: false });

export default function PropertyMap({
  lat,
  lng,
  height = '320px',
}: {
  lat?: number | null;
  lng?: number | null;
  height?: string;
}) {
  const hasLocation =
    typeof lat === 'number' &&
    Number.isFinite(lat) &&
    typeof lng === 'number' &&
    Number.isFinite(lng);

  if (!hasLocation) {
    return (
      <div
        style={{ height }}
        className="flex items-center justify-center rounded-2xl border border-arena bg-crema-100 text-sm text-noche/60"
      >
        Ubicación no disponible
      </div>
    );
  }

  return (
    <div style={{ height }} className="overflow-hidden rounded-2xl border border-arena bg-crema-100">
      <MapLibreMap lat={lat} lng={lng} zoom={15} />
    </div>
  );
}

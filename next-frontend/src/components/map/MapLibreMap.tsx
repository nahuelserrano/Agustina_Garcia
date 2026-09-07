'use client';

import { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import osmRasterStyle from './osmConfig';

function buildMarkerElement(title = 'Ubicación'): HTMLButtonElement {
  const element = document.createElement('button');
  element.type = 'button';
  element.style.width = '18px';
  element.style.height = '18px';
  element.style.borderRadius = '999px';
  element.style.border = '3px solid #ffffff';
  element.style.background = '#37937e';
  element.style.boxShadow = '0 8px 18px rgba(34, 43, 58, 0.28)';
  element.setAttribute('aria-label', title);
  return element;
}

export default function MapLibreMap({
  lat,
  lng,
  zoom = 15,
  showMarker = true,
}: {
  lat: number;
  lng: number;
  zoom?: number;
  showMarker?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const map = new maplibregl.Map({
      container,
      style: osmRasterStyle,
      center: [lng, lat],
      zoom,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    if (showMarker) {
      new maplibregl.Marker({ element: buildMarkerElement() })
        .setLngLat([lng, lat])
        .addTo(map);
    }

    return () => {
      map.remove();
    };
  }, [lat, lng, zoom, showMarker]);

  return <div ref={containerRef} className="h-full w-full" />;
}

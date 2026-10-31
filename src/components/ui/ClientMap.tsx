'use client';

import dynamic from 'next/dynamic';
import { MapSkeleton } from './MapSkeleton';
import type { MapLocation } from './Map';

const Map = dynamic(() => import('./Map').then(mod => ({ default: mod.Map })), {
  ssr: false,
  loading: () => <MapSkeleton height="100%" />
});

interface ClientMapProps {
  locations: MapLocation[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
}

export function ClientMap(props: ClientMapProps) {
  return (
    <div style={{ height: props.height || '400px' }}>
      <Map {...props} height="100%" />
    </div>
  );
}

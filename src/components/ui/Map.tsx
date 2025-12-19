'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in react-leaflet
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export interface MapLocation {
  id: string;
  name: string;
  address: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  phoneRaw: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface MapProps {
  locations: MapLocation[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
}

export function Map({
  locations,
  center,
  zoom = 10,
  height = '400px',
  className = ''
}: MapProps) {
  // Calculate center if not provided (average of all locations)
  const mapCenter: [number, number] = center || [
    locations.reduce((sum, loc) => sum + loc.coordinates.lat, 0) / locations.length,
    locations.reduce((sum, loc) => sum + loc.coordinates.lng, 0) / locations.length,
  ];

  useEffect(() => {
    // Ensure Leaflet icons work properly
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/images/marker-icon-2x.png',
      iconUrl: '/images/marker-icon.png',
      shadowUrl: '/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className={className} style={{ height }}>
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.coordinates.lat, location.coordinates.lng]}
            icon={icon}
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-bold text-navy mb-2">{location.name}</h3>
                <p>{location.address}</p>
                {location.addressLine2 && <p>{location.addressLine2}</p>}
                <p>{location.city}, {location.state} {location.zip}</p>
                <p className="mt-2">
                  <a
                    href={`tel:${location.phoneRaw}`}
                    className="text-gold hover:text-gold-dark font-semibold"
                  >
                    {location.phone}
                  </a>
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${location.address}, ${location.city}, ${location.state} ${location.zip}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-dark text-sm font-semibold mt-2 inline-block"
                >
                  Get Directions →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

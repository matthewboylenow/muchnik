import { Location } from '@/types';

export const locations: Location[] = [
  {
    id: 'staten-island',
    name: 'New York Office',
    address: '900 South Avenue',
    addressLine2: 'Executive Suites',
    city: 'Staten Island',
    state: 'NY',
    zip: '10314',
    phone: '(718) 442-7004',
    phoneRaw: '7184427004',
    phoneLabel: 'NY',
    coordinates: { lat: 40.6170, lng: -74.1726 },
  },
  {
    id: 'manhattan',
    name: 'NYC Office',
    address: '11 Broadway',
    addressLine2: 'Suite 615',
    city: 'New York',
    state: 'NY',
    zip: '10004',
    phone: '(212) 597-2427',
    phoneRaw: '2125972427',
    phoneLabel: 'NYC',
    coordinates: { lat: 40.7053, lng: -74.0142 },
  },
  {
    id: 'new-jersey',
    name: 'New Jersey Office',
    address: '10 West Hanover Ave',
    addressLine2: 'Suite 111',
    city: 'Randolph',
    state: 'NJ',
    zip: '07869',
    phone: '(201) 582-8014',
    phoneRaw: '2015828014',
    phoneLabel: 'NJ',
    coordinates: { lat: 40.8270, lng: -74.5674 },
  },
];

export const firmInfo = {
  name: 'Muchnik Elder Law P.C.',
  email: 'office@muchnikelderlaw.com',
  fax: '718-989-7378',
};

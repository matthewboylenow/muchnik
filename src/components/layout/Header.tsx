'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from './Navigation';
import { MobileMenu } from './MobileMenu';
import { locations } from '@/data/locations';

export function Header() {
  return (
    <header className="bg-white shadow-md relative z-10">
      {/* Top Bar */}
      <div className="bg-navy text-white text-sm md:text-base py-3">
        <div className="container-custom flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap gap-4 md:gap-6 font-medium">
            {locations.map((location) => (
              <a
                key={location.id}
                href={`tel:${location.phoneRaw}`}
                className="hover:text-gold transition-colors"
              >
                {location.phoneLabel || location.city}: {location.phone}
              </a>
            ))}
          </div>
          <a
            href="mailto:kmuchnik@muchnikelderlaw.com"
            className="hover:text-gold transition-colors font-medium"
          >
            kmuchnik@muchnikelderlaw.com
          </a>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Muchnik Elder Law P.C."
              width={500}
              height={287}
              className="h-20 md:h-28 w-auto"
              priority
            />
          </Link>

          <Navigation />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

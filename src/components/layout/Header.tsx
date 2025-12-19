'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { MobileMenu } from './MobileMenu';
import { locations } from '@/data/locations';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-navy shadow-lg' : 'bg-navy/95'
      }`}
    >
      {/* Top Bar */}
      <div className="bg-navy-dark text-white text-xs py-2">
        <div className="container-custom flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap gap-4">
            {locations.map((location) => (
              <a
                key={location.id}
                href={`tel:${location.phoneRaw}`}
                className="hover:text-gold transition-colors"
              >
                {location.city}: {location.phone}
              </a>
            ))}
          </div>
          <a
            href="mailto:kmuchnik@muchnikelderlaw.com"
            className="hover:text-gold transition-colors"
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
              className="h-12 w-auto"
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

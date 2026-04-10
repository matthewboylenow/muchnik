'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from './Navigation';
import { MobileMenu } from './MobileMenu';
import { locations } from '@/data/locations';

export function Header() {
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPhoneDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md relative z-10">
      {/* Top Bar */}
      <div className="bg-navy text-white text-sm md:text-base py-3">
        <div className="container-custom flex flex-wrap justify-between items-center gap-2">
          {/* Call Us dropdown - hover on desktop, click on mobile */}
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => setPhoneDropdownOpen(true)}
            onMouseLeave={() => setPhoneDropdownOpen(false)}
          >
            <button
              onClick={() => setPhoneDropdownOpen(!phoneDropdownOpen)}
              className="flex items-center gap-1.5 font-medium hover:text-gold transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
              <svg className={`w-3 h-3 transition-transform ${phoneDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {phoneDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-navy border border-white/20 rounded-lg shadow-lg py-2 whitespace-nowrap z-50">
                {locations.map((location) => (
                  <a
                    key={location.id}
                    href={`tel:${location.phoneRaw}`}
                    className="block px-4 py-2 hover:bg-white/10 hover:text-gold transition-colors"
                  >
                    {location.phoneLabel || location.city}: {location.phone}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="mailto:office@muchnikelderlaw.com"
            className="hover:text-gold transition-colors font-medium"
          >
            office@muchnikelderlaw.com
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

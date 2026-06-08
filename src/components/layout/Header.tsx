import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from './Navigation';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <header className="bg-white shadow-md relative z-10">
      {/* Top Bar */}
      <div className="bg-navy text-white text-sm md:text-base py-3">
        <div className="container-custom flex flex-wrap justify-between items-center gap-x-4 gap-y-2">
          {/* Call Us */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="flex items-center gap-1.5 font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </span>
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-medium">Toll-Free:</span>
              <a
                href="tel:8772353529"
                className="hover:text-gold transition-colors font-medium"
              >
                (877) 235-3529
              </a>
              <a
                href="tel:8772353529"
                className="hover:text-gold transition-colors font-medium"
              >
                (877) 2ELDLAW
              </a>
            </span>
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

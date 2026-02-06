'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const heroSlides = [
  {
    image: '/images/hero/homepage/Staten-Island-Ferry.jpg',
    caption: 'Experience Matters',
  },
  {
    image: '/images/hero/homepage/NY-Appellate-Division-Court.jpg',
    caption: 'The Lifestyle You Want, the Care You Need',
  },
  {
    image: '/images/hero/homepage/Photoshopped-IMG-0797-3-2-scaled.jpg',
    caption: 'Helping Clients Make the Right Decisions',
  },
];

export function HomeHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-navy text-white overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.image}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={slide.image}
                  alt={`Muchnik Elder Law ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={90}
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/50 to-navy/30"></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative container-custom py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <div className="mb-6 h-8">
            {heroSlides.map((slide, index) => (
              <span
                key={slide.caption}
                className={`inline-block text-gold text-sm md:text-base font-semibold tracking-wider uppercase transition-opacity duration-700 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0 absolute'
                }`}
              >
                {slide.caption}
              </span>
            ))}
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Experienced Elder Law & Estate Planning Attorneys in NY & NJ
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-100 leading-relaxed">
            For over 30 years, Muchnik Elder Law P.C., together with its predecessor firms, has provided expert legal guidance in elder law, Medicaid planning, estate planning, probate, and guardianships. Serving families in New York and New Jersey with compassionate, personalized legal services.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <Button size="lg" variant="primary" className="text-base md:text-lg px-8 py-4">
                Schedule a Free Consultation
              </Button>
            </Link>
            <Link href="/practice-areas">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-navy text-base md:text-lg px-8 py-4">
                Our Services
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 md:h-16 fill-cream" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ transform: 'scaleY(-1)' }}>
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  );
}

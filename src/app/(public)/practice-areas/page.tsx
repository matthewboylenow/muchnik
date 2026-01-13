import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { practiceAreas } from '@/data/practiceAreas';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Practice Areas',
  description:
    'Muchnik Elder Law P.C. specializes in Elder Law, Medicaid Planning, Estate Planning, Special Needs Planning, Guardianships, and more.',
};

export default function PracticeAreasPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/hero/family-documents.jpg"
            alt="Practice Areas"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative container-custom py-20 md:py-28">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Our Practice Areas
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
              We offer comprehensive legal services to protect you, your family, and your assets.
              Our experienced attorneys are here to guide you through complex legal matters with
              compassion and expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((area) => {
              const slug = area.id;
              return (
                <Link key={area.id} href={`/practice-areas/${slug}`} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={area.image}
                        alt={area.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent"></div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h2 className="font-heading text-2xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">
                        {area.title}
                      </h2>
                      <p className="text-charcoal mb-4 flex-1">
                        {area.shortDescription}
                      </p>
                      <div className="flex items-center text-gold font-semibold group-hover:gap-2 transition-all">
                        <span>Learn More</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-navy text-white">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Contact us today to schedule a free consultation with one of our experienced attorneys.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg" className="text-base md:text-lg px-8 py-4">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

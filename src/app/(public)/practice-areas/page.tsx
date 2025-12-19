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
      <section className="bg-navy text-white py-16">
        <div className="container-custom">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Practice Areas</h1>
          <p className="text-lg text-gray-200 max-w-3xl">
            We offer comprehensive legal services to protect you, your family, and your assets.
            Our experienced attorneys are here to guide you through complex legal matters with
            compassion and expertise.
          </p>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="space-y-16">
            {practiceAreas.map((area, index) => (
              <div
                key={area.id}
                id={area.id}
                className="scroll-mt-32"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}>
                  {/* Image */}
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg bg-gray-200">
                      <Image
                        src={area.image}
                        alt={area.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <h2 className="font-heading text-3xl font-bold text-navy mb-4">
                      {area.title}
                    </h2>
                    <p className="text-lg text-gold font-semibold mb-4">
                      {area.shortDescription}
                    </p>
                    <div className="prose max-w-none text-charcoal space-y-4">
                      {area.fullDescription.split('\n\n').map((paragraph, pIndex) => (
                        <p key={pIndex}>{paragraph}</p>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Link href="/contact">
                        <Button>Schedule a Consultation</Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {index < practiceAreas.length - 1 && (
                  <hr className="mt-16 border-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-navy text-white">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Contact us today to schedule a consultation with one of our experienced attorneys.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

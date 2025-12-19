import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Special Needs Planning',
  description:
    'Special needs planning services to protect government benefits while providing for your child\'s future. Expert legal guidance for families.',
  openGraph: {
    title: 'Special Needs Planning | Muchnik Elder Law P.C.',
    description: 'Special needs planning services to protect government benefits while providing for your child\'s future.',
    images: ['/images/practice-areas/special-needs.jpg'],
  },
};

export default function SpecialNeedsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/practice-areas/special-needs.jpg"
            alt="Special Needs Planning"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative container-custom py-20 md:py-28">
          <div className="max-w-4xl">
            <div className="mb-4">
              <Link href="/practice-areas" className="text-gold hover:text-gold-light inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Practice Areas
              </Link>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Special Needs Planning
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-semibold">
              Planning for your child's future
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-charcoal leading-relaxed mb-6">
                If you are a parent of a young or adult child with disabilities, you do not have to disinherit your child to protect his or her Medicaid or other government benefits related to their disability. At Muchnik Elder Law, we offer a range of planning options to help clients address the special needs of their children and maintain the support their children deserve.
              </p>
            </div>

            {/* CTA Box */}
            <div className="mt-12 bg-white rounded-xl p-8 md:p-12 shadow-lg border-t-4 border-gold">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-4">
                Protect Your Child's Future
              </h2>
              <p className="text-lg text-charcoal mb-6">
                Let us help you create a comprehensive plan that protects benefits while providing for your child's needs.
              </p>
              <Link href="/contact">
                <Button size="lg" className="text-base md:text-lg px-8 py-4">
                  Schedule a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Practice Areas */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy text-center mb-12">
            Related Practice Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link href="/practice-areas/elder-law" className="group">
              <div className="bg-cream rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
                <h3 className="font-heading text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                  Elder Law & Medicaid Planning
                </h3>
                <p className="text-charcoal">
                  Preserve assets and plan for long-term care needs.
                </p>
              </div>
            </Link>
            <Link href="/practice-areas/guardianships" className="group">
              <div className="bg-cream rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
                <h3 className="font-heading text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                  Guardianships
                </h3>
                <p className="text-charcoal">
                  Legal decision-making for those who cannot manage alone.
                </p>
              </div>
            </Link>
            <Link href="/practice-areas/estate-planning" className="group">
              <div className="bg-cream rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
                <h3 className="font-heading text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                  Estate Planning
                </h3>
                <p className="text-charcoal">
                  Comprehensive estate planning services.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

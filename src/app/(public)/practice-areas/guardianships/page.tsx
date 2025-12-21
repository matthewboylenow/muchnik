import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Guardianships',
  description:
    'Expert guardianship legal services in New York and New Jersey. Navigate the guardianship process with experienced attorneys.',
  openGraph: {
    title: 'Guardianships | Muchnik Elder Law P.C.',
    description: 'Expert guardianship legal services in New York and New Jersey.',
    images: ['/images/practice-areas/guardianships.jpg'],
  },
};

export default function GuardianshipsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/practice-areas/guardianships.jpg"
            alt="Guardianships"
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
              Guardianships
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-semibold">
              Helping loved ones accomplish what they cannot accomplish independently
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
                When an adult or child cannot manage their personal or financial affairs, a guardianship may be necessary to protect them.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                A guardianship is a legal proceeding in which a Court appoints someone to act as a decision-maker for a person who is unable to manage their own affairs as a direct result of some medical condition or physical infirmity. When a guardianship is appropriate the Court will appoint a Guardian to make personal or financial decisions on behalf of a disabled adult.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                Sometimes a guardianship proceeding is required when a young adult has serious developmental disabilities or traumatic brain injury. Sometimes a guardianship proceeding is required where formerly capable adults are no longer able to care for themselves or their property.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                We guide you through the decision of whether guardianship is appropriate and what type is needed—guardian of the person, guardian of the property, or both. We prepare and file all required court papers, appear at hearings, and work with medical and other professionals to present a clear picture of your loved one's needs.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                Once a guardian is appointed, we advise on ongoing responsibilities, including reporting, budgeting, and decision-making standards.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                Guardianship proceedings are complex and have important consequences. At Muchnik Elder Law, we will help you successfully navigate through the guardianship process and understand your responsibilities as a court-appointed guardian.
              </p>
            </div>

            {/* CTA Box */}
            <div className="mt-12 bg-white rounded-xl p-8 md:p-12 shadow-lg border-t-4 border-gold">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-4">
                Need Guidance on Guardianships?
              </h2>
              <p className="text-lg text-charcoal mb-6">
                Contact our experienced attorneys to discuss guardianship proceedings and your responsibilities.
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
            <Link href="/practice-areas/special-needs" className="group">
              <div className="bg-cream rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
                <h3 className="font-heading text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                  Special Needs Planning
                </h3>
                <p className="text-charcoal">
                  Planning for children with disabilities.
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

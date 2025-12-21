import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Medicaid Planning & Applications',
  description:
    'Expert guidance through the Medicaid eligibility process. Helping families navigate complex Medicaid rules and applications in New York and New Jersey.',
  openGraph: {
    title: 'Medicaid Planning & Applications | Muchnik Elder Law P.C.',
    description: 'Expert guidance through the Medicaid eligibility process for long-term care.',
    images: ['/images/practice-areas/medicaid-planning.jpg'],
  },
};

export default function MedicaidPlanningPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/practice-areas/medicaid-planning.jpg"
            alt="Medicaid Planning & Applications"
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
              Medicaid Planning & Applications
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-semibold">
              Expert guidance through the Medicaid eligibility process
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
                As a Firm, we are committed to making the Medicaid eligibility application process easy to grasp, so that individuals and families understand how their existing health care benefits work, helping them to gain the greatest possible benefits from their existing medical insurance and receive all of the medical benefits to which they are entitled.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                We also help clients and their families prepare for hospital discharge, home care services or nursing home admission. With advanced planning, problems can be identified and solved, eliminating delays, inconvenience and needless financial loss.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                Medicaid can be the key to affording long-term care, but the rules are notoriously complex and unforgiving. Our firm assists clients with proactive Medicaid planning as well as last-minute "crisis" planning when long-term care is suddenly needed. We help you legally restructure assets and income to meet eligibility requirements while preserving as much as possible for a spouse or family.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                From analyzing your financial picture and recommending Medicaid compliant transfers, we guide you through each step of the planning process. We pay close attention to look-back rules and potential penalties, helping you avoid costly missteps that can delay or jeopardize benefits.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                When it's time to file, we prepare and submit complete Medicaid applications, respond to agency inquiries, and represent you in fair hearings if needed. Our team coordinates with nursing homes, home care agencies, and financial institutions to streamline the process, reduce stress, and work toward timely approvals so you can focus on care rather than paperwork.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                At Muchnik Elder Law, our goal is not only to be your counsel and advocate, but also to serve as a link between you and your family and a network of physicians, home care agencies, nursing homes and providers of assisted living arrangements.
              </p>

              <p className="text-xl font-semibold text-navy">
                We help you gain the greatest benefit from your health care coverage at the lowest cost.
              </p>
            </div>

            {/* CTA Box */}
            <div className="mt-12 bg-white rounded-xl p-8 md:p-12 shadow-lg border-t-4 border-gold">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-4">
                Need Help with Medicaid Planning?
              </h2>
              <p className="text-lg text-charcoal mb-6">
                Schedule a consultation with our experienced Medicaid planning attorneys to discuss your eligibility and application options.
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
                  Elder Law & Asset Protection
                </h3>
                <p className="text-charcoal">
                  Safeguarding your lifetime savings from long-term care costs.
                </p>
              </div>
            </Link>
            <Link href="/practice-areas/estate-planning" className="group">
              <div className="bg-cream rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
                <h3 className="font-heading text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                  Estate Planning, Trusts & Wills
                </h3>
                <p className="text-charcoal">
                  Plan ahead for the best possible outcome for your family.
                </p>
              </div>
            </Link>
            <Link href="/practice-areas/special-needs" className="group">
              <div className="bg-cream rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
                <h3 className="font-heading text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                  Special Needs Planning
                </h3>
                <p className="text-charcoal">
                  Planning for your child's future while protecting benefits.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

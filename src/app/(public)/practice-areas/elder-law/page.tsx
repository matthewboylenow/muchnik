import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Elder Law & Medicaid Planning',
  description:
    'Expert Elder Law and Medicaid planning services to help preserve your assets and plan for long-term care. Over 30 years of experience serving New York and New Jersey.',
};

export default function ElderLawPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/practice-areas/elder-law.jpg"
            alt="Elder Law & Medicaid Planning"
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
              Elder Law & Medicaid Planning
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-semibold">
              Helping you keep more of what you've worked so hard for
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
                The cost of care to recuperate from an illness can deplete funds that took you a lifetime to put aside. But with a custom-tailored plan from Muchnik Elder Law, your assets can be preserved for you and for the people in your life who matter most.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                The best time to start thinking about financing long-term care is before incapacity or the need for nursing home care or home care arises. That way, you have the time to think about what's most important to you and your family . . . time to clear up problems while they are manageable, before they become major obstacles . . . and time to choose from a broad range of planning options.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                At Muchnik Elder Law, our goal is not only to be your counsel and advocate, but also to serve as a link between you and your family and a network of physicians, home care agencies, nursing homes and providers of assisted living arrangements.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                As a Firm, we are committed to making the Medicaid eligibility application process easy to grasp, so that individuals and families understand how their existing health care benefits work, helping them to gain the greatest possible benefits from their existing medical insurance and receive all of the medical benefits to which they are entitled.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                We also help clients and their families prepare for hospital discharge, home care services or nursing home admission. With advanced planning, problems can be identified and solved, eliminating delays, inconvenience and needless financial loss.
              </p>

              <p className="text-xl font-semibold text-navy">
                We help you gain the greatest benefit from your health care coverage at the lowest cost.
              </p>
            </div>

            {/* CTA Box */}
            <div className="mt-12 bg-white rounded-xl p-8 md:p-12 shadow-lg border-t-4 border-gold">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-4">
                Ready to Protect Your Assets?
              </h2>
              <p className="text-lg text-charcoal mb-6">
                Schedule a consultation with our experienced Elder Law attorneys to discuss your Medicaid planning and asset protection needs.
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
          </div>
        </div>
      </section>
    </div>
  );
}

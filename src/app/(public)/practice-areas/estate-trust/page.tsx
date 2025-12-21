import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Estate Administration & Probate',
  description:
    'Expert guidance for executors, administrators, trustees, and families navigating estate administration and probate. Achieve just and equitable results.',
  openGraph: {
    title: 'Estate Administration & Probate | Muchnik Elder Law P.C.',
    description: 'Expert guidance for executors, administrators, trustees, and families navigating estate administration and probate.',
    images: ['/images/practice-areas/estate-trust.jpg'],
  },
};

export default function EstateTrustPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/practice-areas/estate-trust.jpg"
            alt="Estate & Trust Settlement"
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
              Estate Administration & Probate
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-semibold">
              Achieving a just and equitable result
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
                Losing a loved one is difficult enough without the added burden of navigating the legal system alone. Our Estate Administration & Probate team guides executors, administrators, trustees, Attorneys-in-Fact, and families through every step of settling an estate. We handle the technical details and coordinate the distribution of real estate and other estate assets, allowing you to focus on your family and the grieving process.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                We assist with probating wills, obtaining appointments as executor or administrator, marshaling and valuing assets, paying valid debts and expenses, filing of any estate or inheritance tax returns, and making proper distributions to beneficiaries. Our firm also helps with non-probate assets, such as jointly held property and accounts with designated beneficiaries, to ensure nothing falls through the cracks.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                Whether an estate is straightforward or involves multiple properties, businesses, or cross-border assets, we provide efficient, organized, and transparent administration. We work to minimize delays and disputes. We keep executors, administrators, trustees and Attorneys-in-Fact informed about the full range of their fiduciary responsibilities to help them avoid personal liability while honoring the decedent's wishes.
              </p>
            </div>

            {/* CTA Box */}
            <div className="mt-12 bg-white rounded-xl p-8 md:p-12 shadow-lg border-t-4 border-gold">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-4">
                Need Estate Settlement Guidance?
              </h2>
              <p className="text-lg text-charcoal mb-6">
                Let us help you navigate the estate settlement process with confidence and clarity.
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
                  Estate Planning
                </h3>
                <p className="text-charcoal">
                  Plan ahead to simplify estate settlement.
                </p>
              </div>
            </Link>
            <Link href="/practice-areas/tax-law" className="group">
              <div className="bg-cream rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
                <h3 className="font-heading text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                  Tax Law
                </h3>
                <p className="text-charcoal">
                  Minimize tax liabilities during estate settlement.
                </p>
              </div>
            </Link>
            <Link href="/practice-areas/real-estate" className="group">
              <div className="bg-cream rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
                <h3 className="font-heading text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                  Real Estate
                </h3>
                <p className="text-charcoal">
                  Coordinate real estate transfers and sales.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

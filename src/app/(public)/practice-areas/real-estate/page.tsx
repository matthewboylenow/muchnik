import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Real Estate Law',
  description:
    'Comprehensive real estate legal services for buying and selling property. Experienced attorneys guiding you through every transaction.',
};

export default function RealEstatePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/practice-areas/real-estate.jpg"
            alt="Real Estate Law"
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
              Real Estate
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-semibold">
              For the best possible outcome, don't buy/sell your home alone
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
                From the time you make your decision to buy or sell your home (or other property) to the time you get to the closing day, there are a number of important decisions that you must make which have legal consequences. Whether you are buying or selling, it is critical that you are represented by an attorney.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                In a real estate transaction, an attorney's responsibilities may include a consultation prior to signing of the contract, preparation of the contract, attorney review and modification of the contract, title examination and certification, preparation of closing and transfer documents, presiding over the closing and recording the closing documents (e.g. deed, mortgage etc.).
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                At Muchnik Elder Law, we will educate you on your rights and options so that you can take the appropriate steps to investigate your transaction and gain the peace of mind that comes from making an informed decision.
              </p>
            </div>

            {/* CTA Box */}
            <div className="mt-12 bg-white rounded-xl p-8 md:p-12 shadow-lg border-t-4 border-gold">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-4">
                Need Real Estate Legal Support?
              </h2>
              <p className="text-lg text-charcoal mb-6">
                Let our experienced real estate attorneys guide you through your property transaction.
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
                  Plan for the transfer of real property.
                </p>
              </div>
            </Link>
            <Link href="/practice-areas/business-planning" className="group">
              <div className="bg-cream rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
                <h3 className="font-heading text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                  Business Planning
                </h3>
                <p className="text-charcoal">
                  Commercial property and business transactions.
                </p>
              </div>
            </Link>
            <Link href="/practice-areas/tax-law" className="group">
              <div className="bg-cream rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
                <h3 className="font-heading text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                  Tax Law
                </h3>
                <p className="text-charcoal">
                  Tax implications of real estate transactions.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Estate Planning, Trusts & Wills',
  description:
    'Comprehensive estate planning services including wills, trusts, and advance directives. Protect your legacy with expert legal guidance.',
};

export default function EstatePlanningPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/practice-areas/estate-planning.jpg"
            alt="Estate Planning, Trusts & Wills"
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
              Estate Planning, Trusts & Wills
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-semibold">
              For the best possible outcome, it pays to plan ahead
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
                Whatever your individual or family situation, we offer a full range of services designed to help you. These services include estate planning such as creating wills, trusts and advance directives such as powers of attorney, health care proxies and living wills.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                At Muchnik Elder Law, we also inform as to estate and gift tax reduction strategies – as well as strategies that can help you name beneficiaries and identify the best distribution options for estates, retirement accounts, life insurance and family businesses.
              </p>

              <p className="text-xl font-semibold text-navy">
                We help clients plan for what they have to do, so they are free to do what they really want to do.
              </p>
            </div>

            {/* Services Box */}
            <div className="mt-12 bg-gradient-to-br from-navy to-navy-light text-white rounded-xl p-8 md:p-12">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                Our Estate Planning Services Include:
              </h2>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Wills and trusts creation</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Powers of attorney and health care proxies</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Estate and gift tax reduction strategies</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Beneficiary designation and distribution planning</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Retirement account and life insurance planning</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Family business succession planning</span>
                </li>
              </ul>
            </div>

            {/* CTA Box */}
            <div className="mt-12 bg-white rounded-xl p-8 md:p-12 shadow-lg border-t-4 border-gold">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-4">
                Start Planning Your Estate Today
              </h2>
              <p className="text-lg text-charcoal mb-6">
                Schedule a consultation with our experienced estate planning attorneys to secure your family's future.
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
            <Link href="/practice-areas/estate-trust" className="group">
              <div className="bg-cream rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
                <h3 className="font-heading text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                  Estate & Trust Settlement
                </h3>
                <p className="text-charcoal">
                  Assistance with estate administration and distribution.
                </p>
              </div>
            </Link>
            <Link href="/practice-areas/tax-law" className="group">
              <div className="bg-cream rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
                <h3 className="font-heading text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                  Tax Law
                </h3>
                <p className="text-charcoal">
                  Reduce or eliminate estate and capital gains taxes.
                </p>
              </div>
            </Link>
            <Link href="/practice-areas/business-planning" className="group">
              <div className="bg-cream rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
                <h3 className="font-heading text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                  Business Planning
                </h3>
                <p className="text-charcoal">
                  Business formation and succession planning services.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

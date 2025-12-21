import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Estate Litigation & Will Contests',
  description:
    'Protecting your rights in contested estate matters. Experienced representation in will contests, trust disputes, and estate litigation in NY & NJ.',
  openGraph: {
    title: 'Estate Litigation & Will Contests | Muchnik Elder Law P.C.',
    description: 'Experienced representation in will contests, trust disputes, and contested estate matters.',
    images: ['/images/practice-areas/estate-litigation.jpg'],
  },
};

export default function EstateLitigationPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/practice-areas/estate-litigation.jpg"
            alt="Estate Litigation & Will Contests"
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
              Estate Litigation & Will Contests
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-semibold">
              Protecting your rights in contested estate matters
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
                Disputes involving a loved one's estate can be emotionally charged and financially significant. Our attorneys represent beneficiaries, executors, administrators, trustees, and family members in contested matters. We handle will contests, trust disputes, claims of undue influence or incapacity, accounting proceedings, and breach of fiduciary duty cases.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                We begin with a careful analysis of the facts, documents, and medical and financial records to evaluate the strength of your position. When possible, we pursue negotiated resolutions or mediation to save time, money, and family relationships. However, when litigation is necessary, we are prepared to advocate aggressively in Surrogate's Court and other courts on your behalf.
              </p>

              <p className="text-lg text-charcoal leading-relaxed mb-6">
                Because we have a deep experience in estate planning and administration, we understand both the legal nuances and the human dynamics that often drive these conflicts. Our goal is to protect your rights, safeguard estate assets, and achieve a result that reflects both the law and the realities facing your family.
              </p>
            </div>

            {/* CTA Box */}
            <div className="mt-12 bg-white rounded-xl p-8 md:p-12 shadow-lg border-t-4 border-gold">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-4">
                Facing an Estate Dispute?
              </h2>
              <p className="text-lg text-charcoal mb-6">
                Schedule a consultation with our experienced estate litigation attorneys to discuss your case and legal options.
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
                  Estate Administration & Probate
                </h3>
                <p className="text-charcoal">
                  Achieving a just and equitable result in estate settlement.
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

import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { practiceAreas } from '@/data/practiceAreas';
import { Card, CardTitle, CardContent } from '@/components/ui/Card';
import { FadeIn } from '@/components/ui/FadeIn';
import { ClientMap } from '@/components/ui/ClientMap';
import { locations } from '@/data/locations';
import Image from 'next/image';
import { HomeHero } from '@/components/sections/HomeHero';

export const metadata: Metadata = {
  title: 'Muchnik Elder Law P.C. | Elder Law & Estate Planning Attorneys in NY & NJ',
  description:
    'For over 30 years, Muchnik Elder Law P.C., together with its predecessor firms, has provided expert legal guidance in elder law, Medicaid planning, estate planning, probate, and guardianships. Serving families in New York and New Jersey.',
  openGraph: {
    title: 'Muchnik Elder Law P.C. | Elder Law & Estate Planning Attorneys in NY & NJ',
    description:
      'For over 30 years, Muchnik Elder Law P.C., together with its predecessor firms, has provided expert legal guidance in elder law, Medicaid planning, estate planning, probate, and guardianships.',
    url: 'https://muchnikelderlaw.com',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Muchnik Elder Law P.C.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muchnik Elder Law P.C. | Elder Law & Estate Planning Attorneys',
    description:
      'Expert elder law, Medicaid planning, estate planning, probate, and guardianship attorneys serving NY & NJ for over 30 years.',
    images: ['/og-image.jpg'],
  },
};

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <HomeHero />

      {/* Practice Areas Preview */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-4">
                Comprehensive Elder Law & Estate Planning Services
              </h2>
              <p className="text-lg text-charcoal max-w-2xl mx-auto">
                From Medicaid planning and guardianships to wills, trusts, and estate administration—we provide the legal expertise you need to protect your family and assets.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.slice(0, 6).map((area, index) => {
              // Define icons for each practice area
              const getIcon = (id: string) => {
                switch (id) {
                  case 'elder-law':
                    return (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                      </svg>
                    );
                  case 'medicaid-planning':
                    return (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-5-8h4m-4 4h4m4-4h.01M19 16h.01M16 8h.01M16 16h.01M7 8h.01M7 16h.01M3 9a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    );
                  case 'estate-planning':
                    return (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    );
                  case 'estate-trust':
                    return (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    );
                  case 'estate-litigation':
                    return (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M3 10h18M12 3l9 7H3l9-7zM7 10v11M12 10v11M17 10v11" />
                      </svg>
                    );
                  case 'special-needs':
                    return (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    );
                  case 'guardianships':
                    return (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    );
                  case 'real-estate':
                    return (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    );
                  default:
                    return null;
                }
              };

              return (
                <FadeIn key={area.id} delay={index * 0.1}>
                  <Card className="hover:shadow-xl transition-shadow h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center text-white">
                      {getIcon(area.id)}
                    </div>
                    <CardTitle className="flex-1 mt-2">{area.title}</CardTitle>
                  </div>
                  <CardContent>
                    <p className="text-warm-gray mb-4">{area.shortDescription}</p>
                    <Link
                      href={`/practice-areas/${area.id}`}
                      className="text-gold hover:text-gold-dark font-medium inline-flex items-center gap-1"
                    >
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </CardContent>
                </Card>
                </FadeIn>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/practice-areas">
              <Button variant="secondary" size="lg">
                View All Practice Areas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Veterans Discount Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="relative bg-gradient-to-br from-burgundy to-burgundy/90 text-white rounded-2xl p-8 md:p-12 lg:p-16 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 overflow-hidden">
                <Image
                  src="/images/Flag_of_the_United_States.png"
                  alt="American Flag"
                  width={52}
                  height={36}
                  className="object-contain"
                />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Honoring Those Who Served
              </h2>
              <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
                In recognition of the work of Gary W. Johnson, Esq., a veteran who served in Vietnam, and in recognition of the men and women who have served in the U.S. Armed Services, Muchnik Elder Law P.C. offers a 20% discount to Veterans on estate planning services.
              </p>
              <Link href="/contact">
                <Button variant="primary" size="lg" className="text-base md:text-lg px-8 py-4">
                  Contact Us Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-cream-dark">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6">
                Why Choose Our Elder Law Firm?
              </h2>
              <p className="text-lg md:text-xl text-charcoal max-w-3xl mx-auto">
                With over 30 years of combined experience, together with our predecessor firms, we provide personalized legal solutions in elder law and estate planning that protect what matters most to you and your family.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-navy mb-3">Excellent Communication</h3>
              <p className="text-charcoal leading-relaxed">
                Direct staff access during business hours with prompt callbacks. We keep you informed every step of the way.
              </p>
            </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-navy mb-3">Transparent Retainers</h3>
              <p className="text-charcoal leading-relaxed">
                Good faith estimates with immediate notification of any changes. No surprises, just honest pricing.
              </p>
            </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-navy mb-3">One-on-One Servicing</h3>
              <p className="text-charcoal leading-relaxed">
                We treat each client as an individual with unique legal challenges requiring personalized solutions.
              </p>
            </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-navy mb-3">One Stop for Your Family</h3>
              <p className="text-charcoal leading-relaxed">
                Multi-generational representation when no conflicts exist, serving your entire family's legal needs.
              </p>
            </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Locations Map Section */}
      <section className="bg-white">
        <div className="w-full">
          <div className="text-center py-12 bg-cream">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-4">
              Elder Law Attorneys Serving NY & NJ
            </h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              Conveniently located in Staten Island (NY), Manhattan (NY) and Randolph (NJ). Our experienced attorneys are ready to help with your elder law and estate planning needs.
            </p>
          </div>
          <ClientMap
            locations={locations}
            zoom={9}
            height="500px"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-navy text-white">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Schedule Your Free Consultation Today
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Get expert legal guidance for Medicaid planning, estate planning, probate, guardianships, and more. Our experienced attorneys serve clients throughout New York and New Jersey.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Schedule Your Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

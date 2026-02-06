import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { practiceAreas } from '@/data/practiceAreas';
import { Card, CardTitle, CardContent } from '@/components/ui/Card';
import { FadeIn } from '@/components/ui/FadeIn';
import { RotatingBackground } from '@/components/ui/RotatingBackground';
import { ClientMap } from '@/components/ui/ClientMap';
import { locations } from '@/data/locations';

export const metadata: Metadata = {
  title: 'Muchnik Elder Law P.C. | Elder Law & Estate Planning Attorneys in NY & NJ',
  description:
    'For over 30 years, Muchnik Elder Law P.C. has provided expert legal guidance in elder law, Medicaid planning, estate planning, probate, and guardianships. Serving Staten Island, Manhattan, and Randolph, NJ.',
  openGraph: {
    title: 'Muchnik Elder Law P.C. | Elder Law & Estate Planning Attorneys in NY & NJ',
    description:
      'For over 30 years, Muchnik Elder Law P.C. has provided expert legal guidance in elder law, Medicaid planning, estate planning, probate, and guardianships.',
    url: 'https://muchnikelderlaw.com',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Muchnik Elder Law P.C.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muchnik Elder Law P.C. | Elder Law & Estate Planning Attorneys',
    description:
      'Expert elder law, Medicaid planning, estate planning, and guardianship attorneys serving NY & NJ for over 30 years.',
    images: ['/og-image.jpg'],
  },
};

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full overflow-hidden">
            <RotatingBackground
              images={[
                '/images/hero/homepage/Staten-Island-Ferry.jpg',
                '/images/hero/homepage/NY-Appellate-Division-Court.jpg',
                '/images/hero/homepage/Photoshopped-IMG-0797-3-2-scaled.jpg'
              ]}
              alt="Muchnik Elder Law"
              interval={6000}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative container-custom py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="mb-6">
              <span className="inline-block text-gold text-sm md:text-base font-semibold tracking-wider uppercase mb-4">
                Experience Matters
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Experienced Elder Law & Estate Planning Attorneys in NY & NJ
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-100 leading-relaxed">
              For over 30 years, Muchnik Elder Law P.C. has provided expert legal guidance in elder law, Medicaid planning, estate planning, probate, and guardianships. Serving Staten Island, Manhattan, and Randolph, NJ with compassionate, personalized legal services.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" variant="primary" className="text-base md:text-lg px-8 py-4">
                  Schedule a Free Consultation
                </Button>
              </Link>
              <Link href="/practice-areas">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-navy text-base md:text-lg px-8 py-4">
                  Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 md:h-16 fill-cream" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ transform: 'scaleY(-1)' }}>
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>

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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
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
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Honoring Those Who Served
              </h2>
              <p className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto">
                Veterans receive 20% off estate planning services in recognition of their service to our nation.
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
                With over 30 years of experience in elder law and estate planning, we provide personalized legal solutions that protect what matters most to you and your family.
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
              <h3 className="font-heading text-xl font-bold text-navy mb-3">Family-Focused Approach</h3>
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
              Conveniently located in Staten Island, Manhattan, and Randolph, NJ. Our experienced attorneys are ready to help with your elder law and estate planning needs.
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
            Schedule Your Free Elder Law Consultation Today
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Get expert legal guidance for Medicaid planning, estate planning, guardianships, and more. Our experienced attorneys serve clients throughout New York and New Jersey.
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

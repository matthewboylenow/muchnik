import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { practiceAreas } from '@/data/practiceAreas';
import { Card, CardTitle, CardContent } from '@/components/ui/Card';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <img
              src="/images/hero/elderly-couple.jpg"
              alt="Elderly couple"
              className="w-full h-full object-cover"
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
              Helping Clients Make the Right Decisions
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-100 leading-relaxed">
              For more than 30 years, Muchnik Elder Law P.C. has worked with clients at crucial times in their lives. We provide straightforward answers to our clients' questions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" variant="primary" className="text-base md:text-lg px-8 py-4">
                  Schedule a Consultation
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
          <svg className="w-full h-12 md:h-16 fill-cream" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Practice Areas Preview */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-4">
              Our Practice Areas
            </h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              We offer comprehensive legal services to protect you, your family, and your assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.slice(0, 6).map((area) => (
              <Card key={area.id} className="hover:shadow-xl transition-shadow">
                <CardTitle className="mb-3">{area.title}</CardTitle>
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
            ))}
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
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6">
              Why Choose Muchnik Elder Law?
            </h2>
            <p className="text-lg md:text-xl text-charcoal max-w-3xl mx-auto">
              We are committed to providing exceptional legal services with a personal touch. Here's what sets us apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
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

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
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

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
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

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-navy text-white">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Protect Your Future?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Contact us today for a consultation. We're here to help you navigate your legal needs
            with compassion and expertise.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Schedule Your Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

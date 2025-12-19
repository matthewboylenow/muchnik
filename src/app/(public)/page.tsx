import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { practiceAreas } from '@/data/practiceAreas';
import { Card, CardTitle, CardContent } from '@/components/ui/Card';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-navy text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Experienced Elder Law & Estate Planning Attorneys
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              For more than 30 years, Muchnik Elder Law P.C. has helped families navigate the
              complexities of Elder Law, Medicaid Planning, Estate Planning, and Guardianships
              across New York and New Jersey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" variant="primary">
                  Schedule a Consultation
                </Button>
              </Link>
              <Link href="/practice-areas">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
                  Our Services
                </Button>
              </Link>
            </div>
          </div>
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
                    href={`/practice-areas#${area.id}`}
                    className="text-gold hover:text-gold-dark font-medium"
                  >
                    Learn More →
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
          <div className="bg-burgundy text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Veterans Discount Available
            </h2>
            <p className="text-xl mb-6">
              We honor those who have served. Veterans receive a 10% discount on all services.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-cream-dark">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-4">
              Why Choose Muchnik Elder Law?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-navy mb-3">30+ Years Experience</h3>
              <p className="text-charcoal">
                Decades of proven expertise in Elder Law and Estate Planning.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-navy mb-3">Personalized Service</h3>
              <p className="text-charcoal">
                We take the time to understand your unique situation and goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-navy mb-3">Three Convenient Locations</h3>
              <p className="text-charcoal">
                Serving clients in Staten Island, Manhattan, and New Jersey.
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

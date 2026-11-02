import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { guides } from '@/data/guides';
import { Card, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Books & Guides',
  description:
    'Download free books and guides from Muchnik Elder Law P.C. on Elder Law, Estate Planning, Medicaid Planning, and protecting your family in New York and New Jersey.',
  openGraph: {
    title: 'Books & Guides | Muchnik Elder Law P.C.',
    description:
      'Download free books and guides from Muchnik Elder Law P.C. on Elder Law, Estate Planning, Medicaid Planning, and protecting your family in New York and New Jersey.',
    url: 'https://www.muchnikelderlaw.com/books-guides',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Muchnik Elder Law P.C. Books & Guides' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Books & Guides | Muchnik Elder Law P.C.',
    description:
      'Download free books and guides from Muchnik Elder Law P.C. on Elder Law, Estate Planning, Medicaid Planning, and protecting your family.',
    images: ['/og-image.jpg'],
  },
};

export default function BooksGuidesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent"></div>
        </div>
        <div className="relative container-custom py-20 md:py-28">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Books &amp; Guides
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
              Free resources from our attorneys to help you understand Elder Law, Estate
              Planning, and Medicaid Planning, and make informed decisions for your family.
            </p>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          {guides.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-charcoal">
                New books and guides are on the way. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {guides.map((guide) => (
                <Card key={guide.id} className="overflow-hidden">
                  <div
                    className={`grid grid-cols-1 ${
                      guide.cover ? 'md:grid-cols-[240px,1fr]' : ''
                    } gap-8`}
                  >
                    {guide.cover && (
                      <div className="flex justify-center md:justify-start">
                        <a
                          href={guide.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-56 rounded-lg overflow-hidden shadow-lg"
                        >
                          <Image
                            src={guide.cover}
                            alt={`${guide.title} cover`}
                            width={935}
                            height={1210}
                            sizes="224px"
                            className="w-full h-auto"
                          />
                        </a>
                      </div>
                    )}

                    <div>
                      <CardTitle className="text-2xl mb-2">{guide.title}</CardTitle>
                      {(guide.author || guide.edition) && (
                        <p className="text-gold font-semibold mb-4">
                          {[guide.author, guide.edition].filter(Boolean).join(' · ')}
                        </p>
                      )}
                      <CardContent>
                        {guide.description.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                        <div className="flex flex-wrap gap-4 mt-6">
                          <a href={guide.file} target="_blank" rel="noopener noreferrer">
                            <Button>Read Online</Button>
                          </a>
                          <a href={guide.file} download>
                            <Button variant="outline">Download PDF</Button>
                          </a>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-navy text-white">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Have Questions About Your Situation?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Our guides are a starting point. For advice tailored to your family, schedule a
            free consultation with one of our attorneys.
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

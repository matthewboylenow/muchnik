import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div>
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="relative container-custom py-20 md:py-28">
          <div className="max-w-4xl">
            <p className="text-gold font-semibold mb-4">404</p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Page Not Found
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
              The page you're looking for may have been moved or no longer
              exists.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="max-w-2xl">
            <p className="text-lg text-charcoal mb-8">
              Here are some helpful places to start instead, or contact our
              office and we'll be glad to point you in the right direction.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/">
                <Button>Return Home</Button>
              </Link>
              <Link href="/practice-areas">
                <Button variant="outline">Practice Areas</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

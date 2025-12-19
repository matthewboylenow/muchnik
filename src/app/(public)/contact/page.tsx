import { Metadata } from 'next';
import { ContactForm } from '@/components/sections/ContactForm';
import { locations } from '@/data/locations';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Muchnik Elder Law P.C. for a consultation. We have offices in Staten Island, Manhattan, and New Jersey.',
};

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-navy text-white py-16">
        <div className="container-custom">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Schedule a consultation with our experienced attorneys. We have three convenient
            locations to serve you.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-navy mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-navy mb-6">Our Locations</h2>

              <div className="space-y-8">
                {locations.map((location) => (
                  <div key={location.id} className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="font-heading text-xl font-bold text-navy mb-3">
                      {location.name}
                    </h3>
                    <div className="space-y-2 text-charcoal">
                      <p>{location.address}</p>
                      {location.addressLine2 && <p>{location.addressLine2}</p>}
                      <p>
                        {location.city}, {location.state} {location.zip}
                      </p>
                      <p className="pt-2">
                        <strong>Phone:</strong>{' '}
                        <a
                          href={`tel:${location.phoneRaw}`}
                          className="text-gold hover:text-gold-dark"
                        >
                          {location.phone}
                        </a>
                      </p>
                      <p>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `${location.address}, ${location.city}, ${location.state} ${location.zip}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold hover:text-gold-dark inline-flex items-center gap-1"
                        >
                          Get Directions →
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-burgundy text-white rounded-lg p-6">
                <h3 className="font-heading text-xl font-bold mb-3">
                  Veterans Discount Available
                </h3>
                <p>
                  We honor those who have served. Veterans receive a 10% discount on all services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

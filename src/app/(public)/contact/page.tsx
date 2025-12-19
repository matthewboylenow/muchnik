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
                  <div key={location.id} className="bg-white rounded-xl overflow-hidden shadow-lg">
                    {/* Map Embed */}
                    <div className="h-64 w-full">
                      <iframe
                        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=${encodeURIComponent(
                          `${location.address}, ${location.city}, ${location.state} ${location.zip}`
                        )}&zoom=15`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Map of ${location.name}`}
                      />
                    </div>

                    {/* Location Details */}
                    <div className="p-6">
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
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `${location.address}, ${location.city}, ${location.state} ${location.zip}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-gold hover:text-gold-dark font-semibold pt-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Get Directions
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-br from-burgundy to-burgundy/90 text-white rounded-xl p-6 md:p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold mb-2">
                      Veterans Discount Available
                    </h3>
                    <p className="text-lg">
                      We honor those who have served. Veterans receive 20% off estate planning services in recognition of their service to our nation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

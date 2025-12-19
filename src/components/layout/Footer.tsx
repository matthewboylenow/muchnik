import Link from 'next/link';
import { locations, firmInfo } from '@/data/locations';
import { navigation } from '@/data/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Firm Info */}
          <div>
            <h3 className="font-heading text-lg font-bold text-gold mb-4">
              {firmInfo.name}
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              For more than 30 years, we have helped families with Elder Law, Medicaid Planning,
              Estate Planning, and Guardianships across New York and New Jersey.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <a href={`mailto:${firmInfo.email}`} className="hover:text-gold transition-colors">
                  {firmInfo.email}
                </a>
              </p>
              <p>Fax: {firmInfo.fax}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold text-gold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-lg font-bold text-gold mb-4">Our Locations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {locations.map((location) => (
                <div key={location.id} className="text-sm">
                  <p className="font-semibold text-white mb-1">{location.name}</p>
                  <p className="text-gray-300">{location.address}</p>
                  {location.addressLine2 && (
                    <p className="text-gray-300">{location.addressLine2}</p>
                  )}
                  <p className="text-gray-300">
                    {location.city}, {location.state} {location.zip}
                  </p>
                  <a
                    href={`tel:${location.phoneRaw}`}
                    className="text-gold hover:text-gold-light transition-colors"
                  >
                    {location.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-navy-light text-center text-sm text-gray-400">
          <p>
            © {currentYear} {firmInfo.name}. All rights reserved.
          </p>
          <p className="mt-2">
            Attorney Advertising. Prior results do not guarantee a similar outcome.
          </p>
        </div>
      </div>
    </footer>
  );
}

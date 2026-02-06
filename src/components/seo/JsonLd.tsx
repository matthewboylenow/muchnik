import { locations, firmInfo } from '@/data/locations';

export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: firmInfo.name,
    description:
      'Elder Law, Estate Planning, Medicaid Planning, Probate, and Guardianship attorneys serving New York and New Jersey for over 30 years.',
    url: 'https://muchnikelderlaw.com',
    telephone: locations[0].phone,
    email: firmInfo.email,
    faxNumber: firmInfo.fax,
    address: locations.map((loc) => ({
      '@type': 'PostalAddress',
      streetAddress: `${loc.address}${
        loc.addressLine2 ? ', ' + loc.addressLine2 : ''
      }`,
      addressLocality: loc.city,
      addressRegion: loc.state,
      postalCode: loc.zip,
      addressCountry: 'US',
    })),
    geo: locations.map((loc) => ({
      '@type': 'GeoCoordinates',
      latitude: loc.coordinates.lat,
      longitude: loc.coordinates.lng,
    })),
    areaServed: [
      { '@type': 'State', name: 'New York' },
      { '@type': 'State', name: 'New Jersey' },
    ],
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BlogPostJsonLd({
  title,
  description,
  publishedAt,
  updatedAt,
  authorName,
  imageUrl,
}: {
  title: string;
  description: string;
  publishedAt: Date;
  updatedAt: Date;
  authorName?: string;
  imageUrl?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: publishedAt.toISOString(),
    dateModified: updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: authorName || 'Muchnik Elder Law P.C.',
    },
    publisher: {
      '@type': 'Organization',
      name: firmInfo.name,
      logo: {
        '@type': 'ImageObject',
        url: 'https://muchnikelderlaw.com/images/logo.png',
      },
    },
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AccessibilityWidget } from '@/components/accessibility/AccessibilityWidget';
import { FathomAnalytics } from '@/components/analytics/FathomAnalytics';
import { LocalBusinessJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://muchnikelderlaw.com'),
  title: {
    default: 'Muchnik Elder Law P.C. | Elder Law & Estate Planning Attorneys',
    template: '%s | Muchnik Elder Law P.C.',
  },
  description:
    'For more than 30 years, Muchnik Elder Law P.C. has helped families with Elder Law, Medicaid Planning, Estate Planning, and Guardianships across New York and New Jersey.',
  keywords: [
    'elder law attorney',
    'estate planning lawyer',
    'medicaid planning',
    'guardianship lawyer',
    'Staten Island elder law',
    'Manhattan estate attorney',
    'New Jersey elder law',
    'wills and trusts',
    'special needs planning',
  ],
  authors: [{ name: 'Muchnik Elder Law P.C.' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://muchnikelderlaw.com',
    siteName: 'Muchnik Elder Law P.C.',
    title: 'Muchnik Elder Law P.C. | Elder Law & Estate Planning Attorneys',
    description:
      'For more than 30 years, Muchnik Elder Law P.C. has helped families with Elder Law, Medicaid Planning, Estate Planning, and Guardianships.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Muchnik Elder Law P.C.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muchnik Elder Law P.C.',
    description: 'Elder Law & Estate Planning Attorneys serving NY & NJ',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <LocalBusinessJsonLd />
      </head>
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <AccessibilityWidget />
        <FathomAnalytics />
        <Analytics />
      </body>
    </html>
  );
}

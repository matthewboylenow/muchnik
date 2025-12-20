'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    fathom?: {
      trackPageview: (opts?: { url?: string; referrer?: string }) => void;
      trackEvent: (eventName: string, opts?: { _value?: number }) => void;
    };
  }
}

function FathomScript() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const siteId = process.env.NEXT_PUBLIC_FATHOM_SITE_ID;

  useEffect(() => {
    // Load Fathom script
    if (siteId && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.usefathom.com/script.js';
      script.setAttribute('data-site', siteId);
      script.setAttribute('defer', 'true');
      document.head.appendChild(script);
    }
  }, [siteId]);

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined' && window.fathom) {
      window.fathom.trackPageview();
    }
  }, [pathname, searchParams]);

  return null;
}

export function FathomAnalytics() {
  return (
    <Suspense fallback={null}>
      <FathomScript />
    </Suspense>
  );
}

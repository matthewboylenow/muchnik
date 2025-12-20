'use client';

import { useState } from 'react';

export default function AnalyticsPage() {
  const siteId = process.env.NEXT_PUBLIC_FATHOM_SITE_ID;
  const [password, setPassword] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);

  // Fathom embed requires a password for shared dashboards
  // You'll need to set this up in Fathom: Settings -> Sites -> [Your Site] -> Sharing

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      setShowDashboard(true);
    }
  };

  if (!siteId) {
    return (
      <div className="max-w-4xl">
        <h1 className="text-3xl font-heading font-bold text-navy mb-6">
          Analytics
        </h1>
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg">
          <p className="font-medium mb-2">Fathom Analytics not configured</p>
          <p className="text-sm">
            Please add your Fathom Site ID to the environment variables (NEXT_PUBLIC_FATHOM_SITE_ID)
            to enable analytics tracking and dashboard viewing.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-navy mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-warm-gray">
          View your website analytics powered by Fathom Analytics
        </p>
      </div>

      {!showDashboard ? (
        <div className="max-w-md">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-heading font-semibold text-navy mb-4">
              Access Analytics Dashboard
            </h2>
            <p className="text-sm text-warm-gray mb-4">
              To view the analytics dashboard, you need to enable sharing in your Fathom account:
            </p>
            <ol className="text-sm text-warm-gray space-y-2 mb-6 list-decimal list-inside">
              <li>Log in to Fathom Analytics</li>
              <li>Go to Settings → Sites → Your Site</li>
              <li>Click on "Sharing" tab</li>
              <li>Enable "Share via link" and set a password</li>
              <li>Copy the share password and enter it below</li>
            </ol>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Dashboard Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Fathom share password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View Dashboard
              </button>
            </form>

            <div className="mt-6 p-4 bg-cream rounded-lg">
              <p className="text-xs text-warm-gray">
                <strong>Alternative:</strong> You can also view your analytics directly on{' '}
                <a
                  href="https://app.usefathom.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  Fathom Analytics
                </a>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <span className="text-sm text-warm-gray">
              Showing analytics for site: {siteId}
            </span>
            <button
              onClick={() => setShowDashboard(false)}
              className="text-sm text-warm-gray hover:text-charcoal"
            >
              Change Password
            </button>
          </div>
          <iframe
            src={`https://app.usefathom.com/share/${siteId}/analytics?password=${encodeURIComponent(password)}`}
            title="Fathom Analytics Dashboard"
            className="w-full h-[calc(100vh-300px)] border-0"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}

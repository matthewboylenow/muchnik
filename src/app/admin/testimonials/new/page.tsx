'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewTestimonialPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [source, setSource] = useState('');

  async function handleSubmit(published: boolean) {
    if (!name || !text) {
      setError('Name and review text are required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, text, date, source, published }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create testimonial');
      }

      router.push('/admin/testimonials');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-navy mb-8">New Testimonial</h1>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              placeholder="e.g. John D."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Rating *</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`w-10 h-10 rounded-lg border-2 font-bold ${
                    star <= rating
                      ? 'bg-gold text-white border-gold'
                      : 'bg-white text-gray-400 border-gray-200 hover:border-gold'
                  }`}
                >
                  {star}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Review Text *</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              placeholder="The review text..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              placeholder="e.g. January 2024"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Source</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
            >
              <option value="">Select source...</option>
              <option value="Google">Google</option>
              <option value="Avvo">Avvo</option>
              <option value="Yelp">Yelp</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => handleSubmit(false)}
            disabled={saving}
            className="px-4 py-2 border border-navy text-navy rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button
            onClick={() => handleSubmit(true)}
            disabled={saving}
            className="px-4 py-2 bg-gold text-white rounded-lg font-semibold hover:bg-gold-dark disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save & Publish'}
          </button>
        </div>
      </div>
    </div>
  );
}

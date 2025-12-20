'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface UnsplashPhoto {
  id: string;
  description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
    username: string;
    link: string;
  };
  links: {
    download: string;
    html: string;
  };
}

interface UnsplashPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string, attribution: string) => void;
}

export function UnsplashPicker({ isOpen, onClose, onSelect }: UnsplashPickerProps) {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (isOpen && query) {
      searchPhotos(query, 1);
    }
  }, [query, isOpen]);

  const searchPhotos = async (searchQuery: string, pageNum: number) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/unsplash/search?query=${encodeURIComponent(searchQuery)}&page=${pageNum}&perPage=12`
      );

      if (!res.ok) {
        throw new Error('Failed to search images');
      }

      const data = await res.json();

      if (pageNum === 1) {
        setPhotos(data.photos);
      } else {
        setPhotos((prev) => [...prev, ...data.photos]);
      }

      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchPhotos(query, 1);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      searchPhotos(query, page + 1);
    }
  };

  const handleSelectPhoto = (photo: UnsplashPhoto) => {
    const attribution = `Photo by <a href="${photo.user.link}?utm_source=muchnik_elder_law&utm_medium=referral" target="_blank" rel="noopener noreferrer">${photo.user.name}</a> on <a href="https://unsplash.com?utm_source=muchnik_elder_law&utm_medium=referral" target="_blank" rel="noopener noreferrer">Unsplash</a>`;
    onSelect(photo.urls.regular, attribution);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-heading font-bold text-navy">
            Search Unsplash
          </h2>
          <button
            onClick={onClose}
            className="text-warm-gray hover:text-charcoal transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search Form */}
        <div className="p-4 border-b border-gray-200">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for images..."
              className="flex-1"
            />
            <Button type="submit" disabled={loading || !query.trim()}>
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-4 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Photos Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {photos.length === 0 && !loading && query && (
            <div className="text-center text-warm-gray py-8">
              No images found. Try a different search term.
            </div>
          )}

          {photos.length === 0 && !loading && !query && (
            <div className="text-center text-warm-gray py-8">
              Enter a search term to find images
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <button
                key={photo.id}
                onClick={() => handleSelectPhoto(photo)}
                className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 hover:opacity-90 transition-opacity"
              >
                <img
                  src={photo.urls.small}
                  alt={photo.description || 'Unsplash photo'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-end p-2">
                  <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity truncate">
                    by {photo.user.name}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Load More */}
          {hasMore && photos.length > 0 && (
            <div className="text-center mt-6">
              <Button
                type="button"
                onClick={handleLoadMore}
                disabled={loading}
                variant="outline"
              >
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && photos.length === 0 && (
            <div className="text-center text-warm-gray py-8">
              Loading images...
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 text-xs text-warm-gray">
          Images provided by{' '}
          <a
            href="https://unsplash.com?utm_source=muchnik_elder_law&utm_medium=referral"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            Unsplash
          </a>
        </div>
      </div>
    </div>
  );
}

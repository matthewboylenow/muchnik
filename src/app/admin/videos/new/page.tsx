'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';

export default function NewVideoPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    bunnyVideoId: '',
    thumbnailUrl: '',
    published: false,
  });

  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to upload thumbnail');
      }

      const { url } = await res.json();
      setFormData((prev) => ({ ...prev, thumbnailUrl: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload thumbnail');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, published: publish }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create video');
      }

      router.push('/admin/videos');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create video');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <Link
            href="/admin/videos"
            className="text-warm-gray hover:text-charcoal transition-colors"
          >
            ← Back to videos
          </Link>
        </div>
        <h1 className="text-3xl font-heading font-bold text-navy">
          Add New Video
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form className="space-y-6">
        {/* Title */}
        <div>
          <Input
            label="Video Title *"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            placeholder="Enter video title"
          />
        </div>

        {/* Description */}
        <div>
          <Textarea
            label="Description (optional)"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={3}
            placeholder="Brief description of the video content"
          />
        </div>

        {/* Bunny Video ID */}
        <div>
          <Input
            label="Bunny.net Video ID or Embed URL *"
            value={formData.bunnyVideoId}
            onChange={(e) =>
              setFormData({ ...formData, bunnyVideoId: e.target.value })
            }
            required
            placeholder="e.g., abc123def or full embed URL"
          />
          <p className="mt-1 text-sm text-warm-gray">
            Paste the video ID or the full embed URL from Bunny.net
          </p>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Thumbnail Image (optional)
          </label>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <Input
                value={formData.thumbnailUrl}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnailUrl: e.target.value })
                }
                placeholder="Thumbnail URL or upload below"
              />
            </div>
            <div>
              <label
                htmlFor="thumbnail-upload"
                className={`inline-block bg-gray-100 hover:bg-gray-200 text-charcoal px-4 py-2.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  imageUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {imageUploading ? 'Uploading...' : 'Upload Image'}
              </label>
              <input
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                disabled={imageUploading}
                className="hidden"
              />
            </div>
          </div>
          {formData.thumbnailUrl && (
            <div className="mt-3">
              <img
                src={formData.thumbnailUrl}
                alt="Thumbnail"
                className="h-32 w-auto rounded-lg border border-gray-200"
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
          <Button
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            disabled={
              isSubmitting || !formData.title || !formData.bunnyVideoId
            }
            variant="outline"
          >
            Save as Draft
          </Button>
          <Button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={
              isSubmitting || !formData.title || !formData.bunnyVideoId
            }
          >
            {isSubmitting ? 'Publishing...' : 'Publish Video'}
          </Button>
          <Link
            href="/admin/videos"
            className="text-warm-gray hover:text-charcoal transition-colors ml-2"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

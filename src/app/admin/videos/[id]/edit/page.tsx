'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';

interface Video {
  id: string;
  title: string;
  description: string | null;
  bunnyVideoId: string;
  thumbnailUrl: string | null;
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    bunnyVideoId: '',
    thumbnailUrl: '',
    published: false,
  });

  useEffect(() => {
    async function fetchVideo() {
      try {
        const { id } = await params;
        setVideoId(id);
        const res = await fetch(`/api/videos/${id}`);
        if (!res.ok) throw new Error('Failed to fetch video');

        const video: Video = await res.json();
        setFormData({
          title: video.title,
          description: video.description || '',
          bunnyVideoId: video.bunnyVideoId,
          thumbnailUrl: video.thumbnailUrl || '',
          published: video.published,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load video');
      } finally {
        setLoading(false);
      }
    }

    fetchVideo();
  }, [params]);

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
      setError(
        err instanceof Error ? err.message : 'Failed to upload thumbnail'
      );
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    if (!videoId) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/videos/${videoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, published: publish }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update video');
      }

      router.push('/admin/videos');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update video');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!videoId) return;

    if (
      !confirm(
        'Are you sure you want to delete this video? This action cannot be undone.'
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/videos/${videoId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete video');
      }

      router.push('/admin/videos');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete video');
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-warm-gray">Loading video...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <Link
            href="/admin/videos"
            className="text-warm-gray hover:text-charcoal transition-colors"
          >
            ← Back to videos
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete Video'}
          </button>
        </div>
        <h1 className="text-3xl font-heading font-bold text-navy">
          Edit Video
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
            {isSubmitting
              ? 'Saving...'
              : formData.published
              ? 'Update & Keep Published'
              : 'Publish Video'}
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

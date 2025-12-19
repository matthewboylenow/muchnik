'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RichTextEditor } from '@/components/blog/RichTextEditor';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';

export default function NewPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    metaTitle: '',
    metaDescription: '',
    published: false,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        throw new Error(data.error || 'Failed to upload image');
      }

      const { url } = await res.json();
      setFormData((prev) => ({ ...prev, featuredImage: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, published: publish }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create post');
      }

      router.push('/admin/posts');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <Link
            href="/admin/posts"
            className="text-warm-gray hover:text-charcoal transition-colors"
          >
            ← Back to posts
          </Link>
        </div>
        <h1 className="text-3xl font-heading font-bold text-navy">
          Create New Post
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
            label="Post Title *"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            placeholder="Enter post title"
          />
        </div>

        {/* Excerpt */}
        <div>
          <Textarea
            label="Excerpt (optional)"
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            rows={3}
            placeholder="Brief summary of the post (shown in listings)"
          />
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Featured Image (optional)
          </label>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <Input
                value={formData.featuredImage}
                onChange={(e) =>
                  setFormData({ ...formData, featuredImage: e.target.value })
                }
                placeholder="Image URL or upload below"
              />
            </div>
            <div>
              <label
                htmlFor="image-upload"
                className={`inline-block bg-gray-100 hover:bg-gray-200 text-charcoal px-4 py-2.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  imageUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {imageUploading ? 'Uploading...' : 'Upload Image'}
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={imageUploading}
                className="hidden"
              />
            </div>
          </div>
          {formData.featuredImage && (
            <div className="mt-3">
              <img
                src={formData.featuredImage}
                alt="Featured"
                className="h-32 w-auto rounded-lg border border-gray-200"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Content *
          </label>
          <RichTextEditor
            content={formData.content}
            onChange={(html) => setFormData({ ...formData, content: html })}
            placeholder="Write your post content here..."
          />
        </div>

        {/* SEO Fields */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-heading font-semibold text-navy mb-4">
            SEO Settings
          </h3>
          <div className="space-y-4">
            <Input
              label="Meta Title (optional)"
              value={formData.metaTitle}
              onChange={(e) =>
                setFormData({ ...formData, metaTitle: e.target.value })
              }
              placeholder="Defaults to post title"
            />
            <Textarea
              label="Meta Description (optional)"
              value={formData.metaDescription}
              onChange={(e) =>
                setFormData({ ...formData, metaDescription: e.target.value })
              }
              rows={2}
              placeholder="Defaults to excerpt"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
          <Button
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            disabled={isSubmitting || !formData.title || !formData.content}
            variant="outline"
          >
            Save as Draft
          </Button>
          <Button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={isSubmitting || !formData.title || !formData.content}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Post'}
          </Button>
          <Link
            href="/admin/posts"
            className="text-warm-gray hover:text-charcoal transition-colors ml-2"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

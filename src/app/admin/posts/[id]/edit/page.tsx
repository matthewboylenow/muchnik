'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RichTextEditor } from '@/components/blog/RichTextEditor';
import { UnsplashPicker } from '@/components/blog/UnsplashPicker';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [postId, setPostId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [showUnsplashPicker, setShowUnsplashPicker] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    metaTitle: '',
    metaDescription: '',
    published: false,
  });

  useEffect(() => {
    async function fetchPost() {
      try {
        const { id } = await params;
        setPostId(id);
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error('Failed to fetch post');

        const post: Post = await res.json();
        setFormData({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt || '',
          featuredImage: post.featuredImage || '',
          metaTitle: post.metaTitle || '',
          metaDescription: post.metaDescription || '',
          published: post.published,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params]);

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
    if (!postId) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, published: publish }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update post');
      }

      router.push('/admin/posts');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!postId) return;

    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete post');
      }

      router.push('/admin/posts');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-warm-gray">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <Link
            href="/admin/posts"
            className="text-warm-gray hover:text-charcoal transition-colors"
          >
            ← Back to posts
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete Post'}
          </button>
        </div>
        <h1 className="text-3xl font-heading font-bold text-navy">Edit Post</h1>
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
                placeholder="Image URL, upload, or search Unsplash"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowUnsplashPicker(true)}
                className="inline-block bg-gold hover:bg-gold-dark text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
              >
                Unsplash
              </button>
              <label
                htmlFor="image-upload"
                className={`inline-block bg-gray-100 hover:bg-gray-200 text-charcoal px-4 py-2.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  imageUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {imageUploading ? 'Uploading...' : 'Upload'}
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

        {/* Unsplash Picker Modal */}
        <UnsplashPicker
          isOpen={showUnsplashPicker}
          onClose={() => setShowUnsplashPicker(false)}
          onSelect={(imageUrl) => {
            setFormData({ ...formData, featuredImage: imageUrl });
          }}
        />

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
            {isSubmitting
              ? 'Saving...'
              : formData.published
              ? 'Update & Keep Published'
              : 'Publish Post'}
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

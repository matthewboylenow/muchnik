import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [post] = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.published, true)));

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post] = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.published, true)));

  if (!post) {
    notFound();
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-navy text-white py-16">
        <div className="container-custom max-w-4xl">
          <Link
            href="/blog"
            className="text-gold hover:text-gold-light mb-4 inline-block"
          >
            ← Back to Blog
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          {post.publishedAt && (
            <p className="text-gray-300">{formatDate(post.publishedAt)}</p>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="py-8 bg-cream">
          <div className="container-custom max-w-4xl">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <div className="mt-12 p-8 bg-white rounded-lg shadow-md text-center">
            <h2 className="font-heading text-2xl font-bold text-navy mb-4">
              Need Legal Assistance?
            </h2>
            <p className="text-charcoal mb-6">
              Contact us today to schedule a consultation with one of our experienced attorneys.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Schedule a Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

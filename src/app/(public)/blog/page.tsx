import { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { Card, CardTitle, CardContent } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest insights and updates from Muchnik Elder Law P.C. on Elder Law, Estate Planning, and Medicaid Planning.',
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const publishedPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedAt));

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-navy text-white py-16">
        <div className="container-custom">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-lg text-gray-200 max-w-3xl">
            Stay informed with the latest insights, tips, and updates on Elder Law, Estate Planning,
            and Medicaid Planning.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          {publishedPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-charcoal">
                No blog posts published yet. Check back soon for updates!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedPosts.map((post) => (
                <Card key={post.id}>
                  {post.featuredImage && (
                    <div className="relative h-48 -mx-6 -mt-6 mb-4">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    </div>
                  )}
                  <CardTitle className="mb-3">{post.title}</CardTitle>
                  <CardContent>
                    {post.excerpt && <p className="text-warm-gray mb-4">{post.excerpt}</p>}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {post.publishedAt && formatDate(post.publishedAt)}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-gold hover:text-gold-dark font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

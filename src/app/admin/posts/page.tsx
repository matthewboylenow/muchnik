import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export const metadata = {
  title: 'Manage Blog Posts',
};

async function getPosts() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  return allPosts;
}

export default async function AdminPostsPage() {
  const allPosts = await getPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-navy">
            Blog Posts
          </h1>
          <p className="text-warm-gray mt-1">
            Manage your blog posts and articles
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          + New Post
        </Link>
      </div>

      {allPosts.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-warm-gray text-lg mb-4">No blog posts yet</p>
          <Link
            href="/admin/posts/new"
            className="inline-block bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal">
                  Title
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal">
                  Created
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal">
                  Updated
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-charcoal">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-navy">{post.title}</div>
                      {post.excerpt && (
                        <div className="text-sm text-warm-gray mt-1 line-clamp-1">
                          {post.excerpt}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {post.published ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-warm-gray">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-warm-gray">
                    {formatDate(post.updatedAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {post.published && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="text-gold hover:text-gold-dark text-sm font-medium"
                        >
                          View
                        </Link>
                      )}
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="text-navy hover:text-navy-dark text-sm font-medium"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import Link from 'next/link';
import { db } from '@/lib/db';
import { posts, videos, submissions, testimonials, users, emailLogs } from '@/lib/db/schema';
import { eq, count } from 'drizzle-orm';
import { Card, CardTitle, CardContent } from '@/components/ui/Card';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Get counts
  const [postsCount] = await db.select({ count: count() }).from(posts);
  const [publishedPostsCount] = await db
    .select({ count: count() })
    .from(posts)
    .where(eq(posts.published, true));
  const [videosCount] = await db.select({ count: count() }).from(videos);
  const [unreadSubmissions] = await db
    .select({ count: count() })
    .from(submissions)
    .where(eq(submissions.read, false));
  const [testimonialsCount] = await db.select({ count: count() }).from(testimonials);
  const [usersCount] = await db.select({ count: count() }).from(users);
  const [emailsSentCount] = await db
    .select({ count: count() })
    .from(emailLogs)
    .where(eq(emailLogs.status, 'sent'));
  const [emailsFailedCount] = await db
    .select({ count: count() })
    .from(emailLogs)
    .where(eq(emailLogs.status, 'failed'));

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-navy mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link href="/admin/posts">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardTitle className="text-lg mb-2">Total Posts</CardTitle>
            <CardContent>
              <p className="text-4xl font-bold text-navy">{postsCount.count}</p>
              <p className="text-sm text-warm-gray mt-2">
                {publishedPostsCount.count} published
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/videos">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardTitle className="text-lg mb-2">Videos</CardTitle>
            <CardContent>
              <p className="text-4xl font-bold text-navy">{videosCount.count}</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/submissions">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardTitle className="text-lg mb-2">Unread Submissions</CardTitle>
            <CardContent>
              <p className="text-4xl font-bold text-gold">{unreadSubmissions.count}</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/testimonials">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardTitle className="text-lg mb-2">Testimonials</CardTitle>
            <CardContent>
              <p className="text-4xl font-bold text-navy">{testimonialsCount.count}</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/users">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardTitle className="text-lg mb-2">Users</CardTitle>
            <CardContent>
              <p className="text-4xl font-bold text-navy">{usersCount.count}</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/emails">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardTitle className="text-lg mb-2">Emails</CardTitle>
            <CardContent>
              <p className="text-4xl font-bold text-navy">{emailsSentCount.count}</p>
              <p className="text-sm text-warm-gray mt-2">
                {emailsFailedCount.count} failed
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardTitle className="text-lg mb-2">Quick Actions</CardTitle>
          <CardContent>
            <div className="space-y-2">
              <Link
                href="/admin/posts/new"
                className="block text-gold hover:text-gold-dark"
              >
                + New Post
              </Link>
              <Link
                href="/admin/videos/new"
                className="block text-gold hover:text-gold-dark"
              >
                + New Video
              </Link>
              <Link
                href="/admin/testimonials/new"
                className="block text-gold hover:text-gold-dark"
              >
                + New Testimonial
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Submissions */}
      <Card>
        <CardTitle className="mb-4">Recent Contact Submissions</CardTitle>
        <CardContent>
          <RecentSubmissions />
        </CardContent>
      </Card>
    </div>
  );
}

async function RecentSubmissions() {
  const recentSubmissions = await db
    .select()
    .from(submissions)
    .orderBy(submissions.createdAt)
    .limit(5);

  if (recentSubmissions.length === 0) {
    return <p className="text-warm-gray">No submissions yet.</p>;
  }

  return (
    <div className="space-y-4">
      {recentSubmissions.map((submission) => (
        <div
          key={submission.id}
          className={`p-4 rounded-lg border ${
            submission.read ? 'bg-gray-50 border-gray-200' : 'bg-gold-light/10 border-gold'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-navy">
                {submission.firstName} {submission.lastName}
              </p>
              <p className="text-sm text-warm-gray">{submission.email}</p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded ${
                submission.read
                  ? 'bg-gray-200 text-gray-700'
                  : 'bg-gold text-white font-semibold'
              }`}
            >
              {submission.read ? 'Read' : 'New'}
            </span>
          </div>
          {submission.caseDescription && (
            <p className="text-sm text-charcoal mt-2 line-clamp-2">
              {submission.caseDescription}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

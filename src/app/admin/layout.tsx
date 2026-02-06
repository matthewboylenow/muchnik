import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import Link from 'next/link';
import { headers } from 'next/headers';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  // Allow login page without auth check
  const isLoginPage = pathname === '/admin/login';

  if (!session && !isLoginPage) {
    // For non-login pages, redirect to login
    redirect('/admin/login');
  }

  // If on login page, render without layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-navy text-white p-6">
          <h2 className="font-heading text-2xl font-bold mb-8">Admin Panel</h2>

          <nav className="space-y-2">
            <Link
              href="/admin"
              className="block py-2 px-4 rounded hover:bg-navy-light transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/posts"
              className="block py-2 px-4 rounded hover:bg-navy-light transition-colors"
            >
              Blog Posts
            </Link>
            <Link
              href="/admin/videos"
              className="block py-2 px-4 rounded hover:bg-navy-light transition-colors"
            >
              Videos
            </Link>
            <Link
              href="/admin/submissions"
              className="block py-2 px-4 rounded hover:bg-navy-light transition-colors"
            >
              Submissions
            </Link>
            <Link
              href="/admin/testimonials"
              className="block py-2 px-4 rounded hover:bg-navy-light transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="/admin/analytics"
              className="block py-2 px-4 rounded hover:bg-navy-light transition-colors"
            >
              Analytics
            </Link>
            <Link
              href="/admin/wordpress-import"
              className="block py-2 px-4 rounded hover:bg-navy-light transition-colors"
            >
              WP Import
            </Link>
          </nav>

          <div className="mt-8 pt-8 border-t border-navy-light">
            <p className="text-sm text-gray-300 mb-2">{session?.email}</p>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="text-sm text-gold hover:text-gold-light"
              >
                Logout
              </button>
            </form>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

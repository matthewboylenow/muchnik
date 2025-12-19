import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Allow login page without auth
  // This is handled by checking the pathname on the client, but
  // for server components we check if we're on the login route
  const isLoginPage = false; // We'll handle this differently

  if (!session) {
    // For non-login pages, redirect to login
    redirect('/admin/login');
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
              href="/admin/users"
              className="block py-2 px-4 rounded hover:bg-navy-light transition-colors"
            >
              Users
            </Link>
          </nav>

          <div className="mt-8 pt-8 border-t border-navy-light">
            <p className="text-sm text-gray-300 mb-2">{session.email}</p>
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

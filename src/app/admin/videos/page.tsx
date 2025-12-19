import { db } from '@/lib/db';
import { videos } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export const metadata = {
  title: 'Manage Videos',
};

async function getVideos() {
  const allVideos = await db
    .select()
    .from(videos)
    .orderBy(desc(videos.createdAt));
  return allVideos;
}

export default async function AdminVideosPage() {
  const allVideos = await getVideos();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-navy">Videos</h1>
          <p className="text-warm-gray mt-1">
            Manage your video content library
          </p>
        </div>
        <Link
          href="/admin/videos/new"
          className="bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          + New Video
        </Link>
      </div>

      {allVideos.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-warm-gray text-lg mb-4">No videos yet</p>
          <Link
            href="/admin/videos/new"
            className="inline-block bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Add your first video
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal">
                  Video
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal">
                  Created
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-charcoal">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allVideos.map((video) => (
                <tr
                  key={video.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-4">
                      {video.thumbnailUrl && (
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-32 h-20 object-cover rounded border border-gray-200"
                        />
                      )}
                      <div>
                        <div className="font-semibold text-navy">
                          {video.title}
                        </div>
                        {video.description && (
                          <div className="text-sm text-warm-gray mt-1 line-clamp-2">
                            {video.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {video.published ? (
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
                    {formatDate(video.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {video.published && (
                        <Link
                          href={`/videos#video-${video.id}`}
                          target="_blank"
                          className="text-gold hover:text-gold-dark text-sm font-medium"
                        >
                          View
                        </Link>
                      )}
                      <Link
                        href={`/admin/videos/${video.id}/edit`}
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

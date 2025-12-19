import { Metadata } from 'next';
import { db } from '@/lib/db';
import { videos } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';
import { Card, CardTitle, CardContent } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Watch educational videos about Elder Law, Estate Planning, and Medicaid Planning from Muchnik Elder Law P.C.',
};

export const dynamic = 'force-dynamic';

export default async function VideosPage() {
  let publishedVideos: any[] = [];

  try {
    publishedVideos = await db
      .select()
      .from(videos)
      .where(eq(videos.published, true))
      .orderBy(asc(videos.order));
  } catch (error) {
    console.error('Error fetching videos:', error);
    // Continue with empty array - will show empty state
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent"></div>
        </div>
        <div className="relative container-custom py-20 md:py-28">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Educational Videos
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
              Learn about Elder Law, Estate Planning, and Medicaid Planning through our informative
              video library.
            </p>
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          {publishedVideos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-charcoal">
                No videos available yet. Check back soon for educational content!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedVideos.map((video) => (
                <Card key={video.id}>
                  {/* Video Thumbnail/Player */}
                  <div className="relative aspect-video -mx-6 -mt-6 mb-4 bg-gray-900 rounded-t-lg overflow-hidden">
                    {video.bunnyVideoId.startsWith('http') ? (
                      <iframe
                        src={video.bunnyVideoId}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : video.thumbnailUrl ? (
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <CardTitle className="mb-3">{video.title}</CardTitle>
                  {video.description && (
                    <CardContent>
                      <p className="text-warm-gray">{video.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

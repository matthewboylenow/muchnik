import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { videos } from '@/lib/db/schema';
import { getSession } from '@/lib/auth';
import { desc, eq } from 'drizzle-orm';

// GET /api/videos - List all videos (with optional published filter for public view)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published') === 'true';

    let allVideos;

    if (publishedOnly) {
      allVideos = await db
        .select()
        .from(videos)
        .where(eq(videos.published, true))
        .orderBy(videos.order);
    } else {
      allVideos = await db
        .select()
        .from(videos)
        .orderBy(desc(videos.createdAt));
    }

    return NextResponse.json(allVideos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

// POST /api/videos - Create new video
export async function POST(request: Request) {
  try {
    // Check auth
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, bunnyVideoId, thumbnailUrl, published } = body;

    // Create video
    const [newVideo] = await db
      .insert(videos)
      .values({
        title,
        description: description || null,
        bunnyVideoId,
        thumbnailUrl: thumbnailUrl || null,
        published: published || false,
      })
      .returning();

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    );
  }
}

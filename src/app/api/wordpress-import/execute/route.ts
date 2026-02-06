import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { put } from '@vercel/blob';
import { sanitize } from '@/lib/sanitize';

interface ImportPost {
  wpId: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  status: string;
  featuredImageUrl: string;
  metaTitle: string;
  metaDescription: string;
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { selectedPosts, duplicateHandling } = (await request.json()) as {
      selectedPosts: ImportPost[];
      duplicateHandling: 'skip' | 'overwrite';
    };

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const post of selectedPosts) {
      try {
        // Check for existing post by slug
        const [existing] = await db
          .select({ id: posts.id })
          .from(posts)
          .where(eq(posts.slug, post.slug));

        if (existing && duplicateHandling === 'skip') {
          skipCount++;
          continue;
        }

        // Download and upload featured image if present
        let featuredImageBlobUrl = '';
        if (post.featuredImageUrl) {
          try {
            const imgResponse = await fetch(post.featuredImageUrl);
            if (imgResponse.ok) {
              const imgBlob = await imgResponse.blob();
              const ext = post.featuredImageUrl.split('.').pop()?.split('?')[0] || 'jpg';
              const blobResult = await put(
                `blog/${post.slug}/featured.${ext}`,
                imgBlob,
                { access: 'public' }
              );
              featuredImageBlobUrl = blobResult.url;
            }
          } catch (imgError) {
            console.error(`Failed to download image for "${post.title}":`, imgError);
          }
        }

        const postData = {
          title: post.title,
          slug: post.slug,
          content: sanitize(post.content),
          excerpt: post.excerpt || null,
          featuredImage: featuredImageBlobUrl || null,
          metaTitle: post.metaTitle || null,
          metaDescription: post.metaDescription || null,
          published: post.status === 'published',
          publishedAt: post.date ? new Date(post.date) : null,
          authorId: session.userId,
        };

        if (existing && duplicateHandling === 'overwrite') {
          await db
            .update(posts)
            .set({ ...postData, updatedAt: new Date() })
            .where(eq(posts.id, existing.id));
        } else {
          await db.insert(posts).values(postData);
        }

        successCount++;
      } catch (postError) {
        errorCount++;
        errors.push(`Failed to import "${post.title}": ${postError instanceof Error ? postError.message : 'Unknown error'}`);
      }
    }

    return NextResponse.json({
      successCount,
      skipCount,
      errorCount,
      errors,
    });
  } catch (error) {
    console.error('WordPress import execute error:', error);
    return NextResponse.json({ error: 'Import failed' }, { status: 500 });
  }
}

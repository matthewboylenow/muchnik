import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { testimonials } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const publishedOnly = searchParams.get('published') === 'true';

  const results = publishedOnly
    ? await db
        .select()
        .from(testimonials)
        .where(eq(testimonials.published, true))
        .orderBy(asc(testimonials.order))
    : await db.select().from(testimonials).orderBy(asc(testimonials.order));

  return NextResponse.json(results);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, rating, text, date, source, published } = body;

    if (!name || !rating || !text) {
      return NextResponse.json({ error: 'Name, rating, and text are required' }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    const [testimonial] = await db
      .insert(testimonials)
      .values({
        name,
        rating,
        text,
        date: date || null,
        source: source || null,
        published: published ?? true,
      })
      .returning();

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Create testimonial error:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

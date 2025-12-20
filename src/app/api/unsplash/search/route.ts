import { NextResponse } from 'next/server';
import { createApi } from 'unsplash-js';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '12');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const unsplash = createApi({
      accessKey: process.env.UNSPLASH_ACCESS_KEY!,
    });

    const result = await unsplash.search.getPhotos({
      query,
      page,
      perPage,
      orientation: 'landscape',
    });

    if (result.errors) {
      console.error('Unsplash API errors:', result.errors);
      return NextResponse.json(
        { error: 'Failed to fetch images from Unsplash' },
        { status: 500 }
      );
    }

    const photos = result.response.results.map((photo) => ({
      id: photo.id,
      description: photo.description || photo.alt_description,
      urls: {
        raw: photo.urls.raw,
        full: photo.urls.full,
        regular: photo.urls.regular,
        small: photo.urls.small,
        thumb: photo.urls.thumb,
      },
      user: {
        name: photo.user.name,
        username: photo.user.username,
        link: photo.user.links.html,
      },
      links: {
        download: photo.links.download,
        html: photo.links.html,
      },
    }));

    return NextResponse.json({
      photos,
      total: result.response.total,
      totalPages: result.response.total_pages,
    });
  } catch (error) {
    console.error('Unsplash search error:', error);
    return NextResponse.json(
      { error: 'Failed to search Unsplash' },
      { status: 500 }
    );
  }
}

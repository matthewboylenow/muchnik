import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { XMLParser } from 'fast-xml-parser';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const xmlText = await file.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text',
    });

    const parsed = parser.parse(xmlText);
    const channel = parsed?.rss?.channel;

    if (!channel) {
      return NextResponse.json({ error: 'Invalid WXR file format' }, { status: 400 });
    }

    // Items can be a single object or array
    const items = Array.isArray(channel.item) ? channel.item : channel.item ? [channel.item] : [];

    const posts = items
      .filter((item: Record<string, unknown>) => {
        const postType = item['wp:post_type'];
        return postType === 'post' || postType === 'page';
      })
      .map((item: Record<string, unknown>) => {
        // Extract categories/tags
        const categories: string[] = [];
        const tags: string[] = [];
        const cats = item.category;
        if (cats) {
          const catArr = Array.isArray(cats) ? cats : [cats];
          for (const c of catArr) {
            if (typeof c === 'object' && c !== null) {
              const cat = c as Record<string, string>;
              if (cat['@_domain'] === 'category') categories.push(cat['#text'] || cat['@_nicename'] || '');
              if (cat['@_domain'] === 'post_tag') tags.push(cat['#text'] || cat['@_nicename'] || '');
            }
          }
        }

        // Extract featured image from wp:postmeta
        let featuredImageUrl = '';
        const postMeta = item['wp:postmeta'];
        if (postMeta) {
          const metas = Array.isArray(postMeta) ? postMeta : [postMeta];
          const thumbIdMeta = metas.find(
            (m: Record<string, unknown>) => m['wp:meta_key'] === '_thumbnail_id'
          );
          if (thumbIdMeta) {
            const thumbId = String(thumbIdMeta['wp:meta_value']);
            // Find the attachment item with this ID
            const attachment = items.find(
              (i: Record<string, unknown>) =>
                String(i['wp:post_id']) === thumbId && i['wp:post_type'] === 'attachment'
            );
            if (attachment) {
              featuredImageUrl = String(attachment['wp:attachment_url'] || '');
            }
          }
        }

        // Extract excerpt
        const excerpt = item['excerpt:encoded']
          ? String(item['excerpt:encoded']).replace(/<[^>]+>/g, '').trim()
          : '';

        // Extract meta title/description from Yoast or other SEO plugins
        let metaTitle = '';
        let metaDescription = '';
        if (postMeta) {
          const metas = Array.isArray(postMeta) ? postMeta : [postMeta];
          for (const m of metas) {
            const meta = m as Record<string, unknown>;
            if (meta['wp:meta_key'] === '_yoast_wpseo_title') {
              metaTitle = String(meta['wp:meta_value'] || '');
            }
            if (meta['wp:meta_key'] === '_yoast_wpseo_metadesc') {
              metaDescription = String(meta['wp:meta_value'] || '');
            }
          }
        }

        return {
          wpId: String(item['wp:post_id'] || ''),
          title: String(item.title || ''),
          slug: String(item['wp:post_name'] || ''),
          content: String(item['content:encoded'] || ''),
          excerpt,
          date: String(item['wp:post_date'] || item.pubDate || ''),
          status: item['wp:status'] === 'publish' ? 'published' : 'draft',
          postType: String(item['wp:post_type'] || 'post'),
          featuredImageUrl,
          metaTitle,
          metaDescription,
          categories,
          tags,
        };
      });

    return NextResponse.json({ posts, total: posts.length });
  } catch (error) {
    console.error('WordPress import parse error:', error);
    return NextResponse.json({ error: 'Failed to parse WXR file' }, { status: 500 });
  }
}

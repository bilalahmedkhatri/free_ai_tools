import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/app/lib/blogMockData';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  // Future-proof query params (backend can implement properly later)
  const tag = url.searchParams.get('tag'); // Technology | AI | Tutorials
  const search = url.searchParams.get('search'); // free text
  const pageRaw = url.searchParams.get('page'); // 1-based
  const limitRaw = url.searchParams.get('limit'); // page size

  let posts = getAllBlogPosts();

  if (tag) {
    posts = posts.filter((p) => p.tag.toLowerCase() === tag.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q)
    );
  }

  const page = Math.max(1, Number(pageRaw || '1') || 1);
  const limit = Math.min(50, Math.max(1, Number(limitRaw || '12') || 12));

  const start = (page - 1) * limit;
  const items = posts.slice(start, start + limit);

  // Keep response simple (array), while still exposing pagination metadata for future use.
  return NextResponse.json({
    items,
    page,
    limit,
    total: posts.length,
  });
}


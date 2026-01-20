import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostBySlug } from '@/app/lib/blogMockData';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Future-proof query params (ignored for mock)
  // const draft = new URL(request.url).searchParams.get('draft');

  const post = getBlogPostBySlug(slug);
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}


import { NextResponse } from 'next/server';
import { searchPosts } from '@/lib/posts';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ posts: [] });
    }

    const results = searchPosts(query);

    return NextResponse.json({ posts: results });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to search posts' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAllPosts, savePost, deletePost } from '@/lib/posts';

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  return session?.value === 'authenticated';
}

// GET all posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeDrafts = searchParams.get('includeDrafts') === 'true';

    // Only include drafts if authenticated
    const isAuthenticated = await checkAuth();
    const posts = getAllPosts(includeDrafts && isAuthenticated);

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('GET posts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST create or update a post
export async function POST(request) {
  try {
    const isAuthenticated = await checkAuth();

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { slug, frontmatter, content } = body;

    if (!slug || !frontmatter || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = savePost(slug, frontmatter, content);

    if (result.success) {
      return NextResponse.json({ success: true, slug: result.slug });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('POST posts error:', error);
    return NextResponse.json(
      { error: 'Failed to save post' },
      { status: 500 }
    );
  }
}

// DELETE a post
export async function DELETE(request) {
  try {
    const isAuthenticated = await checkAuth();

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    const result = deletePost(slug);

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('DELETE posts error:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}

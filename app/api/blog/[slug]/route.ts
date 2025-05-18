import { connectToDB } from '@/lib/db';
import Blog from '@/models/Blog';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const slug = url.pathname.split('/').pop(); // gets the slug from /api/blog/[slug]

  if (!slug) {
    return NextResponse.json({ error: 'Slug not found' }, { status: 400 });
  }

  try {
    await connectToDB();
    const blog = await Blog.findOne({ slug });

    if (!blog || !blog.isPublished) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blog', msg: (error as Error).message },
      { status: 500 }
    );
  }
}

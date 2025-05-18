import { connectToDB } from '@/lib/db';
import Blog from '@/models/Blog';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  try {
    await connectToDB();
    const blog = await Blog.findOne({ slug: params.slug });

    if (!blog || !blog.isPublished) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

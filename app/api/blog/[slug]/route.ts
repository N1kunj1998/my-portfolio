import { connectToDB } from '@/lib/db';
import Blog from '@/models/Blog';
import { NextResponse } from 'next/server';

type GetParams = { params: { slug: string } };

export async function GET(_req: Request, { params }: GetParams) {
  try {
    await connectToDB();
    const blog = await Blog.findOne({ slug: params.slug });

    if (!blog || !blog.isPublished) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog', msg: error }, { status: 500 });
  }
}

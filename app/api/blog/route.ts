// app/api/blog/route.ts
import { connectToDB } from '@/lib/db';
import Blog from '@/models/Blog';
import { NextResponse } from 'next/server';

// GET /api/blog → return all published blog posts
export async function GET() {
  try {
    await connectToDB();
    const blogs = await Blog.find({ isPublished: true }).sort({ publishedAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST /api/blog → create a new blog post
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDB();

    const newBlog = await Blog.create({
      title: body.title,
      slug: body.slug,
      content: body.content,
      author: {
        name: body.authorName,
        email: body.authorEmail || null,
      },
      tags: body.tags || [],
      coverImage: body.coverImage || '',
      isPublished: body.isPublished || false,
      publishedAt: body.isPublished ? new Date() : null,
    });

    return NextResponse.json(newBlog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}

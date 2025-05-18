import { Blog } from '@/types/types';
import MarkdownViewer from '@/components/common/MarkdownViewer';

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return <div className="text-center text-red-500 py-10">🚫 Blog not found.</div>;
  }

  const blog: Blog = await res.json();

  return (
    <article className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold mb-2 text-gray-900">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-4">
        🗓️ {new Date(blog.publishedAt).toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })}
      </p>

      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full rounded-lg mb-6 shadow"
        />
      )}

      <MarkdownViewer content={blog.content} />
    </article>
  );
}

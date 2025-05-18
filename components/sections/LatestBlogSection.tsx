'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Blog } from '@/types/types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function LatestBlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, { cache: 'no-store' });
      const data = await res.json();
      setBlogs(data.slice(0, 10)); // latest 10
    };
    fetchBlogs();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const scrollAmount = 320; // one card width
      scrollContainer.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="max-w-full px-4 overflow-hidden">
      <h2 className="text-3xl font-bold mb-6 text-[var(--foreground)] text-center">📝 Latest Blogs</h2>

      <div className="relative group">
        {/* ← Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-[var(--background)] border border-[var(--card-border)] rounded-full shadow hover:scale-110 transition"
        >
          <FaChevronLeft />
        </button>

        {/* → Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-[var(--background)] border border-[var(--card-border)] rounded-full shadow hover:scale-110 transition"
        >
          <FaChevronRight />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-8 py-2"
        >
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="min-w-[300px] max-w-[320px] flex-shrink-0 bg-[var(--card)] border border-[var(--card-border)] rounded shadow hover:shadow-lg transition"
            >
              {blog.coverImage && (
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-t"
                />
              )}
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-[var(--foreground)] line-clamp-2">{blog.title}</h3>
                <p className="text-xs text-gray-500">
                  {new Date(blog.publishedAt).toLocaleDateString()}
                </p>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded-full bg-[var(--pill-bg)] text-gray-700 dark:text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {blog.content.replace(/<[^>]*>?/gm, '').slice(0, 100)}...
                </p>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-block mt-2 text-sm text-[var(--accent)] hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

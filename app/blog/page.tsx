'use client';

import { Blog } from '@/types/types';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
        cache: 'no-store',
      });
      const data = await res.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">Blog</h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500">No blog posts yet. Stay tuned!</p>
      ) : (
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {blogs.map((blog) => (
            <motion.a
              key={blog._id}
              href={`/blog/${blog.slug}`}
              variants={itemVariants}
              className="block p-4 border border-[var(--card-border)] bg-[var(--card)] rounded hover:shadow transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {blog.coverImage && (
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full rounded mb-4"
                />
              )}
              <h2 className="text-xl font-semibold text-[var(--foreground)]">{blog.title}</h2>
              <p className="text-sm text-gray-500">{new Date(blog.publishedAt).toLocaleDateString()}</p>
              <p className="mt-1 text-gray-700 line-clamp-2">{blog.content.replace(/<[^>]*>?/gm, '').slice(0, 200)}...</p>
              <p className="mt-1 text-sm text-[var(--accent)]">Read more →</p>
            </motion.a>
          ))}
        </motion.div>
      )}
    </section>
  );
}

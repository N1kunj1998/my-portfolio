'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .slice(0, 5) // take only first 4-5 words
    .join('-')
    .replace(/[^\w-]+/g, '');
}

export default function CreatePostPage() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    tags: [] as string[],
    currentTag: '',
    coverImage: '',
    isPublished: false,
  });

  const [showCoverPopup, setShowCoverPopup] = useState(false);
  const [slugTimer, setSlugTimer] = useState<NodeJS.Timeout | null>(null);

  // Auto-generate slug from title with debounce
  useEffect(() => {
    if (slugTimer) clearTimeout(slugTimer);
    const timer = setTimeout(() => {
      const newSlug = slugify(formData.title);
      setFormData((prev) => ({ ...prev, slug: newSlug }));
    }, 400); // debounce delay
    setSlugTimer(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.title]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && formData.currentTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(formData.currentTag.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, prev.currentTag.trim()],
          currentTag: '',
        }));
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
    };

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('✅ Blog created successfully');
        setFormData({
          title: '',
          slug: '',
          content: '',
          tags: [],
          currentTag: '',
          coverImage: '',
          isPublished: false,
        });
      } else {
        alert('❌ Failed to create blog');
      }
    } catch (err) {
      alert(`⚠️ Error submitting blog: ${err}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Slug (auto-generated from title)"
          className="w-full border p-2 rounded"
          required
        />

        {/* Tag input pills */}
        <div>
          <label className="font-semibold text-sm">Tags</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {formData.tags.map((tag) => (
              <span key={tag} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            name="currentTag"
            value={formData.currentTag}
            onChange={(e) => setFormData((prev) => ({ ...prev, currentTag: e.target.value }))}
            onKeyDown={handleTagKeyDown}
            placeholder="Press enter to add tag"
            className="w-full mt-2 border p-2 rounded"
          />
        </div>

        {/* Cover Image Popup */}
        <div>
          <button
            type="button"
            onClick={() => setShowCoverPopup(!showCoverPopup)}
            className="text-sm underline text-blue-600"
          >
            {showCoverPopup ? 'Hide Cover Image Field' : 'Add Cover Image URL'}
          </button>

          {showCoverPopup && (
            <input
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="Cover Image URL"
              className="w-full border p-2 rounded mt-2"
            />
          )}
        </div>

        {/* Markdown Editor */}
        <div data-color-mode="light">
          <label className="font-semibold text-sm">Content</label>
          <MDEditor
            value={formData.content}
            onChange={(val) => setFormData((prev) => ({ ...prev, content: val || '' }))}
            height={400}
          />
        </div>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
          />
          <span>Publish Now</span>
        </label>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
}

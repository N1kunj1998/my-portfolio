'use client';

import MarkdownPreview from '@uiw/react-markdown-preview';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <MarkdownPreview
      source={content}
      className="!text-base !text-gray-800"
      style={{ backgroundColor: 'white' }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
    />
  );
}

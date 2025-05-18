'use client';

import MarkdownPreview from '@uiw/react-markdown-preview';
import rehypeHighlight from 'rehype-highlight';

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <MarkdownPreview
      source={content}
      className="!text-base !text-gray-800"
      style={{ backgroundColor: 'white' }}
      rehypePlugins={[rehypeHighlight]}
    />
  );
}

// types.ts
export interface Blog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    coverImage?: string;
    tags: string[];
    isPublished: boolean;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  }
  
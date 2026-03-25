import type { Metadata } from 'next';

import { BlogArchivePage } from '@/components/blog-page';
import { getAllPosts } from '@/lib/blog';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Archive',
  description: `Full archive of articles from ${site.name}.`,
};

export default async function Page() {
  const posts = await getAllPosts();

  return <BlogArchivePage posts={posts} />;
}

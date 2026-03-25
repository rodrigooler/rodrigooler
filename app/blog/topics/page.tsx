import type { Metadata } from 'next';

import { BlogTopicsPage } from '@/components/blog-page';
import { getAllPosts } from '@/lib/blog';
import { site } from '@/lib/site';
import { getTopicCounts } from '@/lib/topics';

export const metadata: Metadata = {
  title: 'Topics',
  description: 'Curated topic hubs for the technical blog.',
  alternates: {
    canonical: `${site.url}/blog/topics`,
  },
};

export default async function Page() {
  const posts = await getAllPosts();
  const topics = getTopicCounts(posts);

  return <BlogTopicsPage topics={topics} />;
}

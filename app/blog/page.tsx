import type { Metadata } from 'next';

import { BlogIndexPage } from '@/components/blog-page';
import { getAllPosts, getAllTags, getPaginatedPosts } from '@/lib/blog';
import { site } from '@/lib/site';
import { getTopicCounts } from '@/lib/topics';

export const metadata: Metadata = {
  title: 'Blog',
  description: site.blog.description,
  alternates: {
    canonical: `${site.url}/blog`,
  },
};

export default async function Page() {
  const [pageData, tags, allPosts] = await Promise.all([getPaginatedPosts(1), getAllTags(), getAllPosts()]);

  return (
    <BlogIndexPage
      posts={pageData.posts}
      tags={tags}
      currentPage={pageData.page}
      totalPages={pageData.totalPages}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
      ]}
      topicCounts={getTopicCounts(allPosts)}
    />
  );
}

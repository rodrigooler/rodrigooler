import type { Metadata } from 'next';

import { BlogIndexPage } from '@/components/blog-page';
import { getAllPosts, getAllTags, getPaginatedPosts } from '@/lib/blog';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog',
  description: site.blog.description,
  alternates: {
    canonical: `${site.url}/blog`,
  },
};

export default async function Page() {
  const [allPosts, pageData, tags] = await Promise.all([getAllPosts(), getPaginatedPosts(1), getAllTags()]);

  return (
    <BlogIndexPage
      posts={pageData.posts}
      latestPosts={allPosts.slice(0, 4)}
      tags={tags}
      currentPage={pageData.page}
      totalPages={pageData.totalPages}
      totalPosts={pageData.totalPosts}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
      ]}
    />
  );
}

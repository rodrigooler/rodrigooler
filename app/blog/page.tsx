import type { Metadata } from 'next';

import { BlogIndexPage } from '@/components/blog-page';
import { getAllTags, getPaginatedPosts } from '@/lib/blog';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog',
  description: site.blog.description,
  alternates: {
    canonical: `${site.url}/blog`,
  },
};

export default async function Page() {
  const [pageData, tags] = await Promise.all([getPaginatedPosts(1), getAllTags()]);

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
    />
  );
}

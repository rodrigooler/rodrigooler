import type { Metadata } from 'next';

import { BlogIndexPage } from '@/components/blog-page';
import { getAllTags, getPaginatedPosts } from '@/lib/blog';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog',
  description: site.blog.description,
};

export default async function Page() {
  const [{ posts, page, totalPages }, tags] = await Promise.all([getPaginatedPosts(1), getAllTags()]);

  return <BlogIndexPage posts={posts} tags={tags} currentPage={page} totalPages={totalPages} />;
}

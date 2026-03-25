import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BlogIndexPage } from '@/components/blog-page';
import { getAllPosts, getAllTags, getPaginatedPosts } from '@/lib/blog';
import { site } from '@/lib/site';

type Params = Promise<{ page: string }>;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / site.blog.perPage));

  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog page ${page}`,
    description: site.blog.description,
  };
}

export default async function Page({ params }: { params: Params }) {
  const { page } = await params;
  const pageNumber = Number(page);

  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    notFound();
  }

  const [{ posts, totalPages, page: safePage }, tags] = await Promise.all([
    getPaginatedPosts(pageNumber),
    getAllTags(),
  ]);

  if (pageNumber > totalPages) {
    notFound();
  }

  return <BlogIndexPage posts={posts} tags={tags} currentPage={safePage} totalPages={totalPages} />;
}

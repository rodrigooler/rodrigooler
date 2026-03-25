import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BlogTagPage } from '@/components/blog-page';
import { getAllTags, getPostsByTag, slugifyTag, tagFromSlug } from '@/lib/blog';
import { site } from '@/lib/site';

type Params = Promise<{ tag: string }>;

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((item) => ({ tag: slugifyTag(item.tag) }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { tag } = await params;
  const tags = await getAllTags();
  const label = tagFromSlug(tag, tags);

  return {
    title: `Tag: ${label}`,
    description: `Articles about ${label} on Rodrigo Oler's blog.`,
    alternates: {
      canonical: `${site.url}/blog/tags/${slugifyTag(label)}`,
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { tag } = await params;
  const tags = await getAllTags();
  const tagLabel = tagFromSlug(tag, tags);
  const posts = await getPostsByTag(tagLabel);

  if (!posts.length) {
    notFound();
  }

  return (
    <BlogTagPage
      posts={posts}
      tagLabel={tagLabel}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: tagLabel, href: `/blog/tags/${slugifyTag(tagLabel)}` },
      ]}
    />
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BlogTopicPage } from '@/components/blog-page';
import { getAllPosts } from '@/lib/blog';
import { site } from '@/lib/site';
import { getTopicBySlug, getTopicPosts, getTopicCounts } from '@/lib/topics';

type Params = Promise<{ topic: string }>;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return getTopicCounts(posts)
    .filter((topic) => topic.count > 0)
    .map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { topic } = await params;
  const topicDefinition = getTopicBySlug(topic);

  if (!topicDefinition) {
    return {};
  }

  return {
    title: topicDefinition.title,
    description: topicDefinition.description,
    alternates: {
      canonical: `${site.url}/blog/topics/${topicDefinition.slug}`,
    },
    openGraph: {
      type: 'website',
      url: `${site.url}/blog/topics/${topicDefinition.slug}`,
      title: topicDefinition.title,
      description: topicDefinition.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: topicDefinition.title,
      description: topicDefinition.description,
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { topic } = await params;
  const posts = await getAllPosts();
  const topicDefinition = getTopicBySlug(topic);

  if (!topicDefinition) {
    notFound();
  }

  const topicPosts = getTopicPosts(topicDefinition, posts);

  if (!topicPosts.length) {
    notFound();
  }

  return (
    <BlogTopicPage
      topic={topicDefinition}
      posts={topicPosts}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Topics', href: '/blog/topics' },
        { label: topicDefinition.title, href: `/blog/topics/${topicDefinition.slug}` },
      ]}
    />
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BlogPostPage } from '@/components/blog-page';
import { SeoJsonLd } from '@/components/seo-jsonld';
import { getAllPosts, getPostBySlug, slugifyTag } from '@/lib/blog';
import { site } from '@/lib/site';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: post.canonical ?? `${site.url}/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      url: `${site.url}/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.lastModified,
      images: [
        {
          url: `/og-images/${post.slug}.svg`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`/og-images/${post.slug}.svg`],
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => {
      const aShared = a.tags.filter((tag) => post.tags.some((item) => slugifyTag(item) === slugifyTag(tag))).length;
      const bShared = b.tags.filter((tag) => post.tags.some((item) => slugifyTag(item) === slugifyTag(tag))).length;
      return bShared - aShared || +new Date(b.date) - +new Date(a.date);
    })
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.lastModified,
    author: {
      '@type': 'Person',
      name: site.name,
    },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    keywords: post.tags,
  };

  return (
    <>
      <SeoJsonLd data={jsonLd} />
      <BlogPostPage
        post={post}
        relatedPosts={relatedPosts}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />
    </>
  );
}

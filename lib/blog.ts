import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
import readingTime from 'reading-time';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

import { site } from '@/lib/site';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  canonical?: string;
  featured?: boolean;
  draft?: boolean;
};

export type BlogPostMeta = PostFrontmatter & {
  slug: string;
  readingTime: string;
  readingMinutes: number;
  excerpt: string;
  lastModified: string;
};

export type BlogPost = BlogPostMeta & {
  contentHtml: string;
};

function comparePostsByDateDesc(a: { date: string; lastModified: string }, b: { date: string; lastModified: string }) {
  const dateDelta = new Date(b.date).getTime() - new Date(a.date).getTime();

  if (dateDelta !== 0) {
    return dateDelta;
  }

  return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
}

function getPostFilePaths() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => path.join(postsDirectory, file));
}

function parseFrontmatter(filePath: string) {
  const slug = path.basename(filePath, '.md');
  const raw = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(raw);
  const frontmatter = data as Partial<PostFrontmatter>;
  const stats = readingTime(content);
  const lastModified = fs.statSync(filePath).mtime.toISOString();

  if (!frontmatter.title || !frontmatter.description || !frontmatter.date || !frontmatter.tags) {
    throw new Error(`Invalid blog frontmatter in ${filePath}`);
  }

  return {
    slug,
    content,
    meta: {
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      date: frontmatter.date,
      tags: frontmatter.tags,
      canonical: frontmatter.canonical,
      featured: frontmatter.featured,
      draft: frontmatter.draft,
      readingTime: stats.text,
      readingMinutes: Math.max(1, Math.round(stats.minutes)),
      excerpt: frontmatter.description,
      lastModified,
    } satisfies BlogPostMeta,
  };
}

export async function renderMarkdown(markdown: string) {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
  return result.toString();
}

export async function getAllPosts() {
  const posts = getPostFilePaths()
    .map((filePath) => parseFrontmatter(filePath).meta)
    .filter((post) => !post.draft)
    .sort(comparePostsByDateDesc);

  return posts;
}

export async function getAllTags() {
  const tags = new Map<string, number>();
  const posts = await getAllPosts();

  for (const post of posts) {
    for (const tag of post.tags) {
      tags.set(tag, (tags.get(tag) ?? 0) + 1);
    }
  }

  return [...tags.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function slugifyTag(tag: string) {
  return tag
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function tagFromSlug(slug: string, tags: Array<{ tag: string; count: number }>) {
  const normalized = slugifyTag(slug);
  return tags.find((item) => slugifyTag(item.tag) === normalized)?.tag ?? slug.replace(/-/g, ' ');
}

export async function getPostsByTag(tag: string) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.some((item) => item.toLowerCase() === tag.toLowerCase()));
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { content, meta } = parseFrontmatter(filePath);
  const contentHtml = await renderMarkdown(content);

  return {
    ...meta,
    contentHtml,
  } satisfies BlogPost;
}

export async function getPaginatedPosts(page: number, perPage = site.blog.perPage) {
  const posts = await getAllPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;

  return {
    posts: posts.slice(start, start + perPage),
    page: safePage,
    perPage,
    totalPages,
    totalPosts: posts.length,
  };
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function getAbsolutePostUrl(slug: string) {
  return `${site.url}/blog/${slug}`;
}

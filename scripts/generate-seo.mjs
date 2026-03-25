import fs from 'node:fs/promises';
import path from 'node:path';

import matter from 'gray-matter';
import { Feed } from 'feed';

const root = process.cwd();
const postsDirectory = path.join(root, 'content/blog');
const publicDirectory = path.join(root, 'public');
const siteUrl = 'https://oler.pages.dev';
const siteTitle = 'Rodrigo Oler';
const siteDescription = 'Senior software engineer, founder, and CTO focused on scalable products, editorial systems, SEO-first publishing, and fast-moving product teams.';

async function readPosts() {
  try {
    const files = await fs.readdir(postsDirectory);
    const posts = [];

    for (const file of files) {
      if (!file.endsWith('.md')) continue;

      const slug = file.replace(/\.md$/, '');
      const raw = await fs.readFile(path.join(postsDirectory, file), 'utf8');
      const { data } = matter(raw);

      if (data.draft) continue;
      if (!data.title || !data.description || !data.date || !Array.isArray(data.tags)) continue;

      posts.push({
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags,
      });
    }

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

async function writeFile(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf8');
}

function buildSitemap(posts) {
  const totalPages = Math.max(1, Math.ceil(posts.length / 6));
  const urls = [
    `${siteUrl}/`,
    `${siteUrl}/blog`,
    `${siteUrl}/blog/archive`,
    `${siteUrl}/cv`,
  ];

  for (let page = 2; page <= totalPages; page += 1) {
    urls.push(`${siteUrl}/blog/page/${page}`);
  }

  const tagSet = new Set();
  for (const post of posts) {
    urls.push(`${siteUrl}/blog/${post.slug}`);
    for (const tag of post.tags) tagSet.add(tag);
  }

  for (const tag of tagSet) {
    urls.push(`${siteUrl}/blog/tags/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((url) => `  <url><loc>${url}</loc><changefreq>weekly</changefreq><priority>${url.endsWith('/blog') ? '0.9' : url.endsWith('/cv') ? '0.7' : '0.8'}</priority></url>`)
      .join('\n') +
    `\n</urlset>\n`;

  return xml;
}

function buildRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
}

function buildFeed(posts) {
  const feed = new Feed({
    title: `${siteTitle} - Blog`,
    description: siteDescription,
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    favicon: `${siteUrl}/favicon.svg`,
    copyright: `Copyright ${new Date().getFullYear()}, Rodrigo Oler`,
    updated: posts[0] ? new Date(posts[0].date) : new Date(),
    feedLinks: {
      rss: `${siteUrl}/rss.xml`,
    },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/blog/${post.slug}`,
      link: `${siteUrl}/blog/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
      category: post.tags.map((term) => ({ name: term })),
    });
  }

  return feed.rss2();
}

async function main() {
  const posts = await readPosts();

  await writeFile(path.join(publicDirectory, 'robots.txt'), buildRobots());
  await writeFile(path.join(publicDirectory, 'sitemap.xml'), buildSitemap(posts));
  await writeFile(path.join(publicDirectory, 'rss.xml'), buildFeed(posts));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

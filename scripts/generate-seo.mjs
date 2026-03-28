import fs from 'node:fs/promises';
import path from 'node:path';

import matter from 'gray-matter';
import { Feed } from 'feed';
import sharp from 'sharp';

const root = process.cwd();
const postsDirectory = path.join(root, 'content/blog');
const publicDirectory = path.join(root, 'public');
const ogDirectory = path.join(publicDirectory, 'og-images');
const siteUrl = 'https://oler.pages.dev';
const siteTitle = 'Rodrigo Oler';
const siteDescription =
  'Senior software engineer, founder, and CTO focused on scalable products, editorial systems, SEO-first publishing, and fast-moving product teams.';

function comparePostsByDateDesc(a, b) {
  const dateDelta = new Date(b.date).getTime() - new Date(a.date).getTime();

  if (dateDelta !== 0) {
    return dateDelta;
  }

  return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text, maxChars = 28, maxLines = 3) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars || !current) {
      current = next;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) {
    lines.push(current);
  }

  if (lines.length > maxLines) {
    const trimmed = lines.slice(0, maxLines);
    const last = trimmed[maxLines - 1];
    trimmed[maxLines - 1] = last.replace(/\s+\S+$/, '') + '...';
    return trimmed;
  }

  return lines;
}

async function readPosts() {
  try {
    const files = await fs.readdir(postsDirectory);
    const posts = [];

    for (const file of files) {
      if (!file.endsWith('.md')) continue;

      const slug = file.replace(/\.md$/, '');
      const filePath = path.join(postsDirectory, file);
      const raw = await fs.readFile(filePath, 'utf8');
      const { data } = matter(raw);
      const stat = await fs.stat(filePath);

      if (data.draft) continue;
      if (!data.title || !data.description || !data.date || !Array.isArray(data.tags)) continue;

      posts.push({
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags,
        lastModified: stat.mtime.toISOString(),
      });
    }

    return posts.sort(comparePostsByDateDesc);
  } catch {
    return [];
  }
}

async function fileLastModified(filePath) {
  try {
    return (await fs.stat(filePath)).mtime.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

async function writeFile(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf8');
}

async function cleanOgImageDirectory() {
  try {
    const entries = await fs.readdir(ogDirectory);
    await Promise.all(
      entries
        .filter((file) => file.endsWith('.svg'))
        .map((file) => fs.rm(path.join(ogDirectory, file), { force: true })),
    );
  } catch {
    // Ignore missing directories; they are created on demand.
  }
}

function buildOgImage(post) {
  const lines = wrapText(post.title, 22, 3);
  const tagLine = post.tags.slice(0, 4).join(' · ').toUpperCase();
  const safeDescription = escapeXml(post.description);
  const safeTags = escapeXml(tagLine);
  const titleFontSize = lines.length === 1 ? 60 : lines.length === 2 ? 54 : 48;
  const titleLineGap = lines.length === 1 ? 78 : lines.length === 2 ? 72 : 66;
  const titleTop = lines.length === 1 ? 292 : lines.length === 2 ? 276 : 260;
  const descriptionTop = lines.length === 1 ? 520 : lines.length === 2 ? 524 : 528;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#04060d"/>
      <stop offset="1" stop-color="#0b1020"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#00ffc8"/>
      <stop offset="0.5" stop-color="#6e4dff"/>
      <stop offset="1" stop-color="#ff2d9b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect x="48" y="48" width="1104" height="534" rx="26" fill="#080b14" fill-opacity="0.96" stroke="#00ffc8" stroke-opacity="0.16" />
  <rect x="80" y="80" width="120" height="6" rx="3" fill="url(#accent)" />
  <text x="80" y="142" fill="#00ffc8" font-family="Inter, Arial, sans-serif" font-size="24" letter-spacing="4">RODRIGO OLER</text>
  <text x="80" y="186" fill="#6e7a9f" font-family="Inter, Arial, sans-serif" font-size="18">${escapeXml(siteTitle)} · blog</text>
  ${lines
    .map(
      (line, index) =>
        `<text x="80" y="${titleTop + index * titleLineGap}" fill="#e8eeff" font-family="Inter, Arial, sans-serif" font-size="${titleFontSize}" font-weight="800">${escapeXml(line)}</text>`,
    )
    .join('\n  ')}
  <text x="80" y="${descriptionTop}" fill="#6e7a9f" font-family="IBM Plex Mono, monospace" font-size="18">${safeDescription}</text>
  <text x="80" y="560" fill="#00ffc8" font-family="IBM Plex Mono, monospace" font-size="16" letter-spacing="1.5">${safeTags}</text>
</svg>`;
}

async function writeOgImage(post) {
  const filePath = path.join(ogDirectory, `${post.slug}.png`);
  const svg = buildOgImage(post);

  await fs.mkdir(ogDirectory, { recursive: true });
  await sharp(Buffer.from(svg)).png().toFile(filePath);
}

async function buildSitemap(posts) {
  const totalPages = Math.max(1, Math.ceil(posts.length / 6));
  const latestPostMod = posts[0]?.lastModified ?? new Date().toISOString();
  const tagMap = new Map();

  const urls = [
    { loc: `${siteUrl}/`, lastmod: await fileLastModified(path.join(root, 'index.html')) },
    { loc: `${siteUrl}/blog`, lastmod: latestPostMod },
    { loc: `${siteUrl}/blog/archive`, lastmod: latestPostMod },
    { loc: `${siteUrl}/cv`, lastmod: await fileLastModified(path.join(root, 'cv.html')) },
  ];

  for (let page = 2; page <= totalPages; page += 1) {
    const pagePosts = posts.slice((page - 1) * 6, page * 6);
    urls.push({
      loc: `${siteUrl}/blog/page/${page}`,
      lastmod: pagePosts[0]?.lastModified ?? latestPostMod,
    });
  }

  for (const post of posts) {
    urls.push({
      loc: `${siteUrl}/blog/${post.slug}`,
      lastmod: post.lastModified,
    });
    for (const tag of post.tags) {
      const slug = slugify(tag);
      const existing = tagMap.get(slug);
      if (!existing || new Date(existing.lastmod).getTime() < new Date(post.lastModified).getTime()) {
        tagMap.set(slug, {
          loc: `${siteUrl}/blog/tags/${slug}`,
          lastmod: post.lastModified,
        });
      }
    }
  }

  urls.push(...tagMap.values());

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (entry) =>
          `  <url><loc>${entry.loc}</loc><lastmod>${entry.lastmod}</lastmod><changefreq>weekly</changefreq><priority>${entry.loc.endsWith('/blog') ? '0.9' : entry.loc.endsWith('/cv') ? '0.7' : '0.8'}</priority></url>`,
      )
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
    updated: posts[0] ? new Date(posts[0].lastModified) : new Date(),
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
      updated: new Date(post.lastModified),
      category: post.tags.map((term) => ({ name: term })),
    });
  }

  return feed.rss2();
}

function buildLlmTxt(posts) {
  const lines = [];
  lines.push(`# ${siteTitle}`);
  lines.push('');
  lines.push(siteDescription);
  lines.push('');
  lines.push('## Key pages');
  lines.push(`- ${siteUrl}/`);
  lines.push(`- ${siteUrl}/blog`);
  lines.push(`- ${siteUrl}/blog/archive`);
  lines.push(`- ${siteUrl}/cv`);
  lines.push(`- ${siteUrl}/rss.xml`);
  lines.push(`- ${siteUrl}/sitemap.xml`);
  lines.push('');
  lines.push('## Recent articles');
  for (const post of posts.slice(0, 8)) {
    lines.push(`- ${siteUrl}/blog/${post.slug} — ${post.description}`);
  }
  lines.push('');
  lines.push('## Notes');
  lines.push('- Blog posts are written in English.');
  lines.push('- Content is Markdown-first and rendered statically at build time.');
  lines.push('- Canonical URLs are preserved for republished articles.');
  lines.push('- Sitemap, RSS, and social images are generated from the same source files.');

  return `${lines.join('\n')}\n`;
}

async function main() {
  const posts = await readPosts();

  await cleanOgImageDirectory();

  await writeFile(path.join(publicDirectory, 'robots.txt'), buildRobots());
  await writeFile(path.join(publicDirectory, 'sitemap.xml'), await buildSitemap(posts));
  await writeFile(path.join(publicDirectory, 'rss.xml'), buildFeed(posts));
  await writeFile(path.join(publicDirectory, 'llms.txt'), buildLlmTxt(posts));

  for (const post of posts) {
    await writeOgImage(post);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

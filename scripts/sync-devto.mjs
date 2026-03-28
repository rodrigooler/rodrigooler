import fs from 'node:fs/promises';
import path from 'node:path';

import matter from 'gray-matter';

const root = process.cwd();
const postsDirectory = path.join(root, 'content/blog');
const siteConfigPath = path.join(root, 'data/site.json');
const devtoApiBase = 'https://dev.to/api';

async function loadSite() {
  const raw = await fs.readFile(siteConfigPath, 'utf8');
  return JSON.parse(raw);
}

function stripFrontmatter(markdown = '') {
  return String(markdown).replace(/^---[\s\S]*?---\s*/m, '').trim();
}

function sanitizeText(value = '') {
  return String(value).replace(/\s+/g, ' ').replace(/\\"/g, '"').replace(/"+$/g, '').trim();
}

function absolutizeRelativeLinks(markdown, siteUrl) {
  return markdown.replace(/(!?\[[^\]]*\])\((\/[^)\s]+)\)/g, (_, prefix, target) => `${prefix}(${siteUrl}${target})`);
}

function isDevToImport(data) {
  const canonical = String(data.canonical || '').toLowerCase();
  return Boolean(data.devto) || canonical.includes('dev.to');
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Request failed for ${url}: ${response.status} ${response.statusText}${body ? ` - ${body}` : ''}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function getLocalPosts(siteUrl) {
  const files = await fs.readdir(postsDirectory);
  const posts = [];

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const slug = file.replace(/\.md$/, '');
    const filePath = path.join(postsDirectory, file);
    const raw = await fs.readFile(filePath, 'utf8');
    const { content, data } = matter(raw);

    if (data.draft) continue;
    if (isDevToImport(data)) continue;
    if (!data.title || !data.description || !data.date || !Array.isArray(data.tags)) continue;

    const tags = [...new Set(data.tags)].slice(0, 4);
    const canonicalUrl = data.canonical || `${siteUrl}/blog/${slug}`;
    const mainImage = data.coverImage || data.cover_image || `${siteUrl}/og-images/${slug}.svg`;
    const body = absolutizeRelativeLinks(stripFrontmatter(content), siteUrl);

    posts.push({
      slug,
      title: sanitizeText(data.title),
      description: sanitizeText(data.description),
      canonicalUrl,
      mainImage,
      tags,
      body,
    });
  }

  return posts.sort((a, b) => a.slug.localeCompare(b.slug));
}

async function getDevToArticles(username) {
  const articles = await fetchJson(`${devtoApiBase}/articles?username=${encodeURIComponent(username)}&per_page=1000`);
  return Array.isArray(articles) ? articles : [];
}

async function syncArticle({ apiKey, username, siteUrl, article, existing }) {
  const payload = {
    article: {
      title: article.title,
      body_markdown: article.body,
      published: true,
      tags: article.tags,
      canonical_url: article.canonicalUrl,
      main_image: article.mainImage,
      description: article.description,
    },
  };

  const headers = {
    'content-type': 'application/json',
    accept: 'application/vnd.forem.api-v1+json',
    'api-key': apiKey,
  };

  if (existing) {
    const response = await fetchJson(`${devtoApiBase}/articles/${existing.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload),
    });

    return {
      action: 'updated',
      slug: article.slug,
      url: response?.url || existing.url,
    };
  }

  const response = await fetchJson(`${devtoApiBase}/articles`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  return {
    action: 'created',
    slug: article.slug,
    url: response?.url,
  };
}

async function main() {
  const apiKey = process.env.DEVTO_API_KEY;
  const username = process.env.DEVTO_USERNAME || 'oler';
  const strict = process.env.DEVTO_SYNC_STRICT === '1';

  if (!apiKey) {
    console.log('[dev.to] DEVTO_API_KEY not set, skipping sync.');
    return;
  }

  const site = await loadSite();
  const siteUrl = site.url || 'https://oler.pages.dev';
  const localPosts = await getLocalPosts(siteUrl);
  const remoteArticles = await getDevToArticles(username);
  const remoteBySlug = new Map(remoteArticles.map((article) => [article.slug, article]));

  if (!localPosts.length) {
    console.log('[dev.to] No eligible local posts found.');
    return;
  }

  const results = [];

  for (const article of localPosts) {
    try {
      const existing = remoteBySlug.get(article.slug);
      const result = await syncArticle({
        apiKey,
        username,
        siteUrl,
        article,
        existing,
      });

      results.push(result);
      console.log(`[dev.to] ${result.action} ${article.slug}${result.url ? ` -> ${result.url}` : ''}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      if (strict) {
        throw error;
      }

      console.warn(`[dev.to] Failed to sync ${article.slug}: ${message}`);
    }
  }

  if (!results.length) {
    console.log('[dev.to] No articles were synced.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

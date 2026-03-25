import fs from 'node:fs/promises';
import path from 'node:path';

const username = 'oler';
const outputDir = path.join(process.cwd(), 'content/blog');

function frontmatterValue(value) {
  return JSON.stringify(value);
}

function sanitizeText(value = '') {
  return String(value).replace(/\s+/g, ' ').replace(/\\"/g, '"').replace(/"+$/g, '').trim();
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status}`);
  }
  return response.json();
}

async function getArticles() {
  const articles = await fetchJson(`https://dev.to/api/articles?username=${username}&per_page=100`);
  return articles
    .filter((article) => article.language === 'en')
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
}

async function getArticle(slug) {
  return fetchJson(`https://dev.to/api/articles/${username}/${slug}`);
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });

  for (const entry of await fs.readdir(outputDir)) {
    if (entry.endsWith('.md')) {
      await fs.unlink(path.join(outputDir, entry));
    }
  }

  const list = await getArticles();

  for (const article of list) {
    const full = await getArticle(article.slug);
    const publishedDate = new Date(full.published_at).toISOString().slice(0, 10);
    const tags = Array.isArray(full.tags) ? full.tags : [];
    const body = (full.body_markdown || '').replace(/^---[\s\S]*?---\s*/m, '').trim();
    const description = sanitizeText(full.description);
    const title = sanitizeText(full.title);

    const markdown = `---\n` +
      `title: ${frontmatterValue(title)}\n` +
      `description: ${frontmatterValue(description)}\n` +
      `date: ${frontmatterValue(publishedDate)}\n` +
      `tags: ${JSON.stringify(tags)}\n` +
      `canonical: ${frontmatterValue(full.canonical_url || full.url)}\n` +
      `devto: ${frontmatterValue(full.url)}\n` +
      `readingTime: ${frontmatterValue(`${full.reading_time_minutes} min read`)}\n` +
      `coverImage: ${frontmatterValue(full.cover_image || full.social_image || '')}\n` +
      `featured: ${article.positive_reactions_count >= 20 ? 'true' : 'false'}\n` +
      `---\n\n${body}\n`;

    await fs.writeFile(path.join(outputDir, `${full.slug}.md`), markdown, 'utf8');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

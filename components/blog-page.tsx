import Link from 'next/link';

import { formatPostDate, slugifyTag } from '@/lib/blog';
import type { BlogPost, BlogPostMeta } from '@/lib/blog';
import { site } from '@/lib/site';
import { TranslateButton } from '@/components/translate-button';

function pageBackground() {
  return (
    <div className="legacy-bg-layer">
      <div className="legacy-bg-grid" />
      <div className="legacy-bg-noise" />
      <div className="legacy-bg-radial" />
      <div className="legacy-bg-radial-2" />
      <div className="legacy-scanlines" />
    </div>
  );
}

function header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-[rgba(4,6,13,0.8)] px-[5vw] backdrop-blur-[16px]">
      <Link href="/" className="font-mono text-[1.05rem] font-semibold tracking-[1px] text-[color:var(--accent)]">
        RO<span className="text-[color:var(--muted)]">_</span>
      </Link>
      <nav className="hidden gap-7 font-mono text-[0.88rem] text-[color:var(--muted)] md:flex">
        <Link href="/" className="transition hover:text-[color:var(--text)]">
          Home
        </Link>
        <Link href="/cv" className="transition hover:text-[color:var(--text)]">
          CV
        </Link>
        <Link href="/blog" className="transition hover:text-[color:var(--text)]">
          Blog
        </Link>
        <a href={`mailto:${site.email}`} className="transition hover:text-[color:var(--text)]">
          Contact
        </a>
      </nav>
      <Link
        href="/cv"
        className="rounded-[6px] border border-[color:var(--border-neon)] bg-[color:var(--neon-dim)] px-[18px] py-2 font-mono text-[0.82rem] font-medium tracking-[1px] text-[color:var(--neon)] transition hover:bg-[rgba(0,255,200,0.2)] hover:shadow-[var(--glow)]"
      >
        ↗ CV / PDF
      </Link>
    </header>
  );
}

function sectionLabel(label: string) {
  return (
    <div className="mb-3 flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[3px] text-[color:var(--neon)]">
      <span className="block h-px w-6 bg-[color:var(--neon)]" />
      {label}
    </div>
  );
}

function tagClass(kind: 'tag' | 'pill' = 'tag') {
  return kind === 'pill'
    ? 'rounded-[999px] border border-[rgba(0,255,200,0.15)] bg-[rgba(0,255,200,0.07)] px-[10px] py-[4px] font-mono text-[0.68rem] text-[color:var(--neon)]'
    : 'rounded-[4px] border border-[rgba(110,77,255,0.25)] bg-[rgba(110,77,255,0.12)] px-[10px] py-[4px] font-mono text-[0.7rem] text-[#a990ff]';
}

function ArticleCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="group relative overflow-hidden rounded-[12px] border border-[color:var(--border)] bg-[color:var(--card)] p-7 transition hover:-translate-y-1 hover:border-[rgba(255,255,255,0.1)]">
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[color:var(--neon-2)] via-[color:var(--neon)] to-[color:var(--magenta)] opacity-0 transition group-hover:opacity-100" />
      <p className="mb-4 font-mono text-[0.72rem] text-[color:var(--muted)]">{formatPostDate(post.date)}</p>
      <Link href={`/blog/${post.slug}`}>
        <h3 className="mb-3 font-display text-[1.15rem] font-bold leading-tight text-white transition group-hover:text-[color:var(--neon)]">
          {post.title}
        </h3>
      </Link>
      <p className="mb-5 text-[0.9rem] leading-[1.6] text-[color:var(--muted)]">{post.description}</p>
      <div className="flex flex-wrap gap-2">
        {post.tags.slice(0, 3).map((tag) => (
          <span key={tag} className={tagClass('pill')}>
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between font-mono text-[0.72rem]">
        <span className="text-[color:var(--muted)]">{post.readingTime}</span>
        <Link href={`/blog/${post.slug}`} className="border-b border-[rgba(0,255,200,0.25)] text-white transition hover:text-[color:var(--neon)]">
          Read more
        </Link>
      </div>
    </article>
  );
}

function TerminalPreview({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <div className="w-full max-w-[520px]">
      <div className="mb-4 overflow-hidden rounded-[12px] border border-[color:var(--border)] bg-[rgba(4,7,18,0.97)] shadow-[0_40px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_60px_rgba(0,255,200,0.04)]">
        <div className="flex items-center gap-2 border-b border-[color:var(--border)] bg-[rgba(255,255,255,0.025)] px-4 py-3">
          <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[0.78rem] text-[color:var(--muted)]">~ /blog/rodrigo</span>
        </div>
        <div className="space-y-2 p-5 font-mono text-[0.82rem] leading-[1.75]">
          <p className="text-[color:var(--neon)]">rodrigo@oler:~$ blog status</p>
          <p className="text-white">articles: {posts.length}</p>
          <p className="text-[color:var(--muted)]">focus: SEO, React, TailwindCSS, content systems</p>
          <p className="text-[color:var(--magenta)]">publish mode: daily</p>
          <p className="text-[color:var(--amber)]">current pipeline: Markdown {"->"} build {"->"} sitemap/rss</p>
          <div className="pt-2">
            {posts.slice(0, 4).map((post) => (
              <p key={post.slug} className="text-[color:var(--text)]">
                <span className="text-[color:var(--neon-2)]">-</span> {post.slug}
              </p>
            ))}
          </div>
          <p className="text-[color:var(--muted)]">
            <span className="inline-block h-[14px] w-[8px] animate-pulse bg-[color:var(--neon)] align-text-bottom" />
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[8px] border border-[color:var(--border)] bg-[var(--card)] p-4">
          <p className="mb-1 font-mono text-[0.68rem] uppercase tracking-[1px] text-[color:var(--muted)]">Posts</p>
          <p className="font-display text-[1.1rem] font-bold text-[color:var(--neon)]">{posts.length}</p>
        </div>
        <div className="rounded-[8px] border border-[color:var(--border)] bg-[var(--card)] p-4">
          <p className="mb-1 font-mono text-[0.68rem] uppercase tracking-[1px] text-[color:var(--muted)]">Mode</p>
          <p className="font-display text-[1.1rem] font-bold text-[color:var(--neon)]">React</p>
        </div>
        <div className="rounded-[8px] border border-[color:var(--border)] bg-[var(--card)] p-4">
          <p className="mb-1 font-mono text-[0.68rem] uppercase tracking-[1px] text-[color:var(--muted)]">SEO</p>
          <p className="font-display text-[1.1rem] font-bold text-[color:var(--neon)]">Static</p>
        </div>
        <div className="rounded-[8px] border border-[color:var(--border)] bg-[var(--card)] p-4">
          <p className="mb-1 font-mono text-[0.68rem] uppercase tracking-[1px] text-[color:var(--muted)]">RSS</p>
          <p className="font-display text-[1.1rem] font-bold text-[color:var(--neon)]">On</p>
        </div>
      </div>
    </div>
  );
}

function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-[color:var(--border)] px-0 py-0">
      <div className="flex animate-[scroll_28s_linear_infinite] whitespace-nowrap">
        {doubled.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-0 px-9 py-[14px] font-mono text-[0.78rem] uppercase tracking-[2px] text-[color:var(--muted)]"
          >
            {item}
            <span className="ml-9 text-[color:var(--neon-2)]">//</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function BlogHero({ posts }: { posts: BlogPostMeta[] }) {
  const latest = posts[0];

  return (
    <section className="grid min-h-screen grid-cols-1 gap-0 pt-16 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-[5vw] py-20 lg:px-[8vw] lg:py-20">
        <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--border-neon)] bg-[color:var(--neon-dim)] px-[14px] py-[6px] font-mono text-[0.78rem] text-[color:var(--neon)]">
          <span className="h-[7px] w-[7px] rounded-full bg-[color:var(--neon)] shadow-[0_0_8px_var(--neon)]" />
          Publishing daily
        </div>
        <h1 className="mb-4 font-display text-[clamp(3rem,5.5vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
          Writing
          <span className="block text-[color:var(--neon)] [-webkit-text-stroke:1px_var(--neon)]">
            about shipping.
          </span>
        </h1>
        <p className="mb-7 font-mono text-[0.9rem] tracking-[0.5px] text-[color:var(--muted)]">
          React · TailwindCSS · <span className="text-[color:var(--magenta)]">Markdown</span> · SEO · Content
          systems
        </p>
        <p className="mb-9 max-w-[480px] text-[1rem] leading-[1.7] text-[color:var(--muted)]">
          A technical blog built from Markdown in Git, designed to ship fast, stay searchable, and sit in the same visual
          system as the original site.
        </p>
        <div className="mb-10 flex flex-wrap gap-3">
          <Link
            href="/blog/archive"
            className="inline-flex items-center gap-2 rounded-[8px] bg-[color:var(--neon)] px-6 py-3 text-[0.9rem] font-semibold text-[#04060d] transition hover:-translate-y-px hover:shadow-[0_0_30px_rgba(0,255,200,0.4)]"
          >
            View archive
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[8px] border border-[color:var(--border)] bg-transparent px-6 py-3 text-[0.9rem] font-medium text-[color:var(--muted)] transition hover:border-[color:var(--muted-2)] hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/cv"
            className="inline-flex items-center gap-2 rounded-[8px] border border-[color:var(--border)] bg-transparent px-6 py-3 text-[0.9rem] font-medium text-[color:var(--muted)] transition hover:border-[color:var(--muted-2)] hover:text-white"
          >
            CV
          </Link>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col">
            <span className="font-display text-[1.8rem] font-extrabold text-white">{posts.length}</span>
            <span className="font-mono text-[0.72rem] uppercase tracking-[1px] text-[color:var(--muted)]">Articles</span>
          </div>
          <span className="text-[color:var(--muted-2)]">|</span>
          <div className="flex flex-col">
            <span className="font-display text-[1.8rem] font-extrabold text-white">{latest ? latest.readingTime : '0 min'}</span>
            <span className="font-mono text-[0.72rem] uppercase tracking-[1px] text-[color:var(--muted)]">Latest read</span>
          </div>
          <span className="text-[color:var(--muted-2)]">|</span>
          <div className="flex flex-col">
            <span className="font-display text-[1.8rem] font-extrabold text-white">React</span>
            <span className="font-mono text-[0.72rem] uppercase tracking-[1px] text-[color:var(--muted)]">Stack</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-[5vw] py-20 lg:px-[8vw] lg:py-20">
        <TerminalPreview posts={posts} />
      </div>
    </section>
  );
}

export function BlogIndexPage({
  posts,
  tags,
  currentPage,
  totalPages,
}: {
  posts: BlogPostMeta[];
  tags: Array<{ tag: string; count: number }>;
  currentPage: number;
  totalPages: number;
}) {
  return (
    <main className="relative overflow-hidden">
      {pageBackground()}
      {header()}
      <BlogHero posts={posts} />
      <Marquee
        items={[
          'Markdown Source',
          'SEO-first',
          'Daily Posts',
          'React',
          'TailwindCSS',
          'Canonical URLs',
          'RSS',
          'Tags',
        ]}
      />

      <section className="px-[5vw] py-[100px] lg:px-[8vw]">
        {sectionLabel('Latest Posts')}
        <h2 className="mb-4 font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
          Where the archive starts.
        </h2>
        <p className="mb-12 max-w-[560px] text-[1rem] leading-[1.6] text-[color:var(--muted)]">
          Fresh articles, republished notes, and evergreen technical posts. The list is generated from Markdown at build
          time.
        </p>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <article key={post.slug} className="relative overflow-hidden rounded-[12px] border border-[color:var(--border)] bg-[color:var(--card)] p-7 transition hover:-translate-y-1">
              <div className="mb-4 font-mono text-[0.72rem] text-[color:var(--muted-2)]">0{index + 1}</div>
              <Link href={`/blog/${post.slug}`}>
                <h3 className="mb-3 font-display text-[1.15rem] font-bold text-white transition hover:text-[color:var(--neon)]">
                  {post.title}
                </h3>
              </Link>
              <p className="mb-5 text-[0.9rem] leading-[1.6] text-[color:var(--muted)]">{post.description}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={tagClass('pill')}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 font-mono text-[0.75rem] text-[color:var(--muted)]">
          {currentPage > 1 ? (
            <Link
              href={currentPage === 2 ? '/blog' : `/blog/page/${currentPage - 1}`}
              scroll={false}
              className="border-b border-[rgba(0,255,200,0.25)] text-white"
            >
              Previous
            </Link>
          ) : (
            <span />
          )}
          <span>
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages ? (
            <Link
              href={`/blog/page/${currentPage + 1}`}
              scroll={false}
              className="border-b border-[rgba(0,255,200,0.25)] text-white"
            >
              Next
            </Link>
          ) : (
            <span />
          )}
        </div>
      </section>

      <section className="border-y border-[color:var(--border)] px-[5vw] py-[100px] lg:px-[8vw]">
        {sectionLabel('Topics')}
        <h2 className="mb-4 font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
          Search by focus area.
        </h2>
        <p className="mb-12 max-w-[560px] text-[1rem] leading-[1.6] text-[color:var(--muted)]">
          Clusters that are easy to scan, easy to link, and easy to keep fresh.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {tags.map((item) => (
            <Link
              key={item.tag}
              href={`/blog/tags/${slugifyTag(item.tag)}`}
              className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--card)] p-4 text-center transition hover:-translate-y-0.5 hover:border-[rgba(0,255,200,0.2)]"
            >
              <div className="font-display text-[1.1rem] font-bold text-[color:var(--neon)]">{item.count}</div>
              <div className="mt-1 font-mono text-[0.78rem] text-[color:var(--muted)]">{item.tag}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-[5vw] py-[100px] lg:px-[8vw]">
        {sectionLabel('Archive')}
        <h2 className="mb-4 font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
          Every post in one place.
        </h2>
        <p className="mb-12 max-w-[560px] text-[1rem] leading-[1.6] text-[color:var(--muted)]">
          A searchable archive with the same visual DNA as the original site.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {posts.slice(0, 4).map((post) => (
            <article key={post.slug} className="rounded-[12px] border border-[color:var(--border)] bg-[color:var(--card)] p-7">
              <p className="mb-2 font-mono text-[0.72rem] text-[color:var(--muted)]">{formatPostDate(post.date)}</p>
              <Link href={`/blog/${post.slug}`}>
                <h3 className="font-display text-[1.15rem] font-bold text-white">{post.title}</h3>
              </Link>
              <p className="mt-3 text-[0.9rem] leading-[1.6] text-[color:var(--muted)]">{post.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/blog/archive" className="border-b border-[rgba(0,255,200,0.25)] font-mono text-[0.75rem] text-white">
            View full archive
          </Link>
        </div>
      </section>
    </main>
  );
}

export function BlogTagPage({
  posts,
  tagLabel,
}: {
  posts: BlogPostMeta[];
  tagLabel: string;
}) {
  return (
    <main className="relative overflow-hidden">
      {pageBackground()}
      {header()}
      <section className="grid min-h-[60vh] place-items-center px-[5vw] pt-24 lg:px-[8vw]">
        <div className="max-w-4xl">
          {sectionLabel('Topic archive')}
          <h1 className="font-display text-[clamp(3rem,5.5vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            Posts tagged
            <span className="block text-[color:var(--neon)] [-webkit-text-stroke:1px_var(--neon)]">{tagLabel}.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-[1rem] leading-[1.7] text-[color:var(--muted)]">
            Grouped for readers and search engines. Same content architecture, same visual language.
          </p>
        </div>
      </section>
      <section className="px-[5vw] pb-[100px] lg:px-[8vw]">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}

export function BlogArchivePage({ posts }: { posts: BlogPostMeta[] }) {
  const grouped = posts.reduce<Record<string, BlogPostMeta[]>>((acc, post) => {
    const year = new Date(post.date).getFullYear().toString();
    acc[year] = acc[year] ?? [];
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <main className="relative overflow-hidden">
      {pageBackground()}
      {header()}
      <section className="grid min-h-[60vh] place-items-center px-[5vw] pt-24 lg:px-[8vw]">
        <div className="max-w-4xl">
          {sectionLabel('Archive')}
          <h1 className="font-display text-[clamp(3rem,5.5vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            Every post in one
            <span className="block text-[color:var(--neon)] [-webkit-text-stroke:1px_var(--neon)]">place.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-[1rem] leading-[1.7] text-[color:var(--muted)]">
            Browse the full history in the same system as the rest of the site.
          </p>
        </div>
      </section>
      <section className="px-[5vw] pb-[100px] lg:px-[8vw]">
        {years.map((year) => (
          <section key={year} className="mb-12">
            {sectionLabel(year)}
            <div className="mb-6 font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              {grouped[year].length} post{grouped[year].length === 1 ? '' : 's'}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {grouped[year].map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ))}
      </section>
    </main>
  );
}

export function BlogPostPage({
  post,
  relatedPosts,
}: {
  post: BlogPost;
  relatedPosts: BlogPostMeta[];
}) {
  return (
    <main className="relative overflow-hidden">
      {pageBackground()}
      {header()}

      <section className="grid min-h-[60vh] place-items-center px-[5vw] pt-24 lg:px-[8vw]">
        <div className="max-w-4xl">
          {sectionLabel('Article')}
          <h1 className="font-display text-[clamp(3rem,5.5vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            {post.title}
          </h1>
          <p className="mt-6 max-w-3xl text-[1rem] leading-[1.7] text-[color:var(--muted)]">{post.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[0.78rem] text-[color:var(--muted)]">
            <span>{formatPostDate(post.date)}</span>
            <span className="text-[color:var(--muted-2)]">|</span>
            <span>{post.readingTime}</span>
            <span className="text-[color:var(--muted-2)]">|</span>
            <span>Markdown source</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/blog/tags/${slugifyTag(tag)}`} className={tagClass('pill')}>
                {tag}
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <TranslateButton />
          </div>
        </div>
      </section>

      <section className="px-[5vw] pb-[100px] lg:px-[8vw]">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[12px] border border-[color:var(--border)] bg-[color:var(--card)] p-7 sm:p-8">
            <div
              className="prose prose-invert max-w-none prose-headings:font-display prose-p:leading-8 prose-li:leading-8 prose-a:text-[color:var(--neon)]"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
            {post.canonical ? (
              <p className="mt-8 font-mono text-[0.85rem] text-[color:var(--muted)]">
                Canonical source:{' '}
                <a className="border-b border-[rgba(0,255,200,0.25)] text-[color:var(--neon)]" href={post.canonical}>
                  {post.canonical}
                </a>
              </p>
            ) : null}
          </article>

          <aside className="space-y-6">
            <div className="rounded-[12px] border border-[color:var(--border)] bg-[color:var(--card)] p-7">
              {sectionLabel('Notes')}
              <ul className="space-y-3 text-[0.92rem] leading-[1.7] text-[color:var(--muted)]">
                <li>Posts are written in Markdown and rendered at build time.</li>
                <li>Metadata, sitemap, and RSS are generated from the same source.</li>
                <li>Navigation stays consistent with the original site language.</li>
              </ul>
            </div>
            <div className="rounded-[12px] border border-[color:var(--border)] bg-[color:var(--card)] p-7">
              {sectionLabel('Navigation')}
              <div className="flex flex-wrap gap-3">
                <Link href="/blog" className="rounded-[8px] border border-[color:var(--border)] px-4 py-2 font-mono text-[0.82rem] text-[color:var(--muted)]">
                  Blog
                </Link>
                <Link href="/blog/archive" className="rounded-[8px] border border-[color:var(--border)] px-4 py-2 font-mono text-[0.82rem] text-[color:var(--muted)]">
                  Archive
                </Link>
                <Link href="/cv" className="rounded-[8px] border border-[color:var(--border)] px-4 py-2 font-mono text-[0.82rem] text-[color:var(--muted)]">
                  CV
                </Link>
              </div>
            </div>
            <div className="rounded-[12px] border border-[color:var(--border)] bg-[color:var(--card)] p-7">
              {sectionLabel('Translate')}
              <p className="mb-4 text-[0.92rem] leading-[1.7] text-[color:var(--muted)]">
                Open this article in Google Translate using the language set in your browser.
              </p>
              <TranslateButton />
            </div>
          </aside>
        </div>

        {relatedPosts.length ? (
          <section className="mt-16">
            {sectionLabel('Related')}
            <h2 className="mb-4 font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              More articles worth reading.
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((item) => (
                <ArticleCard key={item.slug} post={item} />
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}

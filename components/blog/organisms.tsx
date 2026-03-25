import Link from 'next/link';

import { ArticleTranslator } from '@/components/article-translator';
import { BlogBackground, BlogHeader, SectionLabel } from '@/components/blog/atoms';
import { ArticleCard, Marquee, TagPill, TerminalPreview } from '@/components/blog/molecules';
import { formatPostDate, slugifyTag } from '@/lib/blog';
import type { BlogPost, BlogPostMeta } from '@/lib/blog';

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

function PaginationControls({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
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
      <BlogBackground />
      <BlogHeader />
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
        <SectionLabel>Latest Posts</SectionLabel>
        <h2 className="mb-4 font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
          Where the archive starts.
        </h2>
        <p className="mb-12 max-w-[560px] text-[1rem] leading-[1.6] text-[color:var(--muted)]">
          Fresh articles, republished notes, and evergreen technical posts. The list is generated from Markdown at build
          time.
        </p>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="relative overflow-hidden rounded-[12px] border border-[color:var(--border)] bg-[color:var(--card)] p-7 transition hover:-translate-y-1"
            >
              <div className="mb-4 font-mono text-[0.72rem] text-[color:var(--muted-2)]">0{index + 1}</div>
              <Link href={`/blog/${post.slug}`}>
                <h3 className="mb-3 font-display text-[1.15rem] font-bold text-white transition hover:text-[color:var(--neon)]">
                  {post.title}
                </h3>
              </Link>
              <p className="mb-5 text-[0.9rem] leading-[1.6] text-[color:var(--muted)]">{post.description}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <TagPill key={tag} tag={tag} />
                ))}
              </div>
            </article>
          ))}
        </div>

        <PaginationControls currentPage={currentPage} totalPages={totalPages} />
      </section>

      <section className="border-y border-[color:var(--border)] px-[5vw] py-[100px] lg:px-[8vw]">
        <SectionLabel>Topics</SectionLabel>
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
        <SectionLabel>Archive</SectionLabel>
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
      <BlogBackground />
      <BlogHeader />
      <section className="grid min-h-[60vh] place-items-center px-[5vw] pt-24 lg:px-[8vw]">
        <div className="max-w-4xl">
          <SectionLabel>Topic archive</SectionLabel>
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
      <BlogBackground />
      <BlogHeader />
      <section className="grid min-h-[60vh] place-items-center px-[5vw] pt-24 lg:px-[8vw]">
        <div className="max-w-4xl">
          <SectionLabel>Archive</SectionLabel>
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
            <SectionLabel>{year}</SectionLabel>
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
      <BlogBackground />
      <BlogHeader />

      <section className="px-[5vw] pt-24 pb-[100px] lg:px-[8vw]">
        <div className="mx-auto max-w-[980px]">
          <ArticleTranslator post={post} />

          {relatedPosts.length ? (
            <section className="mt-16">
              <SectionLabel>Related</SectionLabel>
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
        </div>
      </section>
    </main>
  );
}

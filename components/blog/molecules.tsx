import Link from 'next/link';

import { formatPostDate, slugifyTag } from '@/lib/blog';
import type { BlogPostMeta } from '@/lib/blog';

function tagClass(kind: 'tag' | 'pill' = 'tag') {
  return kind === 'pill'
    ? 'rounded-[999px] border border-[rgba(0,255,200,0.15)] bg-[rgba(0,255,200,0.07)] px-[10px] py-[4px] font-mono text-[0.68rem] text-[color:var(--neon)]'
    : 'rounded-[4px] border border-[rgba(110,77,255,0.25)] bg-[rgba(110,77,255,0.12)] px-[10px] py-[4px] font-mono text-[0.7rem] text-[#a990ff]';
}

export function TagPill({
  tag,
  href,
  kind = 'pill',
}: {
  tag: string;
  href?: string;
  kind?: 'tag' | 'pill';
}) {
  const className = tagClass(kind);

  if (href) {
    return (
      <Link href={href} className={className}>
        {tag}
      </Link>
    );
  }

  return <span className={className}>{tag}</span>;
}

export function ArticleCard({ post }: { post: BlogPostMeta }) {
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
          <TagPill key={tag} tag={tag} />
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

export function TerminalPreview({
  posts,
  totalPosts,
}: {
  posts: BlogPostMeta[];
  totalPosts: number;
}) {
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
          <p className="text-white">articles: {totalPosts}</p>
          <p className="text-[color:var(--muted)]">focus: SEO, React, TailwindCSS, content systems</p>
          <p className="text-[color:var(--magenta)]">publish mode: static export</p>
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
          <p className="font-display text-[1.1rem] font-bold text-[color:var(--neon)]">{totalPosts}</p>
        </div>
        <div className="rounded-[8px] border border-[color:var(--border)] bg-[var(--card)] p-4">
          <p className="mb-1 font-mono text-[0.68rem] uppercase tracking-[1px] text-[color:var(--muted)]">Mode</p>
          <p className="font-display text-[1.1rem] font-bold text-[color:var(--neon)]">Next.js</p>
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

export function Marquee({ items }: { items: string[] }) {
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

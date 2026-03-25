import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { BlogBackground, BlogHeader, SectionLabel } from '@/components/blog/atoms';
import { TopicCard } from '@/components/blog/molecules';
import { SeoJsonLd } from '@/components/seo-jsonld';
import { site } from '@/lib/site';
import { getAllPosts } from '@/lib/blog';
import { getTopicCounts } from '@/lib/topics';

export const metadata: Metadata = {
  title: 'About',
  description: 'A concise profile of Rodrigo Oler, his background, focus areas, and the editorial system behind this site.',
  alternates: {
    canonical: `${site.url}/about`,
  },
  openGraph: {
    type: 'profile',
    url: `${site.url}/about`,
    title: 'About Rodrigo Oler',
    description: 'A concise profile of Rodrigo Oler, his background, focus areas, and the editorial system behind this site.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'About Rodrigo Oler',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Rodrigo Oler',
    description: 'A concise profile of Rodrigo Oler, his background, focus areas, and the editorial system behind this site.',
    images: ['/og-image.svg'],
  },
};

export default async function Page() {
  const posts = await getAllPosts();
  const topicCounts = getTopicCounts(posts);

  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${site.url}/#person`,
        name: site.name,
        jobTitle: 'Senior Software Engineer',
        description: site.description,
        url: site.url,
        image: `${site.url}/og-image.svg`,
        sameAs: [site.github, site.linkedin],
        knowsAbout: site.focus,
      },
      {
        '@type': 'AboutPage',
        '@id': `${site.url}/about#page`,
        url: `${site.url}/about`,
        name: 'About Rodrigo Oler',
        description: site.description,
        about: { '@id': `${site.url}/#person` },
        mainEntity: { '@id': `${site.url}/#person` },
        inLanguage: 'en',
      },
    ],
  };

  return (
    <main className="relative overflow-hidden">
      <BlogBackground />
      <BlogHeader />
      <SeoJsonLd data={aboutJsonLd} />

      <section className="px-[5vw] pt-24 pb-[100px] lg:px-[8vw]">
        <div className="mx-auto max-w-[980px]">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }]} />

          <SectionLabel>About</SectionLabel>
          <h1 className="font-display text-[clamp(3rem,5.5vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            Rodrigo Oler
            <span className="block text-[color:var(--neon)] [-webkit-text-stroke:1px_var(--neon)]">
              Senior engineer and founder.
            </span>
          </h1>
          <p className="mt-6 max-w-3xl text-[1rem] leading-[1.8] text-[color:var(--muted)]">
            I work across product engineering, scalable systems, and editorial infrastructure. This site combines a
            pixel-faithful portfolio with a Markdown-first blog built to stay searchable and easy to maintain.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {site.metrics.map((metric) => (
              <article key={metric.label} className="rounded-[12px] border border-[color:var(--border)] bg-[color:var(--card)] p-6">
                <div className="font-display text-[2rem] font-extrabold text-[color:var(--neon)]">{metric.value}</div>
                <div className="mt-1 font-mono text-[0.78rem] uppercase tracking-[1px] text-[color:var(--muted)]">
                  {metric.label}
                </div>
              </article>
            ))}
          </div>

          <section className="mt-16 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[16px] border border-[color:var(--border)] bg-[color:var(--card)] p-7">
              <SectionLabel>Focus</SectionLabel>
              <h2 className="font-display text-[clamp(1.8rem,2.8vw,2.6rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
                The areas I keep shipping in.
              </h2>
              <p className="mt-4 text-[1rem] leading-[1.7] text-[color:var(--muted)]">
                TypeScript, React, Next.js, SEO, AI, and systems that need to perform reliably under real product
                pressure.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {site.focus.map((item) => (
                  <span
                    key={item}
                    className="rounded-[999px] border border-[rgba(0,255,200,0.15)] bg-[rgba(0,255,200,0.07)] px-3 py-1 font-mono text-[0.72rem] text-[color:var(--neon)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>

            <article className="rounded-[16px] border border-[color:var(--border)] bg-[color:var(--card)] p-7">
              <SectionLabel>Publishing system</SectionLabel>
              <h2 className="font-display text-[clamp(1.8rem,2.8vw,2.6rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
                Markdown-first and SEO-aware.
              </h2>
              <p className="mt-4 text-[1rem] leading-[1.7] text-[color:var(--muted)]">
                Articles live in Git, generate static pages at build time, and ship with sitemap, RSS, canonical URLs,
                structured data, and topic hubs.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/blog" className="rounded-[8px] border border-[color:var(--border)] px-4 py-2 font-mono text-[0.78rem] text-white">
                  Blog
                </Link>
                <Link href="/blog/topics" className="rounded-[8px] border border-[color:var(--border)] px-4 py-2 font-mono text-[0.78rem] text-white">
                  Topics
                </Link>
                <Link href="/blog/archive" className="rounded-[8px] border border-[color:var(--border)] px-4 py-2 font-mono text-[0.78rem] text-white">
                  Archive
                </Link>
              </div>
            </article>
          </section>

          <section className="mt-16">
            <SectionLabel>Topic hubs</SectionLabel>
            <h2 className="font-display text-[clamp(1.8rem,2.8vw,2.6rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              Core clusters in the blog.
            </h2>
            <p className="mt-4 max-w-3xl text-[1rem] leading-[1.7] text-[color:var(--muted)]">
              These hubs help readers move through related articles and help crawlers understand the site structure.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {topicCounts.map((topic) => (
                <TopicCard key={topic.slug} topic={topic} count={topic.count} href={`/blog/topics/${topic.slug}`} />
              ))}
            </div>
          </section>

          <section className="mt-16 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[16px] border border-[color:var(--border)] bg-[color:var(--card)] p-7">
              <SectionLabel>Contact</SectionLabel>
              <h2 className="font-display text-[clamp(1.8rem,2.8vw,2.6rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
                Reach out directly.
              </h2>
              <p className="mt-4 text-[1rem] leading-[1.7] text-[color:var(--muted)]">
                For senior engineering, founding, or consulting conversations, the fastest route is email or LinkedIn.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 font-mono text-[0.82rem]">
                <a href={`mailto:${site.email}`} className="rounded-[8px] border border-[color:var(--border)] px-4 py-2 text-white">
                  Email
                </a>
                <a href={site.linkedin} className="rounded-[8px] border border-[color:var(--border)] px-4 py-2 text-white">
                  LinkedIn
                </a>
                <a href={site.github} className="rounded-[8px] border border-[color:var(--border)] px-4 py-2 text-white">
                  GitHub
                </a>
              </div>
            </article>

            <article className="rounded-[16px] border border-[color:var(--border)] bg-[color:var(--card)] p-7">
              <SectionLabel>Why this exists</SectionLabel>
              <h2 className="font-display text-[clamp(1.8rem,2.8vw,2.6rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
                A site built for discovery.
              </h2>
              <p className="mt-4 text-[1rem] leading-[1.7] text-[color:var(--muted)]">
                The portfolio shows the work. The blog explains the decisions. Together they create stronger entity
                signals, more internal linking, and better search coverage.
              </p>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}

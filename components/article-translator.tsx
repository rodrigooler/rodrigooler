'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import type { BlogPost } from '@/lib/blog';

type TranslationState = {
  title: string;
  description: string;
  contentHtml: string;
};

function normalizeLanguage(language: string) {
  return language.toLowerCase().split('-')[0] || 'en';
}

function displayLanguageName(language: string) {
  if (typeof Intl === 'undefined' || typeof Intl.DisplayNames === 'undefined') {
    return language.toUpperCase();
  }

  try {
    const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });
    return displayNames.of(language) ?? language.toUpperCase();
  } catch {
    return language.toUpperCase();
  }
}

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

function slugifyTag(tag: string) {
  return tag
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function translateValue(text: string, target: string, format: 'text' | 'html' = 'text') {
  const translateBase = process.env.NEXT_PUBLIC_LIBRETRANSLATE_URL || 'https://translate.cutie.dating';
  const response = await fetch(`${translateBase.replace(/\/+$/, '')}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      text,
      source: 'en',
      target,
      format,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.error || 'Translation failed.');
  }

  const data = (await response.json()) as { translatedText?: string };
  return data.translatedText ?? text;
}

function protectCodeBlocks(html: string) {
  const protectedBlocks: string[] = [];
  const safeHtml = html.replace(/<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>/gi, (match) => {
    const token = `__TRANSLATION_BLOCK_${protectedBlocks.length}__`;
    protectedBlocks.push(match);
    return token;
  });

  return { safeHtml, protectedBlocks };
}

function restoreCodeBlocks(html: string, protectedBlocks: string[]) {
  return protectedBlocks.reduce((result, block, index) => result.replaceAll(`__TRANSLATION_BLOCK_${index}__`, block), html);
}

async function translateHtml(html: string, target: string) {
  const { safeHtml, protectedBlocks } = protectCodeBlocks(html);
  const translated = await translateValue(safeHtml, target, 'html');
  return restoreCodeBlocks(translated, protectedBlocks);
}

export function ArticleTranslator({ post }: { post: BlogPost }) {
  const [browserLanguage, setBrowserLanguage] = useState('en');
  const browserLanguageLabel = displayLanguageName(browserLanguage);

  useEffect(() => {
    setBrowserLanguage(normalizeLanguage(navigator.language || navigator.languages?.[0] || 'en'));
  }, []);

  const [state, setState] = useState<TranslationState>({
    title: post.title,
    description: post.description,
    contentHtml: post.contentHtml,
  });
  const [translated, setTranslated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleTranslate() {
    if (loading) {
      return;
    }

    if (translated) {
      setState({
        title: post.title,
        description: post.description,
        contentHtml: post.contentHtml,
      });
      setTranslated(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [title, description, contentHtml] = await Promise.all([
        translateValue(post.title, browserLanguage, 'text'),
        translateValue(post.description, browserLanguage, 'text'),
        translateHtml(post.contentHtml, browserLanguage),
      ]);

      setState({ title, description, contentHtml });
      setTranslated(true);
    } catch (translationError) {
      setError(translationError instanceof Error ? translationError.message : 'Translation failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="rounded-[16px] border border-[rgba(0,255,200,0.12)] bg-[rgba(8,11,20,0.88)] p-7 sm:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-6">
        <div className="max-w-3xl">
          <h1 className="font-display text-[clamp(2.4rem,4vw,4.6rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            {state.title}
          </h1>
          <p className="mt-5 max-w-3xl text-[1rem] leading-[1.7] text-[color:var(--muted)]">{state.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-[0.78rem] text-[color:var(--muted)]">
            <span>{formatPostDate(post.date)}</span>
            <span className="text-[color:var(--muted-2)]">|</span>
            <span>{post.readingTime}</span>
            <span className="text-[color:var(--muted-2)]">|</span>
            <span>{translated ? `Translated to ${browserLanguageLabel}` : 'Markdown source'}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/blog/tags/${slugifyTag(tag)}`} className="rounded-[999px] border border-[rgba(0,255,200,0.15)] bg-[rgba(0,255,200,0.07)] px-[10px] py-[4px] font-mono text-[0.68rem] text-[color:var(--neon)]">
                {tag}
              </Link>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleTranslate}
          className="inline-flex items-center gap-2 rounded-[8px] border border-[rgba(0,255,200,0.22)] bg-[rgba(0,255,200,0.06)] px-4 py-2 font-mono text-[0.78rem] text-[color:var(--neon)] transition hover:-translate-y-px hover:bg-[rgba(0,255,200,0.12)] hover:shadow-[var(--glow)] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
          title={`Translate this article to ${browserLanguageLabel}`}
          aria-label={`Translate this article to ${browserLanguageLabel}`}
        >
          <span className="h-[7px] w-[7px] rounded-full bg-[color:var(--neon)] shadow-[0_0_8px_var(--neon)]" />
          {loading ? 'Translating...' : translated ? 'Show original' : `Translate to ${browserLanguageLabel}`}
        </button>
      </div>

      {error ? (
        <div className="mb-6 rounded-[10px] border border-[rgba(255,45,155,0.25)] bg-[rgba(255,45,155,0.08)] px-4 py-3 font-mono text-[0.78rem] text-[#ff8ec2]">
          {error}
        </div>
      ) : null}

      <div
        className="prose prose-invert max-w-none prose-headings:font-display prose-p:leading-8 prose-li:leading-8 prose-a:text-[color:var(--neon)]"
        dangerouslySetInnerHTML={{ __html: state.contentHtml }}
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
  );
}

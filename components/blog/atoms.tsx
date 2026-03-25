import Link from 'next/link';
import type { ReactNode } from 'react';

import { site } from '@/lib/site';

export function BlogBackground() {
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

export function BlogHeader() {
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

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[3px] text-[color:var(--neon)]">
      <span className="block h-px w-6 bg-[color:var(--neon)]" />
      {children}
    </div>
  );
}

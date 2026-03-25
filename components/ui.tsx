import Link from 'next/link';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return <div className={clsx('mx-auto w-full max-w-7xl px-6 lg:px-8', className)}>{children}</div>;
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'rounded-[1.5rem] border border-white/10 bg-[color:var(--panel)] shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-[color:var(--accent)]">
      <span className="h-px w-8 bg-[color:var(--accent)]" />
      <span>{children}</span>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={clsx('max-w-3xl', className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 font-display text-3xl leading-none tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">{description}</p> : null}
    </header>
  );
}

export function Tag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.72rem] font-medium tracking-wide text-slate-200',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}) {
  const styles =
    variant === 'primary'
      ? 'bg-[color:var(--accent)] text-slate-950 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(140,255,200,0.28)]'
      : variant === 'secondary'
        ? 'border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10'
        : 'border-transparent bg-transparent text-slate-300 hover:text-white';

  const classes = clsx(
    'inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-medium transition duration-200',
    styles,
    className,
  );

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}

export function MetaRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">{children}</div>;
}

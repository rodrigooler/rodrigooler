import Link from 'next/link';

import { SeoJsonLd } from '@/components/seo-jsonld';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const list = items.filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: list.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href,
    })),
  };

  return (
    <div className="mb-8">
      <SeoJsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-[0.72rem] text-[color:var(--muted)]">
        {list.map((item, index) => (
          <span key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && index < list.length - 1 ? (
              <Link href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span className={index === list.length - 1 ? 'text-[color:var(--neon)]' : ''}>{item.label}</span>
            )}
            {index < list.length - 1 ? <span className="text-[color:var(--muted-2)]">/</span> : null}
          </span>
        ))}
      </nav>
    </div>
  );
}

import type { Metadata } from 'next';

import { LegacyDocument } from '@/components/legacy-document';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function Page() {
  return <LegacyDocument filePath="index.html" />;
}

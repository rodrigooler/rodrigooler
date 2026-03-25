import type { Metadata } from 'next';

import { LegacyDocument } from '@/components/legacy-document';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'CV',
  description: `Professional CV for ${site.name}.`,
};

export default function Page() {
  return <LegacyDocument filePath="cv.html" />;
}

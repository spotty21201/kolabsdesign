import type { Metadata } from 'next';

import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Kolabs.Design CMS',
  description: 'Private Kolabs.Design CMS interface.',
  path: '/admin',
  indexable: false,
});

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

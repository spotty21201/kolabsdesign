import React from 'react';
import type { Metadata } from 'next';

import { JsonLd } from '@/components/JsonLd';
import { WorkCatalogClient } from '@/components/WorkCatalogClient';
import { getAssets } from '@/lib/api';
import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Work | Decision assets for land, real estate, infrastructure, and capital deployment',
  description:
    'Explore Kolabs.Design tools, cases, and research built to accelerate land strategy, real estate decisions, infrastructure planning, and capital deployment.',
  path: '/work',
});

export default async function WorkPage() {
  const assets = await getAssets();

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
        ])}
      />
      <WorkCatalogClient assets={assets} />
    </>
  );
}

import type { MetadataRoute } from 'next';

import { getAssets } from '@/lib/api';
import { SITE_URL, canonicalUrl, isProductionDeployment } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isProductionDeployment()) {
    return [];
  }

  const assets = await getAssets();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
    },
    {
      url: canonicalUrl('/work'),
      lastModified: now,
    },
    {
      url: canonicalUrl('/collab'),
      lastModified: now,
    },
  ];

  const assetRoutes: MetadataRoute.Sitemap = assets.map((asset) => ({
    url: canonicalUrl(`/work/${asset.slug}`),
    lastModified: new Date(asset.publishedAt),
  }));

  return [...staticRoutes, ...assetRoutes];
}

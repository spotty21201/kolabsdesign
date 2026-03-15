import type { MetadataRoute } from 'next';

import { SITE_URL, isProductionDeployment } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeployment()) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

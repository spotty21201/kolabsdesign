import type { Metadata } from 'next';

import type { Asset } from '@/data/mockData';

export const SITE_NAME = 'Kolabs.Design';
export const SITE_URL = 'https://www.kolabs.design';
export const DEFAULT_OG_IMAGE = '/jakarta-skyline.png';

type PageType = 'website' | 'article';

type SeoOverride = {
  title: string;
  description: string;
};

type Crumb = {
  name: string;
  path: string;
};

type PersonReference = {
  '@type': 'Person';
  name: string;
  url: string;
  jobTitle: string;
  sameAs?: string[];
};

const doddyProfiles = ['https://www.linkedin.com/in/doddysamiaji', 'https://medium.com/@doddysamiaji'];

const assetSeoOverrides: Record<string, SeoOverride> = {
  padeljkt: {
    title: 'PadelJKT | Padel club feasibility, ROI, and real estate scenario tool',
    description:
      'Turn padel club assumptions into ROI, EBITDA, payback, and real estate feasibility scenarios for faster investment decisions.',
  },
  residentialmasterplanningsimulator: {
    title: 'Residential Master Planning Simulator | Yield and real estate planning efficiency tool',
    description:
      'Test product type scenarios to evaluate yield, density, and planning efficiency before committing to a residential master plan.',
  },
  mixedusedestinationkickstart: {
    title: 'Mixed-Use Feasibility Tool | Residual land value and underwriting scenarios',
    description:
      'Turn land asking price into a mixed-use feasibility verdict with GFA, NLA, capex, revenue, and residual land value scenarios.',
  },
  pakkosim: {
    title: 'Pak KoSim | Kos yield, ROI, and real estate feasibility simulator',
    description:
      'Convert kos site constraints and operating assumptions into room yield, ROI, payback, and real estate feasibility scenarios.',
  },
  neodevelopmentsimulator: {
    title: 'Neo Development Simulator | Zoning, GFA, and development feasibility tool',
    description:
      'Simulate zoning, land, and design assumptions to test buildable GFA, compliance, and development feasibility in minutes.',
  },
  kongkowportfoliocommandcenter: {
    title: 'Portfolio Command Center | Portfolio health, risk, and capital visibility dashboard',
    description:
      'Track portfolio health, surface risk early, and strengthen capital visibility across assets, teams, and operating decisions.',
  },
  portfoliocommandcenter: {
    title: 'Portfolio Command Center | Portfolio health, risk, and capital visibility dashboard',
    description:
      'Track portfolio health, surface risk early, and strengthen capital visibility across assets, teams, and operating decisions.',
  },
  masterplankickstart: {
    title: 'MasterPlan Kickstart | Land-use program and FS-lite decision tool',
    description:
      'Turn a site area into a credible land-use program and FS-lite profit snapshot for faster land and real estate kickoff decisions.',
  },
  opsintelligencefleetdispatchcockpit: {
    title: 'Ops Intelligence | Infrastructure operations, fleet visibility, and dispatch cockpit',
    description:
      'Turn archipelago-scale operations into live fleet visibility, dispatch decisions, and export-ready infrastructure reporting.',
  },
  opsintelligence: {
    title: 'Ops Intelligence | Infrastructure operations, fleet visibility, and dispatch cockpit',
    description:
      'Turn archipelago-scale operations into live fleet visibility, dispatch decisions, and export-ready infrastructure reporting.',
  },
};

const softwareApplicationKeys = new Set([
  'pakkosim',
  'masterplankickstart',
  'mixedusedestinationkickstart',
  'neodevelopmentsimulator',
  'opsintelligencefleetdispatchcockpit',
  'opsintelligence',
]);

function slugifySeoKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

export function isProductionDeployment() {
  return process.env.VERCEL_ENV === 'production';
}

export function canonicalUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

function toAbsoluteUrl(value: string) {
  if (/^https?:\/\//.test(value)) {
    return value;
  }

  return canonicalUrl(value.startsWith('/') ? value : `/${value}`);
}

export function getMetadataRobots(indexable = true): Metadata['robots'] {
  if (!indexable || !isProductionDeployment()) {
    return {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    };
  }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

export function buildPageMetadata({
  title,
  description,
  path,
  images,
  type = 'website',
  indexable = true,
}: {
  title: string;
  description: string;
  path: string;
  images?: Array<string | { url: string; alt?: string }>;
  type?: PageType;
  indexable?: boolean;
}): Metadata {
  const openGraphImages =
    images && images.length > 0
      ? images.map((image) => (typeof image === 'string' ? { url: toAbsoluteUrl(image) } : { ...image, url: toAbsoluteUrl(image.url) }))
      : [{ url: canonicalUrl(DEFAULT_OG_IMAGE), alt: 'Jakarta skyline' }];

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: canonicalUrl(path),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl(path),
      siteName: SITE_NAME,
      type,
      images: openGraphImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: openGraphImages.map((image) => image.url),
    },
    robots: getMetadataRobots(indexable),
  };
}

export function buildBreadcrumbJsonLd(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

function buildDoddyPersonReference(): PersonReference {
  return {
    '@type': 'Person',
    name: 'Doddy Samiaji',
    url: canonicalUrl('/collab#doddy-samiaji'),
    jobTitle: 'Founder & Principal, Decision Intelligence',
    sameAs: doddyProfiles,
  };
}

function buildFaridPersonReference(): PersonReference {
  return {
    '@type': 'Person',
    name: 'Farid Ramdani',
    url: canonicalUrl('/collab#farid-ramdani'),
    jobTitle: 'Partner, Strategy & Delivery',
  };
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: canonicalUrl('/logo-kolabs.png'),
    founder: buildDoddyPersonReference(),
    employee: [buildFaridPersonReference()],
    knowsAbout: ['land strategy', 'real estate', 'infrastructure', 'capital deployment', 'decision systems'],
  };
}

export function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function buildCollabPersonJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Doddy Samiaji',
      url: canonicalUrl('/collab#doddy-samiaji'),
      jobTitle: 'Founder & Principal, Decision Intelligence',
      worksFor: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      sameAs: doddyProfiles,
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'University of Washington',
      },
      knowsAbout: ['land strategy', 'real estate', 'infrastructure', 'capital deployment', 'decision systems'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Farid Ramdani',
      url: canonicalUrl('/collab#farid-ramdani'),
      jobTitle: 'Partner, Strategy & Delivery',
      worksFor: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Institut Teknologi Bandung',
      },
      knowsAbout: ['strategy', 'delivery', 'stakeholder alignment', 'real estate', 'infrastructure'],
    },
  ];
}

export function getAssetSeoProfile(asset: Asset) {
  const override =
    assetSeoOverrides[slugifySeoKey(asset.slug)] ??
    assetSeoOverrides[slugifySeoKey(asset.title)];

  const defaultTitle = `${asset.title} | ${SITE_NAME}`;
  const defaultDescription =
    asset.oneLiner ||
    `Explore ${asset.title}, a ${asset.type.toLowerCase()} from Kolabs.Design for land, real estate, infrastructure, and capital deployment decisions.`;

  return {
    title: override?.title ?? defaultTitle,
    description: override?.description ?? defaultDescription,
  };
}

function buildArticleAuthors(asset: Asset) {
  if (asset.type === 'Case') {
    return [buildDoddyPersonReference(), buildFaridPersonReference()];
  }

  return [buildDoddyPersonReference()];
}

export function buildAssetStructuredData(asset: Asset) {
  const seo = getAssetSeoProfile(asset);
  const key = slugifySeoKey(asset.slug || asset.title);

  if (asset.type === 'Tool' && softwareApplicationKeys.has(key)) {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: asset.title,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: seo.description,
      url: canonicalUrl(`/work/${asset.slug}`),
      image: asset.heroImage ? toAbsoluteUrl(asset.heroImage) : canonicalUrl(DEFAULT_OG_IMAGE),
      creator: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: asset.title,
    description: seo.description,
    datePublished: asset.publishedAt,
    dateModified: asset.publishedAt,
    mainEntityOfPage: canonicalUrl(`/work/${asset.slug}`),
    author: buildArticleAuthors(asset),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: canonicalUrl('/logo-kolabs.png'),
      },
    },
    image: asset.heroImage ? toAbsoluteUrl(asset.heroImage) : canonicalUrl(DEFAULT_OG_IMAGE),
  };
}

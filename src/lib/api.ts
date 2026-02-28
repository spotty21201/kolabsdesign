import 'server-only';

import { Asset, MOCK_ASSETS } from '@/data/mockData';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

interface ItemRow {
  id: string;
  type: Asset['type'];
  title: string;
  slug: string;
  status: Asset['status'];
  one_liner: string;
  hero_image: string | null;
  tags: string[] | null;
  cta_type: Asset['ctaType'];
  cta_url: string | null;
  featured: boolean | null;
  published: boolean | null;
  published_at: string | null;
  proof_cue: string | null;
  problem_md: string | null;
  solution_md: string | null;
  how_md: string | null;
  decision_md: string | null;
  inputs_md: string | null;
  output_md: string | null;
  confidence_md: string | null;
  impact_md: string | null;
  deleted_at: string | null;
}

function mapItemRowToAsset(item: ItemRow): Asset {
  return {
    id: item.id,
    type: item.type,
    title: item.title,
    slug: item.slug,
    status: item.status,
    oneLiner: item.one_liner,
    heroImage: item.hero_image ?? '',
    tags: item.tags ?? [],
    ctaType: item.cta_type,
    ctaUrl: item.cta_url ?? '#',
    featured: Boolean(item.featured),
    publishedAt: item.published_at ?? new Date(0).toISOString(),
    proofCue: item.proof_cue ?? '',
    problem: item.problem_md || item.decision_md || '',
    solution: item.solution_md || item.impact_md || '',
    how: item.how_md || (item.inputs_md || item.output_md ? `**Inputs:**\n${item.inputs_md || ''}\n\n**Outputs:**\n${item.output_md || ''}` : ''),
    decision: item.decision_md ?? '',
    inputs: item.inputs_md ?? '',
    output: item.output_md ?? '',
    confidence: item.confidence_md ?? '',
    impact: item.impact_md ?? '',
  };
}

function sortByPublishedAtDesc(items: Asset[]): Asset[] {
  return [...items].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

function shouldUseMockFallback() {
  return process.env.CMS_ALLOW_MOCK_FALLBACK === 'true';
}

export async function getAssets(options?: { includeDrafts?: boolean }): Promise<Asset[]> {
  const includeDrafts = Boolean(options?.includeDrafts);

  try {
    const supabase = createSupabaseAdminClient();

    let query = supabase
      .from('items')
      .select('*')
      .is('deleted_at', null)
      .order('published_at', { ascending: false, nullsFirst: false });

    if (!includeDrafts) {
      query = query.eq('published', true).lte('published_at', new Date().toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching assets from Supabase:', error.message);
      return shouldUseMockFallback() ? sortByPublishedAtDesc(MOCK_ASSETS) : [];
    }

    if (!data || data.length === 0) {
      return shouldUseMockFallback() ? sortByPublishedAtDesc(MOCK_ASSETS) : [];
    }

    return (data as ItemRow[]).map(mapItemRowToAsset);
  } catch (err) {
    console.error('Unexpected error fetching assets from Supabase:', err);
    return shouldUseMockFallback() ? sortByPublishedAtDesc(MOCK_ASSETS) : [];
  }
}

export async function getAssetBySlug(slug: string, options?: { includeDrafts?: boolean }): Promise<Asset | null> {
  const includeDrafts = Boolean(options?.includeDrafts);

  try {
    const supabase = createSupabaseAdminClient();
    let query = supabase
      .from('items')
      .select('*')
      .eq('slug', slug)
      .is('deleted_at', null)
      .limit(1);

    if (!includeDrafts) {
      query = query.eq('published', true).lte('published_at', new Date().toISOString());
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error('Error fetching asset by slug from Supabase:', error.message);
      if (!shouldUseMockFallback()) return null;
      return MOCK_ASSETS.find((item) => item.slug === slug) ?? null;
    }

    if (!data) {
      if (!shouldUseMockFallback()) return null;
      return MOCK_ASSETS.find((item) => item.slug === slug) ?? null;
    }

    return mapItemRowToAsset(data as ItemRow);
  } catch (err) {
    console.error('Unexpected error fetching asset by slug from Supabase:', err);
    if (!shouldUseMockFallback()) return null;
    return MOCK_ASSETS.find((item) => item.slug === slug) ?? null;
  }
}

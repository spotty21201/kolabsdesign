import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdminUser } from '@/lib/admin';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { AssetForm, type AssetFormValues } from '@/components/admin/AssetForm';
import { updateAssetAction, softDeleteAssetAction } from '@/app/admin/actions';

interface ItemRow {
  id: string;
  type: string;
  title: string;
  slug: string;
  status: string;
  one_liner: string;
  hero_image: string | null;
  tags: string[] | null;
  cta_type: string;
  cta_url: string | null;
  featured: boolean;
  published: boolean;
  published_at: string | null;
  proof_cue: string | null;
  decision_md: string | null;
  inputs_md: string | null;
  output_md: string | null;
  confidence_md: string | null;
  impact_md: string | null;
}

function toDatetimeLocal(value: string | null): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function mapToFormValues(row: ItemRow): AssetFormValues {
  return {
    type: row.type,
    title: row.title,
    slug: row.slug,
    status: row.status,
    oneLiner: row.one_liner,
    heroImage: row.hero_image ?? '',
    tags: (row.tags ?? []).join(', '),
    ctaType: row.cta_type,
    ctaUrl: row.cta_url ?? '#',
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    publishedAt: toDatetimeLocal(row.published_at),
    proofCue: row.proof_cue ?? '',
    decision: row.decision_md ?? '',
    inputs: row.inputs_md ?? '',
    output: row.output_md ?? '',
    confidence: row.confidence_md ?? '',
    impact: row.impact_md ?? '',
  };
}

export default async function AdminEditAssetPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminUser();
  const { id } = await params;

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('id', id)
    .is('deleted_at', null)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load CMS item: ${error.message}`);
  }

  if (!data) {
    notFound();
  }

  const item = data as ItemRow;
  const updateAction = updateAssetAction.bind(null, item.id);
  const deleteAction = softDeleteAssetAction.bind(null, item.id);

  return (
    <div>
      <AssetForm
        title="Edit Asset"
        description="Update text, metadata, and media for this item."
        submitLabel="Update"
        action={updateAction}
        initialValues={mapToFormValues(item)}
        showRemoveHeroImage
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="border border-red-200 bg-red-50 p-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-red-700 mb-2">Danger Zone</h2>
          <p className="text-sm text-red-700/80 mb-4">This performs a soft delete. The item is hidden from public pages.</p>
          <div className="flex items-center justify-between">
            <Link href="/admin" className="text-sm text-charcoal/60 hover:text-charcoal">
              Back to CMS
            </Link>
            <form action={deleteAction}>
              <button type="submit" className="px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-widest">
                Soft Delete
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { requireAdminUser } from '@/lib/admin';
import { AssetForm, type AssetFormValues } from '@/components/admin/AssetForm';
import { createAssetAction } from '@/app/admin/actions';

const emptyValues: AssetFormValues = {
  type: 'Tool',
  title: '',
  slug: '',
  status: 'Experiment',
  oneLiner: '',
  heroImage: '',
  tags: '',
  ctaType: 'Read',
  ctaUrl: '#',
  featured: false,
  published: false,
  publishedAt: new Date().toISOString().slice(0, 16),
  proofCue: '',
  decision: '',
  inputs: '',
  output: '',
  confidence: '',
  impact: '',
};

export default async function AdminNewAssetPage() {
  await requireAdminUser();

  return (
    <AssetForm
      title="Create Asset"
      description="Add a new item to the public catalog."
      submitLabel="Create"
      action={createAssetAction}
      initialValues={emptyValues}
    />
  );
}

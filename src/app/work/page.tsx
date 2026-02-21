import React from 'react';
import { WorkCatalogClient } from '@/components/WorkCatalogClient';
import { getAssets } from '@/lib/api';

export default async function WorkPage() {
  const assets = await getAssets();
  return <WorkCatalogClient assets={assets} />;
}

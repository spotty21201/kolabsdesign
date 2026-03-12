'use client';

import React, { useState } from 'react';
import { Asset, AssetStatus, AssetType } from '@/data/mockData';
import { AssetCard } from '@/components/AssetCard';

interface WorkCatalogClientProps {
  assets: Asset[];
}

export function WorkCatalogClient({ assets }: WorkCatalogClientProps) {
  const [filterType, setFilterType] = useState<AssetType | 'All'>('All');
  const [filterStatus, setFilterStatus] = useState<AssetStatus | 'All'>('All');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filteredAssets = assets.filter((asset) => {
    const matchType = filterType === 'All' || asset.type === filterType;
    const matchStatus = filterStatus === 'All' || asset.status === filterStatus;
    return matchType && matchStatus;
  });

  const clearFilter = (type: 'type' | 'status') => {
    if (type === 'type') setFilterType('All');
    if (type === 'status') setFilterStatus('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-charcoal leading-[1.05] tracking-tight text-balance mb-4">Decision Assets</h1>
        <p className="text-xl text-charcoal/60 max-w-2xl">
          A catalog of tools, cases, and research designed to accelerate land, infrastructure, and capital deployment.
        </p>
      </div>

      <div className="md:hidden mb-6 flex flex-col gap-4">
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="flex items-center justify-center w-full py-3 border border-ink/20 rounded-none bg-white text-sm font-sans font-bold uppercase tracking-widest text-charcoal shadow-sm hover:bg-soft-gray/50 transition-colors"
        >
          {isMobileFiltersOpen ? 'Close Filters' : 'Filters'}
        </button>

        <div className="flex flex-wrap gap-2">
          {filterType !== 'All' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {filterType}
              <button onClick={() => clearFilter('type')} className="ml-2 text-primary hover:text-primary/70">
                &times;
              </button>
            </span>
          )}
          {filterStatus !== 'All' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {filterStatus}
              <button onClick={() => clearFilter('status')} className="ml-2 text-primary hover:text-primary/70">
                &times;
              </button>
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className={`w-full md:w-28 flex-shrink-0 space-y-8 ${isMobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
          <div className="border-t border-ink/15 pt-6">
            <h3 className="text-lg font-serif italic text-charcoal mb-4">Type</h3>
            <div className="space-y-3">
              {['All', 'Tool', 'Case', 'Brief', 'Research'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={filterType === type}
                    onChange={(e) => {
                      setFilterType(e.target.value as AssetType | 'All');
                      if (window.innerWidth < 768) setIsMobileFiltersOpen(false);
                    }}
                    className="h-4 w-4 text-primary border-border-gray/80 focus:ring-primary"
                  />
                  <span className="ml-3 text-sm text-charcoal/70">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-ink/15 pt-6">
            <h3 className="text-lg font-serif italic text-charcoal mb-4">Status</h3>
            <div className="space-y-3">
              {['All', 'Experiment', 'Method', 'Proven'].map((status) => (
                <label key={status} className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={filterStatus === status}
                    onChange={(e) => {
                      setFilterStatus(e.target.value as AssetStatus | 'All');
                      if (window.innerWidth < 768) setIsMobileFiltersOpen(false);
                    }}
                    className="h-4 w-4 text-primary border-border-gray/80 focus:ring-primary"
                  />
                  <span className="ml-3 text-sm text-charcoal/70">{status}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-grow">
          {filteredAssets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-soft-gray/50 rounded-xl border border-border-gray">
              <p className="text-charcoal/50">No assets match your selected filters.</p>
              <button
                onClick={() => {
                  setFilterType('All');
                  setFilterStatus('All');
                }}
                className="mt-4 text-primary hover:underline font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

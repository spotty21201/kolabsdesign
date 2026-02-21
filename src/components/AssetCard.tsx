import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Asset } from '../data/mockData';
import { StatusChip } from './StatusChip';

interface AssetCardProps {
  asset: Asset;
}

export function AssetCard({ asset }: AssetCardProps) {
  return (
    <Link
      href={`/work/${asset.slug}`}
      className="group flex flex-col h-full bg-white border border-ink/20 overflow-hidden hover:shadow-md transition-all duration-300 hover:border-ink/40"
    >
      {/* Top Section - Image or Text-Only Fallback */}
      {asset.heroImage ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-soft-gray/80">
          <img
            src={asset.heroImage}
            alt={asset.title}
            referrerPolicy="no-referrer"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-sans font-medium bg-white/90 text-charcoal border border-ink/10 backdrop-blur-md uppercase tracking-widest">
              {asset.type}
            </span>
            <StatusChip status={asset.status} className="bg-white/90 border-ink/10 backdrop-blur-md" />
          </div>
        </div>
      ) : (
        <div className="relative aspect-[16/9] overflow-hidden bg-soft-gray/30 flex items-center justify-center p-6 border-b border-border-gray/30">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-charcoal) 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-sans font-medium bg-white text-charcoal border border-ink/10 uppercase tracking-widest">
              {asset.type}
            </span>
            <StatusChip status={asset.status} className="bg-white/90 border-ink/10" />
          </div>
          <div className="z-10 bg-white border border-ink/20 w-16 h-16 flex items-center justify-center text-primary">
            <ArrowRight className="w-6 h-6 rotate-45" />
          </div>
        </div>
      )}
      
      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6 md:p-8 bg-[#FAFAFA]">
        <div className="flex flex-wrap gap-1.5 mb-6">
          {asset.tags.map(tag => (
            <span key={tag} className="text-[10px] font-sans uppercase tracking-widest text-charcoal/60 bg-soft-gray px-2 py-1 border border-ink/5">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {asset.title}
        </h3>
        
        <p className="font-sans text-sm text-charcoal/60 mb-5 line-clamp-2 leading-relaxed">
          {asset.oneLiner}
        </p>
        
        <div className="mt-auto pt-5 border-t border-ink/15 flex items-center justify-between">
          <span className="text-xs font-sans text-charcoal/60 truncate pr-4 uppercase tracking-widest">
            {asset.proofCue || 'Metrics pending'}
          </span>
          
          <span className="inline-flex items-center text-xs font-sans font-bold uppercase tracking-widest text-orange group-hover:text-orange/80 transition-colors">
            {asset.ctaType}
            <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

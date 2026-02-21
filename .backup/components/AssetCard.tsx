import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Asset } from '../data/mockData';
import { StatusChip } from './StatusChip';

interface AssetCardProps {
  asset: Asset;
}

export function AssetCard({ asset }: AssetCardProps) {
  return (
    <Link
      to={`/work/${asset.slug}`}
      className="group flex flex-col h-full bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 hover:border-gray-300"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        <img
          src={asset.heroImage}
          alt={asset.title}
          referrerPolicy="no-referrer"
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-black/80 text-white backdrop-blur-sm">
            {asset.type}
          </span>
          <StatusChip status={asset.status} className="bg-white/90 backdrop-blur-sm" />
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {asset.tags.map(tag => (
            <span key={tag} className="text-[10px] font-mono uppercase tracking-wider text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
          {asset.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 text-pretty">
          {asset.oneLiner}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 truncate pr-4">
            {asset.proofCue}
          </span>
          
          <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
            {asset.ctaType}
            <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

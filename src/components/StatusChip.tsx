import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AssetStatus } from '../data/mockData';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StatusChipProps {
  status: AssetStatus;
  className?: string;
}

export function StatusChip({ status, className }: StatusChipProps) {
  const statusStyles: Record<AssetStatus, { base: string, dot: string }> = {
    Experiment: { base: 'bg-white text-ink border-ink/20', dot: 'bg-ink/30' },
    Method: { base: 'bg-white text-ink border-ink/20', dot: 'bg-orange' },
    Proven: { base: 'bg-white text-ink border-ink/20', dot: 'bg-primary' },
  };

  const style = statusStyles[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-sans font-medium border uppercase tracking-widest',
        style.base,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", style.dot)}></span>
      {status}
    </span>
  );
}

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
  const statusStyles: Record<AssetStatus, string> = {
    Experiment: 'bg-gray-100 text-gray-600 border-gray-200',
    Method: 'bg-blue-50 text-blue-700 border-blue-200',
    Proven: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
        statusStyles[status],
        className
      )}
    >
      {status}
    </span>
  );
}

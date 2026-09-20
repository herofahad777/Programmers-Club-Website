import React from 'react';
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react';

/**
 * Two-way segmented toggle for ordering gallery event groups by date.
 * Fully controlled: `order` ('newest' | 'oldest') + `onChange(nextOrder)`.
 */
export default function SortToggle({ order, onChange }) {
  return (
    <div
      className="inline-flex items-center rounded-lg border border-border bg-surface p-1 text-xs sm:text-sm flex-shrink-0"
      role="group"
      aria-label="Sort gallery events"
    >
      <button
        type="button"
        onClick={() => onChange('newest')}
        aria-pressed={order === 'newest'}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
          order === 'newest'
            ? 'bg-primary text-bg font-medium'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        <ArrowDownWideNarrow className="w-3.5 h-3.5" />
        <span>Newest</span>
      </button>
      <button
        type="button"
        onClick={() => onChange('oldest')}
        aria-pressed={order === 'oldest'}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
          order === 'oldest'
            ? 'bg-primary text-bg font-medium'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        <ArrowUpNarrowWide className="w-3.5 h-3.5" />
        <span>Oldest</span>
      </button>
    </div>
  );
}

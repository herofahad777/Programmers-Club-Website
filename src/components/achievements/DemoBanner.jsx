import React from 'react';
import { Info } from 'lucide-react';

/**
 * DemoBanner — Displays a professional disclaimer banner
 * indicating that achievement records are placeholder/demo data.
 * Should be removed or hidden once verified records are available.
 */
export default function DemoBanner() {
  return (
    <div
      role="status"
      aria-label="Demo data disclaimer"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6"
    >
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-surface border border-border text-text-secondary text-xs sm:text-sm leading-relaxed">
        <Info className="w-4 h-4 mt-0.5 text-primary shrink-0" aria-hidden="true" />
        <p>
          <span className="font-semibold text-text-primary">Demo Data</span>
          {' — '}
          The records shown below are placeholder entries for development and layout purposes.
          Verified achievement data from the Programmers Club leadership will replace these once available.
        </p>
      </div>
    </div>
  );
}

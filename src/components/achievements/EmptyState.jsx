import React from 'react';
import { SearchX } from 'lucide-react';

/**
 * EmptyState — Friendly fallback when no achievements match filters or data is empty.
 * @param {string}   message  - Descriptive message
 * @param {function} onReset  - Optional callback to reset filters
 */
export default function EmptyState({
  message = 'No achievements found matching your filters.',
  onReset,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-surface border border-border mb-5">
        <SearchX className="w-7 h-7 text-text-muted" aria-hidden="true" />
      </div>
      <p className="text-sm sm:text-base text-text-secondary max-w-md leading-relaxed">
        {message}
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 inline-flex items-center px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/25 hover:bg-primary/20 transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

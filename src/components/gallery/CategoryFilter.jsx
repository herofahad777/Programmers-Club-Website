import React from 'react';

/**
 * Horizontally scrollable pill filter for gallery categories.
 * Fully controlled: `active` + `onChange(category)`.
 */
export default function CategoryFilter({ categories, active, onChange, counts = {} }) {
  const allItems = ['All', ...categories];

  return (
    <div
      className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none"
      role="tablist"
      aria-label="Filter gallery by category"
    >
      {allItems.map((category) => {
        const isActive = active === category;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              isActive
                ? 'bg-primary text-bg border-primary'
                : 'bg-surface text-text-secondary border-border hover:border-primary/40 hover:text-text-primary'
            }`}
          >
            <span>{category}</span>
            {typeof counts[category] === 'number' && (
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-bg/20 text-bg' : 'bg-accent text-text-muted'
                }`}
              >
                {counts[category]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

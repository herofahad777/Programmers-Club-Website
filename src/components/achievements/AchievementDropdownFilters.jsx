import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

const CATEGORIES = [
  'All Categories',
  'Hackathon',
  'Competitive Programming',
  'Leadership / Community',
  'Research',
  'Publication',
  'Open Source',
  'Workshop',
  'Patent',
  'Other',
];

const LEVELS = [
  'All Levels',
  'International',
  'National',
  'State',
  'District',
  'College',
];

/**
 * AchievementDropdownFilters — Streamlined dropdown-type filters
 * for Category and Level, replacing sprawling pill rows.
 */
export default function AchievementDropdownFilters({
  activeCategory,
  activeLevel,
  onCategoryChange,
  onLevelChange,
  onReset,
}) {
  const isFiltered = activeCategory !== 'All' || activeLevel !== 'All';

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-surface border border-border">
      <div className="flex items-center gap-2 text-xs font-semibold text-text-primary">
        <Filter className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
        <span>Filter Milestones:</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Category Dropdown */}
        <div className="relative">
          <label htmlFor="category-select" className="sr-only">
            Filter by Category
          </label>
          <select
            id="category-select"
            value={activeCategory === 'All' ? 'All Categories' : activeCategory}
            onChange={(e) => {
              const val = e.target.value;
              onCategoryChange(val === 'All Categories' ? 'All' : val);
            }}
            className="appearance-none bg-surface-card border border-border rounded-lg pl-3 pr-8 py-2 text-xs sm:text-sm text-text-primary focus-visible:outline-2 focus-visible:outline-primary hover:border-primary/40 transition-colors cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-surface-card text-text-primary">
                {cat}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-muted">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {/* Level Dropdown */}
        <div className="relative">
          <label htmlFor="level-select" className="sr-only">
            Filter by Level
          </label>
          <select
            id="level-select"
            value={activeLevel === 'All' ? 'All Levels' : activeLevel}
            onChange={(e) => {
              const val = e.target.value;
              onLevelChange(val === 'All Levels' ? 'All' : val);
            }}
            className="appearance-none bg-surface-card border border-border rounded-lg pl-3 pr-8 py-2 text-xs sm:text-sm text-text-primary focus-visible:outline-2 focus-visible:outline-primary hover:border-primary/40 transition-colors cursor-pointer"
          >
            {LEVELS.map((lvl) => (
              <option key={lvl} value={lvl} className="bg-surface-card text-text-primary">
                {lvl}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-muted">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {/* Reset Button (Visible if filters active) */}
        {isFiltered && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-hover border border-border text-xs text-text-secondary hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary"
            title="Reset category and level"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}

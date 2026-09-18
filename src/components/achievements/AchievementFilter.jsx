import React from 'react';

/**
 * Allowed category values from DATA_SCHEMA.md
 */
const CATEGORIES = [
  'All',
  'Hackathon',
  'Competitive Programming',
  'Research',
  'Publication',
  'Open Source',
  'Workshop',
  'Other',
];

/**
 * Allowed level values from DATA_SCHEMA.md
 */
const LEVELS = [
  'All',
  'International',
  'National',
  'State',
  'District',
  'College',
];

/**
 * FilterPill — Single selectable pill button.
 */
function FilterPill({ label, isActive, onClick }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isActive}
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
        isActive
          ? 'bg-primary/15 text-primary border-primary/30'
          : 'bg-surface text-text-muted border-border hover:border-border-hover hover:text-text-secondary'
      }`}
    >
      {label}
    </button>
  );
}

/**
 * AchievementFilter — Category and level filter bars.
 * Provides interactive pill-based filtering for achievement cards.
 */
export default function AchievementFilter({
  activeCategory,
  activeLevel,
  onCategoryChange,
  onLevelChange,
}) {
  return (
    <div className="space-y-4">
      {/* Category filter */}
      <div>
        <span className="block text-[11px] font-mono font-medium text-text-muted uppercase tracking-wider mb-2">
          Category
        </span>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Filter by category">
          {CATEGORIES.map((cat) => (
            <FilterPill
              key={cat}
              label={cat}
              isActive={activeCategory === cat}
              onClick={() => onCategoryChange(cat)}
            />
          ))}
        </div>
      </div>

      {/* Level filter */}
      <div>
        <span className="block text-[11px] font-mono font-medium text-text-muted uppercase tracking-wider mb-2">
          Level
        </span>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Filter by level">
          {LEVELS.map((lvl) => (
            <FilterPill
              key={lvl}
              label={lvl}
              isActive={activeLevel === lvl}
              onClick={() => onLevelChange(lvl)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

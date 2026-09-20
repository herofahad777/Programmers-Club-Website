/**
 * Centralized color and border styling tokens for Achievement Category and Level badges.
 * Follows the official PC theme palette (high-contrast text on dark surfaces).
 */

export const CATEGORY_STYLES = {
  'Hackathon':               'bg-amber-500/15 text-amber-400 border-amber-500/25',
  'Competitive Programming': 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  'Leadership / Community':  'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  'Research':                'bg-violet-500/15 text-violet-400 border-violet-500/25',
  'Publication':             'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  'Patent':                  'bg-rose-500/15 text-rose-400 border-rose-500/25',
  'Open Source':             'bg-teal-500/15 text-teal-400 border-teal-500/25',
  'Workshop':                'bg-orange-500/15 text-orange-400 border-orange-500/25',
  'Other':                   'bg-gray-500/15 text-gray-400 border-gray-500/25',
};

export const LEVEL_STYLES = {
  'International': 'bg-primary/15 text-primary border-primary/25',
  'National':      'bg-sky-500/15 text-sky-400 border-sky-500/25',
  'State':         'bg-teal-500/15 text-teal-400 border-teal-500/25',
  'District':      'bg-lime-500/15 text-lime-400 border-lime-500/25',
  'College':       'bg-slate-500/15 text-slate-400 border-slate-500/25',
};

export function getCategoryStyle(category) {
  return CATEGORY_STYLES[category] || CATEGORY_STYLES['Other'];
}

export function getLevelStyle(level) {
  return LEVEL_STYLES[level] || LEVEL_STYLES['College'];
}

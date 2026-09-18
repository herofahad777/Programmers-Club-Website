import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Users, Star, Award, Trophy, ShieldCheck } from 'lucide-react';
import { getAchievementImage } from './imageResolver';

const CATEGORY_STYLES = {
  'Hackathon':               'bg-amber-500/15 text-amber-400 border-amber-500/25',
  'Competitive Programming': 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  'Research':                'bg-violet-500/15 text-violet-400 border-violet-500/25',
  'Publication':             'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  'Patent':                  'bg-rose-500/15 text-rose-400 border-rose-500/25',
  'Open Source':             'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  'Workshop':                'bg-orange-500/15 text-orange-400 border-orange-500/25',
  'Other':                   'bg-gray-500/15 text-gray-400 border-gray-500/25',
};

const LEVEL_STYLES = {
  'International': 'bg-primary/15 text-primary border-primary/25',
  'National':      'bg-sky-500/15 text-sky-400 border-sky-500/25',
  'State':         'bg-teal-500/15 text-teal-400 border-teal-500/25',
  'District':      'bg-lime-500/15 text-lime-400 border-lime-500/25',
  'College':       'bg-slate-500/15 text-slate-400 border-slate-500/25',
};

/**
 * AchievementDetailModal — Modal dialog presenting in-depth details
 * of an achievement when clicked on a card.
 */
export default function AchievementDetailModal({ achievement, onClose }) {
  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    // Prevent background scrolling while modal is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  if (!achievement) return null;

  const {
    title,
    date,
    year,
    category,
    level,
    description,
    winners = [],
    team = [],
    image,
    featured = false,
    demo = false,
  } = achievement;

  const resolvedImage = getAchievementImage(image);
  const winnerRoster = winners.length > 0 ? winners : team;
  const categoryStyle = CATEGORY_STYLES[category] || CATEGORY_STYLES['Other'];
  const levelStyle = LEVEL_STYLES[level] || LEVEL_STYLES['College'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="achievement-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface border border-border shadow-2xl flex flex-col"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close achievement details"
          className="absolute top-4 right-4 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-bg/85 backdrop-blur-md border border-border text-text-muted hover:text-text-primary hover:border-primary/50 transition-colors focus-visible:outline-2 focus-visible:outline-primary"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* 1. Header Image Banner */}
        <div className="relative aspect-[16/9] w-full bg-surface-card overflow-hidden border-b border-border">
          {resolvedImage ? (
            <img
              src={resolvedImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-text-muted bg-gradient-to-br from-surface to-surface-card p-6 text-center">
              <Award className="w-12 h-12 text-primary/40" aria-hidden="true" />
              <span className="text-sm text-text-muted font-medium">Programmers Club Milestone</span>
            </div>
          )}

          {/* Featured badge */}
          {featured && (
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg/90 backdrop-blur-md border border-primary/40 text-xs font-semibold uppercase tracking-wider text-primary shadow-lg">
              <Star className="w-3.5 h-3.5 fill-primary" aria-hidden="true" />
              <span>Featured Highlight</span>
            </div>
          )}

          {/* Demo badge */}
          {demo && (
            <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md bg-accent/90 backdrop-blur-md border border-border text-[11px] font-mono text-text-muted">
              DEMO RECORD
            </div>
          )}
        </div>

        {/* 2. Detailed Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata Row: Category, Level & Date */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/60">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${categoryStyle}`}>
                {category}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${levelStyle}`}>
                {level} Level
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-text-muted">
              <Calendar className="w-4 h-4 text-primary" aria-hidden="true" />
              <time>{date || year}</time>
            </div>
          </div>

          {/* Title */}
          <div>
            <h2
              id="achievement-modal-title"
              className="text-xl sm:text-2xl font-bold font-heading text-text-primary leading-snug"
            >
              {title}
            </h2>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
              About this Achievement
            </h3>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed bg-surface-card/60 p-4 rounded-xl border border-border/40">
              {description}
            </p>
          </div>

          {/* Winners & Participants */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
              <Users className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Recognized Students / Team</span>
            </div>

            {winnerRoster.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {winnerRoster.map((winner, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-card border border-border/70 text-text-primary text-xs sm:text-sm font-medium"
                  >
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Trophy className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                    <span className="truncate">{winner}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-surface-card border border-border/50 text-xs text-text-muted italic">
                Individual accomplishment recognized by the Programmers Club.
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-between pt-4 border-t border-border/60 text-xs text-text-muted">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Programmers Club • AIKTC Hall of Fame</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-surface-hover border border-border text-xs font-medium text-text-primary hover:border-primary/50 transition-colors focus-visible:outline-2 focus-visible:outline-primary"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

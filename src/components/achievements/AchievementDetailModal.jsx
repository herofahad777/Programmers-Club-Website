import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Users, Star, Award, Trophy, ShieldCheck } from 'lucide-react';
import { getAchievementImage } from './imageResolver';
import { getCategoryStyle, getLevelStyle } from './badgeStyles';

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
  const categoryStyle = getCategoryStyle(category);
  const levelStyle = getLevelStyle(level);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="achievement-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Wrapper with External Close Button */}
      <div
        className="relative w-full max-w-5xl max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Outside of Detailed Card View */}
        <div className="flex justify-end pb-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close achievement details"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/90 hover:bg-surface border border-border text-text-muted hover:text-text-primary hover:border-primary/50 transition-all focus-visible:outline-2 focus-visible:outline-primary shadow-lg text-xs font-mono group"
          >
            <X className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span>Close</span>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full overflow-y-auto rounded-2xl bg-surface border border-border shadow-2xl flex flex-col [scrollbar-width:thin] [scrollbar-color:var(--color-primary)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-border-hover hover:[&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-surface/50"
        >
          {/* 1. Header Image Banner (True 16:9, Expanded Defined Area, Fit Without Cropping) */}
          <div className="relative w-full aspect-[16/9] shrink-0 bg-surface-card overflow-hidden border-b border-border flex items-center justify-center">
            {resolvedImage ? (
              <img
                src={resolvedImage}
                alt={title}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-text-muted bg-gradient-to-br from-surface to-surface-card p-6 text-center">
                <Award className="w-14 h-14 text-primary/40" aria-hidden="true" />
                <span className="text-sm text-text-muted font-medium">Programmers Club Milestone</span>
              </div>
            )}
          </div>

          {/* 2. Detailed Body */}
          <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata Row: Featured Tag + Category + Level + Date (Cleanly grouped together) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/60">
            <div className="flex flex-wrap items-center gap-2">
              {featured && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/30 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-primary text-primary" aria-hidden="true" />
                  <span>Featured Highlight</span>
                </span>
              )}
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${categoryStyle}`}>
                {category}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${levelStyle}`}>
                {level} Level
              </span>
              {demo && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono text-text-muted bg-accent border border-border">
                  Demo Record
                </span>
              )}
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
              className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading text-text-primary leading-snug"
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
  </div>
);
}

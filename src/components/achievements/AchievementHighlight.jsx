import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Users, Shuffle, ChevronRight, Award, ExternalLink } from 'lucide-react';
import { getAchievementImages } from './imageResolver';

/**
 * AchievementHighlight — Contained spotlight banner above the stats bar.
 * Highlights featured or random achievements without overwhelming the screen.
 * Automatically rotates every 15 seconds, with pause-on-hover.
 */
export default function AchievementHighlight({ achievements = [], onSelect }) {
  // Prefer featured achievements, fallback to all achievements
  const highlightPool = achievements.filter((a) => a.featured).length > 0
    ? achievements.filter((a) => a.featured)
    : achievements;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate every 15 seconds (pausing while hovered)
  useEffect(() => {
    if (highlightPool.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % highlightPool.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [highlightPool.length, isPaused, currentIndex]);

  if (highlightPool.length === 0) return null;

  const current = highlightPool[currentIndex % highlightPool.length];
  const currentImages = getAchievementImages(current.images || current.image);
  const imageSrc = currentImages[0] || null;

  const nextHighlight = () => {
    setCurrentIndex((prev) => (prev + 1) % highlightPool.length);
  };

  const randomHighlight = () => {
    if (highlightPool.length <= 1) return;
    let next;
    do {
      next = Math.floor(Math.random() * highlightPool.length);
    } while (next === currentIndex);
    setCurrentIndex(next);
  };

  const handleOpenDetails = () => {
    if (onSelect) {
      onSelect(current);
    }
  };

  return (
    <section
      aria-label="Featured achievement spotlight"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2"
    >
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative overflow-hidden rounded-2xl bg-surface border border-primary/30 p-5 sm:p-6 lg:p-7 shadow-[0_0_25px_rgba(123,193,66,0.07)]"
      >
        {/* Subtle decorative glow */}
        <div
          className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Top bar: Badge & Controls */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-xs font-semibold text-primary tracking-wide">
            <Sparkles className="w-3.5 h-3.5 fill-primary text-primary" aria-hidden="true" />
            <span>HALL OF FAME SPOTLIGHT</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Slide Indicator Dots */}
            {highlightPool.length > 1 && (
              <div className="flex items-center gap-1 mr-1" aria-label="Spotlight slide indicators">
                {highlightPool.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex % highlightPool.length
                        ? 'w-4 bg-primary'
                        : 'w-1.5 bg-border-hover hover:bg-text-muted'
                    }`}
                  />
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={randomHighlight}
              title="Pick random milestone"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-hover border border-border text-xs text-text-secondary hover:text-primary hover:border-primary/40 transition-colors focus-visible:outline-2 focus-visible:outline-primary"
            >
              <Shuffle className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Shuffle</span>
            </button>

            <button
              type="button"
              onClick={nextHighlight}
              title="Next milestone"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-hover border border-border text-xs text-text-secondary hover:text-primary hover:border-primary/40 transition-colors focus-visible:outline-2 focus-visible:outline-primary"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Animated Highlight Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center cursor-pointer group"
            onClick={handleOpenDetails}
          >
            {/* Image Preview (Left / Top) */}
            <div className="lg:col-span-5 aspect-[16/9] w-full rounded-xl overflow-hidden bg-surface-card border border-border/70 relative shrink-0">
              {/* Skeleton Backdrop while image loads */}
              <div className="absolute inset-0 bg-surface flex flex-col items-center justify-center gap-2 text-text-muted/60 animate-pulse pointer-events-none">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary/40">
                  <Award className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-[10px] font-medium text-text-muted/70">Loading photo...</span>
              </div>

              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={current.title}
                  loading="lazy"
                  className="relative z-10 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-2 text-text-muted bg-gradient-to-br from-surface-card to-surface">
                  <Award className="w-10 h-10 text-primary/40" aria-hidden="true" />
                  <span className="text-xs text-text-muted">Featured Milestone</span>
                </div>
              )}
            </div>

            {/* Info (Right / Bottom) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Badges + Date */}
              <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
                <span className="px-2.5 py-0.5 rounded-full font-medium bg-primary/15 text-primary border border-primary/25 text-[11px]">
                  {current.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full font-medium bg-accent text-text-secondary border border-border text-[11px]">
                  {current.level} Level
                </span>
                <span className="inline-flex items-center gap-1 text-text-muted text-[11px]">
                  <Calendar className="w-3 h-3 text-text-muted" aria-hidden="true" />
                  <span>{current.date}</span>
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold font-heading text-text-primary leading-tight mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                <span>{current.title}</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 text-primary transition-opacity shrink-0" aria-hidden="true" />
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-3 leading-relaxed mb-3">
                {current.description}
              </p>

              {/* Winners list */}
              {current.winners && current.winners.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/50 text-xs">
                  <span className="inline-flex items-center gap-1 text-text-muted font-medium text-[11px]">
                    <Users className="w-3 h-3 text-primary" aria-hidden="true" />
                    Winners:
                  </span>
                  {current.winners.map((winner, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-accent text-text-primary text-[11px] font-medium"
                    >
                      {winner}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

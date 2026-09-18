import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Star, Award, ExternalLink } from 'lucide-react';
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
 * AchievementCard — Displays an achievement record following the strict ordering:
 * 1. Image of that achievement
 * 2. Date
 * 3. Title
 * 4. Description
 * 5. Winners name
 *
 * Fully clickable to reveal the detailed modal view.
 */
export default function AchievementCard({ achievement, index = 0, onSelect }) {
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
  } = achievement;

  const [imageError, setImageError] = useState(false);
  const resolvedImage = getAchievementImage(image);
  const winnerRoster = winners.length > 0 ? winners : team;

  const categoryStyle = CATEGORY_STYLES[category] || CATEGORY_STYLES['Other'];
  const levelStyle = LEVEL_STYLES[level] || LEVEL_STYLES['College'];

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(achievement);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${title}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className={`group relative flex flex-col overflow-hidden bg-surface-card border rounded-2xl transition-all duration-200 hover:border-primary/60 hover:shadow-[0_4px_24px_rgba(123,193,66,0.12)] cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
        featured ? 'border-primary/35' : 'border-border'
      }`}
    >
      {/* 1. IMAGE OF THAT ACHIEVEMENT (16:9 Aspect Ratio) */}
      <div className="relative aspect-[16/9] w-full bg-surface overflow-hidden border-b border-border/70">
        {resolvedImage && !imageError ? (
          <img
            src={resolvedImage}
            alt={title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-text-muted bg-gradient-to-br from-surface to-surface-card p-4 text-center">
            <Award className="w-8 h-8 text-primary/30" aria-hidden="true" />
            <span className="text-xs text-text-muted font-medium">Programmers Club Milestone</span>
          </div>
        )}

        {/* Hover click affordance */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/90 text-bg text-xs font-semibold shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-transform">
            <span>View Details</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </div>

        {/* Featured star badge on image */}
        {featured && (
          <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-bg/90 backdrop-blur border border-primary/40 text-[10px] font-semibold uppercase tracking-wider text-primary">
            <Star className="w-3 h-3 fill-primary" aria-hidden="true" />
            <span>Featured</span>
          </div>
        )}

        {/* Category & Level pills overlaid on image bottom-left */}
        <div className="absolute bottom-2.5 left-3 flex flex-wrap items-center gap-1.5">
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border backdrop-blur-md bg-bg/85 ${categoryStyle}`}>
            {category}
          </span>
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border backdrop-blur-md bg-bg/85 ${levelStyle}`}>
            {level}
          </span>
        </div>
      </div>

      {/* CARD BODY */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* 2. DATE */}
        <div className="flex items-center gap-1.5 text-xs text-text-muted mb-2 font-mono">
          <Calendar className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
          <time>{date || year}</time>
        </div>

        {/* 3. TITLE */}
        <h3 className="text-base sm:text-lg font-bold font-heading text-text-primary leading-snug mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* 4. DESCRIPTION */}
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4 flex-1 line-clamp-3">
          {description}
        </p>

        {/* 5. WINNERS NAME */}
        <div className="pt-3 border-t border-border/60 mt-auto">
          {winnerRoster.length > 0 ? (
            <div>
              <div className="flex items-center justify-between gap-1.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  <span>Winners / Team</span>
                </div>
                <span className="text-[10px] text-primary/80 group-hover:underline">
                  Click to expand
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {winnerRoster.map((winner, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2 py-0.5 rounded-md bg-accent text-[11px] font-medium text-text-primary border border-border/70"
                  >
                    {winner}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-1.5 text-xs text-text-muted">
              <div className="flex items-center gap-1.5 italic">
                <Users className="w-3.5 h-3.5 text-text-muted" aria-hidden="true" />
                <span>Individual Achievement</span>
              </div>
              <span className="text-[10px] text-primary/80 group-hover:underline">
                Click to expand
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

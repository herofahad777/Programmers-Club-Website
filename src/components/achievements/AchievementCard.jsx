import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Star, Award, ExternalLink, Images } from 'lucide-react';
import { getAchievementImages } from './imageResolver';
import { getCategoryStyle, getLevelStyle } from './badgeStyles';

/**
 * AchievementCard — Displays an achievement record following the strict ordering:
 * 1. Image of that achievement (supports 10-second multi-image auto-cycle)
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
    category,
    level,
    description,
    teamName,
    team_name,
    winners = [],
    team = [],
    images,
    image,
    featured = false,
    demo = false,
  } = achievement;

  const resolvedImages = getAchievementImages(images?.length ? images : image);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState({});

  const winnerRoster = winners.length > 0 ? winners : team;
  const displayTeamName = (teamName || team_name || '').trim();

  const categoryStyle = getCategoryStyle(category);
  const levelStyle = getLevelStyle(level);

  // 10-second auto-cycle for multiple images (pauses while card is hovered)
  useEffect(() => {
    if (resolvedImages.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % resolvedImages.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [resolvedImages.length, isHovered]);

  const currentImage = resolvedImages[activeImageIndex % resolvedImages.length];

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col overflow-hidden bg-surface-card border rounded-2xl transition-all duration-200 hover:border-primary/60 hover:shadow-[0_4px_24px_rgba(123,193,66,0.12)] cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
        featured ? 'border-primary/35' : 'border-border'
      }`}
    >
      {/* 1. IMAGE OF THAT ACHIEVEMENT (16:9 Aspect Ratio) */}
      <div className="relative aspect-[16/9] w-full bg-surface overflow-hidden border-b border-border/70">
        {/* Skeleton Backdrop while image loads */}
        <div className="absolute inset-0 bg-surface flex flex-col items-center justify-center gap-2 text-text-muted/60 animate-pulse pointer-events-none">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary/40">
            <Award className="w-5 h-5" aria-hidden="true" />
          </div>
          <span className="text-[10px] font-medium text-text-muted/70">Loading photo...</span>
        </div>

        {resolvedImages.length > 0 && currentImage && !imageErrorMap[currentImage] ? (
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={currentImage}
              alt={`${title} - Photo ${(activeImageIndex % resolvedImages.length) + 1}`}
              loading="lazy"
              onError={() => setImageErrorMap((prev) => ({ ...prev, [currentImage]: true }))}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative z-10 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </AnimatePresence>
        ) : (
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-1.5 text-text-muted bg-gradient-to-br from-surface to-surface-card p-4 text-center">
            <Award className="w-8 h-8 text-primary/30" aria-hidden="true" />
            <span className="text-xs text-text-muted font-medium">Programmers Club Milestone</span>
          </div>
        )}

        {/* Multi-image indicator dots */}
        {resolvedImages.length > 1 && (
          <div
            className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-black/65 backdrop-blur-xs border border-white/15 shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <Images className="w-3 h-3 text-primary mr-0.5" aria-hidden="true" />
            {resolvedImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`View photo ${idx + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === (activeImageIndex % resolvedImages.length)
                    ? 'w-3.5 bg-primary'
                    : 'w-1.5 bg-white/45 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}

        {/* Hover click affordance */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/90 text-bg text-xs font-semibold shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-transform">
            <span>View Details</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>

      {/* CARD BODY */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* METADATA ROW: Tags on Left, Date on Right (like Detailed Card View) */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-2.5 border-b border-border/50">
          <div className="flex flex-wrap items-center gap-1.5">
            {featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary/15 text-primary border border-primary/30">
                <Star className="w-3 h-3 fill-primary text-primary" aria-hidden="true" />
                <span>Featured</span>
              </span>
            )}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${categoryStyle}`}>
              {category}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${levelStyle}`}>
              {level}
            </span>
            {demo && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono text-text-muted bg-accent border border-border">
                Demo
              </span>
            )}
          </div>

          <div className="inline-flex items-center gap-1 text-xs font-mono text-text-muted shrink-0">
            <Calendar className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <time>{date}</time>
          </div>
        </div>

        {/* 3. TITLE */}
        <h3 className="text-base sm:text-lg font-bold font-heading text-text-primary leading-snug mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* 4. DESCRIPTION */}
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* 5. TEAM MEMBERS */}
        <div className="pt-3 border-t border-border/60">
          {winnerRoster.length > 0 ? (
            <div>
              <div className="flex items-center justify-between gap-1.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  <span>Team Members</span>
                </div>
                {displayTeamName && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-sans font-medium bg-primary/10 text-primary border border-primary/20 tracking-normal normal-case truncate max-w-[140px]">
                    <span className="text-text-muted font-mono text-[9px] uppercase">Team:</span>
                    <span className="truncate">{displayTeamName}</span>
                  </span>
                )}
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
            <div className="flex items-center gap-1.5 text-xs text-text-muted italic">
              <Users className="w-3.5 h-3.5 text-text-muted" aria-hidden="true" />
              <span>Individual Achievement</span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

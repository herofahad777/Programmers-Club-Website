import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Star, Award, Trophy, ShieldCheck, Building2, MapPin, Globe, ExternalLink, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { getAchievementImages } from './imageResolver';
import { getCategoryStyle, getLevelStyle } from './badgeStyles';

/**
 * AchievementDetailModal — Modal dialog presenting in-depth details
 * of an achievement when clicked on a card.
 * Supports multi-image carousel with 10-second auto-cycle, pause-on-hover,
 * navigation arrows, indicator dots, and keyboard left/right arrow controls.
 */
export default function AchievementDetailModal({ achievement, onClose }) {
  const {
    title,
    date,
    category,
    level,
    description,
    teamName,
    team_name,
    organizerVenue,
    organizer_venue,
    organizer,
    venue,
    location,
    links = [],
    link,
    winners = [],
    team = [],
    images,
    image,
    featured = false,
    demo = false,
  } = achievement || {};

  const resolvedImages = getAchievementImages(images?.length ? images : image);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState({});

  // 10-second auto-cycle (pauses when hovered over image banner)
  useEffect(() => {
    if (resolvedImages.length <= 1 || isAutoPlayPaused) return;

    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % resolvedImages.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [resolvedImages.length, isAutoPlayPaused]);

  // Keyboard navigation (Escape to close, Left/Right arrows for carousel)
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && resolvedImages.length > 1) {
        e.preventDefault();
        setActiveImageIndex((prev) => (prev - 1 + resolvedImages.length) % resolvedImages.length);
      } else if (e.key === 'ArrowRight' && resolvedImages.length > 1) {
        e.preventDefault();
        setActiveImageIndex((prev) => (prev + 1) % resolvedImages.length);
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
  }, [onClose, resolvedImages.length]);

  if (!achievement) return null;

  const currentImage = resolvedImages[activeImageIndex % resolvedImages.length];
  const winnerRoster = winners.length > 0 ? winners : team;
  const categoryStyle = getCategoryStyle(category);
  const levelStyle = getLevelStyle(level);
  const displayTeamName = (teamName || team_name || '').trim();
  const displayOrganizerVenue = organizerVenue || organizer_venue || [organizer, venue || location].filter(Boolean).join(' • ');

  // Normalize links (supports array of { label, url } or single string link)
  const normalizedLinks = Array.isArray(links) && links.length > 0
    ? links
    : typeof link === 'string' && link.trim() !== ''
      ? [{ label: 'Project / Verification Link', url: link }]
      : [];

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + resolvedImages.length) % resolvedImages.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % resolvedImages.length);
  };

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
          {/* 1. Header Image Banner (True 16:9, Multi-image carousel with 10s auto-rotation, Fit Without Cropping) */}
          <div
            className="relative w-full aspect-[16/9] shrink-0 bg-surface-card overflow-hidden border-b border-border flex items-center justify-center group/banner select-none"
            onMouseEnter={() => setIsAutoPlayPaused(true)}
            onMouseLeave={() => setIsAutoPlayPaused(false)}
          >
            {resolvedImages.length > 0 && currentImage && !imageErrorMap[currentImage] ? (
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={currentImage}
                  alt={`${title} - Photo ${(activeImageIndex % resolvedImages.length) + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onError={() => setImageErrorMap((prev) => ({ ...prev, [currentImage]: true }))}
                  className="w-full h-full object-contain"
                />
              </AnimatePresence>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-text-muted bg-gradient-to-br from-surface to-surface-card p-6 text-center">
                <Award className="w-14 h-14 text-primary/40" aria-hidden="true" />
                <span className="text-sm text-text-muted font-medium">Programmers Club Milestone</span>
              </div>
            )}

            {/* Navigation Controls for Multi-image */}
            {resolvedImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white/80 hover:text-white border border-white/20 backdrop-blur-sm transition-all hover:scale-105 shadow-lg focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white/80 hover:text-white border border-white/20 backdrop-blur-sm transition-all hover:scale-105 shadow-lg focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>

                {/* Counter Badge (Top Right) */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 text-white border border-white/20 backdrop-blur-sm text-xs font-mono">
                  <Images className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  <span>{(activeImageIndex % resolvedImages.length) + 1} / {resolvedImages.length}</span>
                </div>

                {/* Bottom Indicator Dots */}
                <div className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center gap-1.5">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-sm border border-white/15 shadow-md">
                    {resolvedImages.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        aria-label={`Go to photo ${idx + 1}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex(idx);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === (activeImageIndex % resolvedImages.length)
                            ? 'w-6 bg-primary shadow-sm'
                            : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </>
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
              <time>{date}</time>
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

          {/* Team Members */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Team Members</span>
              </div>
              {displayTeamName && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold bg-primary/15 text-primary border border-primary/30 tracking-normal normal-case shadow-sm">
                  <span className="text-text-muted font-normal font-mono text-[10px] uppercase tracking-wider">Team:</span>
                  <span>{displayTeamName}</span>
                </span>
              )}
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

          {/* Organizer / Venue Section */}
          {displayOrganizerVenue && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
                <Building2 className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Organizer / Venue</span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-card border border-border/70 text-xs sm:text-sm font-medium text-text-primary">
                {displayOrganizerVenue}
              </div>
            </div>
          )}

          {/* External Links Section */}
          {normalizedLinks.length > 0 && (
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
                <ExternalLink className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>External Links</span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                {normalizedLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-card hover:bg-surface-hover border border-border/70 hover:border-primary/50 text-text-primary hover:text-primary text-xs font-medium transition-all group shadow-sm focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <Globe className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
                    <span>{item.label || 'View Link'}</span>
                    <ExternalLink className="w-3 h-3 text-text-muted group-hover:text-primary transition-colors ml-0.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          )}

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

import React from 'react';
import {
  Sparkles,
  Calendar,
  Users,
  Trophy,
  Flame,
  Award,
  ChevronRight,
  ChevronLeft,
  Shuffle,
  ImageIcon,
  Filter,
  Star,
  Tag,
} from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';

/**
 * ShimmerBar — Pulsing placeholder line with distinct rounded corners and animated light wave.
 */
function ShimmerBar({ className = '', height = 'h-4', width = 'w-full', rounded = 'rounded-md' }) {
  return (
    <div
      className={`animate-pulse bg-white/10 border border-white/5 relative overflow-hidden ${height} ${width} ${rounded} ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

/**
 * SpotlightSkeleton — 100% pixel-perfect replica of AchievementHighlight banner.
 */
export function SpotlightSkeleton() {
  return (
    <section
      aria-label="Loading featured achievement spotlight"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 select-none"
    >
      <div className="relative overflow-hidden rounded-2xl bg-surface border border-primary/30 p-5 sm:p-6 lg:p-7 shadow-[0_0_25px_rgba(123,193,66,0.07)]">
        {/* Subtle decorative glow */}
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        {/* Top bar: Badge & Controls */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-xs font-semibold text-primary tracking-wide animate-pulse">
            <Sparkles className="w-3.5 h-3.5 fill-primary text-primary" aria-hidden="true" />
            <span>HALL OF FAME SPOTLIGHT</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Slide Indicator Dots */}
            <div className="flex items-center gap-1 mr-1">
              <div className="w-4 h-1.5 rounded-full bg-primary animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-border-hover" />
              <div className="w-1.5 h-1.5 rounded-full bg-border-hover" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-hover border border-border text-xs text-text-secondary animate-pulse">
              <Shuffle className="w-3.5 h-3.5 text-primary/70" aria-hidden="true" />
              <span className="hidden sm:inline">Shuffle</span>
            </div>

            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-hover border border-border text-xs text-text-secondary animate-pulse">
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3.5 h-3.5 text-primary/70" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Inner Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          {/* Image Preview (Left / Top) */}
          <div className="lg:col-span-5 aspect-[16/9] w-full rounded-xl overflow-hidden bg-surface-card border border-border/70 relative shrink-0 flex flex-col items-center justify-center p-4">
            <div className="absolute inset-0 bg-surface flex flex-col items-center justify-center gap-2 text-text-muted animate-pulse">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary/50 shadow-inner">
                <ImageIcon className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-[11px] font-medium text-text-muted">Featured Milestone Media</span>
            </div>
          </div>

          {/* Info (Right / Bottom) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Badges + Date */}
            <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
              <span className="px-2.5 py-0.5 rounded-full font-medium bg-primary/15 text-primary border border-primary/25 text-[11px] inline-flex items-center gap-1 animate-pulse">
                <Star className="w-2.5 h-2.5 fill-primary/40 text-primary" />
                <span>Featured</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full font-medium bg-accent text-text-secondary border border-border text-[11px] inline-flex items-center gap-1 animate-pulse">
                <Tag className="w-2.5 h-2.5 text-text-muted" />
                <span>National Level</span>
              </span>
              <span className="inline-flex items-center gap-1 text-text-muted text-[11px] animate-pulse">
                <Calendar className="w-3 h-3 text-primary/70" aria-hidden="true" />
                <span className="w-20 h-3 bg-white/20 rounded inline-block" />
              </span>
            </div>

            {/* Title */}
            <div className="space-y-1.5 mb-2">
              <ShimmerBar height="h-5 sm:h-6" width="w-4/5" rounded="rounded-md" className="bg-primary/20 border-primary/30" />
            </div>

            {/* Description */}
            <div className="space-y-1.5 mb-3">
              <ShimmerBar height="h-3.5" width="w-full" className="bg-white/10" />
              <ShimmerBar height="h-3.5" width="w-11/12" className="bg-white/10" />
            </div>

            {/* Winners list */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/50 text-xs">
              <span className="inline-flex items-center gap-1 text-text-muted font-medium text-[11px]">
                <Users className="w-3 h-3 text-primary" aria-hidden="true" />
                Winners:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded bg-accent text-text-primary text-[11px] font-medium border border-border/50 animate-pulse">
                  <span className="w-16 h-2.5 bg-white/20 rounded inline-block" />
                </span>
                <span className="px-2 py-0.5 rounded bg-accent text-text-primary text-[11px] font-medium border border-border/50 animate-pulse">
                  <span className="w-20 h-2.5 bg-white/20 rounded inline-block" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * StatsSkeleton — 100% pixel-perfect replica of AchievementStats bar.
 */
export function StatsSkeleton() {
  const statsConfig = [
    { label: 'Total Achievements', Icon: Trophy },
    { label: 'Hackathon Wins', Icon: Flame },
    { label: 'Students Recognized', Icon: Users },
    { label: 'National / Intl Awards', Icon: Award },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none" aria-hidden="true">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsConfig.map((item, i) => {
          const Icon = item.Icon;
          return (
            <div
              key={i}
              className="flex items-center gap-4 bg-surface border border-border rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 text-primary shrink-0 border border-primary/20">
                <Icon className="w-5 h-5 animate-pulse" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <ShimmerBar height="h-7 sm:h-8" width="w-14" className="bg-primary/25 border-primary/30" />
                <p className="text-xs sm:text-sm text-text-muted mt-1 truncate">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * FilterSkeleton — 100% pixel-perfect replica of Date & Dropdown Filters.
 */
export function FilterSkeleton() {
  return (
    <div className="w-full select-none" aria-hidden="true">
      {/* Dynamic Center Date Filter replica */}
      <div className="w-full flex flex-col items-center justify-center my-6">
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-surface border border-border shadow-inner">
          <div className="px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-text-muted bg-surface-card border border-border flex items-center gap-1 animate-pulse">
            <ChevronLeft className="w-3.5 h-3.5 text-primary" />
            <span>2024</span>
          </div>

          <div className="px-5 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold text-bg bg-primary shadow-sm flex items-center gap-1.5 animate-pulse">
            <span>All Years</span>
          </div>

          <div className="px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-text-muted bg-surface-card border border-border flex items-center gap-1 animate-pulse">
            <span>2026</span>
            <ChevronRight className="w-3.5 h-3.5 text-primary" />
          </div>

          <div className="w-px h-6 bg-border mx-1" />

          <div className="px-3 py-2 rounded-xl text-xs font-sans text-text-muted bg-surface-card border border-border flex items-center gap-1.5 animate-pulse">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span className="hidden sm:inline">Select Year</span>
          </div>
        </div>
      </div>

      {/* Dropdown Filters replica */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-surface border border-border mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-text-primary">
          <Filter className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
          <span>Filter Milestones:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="h-9 sm:h-10 w-44 px-3 py-2 rounded-lg bg-surface-card border border-border text-xs sm:text-sm text-text-muted flex items-center justify-between animate-pulse">
            <span>All Categories</span>
            <span className="text-[10px] text-text-muted">▼</span>
          </div>

          <div className="h-9 sm:h-10 w-36 px-3 py-2 rounded-lg bg-surface-card border border-border text-xs sm:text-sm text-text-muted flex items-center justify-between animate-pulse">
            <span>All Levels</span>
            <span className="text-[10px] text-text-muted">▼</span>
          </div>
        </div>
      </div>

      {/* Filter Count Summary */}
      <div className="flex items-center justify-between text-xs text-text-muted mb-4 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary/70 animate-ping" />
          <span>Loading verified records...</span>
        </div>
      </div>
    </div>
  );
}

/**
 * SingleCardSkeleton — 100% pixel-perfect replica of an individual AchievementCard.
 */
export function SingleCardSkeleton() {
  return (
    <article
      className="group relative flex flex-col overflow-hidden bg-surface-card border border-border rounded-2xl select-none"
      aria-hidden="true"
    >
      {/* 1. IMAGE (16:9 Aspect Ratio) */}
      <div className="relative aspect-[16/9] w-full bg-surface overflow-hidden border-b border-border/70 flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-surface flex flex-col items-center justify-center gap-2 text-text-muted/60 animate-pulse">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary/40 shadow-inner">
            <Award className="w-5 h-5" aria-hidden="true" />
          </div>
          <span className="text-[10px] font-medium text-text-muted/70">Loading achievement photo...</span>
        </div>

        {/* Multi-image indicator dots placeholder */}
        <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-black/65 border border-white/15 shadow-sm">
          <div className="w-3.5 h-1.5 rounded-full bg-primary/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/45" />
        </div>
      </div>

      {/* CARD BODY */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
        <div>
          {/* METADATA ROW */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-2.5 border-b border-border/50">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-text-muted border border-white/10 animate-pulse">
                Category
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-text-muted border border-white/10 animate-pulse">
                Level
              </span>
            </div>

            <div className="inline-flex items-center gap-1 text-xs font-mono text-text-muted animate-pulse">
              <Calendar className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              <span className="w-20 h-3 bg-white/20 rounded inline-block" />
            </div>
          </div>

          {/* 3. TITLE */}
          <div className="space-y-1.5 mb-2">
            <ShimmerBar height="h-5 sm:h-6" width="w-4/5" rounded="rounded-md" className="bg-primary/20 border-primary/30" />
          </div>

          {/* 4. DESCRIPTION */}
          <div className="space-y-1.5 mb-4">
            <ShimmerBar height="h-3.5" width="w-full" className="bg-white/10" />
            <ShimmerBar height="h-3.5" width="w-11/12" className="bg-white/10" />
            <ShimmerBar height="h-3.5" width="w-3/4" className="bg-white/10" />
          </div>
        </div>

        {/* 5. TEAM MEMBERS */}
        <div className="pt-3 border-t border-border/60">
          <div className="flex items-center justify-between gap-1.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              <span>Team Members</span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] bg-primary/10 text-primary border border-primary/20 animate-pulse">
              <span className="w-12 h-2 bg-primary/30 rounded inline-block" />
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-accent text-[11px] font-medium text-text-primary border border-border/70 animate-pulse">
              <span className="w-16 h-2.5 bg-white/20 rounded inline-block" />
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-accent text-[11px] font-medium text-text-primary border border-border/70 animate-pulse">
              <span className="w-20 h-2.5 bg-white/20 rounded inline-block" />
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-accent text-[11px] font-medium text-text-primary border border-border/70 animate-pulse">
              <span className="w-14 h-2.5 bg-white/20 rounded inline-block" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * AchievementSkeleton — Complete page skeleton matching Achievements layout.
 */
export default function AchievementSkeleton({ cardCount = 4 }) {
  return (
    <div
      role="status"
      aria-label="Loading achievements content..."
      className="w-full select-none"
    >
      <span className="sr-only">Loading achievements, statistics, and milestones...</span>

      {/* 1. Spotlight Banner Skeleton */}
      <SpotlightSkeleton />

      {/* 2. Stats Bar Skeleton */}
      <StatsSkeleton />

      {/* 3. Main Section with Filters & Card Grid */}
      <SectionWrapper
        id="hall-of-fame-skeleton"
        badge="Hall of Fame"
        title="Milestones & Victories"
        subtitle="Browse verified student accomplishments across competitions, research papers, and technical contributions."
      >
        <FilterSkeleton />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {Array.from({ length: cardCount }).map((_, index) => (
            <SingleCardSkeleton key={index} />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}

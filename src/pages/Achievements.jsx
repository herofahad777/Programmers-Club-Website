import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/common/PageHeader';
import SectionWrapper from '../components/common/SectionWrapper';
import AchievementHighlight from '../components/achievements/AchievementHighlight';
import AchievementStats from '../components/achievements/AchievementStats';
import AchievementDateFilter from '../components/achievements/AchievementDateFilter';
import AchievementDropdownFilters from '../components/achievements/AchievementDropdownFilters';
import AchievementCard from '../components/achievements/AchievementCard';
import AchievementDetailModal from '../components/achievements/AchievementDetailModal';
import AchievementSkeleton, { SingleCardSkeleton } from '../components/achievements/AchievementSkeleton';
import EmptyState from '../components/achievements/EmptyState';

/*
 * Data import — loaded from src/data/achievements.json
 * Designed for immediate API hook replacement in the future.
 */
import achievementsData from '../data/achievements.json';

const ALL_ACHIEVEMENTS = (achievementsData.achievements || []).map((a) => {
  // Automatically extract 4-digit year from date (e.g. "December 2025" -> 2025)
  const parsedYear =
    typeof a.date === 'string' && a.date.match(/\b(19\d\d|20\d\d)\b/)?.[0]
      ? Number(a.date.match(/\b(19\d\d|20\d\d)\b/)[0])
      : null;

  return {
    ...a,
    year: parsedYear,
  };
});

const AVAILABLE_YEARS = Array.from(
  new Set(ALL_ACHIEVEMENTS.map((a) => a.year).filter(Boolean))
).sort((a, b) => b - a);

const BATCH_SIZE = 4;

/**
 * Achievements & Hall of Fame Page
 * Route: /achievements
 */
export default function Achievements() {
  const achievements = ALL_ACHIEVEMENTS;

  /* ─── State Management ─── */
  const [isLoading, setIsLoading] = useState(true);
  const [debugSkeleton] = useState(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('debug') === 'skeleton' || params.get('skeleton') === 'true';
  });

  const [selectedYear, setSelectedYear] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLevel, setActiveLevel] = useState('All');
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  // Progressive infinite scroll loading state
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreTriggerRef = useRef(null);

  // Initial loading simulation (prepares page for future async API fetch)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  /* ─── Filtered Achievements ─── */
  const filteredAchievements = useMemo(() => {
    return achievements.filter((item) => {
      const matchesYear =
        selectedYear === 'All' || String(item.year) === String(selectedYear);
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchesLevel =
        activeLevel === 'All' || item.level === activeLevel;
      return matchesYear && matchesCategory && matchesLevel;
    });
  }, [achievements, selectedYear, activeCategory, activeLevel]);

  // Reset pagination batch when filters change
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [selectedYear, activeCategory, activeLevel]);

  // Infinite scroll trigger: when scrolling near bottom, show skeleton cards & load next batch
  useEffect(() => {
    if (isLoading || debugSkeleton || visibleCount >= filteredAchievements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + BATCH_SIZE);
            setIsLoadingMore(false);
          }, 600);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const currentTrigger = loadMoreTriggerRef.current;
    if (currentTrigger) {
      observer.observe(currentTrigger);
    }

    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger);
      }
    };
  }, [isLoading, debugSkeleton, visibleCount, filteredAchievements.length, isLoadingMore]);

  const displayedCards = useMemo(() => {
    return filteredAchievements.slice(0, visibleCount);
  }, [filteredAchievements, visibleCount]);

  const hasActiveFilters =
    selectedYear !== 'All' || activeCategory !== 'All' || activeLevel !== 'All';

  const resetAllFilters = () => {
    setSelectedYear('All');
    setActiveCategory('All');
    setActiveLevel('All');
  };

  const showSkeletonView = isLoading || debugSkeleton;

  return (
    <div className="w-full">
      {/* 1. Page Header (Shared component) */}
      <PageHeader
        title="Achievements & Honors"
        description="Celebrating student victories in hackathons, competitive programming contests, research publications, and open-source contributions."
        badge="Programmers Club // AIKTC"
        breadcrumbs={['Achievements']}
      />

      <AnimatePresence mode="wait">
        {showSkeletonView ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <AchievementSkeleton cardCount={filteredAchievements.length || 2} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* 2. Highlight System (Positioned above stats, contained width) */}
            <AchievementHighlight
              achievements={achievements}
              onSelect={setSelectedAchievement}
            />

            {/* 4. Dynamic Statistics Bar */}
            <AchievementStats achievements={achievements} />

            {/* 5. Main Hall of Fame Section with Filters & Cards */}
            <SectionWrapper
              id="hall-of-fame"
              badge="Hall of Fame"
              title="Milestones & Victories"
              subtitle="Browse verified student accomplishments across competitions, research papers, and technical contributions."
            >
              {/* Dynamic Center Date Filter with Manual Selector */}
              <AchievementDateFilter
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
                availableYears={AVAILABLE_YEARS}
              />

              {/* Dropdown Filters for Category & Level */}
              <div className="mb-8">
                <AchievementDropdownFilters
                  activeCategory={activeCategory}
                  activeLevel={activeLevel}
                  onCategoryChange={setActiveCategory}
                  onLevelChange={setActiveLevel}
                  onReset={hasActiveFilters ? resetAllFilters : undefined}
                />
              </div>

              {/* Filter Count Summary */}
              <div className="flex items-center justify-between text-xs text-text-muted mb-4 px-1">
                <span>
                  Showing <strong className="text-text-primary">{filteredAchievements.length}</strong>{' '}
                  {filteredAchievements.length === 1 ? 'record' : 'records'}
                  {selectedYear !== 'All' ? ` from ${selectedYear}` : ' across all years'}
                  {filteredAchievements.length > displayedCards.length && (
                    <span className="text-primary ml-1">
                      (Displaying {displayedCards.length} of {filteredAchievements.length})
                    </span>
                  )}
                </span>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="text-primary hover:underline"
                  >
                    Reset all filters
                  </button>
                )}
              </div>

              {/* Achievement Cards Grid with Progressive Scroll Skeleton */}
              {displayedCards.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    {displayedCards.map((achievement, index) => (
                      <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                        index={index}
                        onSelect={setSelectedAchievement}
                      />
                    ))}

                    {/* Scroll Loading Skeleton: Renders placeholder cards in-place while fetching more */}
                    {isLoadingMore && (
                      <>
                        <SingleCardSkeleton />
                        <SingleCardSkeleton />
                      </>
                    )}
                  </div>

                  {/* Scroll Sentinel Trigger */}
                  {visibleCount < filteredAchievements.length && (
                    <div
                      ref={loadMoreTriggerRef}
                      className="w-full py-8 flex items-center justify-center text-xs text-text-muted gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                      <span>Loading more milestone cards...</span>
                    </div>
                  )}
                </div>
              ) : (
                <EmptyState
                  message={
                    hasActiveFilters
                      ? 'No achievements found matching your selected year, category, or level filters.'
                      : 'No achievement records currently available. Check back soon!'
                  }
                  onReset={hasActiveFilters ? resetAllFilters : undefined}
                />
              )}
            </SectionWrapper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. In-Depth Achievement Detail Modal (Shown on card click) */}
      <AnimatePresence>
        {selectedAchievement && (
          <AchievementDetailModal
            achievement={selectedAchievement}
            onClose={() => setSelectedAchievement(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}


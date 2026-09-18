import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import PageHeader from '../components/common/PageHeader';
import SectionWrapper from '../components/common/SectionWrapper';
import AchievementHighlight from '../components/achievements/AchievementHighlight';
import AchievementStats from '../components/achievements/AchievementStats';
import AchievementDateFilter from '../components/achievements/AchievementDateFilter';
import AchievementDropdownFilters from '../components/achievements/AchievementDropdownFilters';
import AchievementCard from '../components/achievements/AchievementCard';
import AchievementDetailModal from '../components/achievements/AchievementDetailModal';
import EmptyState from '../components/achievements/EmptyState';

/*
 * Data import — loaded from src/data/achievements.json
 * Designed for immediate API hook replacement in the future.
 */
import achievementsData from '../data/achievements.json';

/**
 * Achievements & Hall of Fame Page
 * Route: /achievements
 */
export default function Achievements() {
  const { achievements = [] } = achievementsData;

  /* ─── State Management ─── */
  const [selectedYear, setSelectedYear] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLevel, setActiveLevel] = useState('All');
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  /* ─── Available Years in Dataset ─── */
  const availableYears = useMemo(() => {
    const years = achievements.map((a) => a.year).filter(Boolean);
    return Array.from(new Set(years)).sort((a, b) => b - a);
  }, [achievements]);

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

  const hasActiveFilters =
    selectedYear !== 'All' || activeCategory !== 'All' || activeLevel !== 'All';

  const resetAllFilters = () => {
    setSelectedYear('All');
    setActiveCategory('All');
    setActiveLevel('All');
  };

  return (
    <div className="w-full">
      {/* 1. Page Header (Shared component) */}
      <PageHeader
        title="Achievements & Honors"
        description="Celebrating student victories in hackathons, competitive programming contests, research publications, and open-source contributions."
        badge="Programmers Club // AIKTC"
        breadcrumbs={['Achievements']}
      />

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
          availableYears={availableYears}
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

        {/* Achievement Cards Grid or Empty State */}
        {filteredAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {filteredAchievements.map((achievement, index) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                index={index}
                onSelect={setSelectedAchievement}
              />
            ))}
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

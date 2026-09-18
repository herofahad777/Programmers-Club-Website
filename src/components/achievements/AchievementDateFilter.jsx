import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Check } from 'lucide-react';

/**
 * AchievementDateFilter — Centralized dynamic year navigator:
 * [ Previous Year (e.g. 2024) ] | [ Selected Year (e.g. 2025) ] | [ Next Year (e.g. 2026) ]
 *
 * Rules:
 * 1. Future years are never shown or selectable (year <= current calendar year).
 * 2. Manual selection button opens a quick calendar-like year picker popover
 *    allowing instant navigation across past decades with 1 click.
 */
export default function AchievementDateFilter({
  selectedYear,
  onYearChange,
  availableYears = [],
}) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef(null);

  // Current real-world calendar year
  const currentCalendarYear = new Date().getFullYear();

  // Generate decade list from 2015 up to current calendar year
  const allPickerYears = [];
  for (let y = currentCalendarYear; y >= 2015; y--) {
    allPickerYears.push(y);
  }

  // Close picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsPickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentNum = selectedYear === 'All' ? currentCalendarYear : Number(selectedYear);
  const prevYear = currentNum - 1;
  const nextYear = currentNum + 1;

  // Next year is valid ONLY if it does not exceed currentCalendarYear
  const hasNextYear = nextYear <= currentCalendarYear;

  const handlePrev = () => {
    onYearChange(String(prevYear));
  };

  const handleNext = () => {
    if (hasNextYear) {
      onYearChange(String(nextYear));
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center my-6">
      {/* Main Bar: Previous | Current | Next + Calendar Picker */}
      <div className="relative inline-flex items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-surface border border-border mx-auto shadow-sm">
        {/* Previous Year Button */}
        <button
          type="button"
          onClick={handlePrev}
          title={`Go to ${prevYear}`}
          className="w-20 sm:w-24 inline-flex items-center justify-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover border border-transparent hover:border-border transition-all focus-visible:outline-2 focus-visible:outline-primary"
        >
          <ChevronLeft className="w-4 h-4 text-text-muted shrink-0" aria-hidden="true" />
          <span>{prevYear}</span>
        </button>

        {/* Selected Year / "All Years" (Click opens manual picker) */}
        <div className="relative" ref={pickerRef}>
          <button
            type="button"
            onClick={() => setIsPickerOpen((prev) => !prev)}
            aria-expanded={isPickerOpen}
            aria-haspopup="dialog"
            title="Open quick year selector"
            className="min-w-[120px] sm:min-w-[130px] inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-sm sm:text-base font-bold font-heading bg-primary text-bg hover:bg-primary-soft transition-all shadow-[0_0_12px_rgba(123,193,66,0.25)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            <Calendar className="w-4 h-4 text-bg shrink-0" aria-hidden="true" />
            <span>{selectedYear === 'All' ? 'All Years' : selectedYear}</span>
          </button>

          {/* Manual Selection Popover (Calendar Year Picker) */}
          {isPickerOpen && (
            <div
              role="dialog"
              aria-label="Select Year"
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 rounded-2xl bg-surface-card border border-border shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-border text-xs font-semibold text-text-secondary">
                <span>Select Year</span>
                <button
                  type="button"
                  onClick={() => {
                    onYearChange('All');
                    setIsPickerOpen(false);
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    selectedYear === 'All'
                      ? 'bg-primary text-bg font-bold'
                      : 'bg-surface hover:bg-surface-hover text-text-muted hover:text-text-primary'
                  }`}
                >
                  View All Years
                </button>
              </div>

              {/* Year Grid: 2 rows visible per scroll with right scrollbar */}
              <div className="grid grid-cols-3 gap-1.5 max-h-[82px] overflow-y-scroll pr-1.5 [scrollbar-width:thin] [scrollbar-color:var(--color-primary)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-primary/50 hover:[&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-surface/60">
                {allPickerYears.map((year) => {
                  const isSelected = String(year) === String(selectedYear);
                  const hasRecords = availableYears.includes(year);

                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => {
                        onYearChange(String(year));
                        setIsPickerOpen(false);
                      }}
                      className={`relative flex items-center justify-center py-2 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-primary text-bg font-bold shadow'
                          : hasRecords
                          ? 'bg-surface text-text-primary hover:bg-surface-hover hover:border-primary/40 border border-transparent'
                          : 'bg-surface/50 text-text-muted hover:bg-surface-hover border border-transparent'
                      }`}
                    >
                      {year}
                      {hasRecords && !isSelected && (
                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
                      )}
                    </button>
                  );
                })}
              </div>

              <p className="mt-2.5 pt-2 border-t border-border text-[10px] text-text-muted text-center">
                Green dot = verified records exist
              </p>
            </div>
          )}
        </div>

        {/* Next Year Button (Hidden/Disabled if next year is in the future) */}
        {hasNextYear ? (
          <button
            type="button"
            onClick={handleNext}
            title={`Go to ${nextYear}`}
            className="w-20 sm:w-24 inline-flex items-center justify-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover border border-transparent hover:border-border transition-all focus-visible:outline-2 focus-visible:outline-primary"
          >
            <span>{nextYear}</span>
            <ChevronRight className="w-4 h-4 text-text-muted shrink-0" aria-hidden="true" />
          </button>
        ) : (
          <div
            className="w-20 sm:w-24 inline-flex items-center justify-center px-2.5 sm:px-3 py-2 text-xs text-text-muted/30 font-mono select-none"
            title="Future years cannot be selected"
          >
            <span>Current</span>
          </div>
        )}
      </div>

      {/* Quick toggle if specific year is filtered */}
      {selectedYear !== 'All' && (
        <button
          type="button"
          onClick={() => onYearChange('All')}
          className="mt-2.5 text-xs text-text-muted hover:text-primary transition-colors underline underline-offset-4 text-center"
        >
          Show All Years
        </button>
      )}
    </div>
  );
}

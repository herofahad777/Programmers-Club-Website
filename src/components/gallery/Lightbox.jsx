import React, { useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

/**
 * Fullscreen media preview modal (image or video) with keyboard navigation
 * (Esc to close, Arrow keys to move between items), swipe navigation on
 * touch devices, a thumbnail strip for quick jumps, and click-outside-to-close.
 *
 * `items` is the currently visible (filtered) media list, `index` is the
 * position of the open item within it — keeping navigation scoped to
 * whatever the user is currently browsing.
 */
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const item = items[index];
  const touchStartX = useRef(null);

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    }
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [goPrev, goNext, onClose]);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const SWIPE_THRESHOLD = 50;
    if (deltaX > SWIPE_THRESHOLD) goPrev();
    else if (deltaX < -SWIPE_THRESHOLD) goNext();
    touchStartX.current = null;
  }

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-surface/80 border border-border text-text-primary hover:text-primary hover:border-primary/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous media"
          className="absolute left-2 sm:left-6 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface/80 border border-border text-text-primary hover:text-primary hover:border-primary/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Next */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next media"
          className="absolute right-2 sm:right-6 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface/80 border border-border text-text-primary hover:text-primary hover:border-primary/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Content */}
      <div
        className="flex flex-col items-center max-w-5xl w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-full flex items-center justify-center rounded-xl overflow-hidden border border-border bg-surface-card touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {item.type === 'video' ? (
            <video
              key={item.id}
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              className="w-full max-h-[70vh] bg-black"
            >
              Your browser does not support embedded video.
            </video>
          ) : (
            <img
              src={item.src}
              alt={item.alt}
              className="w-full max-h-[70vh] object-contain bg-black"
            />
          )}
        </div>

        {/* Caption bar */}
        <div className="w-full mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
          <div>
            <p className="text-sm sm:text-base font-semibold text-text-primary">{item.eventTitle}</p>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(item.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                {item.category}
              </span>
            </div>
          </div>
          {items.length > 1 && (
            <span className="text-xs font-mono text-text-muted">
              {index + 1} / {items.length}
            </span>
          )}
        </div>

        {/* Thumbnail strip for quick jumps */}
        {items.length > 1 && (
          <div className="w-full mt-3 flex items-center gap-2 overflow-x-auto scrollbar-none px-1 py-1">
            {items.map((thumbItem, i) => (
              <button
                key={thumbItem.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(i);
                }}
                aria-label={`Go to ${thumbItem.eventTitle} media ${i + 1}`}
                aria-current={i === index}
                className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  i === index ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={thumbItem.type === 'video' ? thumbItem.poster : thumbItem.src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

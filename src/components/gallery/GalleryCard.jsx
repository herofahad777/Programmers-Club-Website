import React, { useState } from 'react';
import { Play, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

/**
 * Single media card used inside the Gallery grid.
 * Displays a photo (or a video poster with a play affordance), the parent
 * event title, and its date. Clicking opens the Lightbox via `onOpen`.
 * Shows a pulsing skeleton + blur-up transition while the thumbnail loads.
 */
export default function GalleryCard({ item, onOpen }) {
  const [loaded, setLoaded] = useState(false);
  const isVideo = item.type === 'video';
  const thumb = isVideo ? item.poster : item.src;

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group relative w-full aspect-[4/3] overflow-hidden rounded-xl border border-border bg-surface text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-colors hover:border-primary/40"
      aria-label={`Open ${isVideo ? 'video' : 'photo'}: ${item.alt}`}
    >
      {/* Skeleton placeholder shown until the thumbnail has loaded */}
      {!loaded && <div className="absolute inset-0 bg-surface animate-pulse" aria-hidden="true" />}

      <img
        src={thumb}
        alt={item.alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-105 ${
          loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
        }`}
      />

      {/* Gradient scrim for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

      {/* Video play affordance */}
      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center justify-center w-12 h-12 rounded-full bg-bg/70 border border-primary/60 text-primary backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          </span>
        </div>
      )}

      {/* Duration badge */}
      {isVideo && item.duration && (
        <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-text-primary bg-black/60 border border-white/10">
          {item.duration}
        </span>
      )}

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5">
        <p className="text-xs sm:text-sm font-semibold text-white leading-snug line-clamp-1">
          {item.eventTitle}
        </p>
        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-white/70">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(item.date)}</span>
        </div>
      </div>
    </button>
  );
}

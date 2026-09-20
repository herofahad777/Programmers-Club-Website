import React, { useMemo } from 'react';
import { ImageOff } from 'lucide-react';
import GalleryCard from './GalleryCard';
import { formatDate } from '../../utils/helpers';

/**
 * Renders gallery media grouped by parent event (category/event grouping).
 * Accepts the already-filtered flat `media` array and re-groups it by
 * `eventId` so each event keeps its own heading + responsive card grid.
 */
export default function GalleryGrid({ media, onOpen, sortOrder = 'newest' }) {
  const groups = useMemo(() => {
    const map = new Map();
    for (const item of media) {
      if (!map.has(item.eventId)) {
        map.set(item.eventId, {
          eventId: item.eventId,
          eventTitle: item.eventTitle,
          category: item.category,
          date: item.date,
          items: [],
        });
      }
      map.get(item.eventId).items.push(item);
    }
    const groupList = Array.from(map.values());
    groupList.sort((a, b) => {
      if (sortOrder === 'oldest') return a.date < b.date ? -1 : 1;
      return a.date < b.date ? 1 : -1;
    });
    return groupList;
  }, [media, sortOrder]);

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 rounded-xl border border-dashed border-border bg-surface/40">
        <ImageOff className="w-8 h-8 text-text-muted mb-3" />
        <p className="text-sm font-medium text-text-secondary">No media found for this filter.</p>
        <p className="text-xs text-text-muted mt-1">Try a different search term or category.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 sm:space-y-14">
      {groups.map((group) => (
        <section key={group.eventId} aria-labelledby={`event-${group.eventId}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
            <div>
              <h3
                id={`event-${group.eventId}`}
                className="text-base sm:text-lg font-bold font-heading text-text-primary"
              >
                {group.eventTitle}
              </h3>
              <p className="text-xs text-text-muted mt-0.5">{formatDate(group.date)}</p>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono font-medium text-primary bg-accent border border-primary/20">
              {group.category}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {group.items.map((item) => (
              <GalleryCard key={item.id} item={item} onOpen={onOpen} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

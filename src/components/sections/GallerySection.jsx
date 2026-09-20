import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import GalleryCard from '../gallery/GalleryCard';
import Lightbox from '../gallery/Lightbox';
import { GALLERY_MEDIA } from '../../data/gallerydata';

/**
 * Homepage teaser for the Event Gallery. Shows a handful of the most recent
 * media items and links through to the full /gallery experience. Reuses the
 * same GalleryCard / Lightbox components as the full gallery page.
 */
export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const preview = useMemo(() => {
    // Newest events first, at most two items per event so the teaser shows
    // a mix of recent activity instead of one event only.
    const byEvent = new Map();
    const newestFirst = [...GALLERY_MEDIA].sort((a, b) =>
      a.date === b.date ? 0 : a.date < b.date ? 1 : -1
    );
    for (const item of newestFirst) {
      if (!byEvent.has(item.eventId)) byEvent.set(item.eventId, []);
      if (byEvent.get(item.eventId).length < 2) byEvent.get(item.eventId).push(item);
    }
    return Array.from(byEvent.values()).flat().slice(0, 8);
  }, []);

  const handleOpen = (item) => {
    const idx = preview.findIndex((m) => m.id === item.id);
    setLightboxIndex(idx === -1 ? 0 : idx);
  };

  return (
    <SectionWrapper
      id="gallery"
      badge="Event Memories"
      title="Club Gallery"
      subtitle="Snapshots from workshops, orientations, quizzes, and other club activities."
      action={
        <Link
          to="/gallery"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-soft transition-colors"
        >
          <span>View Full Gallery</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      }
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {preview.map((item) => (
          <GalleryCard key={item.id} item={item} onOpen={handleOpen} />
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={preview}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </SectionWrapper>
  );
}

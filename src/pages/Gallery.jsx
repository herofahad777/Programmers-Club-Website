import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Camera, Film, CalendarDays } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import CategoryFilter from '../components/gallery/CategoryFilter';
import GallerySearch from '../components/gallery/GallerySearch';
import SortToggle from '../components/gallery/SortToggle';
import GalleryGrid from '../components/gallery/GalleryGrid';
import Lightbox from '../components/gallery/Lightbox';
import CallToActionSection from '../components/sections/CallToActionSection';
import { GALLERY_CATEGORIES, GALLERY_EVENTS, GALLERY_MEDIA } from '../data/gallerydata';

/**
 * /gallery — Event Gallery page.
 *
 * Composition:
 *  - PageHeader          (shared page banner)
 *  - Stats strip           quick counts (photos, videos, events)
 *  - GallerySearch         free-text search by event/category
 *  - CategoryFilter        filter media by category
 *  - SortToggle            newest/oldest event ordering
 *  - GalleryGrid           media grouped by event, responsive card grid
 *  - Lightbox              full-screen preview, swipe + thumbnail strip
 *  - CallToActionSection   shared "Suggest an Event" CTA (reused, unmodified)
 *
 * All gallery content is driven by `src/data/gallerydata.js` so new events
 * or media can be added without touching this page.
 *
 * Deep linking: opening any media item sets a `?photo=<id>` query param so
 * a specific photo/video can be shared directly; loading the page with that
 * param present re-opens the Lightbox to the matching item on mount.
 */
export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  const [lightboxItems, setLightboxItems] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const didHandleInitialDeepLink = useRef(false);

  const categoryCounts = useMemo(() => {
    const counts = Object.fromEntries(GALLERY_CATEGORIES.map((c) => [c, 0]));
    for (const item of GALLERY_MEDIA) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    counts.All = GALLERY_MEDIA.length;
    return counts;
  }, []);

  const filteredMedia = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return GALLERY_MEDIA.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      return (
        item.eventTitle.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.alt.toLowerCase().includes(query)
      );
    });
  }, [activeCategory, searchQuery]);

  const photoCount = GALLERY_MEDIA.filter((m) => m.type === 'image').length;
  const videoCount = GALLERY_MEDIA.filter((m) => m.type === 'video').length;

  // Open a card from the grid: navigation is scoped to the currently
  // filtered/searched list, and the URL gets a shareable ?photo= param.
  const handleOpen = (item) => {
    const idx = filteredMedia.findIndex((m) => m.id === item.id);
    const openIndex = idx === -1 ? 0 : idx;
    setLightboxItems(filteredMedia);
    setLightboxIndex(openIndex);
    setSearchParams({ photo: item.id }, { replace: true });
  };

  // Navigating inside the Lightbox (arrows / swipe / thumbnail strip) keeps
  // the URL in sync so the link always points at what's currently shown.
  const handleNavigate = (nextIndex) => {
    setLightboxIndex(nextIndex);
    const nextItem = lightboxItems && lightboxItems[nextIndex];
    if (nextItem) {
      setSearchParams({ photo: nextItem.id }, { replace: true });
    }
  };

  const handleClose = () => {
    setLightboxItems(null);
    setLightboxIndex(null);
    setSearchParams({}, { replace: true });
  };

  // On first load, honor a shared ?photo=<id> deep link by opening the
  // Lightbox against the full media list (independent of any filters).
  useEffect(() => {
    if (didHandleInitialDeepLink.current) return;
    didHandleInitialDeepLink.current = true;

    const photoId = searchParams.get('photo');
    if (!photoId) return;

    const idx = GALLERY_MEDIA.findIndex((m) => m.id === photoId);
    if (idx !== -1) {
      setLightboxItems(GALLERY_MEDIA);
      setLightboxIndex(idx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <PageHeader
        title="Event Gallery"
        description="Capturing memories, workshops, hackathons, orientations, and technical gatherings at AIKTC."
        breadcrumbs={['Gallery']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        {/* Quick stats */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface border border-border text-xs sm:text-sm text-text-secondary">
            <Camera className="w-4 h-4 text-primary" />
            <span>{photoCount} Photos</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface border border-border text-xs sm:text-sm text-text-secondary">
            <Film className="w-4 h-4 text-primary" />
            <span>{videoCount} Videos</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface border border-border text-xs sm:text-sm text-text-secondary">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span>{GALLERY_EVENTS.length} Events</span>
          </div>
        </div>

        {/* Search + sort controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 sm:justify-between">
          <GallerySearch value={searchQuery} onChange={setSearchQuery} />
          <SortToggle order={sortOrder} onChange={setSortOrder} />
        </div>

        {/* Category filter */}
        <CategoryFilter
          categories={GALLERY_CATEGORIES}
          active={activeCategory}
          onChange={setActiveCategory}
          counts={categoryCounts}
        />

        {/* Grouped grid */}
        <GalleryGrid
          media={filteredMedia}
          onOpen={handleOpen}
          sortOrder={sortOrder}
        />
      </div>

      {/* Shared "Suggest an Event" CTA, reused as-is */}
      <CallToActionSection />

      {lightboxItems && lightboxIndex !== null && (
        <Lightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={handleClose}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

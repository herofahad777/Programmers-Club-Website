import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageOff } from 'lucide-react';

/**
 * GalleryItem — Single image in the gallery grid.
 * Handles image load errors gracefully with a placeholder icon.
 */
function GalleryItem({ item, index }) {
  const [hasError, setHasError] = useState(false);
  const hasValidImage = item.image && item.image.trim() !== '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-surface border border-border hover:border-border-hover transition-colors"
    >
      {hasValidImage && !hasError ? (
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        /* Graceful placeholder when image is missing or fails to load */
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-text-muted bg-surface-card">
          <ImageOff className="w-8 h-8 text-border" aria-hidden="true" />
          <span className="text-xs text-text-muted">Image pending</span>
        </div>
      )}

      {/* Title & year overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-8 pointer-events-none">
        <p className="text-sm font-semibold text-text-primary leading-snug">{item.title}</p>
        <p className="text-xs text-text-muted mt-0.5">{item.year}</p>
      </div>
    </motion.div>
  );
}

/**
 * AchievementGallery — Responsive grid of event photos and certificates.
 * Hidden entirely when the gallery array is empty.
 */
export default function AchievementGallery({ gallery }) {
  /* Hide the section if gallery is empty or missing */
  if (!gallery || gallery.length === 0) return null;

  return (
    <section id="achievement-gallery" aria-label="Achievement gallery">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.map((item, index) => (
          <GalleryItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

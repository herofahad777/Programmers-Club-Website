import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import PlaceholderCard from '../common/PlaceholderCard';

export default function GallerySection() {
  return (
    <SectionWrapper
      id="gallery"
      badge="Event Memories"
      title="Club Gallery"
      subtitle="Snapshots from workshops, coding contests, campus hackathons, and celebrations."
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
      <PlaceholderCard
        title="Event Gallery Showcase Section"
        moduleName="src/components/sections/GallerySection.jsx"
        description="Structural placeholder for event photography, workshop memories, and campus moments. Real verified photos will be added by the assigned team member without using external random images."
        assignedTo="Assigned Team Member"
        plannedFeatures={[
          "Photo grid with responsive masonry or flex layout",
          "Event date and title captions",
          "Modal viewer / lightbox on click",
          "Categorized albums (Hackathons, Workshops, Orientation)"
        ]}
      />
    </SectionWrapper>
  );
}

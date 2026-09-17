import React from 'react';
import PageHeader from '../components/common/PageHeader';
import PlaceholderCard from '../components/common/PlaceholderCard';

export default function Gallery() {
  return (
    <div className="w-full">
      <PageHeader
        title="Event Gallery"
        description="Capturing memories, workshops, hackathons, orientations, and technical gatherings at AIKTC."
        breadcrumbs={['Gallery']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <PlaceholderCard
          title="Event Gallery & Media Module"
          moduleName="src/pages/Gallery.jsx"
          description="This page will feature verified photographs from past club activities, annual tech days, hackathons, and guest seminars. Real images will be placed in the assets directory or cloud storage by the assigned team member."
          assignedTo="Assigned Team Member"
          plannedFeatures={[
            "Categorized photo galleries (Hackathons, Workshops, Orientation)",
            "Responsive grid with light/dark contrast optimization",
            "Full-screen photo modal / carousel viewer",
            "Event year and edition filter"
          ]}
        />
      </div>
    </div>
  );
}

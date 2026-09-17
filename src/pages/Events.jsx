import React from 'react';
import PageHeader from '../components/common/PageHeader';
import PlaceholderCard from '../components/common/PlaceholderCard';

export default function Events() {
  return (
    <div className="w-full">
      <PageHeader
        title="Events & Workshops"
        description="Explore upcoming workshops, coding competitions, hackathons, and archived sessions hosted by Programmers Club."
        breadcrumbs={['Events']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <PlaceholderCard
          title="Events System & Timeline Module"
          moduleName="src/pages/Events.jsx"
          description="This page will feature current, upcoming, and past technical events. Individual event detail pages and registration modals will be integrated here in future phases."
          assignedTo="Assigned Team Member"
          plannedFeatures={[
            "Tabbed navigation: Upcoming Events / Past Events / Hackathons",
            "Event detail cards with date, venue, speaker, and tags",
            "Registration link integration (Google Forms / internal form)",
            "Search and filter by category or technology stack"
          ]}
        />
      </div>
    </div>
  );
}

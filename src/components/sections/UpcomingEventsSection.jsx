import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import PlaceholderCard from '../common/PlaceholderCard';

export default function UpcomingEventsSection() {
  return (
    <SectionWrapper
      id="upcoming-events"
      badge="Workshops & Contests"
      title="Upcoming Events"
      subtitle="Engage in technical bootcamps, algorithmic challenges, and industry speaker sessions."
      action={
        <Link
          to="/events"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-soft transition-colors"
        >
          <span>View All Events</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      }
    >
      <PlaceholderCard
        title="Upcoming Events Showcase Section"
        moduleName="src/components/sections/UpcomingEventsSection.jsx"
        description="Structural placeholder for upcoming workshops, speaker sessions, and coding competitions. No fake events are shown. Real schedules, registration links, and venue info will be integrated by the assigned team member."
        assignedTo="Assigned Team Member"
        plannedFeatures={[
          "Featured upcoming event banner",
          "Event date, time, and venue metadata tags",
          "Registration call-to-action button",
          "Filter by category (Workshop, Contest, Seminar)"
        ]}
      />
    </SectionWrapper>
  );
}

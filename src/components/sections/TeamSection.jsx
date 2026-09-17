import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import PlaceholderCard from '../common/PlaceholderCard';

export default function TeamSection() {
  return (
    <SectionWrapper
      id="team"
      badge="Club Leadership"
      title="Meet the Team"
      subtitle="The passionate student leads, technical heads, and coordinators steering Programmers Club."
      action={
        <Link
          to="/team"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-soft transition-colors"
        >
          <span>View Full Team Roster</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      }
    >
      <PlaceholderCard
        title="Club Leadership & Committee Showcase Section"
        moduleName="src/components/sections/TeamSection.jsx"
        description="Structural placeholder for core committee members, technical team leads, and student coordinators. No fake names or profiles are added. Official roster will be populated by the assigned team member."
        assignedTo="Assigned Team Member"
        plannedFeatures={[
          "Executive committee & faculty coordinators",
          "Technical team member profile cards",
          "Department / Year of study tags",
          "Official GitHub / LinkedIn profile links"
        ]}
      />
    </SectionWrapper>
  );
}

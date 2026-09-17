import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import PlaceholderCard from '../common/PlaceholderCard';

export default function AchievementsSection() {
  return (
    <SectionWrapper
      id="achievements"
      badge="Student Excellence"
      title="Achievements & Milestones"
      subtitle="Recognizing student triumphs in inter-collegiate hackathons, coding leagues, and tech festivals."
      action={
        <Link
          to="/achievements"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-soft transition-colors"
        >
          <span>View All Achievements</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      }
    >
      <PlaceholderCard
        title="Achievements Showcase Section"
        moduleName="src/components/sections/AchievementsSection.jsx"
        description="Structural placeholder for verified club milestones, hackathon awards, and student achievements. No fake statistics or awards are listed. Official achievements will be verified and added by the assigned team member."
        assignedTo="Assigned Team Member"
        plannedFeatures={[
          "Hackathon / competition award highlights",
          "Winning team members and faculty mentors",
          "Certificate/trophy verification notes",
          "Chronological timeline format"
        ]}
      />
    </SectionWrapper>
  );
}

import React from 'react';
import PageHeader from '../components/common/PageHeader';
import PlaceholderCard from '../components/common/PlaceholderCard';

export default function Team() {
  return (
    <div className="w-full">
      <PageHeader
        title="Our Team"
        description="Meet the core committee, technical leads, mentors, and contributors driving Programmers Club AIKTC."
        breadcrumbs={['Team']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <PlaceholderCard
          title="Team & Contributor Directory Module"
          moduleName="src/pages/Team.jsx"
          description="This page will present the official roster of faculty coordinators, student executive council, domain leads (Web, App, Competitive Programming, Design, PR), and technical team members."
          assignedTo="Assigned Team Member"
          plannedFeatures={[
            "Faculty In-charge & Mentor profiles",
            "Executive Core Committee roster",
            "Technical Team (11 Members) profile cards",
            "Links to verified GitHub, LinkedIn, and portfolios"
          ]}
        />
      </div>
    </div>
  );
}

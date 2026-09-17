import React from 'react';
import PageHeader from '../components/common/PageHeader';
import PlaceholderCard from '../components/common/PlaceholderCard';

export default function About() {
  return (
    <div className="w-full">
      <PageHeader
        title="About Programmers Club"
        description="Learn about the origins, mission, vision, and activities of Programmers Club at Anjuman-I-Islam's Kalsekar Technical Campus."
        breadcrumbs={['About']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <PlaceholderCard
          title="About Page Content Module"
          moduleName="src/pages/About.jsx"
          description="This page will house the comprehensive story of Programmers Club AIKTC, including faculty mentor messages, founding story, core principles, departmental collaboration, and membership guidelines."
          assignedTo="Assigned Team Member"
          plannedFeatures={[
            "About AIKTC & Department of Computer Engineering context",
            "Club Vision & Mission statements (official copy)",
            "Faculty Coordinators & Advisor messages",
            "Student leadership structure & membership roadmap"
          ]}
        />
      </div>
    </div>
  );
}

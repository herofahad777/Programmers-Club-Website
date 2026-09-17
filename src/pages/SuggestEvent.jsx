import React from 'react';
import PageHeader from '../components/common/PageHeader';
import PlaceholderCard from '../components/common/PlaceholderCard';

export default function SuggestEvent() {
  return (
    <div className="w-full">
      <PageHeader
        title="Suggest an Event"
        description="Share ideas for workshops, bootcamps, coding contests, or tech talks you want Programmers Club to organize."
        breadcrumbs={['Suggest an Event']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <PlaceholderCard
          title="Event Suggestion Form & Workflow Module"
          moduleName="src/pages/SuggestEvent.jsx"
          description="This page will feature a structured form allowing AIKTC students to submit ideas for future tech sessions, request specific topics, or propose student/industry speakers. Frontend form validation and submission handling will be implemented by the assigned team member once backend/storage criteria are set."
          assignedTo="Assigned Team Member"
          plannedFeatures={[
            "Form fields: Topic title, suggested speaker/mentor, category, description",
            "Student details (Name, Branch, Year, Contact)",
            "Client-side form validation",
            "Submission confirmation state & submission guidelines"
          ]}
        />
      </div>
    </div>
  );
}

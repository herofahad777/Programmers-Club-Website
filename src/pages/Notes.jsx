import React from 'react';
import PageHeader from '../components/common/PageHeader';
import PlaceholderCard from '../components/common/PlaceholderCard';

export default function Notes() {
  return (
    <div className="w-full">
      <PageHeader
        title="Study Notes & Learning Resources"
        description="Curated academic notes, cheat sheets, interview prep material, and technical roadmaps compiled for AIKTC students."
        breadcrumbs={['Notes']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <PlaceholderCard
          title="Notes & Resources Repository Module"
          moduleName="src/pages/Notes.jsx"
          description="This section provides access to semester course notes, engineering syllabus guides, DSA cheatsheets, and verified coding resources. Content will be categorized by branch, year, and subject."
          assignedTo="Assigned Team Member"
          plannedFeatures={[
            "Subject & Semester categorizer (Semester 1 through 8)",
            "Downloadable PDF links / Google Drive resource links",
            "Data structures, algorithms, and web dev cheatsheets",
            "Resource contribution guidelines for students"
          ]}
        />
      </div>
    </div>
  );
}

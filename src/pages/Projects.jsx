import React from 'react';
import PageHeader from '../components/common/PageHeader';
import PlaceholderCard from '../components/common/PlaceholderCard';

export default function Projects() {
  return (
    <div className="w-full">
      <PageHeader
        title="Student Projects"
        description="Showcase of open-source software, research tools, web applications, and technical innovations created by AIKTC students."
        breadcrumbs={['Projects']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <PlaceholderCard
          title="Projects Directory Module"
          moduleName="src/pages/Projects.jsx"
          description="This page will feature student repositories, live demos, contributor profiles, and project submission guidelines. No fake projects are listed; real student projects will be curated."
          assignedTo="Assigned Team Member"
          plannedFeatures={[
            "Project cards with GitHub repository links and live demo URLs",
            "Tech stack tags (React, Python, Flutter, Docker, etc.)",
            "Filter by category (Web, Mobile, AI/ML, CLI/Tools)",
            "Submission guideline for AIKTC students wishing to showcase projects"
          ]}
        />
      </div>
    </div>
  );
}

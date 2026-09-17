import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import PlaceholderCard from '../common/PlaceholderCard';

export default function ProjectsSection() {
  return (
    <SectionWrapper
      id="projects"
      badge="Student Innovation"
      title="Featured Projects"
      subtitle="Open-source applications, tools, and platforms engineered by AIKTC developers."
      action={
        <Link
          to="/projects"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-soft transition-colors"
        >
          <span>View All Projects</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      }
    >
      <PlaceholderCard
        title="Featured Projects Showcase Section"
        moduleName="src/components/sections/ProjectsSection.jsx"
        description="Structural placeholder for student-built projects, GitHub repositories, live demo links, and tech stacks. Real projects will be curated and linked by the assigned team member."
        assignedTo="Assigned Team Member"
        plannedFeatures={[
          "Project title, overview, and repository link",
          "Tech stack badges (React, Node, Python, etc.)",
          "Live demo or deployment link",
          "Student contributor credits"
        ]}
      />
    </SectionWrapper>
  );
}

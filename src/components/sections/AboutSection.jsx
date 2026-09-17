import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import PlaceholderCard from '../common/PlaceholderCard';

export default function AboutSection() {
  return (
    <SectionWrapper
      id="about"
      badge="About Programmers Club"
      title="Empowering Student Engineers at AIKTC"
      subtitle="Fostering an ecosystem of peer learning, technical excellence, and open collaboration."
      action={
        <Link
          to="/about"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-soft transition-colors"
        >
          <span>Read Full About Page</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      }
    >
      <PlaceholderCard
        title="About Programmers Club Overview Section"
        moduleName="src/components/sections/AboutSection.jsx"
        description="This section introduces the Programmers Club history, objectives, faculty coordinators, and student ethos at AIKTC. Real text, history, and official vision statements will be inserted by the assigned team member."
        assignedTo="Assigned Team Member"
        plannedFeatures={[
          "Club mission and core values",
          "AIKTC technical campus association details",
          "Student-led peer mentorship philosophy",
          "Pathways for new student members to join"
        ]}
      />
    </SectionWrapper>
  );
}

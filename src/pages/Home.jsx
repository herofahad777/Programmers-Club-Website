import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import UpcomingEventsSection from '../components/sections/UpcomingEventsSection';
import WhatPcDoesSection from '../components/sections/WhatPcDoesSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import AchievementsSection from '../components/sections/AchievementsSection';
import TeamSection from '../components/sections/TeamSection';
import GallerySection from '../components/sections/GallerySection';
import CallToActionSection from '../components/sections/CallToActionSection';

/**
 * Home Page (Initial Structural Foundation v0.1)
 * 
 * Contains the 10 core sections requested:
 * 1. Hero
 * 2. About PC
 * 3. Upcoming Events
 * 4. What PC Does
 * 5. Projects
 * 6. Achievements
 * 7. Team
 * 8. Gallery
 * 9. Call to action / Event Suggestion
 * 10. Footer (rendered globally by Layout)
 */
export default function Home() {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. About PC */}
      <AboutSection />

      {/* 3. Upcoming Events */}
      <UpcomingEventsSection />

      {/* 4. What PC Does */}
      <WhatPcDoesSection />

      {/* 5. Projects */}
      <ProjectsSection />

      {/* 6. Achievements */}
      <AchievementsSection />

      {/* 7. Team */}
      <TeamSection />

      {/* 8. Gallery */}
      <GallerySection />

      {/* 9. Call to Action / Event Suggestion */}
      <CallToActionSection />
    </div>
  );
}

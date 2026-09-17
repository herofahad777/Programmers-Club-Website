import React from 'react';
import PageHeader from '../components/common/PageHeader';
import PlaceholderCard from '../components/common/PlaceholderCard';

export default function Contact() {
  return (
    <div className="w-full">
      <PageHeader
        title="Contact Programmers Club"
        description="Get in touch with the technical committee, faculty coordinators, or student representatives at AIKTC."
        breadcrumbs={['Contact']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <PlaceholderCard
          title="Contact & Outreach Module"
          moduleName="src/pages/Contact.jsx"
          description="This page will feature official contact channels, campus location details, department contact info, and an inquiry form. Official email and location details will be verified by leadership."
          assignedTo="Assigned Team Member"
          plannedFeatures={[
            "Campus map & venue details (AIKTC Campus, New Panvel)",
            "Official email & inquiry channels",
            "Message inquiry form with client-side validation",
            "Links to verified club social channels"
          ]}
        />
      </div>
    </div>
  );
}

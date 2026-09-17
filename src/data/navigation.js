/**
 * Centralized navigation configuration for Programmers Club (PC) website.
 * Used by Navbar, Footer, and Sitemap components.
 */

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Events', path: '/events' },
  { name: 'Projects', path: '/projects' },
  { name: 'Team', path: '/team' },
  { name: 'Achievements', path: '/achievements' },
  { name: 'Notes', path: '/notes' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export const CTA_LINK = {
  name: 'Suggest Event',
  path: '/suggest-event',
};

export const FOOTER_SECTIONS = [
  {
    title: 'Explore',
    links: [
      { name: 'Home', path: '/' },
      { name: 'About PC', path: '/about' },
      { name: 'Events', path: '/events' },
      { name: 'Projects', path: '/projects' },
    ],
  },
  {
    title: 'Community',
    links: [
      { name: 'Core Team', path: '/team' },
      { name: 'Achievements', path: '/achievements' },
      { name: 'Study Notes', path: '/notes' },
      { name: 'Event Gallery', path: '/gallery' },
    ],
  },
  {
    title: 'Participate',
    links: [
      { name: 'Suggest an Event', path: '/suggest-event' },
      { name: 'Contact Us', path: '/contact' },
    ],
  },
];

/**
 * Social media handles - Placeholders
 * Note: Actual URLs will be populated once confirmed by leadership.
 */
export const SOCIAL_LINKS = [
  { name: 'GitHub', placeholderUrl: '#', iconName: 'Github' },
  { name: 'LinkedIn', placeholderUrl: '#', iconName: 'Linkedin' },
  { name: 'Instagram', placeholderUrl: '#', iconName: 'Instagram' },
  { name: 'Discord', placeholderUrl: '#', iconName: 'MessageSquare' },
];

/**
 * Club & Institute Identity Metadata
 */
export const CLUB_INFO = {
  name: 'Programmers Club',
  shortName: 'PC',
  institute: 'Anjuman-I-Islam\'s Kalsekar Technical Campus (AIKTC)',
  shortInstitute: 'AIKTC',
  tagline: 'Code. Collaborate. Create.',
  description: 'The official technical student body fostering software craftsmanship, competitive programming, and technical excellence at AIKTC.',
  emailPlaceholder: 'programmersclub@aiktc.ac.in [Placeholder]',
  locationPlaceholder: 'AIKTC Campus, New Panvel, Navi Mumbai [Placeholder]',
};
